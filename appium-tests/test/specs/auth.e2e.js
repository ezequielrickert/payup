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
        await browser.pause(1000);
        expect(await emailError.isDisplayed()).to.be.true;
    });
    //
    // it('navigates to SignUp and registers a new user', async () => {
    //     const signUpBtn = await (`new UiSelector().textContains("Registrate")`);
    //     await signUpBtn.click();
    //     const firstNameInput = await (`new UiSelector().className("android.widget.EditText").instance(0)`);
    //     const lastNameInput = await (`new UiSelector().className("android.widget.EditText").instance(1)`);
    //     const emailInput = await (`new UiSelector().className("android.widget.EditText").instance(2)`);
    //     const passwordInput = await (`new UiSelector().className("android.widget.EditText").instance(3)`);
    //     const confirmPasswordInput = await (`new UiSelector().className("android.widget.EditText").instance(4)`);
    //     await firstNameInput.setValue(testUser.firstName);
    //     await lastNameInput.setValue(testUser.lastName);
    //     await emailInput.setValue(testUser.email);
    //     await passwordInput.setValue(testUser.password);
    //     await confirmPasswordInput.setValue(testUser.password);
    //     const submitBtn = await (`new UiSelector().className("android.widget.Button")`);
    //     await submitBtn.click();
    //     const dashboard = await (`new UiSelector().textContains("PayUp")`);
    //     await dashboard.waitForDisplayed({ timeout: 10000 });
    //     expect(await dashboard.isDisplayed()).to.be.true;
    // });
    //
    // it('shows validation errors on SignUp with mismatched passwords', async () => {
    //     const signUpBtn = await (`new UiSelector().textContains("Registrate")`);
    //     await signUpBtn.click();
    //     const firstNameInput = await (`new UiSelector().className("android.widget.EditText").instance(0)`);
    //     const lastNameInput = await (`new UiSelector().className("android.widget.EditText").instance(1)`);
    //     const emailInput = await (`new UiSelector().className("android.widget.EditText").instance(2)`);
    //     const passwordInput = await (`new UiSelector().className("android.widget.EditText").instance(3)`);
    //     const confirmPasswordInput = await (`new UiSelector().className("android.widget.EditText").instance(4)`);
    //     await firstNameInput.setValue('Name');
    //     await lastNameInput.setValue('Last');
    //     await emailInput.setValue('mismatch@example.com');
    //     await passwordInput.setValue('password1');
    //     await confirmPasswordInput.setValue('password2');
    //     const submitBtn = await (`new UiSelector().className("android.widget.Button")`);
    //     await submitBtn.click();
    //     const errorMsg = await (`new UiSelector().textContains("Las contraseñas no coinciden")`);
    //     expect(await errorMsg.isDisplayed()).to.be.true;
    // });
    //
    // it('logs in with the newly registered user', async () => {
    //     const emailInput = await (`new UiSelector().className("android.widget.EditText").instance(0)`);
    //     const passwordInput = await (`new UiSelector().className("android.widget.EditText").instance(1)`);
    //     await emailInput.setValue(testUser.email);
    //     await passwordInput.setValue(testUser.password);
    //     const submitBtn = await (`new UiSelector().className("android.widget.Button")`);
    //     await submitBtn.click();
    //     const dashboard = await (`new UiSelector().textContains("PayUp")`);
    //     await dashboard.waitForDisplayed({ timeout: 10000 });
    //     expect(await dashboard.isDisplayed()).to.be.true;
    // });
    //
    // it('shows error on login with wrong password', async () => {
    //     const emailInput = await (`new UiSelector().className("android.widget.EditText").instance(0)`);
    //     const passwordInput = await (`new UiSelector().className("android.widget.EditText").instance(1)`);
    //     await emailInput.setValue(testUser.email);
    //     await passwordInput.setValue('WrongPassword!');
    //     const submitBtn = await (`new UiSelector().className("android.widget.Button")`);
    //     await submitBtn.click();
    //     const errorMsg = await (`new UiSelector().textContains("Error al iniciar sesión")`);
    //     expect(await errorMsg.isDisplayed()).to.be.true;
    // });
});