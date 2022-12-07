import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../helpers/types';
import { RootState } from '../../store';
import { cartActions } from '../../store/cart';
import { uiActions } from '../../store/ui-slice';
import Modal from './modal';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const { items } = useSelector<RootState, { items: CartItem[] }>(
    (state) => state.cart
  );
  const total = items.reduce((acc, item) => acc + item.total, 0).toFixed(2);

  useEffect(() => {
    const removeOrderTimer = setTimeout(() => {
      dispatch(uiActions.removePlaceOrder());
      dispatch(cartActions.replaceCart({}));
    }, 1000 * 3);
    return () => clearTimeout(removeOrderTimer);
  }, [dispatch]);
  return (
    <Modal
      closeModal={() => {
        console.log(close);
      }}
    >
      <>
        <h2>Thank you for your purchase!</h2>
        {items.map((item) => (
          <p key={item.id}>
            {item.title} - {item.price} x {item.quantity}
          </p>
        ))}
        <p>Total: £{total}</p>
      </>
    </Modal>
  );
};

export default PlaceOrderScreen;
