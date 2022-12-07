import { rest } from 'msw';
import { mockData } from './mockData';

export const handlers = [
  rest.get('https://fakestoreapi.com/products', (_req, res, ctx) => {
    return res(ctx.json(mockData));
  }),
  rest.get('https://fakestoreapi.com/throwErrorMessage', (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ message: 'products could not be found' })
    );
  }),
];
