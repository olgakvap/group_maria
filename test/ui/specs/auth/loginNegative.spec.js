const LoginPage = require('../../pageobjects/auth/Login.page');
const Publications = require('../../pageobjects/publication/Publications.page');
const { clearInputValue, getValidationMessage} = require('../../../helpers/uiMethods.helper');
const expected = require('../../../data/expected.json');
const { registerUser } = require("../../../helpers/axios.methods");

describe('LOGIN PAGE', () => {

    it('Should not login with un exist email', async () => {
        await LoginPage.login('12345678909876543', process.env.USER_PASSWORD);

        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual(expected.auth.errors.USER_NOT_EXIST);
    });

    it('Should login after user add correct email', async () => {
        await LoginPage.login('12345678909876543', process.env.USER_PASSWORD);
        await clearInputValue(await LoginPage.inputEmail);
        await LoginPage.inputEmail.setValue(process.env.USER_EMAIL);
        await LoginPage.btnSubmit.click();

        await expect(Publications.navBar.pageTitle).toHaveText(expected.publications.pageTitle);
        await Publications.navBar.logout();
    });

    it('Should not login with un incorrect password', async () => {
        await LoginPage.login(process.env.USER_EMAIL,'1234566rt1!');

        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual(expected.auth.errors.INCORRECT_PASSWORD);
    });

    it('Should login after user add correct password', async () => {
        await LoginPage.login(process.env.USER_EMAIL,'1234566rt1!');
        await clearInputValue(await LoginPage.inputPassword);
        await LoginPage.inputPassword.setValue(process.env.USER_PASSWORD);
        await LoginPage.btnSubmit.click();

        await expect(Publications.navBar.pageTitle).toHaveText(expected.publications.pageTitle);
        await Publications.navBar.logout();
    });

    it('Should not login with empty email', async () => {
        await LoginPage.login('', process.env.USER_PASSWORD);

        const requiredMessage = await getValidationMessage('email');
        await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
    });

    it('Should not login with empty password', async () => {
        await LoginPage.login(process.env.USER_EMAIL, '');

        const requiredMessage = await getValidationMessage('password');
        await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
    });

    it('Should not login with invalid email format', async () => {
        await LoginPage.login('wrongEmail@', process.env.USER_PASSWORD);

        await expect(LoginPage.alertMsg).toHaveText(expected.auth.errors.USER_NOT_EXIST);
    });

    it('Should not login as not-activated user', async () => {
        const email = `testUser${Date.now()}@gmail.com`;
        const password = 'testUser1234!';
        await registerUser(email, password);

        await LoginPage.login(email, password);

        await expect(LoginPage.notActivatedAlertMessage).toHaveText(expected.auth.errors.USER_NOT_ACTIVATED);
    });

});
