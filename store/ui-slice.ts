import { createSlice } from '@reduxjs/toolkit';

const uISlice = createSlice({
  name: 'ui',
  initialState: { showCart: false, showWishList: false },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    toggleWishList(state) {
      state.showWishList = !state.showWishList;
    },
  },
});

export const uiActions = uISlice.actions;

export default uISlice.reducer;
