const Page = require('./Page');

class PublicationsPage extends Page {
    get pageTitle() {
        return $('h6');
    }
    get btnAddPublication() {
        return $("//button[contains(text(),'Add Publication')]");
    }
    get publicationsList() {
        return $$("//div[contains(@class,'mb-4')]");
    }
    findPublication(title) {
        return this.publicationsList.find(async (publication) =>
            await publication.$("div>a[href*='/publication/']").getText() === title);
    }
    async getPublicationTitle(publication) {
        let title = typeof publication === 'string' ?
            await this.findPublication(publication).$("div>a[href*='/publication/']").getText() :
            await publication.$("div>a[href*='/publication/']").getText();
        return title;
    }

    get linkLoadMore() {
        return $("//div[@class= 'btn-link']");
    }
    get btnHumburgerMenu() {
        return $("//button[@id='nav-bar-toggle']");
    }
    get btnProblems() {
        return $('#problems');
    }
    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();



