import { cy, expect } from 'local-cypress';

export enum Destination {
  CART = 'cart',
  WISHLIST = 'wishlist',
}

export enum Method {
  ADD = 'add to',
  REMOVE = 'remove from',
}

class HomePage {
  addOneItemToCart() {
    cy.get(`[alt="add to cart"]`).first().parent().click();
  }
  addOneItemToWishList() {
    cy.get('[alt="add to wishlist"]').first().parent().click();
  }

  addAllItemsToWishlist() {
    cy.get('[alt="add to wishlist"]').each((img) =>
      cy.wrap(img).parent().click()
    );
  }

  addAllItemsToCart() {
    cy.get('[alt="add to cart"]').each((img) => cy.wrap(img).parent().click());
  }

  addEveryItemTwiceToCart() {
    cy.get('[alt="add to cart"]').each((img) =>
      cy.wrap(img).parent().dblclick()
    );
  }

  removeOneItemFromWishlist() {
    cy.get('[alt="remove from wishlist"]').first().parent().click();
  }

  removeAllItemsFromWishlist() {
    cy.get('[alt="remove from wishlist"]').each((img) =>
      cy.wrap(img).parent().click()
    );
  }

  checkOneItemOnlyInWishlist() {
    cy.get('[alt="remove from wishlist"]').should('have.length', 1);
  }
  checkAllItemsInWishlist() {
    cy.get('[alt="remove from wishlist"]').should('have.length', 2);
  }

  checkNoItemsInWishList() {
    cy.get('[alt="remove from wishlist"]').should('have.length', 0);
  }

  checkNoModalsOpen() {
    cy.get('body').then(($body) => {
      expect($body.find('.modal').length).to.equal(0);
    });
  }
}

export const onHomePage = new HomePage();
