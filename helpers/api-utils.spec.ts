import axios from 'axios';

import { getAllItems, getSingleItem } from './api-utils';
import { mockData } from '../mock/mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('api-utils', () => {
  it('getAllItems calls to product end point', async () => {
    await getAllItems('products');
    expect(mockedAxios.get).toBeCalledWith('https://fakestoreapi.com/products');
  });

  it('getSingleItems calls to product and idend point', async () => {
    await getSingleItem('products', 1);
    expect(mockedAxios.get).toBeCalledWith(
      'https://fakestoreapi.com/products/1'
    );
  });

  it('happy path - returns the data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    const response = await getAllItems('products');
    expect(response).toEqual(mockData);
  });

  it('unhappy path - console.logs error message', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      message: 'error-message',
      status: 401,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    console.log = jest.fn();
    await getAllItems('products');
    expect(console.log).toHaveBeenCalledWith('error-message');
  });

  it('happy path - Single Item - returns the data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockData[0],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    const response = await getSingleItem('products', 1);
    expect(response).toEqual(mockData[0]);
  });

  it('unhappy path - Single Item - console.logs error message', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      message: 'error-message',
      status: 401,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    console.log = jest.fn();
    await getSingleItem('products', 1);
    expect(console.log).toHaveBeenCalledWith('error-message');
  });
});
