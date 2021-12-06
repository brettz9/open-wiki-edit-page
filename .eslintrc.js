'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-overrides'],
  overrides: [
    {
      files: 'web-ext-config.js',
      extends: 'ash-nazg/sauron-node-script-overrides'
    }
  ],
  settings: {
    polyfills: [
      'Array.from',
      'Array.keys',
      'Promise'
    ]
  },
  env: {
    node: false,
    browser: true
  },
  rules: {
    // Disable for now
    'max-len': 0,
    'prefer-named-capture-group': 0
  }
};
