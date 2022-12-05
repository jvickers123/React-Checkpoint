import ProductTile from './productTile';
import type { Product } from '../helpers/types';

const ProductsList = (props: { products: Product[] }) => {
  return (
    <div className="product-list">
      {props.products.map((product, index) => (
        <ProductTile key={product.id} product={product} inView={index <= 4} />
      ))}
    </div>
  );
};

export default ProductsList;
