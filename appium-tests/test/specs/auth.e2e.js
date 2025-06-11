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

    it('shows error on login with wrong password', async () => {
        const emailInputSelector = 'new UiSelector().className("android.widget.EditText").instance(0)';
        const emailInput = await $(`android=${emailInputSelector}`);
        await emailInput.setValue(testUser.email);
        const passwordInputSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
        const passwordInput = await $(`android=${passwordInputSelector}`);
        await passwordInput.setValue('WrongPassword!');
        const submitBtnSelector = 'new UiSelector().className("android.widget.Button")';
        const submitBtn = await $(`android=${submitBtnSelector}`);
        await submitBtn.click();
        const errorMsgSelector = 'new UiSelector().textContains("Error al iniciar sesión")';
        const errorMsg = await $(`android=${errorMsgSelector}`);
        expect(await errorMsg.isDisplayed()).to.be.true;
    });
});