import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { renderIcon } from '../UI/renderIcon';

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleWishList = () => dispatch(uiActions.toggleWishList());
  const toggleCart = () => dispatch(uiActions.toggleCart());
  const wishlistIcon = renderIcon({
    iconName: 'heart-filled',
    alt: 'Wishlist',
  });
  const cartIcon = renderIcon({
    iconName: 'shoppingCart',
    alt: 'Shopping Cart',
  });

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={toggleWishList}>{wishlistIcon}</button>
        </li>
        <li>
          <button onClick={toggleCart}>{cartIcon}</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
