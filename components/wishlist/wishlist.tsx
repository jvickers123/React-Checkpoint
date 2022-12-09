import ProductsList from '../products/productsList';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../helpers/types';
import { RootState } from '../../store';
import Modal from '../UI/modal';
import { uiActions } from '../../store/ui-slice';

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
          <button className="button modal__btn" onClick={closeModal}>
            Close
          </button>
          <h2 className="heading2">Wishlist</h2>
          <div
            className={
              items.length
                ? 'modal__content'
                : 'modal__content modal__content--no-overflow'
            }
          >
            {items.length ? (
              <ProductsList products={items} />
            ) : (
              <p className="paragraph">
                Looks like you haven&apos;t added any items to your wishlist.
              </p>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default Wishlist;
