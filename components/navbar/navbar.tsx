import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { renderIcon } from '../UI/renderIcon';

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleWishList = () => dispatch(uiActions.toggleWishList());
  const toggleCart = () => dispatch(uiActions.toggleCart());

  const wishlistIcon = renderIcon({
    iconName: 'heart-filled-white',
    alt: 'Wishlist',
  });

  const cartIcon = renderIcon({
    iconName: 'shoppingCart',
    alt: 'Shopping Cart',
  });

  return (
    <nav>
      <ul className="nav__container">
        <li className="nav__item">
          <button className="button nav__button" onClick={toggleWishList}>
            {wishlistIcon}
          </button>
        </li>
        <li className="nav__item">
          <button className="button nav__button" onClick={toggleCart}>
            {cartIcon}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
