import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../helpers/types';
import { RootState } from '../../store';
import { cartActions } from '../../store/cart';
import { uiActions } from '../../store/ui-slice';
import Modal from './modal';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const { items } = useSelector<RootState, { items: CartItem[] }>(
    (state) => state.cart
  );
  const total = items.reduce((acc, item) => acc + item.total, 0).toFixed(2);

  const closeModal = useCallback(() => {
    dispatch(uiActions.removePlaceOrder());
    dispatch(cartActions.replaceCart({}));
  }, [dispatch]);

  useEffect(() => {
    const removeOrderTimer = setTimeout(closeModal, 1000 * 3);
    return () => clearTimeout(removeOrderTimer);
  }, [closeModal]);
  return (
    <Modal closeModal={closeModal}>
      <>
        <h2>Thank you for your purchase!</h2>
        {items.map((item) => (
          <p key={item.id}>
            {item.title} - {item.price.toFixed(2)} x {item.quantity}
          </p>
        ))}
        <p>Total: £{total}</p>
        <button onClick={closeModal}>X</button>
      </>
    </Modal>
  );
};

export default PlaceOrder;
