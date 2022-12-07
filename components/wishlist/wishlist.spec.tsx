import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wishlist from './wishlist';
import { renderWithProviders } from '../../helpers/test-utils';
import { ReactPortal } from 'react';
import ReactDOM from 'react-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Record<string, unknown>),
  useDispatch: () => mockDispatch,
}));

ReactDOM.createPortal = jest.fn((element, _node) => {
  return element as ReactPortal;
});

describe('Wishlist', () => {
  it('should render the wishlist', () => {
    renderWithProviders(<Wishlist />);
    const wishlistHeading = screen.getByRole('heading', { name: 'Wishlist' });
    expect(wishlistHeading).toBeInTheDocument();
  });

  it('displays wishlist items from redux state', () => {
    renderWithProviders(<Wishlist />);
    const item2 = screen.getByRole('heading', { name: 'item2' });
    expect(item2).toBeInTheDocument();
  });

  it('close modal on click', async () => {
    renderWithProviders(<Wishlist />);
    const closeButton = screen.getByRole('button', { name: 'X' });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'ui/toggleWishList',
      });
    });
  });
});
