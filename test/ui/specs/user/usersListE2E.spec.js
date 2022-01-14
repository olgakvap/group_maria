const LoginPage = require("../../pageobjects/auth/Login.page");
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const UsersListPage = require('../../pageobjects/user/UsersList.page');
const {createAndLoginAPI, deleteUser} = require("../../../helpers/axios.methods");


describe('View User List', () => {
    let testUser;
    let userTitle;
    before('Create and Activate New User', async () => {
        // 1. Create and activate user, set token
        userTitle = 'OK'+ Date.now();
        testUser = {
            email: `${userTitle}@gmail.com`,
            password: 'testUser1234!'
        };
        Object.assign(testUser, await createAndLoginAPI(testUser.email, testUser.password));

        await LoginPage.login(testUser.email, testUser.password);

    });

    it('Should verify that Users list displays new User', async () => {
        await PublicationsPage.navBar.openPeople();
        const userNameLink = await UsersListPage.findUserNameLinkByID(testUser.userID);
        await userNameLink.waitForDisplayed({timeout: 15000});
        let text = await userNameLink.getText();
        await browser.pause(10000);
        await expect(text).toEqual(userTitle);
    });

    after('CLEANUP', async () => {

        await deleteUser({userId: testUser.userID, accessToken: testUser.accessToken});

    });

});
