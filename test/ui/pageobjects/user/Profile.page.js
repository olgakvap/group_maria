const Page = require('../Page');
const NavBar = require("../components/NavBar");
class ProfilePage extends Page {

    navBar = new NavBar();

    get userFirstLastName() {
        return $("//div[@class='MuiTypography-root MuiTypography-h4 css-1xvinid']");
    }
    get userJobTitle() {
        return $("//div[@class='MuiTypography-root MuiTypography-h6 css-1anx036']");
    }
    get userEmail() {
        return $("//p[contains(@class, 'css-18m8r0v')]/div/b[contains(text(), 'Email:')]/..");
    }
    get userEmailLabel() {
        return $("//b[contains(text(),'Email:')]");
    }
    get userAbout() {
        return $("//b[contains(text(),'About:')]");
    }
    get userLanguages() {
        return $("//b[contains(text(),'Languages:')]");
    }
    get userLevel() {
        return $("//b[contains(text(),'Level:')]");
    }
    get userStarIcon() {
        return $("[data-testid='StarIcon']");
    }
    get userRole() {
        return $("//span[@class='MuiChip-label MuiChip-labelMedium css-9iedg7']");
    }
    get userInitials() {
        return $("//div[@class='profile-image initials']");
    }
    //Todo ask about langauges, if there are more than one language on the profile,
    // then this selector appears according to the number //span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja']
    // of languages (1 time for 1 lang, two times for three and so on. We can use this selector to count them, probably
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

module.exports = new ProfilePage();
