import ProductTile from './productTile';
import { mockData } from '../mock/mockData';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import * as UseInList from '../helpers/redux-helpers';

jest.mock('next/image');
jest.mock('../helpers/redux-helpers');

const dispatchMock = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    sizes: string;
    fill: boolean;
    priority: boolean;
  }) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={props.alt}
        src={props.src}
        data-priority={props.priority.toString()}
      />
    );
  },
}));

describe('ProductTile', () => {
  it('Displays product title', () => {
    render(<ProductTile product={mockData[0]} inView={true} />);
    const item1 = screen.getByText('item1');
    expect(item1).toBeInTheDocument();
  });

  it('image displayed with priority if inView is set to true', () => {
    render(<ProductTile product={mockData[0]} inView={true} />);
    const image = screen.getByRole('img', { name: 'item1' });
    expect(image.dataset.priority).toEqual('true');
  });

  it('image displayed withOUT priority if inView is set to false', () => {
    render(<ProductTile product={mockData[0]} inView={false} />);
    const image = screen.getByRole('img', { name: 'item1' });
    expect(image.dataset.priority).toEqual('false');
  });

  it('Adds to wishlist if item not on wishlist', async () => {
    jest.spyOn(UseInList, 'useInWishlistOrCart').mockReturnValueOnce(false);

    render(<ProductTile product={mockData[0]} inView={false} />);

    const addToWishListButton = screen.getByRole('button', { name: 'W' });
    const removeFromWishListButton = screen.queryByRole('button', {
      name: 'RW',
    });

    expect(addToWishListButton).toBeInTheDocument();
    expect(removeFromWishListButton).not.toBeInTheDocument();

    UserEvent.click(addToWishListButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: mockData[0],
        type: 'wishlist/addItem',
      });
    });
  });

  it('Removes item from wishlist if already on wishlist', async () => {
    jest.spyOn(UseInList, 'useInWishlistOrCart').mockReturnValueOnce(true);

    render(<ProductTile product={mockData[0]} inView={false} />);

    const addToWishListButton = screen.queryByRole('button', { name: 'W' });
    const removeFromWishListButton = screen.getByRole('button', {
      name: 'RW',
    });

    expect(addToWishListButton).not.toBeInTheDocument();
    expect(removeFromWishListButton).toBeInTheDocument();

    UserEvent.click(removeFromWishListButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: 1,
        type: 'wishlist/removeItem',
      });
    });
  });

  it('Adds to cart if item not on cart', async () => {
    jest.spyOn(UseInList, 'useInWishlistOrCart').mockReturnValue(false);

    render(<ProductTile product={mockData[0]} inView={false} />);

    const addToCartButton = screen.getByRole('button', { name: 'C' });
    const removeFromCartButton = screen.queryByRole('button', {
      name: 'RC',
    });

    expect(addToCartButton).toBeInTheDocument();
    expect(removeFromCartButton).not.toBeInTheDocument();

    UserEvent.click(addToCartButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: mockData[0],
        type: 'cart/addItem',
      });
    });
  });

  it('Removes item from cart if already on cart', async () => {
    jest.spyOn(UseInList, 'useInWishlistOrCart').mockReturnValue(true);

    render(<ProductTile product={mockData[0]} inView={false} />);

    const addToCartButton = screen.queryByRole('button', { name: 'C' });
    const removeFromCartButton = screen.getByRole('button', {
      name: 'RC',
    });

    expect(addToCartButton).not.toBeInTheDocument();
    expect(removeFromCartButton).toBeInTheDocument();

    UserEvent.click(removeFromCartButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: 1,
        type: 'cart/removeItem',
      });
    });
  });
});
