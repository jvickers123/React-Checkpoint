import Image from 'next/image';
import type { Product } from '../../helpers/types';
import { wishlistActions } from '../../store/wishlist';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { useInWishlistOrCart } from '../../helpers/redux-helpers';
import { renderIcon } from '../UI/renderIcon';
import { ToastType, uiActions } from '../../store/ui-slice';

/**
 *
 * @param product product item to be rendered
 * @param inView If item is in view on first render, will add priority loading to image
 * @returns Product Tile element
 */
const ProductTile = (props: { product: Product; inView: boolean }) => {
  const { image, price, title, id } = props.product;
  const { inView } = props;
  const inWishlist = useInWishlistOrCart({ givenId: id });

  const dispatch = useDispatch();

  const toggleWishlist = () => {
    if (inWishlist) {
      dispatch(wishlistActions.removeItem(id));
      dispatch(uiActions.changeToast(ToastType.removeWishlist));
    } else {
      dispatch(wishlistActions.addItem(props.product));
      dispatch(uiActions.changeToast(ToastType.addWishlist));
    }
  };

  const addToCart = () => {
    dispatch(cartActions.addItem(props.product));
    dispatch(uiActions.changeToast(ToastType.addCart));
  };

  // check if in wishlist and change icon accordingly
  const wishlistIcon = inWishlist
    ? renderIcon({ iconName: 'heart-filled', alt: 'remove from wishlist' })
    : renderIcon({ iconName: 'heart-empty', alt: 'add to wishlist' });

  const cartIcon = renderIcon({ iconName: 'add-to-cart', alt: 'add to cart' });

  return (
    <div className="product-tile">
      <div className="product-tile__button-container">
        <button onClick={toggleWishlist} className="button">
          {wishlistIcon}
        </button>
        <button onClick={addToCart} className="button">
          {cartIcon}
        </button>
      </div>
      <div className="product-tile__image">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="250px"
          priority={inView}
        />
      </div>

      <h2 className="paragraph product-tile__title">{title}</h2>

      <p className="paragraph product-tile__price">£{price}</p>
    </div>
  );
};

export default ProductTile;
