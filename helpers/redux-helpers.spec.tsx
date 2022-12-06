import { RenderHookResult } from '@testing-library/react';
import { useInWishlistOrCart } from './redux-helpers';
import { renderWithProviders } from './test-utils';

describe('useInWishlistOrCart', () => {
  it('happy path - WISHLIST returns true if in redux state', () => {
    const response = renderWithProviders(() =>
      useInWishlistOrCart(1)
    ) as RenderHookResult<any, unknown>;
    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - WISHLIST returns false if not in redux state', () => {
    const response = renderWithProviders(() =>
      useInWishlistOrCart(3, true)
    ) as RenderHookResult<any, unknown>;
    expect(response.result.current).toEqual(false);
  });

  it('happy path - CART returns true if in redux state', () => {
    const response = renderWithProviders(() =>
      useInWishlistOrCart(1, false)
    ) as RenderHookResult<any, unknown>;
    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - CART returns false if not in redux state', () => {
    const response = renderWithProviders(() =>
      useInWishlistOrCart(3, false)
    ) as RenderHookResult<any, unknown>;
    expect(response.result.current).toEqual(false);
  });
});
