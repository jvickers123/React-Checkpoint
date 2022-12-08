import Toast from './toast';
import { renderWithProviders } from '../../helpers/test-utils';
import { screen } from '@testing-library/react';
import { ToastType } from '../../store/ui-slice';
import { initialState } from '../../store/index';

jest.useFakeTimers();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Record<string, unknown>),
  useDispatch: () => mockDispatch,
}));

describe('Toast', () => {
  it('empty toast by default', () => {
    renderWithProviders(<Toast />);
    // search for any character that isn't new line
    const anyText = screen.queryByText(/./i);
    expect(anyText).not.toBeInTheDocument();
  });

  it.each([
    ToastType.addCart,
    ToastType.addWishlist,
    ToastType.removeCart,
    ToastType.removeWishlist,
  ])('Toast message %s is rendered', (toastMessage) => {
    const uiState = {
      showCart: false,
      showWishList: false,
      placeOrder: false,
      toast: toastMessage,
    };
    renderWithProviders(<Toast />, {
      preloadedState: { ...initialState, ui: uiState },
    });

    const toast = screen.getByText(toastMessage);
    expect(toast).toBeInTheDocument();
  });

  it('Toast message calls setTimeout', () => {
    const uiState = {
      showCart: false,
      showWishList: false,
      placeOrder: false,
      toast: ToastType.addWishlist,
    };
    renderWithProviders(<Toast />, {
      preloadedState: { ...initialState, ui: uiState },
    });
    jest.spyOn(global, 'setTimeout');

    renderWithProviders(<Toast />);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });

  it('setTimeout calls dispatch and clears message', () => {
    renderWithProviders(<Toast />);

    jest.runAllTimers();
    expect(mockDispatch).toBeCalledWith({
      payload: '',
      type: 'ui/changeToast',
    });
  });
});
