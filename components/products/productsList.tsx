import ProductTile from './productTile';
import type { CartItem, Product } from '../../helpers/types';
import CartProductItem from '../cart/cartItem';

const ProductsList = (props: { products?: Product[]; cart?: CartItem[] }) => {
  return (
    <div className="product-list">
      {props.cart &&
        props.cart.map((product, index) => (
          <CartProductItem
            key={product.id}
            product={product}
            inView={index <= 4}
          />
        ))}
      {props.products &&
        props.products.map((product, index) => (
          <ProductTile key={product.id} product={product} inView={index <= 4} />
        ))}
    </div>
  );
};

export default ProductsList;
