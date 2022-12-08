import UIReducer, { ToastType, uiActions } from './ui-slice';

const initialUIState = {
  showCart: false,
  showWishList: false,
  placeOrder: false,
  toast: ToastType.empty,
};
describe('UIReducer', () => {
  it('toggleCart to show cart if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleCart())).toEqual({
      ...initialUIState,
      showCart: true,
    });
  });
  it('toggleCart to show cart if false', () => {
    const previousState = { ...initialUIState };
    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual({
      ...initialUIState,
      showCart: true,
    });
  });

  it('toggleCart to hide cart if originally true', () => {
    const previousState = {
      ...initialUIState,
      showCart: true,
    };

    expect(UIReducer(previousState, uiActions.toggleCart())).toEqual(
      initialUIState
    );
  });

  it('toggleWishList to show wishlist if false', () => {
    expect(UIReducer(initialUIState, uiActions.toggleWishList())).toEqual({
      ...initialUIState,
      showWishList: true,
    });
  });

  it('toggleWishList to hide wishlist if true', () => {
    const previousState = {
      ...initialUIState,
      showWishList: true,
    };

    expect(UIReducer(previousState, uiActions.toggleWishList())).toEqual(
      initialUIState
    );
  });

  it('toggleWishList to show wishlist if no original state', () => {
    expect(UIReducer(undefined, uiActions.toggleWishList())).toEqual({
      ...initialUIState,
      showWishList: true,
    });
  });

  it('placeOrder to turn true if no original state', () => {
    expect(UIReducer(undefined, uiActions.placeOrder())).toEqual({
      ...initialUIState,
      placeOrder: true,
    });
  });

  it('placeOrder to turn true with given state', () => {
    expect(UIReducer(initialUIState, uiActions.placeOrder())).toEqual({
      ...initialUIState,
      placeOrder: true,
    });
  });

  it('removePlaceOrder to turn placeOrder false with given state', () => {
    const previousState = {
      ...initialUIState,
      placeOrder: true,
    };

    expect(UIReducer(previousState, uiActions.removePlaceOrder())).toEqual(
      initialUIState
    );
  });
  it('removePlaceOrder to turn placeOrder false with no  given state', () => {
    expect(UIReducer(undefined, uiActions.removePlaceOrder())).toEqual(
      initialUIState
    );
  });

  it.each([
    ToastType.empty,
    ToastType.addCart,
    ToastType.addWishlist,
    ToastType.removeCart,
    ToastType.removeWishlist,
  ])('change toast %s changes to correct toast message', (toastMessage) => {
    expect(UIReducer(undefined, uiActions.changeToast(toastMessage))).toEqual({
      ...initialUIState,
      toast: toastMessage,
    });
  });
});
