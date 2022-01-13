const Page = require('../Page');
const NavBar = require("../components/NavBar");

class CompaniesPage extends Page {

    navBar = new NavBar();
    open() {
        return super.open('/companies');
    }
}
module.exports = new CompaniesPage();
