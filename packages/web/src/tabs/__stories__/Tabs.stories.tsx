import { useCallback, useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Box, VStack } from '../../layout';
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

import { MockTabPanel } from './MockTabPanel';

export default {
  title: 'Components/Tabs/Tabs',
  parameters: {
    a11y: {
      context: {
        include: ['body'],
        exclude: ['.no-a11y-checks'],
      },
    },
  },
};

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
    <VStack gap={2}>
      <Text as="h2" display="block" font="title4">
        {title}
      </Text>
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
    </VStack>
  );
};

export const Default = () => (
  <VStack background="bg" gap={2} padding={2}>
    <TabsExample
      defaultActiveTab={basicTabs[0]}
      tabs={basicTabs}
      title="DefaultTab + DefaultTabIndicator"
    />
  </VStack>
);

export const All = () => (
  <VStack gap={4}>
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <VStack background="bg" gap={3} padding={2}>
        <TabsExample defaultActiveTab={basicTabs[0]} tabs={basicTabs} title="Light — basic" />
        <TabsExample
          background="bgAlternate"
          defaultActiveTab={basicTabs[0]}
          tabs={basicTabs}
          title="Alternate background"
        />
      </VStack>
    </ThemeProvider>
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <VStack background="bg" gap={3} padding={2}>
        <TabsExample defaultActiveTab={basicTabs[0]} tabs={basicTabs} title="Dark" />
      </VStack>
    </ThemeProvider>
    <VStack background="bg" gap={3} padding={2}>
      <TabsExample defaultActiveTab={basicTabs[0]} tabs={basicTabs.slice(0, 2)} title="Two tabs" />
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
      <Box maxWidth={280} overflow="auto">
        <TabsExample defaultActiveTab={longTabs[0]} tabs={longTabs} title="Horizontal scroll" />
      </Box>
      <VStack className="no-a11y-checks" gap={3}>
        <TabsExample
          TabComponent={DefaultTab}
          TabsActiveIndicatorComponent={CustomSpringIndicator}
          defaultActiveTab={basicTabs[0]}
          tabs={basicTabs}
          title="TabsActiveIndicator (spring) instead of DefaultTabIndicator"
        />
      </VStack>
    </VStack>
  </VStack>
);

const tabsTabListOnlyA11y = {
  a11y: {
    context: {
      include: ['body'],
      exclude: ['.no-a11y-checks'],
    },
    options: {
      rules: {
        'aria-valid-attr-value': { enabled: false },
        'duplicate-id': { enabled: false },
        'duplicate-id-active': { enabled: false },
      },
    },
  },
};

Default.parameters = tabsTabListOnlyA11y;
All.parameters = tabsTabListOnlyA11y;

const panelTabs = sampleTabs.slice(0, 3);

export const WithTabPanels = () => {
  const [activeTab, setActiveTab] = useState<TabValue<string> | null>(panelTabs[0]);

  return (
    <VStack background="bg" gap={3} padding={2}>
      <Text as="p" display="block" font="body">
        Pair tab buttons with <Text mono>role=&quot;tabpanel&quot;</Text> regions (see
        MockTabPanel).
      </Text>
      <Tabs
        TabComponent={DefaultTab}
        TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}
        accessibilityLabel="Content sections"
        activeBackground="bg"
        activeTab={activeTab}
        background="bg"
        gap={4}
        onChange={setActiveTab}
        tabs={panelTabs}
        zIndex={zIndex.navigation}
      />
      {panelTabs.map((tab) => (
        <MockTabPanel key={tab.id} id={tab.id} isActive={activeTab?.id === tab.id}>
          <Text as="h2" display="block" font="title1" paddingBottom={2}>
            Panel: {tab.label}
          </Text>
          <Text as="p" display="block" font="body">
            Content for this tab.
          </Text>
        </MockTabPanel>
      ))}
    </VStack>
  );
};
