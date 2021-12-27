const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CreatePublicationPage = require('../../pageobjects/publication/PublicationCreate.page');
const PublicationEditPage = require('../../pageobjects/publication/PublicationEdit.page');

// TODO: requires refactoring / reviewing
describe('Modifying Publication', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        // TODO: requires using API request publicationCreate
        const publicationTitle = `publication${Date.now()}`;
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue(publicationTitle);
        await CreatePublicationPage.inputDescription.setValue("New Position2");
        await CreatePublicationPage.textareaContent.setValue("Bachelor's degree in a related field or equivalent practical experience.");
        await CreatePublicationPage.btnSavePublication.click();
    });

    xit('Should modify publication', async () => {

        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');
        // await PublicationsPage.linkLoadMore.waitForDisplayed();
        // const publication = await PublicationsPage.findPublication(publicationTitle);
        // expect(await PublicationsPage.getPublicationTitle(publication)).toBe(publicationTitle);
    });
});
