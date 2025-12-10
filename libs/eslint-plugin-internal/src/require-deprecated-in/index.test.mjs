import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

// Set up test framework functions
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 1000,
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: __dirname,
    },
  },
});

describe("'require-deprecated-in' rule", () => {
  // Group 1: Valid cases - @deprecated with proper @deprecatedIn
  ruleTester.run('require-deprecated-in - valid cases', rule, {
    valid: [
      {
        name: 'function with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn v9
           */
          function oldFunction() {}
        `,
        filename: 'valid-function.ts',
      },
      {
        name: 'variable with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use newValue instead
           * @deprecatedIn v10
           */
          const oldValue = 42;
        `,
        filename: 'valid-variable.ts',
      },
      {
        name: 'interface with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewInterface instead
           * @deprecatedIn v8
           */
          interface OldInterface {
            value: string;
          }
        `,
        filename: 'valid-interface.ts',
      },
      {
        name: 'type alias with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewType instead
           * @deprecatedIn v7
           */
          type OldType = string;
        `,
        filename: 'valid-type.ts',
      },
      {
        name: 'interface property with @deprecated and valid @deprecatedIn',
        code: `
          interface MyInterface {
            /**
             * @deprecated Use newProp instead
             * @deprecatedIn v9
             */
            oldProp?: string;
            newProp: string;
          }
        `,
        filename: 'valid-property.ts',
      },
      {
        name: 'no @deprecated tag (should not trigger rule)',
        code: `
          /**
           * This function does something useful
           */
          function regularFunction() {}
        `,
        filename: 'no-deprecated.ts',
      },
      {
        name: 'export with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use newExport instead
           * @deprecatedIn v11
           */
          export const oldExport = 'value';
        `,
        filename: 'valid-export.ts',
      },
      {
        name: '@deprecatedIn on same line as @deprecated',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn v9
           */
          function oldFunction() {}
        `,
        filename: 'valid-same-block.ts',
      },
      {
        name: 'version with high number',
        code: `
          /**
           * @deprecated Removed in major version
           * @deprecatedIn v123
           */
          function veryOldFunction() {}
        `,
        filename: 'valid-high-version.ts',
      },
      {
        name: 'class with @deprecated and valid @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewClass instead
           * @deprecatedIn v9
           */
          class OldClass {}
        `,
        filename: 'valid-class.ts',
      },
    ],
    invalid: [],
  });

  // Group 2: Missing @deprecatedIn tag
  ruleTester.run('require-deprecated-in - missing @deprecatedIn', rule, {
    valid: [],
    invalid: [
      {
        name: 'function with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use newFunction instead
           */
          function oldFunction() {}
        `,
        filename: 'missing-deprecated-in-function.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'variable with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use newValue instead
           */
          const oldValue = 42;
        `,
        filename: 'missing-deprecated-in-variable.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'interface with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewInterface instead
           */
          interface OldInterface {
            value: string;
          }
        `,
        filename: 'missing-deprecated-in-interface.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'type alias with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewType instead
           */
          type OldType = string;
        `,
        filename: 'missing-deprecated-in-type.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'interface property with @deprecated but no @deprecatedIn',
        code: `
          interface MyInterface {
            /**
             * @deprecated Use newProp instead
             */
            oldProp?: string;
            newProp: string;
          }
        `,
        filename: 'missing-deprecated-in-property.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'export with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use newExport instead
           */
          export const oldExport = 'value';
        `,
        filename: 'missing-deprecated-in-export.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
      {
        name: 'class with @deprecated but no @deprecatedIn',
        code: `
          /**
           * @deprecated Use NewClass instead
           */
          class OldClass {}
        `,
        filename: 'missing-deprecated-in-class.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
    ],
  });

  // Group 3: Invalid @deprecatedIn format
  ruleTester.run('require-deprecated-in - invalid version format', rule, {
    valid: [],
    invalid: [
      {
        name: 'missing version number after @deprecatedIn',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn
           */
          function oldFunction() {}
        `,
        filename: 'invalid-empty-version.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'version without v prefix',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn 9
           */
          function oldFunction() {}
        `,
        filename: 'invalid-no-v-prefix.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'version with minor.patch format',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn v9.1.0
           */
          function oldFunction() {}
        `,
        filename: 'invalid-minor-patch.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'version with minor format',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn v9.1
           */
          function oldFunction() {}
        `,
        filename: 'invalid-minor.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'version with text instead of number',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn vnine
           */
          function oldFunction() {}
        `,
        filename: 'invalid-text-version.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'lowercase version prefix',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn V9
           */
          function oldFunction() {}
        `,
        filename: 'invalid-uppercase-v.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
      {
        name: 'version with extra characters',
        code: `
          /**
           * @deprecated Use newFunction instead
           * @deprecatedIn v9-beta
           */
          function oldFunction() {}
        `,
        filename: 'invalid-extra-chars.ts',
        errors: [{ messageId: 'invalidVersionFormat' }],
      },
    ],
  });

  // Group 4: Nested type properties
  ruleTester.run('require-deprecated-in - nested type properties', rule, {
    valid: [
      {
        name: 'inline type property with valid @deprecatedIn',
        code: `
          type MyType = {
            /**
             * @deprecated Use newProp instead
             * @deprecatedIn v9
             */
            oldProp?: string;
            newProp: string;
          };
        `,
        filename: 'valid-inline-type-property.ts',
      },
    ],
    invalid: [
      {
        name: 'inline type property with @deprecated but no @deprecatedIn',
        code: `
          type MyType = {
            /**
             * @deprecated Use newProp instead
             */
            oldProp?: string;
            newProp: string;
          };
        `,
        filename: 'invalid-inline-type-property.ts',
        errors: [{ messageId: 'missingDeprecatedIn' }],
      },
    ],
  });
});
