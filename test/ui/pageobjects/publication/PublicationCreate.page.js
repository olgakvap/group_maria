const Page = require('../Page');
const {clearInputValue} = require ('../../../helpers/uiMethods.helper');

class PublicationCreatePage extends Page {
    get inputTitle() {
        return $('#title');
    }
    get inputDescription() {
        return $('#description');
    }
    get textareaContent() {
        return $('.w-md-editor-text-input');
    }
     get inputImageLink() {
      return $('//input[@id="image"]');
    }

    get btnSavePublication() {
        return $('//button[@type="submit"]');
    }
    get btnCancelPublication() {
        return $('//button[contains(@class,"mr-3 css-79xub")]');
    }
    get errorMessage() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]');
    }

    async fillAndSave(title = '', description = '', content = '', image = null) {
        await clearInputValue(this.inputTitle);
        await this.inputTitle.setValue(title);
        await clearInputValue(this.inputImageLink);
        await this.inputImageLink.setValue(image);
        await clearInputValue(this.inputDescription);
        await this.inputDescription.setValue(description);
        await clearInputValue(this.textareaContent);
        await this.textareaContent.setValue(content);
        await this.btnSavePublication.click();

    }

    async fillAndCancel(title = '', description = '', content = '', image = null) {
        await this.inputTitle.setValue(title);
        await this.inputImageLink.setValue(image);
        await this.inputDescription.setValue(description);
        await this.textareaContent.setValue(content);
        await this.btnCancelPublication.click();
        await browser.refresh();
    }

    open() {
        return super.open('/publications/create');
    }
}

module.exports = new PublicationCreatePage();
