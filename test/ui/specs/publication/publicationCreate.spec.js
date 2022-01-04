const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CreatePublicationPage = require('../../pageobjects/publication/PublicationCreate.page');
const expected = require('../../../data/expected.json');
const {getValidationMessage} = require("../../../helpers/uiMethods.helper");

// TODO: requires refactoring / reviewing
describe('Creating Publication', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    xit('Should create the Publication providing required information', async () => {
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

    xit ('Should not create the Publication without Title', async () => {
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.btnSavePublication.click();

        const requiredMessage = await getValidationMessage('title');
        //await expect(CreatePublicationPage.errorMessage).toBeDisplayed();
        await expect(requiredMessage).toHaveText(expected.general.errors.REQUIRED_FIELD);
    });

    xit('Should not create the Publication without Description', async () => {
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue('Apple Company');
        await CreatePublicationPage.btnSavePublication.click();
        await expect(CreatePublicationPage.errorMessage).toBeDisplayed();
        await expect(CreatePublicationPage.errorMessage).toHaveText(expected.general.errors.REQUIRED_FIELD);
    });

    // TODO: cant runt last scenario with this one
    it('Should not create the Publication without Content', async () => {
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue('Apple Company');
        await CreatePublicationPage.inputDescription.setValue('Information about apple company');
        await CreatePublicationPage.btnSavePublication.click();
        await expect(CreatePublicationPage.errorMessage).toBeDisplayed();
        await expect(CreatePublicationPage.errorMessage).toHaveText(expected.publications.errors.CONTENT_REQUIRED_FIELD);
        await CreatePublicationPage.btnCancelPublication.click();
        await browser.refresh();
    });

    it('Should "CANCEL" creating Publication', async () => {
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue('Google QA Engineer Position');
        await CreatePublicationPage.inputDescription.setValue('New Position');
        await CreatePublicationPage.textareaContent.setValue('Minimum qualifications');
        await CreatePublicationPage.btnCancelPublication.click();
    });
});


