import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
});

describe("'no-object-rest-spread-in-worklet' rule", () => {
  ruleTester.run('no-object-rest-spread-in-worklet', rule, {
    valid: [
      {
        code: `
          const fn = () => {
            const { a, ...rest } = obj;
            return { ...rest, a };
          };
        `,
        filename: 'valid-non-worklet.ts',
      },
      {
        code: `
          function fn() {
            'worklet';
            const { a, b } = obj;
            return a + b;
          }
        `,
        filename: 'valid-worklet-no-rest.ts',
      },
    ],
    invalid: [
      {
        code: `
          function fn() {
            'worklet';
            const { delay, ...config } = transition;
            return config;
          }
        `,
        filename: 'invalid-worklet-object-rest.ts',
        errors: [{ messageId: 'noObjectRestSpreadInWorklet' }],
      },
      {
        code: `
          const fn = () => {
            'worklet';
            return { ...baseConfig, duration: 200 };
          };
        `,
        filename: 'invalid-worklet-object-spread.ts',
        errors: [{ messageId: 'noObjectRestSpreadInWorklet' }],
      },
    ],
  });
});
