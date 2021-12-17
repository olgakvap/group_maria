const Page = require('./Page');

class CreateProblemPage extends Page {
    get inputTitle() {
        return $('#title');
    }
    get inputCompany() {
        return $('#company');
    }
    get inputPosition() {
        return $('#position');
    }
    get appleCompanyOption() {
        return $("//li[@id='company-option-0']");
    }
    get inputContent(){
        return $("//textarea[@class='w-md-editor-text-input ']");
    }

    get btnSave() {
        return $('[type="submit"]');
    }

}
module.exports = new CreateProblemPage();