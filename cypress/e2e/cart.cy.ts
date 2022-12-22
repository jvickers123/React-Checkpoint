import { cy, describe, it, beforeEach } from 'local-cypress';
import { onCartPage } from '../support/page_objects/cartPage';
import { onHomePage } from '../support/page_objects/homePage';
import { navigateTo } from '../support/page_objects/navigationPage';

const mockCart = [
  { item: 'item1', price: 10, quantity: 1 },
  { item: 'item2', price: 11, quantity: 1 },
];
describe('cart actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user can add an item to the cart from the homepage', () => {
    onHomePage.addOneItemToCart();
    cy.contains('Added to cart!').should('be.visible');
    navigateTo.cart();
    onCartPage.checkItemsInCart({ items: [mockCart[0]] });
  });

  it('user can add multiple items to the cart from the homepage', () => {
    onHomePage.addAllItemsToCart();
    cy.contains('Added to cart!').should('be.visible');

    navigateTo.cart();
    onCartPage.checkItemsInCart({ items: mockCart });
  });

  it('user can add multiple of each item to the cart from the homepage', () => {
    const doubleCart = mockCart.map((product) => ({
      ...product,
      quantity: 2,
    }));
    onHomePage.addEveryItemTwiceToCart();
    cy.contains('Added to cart!').should('be.visible');
    navigateTo.cart();
    onCartPage.checkItemsInCart({ items: doubleCart });
  });

  it('user can add quantity of item from the cart modal', () => {
    const doubleFirstMockCart = [{ ...mockCart[0], quantity: 2 }, mockCart[1]];
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.addExtraItemToCart({ items: ['item1'] });
    onCartPage.checkItemsInCart({ items: doubleFirstMockCart });
  });

  it('user can add quantity of multiple item from the cart modal', () => {
    const extraItemsCart = [
      { ...mockCart[0], quantity: 3 },
      { ...mockCart[1], quantity: 2 },
    ];
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.addExtraItemToCart({ items: ['item1'] });
    onCartPage.addExtraItemToCart({ items: ['item1'] });
    onCartPage.addExtraItemToCart({ items: ['item2'] });
    onCartPage.checkItemsInCart({ items: extraItemsCart });
  });

  it('user can reduce quantity of item from the cart modal', () => {
    const doubleFirstMockCart = [{ ...mockCart[0], quantity: 2 }, mockCart[1]];
    onHomePage.addEveryItemTwiceToCart();
    navigateTo.cart();
    onCartPage.removeItemFromCart({ items: ['item2'] });
    onCartPage.checkItemsInCart({ items: doubleFirstMockCart });
  });

  it('user can remove item from the cart modal', () => {
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.removeItemFromCart({ items: ['item1'] });
    onCartPage.checkItemsInCart({ items: [mockCart[1]] });
  });

  it('user can remove all items from the cart modal', () => {
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.removeItemFromCart({ items: ['item1'] });
    onCartPage.removeItemFromCart({ items: ['item2'] });
    onCartPage.checkItemsInCart({ items: [] });
  });

  it('user can clear cart using clear cart button', () => {
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.clearCart();
    onCartPage.checkItemsInCart({ items: [] });
  });

  it('user can place order', () => {
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.placeOrder();
    onCartPage.checkPlaceOrder({ items: mockCart });
  });

  it('3 seconds after order placed cart is reset', () => {
    onHomePage.addAllItemsToCart();
    navigateTo.cart();
    onCartPage.placeOrder();
    cy.wait(3000);
    onHomePage.checkNoModalsOpen();
    navigateTo.cart();
    onCartPage.checkItemsInCart({ items: [] });
  });
});
