import React, { memo, useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem';
import { Select } from '@coinbase/cds-mobile/alpha/select/Select';
import { SelectChip } from '@coinbase/cds-mobile/alpha/select-chip/SelectChip';
import { TabbedChips } from '@coinbase/cds-mobile/alpha/tabbed-chips/TabbedChips';
import { InputChip } from '@coinbase/cds-mobile/chips/InputChip';
import { CheckboxCell } from '@coinbase/cds-mobile/controls/CheckboxCell';
import { RadioCell } from '@coinbase/cds-mobile/controls/RadioCell';
import { Switch } from '@coinbase/cds-mobile/controls/Switch';
import { TextInput } from '@coinbase/cds-mobile/controls/TextInput';
import { DateInput } from '@coinbase/cds-mobile/dates/DateInput';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Divider } from '@coinbase/cds-mobile/layout';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { ThemeProvider } from '@coinbase/cds-mobile/system/ThemeProvider';
import { SegmentedTabs } from '@coinbase/cds-mobile/tabs/SegmentedTabs';
import { Tabs } from '@coinbase/cds-mobile/tabs/Tabs';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';

import { ComponentConfigComparison } from './customerComponentConfig/ComponentConfigComparison';
import { customerComponentConfig } from './customerComponentConfig/customerComponentConfig';
import { retailCDSTheme } from './customerComponentConfig/retailCDSTheme';

const emptyConfig: ComponentConfig = {};
const scrollContentContainerStyle = { flexGrow: 1 };

const tabsExampleData: TabValue[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
];

/** Self-contained Tabs example so its active-tab state lives outside the render-prop callback. */
const TabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabsExampleData[0]);
  return (
    <VStack>
      <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabsExampleData} />
      <Divider />
    </VStack>
  );
});

const segmentedTabsExampleData: TabValue[] = [
  { id: 'home', label: 'Home' },
  { id: 'trade', label: 'Trade' },
  { id: 'account', label: 'Account' },
];

/** Self-contained SegmentedTabs example so its active-tab state lives outside the render-prop callback. */
const SegmentedTabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(segmentedTabsExampleData[0]);
  return (
    <SegmentedTabs activeTab={activeTab} onChange={setActiveTab} tabs={segmentedTabsExampleData} />
  );
});

const tabbedChipsExampleData: TabValue[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
];

/** Self-contained Alpha TabbedChips example; TabComponent comes from customer component config. */
const TabbedChipsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabbedChipsExampleData[0]);
  return (
    <TabbedChips activeTab={activeTab} onChange={setActiveTab} tabs={tabbedChipsExampleData} />
  );
});

const chipExampleLabel = 'Basic Chip';

const InputChipExample = memo(() => (
  <HStack flexWrap="wrap" gap={2}>
    <InputChip active={false} onPress={() => {}}>
      {chipExampleLabel}
    </InputChip>
    <InputChip onPress={() => {}}>{chipExampleLabel}</InputChip>
  </HStack>
));

const selectChipOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const SelectChipExample = memo(() => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <SelectChip
      accessibilityLabel="Select an option"
      label="Select an option"
      onChange={setValue}
      options={selectChipOptions}
      placeholder="Choose an option"
      value={value}
    />
  );
});

const CheckboxCellExample = memo(() => {
  const [checked, setChecked] = useState(false);

  return (
    <VStack gap={2}>
      <CheckboxCell
        checked={checked}
        description="Helpful description"
        onChange={(_, nextChecked) => setChecked(!!nextChecked)}
        title="Checkbox cell"
        value="checkbox-cell"
      />
      <CheckboxCell
        checked
        disabled
        onChange={() => {}}
        title="Selected and disabled"
        value="checkbox-cell-disabled"
      />
    </VStack>
  );
});

const RadioCellExample = memo(() => {
  const [value, setValue] = useState('option-1');

  return (
    <VStack gap={2}>
      <RadioCell
        checked={value === 'option-1'}
        description="First choice"
        onChange={(next) => {
          if (next) setValue(next);
        }}
        title="Option 1"
        value="option-1"
      />
      <RadioCell
        checked={value === 'option-2'}
        description="Second choice"
        onChange={(next) => {
          if (next) setValue(next);
        }}
        title="Option 2"
        value="option-2"
      />
    </VStack>
  );
});

const comparisonKeys = [
  'Accordion',
  'Inputs',
  'InputChip',
  'SelectChip',
  'Tabs',
  'SegmentedTabs',
  'TabbedChips',
  'CheckboxCell',
  'RadioCell',
] as const;
type ComparisonKey = (typeof comparisonKeys)[number];

const initialConfiguredState: Record<ComparisonKey, boolean> = {
  Accordion: false,
  Inputs: false,
  InputChip: false,
  SelectChip: false,
  Tabs: false,
  SegmentedTabs: false,
  TabbedChips: false,
  CheckboxCell: false,
  RadioCell: false,
};

const resolveSwitchChecked = (currentChecked: boolean, nextChecked?: boolean) =>
  typeof nextChecked === 'boolean' ? nextChecked : !currentChecked;

/**
 * Playground screen for iterating on a customer's CDS component config.
 * Wrap examples in {@link ComponentConfigComparison} to toggle stock CDS vs configured.
 */
export const CustomerComponentConfigScreen = memo(() => {
  const ambientTheme = useTheme();
  const [useRetailTheme, setUseRetailTheme] = useState(false);
  const [configuredState, setConfiguredState] = useState(initialConfiguredState);

  const handleToggleRetailTheme = useCallback((_: string | undefined, nextChecked?: boolean) => {
    setUseRetailTheme((prev) => resolveSwitchChecked(prev, nextChecked));
  }, []);

  const handleConfiguredChange = useCallback((key: ComparisonKey, checked: boolean) => {
    setConfiguredState((prev) => ({ ...prev, [key]: checked }));
  }, []);

  const someConfigured = comparisonKeys.some((key) => configuredState[key]);

  const handleToggleAllConfigured = useCallback(
    (_: string | undefined, switchChecked?: boolean) => {
      setConfiguredState((prev) => {
        const someOn = comparisonKeys.some((key) => prev[key]);
        // Any configured -> turn all off; none configured -> turn all on.
        const nextAllConfigured = typeof switchChecked === 'boolean' ? switchChecked : !someOn;
        return comparisonKeys.reduce(
          (next, key) => ({ ...next, [key]: nextAllConfigured }),
          {} as Record<ComparisonKey, boolean>,
        );
      });
    },
    [],
  );

  return (
    <ComponentConfigProvider value={customerComponentConfig}>
      <Box background="bg" flexGrow={1}>
        <ScrollView contentContainerStyle={scrollContentContainerStyle}>
          {/* Always mount ThemeProvider (swapping only the `theme` value) so this subtree never
              remounts on toggle, preserving the local state of every control beneath it. Nesting
              the theme toggle itself inside the provider lets the retail theme restyle its own
              switch too. */}
          <ThemeProvider
            activeColorScheme={ambientTheme.activeColorScheme}
            theme={useRetailTheme ? retailCDSTheme : ambientTheme}
          >
            <VStack gap={2} paddingBottom={2} paddingTop={2} paddingX={2}>
              <HStack alignItems="center" justifyContent="flex-end">
                <Switch
                  accessibilityLabel={
                    useRetailTheme
                      ? 'Retail theme applied to all examples'
                      : 'Default theme applied to all examples'
                  }
                  checked={useRetailTheme}
                  color={useRetailTheme ? 'fgPrimary' : undefined}
                  onChange={handleToggleRetailTheme}
                >
                  Apply Retail theme
                </Switch>
              </HStack>
              <HStack alignItems="center" justifyContent="flex-end">
                <ComponentConfigProvider value={emptyConfig}>
                  <Switch
                    accessibilityLabel={
                      someConfigured
                        ? 'Showing configured mode for all components'
                        : 'Showing default mode for all components'
                    }
                    checked={someConfigured}
                    color={someConfigured ? 'fgPrimary' : undefined}
                    onChange={handleToggleAllConfigured}
                  >
                    Toggle all
                  </Switch>
                </ComponentConfigProvider>
              </HStack>
              <Divider />
            </VStack>
            <VStack flexGrow={1} gap={4} paddingBottom={8} paddingTop={2} paddingX={2}>
              <ComponentConfigComparison
                checked={configuredState.Accordion}
                componentName="Accordion"
                onChange={(checked) => handleConfiguredChange('Accordion', checked)}
              >
                {() => (
                  <Accordion>
                    <AccordionItem itemKey="1" subtitle="Subtitle" title="Title">
                      <Text font="body">Accordion panel content.</Text>
                    </AccordionItem>
                    <AccordionItem itemKey="2" subtitle="Subtitle 2" title="Title 2">
                      <Text font="body">Accordion panel content 2.</Text>
                    </AccordionItem>
                  </Accordion>
                )}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.Inputs}
                componentName="Inputs"
                onChange={(checked) => handleConfiguredChange('Inputs', checked)}
              >
                {() => (
                  <VStack>
                    <TextInput
                      accessibilityLabel="testing"
                      label="Text"
                      placeholder="Hello World!"
                    />
                    <Select
                      accessibilityLabel="testing"
                      label="Select"
                      onChange={() => {}}
                      options={[]}
                      placeholder="Select an option"
                      value={null}
                    />
                    <DateInput
                      accessibilityLabel="testing"
                      date={new Date()}
                      error={null}
                      label="Date"
                      onChangeDate={() => {}}
                      onErrorDate={() => {}}
                      placeholder="Hello World!"
                    />
                  </VStack>
                )}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.InputChip}
                componentName="InputChip"
                onChange={(checked) => handleConfiguredChange('InputChip', checked)}
              >
                {() => <InputChipExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.SelectChip}
                componentName="SelectChip"
                onChange={(checked) => handleConfiguredChange('SelectChip', checked)}
              >
                {() => <SelectChipExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.Tabs}
                componentName="Tabs"
                onChange={(checked) => handleConfiguredChange('Tabs', checked)}
              >
                {() => <TabsExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.SegmentedTabs}
                componentName="SegmentedTabs"
                onChange={(checked) => handleConfiguredChange('SegmentedTabs', checked)}
              >
                {() => <SegmentedTabsExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.TabbedChips}
                componentName="TabbedChips"
                onChange={(checked) => handleConfiguredChange('TabbedChips', checked)}
              >
                {() => <TabbedChipsExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.CheckboxCell}
                componentName="CheckboxCell"
                onChange={(checked) => handleConfiguredChange('CheckboxCell', checked)}
              >
                {() => <CheckboxCellExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.RadioCell}
                componentName="RadioCell"
                onChange={(checked) => handleConfiguredChange('RadioCell', checked)}
              >
                {() => <RadioCellExample />}
              </ComponentConfigComparison>
            </VStack>
          </ThemeProvider>
        </ScrollView>
      </Box>
    </ComponentConfigProvider>
  );
});
