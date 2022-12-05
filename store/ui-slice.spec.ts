import UIReducer, { uiActions } from './ui-slice';

describe('UIReducer', () => {
  it('toggleCart to show cart if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleCart())).toEqual({
      showCart: true,
      showWishList: false,
    });
  });
  it('toggleCart to show cart if false', () => {
    const previousState = { showCart: false, showWishList: false };

    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual({
      showCart: true,
      showWishList: false,
    });
  });

  it('toggleCart to hide cart if true', () => {
    const previousState = { showCart: true, showWishList: false };

    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual({
      showCart: false,
      showWishList: false,
    });
  });

  it('toggleWishList to show wishlist if false', () => {
    const previousState = { showCart: false, showWishList: false };

    expect(UIReducer(previousState, uiActions.toggleWishList())).toEqual({
      showCart: false,
      showWishList: true,
    });
  });

  it('toggleWishList to hide wishlist if true', () => {
    const previousState = { showCart: false, showWishList: true };

    expect(UIReducer(previousState, uiActions.toggleWishList())).toEqual({
      showCart: false,
      showWishList: false,
    });
  });

  it('toggleWishList to show cart if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleWishList())).toEqual({
      showCart: false,
      showWishList: true,
    });
  });
});
