/// <reference types="cypress"/>
import { navigateTo } from '../support/page_objects/navigationPage';
import { mockData } from '../../mock/mockData';
import { setupWorker, rest, SetupWorkerApi } from 'msw';
import { handlers } from '../../mock/handlers';

describe('First tests', () => {
  before('mock api call', () => {
    cy.window().then((window) => {
      console.log(window);
      const { worker, rest } = window.msw;

      worker.use(
        rest.get('/products', (_req, res, ctx) => {
          return res(ctx.json(mockData));
        })
      );
    });
  });

  it('goes to wishlist', () => {
    cy.visit('/');
  });
});
