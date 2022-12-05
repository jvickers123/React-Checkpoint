import ProductsList from './productsList';
import { useSelector } from 'react-redux';
import { Product } from '../helpers/types';
import { RootState } from '../store';

const Wishlist = () => {
  const { items } = useSelector<RootState, { items: Product[] }>(
    (state) => state.wishlist
  );
  return (
    <>
      <h2>Wishlist</h2>
      <ProductsList products={items} />
    </>
  );
};

export default Wishlist;
