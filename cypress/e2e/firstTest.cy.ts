/// <reference types="cypress"/>
// import { mockData } from '../../mock/mockData';
import { cy, it } from 'local-cypress';

describe('First tests', () => {
  // before('mock api call', () => {
  //   cy.window().then((window) => {
  //     console.log(window);
  //     const { worker, rest } = window.msw;

  //     worker.use(
  //       rest.get('/products', (_req, res, ctx) => {
  //         return res(ctx.json(mockData));
  //       })
  //     );
  //   });
  // });

  it('goes to wishlist', () => {
    cy.visit('/');
  });
});
