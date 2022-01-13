const SignupPage = require('../../../pageobjects/auth/Signup.page');
const { randomString } = require('../../../../helpers/uiMethods.helper');
const expected = require('../../../../data/expected.json');

describe('Negative Tests for Registration', async () => {

    const dotEnvPassword = process.env.USER_PASSWORD;
    const testEmailValid = 'test@gmail.com';

    beforeEach('Open Signup Page', async () => {
        await SignupPage.open();
    });

    it('SISO - 1: Should Not Register user that already exists', async () => {
        await SignupPage.signup(testEmailValid, dotEnvPassword);
        await expect(await SignupPage.userExistsErrorMessage(testEmailValid)).toBeDisplayed();
    });

    it('SISO - 2: Should show input validation errors disappearing', async () => {
        const alreadyRegisteredEmail = 'test.user18457624152@gmail.com';
        await SignupPage.signupWithoutSubmit(await randomString(10), dotEnvPassword);
        await expect(await SignupPage.emailErrorMessage).toHaveText(expected.registration.errors.INVALID_EMAIL);
        await SignupPage.signup(alreadyRegisteredEmail, dotEnvPassword);
        await expect(await SignupPage.emailErrorMessage).not.toBeDisplayed();
        await expect(await SignupPage.userExistsErrorMessage(alreadyRegisteredEmail)).not.toBeDisplayed();
    });

    it('SISO - 3: Should Not Register user with min + 1 password length', async () => {
        const validEmailFormat = `${Date.now()}@gmail.com`;
        await SignupPage.signup(validEmailFormat, await randomString(256));
        await expect(SignupPage.passwordErrorMessage).toHaveText(expected.registration.errors.INVALID_PASSWORD);
    });
});
