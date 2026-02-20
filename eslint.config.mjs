import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactPerf from 'eslint-plugin-react-perf';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintJest from 'eslint-plugin-jest';
import eslintTestingLibrary from 'eslint-plugin-testing-library';
import eslintJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintReactNativeA11y from 'eslint-plugin-react-native-a11y';
import eslintReactNative from 'eslint-plugin-react-native';
import eslintCodegen from 'eslint-plugin-codegen';
import internalPlugin from '@coinbase/eslint-plugin-internal';

const ignores = [
  '*.md',
  'dist/',
  'node_modules/',
  'OWNERS',
  'Makefile',
  'eslint.config.mjs',
  '**/babel.config.cjs',
  'next-env.d.ts',
  '__mocks__',
  '**/dist/**',
  '**/dts/**',
  '**/cjs/**',
  '**/esm/**',
  '**/lib/**',
  '**/templates/**',
  '**/.next/**',
  // These files use assert { type: 'json' } syntax that breaks eslint and must be fully ignored
  '**/getAffectedRoutes.mjs',
  '**/getBuildInfo.mjs',
  'apps/mobile-app/prebuilds',
  'apps/mobile-app/prebuilds',
  // within their NX project, these files are not included by the Typescript config
  // when linting with TS types (e.g. internal/safely-spread-props) this will raise an error
  'packages/web/optimize-css.ts',
  'packages/icons/scripts/*.ts',
  'packages/illustrations/scripts/*.ts',
  'packages/ui-mobile-playground/scripts/*.ts',
  'libs/docusaurus-plugin-docgen/module-declarations.d.ts',
];

// These rules apply to all files
const sharedRules = {
  'import/default': 'off',
  'import/extensions': 'off',
  'import/named': 'off',
  'import/namespace': 'off',
  'import/no-unresolved': 'off',
  'import/order': 'off',
  'jsx-a11y/label-has-associated-control': 'off',
  'no-loss-of-precision': 'off',
  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: '@linaria/core',
          importNames: ['cx'],
          message:
            'Do not import `cx` from Linaria. Use the `cx` function from @coinbase/cds-web instead.',
        },
      ],
      patterns: [
        {
          group: ['*/booleanStyles', '*/responsive/*'],
          message:
            'Do not import these styles directly, as it will cause non-deterministic CSS generation. Use the `getStyles` function from @coinbase/cds-web/styles/styleProps.ts or the component StyleProps API instead.',
        },
      ],
    },
  ],
  'no-restricted-syntax': [
    // Read about ESLint selectors here https://eslint.org/docs/latest/extend/selectors
    'error',
    // {
    //   selector: 'FunctionDeclaration',
    //   message: 'Prefer arrow function syntax over function declaration',
    // },
    // {
    //   selector: 'FunctionExpression',
    //   message: 'Prefer arrow function syntax over function expression',
    // },
    {
      selector: 'TSInterfaceDeclaration ',
      message: 'Do not use interfaces. Prefer type declarations instead.',
    },
    {
      selector:
        'ExportNamedDeclaration VariableDeclaration VariableDeclarator TaggedTemplateExpression Identifier[name="css"]',
      message: 'Do not export Linaria `css` function calls.',
    },
    {
      selector:
        'VariableDeclaration VariableDeclarator[id.name!=/.*Css$/] TaggedTemplateExpression Identifier[name="css"]',
      message: 'Always name Linaria CSS variables something that ends in `Css`.',
    },
  ],
  'no-unused-vars': 'off',
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Side effect imports first
        ['^\\u0000'],
        // React and react-native imports, npm imports, then coinbase imports
        ['^react$', '^react-native$', '^react', '^@?\\w', '^@cb.*'],
        // Shared code imports
        ['^:.*'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\.'],
      ],
    },
  ],
  'react-perf/jsx-no-new-array-as-prop': 'off',
  'react-perf/jsx-no-new-function-as-prop': 'off',
  'react-perf/jsx-no-new-object-as-prop': 'off',
  'react/display-name': 'off',
  'react/jsx-key': 'off',
  'react/jsx-sort-props': [
    'warn',
    {
      shorthandFirst: true,
      reservedFirst: true,
    },
  ],
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
};

// These rules only apply to TS/TSX files in packages/**, and do not apply to stories or tests
const packageProductionRules = {
  'no-restricted-exports': [
    'error',
    {
      restrictDefaultExports: {
        direct: true,
        named: true,
        defaultFrom: true,
        namedFrom: true,
        namespaceFrom: true,
      },
    },
  ],
};

// These rules only apply to TS/TSX files
const typescriptRules = {
  'codegen/codegen': 'error',
  '@typescript-eslint/consistent-type-imports': 'warn',
  '@typescript-eslint/no-empty-object-type': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'error',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/prefer-namespace-keyword': 'off',
};

// These rules only apply to test files
const testRules = {
  'jest/no-mocks-import': 'off',
  'testing-library/await-async-events': 'off',
  'testing-library/await-async-queries': 'off',
  'testing-library/no-await-sync-events': 'off',
  'testing-library/no-manual-cleanup': 'off',
  'testing-library/no-node-access': 'off',
  'testing-library/prefer-find-by': 'off',
  'testing-library/render-result-naming-convention': 'off',
};

// These plugins apply to all files
const sharedPlugins = {
  'simple-import-sort': eslintSimpleImportSort,
};

// These plugins only apply to TS/TSX files
const typescriptPlugins = {
  codegen: eslintCodegen,
};

// These plugins only apply to React Native files
const reactNativePlugins = {
  'react-native': eslintReactNative,
  'react-native-a11y': eslintReactNativeA11y,
};

// These extends apply to all files
const sharedExtends = [
  eslintJs.configs.recommended,
  eslintImport.flatConfigs.recommended,
  eslintReact.configs.flat.recommended,
  eslintReactHooks.configs['recommended-latest'],
  eslintReactPerf.configs.flat.recommended,
  eslintJsxA11y.flatConfigs.recommended,
];

// These extends only apply to TS/TSX files
const typescriptExtends = [tseslint.configs.recommended];

// These settings apply to all files
const sharedSettings = {
  react: {
    version: 'detect', // Automatically detect the React version
  },
};

/**
 * Config objects are cascading: when more than one config object matches a given filename,
 * the configuration objects are deeply merged, with later objects keys overriding previous
 * objects keys when the key is the same.
 *
 * HOWEVER, we try to be exhaustive when defining the config objects rather than relying on
 * cascading! This makes it much easier to understand and maintain the configs.
 */
export default tseslint.config(
  {
    // If an `ignores` key is used without the `files` key, its patterns
    // act as global ignores that apply to all other configuration objects.
    ignores,
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    settings: sharedSettings,
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    extends: [...sharedExtends, eslintReactRefresh.configs.vite],
    plugins: {
      ...sharedPlugins,
    },
    rules: {
      ...sharedRules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    settings: sharedSettings,
    extends: [...sharedExtends, ...typescriptExtends],
    plugins: {
      ...sharedPlugins,
      ...typescriptPlugins,
    },
    rules: {
      ...typescriptRules,
      ...sharedRules,
    },
  },
  {
    files: ['packages/**/*.{ts,tsx}'],
    ignores: [
      'packages/illustrations/src/__generated__/**',
      'packages/ui-mobile-playground/**',
      'packages/ui-mobile-visreg/**',
      'packages/**/__stories__/**',
      'packages/**/__tests__/**',
      'packages/**/__mocks__/**',
      'packages/**/__fixtures__/**',
      'packages/**/*.stories.*',
      'packages/**/*.test.*',
      'packages/**/*.spec.*',
    ],
    settings: sharedSettings,
    extends: [...sharedExtends, ...typescriptExtends],
    plugins: {
      ...sharedPlugins,
      ...typescriptPlugins,
    },
    rules: {
      ...sharedRules,
      ...typescriptRules,
      ...packageProductionRules,
    },
  },
  {
    files: ['**/*mobile*/**/*.{ts,tsx}'],
    settings: sharedSettings,
    extends: [...sharedExtends, ...typescriptExtends],
    plugins: {
      ...sharedPlugins,
      ...typescriptPlugins,
      ...reactNativePlugins,
    },
    rules: {
      ...sharedRules,
      ...typescriptRules,
    },
  },
  // Rules specific to mobile story files
  {
    files: ['packages/mobile/**/*.stories.tsx'],
    extends: [internalPlugin.configs.mobileStoryRules],
  },
  // Rules specific to Figma Code Connect files
  {
    files: ['**/*.figma.tsx'],
    extends: [internalPlugin.configs.figmaConnectRules],
  },
  {
    files: ['**/*.mdx'],
    processor: internalPlugin.processors.mdx,
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**', '**/setup.js'],
    settings: sharedSettings,
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    extends: [
      ...sharedExtends,
      ...typescriptExtends,
      eslintJest.configs['flat/recommended'],
      eslintTestingLibrary.configs['flat/react'],
    ],
    plugins: {
      ...sharedPlugins,
      ...typescriptPlugins,
      ...reactNativePlugins,
    },
    rules: {
      ...sharedRules,
      ...typescriptRules,
      ...testRules,
    },
  },
);
