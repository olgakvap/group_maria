const Page = require('../Page');
const NavBar = require('../components/NavBar');

class PublicationsPage extends Page {

    navBar = new NavBar();

    get btnAddPublication() { return $("//button[contains(text(),'Add Publication')]"); }
    get publicationsList() { return $$("//div[contains(@class,'mb-4')]"); }
    get linkLoadMore() { return $("//div[contains(@class,'css-aoeo82')]/following-sibling::div[@class = 'btn-link']"); }
    get btnLikePublication() { return $("#like-btn")};

    get btnComment() { return $("#comment-btn")};
    get commentInput() { return $("#comment-input")};
    get btnSendComment() { return $("//span[contains(@class, 'css-1n4a93h')]")};
    get commentContent() { return $("//div[@class = 'bg-light p-2']/div/span")};
    get btnReplyToComment() { return $("//button[contains(@class, 'css-1rtnrqa') and contains(text(),'Reply')]")};

    get btnLikeComment() { return $("//button[contains(@class, 'css-1rtnrqa') and contains(text(),'Like')]")};
    get countLikes() { return $("//button[@id = 'like-btn']/span[@class = 'ml-1']")};

    get btnLoadMoreComments() { return $("//ul[contains(@class, 'css-18xpdcy')]/following-sibling::div")};

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

    async getLikeCount() {
        const spanCountLike = await this.countLikes;
        const countLikeStr = await spanCountLike.getText();
        const countLike = +countLikeStr;
        return countLike;
    }

    open() {
        return super.open('/publications');
    }

}

module.exports = new PublicationsPage();



