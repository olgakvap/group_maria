const SigninPage = require('../pageobjects/Singin.page');

describe('SIGNIN PAGE', () => {
    it('Should signin with valid credentials', async () => {
        await SigninPage.signup('user2@user.com', 'superUser123!');
        await expect(SigninPage.containerMessage).toBeExisting().true;
        await expect(SigninPage.containerMessage).toHaveTextContaining(
            'Registration successful!').true;
    });
});