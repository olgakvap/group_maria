const Page = require('../Page');

class ProblemCreatePage extends Page {
    get inputTitle() { return $('#title'); }
    get inputCompany() { return $('#company'); }
    get inputPosition() { return $('#position'); }
    get appleCompanyOption() { return $("//li[@id='company-option-0']"); }
    get inputContent(){ return $("//textarea[@class='w-md-editor-text-input ']"); }
    get btnSave() { return $('[type="submit"]'); }
    get errorMessage() { return $('.MuiAlert-message'); }
    get btnCancel() { return $("//button[text()='Cancel']"); }

    async fillAndSave (title, position, content) {
        await this.inputTitle.setValue(title);
        await this.inputCompany.click();
        await this.appleCompanyOption.click();
        await this.inputPosition.setValue(position);
        await this.inputContent.setValue(content);
        await this.btnSave.click();
    }

    async fillAndCancel (title, position, content) {
        await this.inputTitle.setValue(title);
        await this.inputCompany.click();
        await this.appleCompanyOption.click();
        await this.inputPosition.setValue(position);
        await this.inputContent.setValue(content);
        await this.btnCancel.click();
    }

}
module.exports = new ProblemCreatePage();
