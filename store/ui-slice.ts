import { createSlice } from '@reduxjs/toolkit';

const uISlice = createSlice({
  name: 'ui',
  initialState: {
    showCart: false,
    showWishList: false,
    placeOrder: false,
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
  },
});

export const uiActions = uISlice.actions;

export default uISlice.reducer;
