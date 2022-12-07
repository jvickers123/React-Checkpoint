import PlaceOrder from './placeOrderScreen';
import { renderWithProviders } from '../../helpers/test-utils';
import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

jest.useFakeTimers();
ReactDOM.createPortal = jest.fn((element, _node) => {
  return element as ReactPortal;
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Record<string, unknown>),
  useDispatch: () => mockDispatch,
}));

describe('placeOrder', () => {
  it('renders modal', () => {
    renderWithProviders(<PlaceOrder />);
    const thankYouHeading = screen.getByRole('heading', {
      name: 'Thank you for your purchase!',
    });
    expect(thankYouHeading).toBeInTheDocument();
  });

  it('displays items', () => {
    renderWithProviders(<PlaceOrder />);
    const item1 = screen.getByText('item1 - 10.00 x 1');
    const item2 = screen.getByText('item2 - 11.00 x 2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('calls setTimeout on first render', () => {
    jest.spyOn(global, 'setTimeout');

    renderWithProviders(<PlaceOrder />);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });

  it('clears cart and removes modal on closeModal', async () => {
    renderWithProviders(<PlaceOrder />);

    const closeBtn = screen.getByRole('button', { name: 'X' });

    userEvent.click(closeBtn);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'ui/removePlaceOrder',
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {},
        type: 'cart/replaceCart',
      });
    });
  });
});
