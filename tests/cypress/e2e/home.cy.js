// tests/cypress/e2e/home.cy.js

          describe('Home Page', () => {
            const user = {
              firstName: "Test",
              lastName: "User",
              email: `testuser_${Date.now()}@example.com`,
              password: "TestPassword123!"
            };

            it('should load the home page and display the dashboard for logged-in users', () => {
              // Sign up the user via the UI
              cy.visit('/signup');
              cy.get('input[placeholder=""]').eq(0).type(user.firstName); // Nombre
              cy.get('input[placeholder=""]').eq(1).type(user.lastName); // Apellido
              cy.get('input[type="email"]').type(user.email);
              cy.get('input[type="password"]').eq(0).type(user.password);
              cy.get('input[type="password"]').eq(1).type(user.password);
              cy.get('button[type="submit"]').click();
              cy.url().should('include', '/dashboard');
              cy.wait(1000); // Wait for the dashboard to load

              cy.contains('PayUp');
              cy.contains('Saldo disponible');
              cy.get('.balance-card').should('exist');
              cy.get('.actions-grid').should('exist');
              cy.contains('Ingresar');
              cy.contains('Enviar');
              cy.contains('Historial');
              cy.get('.transactions-card').within(() => {
                cy.contains('Últimos movimientos');
                cy.contains('No hay movimientos aún');
              });
            });
          });