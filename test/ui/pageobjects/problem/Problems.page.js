const Page = require('../Page');

class ProblemsPage extends Page {

  get addProblemButton() { return $("//button[text() = 'New Problem']"); }
  get nextPageLabel() { return $("//button[@aria-label='Go to next page']"); }
  get previousPageLabel() { return $("//button[@aria-label='Go to previous page']"); }
  get problemRows() { return $(".MuiDataGrid-row"); }
  get filtersButton () { return $("//button[text()=\"Filters\"]"); }
  get filterColumnsDropdown () { return $("//label[text()=\"Columns\"]/..//select"); }
  get filterOperatorsDropdown () { return $("//label[text()=\"Operators\"]/..//select"); }
  get filterValueDropdown () { return $("//label[text()=\"Value\"]/..//input"); }
  get filterLoadIcon () { return $("//*[@data-testid=\"LoadIcon\"]"); }
  get firstRecord() { return $("//div[@data-rowindex=\"0\"]"); }

  get problemName() { return $("//div[@data-field='Problem name'and @role='columnheader']"); }
  get position() { return $("//div[@data-field='Position'and @role='columnheader']"); }
  get company() { return $("//div[@data-field='Company' and @role= 'columnheader' ]"); }
  get solutions() { return $("//div[@data-field='Solutions' and @role= 'columnheader' ]"); }
  get creator() { return $("//div[@data-field='Creator' and @role= 'columnheader' ]"); }

  problemsRowContainText (text) { return $(`//*[@class="MuiDataGrid-row"]//*[contains(text(), "${text}")]`); }

  problemRowsContainTextInColumn (text, column) {
    return $$(`//*[contains(text(), "${text}") and @data-field='${column}']`);
    // return browser.findElements('xpath', `//*[contains(text(), "${text}") and @data-field='${column}']`)
  }

  open() {
    return super.open('/problems');
  }

}

module.exports = new ProblemsPage();
