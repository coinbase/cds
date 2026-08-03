import { RuleTester } from '@typescript-eslint/rule-tester';

import { hasValidA11yDescriptorsExtended as rule } from '../src/rules/has-valid-accessibility-descriptors-extended';

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
  import { Button } from '@coinbase/cds-mobile/buttons';
  const Component = () => {
    return <Button>test</Button>;
  }
`;

const validButtonWithCorrectLabel = `
  import { Button } from '@coinbase/cds-mobile/buttons';
  const Component = () => {
    return <Button accessibilityLabel="test">test</Button>;
  }
`;

const validButtonWithNestedInnerText = `
  import { Button } from '@coinbase/cds-mobile/buttons';
  const Component = () => {
    return (
      <Button>
          <Box as="div">test</Box>
      </Button>
    );
  }
`;

const validButtonWithNestedExpression = `
  import { Button } from '@coinbase/cds-mobile/buttons';
  const helper = "test2";
  const Component = () => {
    return (
      <Button>
          {helper ?? 'test'}
      </Button>
    );
  }
`;

const validComboboxWithRequiredA11yProps = `
  import { Combobox } from '@coinbase/cds-mobile';
  const options = [{ value: 'a', label: 'A' }];
  const Component = () => {
    return (
      <Combobox
        accessibilityHint="Select one"
        accessibilityLabel="Priority"
        onChange={() => {}}
        options={options}
      />
    );
  }
`;

const validTrayWithA11yProps = `
  import { Tray } from '@coinbase/cds-mobile';
  const Component = () => {
    return <Tray accessibilityLabel="Details tray" handleBarAccessibilityLabel="Drag handle" title="Test" />;
  };
`;

const validTextInputWithoutNegativeVariant = `
  import { TextInput } from '@coinbase/cds-mobile';
  const Component = () => {
    return (
      <TextInput
        width="auto"
        style={{ flex: 0, minWidth: theme.space[4] }}
        compact
        editable={false}
        disabled={isDisabled}
        value={String(value)}
        textAlign="center"
        accessibilityLabel={formatMessage(optionChainMessages.atmTitle)}
        start={
          <InputIconButton
            name="minus"
            compact
            disabled={isDecrementDisabled}
            onPress={handleDecrement}
            accessibilityLabel={formatMessage(optionChainMessages.decreaseAtmRangeLabel)}
          />
        }
        end={
          <InputIconButton
            name="add"
            compact
            disabled={isDisabled}
            onPress={handleIncrement}
            accessibilityLabel={formatMessage(optionChainMessages.increaseAtmRangeLabel)}
          />
        }
      />
    );
  };
`;

const validSwitchWithAccessibleFalse = `
  import { Switch } from '@coinbase/cds-mobile';
  const Component = () => {
    return (
      <Box pointerEvents="none">
        <Switch accessible={false} checked={checked} disabled={disabled} />
      </Box>
    );
  };
`;

const validCheckboxWithAccessibleFalse = `
  import { Checkbox } from '@coinbase/cds-mobile';
  const Component = () => {
    return (
      <Box pointerEvents="none">
        <Checkbox accessible={false} checked={isSelected} />
      </Box>
    );
  };
`;

const valid = [
  validButtonWithInnerText,
  validButtonWithCorrectLabel,
  validButtonWithNestedInnerText,
  validButtonWithNestedExpression,
  validComboboxWithRequiredA11yProps,
  validTrayWithA11yProps,
  validTextInputWithoutNegativeVariant,
  validSwitchWithAccessibleFalse,
  validCheckboxWithAccessibleFalse,
];

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('has-valid-accessibility-descriptors-extended', rule, {
  valid,
  invalid: [
    // Button element without accessibilityLabel
    {
      code: normalizeIndent`
        import { Button } from '@coinbase/cds-mobile/buttons';
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
                import { Button } from '@coinbase/cds-mobile/buttons';
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
        import { IconButton } from '@coinbase/cds-mobile/buttons';
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
                import { IconButton } from '@coinbase/cds-mobile/buttons';
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
        import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
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
                import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
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
                import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
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
    // Chip with onPress requires accessibilityLabel
    {
      code: normalizeIndent`
        import { Chip } from '@coinbase/cds-mobile';
        const Component = () => {
          return <Chip onPress={() => {}}>BTC</Chip>;
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Chip } from '@coinbase/cds-mobile';
                const Component = () => {
                  return <Chip accessibilityLabel="" onPress={() => {}}>BTC</Chip>;
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
        import { SegmentedTabs } from '@coinbase/cds-mobile';
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
                import { SegmentedTabs } from '@coinbase/cds-mobile';
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
    // Combobox requires accessibilityHint
    {
      code: normalizeIndent`
        import { Combobox } from '@coinbase/cds-mobile';
        const options = [{ value: 'a', label: 'A' }];
        const Component = () => {
          return (
            <Combobox accessibilityLabel="test" onChange={() => {}} options={options} />
          );
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityHint',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Combobox } from '@coinbase/cds-mobile';
                const options = [{ value: 'a', label: 'A' }];
                const Component = () => {
                  return (
                    <Combobox accessibilityHint="" accessibilityLabel="test" onChange={() => {}} options={options} />
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Tray requires accessible name
    {
      code: normalizeIndent`
        import { Tray } from '@coinbase/cds-mobile';
        const Component = () => {
          return <Tray title="Test" />;
        }
      `,
      errors: [
        { messageId: 'missingAccessibleName' },
        { messageId: 'missingHandleBarAccessibilityLabel' },
      ],
    },
    // Switch without accessibilityLabel
    {
      code: normalizeIndent`
        import { Switch } from '@coinbase/cds-mobile';
        const Component = () => {
          return <Switch checked={checked} disabled={disabled} />;
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Switch } from '@coinbase/cds-mobile';
                const Component = () => {
                  return <Switch accessibilityLabel="" checked={checked} disabled={disabled} />;
                }
              `,
            },
          ],
        },
      ],
    },
    // Checkbox without accessibilityLabel
    {
      code: normalizeIndent`
        import { Checkbox } from '@coinbase/cds-mobile';
        const Component = () => {
          return <Checkbox checked={isSelected} />;
        }
      `,
      errors: [
        {
          messageId: 'missingAccessibilityLabel',
          suggestions: [
            {
              messageId: 'missingAccessibilityLabelSuggestion',
              output: normalizeIndent`
                import { Checkbox } from '@coinbase/cds-mobile';
                const Component = () => {
                  return <Checkbox accessibilityLabel="" checked={isSelected} />;
                }
              `,
            },
          ],
        },
      ],
    },
  ],
});
