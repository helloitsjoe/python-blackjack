describe('Blackjack', () => {
  beforeEach(() => {
    cy.visit('http://localhost');
    cy.get('[data-testid="button-deal"]').click();
  });

  it('Deals cards', () => {
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 2);
    cy.get('.cards').last().find('[data-testid="card"]').should('have.length', 2);
  });

  it('Hit adds card', () => {
    cy.get('[data-testid="button-hit"]').click();
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 3);
  });

  it('Stay keeps player cards the same', () => {
    cy.get('[data-testid="button-stay"]').click();
    cy.get('.cards').first().find('[data-testid="card"]').should('have.length', 2);
    cy.get('.cards').last().find('[data-testid="card"]').should('have.length.gte', 2);
  });
});
