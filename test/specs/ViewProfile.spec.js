const LoginPage = require('../pageobjects/Login.page');
const ViewProfilePage = require('../pageobjects/ViewProfile.page');

describe('View Profile Page', () => {

    it('Should display Full name', async () => {
        await LoginPage.open();
        await LoginPage.login('user@user.com', 'superUser123!');
        await ViewProfilePage.profilePage();
        //await expect(PublicationsPage.pageTitle).toBeExisting().true;
        //await expect(PublicationsPage.pageTitle).toHaveTextContaining(
        //   'publications').true;
        await expect(ViewProfilePage.userFirstLastName).toBeExisting().true;
        await expect(ViewProfilePage.userFirstLastName).toHaveText('Jordy Christiansen');

    });
});


