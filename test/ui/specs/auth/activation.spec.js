const LoginPage = require('../../pageobjects/auth/Login.page');
const expected = require('../../../data/expected.json');
const { registerUser } = require("../../../helpers/axios.methods");

describe('Check activation feature', () => {

    //BUG: Valid activation link is loaded forever
   xit('Should activate user with an valid credential', async () => {
        const email = `testUser${Date.now()}@gmail.com`;
        const password = 'testUser1234!';

        const activationLinkId = await registerUser(email, password);

        await browser.url(process.env.BASE_URL+"/activate/"+activationLinkId.activationLinkId);

        await expect(LoginPage.activatedAlertMessage).toHaveText(expected.auth.userActivationMessage);
    });

});