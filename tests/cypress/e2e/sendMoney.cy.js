// tests/e2e/sendMoney.cy.js

describe('SendMoney Screen', () => {
  it('should navigate to Enviar and render the SendMoney screen correctly', () => {
    cy.visit('/');
    cy.wait(500); // Wait for the page to load
    cy.contains('Enviar').click();
    cy.contains('Enviar Dinero'); // Title
    cy.contains('Saldo disponible:');
    cy.get('form').within(() => {
      cy.contains('Destinatario');
      cy.contains('Monto');
      cy.contains('Descripción');
      cy.get('button').contains('Enviar Dinero');
    });
    cy.contains('Información importante');
  });
});

