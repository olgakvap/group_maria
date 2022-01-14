const LoginPage = require('../../pageobjects/auth/Login.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');
const PublicationPage = require('../../pageobjects/publication/Publications.page');


describe.skip('View Problems List Page', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should display buttons: Problem name, Position, Company, Solutions, Creator', async () => {
        await PublicationPage.navBar.openProblems();
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 6000});

        await expect(ProblemsPage.problemName).toBeExisting();
        await expect(ProblemsPage.position).toBeExisting();
        await expect(ProblemsPage.company).toBeExisting();
        await expect(ProblemsPage.solutions).toBeExisting();
        await expect(ProblemsPage.creator).toBeExisting();
    });

});

