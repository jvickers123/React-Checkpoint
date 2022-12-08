import { screen } from '@testing-library/react';
import Home, { getStaticProps } from '../pages/index';
import { mockData } from '../mock/mockData';
import { renderWithProviders } from '../helpers/test-utils';
import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';
import { ToastType } from '../store/ui-slice';
import { initialState } from '../store';

const mockGetApi = jest.fn();

jest.mock('../helpers/api-utils', () => ({
  getAllItems: () => mockGetApi(),
}));
ReactDOM.createPortal = jest.fn((element, node) => {
  return element as ReactPortal;
});

describe('pages/index', () => {
  it('happy path - render products on page', () => {
    renderWithProviders(<Home products={mockData} />);
    const item1 = screen.getByRole('heading', { name: 'item1' });
    const item2 = screen.getByRole('heading', { name: 'item2' });

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('default allows scroll', () => {
    renderWithProviders(<Home products={mockData} />);
    const main = screen.getByRole('main');

    expect(main.className).toEqual('main');
  });

  it('default hides wishlist', () => {
    renderWithProviders(<Home products={mockData} />);
    const wishlistHeading = screen.queryByRole('heading', { name: 'Wishlist' });
    expect(wishlistHeading).not.toBeInTheDocument();
  });

  it('Shows Wishlist when showWishlist is true', () => {
    const uiState = {
      showCart: false,
      showWishList: true,
      placeOrder: false,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const wishlistHeading = screen.getByRole('heading', { name: 'Wishlist' });
    expect(wishlistHeading).toBeInTheDocument();
  });

  it('Disables scroll when showWishlist is true', () => {
    const uiState = {
      showCart: false,
      showWishList: true,
      placeOrder: false,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const main = screen.getByRole('main');
    expect(main.className).toEqual('main__noScroll');
  });

  it('default hides cart', () => {
    renderWithProviders(<Home products={mockData} />);
    const cartHeading = screen.queryByRole('heading', { name: 'Cart' });
    expect(cartHeading).not.toBeInTheDocument();
  });

  it('Shows cart when showCart is true', () => {
    const uiState = {
      showCart: true,
      showWishList: false,
      placeOrder: false,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const cartHeading = screen.getByRole('heading', { name: 'Cart' });
    expect(cartHeading).toBeInTheDocument();
  });

  it('Disables scroll when showCart is true', () => {
    const uiState = {
      showCart: true,
      showWishList: false,
      placeOrder: false,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const main = screen.getByRole('main');
    expect(main.className).toEqual('main__noScroll');
  });

  it('Disables scroll when placeOrder is true', () => {
    const uiState = {
      showCart: false,
      showWishList: false,
      placeOrder: true,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const main = screen.getByRole('main');
    expect(main.className).toEqual('main__noScroll');
  });

  it('default hides placeOrder', () => {
    renderWithProviders(<Home products={mockData} />);
    const placeOrderHeading = screen.queryByRole('heading', {
      name: 'Thank you for your purchase!',
    });
    expect(placeOrderHeading).not.toBeInTheDocument();
  });

  it('Shows placeOrder when placeOrder is true', () => {
    const uiState = {
      showCart: false,
      showWishList: false,
      placeOrder: true,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const placeOrderHeading = screen.getByRole('heading', {
      name: 'Thank you for your purchase!',
    });
    expect(placeOrderHeading).toBeInTheDocument();
  });

  it('Disables scroll when placeOrder is true', () => {
    const uiState = {
      showCart: false,
      showWishList: false,
      placeOrder: true,
      toast: ToastType.empty,
    };

    renderWithProviders(<Home products={mockData} />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    const main = screen.getByRole('main');
    expect(main.className).toEqual('main__noScroll');
  });

  it('hides error message when products list is showing', () => {
    renderWithProviders(<Home products={mockData} />);
    const errorMessage = screen.queryByText(
      'Something went wrong. Please try again later'
    );
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('show error message when products list is empty', () => {
    renderWithProviders(<Home products={[]} />);
    const errorMessage = screen.getByText(
      'Something went wrong. Please try again later'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('getStaticProps', () => {
  it('returns mock server data', async () => {
    mockGetApi.mockResolvedValueOnce(mockData);
    const staticProps = await getStaticProps({ locale: 'en' });
    expect(staticProps).toEqual({
      props: { products: mockData },
    });
  });

  it('returns empty array when getAllItems fails server data', async () => {
    mockGetApi.mockImplementationOnce(() => {});
    const staticProps = await getStaticProps({ locale: 'en' });
    expect(staticProps).toEqual({
      props: { products: [] },
    });
  });
});
