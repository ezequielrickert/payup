const { expect } = require('chai');

describe('Authentication Integration (Appium)', () => {
    const testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'TestPassword123!'
    };

    beforeEach(async () => {
        const selector = 'new UiSelector().textContains("PayUp")';
        const el = await $(`android=${selector}`);
        await el.waitForDisplayed({ timeout: 10000 });
    });

    it('shows validation errors on empty login', async () => {
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")'
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await browser.pause(1000);
        await submitBtn.click();
        await browser.pause(1000);
        const emailErrorSelector = 'new UiSelector().textContains("email")'
        const emailError = await $(`android=${emailErrorSelector}`);
        await browser.pause(1000);
        const passwordErrorSelector = 'new UiSelector().textContains("contraseña")'
        const passwordError = await $(`android=${passwordErrorSelector}`);
        await browser.pause(1000);
        expect(await emailError.isDisplayed()).to.be.true;
        expect(await passwordError.isDisplayed()).to.be.true;
    });

    it('shows error on invalid email format in login', async () => {
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await browser.pause(1000);
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await browser.pause(1000);
        await emailInput.setValue('invalid-email');
        await passwordInput.setValue('password');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await browser.pause(1000);
        await submitBtn.click();
        const emailErrorSelector = 'new UiSelector().textContains("email")';
        const emailError = await $(`android=${emailErrorSelector}`);
        await browser.hideKeyboard();
        await browser.pause(1000);
        expect(await emailError.isDisplayed()).to.be.true;
    });

    it('navigates to SignUp and registers a new user', async () => {
        const signUpBtnSelector = 'new UiSelector().textContains("Registrate")';
        const signUpBtn = await $(`android=${signUpBtnSelector}`);
        await signUpBtn.click();
        const firstNameInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const lastNameInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(2)';
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(3)';
        const confirmPasswordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(4)';
        const firstNameInput = await $(`android=${firstNameInputSelector}`);
        const lastNameInput = await $(`android=${lastNameInputSelector}`);
        const emailInput = await $(`android=${emailInputSelector}`);
        const passwordInput = await $(`android=${passwordInputSelector}`);
        const confirmPasswordInput = await $(`android=${confirmPasswordInputSelector}`);
        await firstNameInput.setValue(testUser.firstName);
        await lastNameInput.setValue(testUser.lastName);
        await emailInput.setValue(testUser.email);
        await passwordInput.setValue(testUser.password);
        await confirmPasswordInput.setValue(testUser.password);
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        const dashboardSelector = 'new UiSelector().textContains("Ingresar")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await browser.pause(4000);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
    });

    it('shows validation errors on SignUp with mismatched passwords', async () => {
        const signUpBtnSelector = 'new UiSelector().textContains("Registrate")';
        const signUpBtn = await $(`android=${signUpBtnSelector}`);
        await signUpBtn.click();
        await browser.pause(1000);
        const firstNameInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const lastNameInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(2)';
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(3)';
        const confirmPasswordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(4)';
        const firstNameInput = await $(`android=${firstNameInputSelector}`);
        const lastNameInput = await $(`android=${lastNameInputSelector}`);
        const emailInput = await $(`android=${emailInputSelector}`);
        const passwordInput = await $(`android=${passwordInputSelector}`);
        const confirmPasswordInput = await $(`android=${confirmPasswordInputSelector}`);
        await firstNameInput.setValue('Name');
        await lastNameInput.setValue('Last');
        await emailInput.setValue('mismatch@example.com');
        await passwordInput.setValue('password1');
        await confirmPasswordInput.setValue('password2');
        await browser.pause(1000);
        await browser.hideKeyboard();
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        const errorMsgSelector = 'new UiSelector().textContains("Las contraseñas no coinciden")';
        const errorMsg = await $(`android=${errorMsgSelector}`);
        await browser.pause(1000);
        expect(await errorMsg.isDisplayed()).to.be.true;
        expect(await errorMsg.isDisplayed()).to.be.true;
        // Click the "Cerrar sesión" button at the end
        const logoutBtnSelector = 'new UiSelector().textContains("Iniciá sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
    });

    it('logs in with the newly registered user', async () => {
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await emailInput.setValue(testUser.email);
        await passwordInput.setValue(testUser.password);
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);
        const dashboardSelector = 'new UiSelector().textContains("PayUp")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;

        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
    });

    it('should load the home page and display the dashboard for logged-in users', async () => {
        // First login
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await emailInput.setValue(testUser.email);
        await passwordInput.setValue(testUser.password);
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);

        // Verify dashboard elements
        const elements = [
            { selector: 'new UiSelector().textContains("PayUp")', name: 'PayUp title' },
            { selector: 'new UiSelector().textContains("Saldo disponible")', name: 'Balance title' },
            { selector: 'new UiSelector().textContains("Ingresar")', name: 'Ingresar button' },
            { selector: 'new UiSelector().textContains("Enviar")', name: 'Enviar button' },
            { selector: 'new UiSelector().textContains("Historial")', name: 'Historial button' },
            { selector: 'new UiSelector().textContains("Últimos movimientos")', name: 'Transactions title' },
            { selector: 'new UiSelector().textContains("No hay movimientos aún")', name: 'No transactions message' }
        ];

        for (const element of elements) {
            console.log(`Checking for ${element.name}...`);
            const el = await $(`android=${element.selector}`);
            await el.waitForDisplayed({ timeout: 10000 });
            expect(await el.isDisplayed()).to.be.true;
            await browser.pause(500);
        }

        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
    });

    it('should successfully load money with rich user', async () => {
        // Login with rich user
        await browser.pause(2000); // Wait for login screen
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue('rich@payup.com');
        await passwordInput.setValue('rich');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);

        // Navigate to load money
        const ingresarBtnSelector = 'new UiSelector().textContains("Ingresar")';
        const ingresarBtn = await $(`android=${ingresarBtnSelector}`);
        await ingresarBtn.waitForDisplayed({ timeout: 10000 });
        await ingresarBtn.click();
        await browser.pause(2000);

        // Enter amount
        const amountInputSelector = 'new UiSelector().className("android.widget.EditText")';
        const amountInput = await $(`android=${amountInputSelector}`);
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('1000');
        await browser.pause(2000);

        // Submit form
        const cargarBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Cargar")';
        const cargarBtn = await $(`android=${cargarBtnSelector}`);
        await cargarBtn.waitForDisplayed({ timeout: 10000 });
        await cargarBtn.click();
        await browser.pause(5000);

        // Check for success message - try different possible messages
        const successMessages = [
            'new UiSelector().textContains("¡Carga exitosa!")',
            'new UiSelector().textContains("Carga exitosa")',
            'new UiSelector().textContains("exitoso")'
        ];

        let successMsgFound = false;
        for (const selector of successMessages) {
            const successMsg = await $(`android=${selector}`);
            if (await successMsg.isDisplayed()) {
                successMsgFound = true;
                break;
            }
        }
        expect(successMsgFound).to.be.true;

        await browser.pause(5000);
        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
    });

    it('should fail to load money with poor user', async () => {
        // Login with poor user
        await browser.pause(2000); // Wait for login screen
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue('poor@payup.com');
        await passwordInput.setValue('poor');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);

        // Navigate to load money
        const ingresarBtnSelector = 'new UiSelector().textContains("Ingresar")';
        const ingresarBtn = await $(`android=${ingresarBtnSelector}`);
        await ingresarBtn.waitForDisplayed({ timeout: 10000 });
        await ingresarBtn.click();
        await browser.pause(2000);

        // Enter amount
        const amountInputSelector = 'new UiSelector().className("android.widget.EditText")';
        const amountInput = await $(`android=${amountInputSelector}`);
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('1000');
        await browser.pause(2000);

        // Submit form
        const cargarBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Cargar")';
        const cargarBtn = await $(`android=${cargarBtnSelector}`);
        await cargarBtn.waitForDisplayed({ timeout: 10000 });
        await cargarBtn.click();
        await browser.pause(2000);

        // Check for error message
        const errorMsgSelector = 'new UiSelector().textContains("Saldo insuficiente")';
        const errorMsg = await $(`android=${errorMsgSelector}`);
        expect(await errorMsg.isDisplayed()).to.be.true;

        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.waitForDisplayed({ timeout: 10000 });
        await logoutBtn.click();
    });

    it('should validate minimum and maximum amounts', async () => {
        // Login with rich user
        await browser.pause(2000); // Wait for login screen
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue('rich@payup.com');
        await passwordInput.setValue('rich');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);

        // Navigate to load money
        const ingresarBtnSelector = 'new UiSelector().textContains("Ingresar")';
        const ingresarBtn = await $(`android=${ingresarBtnSelector}`);
        await ingresarBtn.waitForDisplayed({ timeout: 10000 });
        await ingresarBtn.click();
        await browser.pause(2000);

        // Try with amount below minimum
        const amountInputSelector = 'new UiSelector().className("android.widget.EditText")';
        const amountInput = await $(`android=${amountInputSelector}`);
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('50');
        await browser.pause(2000);

        const cargarBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Cargar")';
        const cargarBtn = await $(`android=${cargarBtnSelector}`);
        await cargarBtn.waitForDisplayed({ timeout: 10000 });
        await cargarBtn.click();
        await browser.pause(2000);

        const minErrorMsgSelector = 'new UiSelector().textContains("El monto mínimo es $100")';
        const minErrorMsg = await $(`android=${minErrorMsgSelector}`);
        expect(await minErrorMsg.isDisplayed()).to.be.true;

        // Try with amount above maximum
        await amountInput.clearValue();
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('600000');
        await browser.pause(2000);

        await cargarBtn.click();
        await browser.pause(2000);

        const maxErrorMsgSelector = 'new UiSelector().textContains("El monto máximo es $500.000")';
        const maxErrorMsg = await $(`android=${maxErrorMsgSelector}`);
        expect(await maxErrorMsg.isDisplayed()).to.be.true;

        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.waitForDisplayed({ timeout: 10000 });
        await logoutBtn.click();
    });

    it('should render the LoadMoney screen correctly', async () => {
        // Login with rich user
        await browser.pause(2000); // Wait for login screen
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue('rich@payup.com');
        await passwordInput.setValue('rich');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        await browser.pause(2000);

        // Navigate to load money
        const ingresarBtnSelector = 'new UiSelector().textContains("Ingresar")';
        const ingresarBtn = await $(`android=${ingresarBtnSelector}`);
        await ingresarBtn.waitForDisplayed({ timeout: 10000 });
        await ingresarBtn.click();
        await browser.pause(2000);

        // Check screen elements
        const elements = [
            { selector: 'new UiSelector().textContains("Cargar Dinero")', name: 'Title' },
            { selector: 'new UiSelector().textContains("Saldo actual:")', name: 'Current balance' },
            { selector: 'new UiSelector().textContains("Método de pago")', name: 'Payment method' },
            { selector: 'new UiSelector().textContains("Montos rápidos")', name: 'Quick amounts' },
            { selector: 'new UiSelector().textContains("Monto personalizado")', name: 'Custom amount' },
            { selector: 'new UiSelector().className("android.widget.Button").textContains("Cargar")', name: 'Submit button' }
        ];

        for (const element of elements) {
            console.log(`Checking for ${element.name}...`);
            const el = await $(`android=${element.selector}`);
            await el.waitForDisplayed({ timeout: 10000 });
            expect(await el.isDisplayed()).to.be.true;
            await browser.pause(500);
        }

        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.waitForDisplayed({ timeout: 10000 });
        await logoutBtn.click();
    });

    it('shows error on login with wrong password', async () => {
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue(testUser.email);
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.waitForDisplayed({ timeout: 10000 });
        await passwordInput.setValue('WrongPassword!');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        const errorMsgSelector = 'new UiSelector().textContains("Error al iniciar sesión. Por favor, verifica tus credenciales.")';
        const errorMsg = await $(`android=${errorMsgSelector}`);
        await browser.pause(10000);
        expect(await errorMsg.isDisplayed()).to.be.true;
    });
});