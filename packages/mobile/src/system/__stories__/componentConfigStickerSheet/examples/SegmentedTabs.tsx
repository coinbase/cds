import React, { memo, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { HStack } from '../../../../layout';
import { SegmentedTabs } from '../../../../tabs/SegmentedTabs';

import { segmentedTabs } from './constants';

export const SegmentedTabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue<'buy' | 'sell' | 'convert'> | null>(
    segmentedTabs[0],
  );

  return <SegmentedTabs activeTab={activeTab} onChange={setActiveTab} tabs={segmentedTabs} />;
});
