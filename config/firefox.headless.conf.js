const merge = require('deepmerge');
const baseConfig = require('./base.config');

exports.config = merge(baseConfig.config, {
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      },
    }],

  services: ['geckodriver'],

  logLevel: 'info',
}, { clone: false });
