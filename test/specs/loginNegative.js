const LoginPage = require('../pageobjects/Login.page');
const Publications = require('../pageobjects/Publications.page');
const GlobalNavigation = require('../pageobjects/GlobalNavigation.page')
const { clearInputValue } = require('../../methods/helper');

describe('LOGIN PAGE', () => {

    it('Should not login with un exist email', async () => {
        await LoginPage.open();
        await LoginPage.inputEmail.setValue('12345678909876543');
        await LoginPage.inputPassword.setValue('1N7mMno3oqmX3Z$');
        await LoginPage.btnSubmit.click();
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("User with provided email does not exist");
    });

    it('Should login after user add correct email', async () => {
        await clearInputValue(await LoginPage.inputEmail);
        await LoginPage.inputEmail.setValue('SaiKufn#5d9sdde@gmail.com');
        await LoginPage.btnSubmit.click();
        await expect($('//h6')).toHaveText('publications');
    });

    it('Should not login with un incorrect password', async () => {
        await $("//button[@id='nav-bar-toggle']").click();
        await GlobalNavigation.logoutBtn.click();
        await LoginPage.inputEmail.setValue('SaiKufn#5d9sdde@gmail.com');
        await LoginPage.inputPassword.setValue('145678909876543456789');
        await LoginPage.btnSubmit.click();
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("Incorrect password");
    });

    it('Should login after user add correct password', async () => {
        await clearInputValue(await LoginPage.inputPassword);
        await LoginPage.inputPassword.setValue('1N7mMno3oqmX3Z$');
        await LoginPage.btnSubmit.click();
        await expect($('//h6')).toHaveText('publications');
    });

});
