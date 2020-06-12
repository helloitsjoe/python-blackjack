import { dealResponse, hitResponse, stayResponse } from '../../src/mock-data';

describe('Blackjack', () => {
  beforeEach(() => {
    cy.visit('http://localhost');
    // cy.get('[data-testid="button-deal"]').click();
    cy.contains(/deal/i).click();
  });

  it('Deals cards', () => {
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 2);
    cy.get('.cards').last().find('[data-testid="card"]').should('have.length', 2);
  });

  it('Hit adds card', () => {
    cy.contains(/hit/i).click();
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 3);
  });

  it('Stay keeps player cards the same', () => {
    cy.contains(/stay/i).click();
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 2);
    cy.get('.cards').last().find('[data-testid="card"]').should('have.length.gte', 2);
  });
});

describe('Stubs', () => {
  it('Mocks deal response', () => {
    cy.visit('http://localhost', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(
            'http://0.0.0.0:5000/game',
            Cypress.sinon.match({ body: Cypress.sinon.match(/"type":"DEAL"/) })
          )
          .resolves({ json: () => Promise.resolve(dealResponse) });
      },
    });
    cy.contains(/deal/i).click();
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 2);
    cy.get('.cards').last().find('[data-testid="card"]').should('have.length', 2);
  });
});
