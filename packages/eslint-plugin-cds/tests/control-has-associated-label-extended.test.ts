import { RuleTester } from '@typescript-eslint/rule-tester';

import { controlHasAssociatedLabelExtended as rule } from '../src/rules/control-has-associated-label-extended';

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

const validButtonWithInnerText = `
  import { Button } from '@cbhq/cds-web/buttons';
  const Component = () => {
    return <Button>test</Button>;
  }
`;

const validButtonWithCorrectLabel = `
  import { Button } from '@cbhq/cds-web/buttons';
  const Component = () => {
    return <Button accessibilityLabel="test">test</Button>;
}
`;

const validButtonWithNestedInnerText = `
  import { Button } from '@cbhq/cds-web/buttons';
  const Component = () => {
    return (
      <Button>
          <Box as="div">test</Box>
      </Button>
    );
  }
`;

const validButtonWithNestedExpression = `
  import { Button } from '@cbhq/cds-web/buttons';
  const helper = "test2";
  const Component = () => {
    return (
      <Button>
          {helper ?? 'test'}
      </Button>
    );
  }
`;

const valid = [
  validButtonWithInnerText,
  validButtonWithCorrectLabel,
  validButtonWithNestedInnerText,
  validButtonWithNestedExpression,
];

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('control-has-associated-label-extended', rule, {
  valid,
  invalid: [
    // Button element without accessibilityLabel
    {
      code: normalizeIndent`
        import { Button } from '@cbhq/cds-web/buttons';
        const Component = () => {
          return (
            <Button/>
          );
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel' as const,
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button } from '@cbhq/cds-web/buttons';
                const Component = () => {
                  return (
                    <Button accessibilityLabel=""/>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // IconButton element without accessibilityLabel
    {
      code: normalizeIndent`
        import { IconButton } from '@cbhq/cds-web/buttons';
        const Component = () => {
          return (
            <IconButton/>
          );
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel' as const,
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { IconButton } from '@cbhq/cds-web/buttons';
                const Component = () => {
                  return (
                    <IconButton accessibilityLabel=""/>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // nested buttons without accessibilityLabels
    {
      code: normalizeIndent`
        import { Button, IconButton } from '@cbhq/cds-web/buttons';
        const Component = () => {
          return (
            <Button>
              <Box><IconButton/></Box>
            </Button>
          );
        }
      `,
      errors: [
        {
          // error on Button element
          messageId: 'missingAccessibilityLabel' as const,
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button, IconButton } from '@cbhq/cds-web/buttons';
                const Component = () => {
                  return (
                    <Button accessibilityLabel="">
                      <Box><IconButton/></Box>
                    </Button>
                  );
                }
              `,
            },
          ],
        },
        {
          // error on IconButton element
          messageId: 'missingAccessibilityLabel' as const,
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button, IconButton } from '@cbhq/cds-web/buttons';
                const Component = () => {
                  return (
                    <Button>
                      <Box><IconButton accessibilityLabel=""/></Box>
                    </Button>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
  ],
});
