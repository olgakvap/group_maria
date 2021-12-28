const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const UsersListPage = require('../../pageobjects/user/UsersList.page');
const ProfilePage = require('../../pageobjects/user/Profile.page');
const LoginPage = require("../../pageobjects/auth/Login.page");

describe('View Users List', () => {

    before('Login as User', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should verify that user can navigate to users profile page', async () => {
        await PublicationsPage.navBar.openPeople();
        const userName = await UsersListPage.userFullNameText.getText();
        await UsersListPage.userNameLink.click();
        expect(await ProfilePage.userFirstLastName.getText()).toEqual(userName);

    });

});

