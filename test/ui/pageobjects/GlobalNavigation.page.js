const Page = require('./Page');

class GlobalNavigationPage extends Page {

    get logoutBtn() {
        return $("//span[.='Logout']");
    }

    get problemsBtn() {
        return $("//span[.='Problems']");
    }

    open() {
        return super.open('/publications');
    }
}

module.exports = new GlobalNavigationPage();
