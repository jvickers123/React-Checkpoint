import Cart from './cart';
import { renderWithProviders } from '../../helpers/test-utils';
import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

ReactDOM.createPortal = jest.fn((element, _node) => {
  return element as ReactPortal;
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Record<string, unknown>),
  useDispatch: () => mockDispatch,
}));

describe('Cart', () => {
  it('renders cart', () => {
    renderWithProviders(<Cart />);
    const cartHeading = screen.getByRole('heading', { name: 'Cart' });

    expect(cartHeading).toBeInTheDocument();
  });

  it('Displays cart items', () => {
    renderWithProviders(<Cart />);
    const item1 = screen.getByRole('heading', { name: 'item1' });
    const item2 = screen.getByRole('heading', { name: 'item2' });

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('displays correct total', () => {
    renderWithProviders(<Cart />);
    const total = screen.getByText('Total', { exact: false });

    expect(total).toHaveTextContent('Total: £32.00');
  });

  it('clear Cart button clears the cart', async () => {
    renderWithProviders(<Cart />);
    const clearBtn = screen.getByRole('button', { name: 'clear' });

    userEvent.click(clearBtn);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        payload: {},
        type: 'cart/replaceCart',
      });
    });
  });

  it('closes cart on close cart button', async () => {
    renderWithProviders(<Cart />);
    const closeButton = screen.getByRole('button', { name: 'X' });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'ui/toggleCart',
      });
    });
  });

  it('closes cart on close cart button', async () => {
    renderWithProviders(<Cart />);
    const placeOrder = screen.getByRole('button', { name: 'Place Order' });
    userEvent.click(placeOrder);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'ui/toggleCart',
      });
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'ui/placeOrder',
      });
    });
  });
});
