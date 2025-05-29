// cypress/e2e/loadMoney.cy.js

describe('LoadMoney Screen', () => {
  it('should navigate to Cargar and render the LoadMoney screen correctly', () => {
    cy.visit('/');
    cy.wait(1000); // Wait for the page to load
    cy.contains('Cargar').click();
    cy.contains('Cargar Dinero'); // Title
    cy.contains('Saldo actual:');
    cy.get('form').within(() => {
      cy.contains('Método de carga');
      cy.contains('Montos rápidos');
      cy.contains('Monto personalizado');
      cy.get('button').contains('Cargar Dinero');
    });
    cy.contains('Información de seguridad');
  });
});

