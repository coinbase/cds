import { RuleTester } from '@typescript-eslint/rule-tester';

import { webTooltipInteractiveContent as rule } from '../src/rules/web-tooltip-interactive-content';

import { normalizeIndent } from './normalizeIndent';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error RuleTester types mismatch in current setup
ruleTester.run('web-tooltip-interactive-content', rule, {
  valid: [
    normalizeIndent`
      import { Tooltip, Icon } from '@coinbase/cds-web';
      const Component = () => {
        return (
          <Tooltip content="Simple text tooltip">
            <Icon name="info" />
          </Tooltip>
        );
      }
    `,
    normalizeIndent`
      import { Tooltip, Icon, Button } from '@coinbase/cds-web';
      const Component = () => {
        return (
          <Tooltip
            content={<Button onClick={() => {}}>Action</Button>}
            hasInteractiveContent
          >
            <Icon name="info" />
          </Tooltip>
        );
      }
    `,
  ],
  invalid: [
    {
      code: normalizeIndent`
        import { Tooltip, Icon, Button } from '@coinbase/cds-web';
        const Component = () => {
          return (
            <Tooltip content={<Button onClick={() => {}}>Action</Button>}>
              <Icon name="info" />
            </Tooltip>
          );
        }
      `,
      errors: [{ messageId: 'missingHasInteractiveContent' as const }],
    },
  ],
});
