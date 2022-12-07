import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleWishList = () => dispatch(uiActions.toggleWishList());
  const toggleCart = () => dispatch(uiActions.toggleCart());

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={toggleWishList}>wishlist</button>
        </li>
        <li>
          <button onClick={toggleCart}>cart</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
