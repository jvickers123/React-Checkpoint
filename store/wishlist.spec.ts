import WishlistReducer, { wishlistActions } from './wishlist';
import { mockData } from '../mock/mockData';

describe('wishlistReducer', () => {
  it('should return the initial state if no previous state', () => {
    expect(WishlistReducer(undefined, { type: undefined })).toEqual({
      items: [],
    });
  });

  it('should add Item to wishlist', () => {
    expect(
      WishlistReducer(undefined, wishlistActions.addItem(mockData[0]))
    ).toEqual({
      items: [mockData[0]],
    });
  });

  it('should remove Item from wishlist', () => {
    const previousState = { items: mockData };
    expect(
      WishlistReducer(previousState, wishlistActions.removeItem(1))
    ).toEqual({
      items: [mockData[1]],
    });
  });

  it('should replace existing wishlist items with new ones', () => {
    const previousState = { items: [mockData[0]] };
    expect(
      WishlistReducer(
        previousState,
        wishlistActions.replaceWishlist({ items: [mockData[1]] })
      )
    ).toEqual({
      items: [mockData[1]],
    });
  });
});
