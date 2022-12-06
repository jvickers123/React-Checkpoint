import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductsList from '../components/productsList';
import Cart from '../components/cart';
import type { Product } from '../helpers/types';

import { getAllItems } from '../helpers/api-utils';
import Wishlist from '../components/wishlist';
import { useSelector } from 'react-redux';
import type { CartItem } from '../helpers/types';
import Navbar from '../components/navbar';
import { RootState } from '../store';

const Home = (props: { products: Product[]; carts: CartItem[] }) => {
  const { showWishList } = useSelector<RootState, { showWishList: boolean }>(
    (state) => state.ui
  );
  return (
    <>
      <Head>
        <title>React Practice app</title>
        <meta
          name="description"
          content="practicing nextjs, redux and typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={showWishList ? 'main__noScroll' : 'main'}>
        <ProductsList products={props.products} />
      </main>
      <Cart carts={props.carts} />
      {showWishList && <Wishlist />}
    </>
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
