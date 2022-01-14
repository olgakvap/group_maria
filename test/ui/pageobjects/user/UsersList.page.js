const Page = require('../Page');
const NavBar = require("../components/NavBar");

class UsersListPage extends Page {

    navBar = new NavBar();

    get usersListLink() {
        return $$('//div[@class="text-truncate"]/b');
    }

    findUserNameLinkByID(userID){
        return $(`//a[@class="linked-text" and @href="/user/${userID}"]/div/b`);
    }

    open() {
        return super.open('/users');
    }
}
 module.exports = new UsersListPage();



