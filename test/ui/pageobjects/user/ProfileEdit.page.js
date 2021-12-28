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

     open(id) {
         return super.open(`/user/${id}/edit`);
   }
}

module.exports = new ProfileEditPage();
