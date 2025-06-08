// tests/e2e/home.cy.js

describe('Home Page', () => {
  it('should load the home page and display the dashboard for logged-in users', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          cvu: 123456
        }));
      }
    });
    
    cy.visit('/dashboard');
    // Check for dashboard elements
    cy.contains('PayUp'); // Logo
    cy.contains('Saldo disponible');
    cy.get('.balance-card').should('exist');
    cy.get('.actions-grid').should('exist');
    cy.contains('Cargar');
    cy.contains('Enviar');
    cy.contains('Extraer');
    cy.contains('Historial');
    cy.contains('Últimos movimientos');
  });

  it('should show empty state if there are no transactions', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          cvu: 123456
        }));
      }
    });

    cy.visit('/dashboard');
    cy.get('.transactions-card').within(() => {
        cy.contains('Últimos movimientos');
    });
  });
});

