import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("'deprecated-jsdoc-has-removal-version' rule", () => {
  ruleTester.run('deprecated-jsdoc-has-removal-version', rule, {
    valid: [
      {
        // No @deprecated tag — no requirement
        code: `
          /** This is a regular comment */
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
      {
        // @deprecated with full semver removal target
        code: `
          /** @deprecated Use React.useState instead. Targeting removal in v7.0.0. */
          function useToggler() {}
        `,
        filename: 'valid.ts',
      },
      {
        // @deprecated with single-number removal target
        code: `
          /** @deprecated Targeting removal in v7. */
          const useGroupToggler = () => {};
        `,
        filename: 'valid.ts',
      },
      {
        // Multiline JSDoc with removal version on a separate line
        code: `
          /**
           * @deprecated Use the visible and onRequestClose props instead.
           * Targeting removal in v8.0.0.
           */
          export const useModal = () => ({});
        `,
        filename: 'valid.ts',
      },
      {
        // Deprecated property in type with removal version
        code: `
          export type IconCounterButtonBaseProps = {
            icon: string;
            /** @deprecated Use \`size\` instead. Targeting removal in v7.0.0. */
            iconSize?: number;
            size?: number;
          };
        `,
        filename: 'valid.ts',
      },
      {
        // Non-JSDoc block comment — rule should not apply
        code: `
          /* @deprecated not a JSDoc comment */
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
      {
        // Line comment — rule should not apply
        code: `
          // @deprecated not a JSDoc comment
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
    ],
    invalid: [
      {
        // @deprecated with no removal version
        code: `
          /** @deprecated Use React.useState instead. */
          function useToggler() {}
        `,
        filename: 'useToggler.ts',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // @deprecated with no removal version (const)
        code: `
          /** @deprecated Do not use this. */
          const useGroupToggler = () => {};
        `,
        filename: 'useGroupToggler.ts',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // @deprecated on export with no removal version
        code: `
          /**
           * @deprecated Use the visible and onRequestClose props instead.
           */
          export const useModal = () => ({});
        `,
        filename: 'useModal.ts',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // @deprecated on exported type with no removal version
        code: `
          /** @deprecated Use NudgeCard instead */
          export type FeatureEntryCardProps = { name: string };
        `,
        filename: 'FeatureEntryCard.tsx',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // @deprecated property in type with no removal version
        code: `
          export type IconCounterButtonBaseProps = {
            icon: string;
            /** @deprecated Use \`size\` instead. */
            iconSize?: number;
            size?: number;
          };
        `,
        filename: 'IconCounterButton.tsx',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // Partial text that does not match pattern
        code: `
          /** @deprecated Will be removed eventually in some future version. */
          const oldThing = () => {};
        `,
        filename: 'oldThing.ts',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
      {
        // Multiple @deprecated annotations — each missing removal version
        code: `
          /**
           * @deprecated Please use SelectChip alpha instead.
           */
          export type SelectChipProps = {
            active?: boolean;
            /**
             * @deprecated The prop will be removed in a future version.
             */
            children?: React.ReactNode;
          };

          /**
           * @deprecated Please use SelectChip alpha instead.
           */
          export const SelectChip = () => {};
        `,
        filename: 'SelectChip.tsx',
        errors: [
          { messageId: 'missingRemovalVersion' },
          { messageId: 'missingRemovalVersion' },
          { messageId: 'missingRemovalVersion' },
        ],
      },
      {
        // Deprecated property inside intersection type — no removal version
        code: `
          type BaseProps = { name: string };
          export type SelectChipProps = {
            /**
             * @deprecated The prop will be removed in a future version.
             */
            children?: React.ReactNode;
          } & BaseProps;
        `,
        filename: 'intersection-deprecated-prop.tsx',
        errors: [{ messageId: 'missingRemovalVersion' }],
      },
    ],
  });
});
