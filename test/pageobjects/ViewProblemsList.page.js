const Page = require('./Page');
//const ViewProblemsList = require('../pageobjects/ViewProblemsList.page');

class ViewProblemsListPage extends Page {
    get problemName() {
        return $("//div[@data-field='Problem name'and @role='columnheader']");
    }

    get position() {
        return $("//div[@data-field='Position'and @role='columnheader']");
    }

    get company() {
        return $("//div[@data-field='Company' and @role= 'columnheader' ]")
    }

    get solutions() {
        return $("//div[@data-field='Solutions' and @role= 'columnheader' ]")
    }

    get creator() {
        return $("//div[@data-field='Creator' and @role= 'columnheader' ]")
    }

    get btnGoToNextPage() {
        return $("//button[@title='Go to next page']")
    }

    // get btnHamburgerMenu() {
    //     return $("#nav-bar-toggle");
    // }

    async problemsPage() {
        //await this.open();
        await this.btnHamburgerMenu.click();

    }
    open() {
        return super.open('/problems');
    }
}
module.exports = new ViewProblemsListPage();
