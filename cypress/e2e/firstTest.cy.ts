import { cy, describe, it } from 'local-cypress';

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');
  });
});
