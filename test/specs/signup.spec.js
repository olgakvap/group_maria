const SignupPage = require('../pageobjects/Singup.page');

describe('SIGNUP PAGE', () => {

    it('Should signup with valid credentials', async () => {
        await SignupPage.signup(`user${Date.now()}@user.com`, 'superUser123!');
        await expect(SignupPage.messageUserRegistered).toBeExisting().true;
        await expect(await SignupPage.messageUserRegistered).toHaveText('Registration successful!');
    });

});
