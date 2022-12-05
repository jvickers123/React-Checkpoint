import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../helpers/types';

export type CartItem = Product & { quantity: number; total: number };

const initialState: { items: CartItem[]; changed: boolean } = {
  items: [],
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },

    addItem(state, action) {
      state.changed = true;
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
      state.changed = true;
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
