import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../pages/index';
import { mockData, mockCartData } from '../mock/mockData';

describe('pages/index', () => {
  it('happy path - render products on page', () => {
    render(<Home products={mockData} carts={mockCartData} />);
    const item1 = screen.getByRole('heading', { name: 'item1' });
    const item2 = screen.getByRole('heading', { name: 'item2' });

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});

describe('getStaticProps', () => {
  it('returns mock server data', async () => {
    const staticProps = await getStaticProps({ locale: 'en' });
    expect(staticProps).toEqual({
      props: { products: mockData, carts: mockCartData },
    });
  });
});
