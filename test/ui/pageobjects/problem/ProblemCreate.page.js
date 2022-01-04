const Page = require('../Page');

class ProblemCreatePage extends Page {
    get inputTitle() { return $('#title'); }
    get inputCompany() { return $('#company'); }
    get inputPosition() { return $('#position'); }
    get inputContent(){ return $("//textarea[@class='w-md-editor-text-input ']"); }
    get btnSave() { return $('[type="submit"]'); }
    get errorMessage() { return $('.MuiAlert-message'); }
    get btnCancel() { return $("//button[text()='Cancel']"); }
    get btnBoldFilter() { return $("[data-name='bold']"); }
    get btnItalicFilter() { return $("[title='Add italic text']"); }
    get btnStrikethroughFilter() { return $("[title='Add strikethrough text']"); }

    async fillAndSave (title, company, position, content) {
        await this.fillForm(title, company, position, content);
        await this.btnSave.click();
    }

    async fillAndCancel (title, company, position, content) {
        await this.fillForm(title, company, position, content);
        await this.btnCancel.click();
    }

    async fillWithFiltersAndSave (title, company, position, content) {
        await this.fillForm(title, company, position, content);
        await this.btnBoldFilter.click();
        await this.btnItalicFilter.click();
        await this.btnStrikethroughFilter.click();
        await this.btnSave.click();
    }

    async selectCompany(company) {
        await this.inputCompany.click();
        const option = await $(`//li[contains(.,"${company}")]`);
        await option.click();
    }

    async fillForm(title, company, position, content) {
        await this.inputTitle.setValue(title);
        await this.selectCompany(company);
        await this.inputPosition.setValue(position);
        await this.inputContent.setValue(content);
    }

}
module.exports = new ProblemCreatePage();
