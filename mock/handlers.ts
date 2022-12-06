import { rest } from 'msw';

import { mockData, mockCartData } from './mockData';

export const handlers = [
  rest.get('https://fakestoreapi.com/products', (_req, res, ctx) => {
    return res(ctx.json(mockData));
  }),
  rest.get('https://fakestoreapi.com/products/:productid', (_req, res, ctx) => {
    return res(ctx.json(mockData[0]));
  }),
  rest.get('https://fakestoreapi.com/wrongProductName', (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ message: 'products could not be found' })
    );
  }),
  rest.get(
    'https://fakestoreapi.com/wrongProductName/:productid',
    (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ message: 'products could not be found' })
      );
    }
  ),

  rest.get('https://fakestoreapi.com/carts', (_req, res, ctx) => {
    return res(ctx.json(mockCartData));
  }),
  rest.get('https://fakestoreapi.com/carts/:cartid', (_req, res, ctx) => {
    return res(ctx.json(mockCartData[0]));
  }),
];
