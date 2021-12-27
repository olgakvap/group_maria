const LoginPage = require('../../pageobjects/auth/Login.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');


describe('View Problems List Page', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should display buttons: Problem name, Position, Company, Solutions, Creator', async () => {
        await ProblemsPage.open();
        await expect(ProblemsPage.problemName).toBeExisting().true;
        await expect(ProblemsPage.position).toBeExisting().true;
        await expect(ProblemsPage.company).toBeExisting().true;
        await expect(ProblemsPage.solutions).toBeExisting().true;
        await expect(ProblemsPage.creator).toBeExisting().true;
    });

});

