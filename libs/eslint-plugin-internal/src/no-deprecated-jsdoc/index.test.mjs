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

describe("'no-deprecated-jsdoc' rule", () => {
  ruleTester.run('no-deprecated-jsdoc', rule, {
    valid: [
      {
        // Regular JSDoc without @deprecated
        code: `
          /** This is a regular comment */
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
      {
        // Non-JSDoc block comment
        code: `
          /* @deprecated This is not JSDoc */
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
      {
        // Line comment
        code: `
          // @deprecated This is a line comment
          const foo = 'bar';
        `,
        filename: 'valid.ts',
      },
      {
        // Regular type without deprecated properties
        code: `
          type FooProps = {
            /** Name of the item */
            name: string;
            /** Size of the item */
            size: number;
          };
        `,
        filename: 'valid.ts',
      },
      {
        // Regular function with JSDoc
        code: `
          /**
           * A useful function
           * @param value - The value to use
           */
          function doSomething(value: string) {
            return value;
          }
        `,
        filename: 'valid.ts',
      },
    ],
    invalid: [
      {
        // Deprecated function
        code: `
          /** @deprecated Use React.useState instead. */
          function useToggler(initial = false) {
            return [initial, () => {}];
          }
        `,
        filename: 'useToggler.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated const
        code: `
          /** @deprecated Do not use this. */
          const useGroupToggler = () => {};
        `,
        filename: 'useGroupToggler.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated export const (useModal style)
        code: `
          /**
           * @deprecated Use the visible and onRequestClose props
           */
          export const useModal = () => {
            return {};
          };
        `,
        filename: 'useModal.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated type export (FeatureEntryCard style)
        code: `
          /** @deprecated will be removed in v7.0.0 use NudgeCard instead */
          export type FeatureEntryCardProps = { name: string };
        `,
        filename: 'FeatureEntryCard.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated property in type (IconCounterButton style)
        code: `
          export type IconCounterButtonBaseProps = {
            /** Name of the icon */
            icon: string;
            /** @deprecated Use \`size\` instead. */
            iconSize?: number;
            /** Size for given icon. */
            size?: number;
          };
        `,
        filename: 'IconCounterButton.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated property in type (ProgressCircle style)
        code: `
          export type ProgressCircleBaseProps = {
            /**
             * Toggle used to hide the content node
             */
            hideContent?: boolean;
            /**
             * @deprecated Use hideContent instead
             * Toggle used to hide the text
             */
            hideText?: boolean;
          };
        `,
        filename: 'ProgressCircle.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Multiple deprecated items (SelectChip style)
        code: `
          /**
           * @deprecated This component is deprecated. Please use the new SelectChip alpha component instead.
           */
          export type SelectChipProps = {
            active?: boolean;
            /**
             * @deprecated The prop will be removed in a future version.
             */
            children?: React.ReactNode;
          };

          /**
           * @deprecated This component is deprecated. Please use the new SelectChip alpha component instead.
           */
          export const SelectChip = () => {};
        `,
        filename: 'SelectChip.tsx',
        errors: [
          { messageId: 'deprecatedJsdoc' },
          { messageId: 'deprecatedJsdoc' },
          { messageId: 'deprecatedJsdoc' },
        ],
      },
      {
        // Deprecated interface
        code: `
          /** @deprecated Use NewInterface instead */
          interface OldInterface {
            foo: string;
          }
        `,
        filename: 'deprecated-interface.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated property in interface
        code: `
          interface MyInterface {
            /** @deprecated Use newProp instead */
            oldProp?: string;
            newProp: string;
          }
        `,
        filename: 'deprecated-property.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated class
        code: `
          /** @deprecated Use NewClass instead */
          class OldClass {}
        `,
        filename: 'deprecated-class.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated with multiline reason
        code: `
          /**
           * @deprecated This hook is deprecated because it doesn't follow React best practices.
           * Please migrate to useState with a custom reducer instead.
           */
          export function useComplexState() {
            return {};
          }
        `,
        filename: 'deprecated-multiline.ts',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated property in intersection type (SelectChip style with & operators)
        code: `
          type BaseProps = { name: string };
          export type SelectChipProps = {
            active?: boolean;
            /**
             * @deprecated The prop will be removed in a future version.
             */
            children?: React.ReactNode;
          } & BaseProps & { other: string };
        `,
        filename: 'intersection-deprecated-prop.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Multiple deprecated properties across intersection type members
        code: `
          export type ComplexProps = {
            /** @deprecated Use newFoo instead */
            foo?: string;
          } & {
            /** @deprecated Use newBar instead */
            bar?: string;
          };
        `,
        filename: 'multiple-intersection-deprecated.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }, { messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deprecated property inside generic type argument (Text.tsx style)
        code: `
          type ExtendableProps<Base, Extension> = Base & Extension;
          export type TextBaseProps = ExtendableProps<
            { base: string },
            {
              mono?: boolean;
              /** @deprecated Do not use this prop. */
              renderEmptyNode?: boolean;
            }
          >;
        `,
        filename: 'generic-type-arg-deprecated.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
      {
        // Deeply nested generic with deprecated property
        code: `
          type Wrapper<T> = { value: T };
          export type DeepProps = Wrapper<{
            /** @deprecated Use newField instead */
            oldField?: string;
          }>;
        `,
        filename: 'deep-generic-deprecated.tsx',
        errors: [{ messageId: 'deprecatedJsdoc' }],
      },
    ],
  });
});
