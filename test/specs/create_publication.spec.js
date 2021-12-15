const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const CreatePublicationPage = require('../pageobjects/CreatePublication.page');
describe('Creating Publication', () => {
    it('Should create the Publication providing required information', async () => {
        await LoginPage.login('user@user.com', 'superUser123!');
        //await expect(PublicationsPage.pageTitle).toBeExisting().true;
        //await expect(PublicationsPage.pageTitle).toHaveTextContaining(
         //   'publications').true;
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue("Google QA Engineer Position2");
        await CreatePublicationPage.inputDescription.setValue("New Position2");
        await CreatePublicationPage.textareaContent.setValue("Bachelor's degree in a related field or equivalent practical experience.");
        await CreatePublicationPage.btnSavePublication.click();
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveTextContaining(
          'publications').true;
        //Todo: add verification tha publication with specified title has been created
        //await browser.pause(10000);

    });
});


