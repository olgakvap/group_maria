const LoginPage = require('../../pageobjects/auth/Login.page');
const PublicationsPage = require('../../pageobjects/publication/Publications.page');
const CreatePublicationPage = require('../../pageobjects/publication/PublicationCreate.page');
const {expect} = require("chai");

describe('Creating Publications and Verifying their Creation ', () => {

    before('Open login page', async () => {
        await LoginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    it('Should Create i Amount of Publications', async () => {
        for (let i = 1; i <= 5; i++){
            await PublicationsPage.btnAddPublication.click();
            await CreatePublicationPage.inputTitle.setValue(`Google QA Engineer Position ${i}`);
            await CreatePublicationPage.inputDescription.setValue(`New Position ${i}`);
            await CreatePublicationPage.textareaContent.setValue(`Minimum qualifications ${i}`);
            await CreatePublicationPage.btnSavePublication.click();
            let temp = await $('div.pb-4>div:nth-child(2)>div>a>div');
            let temp1 = await temp.getText();
            await expect(temp1).to.equal(`Google QA Engineer Position ${i}`);
        }
    //Todo: check position, content, link for picture, change ${i} inside setValue,
    });

});


