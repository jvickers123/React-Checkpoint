import { RenderHookResult } from '@testing-library/react';
import { useInWishlistOrCart } from './redux-helpers';
import { renderWithProviders } from './test-utils';

const setUp = ({ id, wishlist }: { id: number; wishlist?: boolean }) => {
  const response = renderWithProviders(() =>
    useInWishlistOrCart(id, wishlist)
  ) as RenderHookResult<any, unknown>;
  return {
    response,
  };
};
describe('useInWishlistOrCart', () => {
  it('happy path - WISHLIST returns true if in redux state', () => {
    const { response } = setUp({ id: 1 });
    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - WISHLIST returns false if not in redux state', () => {
    const { response } = setUp({ id: 3, wishlist: true });
    expect(response.result.current).toEqual(false);
  });

  it('happy path - CART returns true if in redux state', () => {
    const { response } = setUp({ id: 1, wishlist: false });

    expect(response.result.current).toEqual(true);
  });

  it('unhappy path - CART returns false if not in redux state', () => {
    const { response } = setUp({ id: 3, wishlist: false });

    expect(response.result.current).toEqual(false);
  });
});
