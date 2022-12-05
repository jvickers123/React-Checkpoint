import { renderHook, RenderOptions } from '@testing-library/react';
import { mockData } from '../mock/mockData';
import { initStore } from '../store';
import { AppStore, RootState } from '../store';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  hook: () => any | void,
  {
    preloadedState = {
      wishlist: { items: mockData },
      cart: {
        items: [{ ...mockData[0], quantity: 1, total: 10 }],
        changed: false,
      },
    },
    store = initStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: JSX.Element }) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    store,
    ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }),
  };
};
