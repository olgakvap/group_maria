const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');

describe('LOGIN PAGE', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login('user@user.com', 'superUser123!');
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

});


