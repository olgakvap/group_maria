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
    });

    it('Create new problem with existing company', async () => {
        const inputValueTitle = Date.now();
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitle, "any text", "any text");

        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});
        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitle));
    });

    // TODO: requires using API request problemCreate
    it('Create new problem with existing company and existing title', async () => {
        const inputValueTitleNew = Date.now() + "1";

        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});

        await ProblemsPage.addProblemButton.click(); //- not sure why we do not need this line, wanna ask next time please ignore it
        await CreateProblemPage.fillAndSave(inputValueTitleNew, "any text", "any text");
        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitleNew));

        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});
        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitleNew, "any text", "any text");
        await expect(CreateProblemPage.errorSameTitle.isDisplayed());
        await expect(CreateProblemPage.errorSameTitle.toHaveText("Error: Problem with same title already exist"));
    });

});
