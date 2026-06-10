import React, { useCallback, useState } from 'react';
import { VStack } from '@coinbase/cds-mobile/layout';
import {
  LineChart,
  PeriodSelector,
  type PeriodSelectorProps,
  Scrubber,
} from '@coinbase/cds-mobile/visualizations/chart';

type Tab = Parameters<NonNullable<PeriodSelectorProps['onChange']>>[0] & object;

const TABS: Tab[] = [
  { id: '1H', label: '1H' },
  { id: '1D', label: '1D' },
  { id: '1W', label: '1W' },
  { id: '1M', label: '1M' },
  { id: '1Y', label: '1Y' },
  { id: 'YTD', label: 'YTD' },
  { id: 'All', label: 'All' },
];

const SAMPLE_DATA = [
  98.2, 98.6, 99.1, 98.8, 99.4, 99.0, 99.7, 100.2, 99.9, 100.5, 100.1, 100.8, 101.2, 100.9, 101.5,
  101.1, 101.8, 102.3, 102.0, 102.7,
];

export function PriceChart() {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[1]);

  const onPeriodChange = useCallback((tab: Tab | null) => {
    if (tab) setActiveTab(tab);
  }, []);

  const getScrubberAccessibilityLabel = useCallback((index: number) => `Point ${index + 1}`, []);

  return (
    <VStack gap={0}>
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel="Price chart"
        areaType="dotted"
        curve="monotone"
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={220}
        inset={{ top: 16, left: 0, right: 16, bottom: 0 }}
        series={[{ id: 'price', data: SAMPLE_DATA }]}
      >
        <Scrubber idlePulse />
      </LineChart>
      <PeriodSelector
        activeBackground="bgAlternate"
        activeColor="fg"
        activeTab={activeTab}
        onChange={onPeriodChange}
        tabs={TABS}
      />
    </VStack>
  );
}
