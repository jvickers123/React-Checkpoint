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
      <img alt={props.alt} src={props.src} />
    );
  },
}));

describe('CartItem', () => {
  it('Cart Item - Displays product title', () => {
    render(<CartProductItem product={mockCartData[0]} />);
    const item1 = screen.getByText('item1');
    expect(item1).toBeInTheDocument();
  });

  it('addToCart calls add to cart function', async () => {
    render(<CartProductItem product={mockCartData[0]} />);
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
    render(<CartProductItem product={mockCartData[0]} />);
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
});
