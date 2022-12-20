class NavigationPage {
  wishList() {
    cy.contains('Close').click();
    cy.get('[alt="Wishlist"]').parent().click();
  }
  cart() {
    cy.get('[alt="Shopping Cart"]').parent().click();
  }
}

export const navigateTo = new NavigationPage();
