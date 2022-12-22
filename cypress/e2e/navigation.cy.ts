import { cy, describe, it, beforeEach, expect } from 'local-cypress';
import { navigateTo } from '../support/page_objects/navigationPage';

describe('navigation and initial render', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders products from api correctly', () => {
    cy.contains('item1').should('be.visible');
    cy.contains('item2').should('be.visible');
  });

  it('cart and wishlist are empty at first render', () => {
    navigateTo.wishlist();
    cy.contains(
      "Looks like you haven't added any items to your wishlist."
    ).should('be.visible');
    navigateTo.cart();
    cy.contains('No items in your cart yet.').should('be.visible');
  });

  it('user can open and close wishlist modal', () => {
    cy.get('body').then(($body) => {
      expect($body.find('.modal').length).to.equal(0);
    });

    navigateTo.wishlist();
    cy.contains('Wishlist').should('be.visible');

    cy.contains('Close').click();

    cy.get('body').then(($body) => {
      expect($body.find('.modal').length).to.equal(0);
    });
  });

  it('user can open and close cart modal', () => {
    cy.get('body').then(($body) => {
      expect($body.find('.modal').length).to.equal(0);
    });

    navigateTo.cart();
    cy.contains('Cart').should('be.visible');

    cy.contains('Close').click();

    cy.get('body').then(($body) => {
      expect($body.find('.modal').length).to.equal(0);
    });
  });
});
