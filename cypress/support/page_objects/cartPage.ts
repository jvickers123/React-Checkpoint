import { cy } from 'local-cypress';

type Item = { item: string; price: number; quantity: number };

class CartPage {
  checkItemsInCart({ items }: { items: Item[] }) {
    const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    cy.get('.modal__content').then((modal) => {
      cy.wrap(modal).find('.product-tile').should('have.length', items.length);
      items.forEach(({ item }) =>
        cy.wrap(modal).find(`[alt="${item}"]`).should('be.visible')
      );
    });
    items.forEach(({ price, quantity }) =>
      cy.contains(`£${price.toFixed(2)} x ${quantity}`).should('be.visible')
    );

    if (!items.length)
      cy.contains('No items in your cart yet.').should('be.visible');

    cy.contains(`Total: £${total.toFixed(2)}`).should('be.visible');
  }

  addExtraItemToCart({ items }: { items: string[] }) {
    items.forEach((item) => {
      cy.contains(item)
        .parents('.product-tile')
        .find('[alt="add to cart"]')
        .click();
    });
  }

  removeItemFromCart({ items }: { items: string[] }) {
    items.forEach((item) => {
      cy.contains(item)
        .parents('.product-tile')
        .find('[alt="remove from cart"]')
        .click();
    });
  }

  clearCart() {
    cy.contains('Clear Cart').click();
  }

  placeOrder() {
    cy.contains('Place Order').click();
  }

  checkPlaceOrder({ items }: { items: Item[] }) {
    const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    cy.contains('Thank you for your purchase!');
    items.forEach((item) => {
      cy.contains(`${item.item} - ${item.price.toFixed(2)} x ${item.quantity}`);
    });
    cy.contains(`Total: £${total.toFixed(2)}`).should('be.visible');
  }
}

export const onCartPage = new CartPage();
