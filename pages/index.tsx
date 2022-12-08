import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductsList from '../components/products/productsList';
import Cart from '../components/cart/cart';
import type { Product } from '../helpers/types';

import { getAllItems } from '../helpers/api-utils';
import Wishlist from '../components/wishlist/wishlist';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PlaceOrder from '../components/UI/placeOrderScreen';
import Header from '../components/layout/Header';
import ErrorMessage from '../components/UI/errorMessage';
import Toast from '../components/UI/toast';

const Home = (props: { products: Product[] }) => {
  const { showWishList, showCart, placeOrder } = useSelector<
    RootState,
    {
      showWishList: boolean;
      showCart: boolean;
      placeOrder: boolean;
    }
  >((state) => state.ui);

  const disableScroll = showCart || showWishList || placeOrder;
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
      <Header />
      <Toast />
      <main className={disableScroll ? 'main__noScroll' : 'main'}>
        {props.products.length ? (
          <ProductsList products={props.products} />
        ) : (
          <ErrorMessage />
        )}
      </main>
      {showCart && <Cart />}
      {showWishList && <Wishlist />}
      {placeOrder && <PlaceOrder />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = (await getAllItems()) || [];
  return {
    props: {
      products,
    },
  };
};

export default Home;
