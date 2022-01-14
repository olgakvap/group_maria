const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const PublicationCreatePage = require('../../pageobjects/publication/PublicationCreate.page');
const expected = require('../../../data/expected.json');
const { getValidationMessage } = require('../../../helpers/uiMethods.helper');
const faker = require('faker');
const { createAndLoginAPI, deleteUser, deleteUserPublications } = require("../../../helpers/axios.methods");

describe('Creating Publication', () => {
    let testUser;

    before('Open login page', async () => {
        testUser = {
            email: `testUser${Date.now()}@gmail.com`,
            password: 'testUser1234!'
        };
        Object.assign(testUser, await createAndLoginAPI(testUser.email, testUser.password));

        await LoginPage.login(testUser.email, testUser.password);
    });

    describe('Creating Publication - POSITIVE', () => {

        beforeEach('Open Create Publication page', async () => {
            await PublicationsPage.navBar.openPublications();
            await PublicationsPage.btnAddPublication.click();
            await PublicationCreatePage.inputTitle.waitForDisplayed({timeout: 5000});
        });

        it('Should create the Publication providing required information #smoke', async () => {
            const publicationTitle = `publication ${Date.now()}`;

            await PublicationCreatePage.fillAndSave(publicationTitle, faker.lorem.word(),
              faker.lorem.sentence(5));
            await PublicationsPage.linkLoadMore.waitForDisplayed({timeout: 5000});

            const listTitlesResultArray = [];
            const listTitles = await PublicationsPage.publicationTitlesList;
            for ( let i = 0; i < listTitles.length; i++) {
                listTitlesResultArray.push(await listTitles[i].getText());
            }
            await expect (listTitlesResultArray).toContain(publicationTitle);
        });

        it('Should create the Publication providing required information and image', async () => {
            const publicationTitle = `publication${Date.now()}`;
            const inputImageLink = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA6xOLhJmOjhQjqHsuCPSL1-_2RCbCve1keg&usqp=CAU${Date.now()}`;
            await PublicationCreatePage.fillAndSave(publicationTitle, "QA position",
              "This is a description field.", inputImageLink );
            await PublicationsPage.linkLoadMore.waitForDisplayed();

            await expect(PublicationsPage.navBar.pageTitle).toHaveText(expected.publications.pageTitle);
            const listDescriptionsResultArray = [];
            const listDescriptions = await PublicationsPage.publicationDescriptionList;
            for ( let i = 0; i < listDescriptions.length; i++) {
                listDescriptionsResultArray.push(await listDescriptions[i].getText());
            }
            await expect (listDescriptionsResultArray).toContain("QA position");
        });

        // TODO: there is a bug, skip for now
        xit('Should "CANCEL" creating Publication', async () => {
            const publicationTitle = `publication ${Date.now()}`;
            await PublicationCreatePage.fillAndCancel(publicationTitle, faker.lorem.word(1),
              faker.lorem.sentence(2));
            await PublicationCreatePage.btnCancelPublication.click();

            const listTitlesResultArray = [];
            const listTitles = await PublicationsPage.publicationTitlesList;
            for ( let i = 0; i < listTitles.length; i++) {
                listTitlesResultArray.push(await listTitles[i].getText());
            }
            await expect (listTitlesResultArray).not.toContain(publicationTitle);
        });

    });

    describe.skip('Creating Publication - NEGATIVE', () => {

        before('Open Create Publication page', async () => {
            await PublicationsPage.navBar.openPublications();
            await PublicationsPage.btnAddPublication.click();
        });

        it('Should not create the Publication without Title', async () => {
            await PublicationCreatePage.btnSavePublication.click();

            const requiredMessage = await getValidationMessage('title');
            await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
        });

        it('Should not create the Publication without Description', async () => {
            await PublicationCreatePage.inputTitle.setValue('Test Publication');
            await PublicationCreatePage.btnSavePublication.click();

            const requiredMessage = await getValidationMessage('description');
            await expect(requiredMessage).toEqual(expected.general.errors.REQUIRED_FIELD);
        });

        it('Should not create the Publication without Content', async () => {
            await PublicationCreatePage.fillAndSave(faker.name.jobTitle(), faker.lorem.sentence(1));

            await expect(PublicationCreatePage.errorMessage).toBeDisplayed();
            await expect(PublicationCreatePage.errorMessage).toHaveText(expected.publications.errors.CONTENT_REQUIRED_FIELD);
        });

    });

    after('Cleanup', async () => {
        await deleteUserPublications(testUser.userID, testUser.accessToken);
        await deleteUser({ userId: testUser.userID, accessToken: testUser.accessToken });
    });
});
