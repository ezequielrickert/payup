/// <reference types="cypress" />

// Integration tests for Login and SignUp views

describe('Authentication Integration', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: `testuser_${Date.now()}@example.com`,
    password: 'TestPassword123!'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows validation errors on empty login', () => {
    // Try to submit with empty fields
    cy.get('button[type="submit"]').click({ force: true });
    // Check that the email input is invalid (browser validation)
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.not.equal('');
    });
    // Check that the password input is invalid (browser validation)
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.not.equal('');
    });
  });

  it('shows error on invalid email format in login', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('input[type="email"]').then(($input) => {
      // The input should be invalid due to browser validation
      expect($input[0].checkValidity()).to.be.false;
      // Optionally, check the browser's validation message
      expect($input[0].validationMessage).to.not.equal('');
    });
  });

  it('navigates to SignUp and registers a new user', () => {
    cy.contains('Registrate').click();
    cy.url().should('include', '/signup');
    cy.get('input[placeholder=""]').eq(0).type(testUser.firstName); // Nombre
    cy.get('input[placeholder=""]').eq(1).type(testUser.lastName); // Apellido
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').eq(0).type(testUser.password);
    cy.get('input[type="password"]').eq(1).type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('PayUp').should('exist'); // Adjust if dashboard has a unique element
  });

  it('shows validation errors on SignUp with mismatched passwords', () => {
    cy.contains('Registrate').click();
    cy.get('input[placeholder=""]').eq(0).type('Name');
    cy.get('input[placeholder=""]').eq(1).type('Last');
    cy.get('input[type="email"]').type('mismatch@example.com');
    cy.get('input[type="password"]').eq(0).type('password1');
    cy.get('input[type="password"]').eq(1).type('password2');
    cy.get('button[type="submit"]').click();
    cy.contains('Las contraseñas no coinciden').should('exist');
  });

  it('logs in with the newly registered user', () => {
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('PayUp').should('exist');
  });

  it('shows error on login with wrong password', () => {
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type('WrongPassword!');
    cy.get('button[type="submit"]').click();
    cy.contains('Error al iniciar sesión').should('exist');
  });
});

