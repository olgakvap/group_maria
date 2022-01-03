module.exports = {
  before: async function (capabilities, specs) {
    await browser.maximizeWindow();
  },

  afterTest: async function (test, context, result) {
    if (test.failed || result.error) {
      await browser.takeScreenshot();
    }
  }
}
