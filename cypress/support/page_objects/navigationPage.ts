import { cy } from 'local-cypress';

class NavigationPage {
  _checkIfModalOpenAndClose() {
    cy.get('body').then(($body) => {
      if ($body.find('.modal').length) {
        cy.contains('Close').click();
      }
    });
  }
  wishlist() {
    this._checkIfModalOpenAndClose();
    cy.get('[alt="Wishlist"]').parent().click();
  }

  cart() {
    this._checkIfModalOpenAndClose();
    cy.get('[alt="Shopping Cart"]').parent().click();
  }

  closeModal() {
    this._checkIfModalOpenAndClose();
  }
}

export const navigateTo = new NavigationPage();
