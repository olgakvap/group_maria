const Page = require('../Page');
const NavBar = require("../components/NavBar");
class UserProfileViewPage extends Page {

    navBar = new NavBar();

    get labelUserFirstLastName() {
        return $('.MuiTypography-h4');
    }
    get labelUserJobTitle() {
        return $('//div[@class="MuiTypography-root MuiTypography-h6 css-1anx036"]');
    }
    get userEmail() {
        return $("//p[contains(@class, 'css-18m8r0v')]/div/b[contains(text(), 'Email:')]/..");
    }
    get userEmailLabel() {
        return $("//b[contains(text(),'Email:')]");
    }
    get labelUserLanguages() {
        return $('//span[@class="MuiChip-label MuiChip-labelSmall css-1pjtbja"]');
    }
    get userLanguages() {
        return $("//b[contains(text(),'Languages:')]");
    }
    get listProgrammingLang() {
        return $$('p .MuiChip-root span');
    }
    get userAbout() {
        return $('//b[contains(text(),"About:")]');
    }
    get labelUserAbout() {
        return $('//p[contains(@class, "css-18m8r0v")]/div/b[contains(text(), "About:")]/..');
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
    get userRole() {
        return $("//span[@class='MuiChip-label MuiChip-labelMedium css-9iedg7']");
    }
    get userInitials() {
        return $("//div[@class='user-image initials']");
    }
    get btnEdit() {
        return $("//button[contains(text(),'Edit')]");
    }
    get btnBackLink() {
        return $("//div[@class='btn btn-link']");
    }

    open(id) {
        return super.open(`/user/${id}`);
    }
}

module.exports = new UserProfileViewPage();

