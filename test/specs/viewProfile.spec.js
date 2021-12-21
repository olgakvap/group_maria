const LoginPage = require('../pageobjects/Login.page');
const ViewProfilePage = require('../pageobjects/ViewProfile.page');

describe('View Profile Page', () => {

    it('Should display Full name and Job Title', async () => {
        await LoginPage.login('user@user.com', 'superUser123!');
        await ViewProfilePage.profilePage();
        await expect(ViewProfilePage.userFirstLastName).toBeExisting().true;
        await expect(ViewProfilePage.userJobTitle).toBeExisting().true;
        await expect(ViewProfilePage.userEmail).toBeExisting().true;
    });

});


