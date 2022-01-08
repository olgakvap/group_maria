const Page = require('../Page');
const { clearInputValue, clearAndFillField } = require('../../../helpers/uiMethods.helper');

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

    async fillAndSave(firstName, lastName, jobTitle, linkToImage, about) {
        if (firstName !== undefined) {
            await clearAndFillField(await this.inputFirstName, firstName);
        } 
        if (lastName !== undefined) {
            await clearAndFillField(await this.inputLastName, lastName);
        } 
        if (jobTitle !== undefined) {
            await clearAndFillField(await this.inputJobTitle, jobTitle);
        } 
        if (linkToImage !== undefined) {
            await clearAndFillField(await this.inputExternalLinkToProfileImage, linkToImage);
        } 
        if (about !== undefined) {
            await clearAndFillField(await this.inputAbout, about);
        }
        await this.btnSave.click();
    }

    open(id) {
        return super.open(`/user/${id}/edit`);
    }
}

module.exports = new ProfileEditPage();
