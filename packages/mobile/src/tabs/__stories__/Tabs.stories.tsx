import { useCallback, useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { DefaultTab, type DefaultTabLabelProps } from '../DefaultTab';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';
import {
  type TabComponent,
  Tabs,
  TabsActiveIndicator,
  type TabsActiveIndicatorComponent,
  type TabsActiveIndicatorProps,
  type TabsProps,
} from '../Tabs';

type TradingAction = 'buy' | 'sell' | 'convert';

type TabRowWithTestId = TabValue<TradingAction> & { testID?: string };

const basicTabs: TabRowWithTestId[] = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const longTabs = sampleTabs.slice(0, 9);

const tabsWithDisabled = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell', disabled: true },
  { id: 'convert', label: 'Convert' },
];

const typedTabs: TabValue<TradingAction>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

type TradingTab = TabValue<TradingAction> & DefaultTabLabelProps;
const tabsWithDotCounts: TradingTab[] = basicTabs.map((tab, index) =>
  index === 0 ? { ...tab, count: 3, max: 99 } : tab,
);

const CustomSpringIndicator = (props: TabsActiveIndicatorProps) => (
  <TabsActiveIndicator {...props} background="bgOverlay" />
);

type TabsExampleProps<TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>> = {
  title: string;
  defaultActiveTab: TTab | null;
  TabComponent?: TabComponent<TabId, TTab>;
  TabsActiveIndicatorComponent?: TabsActiveIndicatorComponent;
} & Omit<
  TabsProps<TabId, TTab>,
  'activeTab' | 'onChange' | 'TabComponent' | 'TabsActiveIndicatorComponent'
>;

const TabsExample = <TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>>({
  title,
  defaultActiveTab,
  TabComponent = DefaultTab,
  TabsActiveIndicatorComponent = DefaultTabsActiveIndicator,
  ...props
}: TabsExampleProps<TabId, TTab>) => {
  const [activeTab, setActiveTab] = useState<TTab | null>(defaultActiveTab);
  const handleChange = useCallback((next: TTab | null) => setActiveTab(next), []);

  return (
    <Example overflow="visible" padding={gutter} title={title}>
      <Tabs
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        accessibilityLabel="Example tabs"
        activeBackground="bgPrimary"
        activeTab={activeTab}
        background="bg"
        gap={4}
        onChange={handleChange}
        zIndex={zIndex.navigation}
        {...props}
      />
    </Example>
  );
};

const panelTabs = sampleTabs.slice(0, 3);

const TabsWithPanelsExample = () => {
  const [activeTab, setActiveTab] = useState<TabValue<string> | null>(panelTabs[0]);

  return (
    <Example overflow="visible" padding={gutter} title="With content panels">
      <VStack gap={3}>
        <Text font="body">
          Pair tab buttons with content regions that follow the active tab (see panel below).
        </Text>
        <Tabs
          TabComponent={DefaultTab}
          TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}
          accessibilityLabel="Content sections"
          activeBackground="bg"
          activeTab={activeTab}
          background="bgPrimary"
          gap={4}
          onChange={setActiveTab}
          tabs={panelTabs}
          zIndex={zIndex.navigation}
        />
        {panelTabs.map((tab) =>
          activeTab?.id === tab.id ? (
            <VStack
              key={tab.id}
              accessibilityLabel={`${tab.label} panel`}
              background="bgAlternate"
              gap={1}
              padding={3}
            >
              <Text font="title2">Panel: {tab.label}</Text>
              <Text font="body">Content for this tab.</Text>
            </VStack>
          ) : null,
        )}
      </VStack>
    </Example>
  );
};

const DefaultTabsScreen = () => (
  <ExampleScreen>
    <TabsExample
      defaultActiveTab={basicTabs[0]}
      tabs={basicTabs}
      title="DefaultTab + DefaultTabIndicator"
    />
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <TabsExample defaultActiveTab={basicTabs[0]} tabs={basicTabs} title="Dark" />
    </ThemeProvider>
    <TabsExample
      background="bgAlternate"
      defaultActiveTab={basicTabs[0]}
      tabs={basicTabs}
      title="Alternate background"
    />
    <TabsExample
      defaultActiveTab={basicTabs.slice(0, 2)[0]}
      tabs={basicTabs.slice(0, 2)}
      title="Two tabs"
    />
    <TabsExample defaultActiveTab={basicTabs[1]} tabs={basicTabs} title="Initial second tab" />
    <TabsExample defaultActiveTab={null} tabs={basicTabs} title="No initial active tab" />
    <TabsExample defaultActiveTab={typedTabs[0]} tabs={typedTabs} title="Typed tab ids" />
    <TabsExample
      disabled
      defaultActiveTab={basicTabs[0]}
      tabs={basicTabs}
      title="All tabs disabled"
    />
    <TabsExample
      defaultActiveTab={tabsWithDisabled[0]}
      tabs={tabsWithDisabled}
      title="One tab disabled"
    />
    <TabsExample
      defaultActiveTab={tabsWithDotCounts[0]}
      tabs={tabsWithDotCounts}
      title="Dot counts (DefaultTab)"
    />
    <TabsExample
      TabComponent={DefaultTab}
      TabsActiveIndicatorComponent={CustomSpringIndicator}
      defaultActiveTab={basicTabs[0]}
      tabs={basicTabs}
      title="TabsActiveIndicator (spring) instead of DefaultTabIndicator"
    />
    <TabsWithPanelsExample />
  </ExampleScreen>
);

export default DefaultTabsScreen;
