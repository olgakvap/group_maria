const LoginPage = require('../pageobjects/Login.page');
const Publications = require('../pageobjects/Publications.page');
const { clearInputValue } = require('../../methods/helper');

describe('LOGIN PAGE', () => {

    it('Should not login with un exist email', async () => {
        await LoginPage.login('12345678909876543', process.env.USER_PASSWORD);
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("User with provided email does not exist");
    });

    it('Should login after user add correct email', async () => {
        await LoginPage.login('12345678909876543',process.env.USER_PASSWORD);
        await clearInputValue(await LoginPage.inputEmail);
        await LoginPage.inputEmail.setValue(process.env.USER_EMAIL);
        await LoginPage.btnSubmit.click();
        await expect(Publications.navBar.pageTitle).toHaveText('publications');
        await Publications.navBar.logout();
    });

    it('Should not login with un incorrect password', async () => {
        await LoginPage.login(process.env.USER_EMAIL,'1234566rt1!');
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("Incorrect password");
    });

    it('Should login after user add correct password', async () => {
        await LoginPage.login(process.env.USER_EMAIL,'1234566rt1!');
        await clearInputValue(await LoginPage.inputPassword);
        await LoginPage.inputPassword.setValue(process.env.USER_PASSWORD);
        await LoginPage.btnSubmit.click();
        await expect(Publications.navBar.pageTitle).toHaveText('publications');
        await Publications.navBar.logout();
    });

});
