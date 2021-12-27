require('dotenv').config();

exports.config = {
    specs: [
        './test/ui/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ['--window-size=1280,720', '--headless', '--disable-gpu']
        },
    }],

    services: ['chromedriver'],

    logLevel: 'silent',
    bail: 0,
    baseUrl: process.env.BASE_URL,

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',['allure', {outputDir: 'allure-results'}]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
}
