const RestorePasswordPage = require('../../pageobjects/auth/RestorePassword.page');


describe('FORGOT PASSWORD PAGE', () => {


    it('Restore password with valid email address', async () => {
        await RestorePasswordPage.restorePassword(process.env.USER_EMAIL);

        await expect(RestorePasswordPage.resetPasswordMessage).toBeExisting();
        await expect(RestorePasswordPage.resetPasswordMessage).toHaveText("Password reset email sent to "+ process.env.USER_EMAIL+", if such user exists");
    });

    it('Should have the all the fields on Restore password page as per requirement ', async () => {
        await RestorePasswordPage.open();

        await expect(RestorePasswordPage.inputEmail).toBeExisting();
        await expect(RestorePasswordPage.btnSubmit).toBeExisting();
        await expect(RestorePasswordPage.backToLoginButton).toBeExisting();
    });

    it('Should reset form on restore password page ', async () => {
        await RestorePasswordPage.open();
        await RestorePasswordPage.inputEmail.setValue("temp");
        await browser.refresh();

        await expect(RestorePasswordPage.inputEmail).toHaveText("");
    });



});

