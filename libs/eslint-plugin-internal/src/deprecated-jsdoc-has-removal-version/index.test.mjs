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
        // Single-line @deprecated with both required elements
        code: `
          /**
           * @deprecated Use React.useState instead. This will be removed in a future major release.
           * @deprecationExpectedRemoval v7
           */
          function useToggler() {}
        `,
        filename: 'valid.ts',
      },
      {
        // Full semver in removal tag
        code: `
          /**
           * @deprecated Use React.useState instead. This will be removed in a future major release.
           * @deprecationExpectedRemoval v7.0.0
           */
          const useGroupToggler = () => {};
        `,
        filename: 'valid.ts',
      },
      {
        // Multi-line JSDoc with additional content after @deprecated
        code: `
          /**
           * @deprecated Use the visible and onRequestClose props instead. This will be removed in a future major release.
           * @deprecationExpectedRemoval v8.0.0
           * @see SomeOtherComponent
           */
          export const useModal = () => ({});
        `,
        filename: 'valid.ts',
      },
      {
        // Deprecated property in type
        code: `
          export type IconCounterButtonBaseProps = {
            icon: string;
            /**
             * @deprecated Use \`size\` instead. This will be removed in a future major release.
             * @deprecationExpectedRemoval v7.0.0
             */
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
        // @deprecated with no prose and no removal tag
        code: `
          /** @deprecated Use React.useState instead. */
          function useToggler() {}
        `,
        filename: 'useToggler.ts',
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
      {
        // @deprecated with correct prose but missing removal tag
        code: `
          /**
           * @deprecated Use React.useState instead. This will be removed in a future major release.
           */
          function useToggler() {}
        `,
        filename: 'useToggler.ts',
        errors: [{ messageId: 'missingRemovalTag' }],
      },
      {
        // @deprecated with removal tag but missing standard prose
        code: `
          /**
           * @deprecated Use React.useState instead.
           * @deprecationExpectedRemoval v7
           */
          function useToggler() {}
        `,
        filename: 'useToggler.ts',
        errors: [{ messageId: 'missingRemovalProse' }],
      },
      {
        // Old "Targeting removal in vX" sentence — no longer valid
        code: `
          /** @deprecated Targeting removal in v7. */
          const useGroupToggler = () => {};
        `,
        filename: 'useGroupToggler.ts',
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
      {
        // @deprecated on export — missing both
        code: `
          /**
           * @deprecated Use the visible and onRequestClose props instead.
           */
          export const useModal = () => ({});
        `,
        filename: 'useModal.ts',
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
      {
        // @deprecated on exported type — missing both
        code: `
          /** @deprecated Use NudgeCard instead */
          export type FeatureEntryCardProps = { name: string };
        `,
        filename: 'FeatureEntryCard.tsx',
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
      {
        // @deprecated property in type — missing both
        code: `
          export type IconCounterButtonBaseProps = {
            icon: string;
            /** @deprecated Use \`size\` instead. */
            iconSize?: number;
            size?: number;
          };
        `,
        filename: 'IconCounterButton.tsx',
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
      {
        // removal tag present but version format is invalid (missing v prefix)
        code: `
          /**
           * @deprecated Use X instead. This will be removed in a future major release.
           * @deprecationExpectedRemoval 7
           */
          const oldThing = () => {};
        `,
        filename: 'oldThing.ts',
        errors: [{ messageId: 'missingRemovalTag' }],
      },
      {
        // Multiple @deprecated annotations — each missing both elements
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
          { messageId: 'missingRemovalProse' },
          { messageId: 'missingRemovalTag' },
          { messageId: 'missingRemovalProse' },
          { messageId: 'missingRemovalTag' },
          { messageId: 'missingRemovalProse' },
          { messageId: 'missingRemovalTag' },
        ],
      },
      {
        // Deprecated property inside intersection type — missing both
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
        errors: [{ messageId: 'missingRemovalProse' }, { messageId: 'missingRemovalTag' }],
      },
    ],
  });
});
