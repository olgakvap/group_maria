const LoginPage = require('../pageobjects/auth/Login.page');
const PublicationsPage = require('../pageobjects/publication/Publications.page');
const Companies = require('../pageobjects/company/Companies.page');
const { createAndLoginAPI } = require('../../helpers/axios.methods');
const UsersList = require('../pageobjects/user/UsersList.page');

describe('Checking NavBar Navigation', () => {

    before('Create New User', async () => {
        let email = `${Date.now()}@gmail.com`;
        let password = 'superUser123!';
        await createAndLoginAPI(email, password);
        await LoginPage.login(email, password);
    })

    it('Should Navigate to Users List', async () => {
        await PublicationsPage.navBar.openPeople();
        await expect(UsersList.navBar.pageTitle).toHaveText('users');
    });

    it('Should Navigate to Companies List', async () => {
        await UsersList.navBar.openCompanies();
        await expect(Companies.navBar.pageTitle).toHaveText('companies');
    });
//Todo: add other tests and User Deletion;
});
