module.exports = {
  "extends": ["ash-nazg"],
  "parserOptions": {
    "sourceType": "module"
  },
  settings: {
    polyfills: [
      'Promise'
    ]
  },
  "env": {
    "node": false,
    "browser": true
  },
  "rules": {
  }
};
