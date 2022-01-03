const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const ProblemsPage = require('../../pageobjects/problem/Problems.page');
const { createAndLoginAPI, createCompanyAndGetID, createProblem, findProblemByTitle, deleteProblem, userLoginAPI, deleteCompany, deleteUser } = require('../../../helpers/axios.methods');
const faker = require('faker');

describe('Problems Page - TEST', () => {

  let testUser;
  let company;
  let problemsArray = [];

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

    // 3. Create 11 problems
    const problemTitle = 'New Problem' + Date.now();
    const problemTitlesArray = [];
    for (let i = 0; i < 11 ; i++) {
      problemTitlesArray.push(problemTitle + i);
      await createProblem({
        title: problemTitle + i,
        companyId: company.id,
        jobTitle: faker.name.jobTitle(),
        accessToken: testUser.accessToken
      });
    }

    // 4. Get problems ids created at step 5
    const problemsArray = [];
    for (let title of problemTitlesArray) {
      problemsArray.push(await findProblemByTitle(title, testUser.accessToken));
    }
  });

  describe('UI TEST', () => {

    before('LOGIN AS USER', async () => {
      await LoginPage.login(testUser.email, testUser.password);
      await PublicationsPage.navBar.openProblems();
    });

    it('TEST CASE', async () => {
      await ProblemsPage.filtersButton.click();
      await ProblemsPage.filterColumnsDropdown.selectByVisibleText("Company");
      await ProblemsPage.filterValueDropdown.setValue(company.title);
      const loader = await ProblemsPage.filterLoadIcon;
      await expect(loader).not.toBeDisplayed()
      await ProblemsPage.filtersButton.click();
      const problems = await ProblemsPage.problemRowsContainTextInColumn(company.title, "Company");
      await expect(problems.length).toEqual(10);

    });

  });

  after('CLEANUP', async () => {
    // 5. Delete all problems
    for (let problem of problemsArray) {
      const problemDeleteRes = await deleteProblem({ problemID: problem._id, accessToken: testUser.accessToken});
    }

    // 6. Login as admin
    const adminLoginRes = await userLoginAPI(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    const adminToken = adminLoginRes.accessToken;

    // 7. Delete the company
    await deleteCompany({companyID: company.id, accessToken: adminToken});

    // 8. Delete the user from step 1
    await deleteUser({userId: testUser.userID, accessToken: testUser.accessToken});
  })

});
