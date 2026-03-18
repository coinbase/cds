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
  import { Button } from '@coinbase/cds-web/buttons';
  const Component = () => {
    return <Button>test</Button>;
  }
`;

const validButtonWithCorrectLabel = `
  import { Button } from '@coinbase/cds-web/buttons';
  const Component = () => {
    return <Button accessibilityLabel="test">test</Button>;
}
`;

const validButtonWithNestedInnerText = `
  import { Button } from '@coinbase/cds-web/buttons';
  const Component = () => {
    return (
      <Button>
          <Box as="div">test</Box>
      </Button>
    );
  }
`;

const validButtonWithNestedExpression = `
  import { Button } from '@coinbase/cds-web/buttons';
  const helper = "test2";
  const Component = () => {
    return (
      <Button>
          {helper ?? 'test'}
      </Button>
    );
  }
`;

const validModalHeaderWithTitle = `
  import { ModalHeader } from '@coinbase/cds-web';
  const Component = () => {
    return (
      <ModalHeader backAccessibilityLabel="Back" closeAccessibilityLabel="Close" onBackButtonClick={() => {}} title="Title" />
    );
  }
`;

const validComboboxWithRequiredA11yProps = `
  import { Combobox } from '@coinbase/cds-web';
  const options = [{ value: 'a', label: 'A' }];
  const Component = () => {
    return (
      <Combobox
        accessibilityLabel="Priority"
        controlAccessibilityLabel="Priority control"
        onChange={() => {}}
        options={options}
      />
    );
  }
`;

const validTableWithCaption = `
  import { Table, TableCaption } from '@coinbase/cds-web';
  const Component = () => {
    return (
      <Table>
        <TableCaption>Accounts table</TableCaption>
        <tbody />
      </Table>
    );
  }
`;

const valid = [
  validButtonWithInnerText,
  validButtonWithCorrectLabel,
  validButtonWithNestedInnerText,
  validButtonWithNestedExpression,
  validModalHeaderWithTitle,
  validComboboxWithRequiredA11yProps,
  validTableWithCaption,
];

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('control-has-associated-label-extended', rule, {
  valid,
  invalid: [
    // Button element without accessibilityLabel
    {
      code: normalizeIndent`
        import { Button } from '@coinbase/cds-web/buttons';
        const Component = () => {
          return (
            <Button/>
          );
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button } from '@coinbase/cds-web/buttons';
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
        import { IconButton } from '@coinbase/cds-web/buttons';
        const Component = () => {
          return (
            <IconButton/>
          );
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { IconButton } from '@coinbase/cds-web/buttons';
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
        import { Button, IconButton } from '@coinbase/cds-web/buttons';
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
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button, IconButton } from '@coinbase/cds-web/buttons';
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
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Button, IconButton } from '@coinbase/cds-web/buttons';
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
    // SegmentedTabs requires accessibilityLabel
    {
      code: normalizeIndent`
        import { SegmentedTabs } from '@coinbase/cds-web';
        const tabs = [{ id: 'buy', label: 'Buy' }];
        const Component = () => {
          return <SegmentedTabs activeTab={tabs[0]} onChange={() => {}} tabs={tabs} />;
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { SegmentedTabs } from '@coinbase/cds-web';
                const tabs = [{ id: 'buy', label: 'Buy' }];
                const Component = () => {
                  return <SegmentedTabs accessibilityLabel="" activeTab={tabs[0]} onChange={() => {}} tabs={tabs} />;
                }
              `,
            },
          ],
        },
      ],
    },
    // ModalHeader with back action requires backAccessibilityLabel
    {
      code: normalizeIndent`
  import { ModalHeader } from '@coinbase/cds-web';
  const Component = () => {
    return (
      <ModalHeader closeAccessibilityLabel="Close" onBackButtonClick={() => {}} title="Title" />
    );
  }
`,
      errors: [
        {
          messageId: 'missingBackAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { ModalHeader } from '@coinbase/cds-web';
                const Component = () => {
                  return (
                    <ModalHeader backAccessibilityLabel="" closeAccessibilityLabel="Close" onBackButtonClick={() => {}} title="Title" />
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Combobox requires accessible name and controlAccessibilityLabel
    {
      code: normalizeIndent`
        import { Combobox } from '@coinbase/cds-web';
        const options = [{ value: 'a', label: 'A' }];
        const Component = () => {
          return <Combobox onChange={() => {}} options={options} />;
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibleName',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Combobox } from '@coinbase/cds-web';
                const options = [{ value: 'a', label: 'A' }];
                const Component = () => {
                  return <Combobox accessibilityLabel="" onChange={() => {}} options={options} />;
                }
              `,
            },
          ],
        },
        {
          messageId: 'missingControlAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Combobox } from '@coinbase/cds-web';
                const options = [{ value: 'a', label: 'A' }];
                const Component = () => {
                  return <Combobox controlAccessibilityLabel="" onChange={() => {}} options={options} />;
                }
              `,
            },
          ],
        },
      ],
    },
    // Table requires caption or accessible name props
    {
      code: normalizeIndent`
        import { Table } from '@coinbase/cds-web';
        const Component = () => {
          return (
            <Table>
              <tbody />
            </Table>
          );
        }
      `,
      errors: [{ messageId: 'missingTableAccessibleName' }],
    },
  ],
});
