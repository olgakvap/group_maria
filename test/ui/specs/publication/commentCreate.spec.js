const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CreatePublicationPage = require('../../pageobjects/publication/PublicationCreate.page');

describe('COMMENT PUBLICATION', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        const publicationTitle = `publication${Date.now()}`;
        await PublicationsPage.btnAddPublication.click();
        await CreatePublicationPage.inputTitle.setValue(publicationTitle);
        await CreatePublicationPage.inputDescription.setValue("New Position2");
        await CreatePublicationPage.textareaContent.setValue("Bachelor's degree in a related field or equivalent practical experience.");
        await CreatePublicationPage.btnSavePublication.click();
    });

    it('Comment attached to Publication', async () => {

        await PublicationsPage.btnComment.click();
        await PublicationsPage.commentInput.setValue("New comment");
        await PublicationsPage.btnSendComment.click();

        const comment = await PublicationsPage.commentContent;
        await expect(await comment.getText()).toBe("New comment");
    });
});
