import { cy } from 'local-cypress';
import { navigateTo } from './navigationPage';

class WishlistPage {
  addOneItemToWishList() {
    cy.get('.modal__content')
      .find('[alt="add to wishlist"]')
      .first()
      .parent()
      .click();
  }

  addAllItemsToWishlist() {
    cy.get('.modal__content')
      .find('[alt="add to wishlist"]')
      .each((img) => cy.wrap(img).parent().click());
  }

  removeOneItemFromWishlist() {
    cy.get('.modal__content')
      .find('[alt="remove from wishlist"]')
      .first()
      .parent()
      .click();
  }

  removeAllItemsFromWishlist() {
    cy.get('.modal__content')
      .find('[alt="remove from wishlist"]')
      .each((img) => cy.wrap(img).parent().click());
  }

  addOneItemToCart() {
    cy.get('.modal__content')
      .find('[alt="add to cart"]')
      .first()
      .parent()
      .click();
  }

  addMultipleItemsToCart() {
    cy.get('.modal__content')
      .find('[alt="add to cart"]')
      .each((img) => cy.wrap(img).parent().click());
  }

  addEachItemTwiceToCart() {
    cy.get('.modal__content')
      .find('[alt="add to cart"]')
      .each((img) => cy.wrap(img).parent().dblclick());
  }

  checkItemsInWishlist({ items }: { items: string[] }) {
    cy.get('.modal__content').then((modal) => {
      cy.wrap(modal).find('.product-tile').should('have.length', items.length);
      items.forEach((name) =>
        cy.wrap(modal).find(`[alt="${name}"]`).should('be.visible')
      );
    });

    if (!items.length)
      cy.contains(
        "Looks like you haven't added any items to your wishlist."
      ).should('be.visible');

    navigateTo.closeModal();
    cy.get('[alt="remove from wishlist"]').should('have.length', items.length);
    navigateTo.wishlist();
  }
}

export const onWishList = new WishlistPage();
