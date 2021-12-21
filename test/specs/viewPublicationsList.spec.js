const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');

describe('View Publications List', () => {

    before('Log in', async () => {
        browser.maximizeWindow();
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Verify that the "Add Publication" is displayed and is clickable', async () => {
        await expect(PublicationsPage.btnAddPublication).toBeDisplayed();
        await expect(PublicationsPage.btnAddPublication).toBeClickable();
    });

    it('Verify that the "Add publication" button contains text "ADD PUBLICATION"', async () => {
        await expect(PublicationsPage.btnAddPublication).toHaveText('ADD PUBLICATION');
    });

    it('Verify the Publications List is paginated by 10', async () => {
        await expect(PublicationsPage.publicationsList).toBeElementsArrayOfSize(10);
    });

    it('Verify that the "Load more" button is displayed and is clickable', async () => {
        await expect(PublicationsPage.linkLoadMore).toBeDisplayed();
        await expect(PublicationsPage.linkLoadMore).toHaveText('Load more...');
    });

    it('Verify the clicking "Load more..." button expands the Publications list into 20 publications', async () => {
        await PublicationsPage.linkLoadMore.click();
        await expect(PublicationsPage.publicationsList).toBeElementsArrayOfSize(20);
    })
})