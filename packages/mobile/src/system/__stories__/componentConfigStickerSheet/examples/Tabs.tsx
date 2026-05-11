import React, { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { DefaultTabsActiveIndicator } from '../../../../tabs/DefaultTabsActiveIndicator';
import { Tabs } from '../../../../tabs/Tabs';

const tabs: TabValue<'orderBook' | 'tradeHistory' | 'orders'>[] = [
  { id: 'orderBook', label: 'Order book' },
  { id: 'tradeHistory', label: 'Trade history' },
  { id: 'orders', label: 'Orders' },
];

export const TabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number] | null>(tabs[0]);

  return (
    <Tabs
      accessibilityLabel="Market views"
      activeTab={activeTab}
      background="bg"
      gap={4}
      onChange={setActiveTab}
      tabs={tabs}
    />
  );
});
