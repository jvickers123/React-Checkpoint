import { getAllItems, getSingleItem } from './api-utils';
import { mockCartData, mockData } from '../mock/mockData';

describe('api-utils', () => {
  it('happy path - GetAllItems returns correct data', async () => {
    const data = await getAllItems('products');
    expect(data).toEqual(mockData);
  });

  it('happy path - GetSingleItem returns correct data', async () => {
    const data = await getSingleItem('products', 1);
    expect(data).toEqual(mockData[0]);
  });

  it('happy path - GetAllItems returns correct data CART', async () => {
    const data = await getAllItems('carts');
    expect(data).toEqual(mockCartData);
  });

  it('happy path - GetSingleItem returns correct data CART', async () => {
    const data = await getSingleItem('carts', 1);
    expect(data).toEqual(mockCartData[0]);
  });

  it('unhappy path - console.logs error message', async () => {
    console.log = jest.fn();
    await getAllItems('wrongProductName');
    expect(console.log).toHaveBeenCalledWith(
      'Request failed with status code 404'
    );
  });
  it('unhappy path - console.logs error message SINGLE ITEM', async () => {
    console.log = jest.fn();
    await getSingleItem('wrongProductName', 1);
    expect(console.log).toHaveBeenCalledWith(
      'Request failed with status code 404'
    );
  });
});
