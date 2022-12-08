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
    store = initStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: JSX.Element }) => (
    <Provider store={store}>{children}</Provider>
  );

  // check if to renderhook or render()
  if (typeof hookOrElement === 'function') {
    return {
      store,
      ...renderHook(hookOrElement as () => any, {
        wrapper: Wrapper,
        ...renderOptions,
      }),
    };
  } else {
    return {
      store,
      ...render(hookOrElement as JSX.Element, {
        wrapper: Wrapper,
        ...renderOptions,
      }),
    };
  }
};
