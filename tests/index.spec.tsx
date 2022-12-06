import { screen } from '@testing-library/react';
import Home, { getStaticProps } from '../pages/index';
import { mockData, mockCartData } from '../mock/mockData';
import { renderWithProviders } from '../helpers/test-utils';
import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';

ReactDOM.createPortal = jest.fn((element, node) => {
  return element as ReactPortal;
});

const preloadedStateWithShowWishList = {
  wishlist: { items: mockData },
  cart: { items: mockCartData, changed: false },
  ui: { showCart: false, showWishList: true },
};

describe('pages/index', () => {
  it('happy path - render products on page', () => {
    renderWithProviders(<Home products={mockData} carts={mockCartData} />);
    const item1 = screen.getByRole('heading', { name: 'item1' });
    const item2 = screen.getByRole('heading', { name: 'item2' });

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('default hides wishlist', () => {
    renderWithProviders(<Home products={mockData} carts={mockCartData} />);
    const main = screen.getByRole('main');

    expect(main.className).toEqual('main');
  });

  it('shows modal with showModal true', () => {
    renderWithProviders(<Home products={mockData} carts={mockCartData} />, {
      preloadedState: preloadedStateWithShowWishList,
    });
    const main = screen.getByRole('main');
    expect(main.className).toEqual('main__noScroll');
  });
});

describe('getStaticProps', () => {
  it('returns mock server data', async () => {
    const staticProps = await getStaticProps({ locale: 'en' });
    expect(staticProps).toEqual({
      props: { products: mockData, carts: mockCartData },
    });
  });
});
