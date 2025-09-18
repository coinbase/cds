import safelySpreadPropsRule from './safely-spread-props/index.mjs';
import importAutofixRule from './import-autofix.mjs';

const plugin = {
  name: '@cbhq/eslint-plugin-internal',
  rules: {
    'import-autofix': importAutofixRule,
    'safely-spread-props': safelySpreadPropsRule,
  },
  configs: {},
};

Object.assign(plugin.configs, {
  allRules: {
    plugins: {
      internal: plugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'internal/import-autofix': 'error',
      // 'internal/safely-spread-props': ['error', { maxInvalidPropsInMessage: 5 }],
    },
  },
  importRules: {
    plugins: {
      internal: plugin,
    },
    rules: {
      'internal/import-autofix': 'error',
      // 'internal/safely-spread-props': 'off',
    },
  },
  typedRules: {
    plugins: {
      internal: plugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'internal/import-autofix': 'off',
      // 'internal/safely-spread-props': ['error', { maxInvalidPropsInMessage: 5 }],
    },
  },
});

export default plugin;
