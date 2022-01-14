const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');
const CreateProblemPage = require('../../pageobjects/problem/ProblemCreate.page');
const ProblemPage = require('../../pageobjects/problem/Problem.page');

// TODO: requires refactoring / reviewing
describe.skip('Creating Problem', () => {

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
        await CreateProblemPage.fillAndSave(inputValueTitle, "Apple", "any text", "any text");
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});

        const foundRowsCount = await ProblemsPage.problemsRowsContainText(inputValueTitle).length;
        expect(foundRowsCount).toEqual(1);
    });

    // TODO: requires using API request problemCreate
    it('Create new problem with existing company and existing title', async () => {
        const inputValueTitleNew = Date.now() + "1";

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitleNew, "Apple", "any text", "any text");
        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndSave(inputValueTitleNew,"Apple", "any text", "any text");
        await CreateProblemPage.errorMessage.waitForDisplayed();

        const message = await CreateProblemPage.errorMessage.getText();
        await expect(message).toEqual("Error: Problem with same title already exist");
    });

    it('Start creating new problem and cancel', async () => {
        const inputValueTitle = Date.now();

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillAndCancel(Date.now(), "Apple", "any text", "any text");

        const foundRowsCount = await ProblemsPage.problemsRowsContainText(inputValueTitle).length;
        expect(foundRowsCount).toEqual(0);
    });

    xit('Create new problem with filters for Content field', async () => {
        const inputValueTitle = Date.now();
        const inputValueContent = "anytext";

        await ProblemsPage.addProblemButton.click();
        await CreateProblemPage.fillWithFiltersAndSave(inputValueTitle, "Apple", "any text", inputValueContent);
        await ProblemsPage.nextPageLabel.waitForDisplayed({timeout: 5000});
        await ProblemsPage.problemsRowContainText(inputValueTitle).click();

        const elem = await ProblemPage.getContentValue(inputValueContent);
        await expect(await elem.getTagName()).toEqual("del");

        const parent = await elem.parentElement();
        await expect(await parent.getTagName()).toEqual("strong");

        const parentOfParent = await parent.parentElement();
        await expect(await parentOfParent.getTagName()).toEqual("em");
    });

});
