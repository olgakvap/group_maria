const RestorePasswordPage = require('../../pageobjects/auth/RestorePassword.page');


describe('FORGOT PASSWORD PAGE', () => {


    it('Restore password with valid email address', async () => {
        await RestorePasswordPage.restorePassword(process.env.USER_EMAIL);
        await expect(RestorePasswordPage.resetPasswordMessage).toBeExisting();
        await expect(RestorePasswordPage.resetPasswordMessage).toHaveText("Password reset email sent to "+ process.env.USER_EMAIL+", if such user exists");
    });

});

