const Page = require('./Page');
class ViewProfilePage extends Page {
    get userFirstLastName() {
        return $("//div[@class='MuiTypography-root MuiTypography-h4 css-1xvinid']");
    }
    get userJobTitle() {
        return $("//div[@class='MuiTypography-root MuiTypography-h6 css-1anx036']");
    }
    get btnHamburgerMenu() {
        return $("#nav-bar-toggle");
    }
    get btnProfile() {
        return $("#profile");
    }
    async profilePage () {
        //await this.open();
        await this.btnHamburgerMenu.click();
        await this.btnProfile.click();
    }
    open() {
        return super.open('/login');
    }
}

module.exports = new ViewProfilePage();
