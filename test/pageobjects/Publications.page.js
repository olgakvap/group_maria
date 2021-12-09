const Page = require('./Page');

class PublicationsPage extends Page {
    get pageTitle() {
        return $('h6');
    }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();
