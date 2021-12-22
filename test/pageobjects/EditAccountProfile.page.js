const Page = require('./Page');
const { clearInput } = require('../../helpers/uiMethods');

class EditAccountProfilePage extends Page {
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
    get btnCancel() {
        return $("//button[@xpath='1']");
    }
    get btnSave() {
        return $("[type='submit']");
    }
    async fillAndSave(firstName, lastName, jobTitle) {
        await clearInput(await this.inputFirstName);
        await this.inputFirstName.setValue(firstName);
        await clearInput(await this.inputLastName);
        await this.inputLastName.setValue(lastName);
        await clearInput(await this.inputJobTitle);
        await this.inputJobTitle.setValue(jobTitle);
        await this.btnSave.click();
    }

     open(id) {
         return super.open(`/user/${id}/edit`);
   }
}

module.exports = new EditAccountProfilePage();
