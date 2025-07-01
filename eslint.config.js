import ashNazg from 'eslint-config-ash-nazg';
import globals from 'globals';

export default [
  {
    ignores: [
      'polyfills/browser-polyfill.min.js',
      'options/jml.js'
    ]
  },
  ...ashNazg(['sauron', 'browser']),
  ...ashNazg(['sauron', 'node', 'script']).map((cfg) => {
    return {
      files: ['web-ext-config.js'],
      ...cfg
    };
  }),
  {
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.webextensions
      }
    },
    settings: {
      polyfills: [
        'Array.from',
        'Array.keys',
        'Promise'
      ]
    },
    rules: {
      // Disable for now
      '@stylistic/max-len': 0,
      'prefer-named-capture-group': 0
    }
  }
];
