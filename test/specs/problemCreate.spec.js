const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');
const CreateProblemPage = require('../pageobjects/CreateProblem.page');

describe('Creating Problem', () => {

    const inputValueTitle = Date.now();

    before('Login and open problems page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    beforeEach('Go to problems page', async() => {
        await PublicationsPage.navBar.openProblems();
    });

    it('Create new problem with existing company', async () => {
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");

        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitle));
    });

    //TODO api create problem request
    xit('Create new problem with existing company and existing title', async () => {
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");

        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitle));
        browser.pause(1000);
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");

        await expect(CreateProblemPage.errorSameTitle.isDisplayed());
        await expect(CreateProblemPage.errorSameTitle.toHaveText("Error: Problem with same title already exist"));
    });

});