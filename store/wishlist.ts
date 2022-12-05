import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../helpers/types';

const initialState: { items: Product[] } = { items: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    replaceWishlist(state, action) {
      state.items = action.payload.items;
    },

    addItem(state, action) {
      state.items.push(action.payload);
    },

    removeItem(state, action) {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
