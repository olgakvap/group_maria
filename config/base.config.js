require('dotenv').config();
const hooks = require('./hooks.conf');

exports.config = {
  specs: [
    './test/**/specs/**/*.js'
  ],
  exclude: [
  ],

  bail: 0,
  baseUrl: process.env.BASE_URL,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec', ['allure', {outputDir: 'allure-results'}]],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  ...hooks,
}
