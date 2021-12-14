const Page = require('./Page');

class CreatePublicationPage extends Page {
    get inputTitle() {
        return $('#title');
    }
    get inputDescription() {
        return $('#description');
    }
    get textareaContent() {
        return $('.w-md-editor-text-input');
    }
    get btnSavePublication() {
        return $('[type="submit"]');
    }
    open() {
        return super.open('/publications/create');
    }
}

module.exports = new CreatePublicationPage();
