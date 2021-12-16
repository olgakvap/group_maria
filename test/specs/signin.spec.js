const SignupPage = require('../pageobjects/Singup.page');

describe('SIGNUP PAGE', () => {

    it('Should signup with valid credentials', async () => {
        await SignupPage.signup(`user${Date.now()}@user.com`, 'superUser123!');
        await expect(SignupPage.messageUserRegistered).toBeExisting().true;
        console.log(await SignupPage.messageUserRegistered.getText());
        await expect(await SignupPage.messageUserRegistered.getText()).toEqual(
            'Registration successful!');
    });

});