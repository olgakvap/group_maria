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
        return $("//button[@class='MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root mt-5 mr-3 css-79xub']");
    }
    get btnSave() {
        return $("//span[@class='MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel']");
    }

//     open() {
//         return super.open('/user/61a639262d347ec0559fe77d/edit');
//     }
}

module.exports = new EditAccountProfileJuliaEPage();
