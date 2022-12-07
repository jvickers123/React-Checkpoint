import Navbar from '../navbar/navbar';
import { renderIcon } from '../UI/renderIcon';

const Header = () => {
  const shopIcon = renderIcon({ iconName: 'store', alt: 'Shop logo' });
  return (
    <header className="header">
      {shopIcon}
      <h1 className="header__title">Best Shop Ever</h1>
      <Navbar />
    </header>
  );
};
export default Header;
