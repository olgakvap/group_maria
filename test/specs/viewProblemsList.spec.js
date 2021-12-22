const LoginPage = require('../pageobjects/Login.page');
const ViewProblemsList = require('../pageobjects/ViewProblemsList.page');


describe('View Problems List Page', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should display buttons: Problem name, Position, Company, Solutions, Creator', async () => {

        //await browser.pause(10000)
        await ViewProblemsList.open();
        //await browser.pause(10000)

        await expect(ViewProblemsList.problemName).toBeExisting().true;
        await expect(ViewProblemsList.position).toBeExisting().true;
        await expect(ViewProblemsList.company).toBeExisting().true;
        await expect(ViewProblemsList.solutions).toBeExisting().true;
        await expect(ViewProblemsList.creator).toBeExisting().true;
        //await expect(ViewProblemsList.btnGoToNextPage).toBeExisting();
        // await ViewProblemsList.btnGoToNextPage.click();

    });

});

