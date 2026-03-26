import React, { memo, useEffect, useId, useMemo, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { RollingNumber } from '@coinbase/cds-web/numbers';
import { Text } from '@coinbase/cds-web/typography';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../../ChartProvider';
import { DefaultLegendEntry, Legend, type LegendEntryProps } from '../../legend';
import { Path } from '../../Path';
import { defaultBarEnterTransition, defaultTransition, getTransition } from '../../utils';
import { Bar, type BarComponentProps } from '../Bar';
import type { BarStackComponentProps } from '../BarStack';
import { DefaultBarStack } from '../DefaultBarStack';
import { PercentageBarChart, type PercentageBarChartSegment } from '../PercentageBarChart';

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

const defaultSeries: PercentageBarChartSegment[] = [
  { id: 'a', value: 99.999, label: 'Segment A', color: 'var(--color-fgPositive)' },
  { id: 'b', value: 0.001, label: 'Segment B', color: 'var(--color-fgWarning)' },
];

const ClipRevealBar = memo<BarComponentProps>(
  ({ x, y, width, height, d, fill, fillOpacity, transitions, transition, ...props }) => {
    const clipId = useId();
    const { animate } = useCartesianChartContext();
    const [hasEntered, setHasEntered] = useState(!animate);

    const enterTransition = getTransition(transitions?.enter, animate, defaultBarEnterTransition);
    const updateTransition = getTransition(
      transitions?.update !== undefined ? transitions.update : transition,
      animate,
      defaultTransition,
    );

    useEffect(() => {
      if (hasEntered) return;
      const delay = (transitions?.enter as Record<string, number>)?.delay ?? 0;
      const duration = (transitions?.enter as Record<string, number>)?.duration ?? 0.5;
      const timer = setTimeout(() => setHasEntered(true), (delay + duration) * 1000);
      return () => clearTimeout(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const needsClip = !hasEntered && enterTransition != null;

    return (
      <>
        {needsClip && (
          <defs>
            <clipPath id={clipId}>
              <motion.rect
                animate={{ width, height }}
                initial={{ width: 0, height }}
                transition={enterTransition}
                x={x}
                y={y}
              />
            </clipPath>
          </defs>
        )}
        <g clipPath={needsClip ? `url(#${clipId})` : undefined}>
          <Path
            {...props}
            animate={animate}
            clipRect={null}
            d={d}
            fill={fill}
            fillOpacity={fillOpacity}
            transitions={{ enter: null, update: updateTransition }}
          />
        </g>
      </>
    );
  },
);

const SEQUENTIAL_BAR_DURATION = 0.4;

const SequentialGrowStack = ({ children, ...props }: BarStackComponentProps) => {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const delay = index * SEQUENTIAL_BAR_DURATION;
    return React.cloneElement(child as React.ReactElement<any>, {
      transitions: {
        enter: {
          type: 'tween',
          duration: SEQUENTIAL_BAR_DURATION,
          ease: 'easeOut',
          delay,
        },
      },
    });
  });

  return (
    <DefaultBarStack {...props} transitions={{ enter: null }}>
      {modifiedChildren}
    </DefaultBarStack>
  );
};

const BuyVsSell = () => {
  const series = useMemo(
    () => [
      { id: 'buy', value: 50, color: 'var(--color-fgPositive)', legendShape: 'circle' as const },
      { id: 'sell', value: 50, color: 'var(--color-fgNegative)', legendShape: 'square' as const },
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
              {buy.value}% bought
            </Text>
          }
          seriesId={buy.id}
          shape={buy.legendShape}
        />
        <DefaultLegendEntry
          color={sell.color}
          label={
            <Text color="fgMuted" font="legal">
              {sell.value}% sold
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
        barMinSize={6}
        borderRadius={3}
        height={6}
        series={series}
        stackGap={4}
        transitions={{ enter: { type: 'tween', duration: 5 } }}
      />
      <BuyVsSellLegend />
    </VStack>
  );
};

const TaxesStyleConfirmedVsNeedReview = () => {
  const series: PercentageBarChartSegment[] = [
    {
      id: 'confirmed',
      value: 28,
      label: 'Confirmed',
      color: 'var(--color-fgPositive)',
    },
    {
      id: 'needs-review',
      value: 2,
      label: 'Needs review',
      color: 'var(--color-fgWarning)',
    },
  ];

  return (
    <VStack gap={1.5}>
      <Text color="fgMuted" font="body">
        Estimated gain: +$30,000
      </Text>
      <PercentageBarChart
        legend
        borderRadius={3}
        height={24}
        legendPosition="bottom"
        series={series}
        stackGap={0}
        testID="percentage-bar-taxes"
        width={400}
      />
    </VStack>
  );
};

const WithCTALegend = () => {
  const series: PercentageBarChartSegment[] = [
    { id: 'usc', value: 67, label: 'USC', color: 'var(--color-fgNegative)' },
    { id: 'washington', value: 33, label: 'WASH', color: 'var(--color-accentBoldPurple)' },
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
        BarComponent={ClipRevealBar}
        BarStackComponent={SequentialGrowStack}
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

const WithCTALegendLiveFeed = () => {
  const [tick, setTick] = useState(0);

  const yesValue = 55 + Math.sin(tick * 0.05) * 20;
  const noValue = 45 - Math.sin(tick * 0.05) * 20;

  const series: PercentageBarChartSegment[] = [
    { id: 'yes', value: yesValue, label: 'Yes', color: 'var(--color-fgPositive)' },
    { id: 'no', value: noValue, label: 'No', color: 'var(--color-fgNegative)' },
  ];

  const subtitles: Record<string, string> = {
    yes: '$100 → $182',
    no: '$100 → $222',
  };

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(id);
  }, []);

  const CTALegendEntry = memo(function CTALegendEntry({
    seriesId,
    label,
    color,
  }: LegendEntryProps) {
    const { series } = useCartesianChartContext();
    const seriesData = series.find((s) => s.id === seriesId);
    const percentage = (seriesData?.data as number[])?.[0] ?? 0;

    return (
      <Button
        compact
        borderRadius={200}
        flexGrow={1}
        style={{ backgroundColor: color, borderColor: color }}
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
    <VStack gap={2}>
      <Text color="fgMuted" font="label2">
        Simulated live feed (bar and CTAs reanimate)
      </Text>
      <PercentageBarChart
        BarComponent={ClipRevealBar}
        BarStackComponent={SequentialGrowStack}
        borderRadius={1000}
        height={80}
        legend={<Legend EntryComponent={CTALegendEntry} columnGap={2} paddingTop={1} />}
        legendPosition="bottom"
        series={series}
        stackGap={2}
        testID="percentage-bar-cta-legend-live"
      />
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <PercentageBarChart
          height={28}
          barMinSize={20}
          transitions={{ enter: { type: 'tween', duration: 5, delay: 1 } }}
          borderRadius={20}
          inset={4}
          series={defaultSeries}
          stackGap={2}
          testID="percentage-bar-basic"
        />
      </Example>
      <Example title="Buy vs sell (thin bar + custom legend)">
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
      <Example title="Custom colors">
        <PercentageBarChart
          height={32}
          series={[
            { id: 'blue', value: 40, color: 'var(--color-accentBoldBlue)' },
            { id: 'green', value: 35, color: 'var(--color-accentBoldGreen)' },
            { id: 'orange', value: 25, color: 'var(--color-accentBoldOrange)' },
          ]}
          testID="percentage-bar-custom-colors"
          width={400}
        />
      </Example>
      <Example title="Single segment">
        <PercentageBarChart
          animate={false}
          height={24}
          series={[{ id: 'full', value: 100, color: 'var(--color-fgPrimary)' }]}
          testID="percentage-bar-single"
          width={400}
        />
      </Example>
      <Example title="With legend">
        <PercentageBarChart
          legend
          borderRadius={3}
          height={26}
          series={[
            { id: 'buy', value: 76, label: 'Bought', color: 'var(--color-fgPositive)' },
            { id: 'sell', value: 24, label: 'Sold', color: 'var(--color-fgNegative)' },
          ]}
          testID="percentage-bar-with-legend"
          width={400}
        />
      </Example>
      <Example title="No animation">
        <PercentageBarChart
          animate={false}
          height={24}
          series={defaultSeries}
          testID="percentage-bar-no-animation"
          width={400}
        />
      </Example>
      <Example title="With percentage axis">
        <PercentageBarChart
          showXAxis
          borderRadius={6}
          height={48}
          series={[
            { id: 'btc', value: 55, label: 'BTC', color: 'var(--color-accentBoldOrange)' },
            { id: 'eth', value: 30, label: 'ETH', color: 'var(--color-accentBoldBlue)' },
            { id: 'other', value: 15, label: 'Other', color: 'var(--color-fgMuted)' },
          ]}
          testID="percentage-bar-with-axis"
          width={500}
          xAxis={{ requestedTickCount: 5 }}
        />
      </Example>
      <Example title="With percentage axis and legend">
        <PercentageBarChart
          legend
          showXAxis
          borderRadius={6}
          height={80}
          legendPosition="bottom"
          series={[
            { id: 'segment-a', value: 28, label: 'Segment A', color: 'rgb(var(--teal60))' },
            { id: 'segment-b', value: 2, label: 'Segment B', color: 'rgb(var(--chartreuse50))' },
            { id: 'segment-c', value: 10, label: 'Segment C', color: 'rgb(var(--indigo40))' },
            { id: 'segment-d', value: 21, label: 'Segment D', color: 'rgb(var(--pink20))' },
          ]}
          stackGap={1}
          testID="percentage-bar-axis-legend"
          width={500}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Each row is one category; segment values are normalized to 100% within that category.
          </Text>
        }
        title="Multi-group"
      >
        <VStack gap={1.5} padding={4} width={520}>
          <PercentageBarChart
            legend
            showXAxis
            showYAxis
            height={200}
            barMinSize={36}
            borderRadius={48}
            inset={{ left: 16, right: 0, top: 0, bottom: 0 }}
            yAxis={{
              position: 'left',
              categoryPadding: 0.1,
            }}
            series={[
              {
                id: 'q1-btc',
                value: 55,
                label: 'BTC',
                color: 'var(--color-fgWarning)',
                category: 'Q1 2025',
              },
              {
                id: 'q1-eth',
                value: 30,
                label: 'ETH',
                color: 'var(--color-accentBoldPurple)',
                category: 'Q1 2025',
              },
              {
                id: 'q1-other',
                value: 15,
                label: 'Other',
                color: 'var(--color-fgMuted)',
                category: 'Q1 2025',
              },
              {
                id: 'q2-btc',
                value: 40,
                label: 'BTC',
                color: 'var(--color-fgWarning)',
                category: 'Q2 2025',
              },
              {
                id: 'q2-eth',
                value: 45,
                label: 'ETH',
                color: 'var(--color-accentBoldPurple)',
                category: 'Q2 2025',
              },
              {
                id: 'q2-other',
                value: 15,
                label: 'Other',
                color: 'var(--color-fgMuted)',
                category: 'Q2 2025',
              },
            ]}
            stackGap={4}
            testID="percentage-bar-multi-group"
            width={500}
          />
        </VStack>
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Custom <code>Legend</code> with <code>EntryComponent</code> as CTAs; percentages read
            from chart context via <code>useCartesianChartContext()</code>.
          </Text>
        }
        title="CTA legend pattern"
      >
        <WithCTALegend />
      </Example>
      <Example title="CTA legend — simulated live feed">
        <WithCTALegendLiveFeed />
      </Example>
    </VStack>
  );
};
