import Image from 'next/image';
import type { Product } from '../../helpers/types';
import { wishlistActions } from '../../store/wishlist';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { useInWishlistOrCart } from '../../helpers/redux-helpers';

export const ProductTile = (props: { product: Product; inView: boolean }) => {
  const { description, image, price, title, id } = props.product;
  const { inView } = props;
  const inWishlist = useInWishlistOrCart(id);

  const dispatch = useDispatch();

  const toggleWishlist = () => {
    if (inWishlist) dispatch(wishlistActions.removeItem(id));
    else dispatch(wishlistActions.addItem(props.product));
  };
  const addToCart = () => {
    dispatch(cartActions.addItem(props.product));
  };

  return (
    <div className="product-tile">
      <div className="product-tile__button-container">
        <button onClick={toggleWishlist}>{inWishlist ? 'RW' : 'W'}</button>
        <button onClick={addToCart}>{'C'}</button>
      </div>
      <div className="product-tile__image">
        <Image src={image} alt={title} fill sizes="25rem" priority={inView} />
      </div>

      <h2 className="heading2 product-tile__heading">{title}</h2>

      <p className="paragraph product-tile__description">{description}</p>

      <p className="paragraph product-tile__price">£{price}</p>
    </div>
  );
};

export default ProductTile;
