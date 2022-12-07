import CartProductItem from './cartItem';
import { mockCartData } from '../../mock/mockData';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../helpers/redux-helpers');

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
        data-priority={props.priority?.toString()}
      />
    );
  },
}));

describe('CartItem', () => {
  it('Cart Item - Displays product title', () => {
    render(<CartProductItem product={mockCartData[0]} inView={true} />);
    const item1 = screen.getByText('item1');
    expect(item1).toBeInTheDocument();
  });

  it('Cart Item - image displayed with priority if inView is set to true', () => {
    render(<CartProductItem product={mockCartData[0]} inView={true} />);
    const image = screen.getByRole('img', { name: 'item1' });
    expect(image.dataset.priority).toEqual('true');
  });

  it('Cart Item - image displayed withOUT priority if inView is set to false', () => {
    render(<CartProductItem product={mockCartData[0]} inView={false} />);
    const image = screen.getByRole('img', { name: 'item1' });
    expect(image.dataset.priority).toEqual('false');
  });

  it('addToCart calls add to cart function', async () => {
    render(<CartProductItem product={mockCartData[0]} inView={false} />);
    const addToCartBtn = screen.getByRole('button', { name: 'add to cart' });

    userEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: mockCartData[0],
        type: 'cart/addItem',
      });
    });
  });

  it('removeFromCart calls removeItem function', async () => {
    render(<CartProductItem product={mockCartData[0]} inView={false} />);
    const removeFromCartBtn = screen.getByRole('button', {
      name: 'remove from cart',
    });

    userEvent.click(removeFromCartBtn);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: mockCartData[0].id,
        type: 'cart/removeItem',
      });
    });
  });

  // it('useDispatch is called once');
});
