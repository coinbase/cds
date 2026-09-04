import { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs';
import { Tabs } from '@coinbase/cds-web/tabs/Tabs';
import { Text } from '@coinbase/cds-web/typography/Text';
import { PeriodSelector } from '@coinbase/cds-web/visualizations/chart';

const navigationTabs: TabValue<'orderBook' | 'tradeHistory' | 'orders'>[] = [
  { id: 'orderBook', label: 'Order book' },
  { id: 'tradeHistory', label: 'Trade history' },
  { id: 'orders', label: 'Orders' },
];

const segmentedTabs: TabValue<'buy' | 'sell' | 'convert'>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

export const TabsExample = memo(() => {
  const [activeNavigationTab, setActiveNavigationTab] = useState<
    (typeof navigationTabs)[number] | null
  >(navigationTabs[0]);
  const [activeSegmentedTab, setActiveSegmentedTab] = useState<
    (typeof segmentedTabs)[number] | null
  >(segmentedTabs[0]);
  const [activePeriodTab, setActivePeriodTab] = useState<TabValue | null>(segmentedTabs[0]);

  return (
    <VStack className="no-a11y-checks" gap={2} width="100%">
      <VStack gap={0.5} width="100%">
        <Text font="caption">Tabs</Text>
        <Tabs
          accessibilityLabel="Market views"
          activeTab={activeNavigationTab}
          background="bg"
          gap={4}
          onChange={setActiveNavigationTab}
          tabs={navigationTabs}
        />
      </VStack>
      <VStack gap={0.5} width="100%">
        <Text font="caption">Segmented</Text>
        <SegmentedTabs
          accessibilityLabel="Switch token action views"
          activeTab={activeSegmentedTab}
          onChange={setActiveSegmentedTab}
          tabs={segmentedTabs}
        />
      </VStack>
      <VStack gap={0.5} width="100%">
        <Text font="caption">Period</Text>
        <PeriodSelector
          activeTab={activePeriodTab}
          onChange={setActivePeriodTab}
          tabs={segmentedTabs}
        />
      </VStack>
    </VStack>
  );
});
