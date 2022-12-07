import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../helpers/test-utils';
import Navbar from './navbar';

const dispatchMock = jest.fn();

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Record<string, unknown>),
  useDispatch: () => dispatchMock,
}));

describe('Navbar', () => {
  it('renders correct options', () => {
    renderWithProviders(<Navbar />);

    const nav = screen.getByRole('navigation');
    const listItems = screen.getAllByRole('listitem');

    expect(nav).toBeInTheDocument();
    expect(listItems.length).toEqual(1);
  });

  it('opens wishlist on button click', async () => {
    renderWithProviders(<Navbar />);
    const wishlistBtn = screen.getByRole('button', { name: 'wishlist' });
    userEvent.click(wishlistBtn);

    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: undefined,
        type: 'ui/toggleWishList',
      })
    );
  });
});
