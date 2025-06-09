// tests/e2e/withdrawMoney.cy.js

describe('WithdrawMoney Screen', () => {
  it('should navigate to Extraer and render the WithdrawMoney screen correctly', () => {
    cy.visit('/');
    cy.wait(500); // Wait for the page to load
    cy.contains('Extraer').click();
    cy.contains('Extraer Dinero'); // Title
    cy.get('form').within(() => {
      cy.contains('Cuenta bancaria destino');
      cy.contains('Monto a extraer');
      cy.get('button').contains('Extraer Dinero');
    });
    cy.contains('Saldo disponible:');
  });
});

