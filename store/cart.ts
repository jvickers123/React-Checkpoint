import { createSlice } from '@reduxjs/toolkit';
import type { Product, CartItem } from '../helpers/types';

const initialState: { items: CartItem[] } = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      if (!action.payload.items) state.items = [];
      else state.items = action.payload.items;
    },

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += newItem.price;
      } else
        state.items.push({
          ...newItem,
          total: newItem.price,
          quantity: 1,
        });
    },

    removeItem(state, action) {
      const item = state.items.find(
        ({ id }) => id === action.payload
      ) as CartItem;
      if (item.quantity > 1) {
        item.quantity--;
        item.total -= item.price;
      } else
        state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
