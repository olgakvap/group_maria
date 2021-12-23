const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const CreatePublicationPage = require('../pageobjects/CreatePublication.page');

describe('Creating Publication', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should create the Publication providing required information', async () => {
        const publicationTitle = `publication${Date.now()}`;
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue(publicationTitle);
        await CreatePublicationPage.inputDescription.setValue("New Position2");
        await CreatePublicationPage.textareaContent.setValue("Bachelor's degree in a related field or equivalent practical experience.");
        await CreatePublicationPage.btnSavePublication.click();
        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');
        //Todo: add verification that publication with specified title has been created
        await PublicationsPage.linkLoadMore.waitForDisplayed();
        const publication = await PublicationsPage.findPublication(publicationTitle);
        expect(await PublicationsPage.getPublicationTitle(publication)).toBe(publicationTitle);
    });
});


