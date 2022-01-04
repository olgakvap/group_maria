const SignupPage = require('../../pageobjects/auth/Signup.page');
const { invalidEmails } = require('../../../data/invalidEmails');


describe('Checking Wrong Emails', () => {

    before('Open Signup Page', async () => {
        await SignupPage.open();
     });

    invalidEmails.forEach((email) =>
        it(`Can not create a user with email in invalid format: ${email}`, async () => {
            await SignupPage.inputEmail.setValue(email);
            await browser.keys("Tab");
            await expect(SignupPage.emailErrorMessage).toHaveText('Email validation error');
        }),
    );

});


