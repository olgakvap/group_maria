const merge = require('deepmerge');
const baseConfig = require('./base.config');

exports.config = merge(baseConfig.config, {
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: ['--window-size=1280,720', '--headless', '--disable-gpu']
            },
        }],

    services: ['chromedriver'],

    logLevel: 'silent',
}, { clone: false });
