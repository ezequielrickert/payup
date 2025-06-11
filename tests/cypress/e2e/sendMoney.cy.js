// tests/e2e/sendMoney.cy.js

describe('SendMoney Screen', () => {

  const login = (email, password) => {
    cy.visit('/');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button').contains('Iniciar Sesión').click();
    cy.wait(1000); // Wait for login to complete
  };

  it('should transfer money from rich@payup.com to poor@payup.com and verify transaction in Home and History', () => {
    // Login as rich@payup.com
    login('rich@payup.com', 'rich');

    // Go to SendMoney/Transfer page
    cy.contains('Enviar').click();
    cy.url().should('include', '/transfer');
    cy.contains('Enviar Dinero');
    cy.contains('Saldo disponible:');

    // Fill the form to send money to poor@payup.com
    cy.get('input[type="radio"][value="email"]').check({ force: true });
    cy.get('input[placeholder="juan@email.com"]').clear().type('poor@payup.com');
    cy.get('input[placeholder="0.00"]').clear().type('1000');
    cy.get('input[placeholder="¿Para qué es esta transferencia?"]').type('Transfer');
    cy.get('button').contains('Enviar Dinero').click();

    // sleep time
    cy.wait(1000);

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');

    // Verify transaction appears on home/dashboard
    cy.get('.transactions-card').within(() => {
      cy.contains('Últimos movimientos');
      cy.get('.transaction-item').should('exist');
      cy.get('.description').contains('Transfer');
      cy.get('.amount').contains('-$ 1.000,00');
    });

    // Go to History page and verify transaction
    cy.contains('Historial').click();
    cy.url().should('include', '/history');
    cy.get('.transaction-item .description').contains('Transfer');
    cy.get('.transaction-item .amount').contains('-$ 1.000,00');
  });
});
