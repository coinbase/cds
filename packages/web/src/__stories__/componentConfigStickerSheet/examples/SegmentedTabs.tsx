import { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs';

import { VStack } from '../../../layout';

const tabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

export const SegmentedTabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);

  // SegmentedTabs stories disable color-contrast checks in custom/story contexts

  return (
    <VStack className="no-a11y-checks">
      <SegmentedTabs
        accessibilityLabel="Switch token action views"
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={tabs}
      />
    </VStack>
  );
});
