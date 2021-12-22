const Page = require('./Page');
const NavBar = require("../pageobjects/components/NavBar");
class ViewProfilePage extends Page {

    navBar = new NavBar();

    get userFirstLastName() {
        return $("//div[@class='MuiTypography-root MuiTypography-h4 css-1xvinid']");
    }
    get userJobTitle() {
        return $("//div[@class='MuiTypography-root MuiTypography-h6 css-1anx036']");
    }
    get userEmail() {
        return $("//div[@xpath='1']");
    }

    get goToProfilePage() {
        return $("//ul[@class='MuiList-root MuiList-padding css-1ontqvh']");
    }

    open(id) {
        return super.open(`/user/${id}`);
    }
}

module.exports = new ViewProfilePage();
