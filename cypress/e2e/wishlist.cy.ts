import { cy, describe, it, beforeEach } from 'local-cypress';
import { onCartPage } from '../support/page_objects/cartPage';
import { onHomePage } from '../support/page_objects/homePage';
import { navigateTo } from '../support/page_objects/navigationPage';
import { onWishList } from '../support/page_objects/wishlistPage';

const mockCart = [
  { item: 'item1', price: 10, quantity: 1 },
  { item: 'item2', price: 11, quantity: 1 },
];

describe('wishlist actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user can add one item to the wishlist from the homepage', () => {
    onHomePage.addOneItemToWishList();
    cy.contains('Added to wishlist!').should('be.visible');
    navigateTo.wishlist();
    onWishList.checkItemsInWishlist({ items: ['item1'] });
  });

  it('user can add multiple items to the wishlist from the homepage', () => {
    onHomePage.addAllItemsToWishlist();
    cy.contains('Added to wishlist!').should('be.visible');
    navigateTo.wishlist();
    onWishList.checkItemsInWishlist({ items: ['item1', 'item2'] });
  });

  it('user can remove one item from the wishlist on the homepage', () => {
    onHomePage.addAllItemsToWishlist();
    onHomePage.removeOneItemFromWishlist();
    cy.contains('Removed from wishlist!').should('be.visible');
    navigateTo.wishlist();
    onWishList.checkItemsInWishlist({ items: ['item2'] });
  });

  it('user can remove all items from the wishlist on the homepage', () => {
    onHomePage.addAllItemsToWishlist();
    onHomePage.removeAllItemsFromWishlist();
    cy.contains('Removed from wishlist!').should('be.visible');
    navigateTo.wishlist();
    onWishList.checkItemsInWishlist({ items: [] });
  });

  it('user can remove one item from the wishlist on the wishlist modal', () => {
    onHomePage.addAllItemsToWishlist();
    navigateTo.wishlist();
    onWishList.removeOneItemFromWishlist();
    onWishList.checkItemsInWishlist({ items: ['item2'] });
  });

  it('user can remove all items from the wishlist on the wishlist modal', () => {
    onHomePage.addAllItemsToWishlist();
    navigateTo.wishlist();
    onWishList.removeAllItemsFromWishlist();
    onWishList.checkItemsInWishlist({ items: [] });
  });

  it('user can add an item to the cart from the wishlist', () => {
    onHomePage.addAllItemsToWishlist();
    navigateTo.wishlist();

    onWishList.addOneItemToCart();

    navigateTo.cart();
    onCartPage.checkItemsInCart({ items: [mockCart[0]] });
  });

  it('user can add multiple items to the cart from the wishlist', () => {
    onHomePage.addAllItemsToWishlist();
    navigateTo.wishlist();

    onWishList.addMultipleItemsToCart();

    navigateTo.cart();
    onCartPage.checkItemsInCart({
      items: mockCart,
    });
  });

  it('user can add multiple of each item to the cart from the wishlist', () => {
    const doubleCart = mockCart.map((product) => ({
      ...product,
      quantity: 2,
    }));

    onHomePage.addAllItemsToWishlist();
    navigateTo.wishlist();
    onWishList.addEachItemTwiceToCart();
    navigateTo.cart();
    onCartPage.checkItemsInCart({
      items: doubleCart,
    });
  });
});
