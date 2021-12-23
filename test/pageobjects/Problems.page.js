const Page = require('./Page');

class ProblemsPage extends Page {

  get btnAddProblem() {
    return $("//button[text() = 'New Problem']");
  }

  get nextPageLable() {
    return $("//button[@aria-label='Go to next page']");
  }

  get previousPageLable() {
    return $("//button[@aria-label='Go to previous page']");
  }

  open() {
    return super.open('/problems');
  }

  get problemRows() {
    return $(".MuiDataGrid-row");
  }

  problemsRowContainText (text) {
    return $(`//*[@class="MuiDataGrid-row"]//*[contains(text(), "${text}")]`)
  }

  problemRowsContainTextInColumn (text, column) {
    return $$(`//*[contains(text(), "${text}") and @data-field='${column}']`)
    // return browser.findElements('xpath', `//*[contains(text(), "${text}") and @data-field='${column}']`)
  }

  get filtersButton () {
    return $("//button[text()=\"Filters\"]")
  }

  get filterColumnsDropdown () {
    return $("//label[text()=\"Columns\"]/..//select")
  }

  get filterOperatorsDropdown () {
    return $("//label[text()=\"Operators\"]/..//select")
  }

  get filterValueDropdown () {
    return $("//label[text()=\"Value\"]/..//input")
  }

  get filterLoadIcon () {
    return $("//*[@data-testid=\"LoadIcon\"]")
  }

  get firstRecord() {
    return $("//div[@data-rowindex=\"0\"]");
  }


}

module.exports = new ProblemsPage();
