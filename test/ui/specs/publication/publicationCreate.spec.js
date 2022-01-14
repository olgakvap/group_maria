const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const PublicationCreatePage = require('../../pageobjects/publication/PublicationCreate.page');
const expected = require('../../../data/expected.json');
const {getValidationMessage} = require("../../../helpers/uiMethods.helper");
const {clearInputValue} = require ('../../../helpers/uiMethods.helper');

describe('Creating Publication - Positive', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    beforeEach('Open Create Page', async () => {
        await PublicationsPage.btnAddPublication.click();
    });

   it('Should create the Publication providing required information', async () => {
        const publicationTitle = `publication${Date.now()}`;
        await PublicationCreatePage.fillAndSave(publicationTitle, "QA position","This is a description field.");
        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');

       //create array []
       const listTitlesResultArray = [];
       await PublicationsPage.linkLoadMore.waitForDisplayed();
       const listTitles = await PublicationsPage.publicationTitlesList;
       for ( let i = 0; i < listTitles.length; i++) {
           listTitlesResultArray.push(await listTitles[i].getText());
       }
       await expect (listTitlesResultArray).toContain(publicationTitle);
    });

    it('Should create the Publication providing required information and image', async () => {
        const publicationTitle = `publication${Date.now()}`;
        const inputImageLink = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA6xOLhJmOjhQjqHsuCPSL1-_2RCbCve1keg&usqp=CAU${Date.now()}`;
        await PublicationCreatePage.fillAndSave(publicationTitle, "QA position","This is a description field.", inputImageLink );
        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');
        const listDescriptionsResultArray = [];
        await PublicationsPage.linkLoadMore.waitForDisplayed();
        const listDescriptions = await PublicationsPage.publicationDescriptionList;
        for ( let i = 0; i < listDescriptions.length; i++) {
            listDescriptionsResultArray.push(await listDescriptions[i].getText());
        }
        await expect (listDescriptionsResultArray).toContain("QA position");
    });

    //bug
    xit('Should "CANCEL" creating Publication', async () => {
        await PublicationCreatePage.fillAndCancel('Google QA Engineer Position', 'New Position','Minimum qualifications');
        await expect(PublicationsPage.navBar.pageTitle).toHaveText('publications');
    });

    after(function () {
        browser.execute(function () {
            window.localStorage.clear();
        });
    });
});

describe.skip('Creating Publication - Negative', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await PublicationsPage.btnAddPublication.click();
    });

    it('Should not create the Publication without Description', async () => {
        await PublicationCreatePage.inputTitle.setValue('Apple Company');
        await PublicationCreatePage.btnSavePublication.click();
        const requiredMessage = await getValidationMessage('description');
        await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
    });

    it('Should not create the Publication without Title', async () => {
        await clearInputValue(await PublicationCreatePage.inputTitle);
        await PublicationCreatePage.inputTitle.setValue('');
        await PublicationCreatePage.btnSavePublication.click();
        const requiredMessage = await getValidationMessage('title');
        await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
    });

    it('Should not create the Publication without Content', async () => {
        await PublicationCreatePage.fillAndSave('Google', 'Information about google company');
        await expect(PublicationCreatePage.errorMessage).toBeDisplayed();
        await expect(PublicationCreatePage.errorMessage).toHaveText(expected.publications.errors.CONTENT_REQUIRED_FIELD);
    });

        after(function () {
            browser.execute(function () {
                window.localStorage.clear();
            });
    });
});
