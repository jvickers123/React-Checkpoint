import Image from 'next/image';
import type { CartItem } from '../../helpers/types';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

export const CartProductItem = (props: {
  product: CartItem;
  inView: boolean;
}) => {
  const { image, price, title, id, quantity, total } = props.product;
  const { inView } = props;
  const dispatch = useDispatch();

  const addToCart = () => dispatch(cartActions.addItem(props.product));
  const removeFromCart = () => dispatch(cartActions.removeItem(id));

  return (
    <div className="product-tile">
      <div className="product-tile__button-container">
        <button onClick={addToCart}>{'C'}</button>
        <button onClick={removeFromCart}>{'R'}</button>
      </div>
      <div className="product-tile__image">
        <Image src={image} alt={title} fill sizes="25rem" priority={inView} />
      </div>

      <h2 className="heading2 product-tile__heading">{title}</h2>

      <p className="paragraph product-tile__price">
        £{price} x {quantity}
      </p>
      <p className="paragraph product-tile__total">£{total.toFixed(2)}</p>
    </div>
  );
};

export default CartProductItem;
