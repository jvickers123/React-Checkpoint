import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleWishList = () => dispatch(uiActions.toggleWishList());

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={toggleWishList}>wishlist</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
