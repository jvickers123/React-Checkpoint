import { render, renderHook, RenderOptions } from '@testing-library/react';
import { mockCartData, mockData } from '../mock/mockData';
import { initStore } from '../store';
import { AppStore, RootState } from '../store';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ToastType } from '../store/ui-slice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 *
 * @param hookOrElement if a hook this will use renderHook if JSX element it will use render
 * @param preloadedState state to render component or hook with, default is initial state.
 * @returns render(element) with wrapper or renderHook with wrapper
 */
export const renderWithProviders = (
  hookOrElement: (() => any) | JSX.Element,
  {
    preloadedState = {
      wishlist: { items: mockData },
      cart: {
        items: mockCartData,
      },
      ui: {
        showCart: false,
        showWishList: false,
        placeOrder: false,
        toast: ToastType.empty,
      },
    },
  }: ExtendedRenderOptions = {}
) => {
  const store = initStore(preloadedState);
  const Wrapper = ({ children }: { children: JSX.Element }) => (
    <Provider store={store}>{children}</Provider>
  );

  // if type is function then element was a hook
  if (typeof hookOrElement === 'function') {
    return renderHook(hookOrElement as () => any, {
      wrapper: Wrapper,
    });
  } else {
    return render(hookOrElement as JSX.Element, {
      wrapper: Wrapper,
    });
  }
};
