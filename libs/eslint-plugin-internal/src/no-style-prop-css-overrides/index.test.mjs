import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

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

describe("'no-style-prop-css-overrides' rule", () => {
  ruleTester.run('no-style-prop-css-overrides', rule, {
    valid: [
      {
        // css block sets height, but the element is not passed a height style prop.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`height: 40px;\`;
          const C = () => <div className={klass} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // The Button baseCss case: the css block sets display/position/etc.,
        // but none of those are passed as explicit style props to the element.
        code: `
          import { css } from '@linaria/core';
          const baseCss = css\`
            display: inline-flex;
            position: relative;
            text-align: center;
            align-items: center;
          \`;
          const C = () => <Pressable className={cx(baseCss)} background="bgPrimary" color="fg" />;
        `,
        filename: 'Button.tsx',
      },
      {
        // Style prop and css block don't overlap (color vs height).
        code: `
          import { css } from '@linaria/core';
          const klass = css\`color: red;\`;
          const C = () => <Box className={klass} height={40} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // Different padding/margin family: css sets padding-top, prop is marginTop.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`padding-top: 8px;\`;
          const C = () => <Box className={klass} marginTop={2} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // Owned property is nested in a pseudo-state, not top level.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`
            cursor: pointer;
            &:hover { height: 40px; }
          \`;
          const C = () => <Box className={klass} height={40} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // css not imported from @linaria/core.
        code: `
          import { css } from 'some-other-lib';
          const klass = css\`height: 40px;\`;
          const C = () => <Box className={klass} height={40} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // Spread destructures `height` out, so it can no longer reach the element.
        code: `
          import { css } from '@linaria/core';
          type Props = { height?: number; onClick?: () => void };
          const klass = css\`height: 40px;\`;
          const C = ({ height, ...rest }: Props) => <div className={klass} {...rest} />;
        `,
        filename: 'Component.tsx',
      },
      {
        // Spread carries `height`, but the css block doesn't set a conflicting property.
        code: `
          import { css } from '@linaria/core';
          type Props = { height?: number; onClick?: () => void };
          const klass = css\`color: red;\`;
          const C = ({ ...rest }: Props) => <div className={klass} {...rest} />;
        `,
        filename: 'Component.tsx',
      },
    ],
    invalid: [
      {
        // Explicit attribute (CDS-2118 footgun): element forwards height AND a css class hardcodes it.
        code: `
          import { css } from '@linaria/core';
          const baseCss = css\`height: fit-content;\`;
          const C = ({ height }: { height?: string }) => (
            <Pressable className={cx(baseCss)} height={height} />
          );
        `,
        filename: 'Button.tsx',
        errors: [
          {
            messageId: 'stylePropOverriddenByCss',
            data: { styleProp: 'height', property: 'height' },
          },
        ],
      },
      {
        // Inline css in className, conflicting with the explicit background style prop.
        code: `
          import { css } from '@linaria/core';
          const C = () => (
            <Box className={css\`background-color: var(--color-bgPrimary);\`} background="bgPrimary" />
          );
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'stylePropOverriddenByCss',
            data: { styleProp: 'background', property: 'background-color' },
          },
        ],
      },
      {
        // Shorthand/longhand: css padding-top conflicts with the explicit padding style prop.
        code: `
          import { css } from '@linaria/core';
          const klass = css\`padding-top: 8px;\`;
          const C = () => <Box className={klass} padding={4} />;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'stylePropOverriddenByCss',
            data: { styleProp: 'padding', property: 'padding-top' },
          },
        ],
      },
      {
        // Spread carries `height` (not destructured out) and the css block sets it.
        code: `
          import { css } from '@linaria/core';
          type Props = { height?: number; width?: number; onClick?: () => void };
          const klass = css\`height: 40px;\`;
          const C = ({ onClick, ...rest }: Props) => <div className={klass} {...rest} />;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'stylePropOverriddenByCssViaSpread',
            data: { styleProp: 'height', property: 'height', spread: 'rest' },
          },
        ],
      },
      {
        // Explicit attribute wins precedence over the spread for the same prop:
        // a single (non-spread) report for `height`, even though `rest` also carries it.
        code: `
          import { css } from '@linaria/core';
          type Props = { height?: number; onClick?: () => void };
          const klass = css\`height: 40px;\`;
          const C = ({ ...rest }: Props) => <div className={klass} height={10} {...rest} />;
        `,
        filename: 'Component.tsx',
        errors: [
          {
            messageId: 'stylePropOverriddenByCss',
            data: { styleProp: 'height', property: 'height' },
          },
        ],
      },
    ],
  });
});
