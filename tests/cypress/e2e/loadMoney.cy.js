// tests/e2e/loadMoney.cy.js

describe('LoadMoney Screen', () => {
  const login = (email, password) => {
    cy.visit('/');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button').contains('Iniciar Sesión').click();
    cy.wait(1000); // Wait for login to complete
  };

  it('should successfully load money with rich user', () => {
    // Login with rich user
    login('rich@payup.com', 'rich');
    
    // Navigate to load money
    cy.contains('Ingresar').click();
    
    // Enter amount
    cy.get('input[type="text"]').type('1000');
    
    // Submit form
    cy.get('button').contains('Cargar Dinero').click();
    
    // Check for success message
    cy.contains('¡Carga exitosa!');
    
    // Should redirect to dashboard after success
    cy.url().should('include', '/dashboard');
  });

  it('should fail to load money with poor user', () => {
    // Login with poor user
    login('poor@payup.com', 'poor');
    
    // Navigate to load money
    cy.contains('Ingresar').click();
    
    // Enter amount
    cy.get('input[type="text"]').type('1000');
    
    // Submit form
    cy.get('button').contains('Cargar Dinero').click();
    
    // Check for error message
    cy.contains('Saldo insuficiente');
    
    // Should stay on the same page
    cy.url().should('include', '/load');
  });

  it('should validate minimum and maximum amounts', () => {
    // Login with rich user
    login('rich@payup.com', 'rich');
    
    // Navigate to load money
    cy.contains('Ingresar').click();

    // Try with amount below minimum
    cy.get('input[type="text"]').type('50');
    cy.get('button').contains('Cargar Dinero').click();
    cy.contains('El monto mínimo es $100');

    // Clear and try with amount above maximum
    cy.get('input[type="text"]').clear().type('600000');
    cy.get('button').contains('Cargar Dinero').click();
    cy.contains('El monto máximo es $500.000');
  });

  it('should render the LoadMoney screen correctly', () => {
    // Login with rich user
    login('rich@payup.com', 'rich');
    
    // Navigate to load money
    cy.contains('Ingresar').click();

    // Check screen elements
    cy.contains('Cargar Dinero'); // Title
    cy.contains('Saldo actual:');
    cy.contains('Método de pago');
    cy.get('form').within(() => {
      cy.contains('Montos rápidos');
      cy.contains('Monto personalizado');
      cy.get('button').contains('Cargar Dinero');
    });
  });
});
