import '../styles/main.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { initStore } from '../store';

// use mock service worker when in development. Used for cypress
// Not sure how to test this. But is covered by Cypress testing
/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  require('mock');
}

export default function App({ Component, pageProps }: AppProps) {
  const store = initStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
