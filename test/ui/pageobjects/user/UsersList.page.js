const Page = require('../Page');
const NavBar = require("../components/NavBar");

class UsersListPage extends Page {

    navBar = new NavBar();

    get userNameLink() { return $(`(//a[@class="linked-text"])[1]/div`); }
    get userFullNameText() {
        return $(`(//div[@class="text-truncate"])[1]/b`);
    }
    findUserNameLinkByID(userID){
        return $(`//a[@class="linked-text" and @href="/user/${userID}"]`);
    }

    open() {
        return super.open('/users');
    }
}
 module.exports = new UsersListPage();



