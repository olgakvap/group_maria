const merge = require('deepmerge');
const baseConfig = require('./base.config');

exports.config = merge(baseConfig.config, {
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'safari',
    }],

  services: ['safaridriver'],
  safariDriverArgs: ['-p 4444'],

  logLevel: 'info',
}, { clone: false });
