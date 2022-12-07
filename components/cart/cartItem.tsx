import Image from 'next/image';
import type { CartItem } from '../../helpers/types';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { renderIcon } from '../UI/renderIcon';

const CartProductItem = (props: { product: CartItem; inView: boolean }) => {
  const { image, price, title, id, quantity, total } = props.product;
  const { inView } = props;
  const dispatch = useDispatch();

  const addToCart = () => dispatch(cartActions.addItem(props.product));
  const removeFromCart = () => dispatch(cartActions.removeItem(id));

  const addIcon = renderIcon({ iconName: 'add-to-cart', alt: 'add to cart' });
  const removeIcon = renderIcon({
    iconName: 'cart-remove',
    alt: 'remove from cart',
  });
  return (
    <div className="product-tile">
      <div className="product-tile__button-container">
        <button onClick={addToCart}>{addIcon}</button>
        <button onClick={removeFromCart}>{removeIcon}</button>
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
