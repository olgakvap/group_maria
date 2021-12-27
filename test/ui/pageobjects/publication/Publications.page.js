const Page = require('../Page');
const NavBar = require('../components/NavBar');

class PublicationsPage extends Page {

    navBar = new NavBar();

    get btnAddPublication() { return $("//button[contains(text(),'Add Publication')]"); }
    get publicationsList() { return $$("//div[contains(@class,'mb-4')]"); }
    get linkLoadMore() { return $("//div[@class= 'btn-link']"); }

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

    open() {
        return super.open('/publications');
    }

}

module.exports = new PublicationsPage();



