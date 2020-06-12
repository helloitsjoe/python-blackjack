// TODO: Pull data into mock-data file
const two = { num: 2, value: 2, face: '2', suit: 'clubs' };
const three = { num: 3, value: 3, face: '3', suit: 'clubs' };
const four = { num: 4, value: 4, face: '4', suit: 'clubs' };
const five = { num: 5, value: 5, face: '5', suit: 'clubs' };
const six = { num: 6, value: 6, face: '6', suit: 'clubs' };

const dealResponse = {
  dealer_cards: [two, three],
  player_cards: [four, five],
  balance: 100,
  player_total: 4 + 5,
  dealer_total: 2 + 3,
  status: 'PLAYING',
  deck: [1, 2, 3],
};

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
