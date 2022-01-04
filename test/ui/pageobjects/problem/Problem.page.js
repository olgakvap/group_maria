const Page = require('../Page');

class ProblemPage extends Page {

    async getContentValue(text) {
        let elem = await $(`//*[contains(text(), "${text}")]`)
        return elem;
    }

}
module.exports = new ProblemPage();