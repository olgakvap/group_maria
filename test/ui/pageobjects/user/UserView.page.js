const Page = require('../Page');
const NavBar = require("../components/NavBar");

class UserViewPage extends Page {

    navBar = new NavBar();

    get labelUserFirstLastName() {
        return $('.MuiTypography-h4');
    }
    get labelUserJobTitle() {
        return $('//div[@class="MuiTypography-root MuiTypography-h6 css-1anx036"]');
    }
    get labelUserLanguages() {
        return $('//span[@class="MuiChip-label MuiChip-labelSmall css-1pjtbja"]');
    }
    get userAbout() {
        return $('//b[contains(text(),"About:")]');
    }
    get labelUserAbout() {
        return $('//p[contains(@class, "css-18m8r0v")]/div/b[contains(text(),"About:")]');
    }
    get userLevel() {
        return $('//b[contains(text(),"Level:")]');
    }
    get userLevelStarIcon() {
        return $('[data-testid="StarIcon"]');
    }
    get userImage() {
        return $('.user-image');
    }
    get labelStatus() {
        return $('.MuiChip-labelMedium');
    }
    get goToUsersPage() {
        return $('#root');
    }

    open(id) {
        return super.open(`/user/${id}`);
    }
}

module.exports = new UserViewPage();

