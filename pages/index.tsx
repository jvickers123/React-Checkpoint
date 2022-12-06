import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductsList from '../components/productsList';
import Cart from '../components/cart';
import type { Product } from '../helpers/types';

import { getAllItems } from '../helpers/api-utils';
import Wishlist from '../components/wishlist';
import { Provider, useSelector } from 'react-redux';
import initStore, { RootState } from '../store';
import type { CartItem } from '../helpers/types';

const Home = (props: { products: Product[]; carts: CartItem[] }) => {
  const store = initStore();

  return (
    <Provider store={store}>
      <Head>
        <title>React Practice app</title>
        <meta
          name="description"
          content="practicing nextjs, redux and typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductsList products={props.products} />
      <Cart carts={props.carts} />
      <Wishlist />
    </Provider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllItems('products');
  const carts = await getAllItems('carts');
  return {
    props: {
      products,
      carts,
    },
  };
};

export default Home;
