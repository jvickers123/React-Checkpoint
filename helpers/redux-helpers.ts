import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product } from './types';

export const useInWishlistOrCart = (givenId: number, wishlist = true) => {
  const list = wishlist ? 'wishlist' : 'cart';
  const { items } = useSelector<RootState, { items: Product[] }>(
    (state) => state[list]
  );
  return items.some(({ id }) => givenId === id);
};
