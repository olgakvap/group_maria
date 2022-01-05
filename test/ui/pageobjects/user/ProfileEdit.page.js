const Page = require('../Page');
const { clearInputValue } = require('../../../helpers/uiMethods.helper');

class ProfileEditPage extends Page {
    get inputFirstName() {
        return $('#first-name');
    }
    get inputLastName() {
        return $('#last-name');
    }
    get inputJobTitle() {
        return $('#job-title');
    }
    get inputExternalLinkToProfileImage() {
        return $('#image');
    }
    get inputAbout() {
        return $('#about');
    }
    get inputProgrammingLanguages() {
        return $('#languages');
    }
    get errorMessage() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]');
    }
    get btnCancel() {
        return $("//button[@xpath='1']");
    }
    get btnSave() {
        return $("[type='submit']");
    }
    async fillAndSave(firstName, lastName, jobTitle) {
        await clearInputValue(this.inputFirstName);
        await this.inputFirstName.setValue(firstName);
        await clearInputValue(await this.inputLastName);
        await this.inputLastName.setValue(lastName);
        await clearInputValue(await this.inputJobTitle);
        await this.inputJobTitle.setValue(jobTitle);
        await this.btnSave.click();
    }
    async fillAndSaveFirstName(firstName) {
        await clearInputValue(this.inputFirstName);
        await this.inputFirstName.setValue(firstName);
        await this.btnSave.click();
    }
    async fillAndSaveLastName(lastName) {
        await clearInputValue(await this.inputLastName);
        await this.inputLastName.setValue(lastName);
        await this.btnSave.click();
    }
    async fillAndSaveJobTitle(jobTitle) {
        await clearInputValue(await this.inputJobTitle);
        await this.inputJobTitle.setValue(jobTitle);
        await this.btnSave.click();
    }
    async fillAndSaveLinkToImage(linkToImage) {
        await clearInputValue(await this.inputExternalLinkToProfileImage);
        await this.inputExternalLinkToProfileImage.setValue(linkToImage);
        await this.btnSave.click();
    }
    async fillAndSaveAbout(about) {
        await clearInputValue(await this.inputAbout);
        await this.inputAbout.setValue(about);
        await this.btnSave.click();
    }
    async fillFirstName(firstName) {
        await clearInputValue(this.inputFirstName);
        await this.inputFirstName.setValue(firstName);
    }
    async fillLastName(lastName) {
        await clearInputValue(await this.inputLastName);
        await this.inputLastName.setValue(lastName);
    }
    async fillJobTitle(jobTitle) {
        await clearInputValue(await this.inputJobTitle);
        await this.inputJobTitle.setValue(jobTitle);
    }
    async fillLinkToImage(linkToImage) {
        await clearInputValue(await this.inputExternalLinkToProfileImage);
        await this.inputExternalLinkToProfileImage.setValue(linkToImage);
    }
    async fillAbout(about) {
        await clearInputValue(await this.inputAbout);
        await this.inputAbout.setValue(about);
    }

     open(id) {
         return super.open(`/user/${id}/edit`);
   }
}

module.exports = new ProfileEditPage();