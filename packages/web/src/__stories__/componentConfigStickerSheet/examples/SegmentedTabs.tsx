import { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs';

const tabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

export const SegmentedTabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <SegmentedTabs
      accessibilityLabel="Switch token action views"
      activeTab={activeTab}
      onChange={setActiveTab}
      tabs={tabs}
    />
  );
});
