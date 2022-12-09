import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product } from './types';

/**
 * checks if item is in wishlist or cart
 * @param givenId
 * @param wishlist true if looking in wishlist false if in cart: default true
 * @returns boolean
 */
export const useInWishlistOrCart = (givenId: number, wishlist = true) => {
  const list = wishlist ? 'wishlist' : 'cart';
  const { items } = useSelector<RootState, { items: Product[] }>(
    (state) => state[list]
  );
  return items.some(({ id }) => givenId === id);
};
