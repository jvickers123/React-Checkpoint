import { useInWishlistOrCart } from './redux-helpers';
import { renderWithProviders } from './test-utils';

describe('useInWishlistOrCart', () => {
  it('happy path - WISHLIST returns true if in redux state', () => {
    const response = renderWithProviders(() => useInWishlistOrCart(1));
    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - WISHLIST returns false if not in redux state', () => {
    const response = renderWithProviders(() => useInWishlistOrCart(3, true));
    expect(response.result.current).toEqual(false);
  });

  it('happy path - CART returns true if in redux state', () => {
    const response = renderWithProviders(() => useInWishlistOrCart(1, false));
    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - CART returns false if not in redux state', () => {
    const response = renderWithProviders(() => useInWishlistOrCart(3, false));
    expect(response.result.current).toEqual(false);
  });
});