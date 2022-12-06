import ProductsList from './productsList';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../helpers/types';
import { RootState } from '../store';
import Modal from './UI/modal';
import { uiActions } from '../store/ui-slice';

const Wishlist = () => {
  const dispatch = useDispatch();

  const { items } = useSelector<RootState, { items: Product[] }>(
    (state) => state.wishlist
  );

  const closeModal = () => {
    dispatch(uiActions.toggleWishList());
  };

  return (
    <>
      <Modal closeModal={closeModal}>
        <>
          <button onClick={closeModal}>X</button>
          <h2>Wishlist</h2>
          <div className="modal__content">
            <ProductsList products={items} />
          </div>
        </>
      </Modal>
    </>
  );
};

export default Wishlist;
