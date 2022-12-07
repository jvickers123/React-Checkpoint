import UIReducer, { uiActions } from './ui-slice';

const initialState = {
  showCart: false,
  showWishList: false,
  placeOrder: false,
};
describe('UIReducer', () => {
  it('toggleCart to show cart if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleCart())).toEqual({
      ...initialState,
      showCart: true,
    });
  });
  it('toggleCart to show cart if false', () => {
    const previousState = { ...initialState };
    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual({
      ...initialState,
      showCart: true,
    });
  });

  it('toggleCart to hide cart if originally true', () => {
    const previousState = {
      ...initialState,
      showCart: true,
    };

    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual(
      initialState
    );
  });

  it('toggleWishList to show wishlist if false', () => {
    expect(UIReducer(initialState, uiActions.toggleWishList())).toEqual({
      ...initialState,
      showWishList: true,
    });
  });

  it('toggleWishList to hide wishlist if true', () => {
    const previousState = {
      ...initialState,
      showWishList: true,
    };

    expect(UIReducer(previousState, uiActions.toggleWishList())).toEqual(
      initialState
    );
  });

  it('toggleWishList to show wishlist if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleWishList())).toEqual({
      ...initialState,
      showWishList: true,
    });
  });

  it('placeOrder to turn true if no original state', () => {
    expect(UIReducer(undefined, uiActions.placeOrder())).toEqual({
      ...initialState,
      placeOrder: true,
    });
  });

  it('placeOrder to turn true with given state', () => {
    expect(UIReducer(initialState, uiActions.placeOrder())).toEqual({
      ...initialState,
      placeOrder: true,
    });
  });

  it('removePlaceOrder to turn placeOrder false with given state', () => {
    const previousState = {
      ...initialState,
      placeOrder: true,
    };

    expect(UIReducer(previousState, uiActions.removePlaceOrder())).toEqual(
      initialState
    );
  });
  it('removePlaceOrder to turn placeOrder false with no  given state', () => {
    expect(UIReducer(undefined, uiActions.removePlaceOrder())).toEqual(
      initialState
    );
  });
});
