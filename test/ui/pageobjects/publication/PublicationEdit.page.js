const Page = require('../Page');

class PublicationEditPage extends Page {
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
    get btnCancelPublication() {
        return $('//button[contains(text(),"Cancel")]');
    }
    get errorMessage() {
        return $('//div[@class=\'MuiAlert-message css-1w0ym84\']');
    }

    open(pubId) {
        return super.open(`/publication/${pubId}/edit`);
    }
}

module.exports = new PublicationEditPage();
