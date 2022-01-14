const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');
const ProblemPage = require('../../pageobjects/problem/Problem.page');
const { createAndLoginAPI, createCompanyAndGetID, createProblem, findProblemByTitle, deleteProblem, userLoginAPI, deleteCompany, deleteUser } = require('../../../helpers/axios.methods');
const faker = require('faker');

describe('E2E test - create solution', () => {

    let testUser;
    let company;
    let problem;

    before('GENERATE TEST DATA', async () => {
        // 1. Create and activate user, set token
        testUser = {
            email: `testUser${Date.now()}@gmail.com`,
            password: 'testUser1234!'
        };
        Object.assign(testUser, await createAndLoginAPI(testUser.email, testUser.password));

        // 2. Create a company
        company = {
            title: 'Company' + Date.now()
        };
        company.id = await createCompanyAndGetID({
            title: company.title,
            description: 'Maria',
            accessToken: testUser.accessToken
        });

        // 3. Create a problem
        const problemTitle = 'New Problem' + Date.now();

            await createProblem({
                title: problemTitle,
                companyId: company.id,
                jobTitle: faker.name.jobTitle(),
                accessToken: testUser.accessToken
            });

         // 4. Get problems ids
        problem = await findProblemByTitle(problemTitle, testUser.accessToken);
    });

        beforeEach('Should open the created problem', async() => {
            await LoginPage.login(testUser.email, testUser.password);
            await PublicationsPage.navBar.openProblems();
            await ProblemsPage.filtersButton.click();
            await ProblemsPage.filterColumnsDropdown.selectByVisibleText("Company");
            await ProblemsPage.filterValueDropdown.setValue(company.title);
            await ProblemsPage.filtersButton.click();
            await ProblemsPage.newProblem.waitForDisplayed();
            const expectedProblemTitle = await ProblemsPage.newProblem.getText();
            await ProblemsPage.newProblem.click();
            const actualProblemTitle = await ProblemPage.headerTitleProblem.getText();
            await expect(actualProblemTitle).toEqual(expectedProblemTitle);
    });
        xit('Should create solution with default data', async () => {
            await ProblemPage.btnAddNewSolution.click();
            await ProblemPage.btnLastSolution.waitForDisplayed({timeout: 5000});
            await ProblemPage.btnLastSolution.click();
            await ProblemPage.textBoxSolution.waitForDisplayed({timeout: 5000});
            const lastCreatedSolution = await ProblemPage.textBoxLastCreatedSolution;
            await ProblemPage.textBoxLastCreatedSolution.waitForDisplayed({timeout: 7000});
            const textSolution = await lastCreatedSolution.getText();
            await expect(ProblemPage.btnEditSolution).toBeDisplayed();
            await expect(textSolution).toEqual("'hello world!'");
        });

        after('CLEANUP', async () => {
            // 5. Delete  problem
            await deleteProblem({ problemID: problem._id, accessToken: testUser.accessToken});

            // 6. Login as admin
            const adminLoginRes = await userLoginAPI(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
            const adminToken = adminLoginRes.accessToken;

            // 7. Delete the company
            await deleteCompany({companyID: company.id, accessToken: adminToken});

            // 8. Delete the user from step 1
            await deleteUser({userId: testUser.userID, accessToken: testUser.accessToken});
        })
});
