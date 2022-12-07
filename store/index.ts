import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Product, CartItem } from '../helpers/types';
import CartReducer from './cart';
import UIReducer from './ui-slice';
import WishlistReducer from './wishlist';

export type RootState = {
  wishlist: {
    items: Product[];
  };
  cart: {
    items: CartItem[];
    changed: boolean;
  };
  ui: {
    showCart: boolean;
    showWishList: boolean;
    placeOrder: boolean;
  };
};

export const initStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: { wishlist: WishlistReducer, ui: UIReducer, cart: CartReducer },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initStore>;
export default initStore;
