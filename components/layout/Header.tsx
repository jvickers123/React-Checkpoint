import Navbar from '../navbar/navbar';
import { renderIcon } from '../UI/renderIcon';

const Header = () => {
  const shopIcon = renderIcon({
    iconName: 'store',
    alt: 'Shop logo',
    height: 70,
    width: 70,
  });
  return (
    <header className="header">
      {shopIcon}
      <h1 className="header__title heading1">Best Shop Ever</h1>
      <Navbar />
    </header>
  );
};
export default Header;
