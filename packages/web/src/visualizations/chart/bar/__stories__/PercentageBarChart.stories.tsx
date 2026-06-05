import React, { memo, useId, useMemo } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { IconButton } from '@coinbase/cds-web/buttons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { useCartesianChartContext } from '../../ChartProvider';
import { DefaultLegendEntry, DefaultLegendShape } from '../../legend';
import { Path } from '../../Path';
import { getBarPath } from '../../utils';
import type { BarComponentProps } from '..';
import { DefaultBar } from '../DefaultBar';
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

const DOTTED_BAR_OUTLINE_STROKE_WIDTH = 2;

const DottedBarComponent = memo((props: BarComponentProps) => {
  const {
    dataX,
    x,
    y,
    width,
    height,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
  } = props;
  const { layout } = useCartesianChartContext();
  const patternSize = 4;
  const dotSize = 1;
  const patternId = useId();
  const maskId = useId();
  const outlineInset = DOTTED_BAR_OUTLINE_STROKE_WIDTH / 2;

  const outlineGeometry = useMemo(() => {
    const insetWidth = width - 2 * outlineInset;
    const insetHeight = height - 2 * outlineInset;
    if (insetWidth <= 0 || insetHeight <= 0) {
      return null;
    }
    const insetX = x + outlineInset;
    const insetY = y + outlineInset;
    const insetRadius = Math.max(0, borderRadius - outlineInset);
    return {
      d: getBarPath(
        insetX,
        insetY,
        insetWidth,
        insetHeight,
        insetRadius,
        roundTop,
        roundBottom,
        layout,
      ),
      height: insetHeight,
      width: insetWidth,
      x: insetX,
      y: insetY,
    };
  }, [borderRadius, height, layout, outlineInset, roundBottom, roundTop, width, x, y]);

  // Create unique IDs per bar so patterns are scoped to each bar
  const uniqueMaskId = `${maskId}-${dataX}`;
  const uniquePatternId = `${patternId}-${dataX}`;
  return (
    <>
      <defs>
        {/* Pattern positioned relative to this bar's origin */}
        <pattern
          height={patternSize}
          id={uniquePatternId}
          patternUnits="userSpaceOnUse"
          width={patternSize}
          x={x}
          y={y}
        >
          <circle cx={patternSize / 2} cy={patternSize / 2} fill="white" r={dotSize} />
        </pattern>
        <mask id={uniqueMaskId}>
          <DefaultBar {...props} fill={`url(#${uniquePatternId})`} />
        </mask>
      </defs>
      <g mask={`url(#${uniqueMaskId})`}>
        <DefaultBar {...props} />
      </g>
      {outlineGeometry ? (
        <DefaultBar
          {...props}
          {...outlineGeometry}
          fill="transparent"
          stroke={props.fill}
          strokeWidth={DOTTED_BAR_OUTLINE_STROKE_WIDTH}
        />
      ) : (
        <DefaultBar
          {...props}
          fill="transparent"
          stroke={props.fill}
          strokeWidth={DOTTED_BAR_OUTLINE_STROKE_WIDTH}
        />
      )}
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
    dataX,
    d: defaultD,
    fill,
    fillOpacity,
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
      clipRect={null}
      d={d}
      fill={fill}
      fillOpacity={fillOpacity}
      transitions={props.transitions}
    />
  );
});

const dottedBarSeries: PercentageBarSeries[] = [
  {
    id: 'segment-a',
    data: 60,
    label: 'Segment A',
    color: 'rgb(var(--teal60))',
    BarComponent: DottedBarComponent,
  },
  { id: 'segment-b', data: 30, label: 'Segment B', color: 'rgb(var(--chartreuse50))' },
  { id: 'segment-c', data: 10, label: 'Segment C', color: 'rgb(var(--indigo40))' },
];

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

const Basics = () => (
  <PercentageBarChart
    height={16}
    series={[
      { id: 'a', data: 70, label: 'Segment A', color: 'var(--color-fgPositive)' },
      { id: 'b', data: 45, label: 'Segment B', color: 'var(--color-fgNegative)' },
    ]}
  />
);

const StackGap = () => (
  <PercentageBarChart
    height={20}
    series={[
      { id: 'a', data: 40, label: 'A', color: 'var(--color-fgPositive)' },
      { id: 'b', data: 35, label: 'B', color: 'var(--color-fgWarning)' },
      { id: 'c', data: 20, label: 'C', color: 'var(--color-accentBoldPurple)' },
    ]}
    stackGap={6}
  />
);

const BorderRadius = () => (
  <PercentageBarChart
    borderRadius={1000}
    height={28}
    series={[
      { id: 'a', data: 45, color: 'rgb(var(--purple30))', label: 'A' },
      { id: 'b', data: 30, color: 'rgb(var(--blue30))', label: 'B' },
      { id: 'c', data: 20, color: 'rgb(var(--teal30))', label: 'C' },
    ]}
    stackGap={2}
  />
);

const DataExample = () => (
  <PercentageBarChart
    showXAxis
    showYAxis
    barMinSize={12}
    borderRadius={8}
    height={100}
    series={[
      { id: 'a', data: [40, null, 20], label: 'A', color: 'var(--color-fgPositive)' },
      { id: 'b', data: [-10, 60, 30], label: 'B', color: 'var(--color-fgWarning)' },
      { id: 'c', data: [null, 50], label: 'C', color: 'var(--color-fgMuted)' },
      { id: 'd', data: 45, label: 'D', color: 'var(--color-fgNegative)' },
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

const BarStackSpacing = () => (
  <PercentageBarChart
    legend
    showXAxis
    showYAxis
    barMinSize={18}
    borderRadius={24}
    height={240}
    series={[
      { id: 'a', data: [55, 40, 35], label: 'A', color: 'var(--color-fgWarning)' },
      { id: 'b', data: [30, 45, 25], label: 'B', color: 'var(--color-accentBoldPurple)' },
      { id: 'c', data: [15, 15, 40], label: 'C', color: 'var(--color-fgMuted)' },
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

const MinimumBarSize = () => (
  <PercentageBarChart
    barMinSize={16}
    height={16}
    series={[
      { id: 'a', data: 99, label: 'Segment A', color: 'var(--color-fgPositive)' },
      { id: 'b', data: 0.001, label: 'Segment B', color: 'var(--color-fgNegative)' },
    ]}
    stackGap={2}
  />
);

const TaxesStyleConfirmedVsNeedReview = () => {
  const series: PercentageBarSeries[] = [
    {
      id: 'confirmed',
      data: 28,
      label: 'Confirmed',
      color: 'var(--color-fgPositive)',
    },
    {
      id: 'needs-review',
      data: 2,
      label: 'Needs review',
      color: 'var(--color-fgWarning)',
    },
  ];

  return (
    <VStack gap={2}>
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

const SlantedStackGap = () => (
  <PercentageBarChart
    BarComponent={SlantedStackBar}
    animate={false}
    barMinSize={12}
    borderRadius={24}
    height={12}
    series={[
      { id: 'team-a', data: 40, color: 'rgb(var(--teal60))' },
      { id: 'team-b', data: 61, color: 'var(--color-accentBoldBlue)' },
    ]}
  />
);

const DottedBarFirstSeriesOnly = () => (
  <PercentageBarChart height={24} series={dottedBarSeries} stackGap={4} />
);

const DottedBarChartLevel = () => (
  <PercentageBarChart
    BarComponent={DottedBarComponent}
    height={24}
    series={[
      { id: 'segment-a', data: 60, label: 'Segment A', color: 'rgb(var(--teal60))' },
      { id: 'segment-b', data: 30, label: 'Segment B', color: 'rgb(var(--chartreuse50))' },
      { id: 'segment-c', data: 10, label: 'Segment C', color: 'rgb(var(--indigo40))' },
    ]}
    stackGap={4}
  />
);

const VerticalMix = () => {
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
      color: 'var(--color-fgMuted)',
    },
  ];

  return (
    <PercentageBarChart
      legend
      showXAxis
      showYAxis
      barMinSize={28}
      borderRadius={48}
      height={280}
      layout="vertical"
      legendPosition="right"
      series={series}
      stackGap={1}
      xAxis={{
        categoryPadding: 0.7,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        position: 'bottom',
        showTickMarks: true,
      }}
    />
  );
};

const buySellSeries = [
  { id: 'buy', data: 76, color: 'var(--color-fgPositive)', legendShape: 'circle' as const },
  { id: 'sell', data: 24, color: 'var(--color-fgNegative)', legendShape: 'square' as const },
];

const BuyVsSellLegend = memo(function BuyVsSellLegend() {
  const [buy, sell] = buySellSeries;
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
        shape={buy.legendShape}
      />
      <DefaultLegendEntry
        color={sell.color}
        label={
          <Text color="fgMuted" font="legal">
            {sell.data}% sold
          </Text>
        }
        seriesId={sell.id}
        shape={sell.legendShape}
      />
    </HStack>
  );
});

const BuyVsSell = () => (
  <VStack gap={1.5}>
    <PercentageBarChart
      barMinSize={8}
      borderRadius={24}
      height={8}
      series={buySellSeries}
      stackGap={4}
    />
    <BuyVsSellLegend />
  </VStack>
);

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basics">
        <Basics />
      </Example>
      <Example title="Stack Gap">
        <StackGap />
      </Example>
      <Example title="Border Radius">
        <BorderRadius />
      </Example>
      <Example title="Sparse Data">
        <DataExample />
      </Example>
      <Example title="Bar Stack Spacing">
        <BarStackSpacing />
      </Example>
      <Example title="Minimum Bar Size">
        <MinimumBarSize />
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
      <Example
        description={
          <Text color="fgMuted" font="body">
            Pill-shaped outer ends with slanted inner edges
          </Text>
        }
        title="Slanted stack gap"
      >
        <SlantedStackGap />
      </Example>
      <Example title="Dotted bar (first series only)">
        <DottedBarFirstSeriesOnly />
      </Example>
      <Example title="Dotted bar (chart BarComponent)">
        <DottedBarChartLevel />
      </Example>
      <Example title="Vertical Mix">
        <VerticalMix />
      </Example>
      <Example title="Buy vs Sell">
        <BuyVsSell />
      </Example>
    </VStack>
  );
};
