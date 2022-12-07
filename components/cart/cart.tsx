import ProductsList from '../products/productsList';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../../helpers/types';
import { RootState } from '../../store';
import Modal from '../UI/modal';
import { uiActions } from '../../store/ui-slice';
import { cartActions } from '../../store/cart';

const Cart = () => {
  const dispatch = useDispatch();

  const { items } = useSelector<RootState, { items: CartItem[] }>(
    (state) => state.cart
  );
  const total = items.reduce((acc, item) => acc + item.total, 0).toFixed(2);

  const closeModal = () => dispatch(uiActions.toggleCart());
  const clearCart = () => dispatch(cartActions.replaceCart({}));
  const placeOrder = () => {
    dispatch(uiActions.toggleCart());
    dispatch(uiActions.placeOrder());
  };

  return (
    <>
      <Modal closeModal={closeModal}>
        <>
          <button onClick={closeModal}>X</button>
          <button onClick={clearCart}>clear</button>
          <h2>Cart</h2>
          <div className="modal__content">
            <ProductsList cart={items} />
          </div>
          <p>Total: £{total}</p>
          <button onClick={placeOrder}>Place Order</button>
        </>
      </Modal>
    </>
  );
};

export default Cart;
