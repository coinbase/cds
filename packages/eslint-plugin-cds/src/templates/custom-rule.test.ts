/**
 * Template for testing an ESLint rule.
 *
 * To use this template:
 * 1. Copy this file and rename it to match your rule (e.g. `no-foo-bar.test.ts`).
 * 2. Update the import to point to your rule.
 * 3. Add valid and invalid test cases.
 *
 * Valid cases: code that should NOT trigger the rule.
 * Invalid cases: code that SHOULD trigger the rule, with expected error messageIds.
 */
import { RuleTester } from '@typescript-eslint/rule-tester';

import { customRule } from './custom-rule';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('custom-rule', customRule, {
  valid: [
    {
      code: 'const baz = 1;',
    },
  ],
  invalid: [
    {
      code: 'const foo = 1;',
      errors: [{ messageId: 'messageOne' }],
    },
    {
      code: 'const bar = 1;',
      errors: [{ messageId: 'messageTwo' }],
    },
  ],
});
