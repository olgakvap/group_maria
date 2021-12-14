const Page = require('./Page');

class PublicationsPage extends Page {
    get pageTitle() {
        return $('h6');
    }
    get btnAddPublication() {
        return $("//button[contains(text(),'Add Publication')]");
    }
    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();
