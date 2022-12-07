import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { renderIcon } from '../UI/renderIcon';

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleWishList = () => dispatch(uiActions.toggleWishList());
  const toggleCart = () => dispatch(uiActions.toggleCart());

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={toggleWishList}>
            {renderIcon({ iconName: 'heart-filled', alt: 'Wishlist' })}
          </button>
        </li>
        <li>
          <button onClick={toggleCart}>
            {renderIcon({ iconName: 'shoppingCart', alt: 'Shopping Cart' })}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
