const Page = require('./Page');

class ProblemsPage extends Page {

    get btnAddProblem() {
        return $("//button[text() = 'New Problem']");
    }
    open() {
        return super.open('/problems');
    }

    get quantityOfProblems() {
        return $("//button[@id='nav-bar-toggle']//*[name()='svg']");
    }
    get firstRecord() {
        return $("//div[@data-rowindex='0']");
    }

}

module.exports = new ProblemsPage();
