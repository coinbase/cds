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
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("'no-style-prop-css-overrides' rule", () => {
  ruleTester.run('no-style-prop-css-overrides', rule, {
    valid: [
      {
        // Properties not owned by any style prop are allowed.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            cursor: pointer;
            transition: opacity 0.2s ease;
            text-overflow: ellipsis;
            white-space: nowrap;
          \`;
        `,
        filename: 'Component.tsx',
      },
      {
        // Owned properties inside nested selectors / pseudo-states / media
        // queries cannot be expressed via static style props, so they're fine.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            cursor: pointer;
            &:hover {
              background-color: var(--color-bgPrimary);
              color: red;
            }
            @media (min-width: 768px) {
              height: 40px;
            }
            > span {
              padding-top: 4px;
            }
          \`;
        `,
        filename: 'Component.tsx',
      },
      {
        // A multi-value shorthand cannot be expressed by the single-token
        // padding/margin style props.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            padding: 4px 8px;
            margin: 0 auto;
          \`;
        `,
        filename: 'Component.tsx',
      },
      {
        // `css` not imported from @linaria/core is ignored.
        code: `
          import { css } from 'some-other-lib';
          const klass = css\`
            height: 40px;
          \`;
        `,
        filename: 'Component.tsx',
      },
    ],
    invalid: [
      {
        // The Button height/width footgun (CDS-2118).
        code: `
          import { css } from '@linaria/core';
          const buttonClass = css\`
            height: 40px;
            width: 100%;
          \`;
        `,
        filename: 'Button.tsx',
        errors: [
          { messageId: 'cssOverridesStyleProp', data: { property: 'height', styleProp: 'height' } },
          { messageId: 'cssOverridesStyleProp', data: { property: 'width', styleProp: 'width' } },
        ],
      },
      {
        // Themed properties owned by style props, including an interpolated value.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            background-color: var(--color-bgPrimary);
            padding-top: 8px;
            box-shadow: \${someShadow};
          \`;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'cssOverridesStyleProp',
            data: { property: 'background-color', styleProp: 'background' },
          },
          {
            messageId: 'cssOverridesStyleProp',
            data: { property: 'padding-top', styleProp: 'paddingTop' },
          },
          {
            messageId: 'cssOverridesStyleProp',
            data: { property: 'box-shadow', styleProp: 'elevation' },
          },
        ],
      },
      {
        // A single-token padding shorthand maps cleanly to the `padding` prop.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            padding: 8px;
          \`;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'cssOverridesStyleProp',
            data: { property: 'padding', styleProp: 'padding' },
          },
        ],
      },
      {
        // Aliased import is still detected.
        code: `
          import { css as styled } from '@linaria/core';
          const klass = styled\`
            display: flex;
          \`;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'cssOverridesStyleProp',
            data: { property: 'display', styleProp: 'display' },
          },
        ],
      },
    ],
  });
});
