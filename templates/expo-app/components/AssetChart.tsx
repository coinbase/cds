import React, { memo, useState, useCallback, useMemo, forwardRef } from 'react';

import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { useTheme } from '@coinbase/cds-mobile';
import { VStack } from '@coinbase/cds-mobile/layout';
import { RemoteImage } from '@coinbase/cds-mobile/media';
import { Text } from '@coinbase/cds-mobile/typography';
import { SectionHeader } from '@coinbase/cds-mobile/section-header';
import { SegmentedTab } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import {
  ChartBridgeProvider,
  LineChart,
  PeriodSelector,
  PeriodSelectorActiveIndicator,
} from '@coinbase/cds-mobile-visualization';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';

const btcColor = assets.btc.color;

const tabs = [
  { id: 'hour', label: '1H' },
  { id: 'day', label: '1D' },
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1Y' },
  { id: 'all', label: 'All' },
];

const BTCActiveIndicator = memo((props: any) => {
  return <PeriodSelectorActiveIndicator {...props} background={`${btcColor}1A`} />;
});

const BTCTab = memo(
  forwardRef(({ label, ...props }: any, ref: any) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab?.id === props.id;
    const theme = useTheme();

    const wrappedLabel =
      typeof label === 'string' ? (
        <Text font="label1" dangerouslySetColor={isActive ? btcColor : theme.color.fg}>
          {label}
        </Text>
      ) : (
        label
      );

    return <SegmentedTab ref={ref} label={wrappedLabel} {...props} />;
  }),
);

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatPrice(price: number) {
  return priceFormatter.format(price);
}

export const AssetChart = memo(function AssetChart() {
  const [timePeriod, setTimePeriod] = useState<TabValue>(tabs[0]);

  const sparklineTimePeriodData = useMemo(() => {
    return sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData];
  }, [timePeriod]);

  const sparklineValues = useMemo(() => {
    return sparklineTimePeriodData.map((d) => d.value);
  }, [sparklineTimePeriodData]);

  const currentPrice =
    sparklineInteractiveData.hour[sparklineInteractiveData.hour.length - 1].value;

  const onPeriodChange = useCallback((period: TabValue | null) => {
    setTimePeriod(period || tabs[0]);
  }, []);

  return (
    <ChartBridgeProvider>
      <VStack gap={2}>
        <SectionHeader
          balance={<Text font="title2">{formatPrice(currentPrice)}</Text>}
          end={
            <VStack justifyContent="center">
              <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
            </VStack>
          }
          title={<Text font="title1">Bitcoin</Text>}
        />
        <LineChart
          showArea
          areaType="dotted"
          height={200}
          inset={{ top: 52 }}
          series={[
            {
              id: 'btc',
              data: sparklineValues,
              color: btcColor,
            },
          ]}
        />
        <PeriodSelector
          TabComponent={BTCTab}
          TabsActiveIndicatorComponent={BTCActiveIndicator}
          activeTab={timePeriod}
          onChange={onPeriodChange}
          tabs={tabs}
        />
      </VStack>
    </ChartBridgeProvider>
  );
});
