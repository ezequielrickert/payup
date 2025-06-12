const { expect } = require('chai');

describe('Authentication Integration (Appium)', () => {
    const testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'TestPassword123!'
    };
    
    beforeEach(async () => {
        // Close the app
        await browser.pause(4000);
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

    it('shows error on login with wrong password', async () => {
        await browser.pause(2000); // Wait for login screen
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
        await browser.pause(2000);
        expect(await errorMsg.isDisplayed()).to.be.true;
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
        await browser.pause(3000); // Wait for login to complete

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
        await browser.pause(6000);

        // Wait for navigation to dashboard
        const dashboardSelector = 'new UiSelector().textContains("PayUp")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;
    });

    it('should validate minimum and maximum amounts', async () => {
        // Navigate to load money
        const ingresarBtnSelector = 'new UiSelector().textContains("Ingresar")';
        const ingresarBtn = await $(`android=${ingresarBtnSelector}`);
        await ingresarBtn.waitForDisplayed({ timeout: 10000 });
        await ingresarBtn.click();
        await browser.pause(2000);

        // Try with amount below minimum
        var amountInputSelector = 'new UiSelector().className("android.widget.EditText")';
        var amountInput = await $(`android=${amountInputSelector}`);
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('50');
        await browser.pause(2000);

        var cargarBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Cargar")';
        var cargarBtn = await $(`android=${cargarBtnSelector}`);
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

        // Enter amount
        amountInputSelector = 'new UiSelector().className("android.widget.EditText")';
        amountInput = await $(`android=${amountInputSelector}`);
        await amountInput.waitForDisplayed({ timeout: 10000 });
        await amountInput.setValue('1000');
        await browser.pause(2000);

        // Submit form
        cargarBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Cargar")';
        cargarBtn = await $(`android=${cargarBtnSelector}`);
        await cargarBtn.waitForDisplayed({ timeout: 10000 });
        await cargarBtn.click();
        await browser.pause(6000);

        // Wait for navigation to dashboard
        const dashboardSelector = 'new UiSelector().textContains("PayUp")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;
    });

    it('should transfer money from rich@payup.com to poor@payup.com and verify transaction', async () => {
        // Login with rich user
        await browser.pause(2000);
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
        await browser.pause(3000);

        // Navigate to Send Money screen
        const enviarBtnSelector = 'new UiSelector().textContains("Enviar")';
        const enviarBtn = await $(`android=${enviarBtnSelector}`);
        await enviarBtn.waitForDisplayed({ timeout: 10000 });
        await enviarBtn.click();
        await browser.pause(2000);

        // Verify we're on the transfer screen
        const transferTitleSelector = 'new UiSelector().textContains("Enviar Dinero")';
        const transferTitle = await $(`android=${transferTitleSelector}`);
        expect(await transferTitle.isDisplayed()).to.be.true;

        // Select email transfer method
        const emailRadioSelector = 'new UiSelector().className("android.widget.RadioButton").textContains("email")';
        const emailRadio = await $(`android=${emailRadioSelector}`);
        await emailRadio.click();
        await browser.pause(1000);

        // Fill transfer form
        const recipientInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const amountInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const descriptionInputSelector = 'new UiSelector().className("android.widget.EditText").instance(2)';
        
        const recipientInput = await $(`android=${recipientInputSelector}`);
        const amountInput = await $(`android=${amountInputSelector}`);
        const descriptionInput = await $(`android=${descriptionInputSelector}`);

        await recipientInput.setValue('poor@payup.com');
        await amountInput.setValue('1000');
        await descriptionInput.setValue('Transfer');
        await browser.pause(1000);

        // Submit transfer
        const sendMoneyBtnSelector = 'new UiSelector().className("android.widget.Button").textContains("Enviar Dinero")';
        const sendMoneyBtn = await $(`android=${sendMoneyBtnSelector}`);
        await sendMoneyBtn.click();
        await browser.pause(3000);

        // Verify we're back on dashboard
        const dashboardSelector = 'new UiSelector().textContains("PayUp")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;

        // Verify transaction appears in recent transactions
        const transactionSelector = 'new UiSelector().textContains("Transfer")';
        const transaction = await $(`android=${transactionSelector}`);
        expect(await transaction.isDisplayed()).to.be.true;

        // Logout
        const logoutBtnSelector = 'new UiSelector().textContains("Cerrar sesión")';
        const logoutBtn = await $(`android=${logoutBtnSelector}`);
        await logoutBtn.click();
        await browser.pause(2000);
    });

    it('should verify received money in poor@payup.com account', async () => {
        // Login with poor user
        await browser.pause(2000);
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
        await browser.pause(3000);

        // Verify we're on dashboard
        const dashboardSelector = 'new UiSelector().textContains("PayUp")';
        const dashboard = await $(`android=${dashboardSelector}`);
        await dashboard.waitForDisplayed({ timeout: 10000 });
        expect(await dashboard.isDisplayed()).to.be.true;

        // Check recent transactions for the incoming transfer
        const transactionSelector = 'new UiSelector().textContains("Transfer")';
        const transaction = await $(`android=${transactionSelector}`);
        expect(await transaction.isDisplayed()).to.be.true;

        // Navigate to History
        const historyBtnSelector = 'new UiSelector().textContains("Historial")';
        const historyBtn = await $(`android=${historyBtnSelector}`);
        await historyBtn.click();
        await browser.pause(2000);

        // Verify transaction in history with correct amount
        const historyTransactionSelector = 'new UiSelector().textContains("Transfer")';
        const historyTransaction = await $(`android=${historyTransactionSelector}`);
        expect(await historyTransaction.isDisplayed()).to.be.true;

        // Find the transaction item and verify the amount within it
        const transactionItemSelector = 'new UiSelector().className("android.widget.FrameLayout").childSelector(new UiSelector().textContains("Transfer"))';
        const transactionItem = await $(`android=${transactionItemSelector}`);
        expect(await transactionItem.isDisplayed()).to.be.true;

        // Find the amount within the transaction item
        const amountSelector = 'new UiSelector().className("android.widget.TextView").textContains("+$ 1.000,00")';
        const amount = await $(`android=${amountSelector}`);
        await browser.pause(1000); // Give time for the amount to be visible
        expect(await amount.isDisplayed()).to.be.true;
    });

});