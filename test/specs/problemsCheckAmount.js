const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');

describe('Problems Page', () => {

    const inputValueTitle = Date.now();

    before('Login and open problems page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.navBar.openProblems();
    });

    describe('Working with Problem Page', () => {
        it('Search a company by name "Google"', async () => {
            await ProblemsPage.filtersButton.click();
            await ProblemsPage.filterColumnsDropdown.selectByVisibleText("Company");
            await ProblemsPage.filterValueDropdown.setValue("Google");
            const loader = await ProblemsPage.filterLoadIcon;
            await expect(loader).not.toBeDisplayed()
            await ProblemsPage.filtersButton.click();
            const problems = await ProblemsPage.problemRowsContainTextInColumn("Google", "Company");
            await expect(problems.length).toEqual(10);
        });

    });

});






// const GlobalNavigation = require('../pageobjects/GlobalNavigation.page')
//
// const { createCompany, createProblem } = require("../../methods/axios.methods");
// const { creatAndLoginAPI } = require("../../methods/helper");
// const { clearInputValue } = require('../../methods/helper')
//
// describe('LOGIN PAGE', () => {
//
//     let token = null;
//     let getCompanyID = null;
//
//     before(async () => {
//         token = await creatAndLoginAPI("test152a0AffPIJulia@gmail.com", 'Wertyui4567890#');
//         getCompanyID = await createCompany({ title: 'TestCompany1', accessToken: token });
//     })
//
//     it('Should create 11 problems using API', async () => {
//         const res = await createProblem({
//             companyId: getCompanyID,
//             accessToken: token
//         });
//     });
//
//
// });
