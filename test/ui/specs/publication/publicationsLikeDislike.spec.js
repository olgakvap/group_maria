const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CreatePublicationPage = require('../../pageobjects/publication/PublicationCreate.page');
const PublicationPage = require("../../pageobjects/publication/Publications.page");


describe('COMMENT PUBLICATION', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    beforeEach('Create publication', async () => {
        const publicationTitle = `publication${Date.now()}`;
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue(publicationTitle);
        await CreatePublicationPage.inputDescription.setValue("New Position2");
        await CreatePublicationPage.textareaContent.setValue("Bachelor's degree in a related field or equivalent practical experience.");
        await CreatePublicationPage.btnSavePublication.click();
    });

    it('Verify Publication can be liked', async () => {
        let likesCountBefore = await PublicationsPage.getLikeCount();

        await PublicationsPage.btnLikePublication.click();
        await PublicationPage.countLikes.waitForDisplayed({timeout: 3000});

        let likesCountAfter = await PublicationsPage.getLikeCount();

        await expect(likesCountAfter).toEqual(likesCountBefore + 1);
    });

    it('Verify Publication can be unliked', async () => {
        await PublicationsPage.btnLikePublication.doubleClick();

        const countLike = await PublicationsPage.countLikes;
        console.log(await countLike.getText());
        await expect(await countLike.getText()).toBe("");
    });
});
