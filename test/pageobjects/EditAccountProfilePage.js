const Page = require('./Page');

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

//     open() {
//         return super.open('/user/61a639262d347ec0559fe77d/edit');
//     }
}

module.exports = new EditAccountProfilePage();
