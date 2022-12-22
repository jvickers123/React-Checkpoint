import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Product, CartItem } from '../helpers/types';
import CartReducer from './cart';
import UIReducer from './ui-slice';
import WishlistReducer from './wishlist';
import { ToastType } from './ui-slice';
import { mockData, mockCartData } from '../mock/mockData';

export type RootState = {
  wishlist: {
    items: Product[];
  };
  cart: {
    items: CartItem[];
  };
  ui: {
    showCart: boolean;
    showWishList: boolean;
    placeOrder: boolean;
    toast: ToastType;
  };
};

export const initialState = {
  wishlist: { items: mockData },
  cart: { items: mockCartData },
  ui: {
    showCart: false,
    showWishList: false,
    placeOrder: false,
    toast: ToastType.empty,
  },
};

export const initStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: { wishlist: WishlistReducer, ui: UIReducer, cart: CartReducer },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initStore>;
