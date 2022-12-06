import '../styles/main.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import initStore from '../store';

export default function App({ Component, pageProps }: AppProps) {
  const store = initStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
