import exampleScreenContainsExampleRule from './example-screen-contains-example/index.mjs';
import exampleScreenDefaultRule from './example-screen-default/index.mjs';
import figmaConnectImportsPackageMatchRule from './figma-connect-imports-package-match/index.mjs';
import figmaConnectImportsRequiredRule from './figma-connect-imports-required/index.mjs';
import figmaConnectNoSemicolonRule from './figma-connect-no-semicolon/index.mjs';
import noDeprecatedJsdocRule from './no-deprecated-jsdoc/index.mjs';
import safelySpreadPropsRule from './safely-spread-props/index.mjs';

const plugin = {
  name: '@coinbase/eslint-plugin-internal',
  rules: {
    'safely-spread-props': safelySpreadPropsRule,
    'example-screen-default': exampleScreenDefaultRule,
    'example-screen-contains-example': exampleScreenContainsExampleRule,
    'no-deprecated-jsdoc': noDeprecatedJsdocRule,
    'figma-connect-imports-required': figmaConnectImportsRequiredRule,
    'figma-connect-imports-package-match': figmaConnectImportsPackageMatchRule,
    'figma-connect-no-semicolon': figmaConnectNoSemicolonRule,
  },
  configs: {},
};

Object.assign(plugin.configs, {
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
      // 'internal/safely-spread-props': ['error', { maxInvalidPropsInMessage: 5 }],
    },
  },
  mobileStoryRules: {
    plugins: {
      internal: plugin,
    },
    rules: {
      'internal/example-screen-default': 'warn',
      'internal/example-screen-contains-example': 'warn',
    },
  },
  figmaConnectRules: {
    plugins: {
      internal: plugin,
    },
    rules: {
      'internal/figma-connect-imports-required': 'error',
      'internal/figma-connect-imports-package-match': 'error',
      'internal/figma-connect-no-semicolon': 'error',
    },
  },
});

export default plugin;
