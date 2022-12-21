import { cy, describe, it, before } from 'local-cypress';
import { navigateTo } from '../support/page_objects/navigationPage';

describe('empty spec', () => {
  before(() => {
    cy.visit('/');
  });

  it('mock next js ssr', () => {
    navigateTo.wishlist();
    navigateTo.cart();
    navigateTo.closeModal();
  });
});
