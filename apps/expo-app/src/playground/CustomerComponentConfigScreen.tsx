import React, { memo, useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem';
import { Select } from '@coinbase/cds-mobile/alpha/select/Select';
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

import { ComponentConfigComparison } from './customerComponentConfig/ComponentConfigComparison';
import { customerComponentConfig } from './customerComponentConfig/customerComponentConfig';
import { retailCDSTheme } from './customerComponentConfig/retailCDSTheme';

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

const comparisonKeys = ['Accordion', 'Inputs', 'Tabs', 'SegmentedTabs'] as const;
type ComparisonKey = (typeof comparisonKeys)[number];

const initialConfiguredState: Record<ComparisonKey, boolean> = {
  Accordion: false,
  Inputs: false,
  Tabs: false,
  SegmentedTabs: false,
};

/**
 * Playground screen for iterating on a customer's CDS component config.
 * Wrap examples in {@link ComponentConfigComparison} to toggle stock CDS vs configured.
 */
export const CustomerComponentConfigScreen = memo(() => {
  const ambientTheme = useTheme();
  const [useRetailTheme, setUseRetailTheme] = useState(false);
  const [configuredState, setConfiguredState] = useState(initialConfiguredState);

  const handleToggleRetailTheme = useCallback((_: string | undefined, checked?: boolean) => {
    setUseRetailTheme(Boolean(checked));
  }, []);

  const setConfigured = useCallback((key: ComparisonKey, checked: boolean) => {
    setConfiguredState((prev) => ({ ...prev, [key]: checked }));
  }, []);
  const handleAccordionChange = useCallback(
    (checked: boolean) => setConfigured('Accordion', checked),
    [setConfigured],
  );
  const handleInputsChange = useCallback(
    (checked: boolean) => setConfigured('Inputs', checked),
    [setConfigured],
  );
  const handleTabsChange = useCallback(
    (checked: boolean) => setConfigured('Tabs', checked),
    [setConfigured],
  );
  const handleSegmentedTabsChange = useCallback(
    (checked: boolean) => setConfigured('SegmentedTabs', checked),
    [setConfigured],
  );

  const allConfigured = comparisonKeys.every((key) => configuredState[key]);

  const handleToggleAllConfigured = useCallback((_: string | undefined, checked?: boolean) => {
    const nextChecked = Boolean(checked);
    setConfiguredState(
      comparisonKeys.reduce(
        (next, key) => ({ ...next, [key]: nextChecked }),
        {} as Record<ComparisonKey, boolean>,
      ),
    );
  }, []);

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
                <Switch
                  accessibilityLabel={
                    allConfigured
                      ? 'Showing configured mode for all components'
                      : 'Showing default mode for all components'
                  }
                  checked={allConfigured}
                  color={allConfigured ? 'fgPrimary' : undefined}
                  onChange={handleToggleAllConfigured}
                >
                  Toggle all
                </Switch>
              </HStack>
              <Divider />
            </VStack>
            <VStack flexGrow={1} gap={4} paddingBottom={8} paddingTop={2} paddingX={2}>
              <ComponentConfigComparison
                checked={configuredState.Accordion}
                componentName="Accordion"
                onChange={handleAccordionChange}
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
                onChange={handleInputsChange}
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
                checked={configuredState.Tabs}
                componentName="Tabs"
                onChange={handleTabsChange}
              >
                {() => <TabsExample />}
              </ComponentConfigComparison>
              <ComponentConfigComparison
                checked={configuredState.SegmentedTabs}
                componentName="SegmentedTabs"
                onChange={handleSegmentedTabsChange}
              >
                {() => <SegmentedTabsExample />}
              </ComponentConfigComparison>
            </VStack>
          </ThemeProvider>
        </ScrollView>
      </Box>
    </ComponentConfigProvider>
  );
});
