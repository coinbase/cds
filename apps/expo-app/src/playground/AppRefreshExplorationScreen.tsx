import React, { memo, useCallback, useMemo, useState } from 'react';
import { Accordion, AccordionItem } from '@coinbase/cds-mobile/accordion';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { HStack, VStack } from '@coinbase/cds-mobile/layout';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';
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

function ComponentExploration({
  componentName,
  children,
}: {
  componentName: string;
  children: React.ReactNode;
}) {
  return (
    <VStack gap={2}>
      <Text font="headline">{componentName}</Text>
      {children}
    </VStack>
  );
}

function PriceChart() {
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

export const AppRefreshExplorationScreen = memo(() => {
  const config: ComponentConfig = useMemo(() => ({}), []);

  return (
    <ComponentConfigProvider value={config}>
      <VStack background="bg" flexGrow={1} gap={4} paddingX={2}>
        <ComponentExploration componentName="Accordion">
          <Accordion
            style={{
              borderWidth: 1,
              borderColor: '#EEF0F3',
              borderRadius: '4%',
              overflow: 'hidden',
            }}
          >
            <AccordionItem
              itemKey="1"
              styles={{ panel: { borderTopWidth: 1, borderColor: '#EEF0F3' } }}
              subtitle="Item 1 subtitle"
              title="Item 1"
            >
              <HStack justifyContent="space-between">
                <Text font="body">TSLA $410 Call 4/20</Text>
                <Text font="body">
                  $600.00 (
                  <Text color="fgPositive" font="body">
                    ↗ 2.12%
                  </Text>
                  )
                </Text>
              </HStack>
            </AccordionItem>
          </Accordion>
        </ComponentExploration>
        <ComponentExploration componentName="Line Chart">
          <PriceChart />
        </ComponentExploration>
      </VStack>
    </ComponentConfigProvider>
  );
});
