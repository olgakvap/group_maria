const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');
const CreateProblemPage = require('../pageobjects/CreateProblem.page');

describe('Creating Problem', () => {

    before('Login and open problems page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.btnHumburgerMenu.click();
        await PublicationsPage.btnProblems.click();
    });

    const inputValueTitle = Date.now();

    it('Create new problem with existing company', async () => {
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");

        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitle));
    });

    it('Create new problem with existing company and existing title', async () => {
        let inputSameValueTitle = inputValueTitle;
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.fillAndSave(inputSameValueTitle, "any text", "any text");

        await expect(CreateProblemPage.errorSameTitle.isDisplayed());
        await expect(CreateProblemPage.errorSameTitle.toHaveText("Error: Problem with same title already exist"));
    });

});