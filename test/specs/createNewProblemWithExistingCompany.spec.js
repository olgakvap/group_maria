const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');
const CreateProblemPage = require('../pageobjects/CreateProblem.page');

describe('Creating Problem', () => {

    it('Create new problem with existing company', async () => {
        const inputValueTitle = Date.now();

        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.btnHumburgerMenu.click();
        await PublicationsPage.btnProblems.click();
        await ProblemsPage.btnAddProblem.click();
        await CreateProblemPage.inputTitle.setValue(inputValueTitle);
        await CreateProblemPage.inputCompany.click();
        await CreateProblemPage.appleCompanyOption.click();
        await CreateProblemPage.inputPosition.setValue("any text");
        await CreateProblemPage.inputContent.click();
        await CreateProblemPage.inputContent.setValue("any text");
        await CreateProblemPage.btnSave.click();

        await expect(ProblemsPage.firstRecord.getText().hasOwnProperty(inputValueTitle));
    });

});