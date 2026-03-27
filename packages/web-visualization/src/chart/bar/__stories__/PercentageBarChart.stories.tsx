import React, { memo, useEffect, useMemo, useState } from 'react';
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { RollingNumber } from '@coinbase/cds-web/numbers';
import { Text } from '@coinbase/cds-web/typography';

import { useCartesianChartContext } from '../../ChartProvider';
import {
  DefaultLegendEntry,
  DefaultLegendShape,
  Legend,
  type LegendEntryProps,
} from '../../legend';
import { PercentageBarChart, type PercentageBarSeries } from '../PercentageBarChart';

export default {
  title: 'Components/Chart/PercentageBarChart',
  component: PercentageBarChart,
  parameters: {
    a11y: {
      test: 'todo',
    },
  },
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {description}
      {children}
    </VStack>
  );
};

const defaultSeries: PercentageBarSeries[] = [
  { id: 'a', data: [99.999], label: 'Segment A', color: 'var(--color-fgPositive)' },
  { id: 'b', data: [0.001], label: 'Segment B', color: 'var(--color-fgWarning)' },
];

const multiGroupCategoryLabels = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];

const multiGroupPercentageSeries: PercentageBarSeries[] = [
  {
    id: 'btc',
    data: [55, 40, 35],
    label: 'BTC',
    color: 'var(--color-fgWarning)',
  },
  {
    id: 'eth',
    data: [30, 45, null, 100],
    label: 'ETH',
    color: 'var(--color-accentBoldPurple)',
  },
  {
    id: 'other',
    data: [15, null, 65],
    label: 'Other',
    color: 'var(--color-fgMuted)',
  },
];

const BuyVsSell = () => {
  const series = useMemo(
    () => [
      { id: 'buy', data: [50], color: 'var(--color-fgPositive)', legendShape: 'circle' as const },
      {
        id: 'sell',
        data: [50],
        color: 'var(--color-fgNegative)',
        legendShape: 'square' as const,
      },
    ],
    [],
  );

  const BuyVsSellLegend = memo(function BuyVsSellLegend() {
    const [buy, sell] = series;
    return (
      <HStack gap={1} justifyContent="space-between">
        <DefaultLegendEntry
          color={buy.color}
          label={
            <Text color="fgMuted" font="legal">
              {buy.data[0]}% bought
            </Text>
          }
          seriesId={buy.id}
          shape={buy.legendShape}
        />
        <DefaultLegendEntry
          color={sell.color}
          label={
            <Text color="fgMuted" font="legal">
              {sell.data[0]}% sold
            </Text>
          }
          seriesId={sell.id}
          shape={sell.legendShape}
        />
      </HStack>
    );
  });

  return (
    <VStack gap={1.5} padding={4}>
      <PercentageBarChart
        barMinSize={8}
        borderRadius={24}
        height={8}
        inset={0}
        series={series}
        stackGap={4}
        transitions={{ enter: { type: 'tween', duration: 5, delay: 1 } }}
      />
      <BuyVsSellLegend />
    </VStack>
  );
};

const TaxesStyleConfirmedVsNeedReview = () => {
  const series: PercentageBarSeries[] = [
    {
      id: 'confirmed',
      data: [28],
      label: 'Confirmed',
      color: 'var(--color-fgPositive)',
    },
    {
      id: 'needs-review',
      data: [2],
      label: 'Needs review',
      color: 'var(--color-fgWarning)',
    },
  ];

  return (
    <VStack gap={2} paddingX={2}>
      <VStack gap={0.5}>
        <Text color="fgMuted" font="label2">
          Estimated gain
        </Text>
        <Text font="title2">+$30,000</Text>
      </VStack>
      <PercentageBarChart height={24} series={series} stackGap={4} testID="percentage-bar-taxes" />
      <VStack>
        <HStack alignItems="center" gap={1} justifyContent="space-between">
          <HStack alignItems="center" gap={1}>
            <DefaultLegendShape color="var(--color-fgPositive)" shape="squircle" />
            <Text font="label1">Confirmed</Text>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <Text font="body">+$28,000</Text>
            <IconButton
              compact
              transparent
              accessibilityLabel="Confirmed details"
              name="caretRight"
              variant="foregroundMuted"
            />
          </HStack>
        </HStack>
        <HStack alignItems="center" gap={1} justifyContent="space-between">
          <HStack alignItems="center" gap={1}>
            <DefaultLegendShape color="var(--color-fgWarning)" shape="squircle" />
            <Text font="label1">Needs review</Text>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <VStack alignItems="flex-end" gap={0}>
              <Text font="body">Up to $2,000</Text>
              <Text color="fgMuted" font="body">
                11 transfers
              </Text>
            </VStack>
            <IconButton
              compact
              transparent
              accessibilityLabel="Needs review details"
              name="caretRight"
              variant="foregroundMuted"
            />
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

const VerticalLayoutExample = () => (
  <PercentageBarChart
    legend
    showXAxis
    showYAxis
    barMinSize={13}
    borderRadius={48}
    height={200}
    layout="vertical"
    legendPosition="right"
    series={multiGroupPercentageSeries}
    stackGap={1}
    testID="percentage-bar-vertical"
    width={360}
    xAxis={{
      categoryPadding: 0.8,
      data: multiGroupCategoryLabels,
      position: 'bottom',
      showTickMarks: true,
    }}
    yAxis={{
      position: 'left',
      requestedTickCount: 5,
      showGrid: true,
      showLine: true,
      showTickMarks: true,
    }}
  />
);

const WithCTALegend = () => {
  const series: PercentageBarSeries[] = [
    { id: 'usc', data: [67], label: 'USC', color: 'var(--color-fgNegative)' },
    { id: 'washington', data: [33], label: 'WASH', color: 'var(--color-accentBoldPurple)' },
  ];

  const subtitles: Record<string, string> = {
    usc: '$100 → $149',
    washington: '$100 → $313',
  };

  const CTALegendEntry = memo(function CTALegendEntry({
    seriesId,
    label,
    color,
  }: LegendEntryProps) {
    const { series: contextSeries } = useCartesianChartContext();
    const seriesData = contextSeries.find((s) => s.id === seriesId);
    const percentage = (seriesData?.data as number[])?.[0] ?? 0;

    return (
      <Button
        block
        compact
        borderRadius={200}
        onClick={() => console.log('Selected', seriesId)}
        style={{ flex: 1, backgroundColor: color, borderColor: color }}
      >
        <VStack alignItems="center" gap={0.25}>
          <HStack alignItems="center" gap={0.5}>
            <Text color="fgInverse" font="label1">
              {label} {'· '}
            </Text>
            <RollingNumber
              color="fgInverse"
              font="label1"
              format={{ style: 'percent', maximumFractionDigits: 0 }}
              value={percentage / 100}
            />
          </HStack>
          {subtitles[seriesId] != null && (
            <Text color="fgInverse" font="legal">
              {subtitles[seriesId]}
            </Text>
          )}
        </VStack>
      </Button>
    );
  });

  return (
    <VStack gap={2} width={400}>
      <PercentageBarChart
        borderRadius={6}
        height={80}
        legend={<Legend EntryComponent={CTALegendEntry} columnGap={2} paddingTop={1} />}
        legendPosition="bottom"
        series={series}
        testID="percentage-bar-cta-legend"
      />
    </VStack>
  );
};

/** Fake "projected value" copy: scales with live % so subtitles stay in sync with the bar. */
const liveFeedSubtitleBase = 100;
const liveFeedYesDollarsPerPercentPoint = (182 - liveFeedSubtitleBase) / 50;
const liveFeedNoDollarsPerPercentPoint = (222 - liveFeedSubtitleBase) / 50;

function getLiveFeedProjectedValue(seriesId: string, percentage: number): number | undefined {
  if (seriesId === 'yes') {
    return Math.round(liveFeedSubtitleBase + percentage * liveFeedYesDollarsPerPercentPoint);
  }
  if (seriesId === 'no') {
    return Math.round(liveFeedSubtitleBase + percentage * liveFeedNoDollarsPerPercentPoint);
  }
  return undefined;
}

const liveFeedCurrencyFormat = {
  style: 'currency' as const,
  currency: 'USD',
  maximumFractionDigits: 0,
};

const LiveFeedCTALegendEntry = memo(function LiveFeedCTALegendEntry({
  seriesId,
  label,
  color,
}: LegendEntryProps) {
  const { series } = useCartesianChartContext();
  const seriesData = series.find((s) => s.id === seriesId);
  const percentage = (seriesData?.data as number[])?.[0] ?? 0;
  const projectedValue = getLiveFeedProjectedValue(seriesId, percentage);

  return (
    <Button
      compact
      borderRadius={200}
      style={{ backgroundColor: color, borderColor: color }}
      width="25%"
    >
      <VStack alignItems="center" gap={0.25}>
        <HStack alignItems="center" gap={0.5}>
          <Text color="fgInverse" font="label1">
            {label} {'· '}
          </Text>
          <RollingNumber
            color="fgInverse"
            font="label1"
            format={{ style: 'percent', maximumFractionDigits: 0 }}
            value={percentage / 100}
          />
        </HStack>
        {projectedValue != null && (
          <HStack alignItems="center" gap={0.5}>
            <Text color="fgInverse" font="legal">
              ${liveFeedSubtitleBase} →
            </Text>
            <RollingNumber
              color="fgInverse"
              font="legal"
              format={liveFeedCurrencyFormat}
              value={projectedValue}
            />
          </HStack>
        )}
      </VStack>
    </Button>
  );
});

const WithCTALegendLiveFeed = () => {
  const [tick, setTick] = useState(0);

  const yesValue = 50 + Math.sin(tick * 0.05) * 49;
  const noValue = 50 - Math.sin(tick * 0.05) * 49;

  const series: PercentageBarSeries[] = [
    { id: 'yes', data: [yesValue], label: 'Yes', color: 'var(--color-fgPositive)' },
    { id: 'no', data: [noValue], label: 'No', color: 'var(--color-fgNegative)' },
  ];

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 4), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <PercentageBarChart
      barMinSize={16}
      borderRadius={1000}
      height={64}
      legend={
        <Legend
          EntryComponent={LiveFeedCTALegendEntry}
          justifyContent="space-evenly"
          paddingTop={1}
        />
      }
      legendPosition="bottom"
      series={series}
      stackGap={2}
      testID="percentage-bar-cta-legend-live"
    />
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <PercentageBarChart
          barMinSize={16}
          borderRadius={20}
          height={16}
          inset={0}
          series={defaultSeries}
          stackGap={2}
          testID="percentage-bar-basic"
          transitions={{ enter: { type: 'tween', duration: 5, delay: 1 } }}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            The legend is rendered outside of the chart area.
          </Text>
        }
        title="Buy vs sell"
      >
        <BuyVsSell />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Taxes-style copy with confirmed vs needs review segments.
          </Text>
        }
        title="Taxes style: confirmed vs needs review"
      >
        <TaxesStyleConfirmedVsNeedReview />
      </Example>
      <Example title="Single segment">
        <PercentageBarChart
          height={24}
          series={[{ id: 'full', data: [97], color: 'var(--color-fgPrimary)' }]}
          testID="percentage-bar-single"
          width={400}
        />
      </Example>
      <Example title="With percentage axis and legend">
        <PercentageBarChart
          legend
          showXAxis
          barMinSize={24}
          borderRadius={24}
          height={80}
          legendPosition="bottom"
          series={[
            { id: 'segment-a', data: [28], label: 'Segment A', color: 'rgb(var(--teal60))' },
            {
              id: 'segment-b',
              data: [2],
              label: 'Segment B',
              color: 'rgb(var(--chartreuse50))',
            },
            { id: 'segment-c', data: [10], label: 'Segment C', color: 'rgb(var(--indigo40))' },
            { id: 'segment-d', data: [21], label: 'Segment D', color: 'rgb(var(--pink20))' },
          ]}
          stackGap={1}
          testID="percentage-bar-axis-legend"
          width={500}
        />
      </Example>
      <Example title="Multi-group">
        <PercentageBarChart
          legend
          showXAxis
          showYAxis
          barMinSize={13}
          borderRadius={48}
          height={160}
          inset={{ left: 24, right: 0, top: 0, bottom: 0 }}
          series={multiGroupPercentageSeries}
          stackGap={4}
          testID="percentage-bar-multi-group"
          width={600}
          xAxis={{
            showTickMarks: true,
          }}
          yAxis={{
            data: multiGroupCategoryLabels,
            position: 'left',
            categoryPadding: 0.5,
          }}
        />
      </Example>
      <Example title="Multi-group (vertical layout)">
        <VerticalLayoutExample />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            The legend is rendered inside of the chart area.
          </Text>
        }
        title="CTA legend pattern"
      >
        <WithCTALegend />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Bars and legend reanimate when data changes
          </Text>
        }
        title="CTA legend — simulated live feed"
      >
        <WithCTALegendLiveFeed />
      </Example>
    </VStack>
  );
};
