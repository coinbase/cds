import { useCallback, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { VStack } from '@coinbase/cds-mobile/layout';
import { SegmentedTabs } from '@coinbase/cds-mobile/tabs';

type TabId = 'buy' | 'sell' | 'convert';

const tabs: TabValue<TabId>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

export function SegmentedTabsExploration() {
  const [activeTab, setActiveTab] = useState<TabValue<TabId> | null>(tabs[0] ?? null);
  const handleChange = useCallback((tab: TabValue<TabId> | null) => setActiveTab(tab), []);

  return (
    <VStack gap={2}>
      <SegmentedTabs
        equalWidth
        accessibilityLabel="Switch transaction type equal width"
        activeBackground="bg"
        activeColor="fg"
        activeTab={activeTab}
        onChange={handleChange}
        padding={0.75}
        tabs={tabs}
      />
    </VStack>
  );
}
