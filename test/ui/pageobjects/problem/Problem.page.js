const Page = require('../Page');

class ProblemPage extends Page {

    get btnLastSolution() {
        return $("(//div[@class='mr-2'])[last()]");
    }

    get btnAddNewSolution() {
        return $("//button [contains(text(), 'Add New Solution')]");
    }

    get btnEditSolution() {
        return $("//button [contains(text(), 'Edit')]");
    }

    get textBoxNewSolution() {
        return $("(//div[@role='textbox']/div[@class='cm-activeLine cm-line'])[last()]");
    }

    get textBoxSolution() {
        return $("//div[@class='cm-theme-light mt-3 mb-3']/div");
    }

    get textBoxLastCreatedSolution() {
        return $("//div[@class='cm-activeLine cm-line']/span");
    }

    get headerTitleProblem() {
        return $("h3.text-break");
    }

    async getContentValue(text) {
        let elem = await $(`//*[contains(text(), "${text}")]`)
        return elem;
    }
}
module.exports = new ProblemPage();