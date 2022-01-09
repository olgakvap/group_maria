const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CompaniesPage = require('../../pageobjects/company/Companies.page');
const expected = require('../../../data/expected.json');

describe ('View Companies List', async () => {

    before ('User Login', async () => {
        await LoginPage.login(process.env.USER_EMAIL,process.env.USER_PASSWORD);
    });

    it ('CL - 1: Companies List present on the Companies Page', async () => {
        await PublicationsPage.navBar.openCompanies();
        await expect(CompaniesPage.navBar.pageTitle).toHaveText(expected.companies.pageTitle);
    });
});