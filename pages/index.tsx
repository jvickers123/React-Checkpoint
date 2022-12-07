import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductsList from '../components/products/productsList';
import Cart from '../components/cart/cart';
import type { Product } from '../helpers/types';

import { getAllItems } from '../helpers/api-utils';
import Wishlist from '../components/wishlist/wishlist';
import { useSelector } from 'react-redux';
import type { CartItem } from '../helpers/types';
import Navbar from '../components/navbar/navbar';
import { RootState } from '../store';
import PlaceOrderScreen from '../components/UI/placeOrderScreen';

const Home = (props: { products: Product[]; carts: CartItem[] }) => {
  const { showWishList, showCart, placeOrder } = useSelector<
    RootState,
    { showWishList: boolean; showCart: boolean; placeOrder: boolean }
  >((state) => state.ui);
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
      {showCart && <Cart />}
      {showWishList && <Wishlist />}
      {placeOrder && <PlaceOrderScreen />}
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
