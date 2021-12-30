const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');
const CreateProblemPage = require('../../pageobjects/problem/ProblemCreate.page');

// TODO: requires refactoring / reviewing
describe('Creating Problem', () => {

    before('Login and open problems page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    beforeEach('Go to problems page', async() => {
        await PublicationsPage.navBar.openProblems();
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});
    });

    it('Create new problem with existing company', async () => {
        const inputValueTitle = Date.now();

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});
        const foundRowsCount = await ProblemsPage.problemsRowsContainText(inputValueTitle).length;
        expect(foundRowsCount).toEqual(1);
    });

    // TODO: requires using API request problemCreate
    it('Create new problem with existing company and existing title', async () => {
        const inputValueTitleNew = Date.now() + "1";

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitleNew, "any text", "any text");
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitleNew, "any text", "any text");
        await CreateProblemPage.errorMessage.waitForDisplayed();
        const message = await CreateProblemPage.errorMessage.getText();
        await expect(message).toEqual("Error: Problem with same title already exist");
    });

    it('Start creating new problem and cancel', async () => {
        const inputValueTitle = Date.now();

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndCancel(Date.now(), "any text", "any text");

        const foundRowsCount = await ProblemsPage.problemsRowsContainText(inputValueTitle).length;
        expect(foundRowsCount).toEqual(0);
    });

});
