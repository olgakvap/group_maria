const LoginPage = require('../pageobjects/auth/Login.page');
const PublicationsPage = require('../pageobjects/publication/Publications.page');
const Companies = require('../pageobjects/company/Companies.page');
const { createAndLoginAPI, deleteUser } = require('../../helpers/axios.methods');
const UsersList = require('../pageobjects/user/UsersList.page');
const Problems = require('../pageobjects/problem/Problems.page');
const Profile = require('../pageobjects/user/Profile.page');

describe('Checking NavBar Navigation', () => {

    const email = `TestUser${Date.now()}@gmail.com`;
    const password = 'superUser123!';
    let userLoginRes;

    before('Create New User', async () => {
        userLoginRes = await createAndLoginAPI(email, password);
        await LoginPage.login(email, password);
    });

    it('Should Navigate to Users List', async () => {
        await PublicationsPage.navBar.openPeople();
        await expect(UsersList.navBar.pageTitle).toHaveText('users');
    });

    it('Should Navigate to Companies Page', async () => {
        await UsersList.navBar.openCompanies();
        await expect(Companies.navBar.pageTitle).toHaveText('companies');
    });

    it('Should Navigate to Problems Page', async () => {
        await Companies.navBar.openProblems();
        await expect(Problems.navBar.pageTitle).toHaveText('problems');
    });

    it('Should Navigate to Profile Page', async () => {
        await Problems.navBar.openProfile();
        await expect(Profile.navBar.pageTitle).toHaveText('user');
    });

    it('Should Navigate to Publications Page', async () => {
        await Profile.navBar.openPublications();
        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');
    });

    it('Should Logout', async () => {
        await PublicationsPage.navBar.logout();
        await expect(LoginPage.pageTitle).toHaveText('Login');
    });

    after('Delete the User', async () => {
        const userDeleteRes = await deleteUser({userId: userLoginRes.userID, accessToken: userLoginRes.accessToken});
    });

});
