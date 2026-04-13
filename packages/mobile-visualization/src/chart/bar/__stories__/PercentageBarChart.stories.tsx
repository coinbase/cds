import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { Switch } from '@coinbase/cds-mobile/controls';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { RollingNumber } from '@coinbase/cds-mobile/numbers';
import { Text } from '@coinbase/cds-mobile/typography';
import { Group, Path as SkiaPath, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../../ChartProvider';
import {
  DefaultLegendEntry,
  DefaultLegendShape,
  Legend,
  type LegendEntryProps,
} from '../../legend';
import { Path } from '../../Path';
import { getBarPath } from '../../utils';
import { getDottedAreaPath } from '../../utils/path';
import type { BarComponentProps } from '../Bar';
import { DefaultBar } from '../DefaultBar';
import { PercentageBarChart, type PercentageBarSeries } from '../PercentageBarChart';

const DOTTED_BAR_PATTERN_SIZE = 4;
const DOTTED_BAR_DOT_SIZE = 1;
const DOTTED_BAR_OUTLINE_STROKE_WIDTH = 2;

const DottedBarComponent = memo(function DottedBarComponent(props: BarComponentProps) {
  const { x, y, width, height, fill, d } = props;

  const dottedPath = useMemo(
    () => getDottedAreaPath({ x, y, width, height }, DOTTED_BAR_PATTERN_SIZE, DOTTED_BAR_DOT_SIZE),
    [x, y, width, height],
  );

  const barClipPath = useMemo(
    () => (d ? (Skia.Path.MakeFromSVGString(d) ?? undefined) : undefined),
    [d],
  );

  const dotsSkiaPath = useMemo(
    () => (dottedPath ? (Skia.Path.MakeFromSVGString(dottedPath) ?? undefined) : undefined),
    [dottedPath],
  );

  return (
    <>
      <Group clip={barClipPath}>
        {dotsSkiaPath && fill ? <SkiaPath color={fill} path={dotsSkiaPath} style="fill" /> : null}
      </Group>
      <DefaultBar
        {...props}
        fill={undefined}
        stroke={fill}
        strokeWidth={DOTTED_BAR_OUTLINE_STROKE_WIDTH}
      />
    </>
  );
});

/**
 * Builds an SVG path for a horizontal bar segment with a pill cap on one end
 * and a slanted straight edge on the other. The two segments' inner edges
 * are parallel, producing a parallelogram-shaped gap between them.
 */
function getSlantedHorizontalBarPath(
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number,
  pillLeft: boolean,
  pillRight: boolean,
  slantDx: number,
): string | undefined {
  if (width <= 0 || height <= 0) return undefined;
  if (pillLeft === pillRight) return undefined;

  const r = Math.min(borderRadius, height / 2, width / 2);
  const s = Math.min(Math.max(0, slantDx), width - r * 2);

  const x0 = x;
  const x1 = x + width;
  const y0 = y;
  const y1 = y + height;

  // Pill left, slanted right
  if (pillLeft && !pillRight) {
    return [
      `M ${x0 + r} ${y0}`,
      `L ${x1} ${y0}`,
      `L ${x1 - s} ${y1}`,
      `L ${x0 + r} ${y1}`,
      `A ${r} ${r} 0 0 1 ${x0} ${y1 - r}`,
      `L ${x0} ${y0 + r}`,
      `A ${r} ${r} 0 0 1 ${x0 + r} ${y0}`,
      'Z',
    ].join(' ');
  }

  // Slanted left, pill right
  if (!pillLeft && pillRight) {
    return [
      `M ${x0 + s} ${y0}`,
      `L ${x1 - r} ${y0}`,
      `A ${r} ${r} 0 0 1 ${x1} ${y0 + r}`,
      `L ${x1} ${y1 - r}`,
      `A ${r} ${r} 0 0 1 ${x1 - r} ${y1}`,
      `L ${x0} ${y1}`,
      'Z',
    ].join(' ');
  }

  return undefined;
}

const SLANT_DX = 8;
const BASELINE_THRESHOLD = 1;

const SlantedStackBar = memo(function SlantedStackBar(props: BarComponentProps) {
  const { layout } = useCartesianChartContext();
  const {
    x,
    y,
    width,
    height,
    borderRadius = 4,
    roundTop,
    roundBottom,
    d: defaultD,
    fill,
    fillOpacity,
    dataX,
    origin: _origin,
    dataY: _dataY,
    seriesId: _seriesId,
    minSize: _minSize,
    ...rest
  } = props;

  const d = useMemo(() => {
    if (layout !== 'horizontal') {
      return (
        defaultD ?? getBarPath(x, y, width, height, borderRadius, !!roundTop, !!roundBottom, layout)
      );
    }

    const isLeftmost = Array.isArray(dataX) && Math.abs(dataX[0]) < BASELINE_THRESHOLD;

    return (
      getSlantedHorizontalBarPath(
        x,
        y,
        width,
        height,
        borderRadius,
        isLeftmost,
        !isLeftmost,
        SLANT_DX,
      ) ??
      defaultD ??
      getBarPath(x, y, width, height, borderRadius, !!roundTop, !!roundBottom, layout)
    );
  }, [layout, defaultD, dataX, x, y, width, height, borderRadius, roundTop, roundBottom]);

  if (!d) return null;

  return (
    <Path
      {...rest}
      animate
      clipPath={null}
      d={d}
      fill={fill}
      fillOpacity={fillOpacity}
      transitions={props.transitions}
    />
  );
});

const Basics = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      height={16}
      series={[
        { id: 'a', data: 70, label: 'Segment A', color: theme.color.fgPositive },
        { id: 'b', data: 45, label: 'Segment B', color: theme.color.fgNegative },
      ]}
    />
  );
};

const StackGap = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      height={20}
      series={[
        { id: 'a', data: 40, label: 'A', color: theme.color.fgPositive },
        { id: 'b', data: 35, label: 'B', color: theme.color.fgWarning },
        { id: 'c', data: 20, label: 'C', color: theme.color.accentBoldPurple },
      ]}
      stackGap={6}
    />
  );
};

const BorderRadius = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      borderRadius={1000}
      height={28}
      series={[
        { id: 'a', data: 45, color: `rgb(${theme.spectrum.purple30})`, label: 'A' },
        { id: 'b', data: 30, color: `rgb(${theme.spectrum.blue30})`, label: 'B' },
        { id: 'c', data: 20, color: `rgb(${theme.spectrum.teal30})`, label: 'C' },
      ]}
      stackGap={2}
    />
  );
};

const DataExample = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      showXAxis
      showYAxis
      barMinSize={12}
      borderRadius={8}
      height={100}
      series={[
        { id: 'a', data: [40, null, 20], label: 'A', color: theme.color.fgPositive },
        { id: 'b', data: [-10, 60, 30], label: 'B', color: theme.color.fgWarning },
        { id: 'c', data: [null, 50], label: 'C', color: theme.color.fgMuted },
        { id: 'd', data: 45, label: 'D', color: theme.color.fgNegative },
      ]}
      stackGap={2}
      xAxis={{ showTickMarks: true }}
      yAxis={{
        data: ['Q1', 'Q2', 'Q3'],
        position: 'left',
        categoryPadding: 0.45,
      }}
    />
  );
};

const BarStackSpacing = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      legend
      showXAxis
      showYAxis
      barMinSize={18}
      borderRadius={24}
      height={240}
      series={[
        { id: 'a', data: [55, 40, 35], label: 'A', color: theme.color.fgWarning },
        { id: 'b', data: [30, 45, 25], label: 'B', color: theme.color.accentBoldPurple },
        { id: 'c', data: [15, 15, 40], label: 'C', color: theme.color.fgMuted },
      ]}
      stackGap={4}
      xAxis={{ showTickMarks: true }}
      yAxis={{
        data: ['Q1', 'Q2', 'Q3'],
        position: 'left',
        categoryPadding: 0.7,
      }}
    />
  );
};

const MinimumBarSize = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      barMinSize={16}
      height={16}
      series={[
        { id: 'a', data: 99, label: 'Segment A', color: theme.color.fgPositive },
        { id: 'b', data: 0.001, label: 'Segment B', color: theme.color.fgNegative },
      ]}
      stackGap={2}
    />
  );
};

const TaxesStyleConfirmedVsNeedReview = () => {
  const theme = useTheme();

  const series: PercentageBarSeries[] = [
    {
      id: 'confirmed',
      data: 28,
      label: 'Confirmed',
      color: theme.color.fgPositive,
    },
    {
      id: 'needs-review',
      data: 2,
      label: 'Needs review',
      color: theme.color.fgWarning,
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
      <PercentageBarChart height={24} series={series} stackGap={4} />
      <VStack>
        <HStack alignItems="center" gap={1} justifyContent="space-between">
          <HStack alignItems="center" gap={1}>
            <DefaultLegendShape color={theme.color.fgPositive} shape="squircle" />
            <Text font="label1">Confirmed</Text>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <Text font="body">+$28,000</Text>
            <IconButton
              compact
              transparent
              accessibilityLabel="Confirmed details"
              name="caretRight"
              onPress={() => {}}
              variant="foregroundMuted"
            />
          </HStack>
        </HStack>
        <HStack alignItems="center" gap={1} justifyContent="space-between">
          <HStack alignItems="center" gap={1}>
            <DefaultLegendShape color={theme.color.fgWarning} shape="squircle" />
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
              onPress={() => {}}
              variant="foregroundMuted"
            />
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

const DottedBarFirstSeriesOnly = () => {
  const theme = useTheme();

  const dottedBarSeries = useMemo<PercentageBarSeries[]>(
    () => [
      {
        id: 'segment-a',
        data: 60,
        label: 'Segment A',
        color: `rgb(${theme.spectrum.teal60})`,
        BarComponent: DottedBarComponent,
      },
      {
        id: 'segment-b',
        data: 30,
        label: 'Segment B',
        color: `rgb(${theme.spectrum.chartreuse50})`,
      },
      { id: 'segment-c', data: 10, label: 'Segment C', color: `rgb(${theme.spectrum.indigo40})` },
    ],
    [theme],
  );

  return <PercentageBarChart height={24} series={dottedBarSeries} stackGap={4} />;
};

const DottedBarChartLevel = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      BarComponent={DottedBarComponent}
      height={24}
      series={[
        { id: 'segment-a', data: 60, label: 'Segment A', color: `rgb(${theme.spectrum.teal60})` },
        {
          id: 'segment-b',
          data: 30,
          label: 'Segment B',
          color: `rgb(${theme.spectrum.chartreuse50})`,
        },
        { id: 'segment-c', data: 10, label: 'Segment C', color: `rgb(${theme.spectrum.indigo40})` },
      ]}
      stackGap={4}
    />
  );
};

function randomShares(): number[] {
  const raw = [Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1];
  const sum = raw[0] + raw[1] + raw[2];
  return raw.map((v) => Math.max(1, Math.round((v / sum) * 100)));
}

function generateAnimationData(): number[][] {
  return [randomShares(), randomShares(), randomShares()];
}

const Animations = () => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(true);
  const [data, setData] = useState<number[][]>(generateAnimationData);

  useEffect(() => {
    const id = setInterval(() => setData(generateAnimationData()), 800);
    return () => clearInterval(id);
  }, []);

  const series = useMemo<PercentageBarSeries[]>(
    () => [
      { id: 'btc', data: data.map((q) => q[0]), label: 'BTC', color: assets.btc.color },
      { id: 'eth', data: data.map((q) => q[1]), label: 'ETH', color: assets.eth.color },
      { id: 'other', data: data.map((q) => q[2]), label: 'Other', color: theme.color.fgMuted },
    ],
    [data, theme],
  );

  return (
    <VStack gap={2}>
      <HStack alignItems="center" gap={1} justifyContent="flex-end">
        <Switch checked={animate} onChange={() => setAnimate((v) => !v)}>
          Animate
        </Switch>
      </HStack>
      <PercentageBarChart
        legend
        showXAxis
        showYAxis
        animate={animate}
        barMinSize={14}
        borderRadius={48}
        height={220}
        inset={{ left: 24, right: 0, top: 0, bottom: 0 }}
        legendPosition="top"
        series={series}
        stackGap={2}
        transitions={{
          enter: { type: 'timing', duration: 400, staggerDelay: 0.2 },
          update: { type: 'timing', duration: 300 },
        }}
        xAxis={{
          showTickMarks: true,
          tickLabelFormatter: (value) => `${value}%`,
        }}
        yAxis={{
          categoryPadding: 0.75,
          data: ['Q1 2025', 'Q2 2025', 'Q3 2025'],
          position: 'left',
          requestedTickCount: 5,
          showTickMarks: true,
        }}
      />
    </VStack>
  );
};

/** Fake "projected value" copy: scales with live % so subtitles stay in sync with the bar. */
const liveFeedSubtitleBase = 100;
const liveFeedYesDollarsPerPercentPoint = (182 - liveFeedSubtitleBase) / 50;
const liveFeedNoDollarsPerPercentPoint = (222 - liveFeedSubtitleBase) / 50;

function getLiveFeedProjectedValue(seriesId: string, percentage: number): number | undefined {
  const inverseShare = 100 - percentage;
  if (seriesId === 'yes') {
    return Math.round(liveFeedSubtitleBase + inverseShare * liveFeedYesDollarsPerPercentPoint);
  }
  if (seriesId === 'no') {
    return Math.round(liveFeedSubtitleBase + inverseShare * liveFeedNoDollarsPerPercentPoint);
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
  const { series: contextSeries } = useCartesianChartContext();
  const seriesData = contextSeries.find((s) => s.id === seriesId);
  const percentage = (seriesData?.data as number[])?.[0] ?? 0;
  const projectedValue = getLiveFeedProjectedValue(seriesId, percentage);

  return (
    <Box paddingX={2} paddingY={1} style={{ backgroundColor: color, borderRadius: 200 }}>
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
    </Box>
  );
});

const LiveUpdatingData = () => {
  const theme = useTheme();
  const [tick, setTick] = useState(0);

  const yesValue = 50 + Math.sin(tick * 0.05) * 49;
  const noValue = 50 - Math.sin(tick * 0.05) * 49;

  const series: PercentageBarSeries[] = [
    { id: 'yes', data: yesValue, label: 'Yes', color: theme.color.fgPositive },
    { id: 'no', data: noValue, label: 'No', color: theme.color.fgNegative },
  ];

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 4), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <PercentageBarChart
      barMinSize={16}
      borderRadius={1000}
      height={78}
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
    />
  );
};

const VerticalMix = () => {
  const theme = useTheme();

  const series: PercentageBarSeries[] = [
    {
      id: 'btc',
      data: [55, 52, 48, 45, 50, 58, 62, 57, 53, 49, 44, 46],
      label: 'BTC',
      color: assets.btc.color,
    },
    {
      id: 'eth',
      data: [30, 33, 35, 38, 32, 27, 25, 29, 34, 37, 40, 38],
      label: 'ETH',
      color: assets.eth.color,
    },
    {
      id: 'other',
      data: [15, 15, 17, 17, 18, 15, 13, 14, 13, 14, 16, 16],
      label: 'Other',
      color: theme.color.fgMuted,
    },
  ];

  return (
    <PercentageBarChart
      legend
      showXAxis
      showYAxis
      barMinSize={28}
      borderRadius={48}
      height={240}
      layout="vertical"
      legendPosition="top"
      series={series}
      stackGap={1}
      xAxis={{
        categoryPadding: 0.5,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        position: 'bottom',
        showTickMarks: true,
      }}
    />
  );
};

const BuyVsSellLegend = memo(function BuyVsSellLegend({
  series,
}: {
  series: PercentageBarSeries[];
}) {
  const [buy, sell] = series;
  return (
    <HStack gap={1} justifyContent="space-between">
      <DefaultLegendEntry
        color={buy.color}
        label={
          <Text color="fgMuted" font="legal">
            {buy.data}% bought
          </Text>
        }
        seriesId={buy.id}
        shape={buy.legendShape as 'circle'}
      />
      <DefaultLegendEntry
        color={sell.color}
        label={
          <Text color="fgMuted" font="legal">
            {sell.data}% sold
          </Text>
        }
        seriesId={sell.id}
        shape={sell.legendShape as 'square'}
      />
    </HStack>
  );
});

const BuyVsSell = () => {
  const theme = useTheme();

  const buySellSeries = useMemo<PercentageBarSeries[]>(
    () => [
      { id: 'buy', data: 76, color: theme.color.fgPositive, legendShape: 'circle' },
      { id: 'sell', data: 24, color: theme.color.fgNegative, legendShape: 'square' },
    ],
    [theme],
  );

  return (
    <VStack gap={1.5}>
      <PercentageBarChart
        barMinSize={8}
        borderRadius={24}
        height={8}
        series={buySellSeries}
        stackGap={4}
      />
      <BuyVsSellLegend series={buySellSeries} />
    </VStack>
  );
};

const SlantedStackGap = () => {
  const theme = useTheme();
  return (
    <PercentageBarChart
      BarComponent={SlantedStackBar}
      animate={false}
      barMinSize={12}
      borderRadius={24}
      height={12}
      series={[
        { id: 'team-a', data: 40, color: `rgb(${theme.spectrum.teal60})` },
        { id: 'team-b', data: 61, color: theme.color.accentBoldBlue },
      ]}
    />
  );
};

type ExampleItem = {
  title: string;
  component: React.ReactNode;
};

function ExampleNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      { title: 'Basics', component: <Basics /> },
      { title: 'Stack Gap', component: <StackGap /> },
      { title: 'Border Radius', component: <BorderRadius /> },
      { title: 'Sparse Data', component: <DataExample /> },
      { title: 'Bar Stack Spacing', component: <BarStackSpacing /> },
      { title: 'Minimum Bar Size', component: <MinimumBarSize /> },
      {
        title: 'Taxes style',
        component: <TaxesStyleConfirmedVsNeedReview />,
      },
      { title: 'Slanted stack gap', component: <SlantedStackGap /> },
      { title: 'Dotted bar (first series only)', component: <DottedBarFirstSeriesOnly /> },
      { title: 'Dotted bar (chart-level)', component: <DottedBarChartLevel /> },
      { title: 'Animations', component: <Animations /> },
      { title: 'Live-updating Data', component: <LiveUpdatingData /> },
      { title: 'Vertical Mix', component: <VerticalMix /> },
      { title: 'Buy vs Sell', component: <BuyVsSell /> },
    ],
    [],
  );

  const currentExample = examples[currentIndex];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  }, [examples.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 + examples.length) % examples.length);
  }, [examples.length]);

  return (
    <ExampleScreen paddingX={0}>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" padding={2}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center">
            <Text font="title3">{currentExample.title}</Text>
            <Text color="fgMuted" font="label1">
              {currentIndex + 1} / {examples.length}
            </Text>
          </VStack>
          <IconButton
            accessibilityHint="Navigate to next example"
            accessibilityLabel="Next"
            name="arrowRight"
            onPress={handleNext}
            variant="secondary"
          />
        </HStack>
        <Box padding={1}>{currentExample.component}</Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
