import React, { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { PeriodSelector } from '@coinbase/cds-mobile/visualizations/chart';

import { VStack } from '../../../../layout';
import { SegmentedTabs } from '../../../../tabs/SegmentedTabs';
import { Tabs } from '../../../../tabs/Tabs';
import { Text } from '../../../../typography/Text';

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
    <VStack gap={2} width="100%">
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
