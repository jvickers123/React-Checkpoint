import ProductsList from './productsList';
import { mockData } from '../../mock/mockData';
import { render, screen } from '@testing-library/react';

jest.mock('./productTile', () =>
  jest.fn(({ product }) => (
    <div>
      <h2>Product Tile</h2>
      <p>{product.title}</p>
    </div>
  ))
);

describe('ProductsList', () => {
  it('Calls Product Tile 2 times', () => {
    render(<ProductsList products={mockData} />);
    const item1 = screen.getByText('item1');
    const item2 = screen.getByText('item2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('Passes correct data to Product Tile', () => {
    render(<ProductsList products={mockData} />);

    const productTiles = screen.getAllByRole('heading', {
      name: 'Product Tile',
    });
    expect(productTiles.length).toBe(2);
  });
});
