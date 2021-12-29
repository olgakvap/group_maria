const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const expected = require('../../../data/expected.json');

describe('LOGIN PAGE', () => {

    it('Should login with valid credentials', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

        await expect(PublicationsPage.navBar.pageTitle).toBeExisting();
        await expect(PublicationsPage.navBar.pageTitle).toHaveText(expected.publications.pageTitle);
    });

});


