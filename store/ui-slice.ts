import { createSlice } from '@reduxjs/toolkit';

export enum ToastType {
  addCart = 'Added to cart!',
  removeCart = 'Removed from cart!',
  addWishlist = 'Added to wishlist!',
  removeWishlist = 'Removed from wishlist!',
  empty = '',
}

const uISlice = createSlice({
  name: 'ui',
  initialState: {
    showCart: false,
    showWishList: false,
    placeOrder: false,
    toast: ToastType.empty,
  },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    toggleWishList(state) {
      state.showWishList = !state.showWishList;
    },
    placeOrder(state) {
      state.placeOrder = true;
    },
    removePlaceOrder(state) {
      state.placeOrder = false;
    },
    changeToast(state, action) {
      state.toast = action.payload;
    },
  },
});

export const uiActions = uISlice.actions;

export default uISlice.reducer;
