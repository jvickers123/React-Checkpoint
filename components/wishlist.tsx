import ProductsList from './productsList';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../helpers/types';
import { RootState } from '../store';
import Modal from './UI/modal';
import { uiActions } from '../store/ui-slice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { showWishList } = useSelector<RootState, { showWishList: boolean }>(
    (state) => state.ui
  );

  const { items } = useSelector<RootState, { items: Product[] }>(
    (state) => state.wishlist
  );

  const closeModal = () => {
    dispatch(uiActions.toggleWishList());
  };
  return (
    <>
      {showWishList && (
        <Modal closeModal={closeModal}>
          <>
            <h2>Wishlist</h2>
            <ProductsList products={items} />
          </>
        </Modal>
      )}
    </>
  );
};

export default Wishlist;
