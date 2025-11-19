import React, { memo, useId } from 'react';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { CartesianChart } from '../..';
import { XAxis, YAxis } from '../../axis';
import { useCartesianChartContext } from '../../ChartProvider';
import { type LineComponentProps, ReferenceLine, SolidLine, type SolidLineProps } from '../../line';
import { PeriodSelector } from '../../PeriodSelector';
import { Scrubber } from '../../scrubber';
import { isCategoricalScale, ScrubberContext, useScrubberContext } from '../../utils';
import { BarChart } from '../BarChart';
import { BarPlot } from '../BarPlot';
import { type BarStackComponentProps } from '../BarStack';
import { DefaultBarStack } from '../DefaultBarStack';
import { Bar, type BarComponentProps } from '..';

export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
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

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const PositiveAndNegativeCashFlow = () => {
  const categories = Array.from({ length: 31 }, (_, i) => `3/${i + 1}`);
  const gains = [
    5, 0, 6, 18, 0, 5, 12, 0, 12, 22, 28, 18, 0, 12, 6, 0, 0, 24, 0, 0, 4, 0, 18, 0, 0, 14, 10, 16,
    0, 0, 0,
  ];

  const losses = [
    -4, 0, -8, -12, -6, 0, 0, 0, -18, 0, -12, 0, -9, -6, 0, 0, 0, 0, -22, -8, 0, 0, -10, -14, 0, 0,
    0, 0, 0, -12, -10,
  ];
  const series = [
    { id: 'gains', data: gains, color: 'var(--color-fgPositive)', stackId: 'bars' },
    { id: 'losses', data: losses, color: 'var(--color-fgNegative)', stackId: 'bars' },
  ];

  return (
    <CartesianChart
      height={420}
      inset={32}
      series={series}
      xAxis={{ data: categories, scaleType: 'band' }}
    >
      <XAxis />
      <YAxis
        showGrid
        GridLineComponent={ThinSolidLine}
        tickLabelFormatter={(value) => `$${value}M`}
      />
      <BarPlot />
      <ReferenceLine LineComponent={SolidLine} dataY={0} />
    </CartesianChart>
  );
};

const FiatAndStablecoinBalance = () => {
  const categories = Array.from({ length: 31 }, (_, i) => `3/${i + 1}`);

  const usd = [
    20, 20, 20, 20, 20, 40, 60, 60, 80, 120, 200, 240, 240, 240, 240, 240, 240, 240, 240, 60, 30,
    20, 25, 5, 0, 0, 0, 0, 80, 120, 150,
  ];
  const usdc = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 260, 260, 240, 220, 180, 160, 200, 240, 220, 0, 0, 0, 0, 0, 0,
    250, 250, 250, 250, 250, 250,
  ];
  const brl = [
    0, 0, 0, 0, 0, 0, 0, 20, 40, 100, 60, 60, 60, 0, 0, 0, 0, 0, 0, 160, 40, 80, 140, 180, 120, 0,
    0, 0, 30, 30, 40,
  ];

  const series = [
    { id: 'BRL', data: brl, color: 'var(--color-accentBoldGreen)' },
    { id: 'USDC', data: usdc, color: 'var(--color-accentBoldBlue)' },
    { id: 'USD', data: usd, color: 'var(--color-accentBoldIndigo, #5b6cff)' },
  ];

  return (
    <BarChart
      showXAxis
      stacked
      barMinSize={8}
      height={420}
      inset={32}
      series={series}
      stackGap={2}
      stackMinSize={16}
      xAxis={{ data: categories }}
    />
  );
};

const MonthlyRewards = () => {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const currentMonth = 7;
  const purple = [null, 6, 8, 10, 7, 6, 6, 8, null, null, null, null];
  const blue = [null, 10, 12, 11, 10, 9, 10, 11, null, null, null, null];
  const cyan = [null, 7, 10, 12, 11, 10, 8, 11, null, null, null, null];
  const green = [10, null, null, null, 1, null, null, 6, null, null, null, null];

  const series = [
    { id: 'purple', data: purple, color: '#b399ff' },
    { id: 'blue', data: blue, color: '#4f7cff' },
    { id: 'cyan', data: cyan, color: '#00c2df' },
    { id: 'green', data: green, color: '#33c481' },
  ];

  const CustomBarStackComponent = ({ children, ...props }: BarStackComponentProps) => {
    if (props.height === 0) {
      const diameter = props.width;
      return (
        <Bar
          roundBottom
          roundTop
          borderRadius={1000}
          fill="var(--color-bgTertiary)"
          height={diameter}
          width={diameter}
          x={props.x}
          y={props.y - diameter}
        />
      );
    }

    return <DefaultBarStack {...props}>{children}</DefaultBarStack>;
  };

  return (
    <BarChart
      roundBaseline
      showXAxis
      stacked
      BarStackComponent={CustomBarStackComponent}
      borderRadius={1000}
      height={300}
      inset={0}
      series={series}
      showYAxis={false}
      stackMinSize={24}
      width={403}
      xAxis={{
        tickLabelFormatter: (index) => {
          if (index == currentMonth) {
            return <tspan style={{ fontWeight: 'bold' }}>{months[index]}</tspan>;
          }
          return months[index];
        },
        categoryPadding: 0.27,
      }}
    />
  );
};

type TimePeriod = 'week' | 'month' | 'year';
type TimePeriodTab = { id: TimePeriod; label: string };

const tabs: TimePeriodTab[] = [
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1Y' },
];

const ScrubberRect = memo(() => {
  const { getXScale, getYScale } = useCartesianChartContext();
  const { scrubberPosition } = React.useContext(ScrubberContext) ?? {};
  const xScale = getXScale();
  const yScale = getYScale();

  if (!xScale || !yScale || scrubberPosition === undefined || !isCategoricalScale(xScale))
    return null;

  const yScaleDomain = yScale.range();
  const [yMax, yMin] = yScaleDomain;

  const barWidth = xScale.bandwidth();

  return (
    <rect
      fill="var(--color-bgLine)"
      height={yMax - yMin}
      width={barWidth}
      x={xScale(scrubberPosition)}
      y={yMin}
    />
  );
});

const Candlesticks = () => {
  const infoTextRef = React.useRef<HTMLSpanElement>(null);
  const selectedIndexRef = React.useRef<number | undefined>(undefined);
  const [timePeriod, setTimePeriod] = React.useState<TimePeriodTab>(tabs[0]);
  const stockData = btcCandles
    .slice(0, timePeriod.id === 'week' ? 7 : timePeriod.id === 'month' ? 30 : btcCandles.length)
    .reverse();
  const min = Math.min(...stockData.map((data) => parseFloat(data.low)));

  // Custom line component that renders a rect to highlight the entire bandwidth
  const BandwidthHighlight = memo<LineComponentProps>(({ stroke }) => {
    const { getXScale, drawingArea } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();
    const xScale = getXScale();

    if (!xScale || scrubberPosition === undefined) return null;

    const xPos = xScale(scrubberPosition);

    if (xPos === undefined) return null;

    // Type guard to check if scale has bandwidth (band scale)
    const bandwidth = 'bandwidth' in xScale ? xScale.bandwidth() : 0;

    return (
      <rect
        fill={stroke}
        height={drawingArea.height}
        width={bandwidth}
        x={xPos}
        y={drawingArea.y}
      />
    );
  });

  const candlesData = stockData.map((data) => [parseFloat(data.low), parseFloat(data.high)]) as [
    number,
    number,
  ][];

  const CandlestickBarComponent = memo<BarComponentProps>(
    ({ x, y, width, height, originY, dataX, ...props }) => {
      const { getYScale } = useCartesianChartContext();
      const yScale = getYScale();

      const wickX = x + width / 2;

      const timePeriodValue = stockData[dataX as number];

      const open = parseFloat(timePeriodValue.open);
      const close = parseFloat(timePeriodValue.close);

      const bullish = open < close;
      const color = bullish ? 'var(--color-fgPositive)' : 'var(--color-fgNegative)';
      const openY = yScale?.(open) ?? 0;
      const closeY = yScale?.(close) ?? 0;

      const bodyHeight = Math.abs(openY - closeY);
      const bodyY = openY < closeY ? openY : closeY;

      return (
        <g>
          <line stroke={color} strokeWidth={1} x1={wickX} x2={wickX} y1={y} y2={y + height} />
          <rect fill={color} height={bodyHeight} width={width} x={x} y={bodyY} />
        </g>
      );
    },
  );

  const formatPrice = React.useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }, []);

  const formatVolume = React.useCallback((volume: string) => {
    const volumeInThousands = parseFloat(volume) / 1000;
    return (
      new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(volumeInThousands) + 'k'
    );
  }, []);

  const formatTime = React.useCallback(
    (index: number | null) => {
      if (index === null || index >= stockData.length) return '';
      const ts = parseInt(stockData[index].start);
      return new Date(ts * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    },
    [stockData],
  );

  // Memoize the update function to avoid recreation on each render
  const updateInfoText = React.useCallback(
    (index: number | undefined) => {
      if (!infoTextRef.current) return;

      const text =
        index !== undefined
          ? `Open: ${formatPrice(parseFloat(stockData[index].open))}, Close: ${formatPrice(
              parseFloat(stockData[index].close),
            )}, Volume: ${formatVolume(stockData[index].volume)}`
          : formatPrice(parseFloat(stockData[stockData.length - 1].close));

      // Direct DOM manipulation - no React re-render
      infoTextRef.current.textContent = text;
      selectedIndexRef.current = index;
    },
    [stockData, formatPrice, formatVolume],
  );

  // Initial value for the info text
  const initialInfo = formatPrice(parseFloat(stockData[stockData.length - 1].close));

  // Update text when stockData changes (on timePeriod change)
  React.useEffect(() => {
    updateInfoText(selectedIndexRef.current);
  }, [stockData, updateInfoText]);

  const infoTextId = useId();

  return (
    <VStack gap={2}>
      <Text aria-live="polite" font="headline" id={infoTextId}>
        <span ref={infoTextRef}>{initialInfo}</span>
      </Text>
      <BarChart
        enableScrubbing
        showXAxis
        showYAxis
        BarComponent={CandlestickBarComponent}
        BarStackComponent={({ children, ...props }) => <g {...props}>{children}</g>}
        animate={false}
        aria-labelledby={infoTextId}
        borderRadius={0}
        height={400}
        onScrubberPositionChange={updateInfoText}
        series={[
          {
            id: 'stock-prices',
            data: candlesData,
          },
        ]}
        xAxis={{
          tickLabelFormatter: formatTime,
        }}
        yAxis={{
          domain: { min },
          tickLabelFormatter: formatPrice,
          width: 80,
          showGrid: true,
          GridLineComponent: ThinSolidLine,
        }}
      >
        <Scrubber
          hideOverlay
          LineComponent={BandwidthHighlight}
          lineStroke="var(--color-fgMuted)"
          seriesIds={[]}
        />
      </BarChart>
      <PeriodSelector
        activeTab={timePeriod}
        justifyContent="flex-start"
        onChange={(tab) => {
          if (tab === null) return;
          setTimePeriod(tab as TimePeriodTab);
        }}
        tabs={tabs}
        width="fit-content"
      />
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <BarChart
          showXAxis
          showYAxis
          height={400}
          series={[
            {
              id: 'weekly-data',
              data: [45, 52, 38, 45, 19, 23, 32],
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            showTickMarks: true,
            showLine: true,
          }}
          yAxis={{
            requestedTickCount: 5,
            tickLabelFormatter: (value) => `$${value}k`,
            showGrid: true,
            showTickMarks: true,
            showLine: true,
            tickMarkSize: 12,
            domain: { max: 50 },
          }}
        />
      </Example>
      <Example title="Right Y-Axis with Labels">
        <CartesianChart
          height={400}
          series={[
            {
              id: 'revenue',
              data: [45, 52, 38, 45, 19, 23, 32],
              color: 'var(--color-accentBoldBlue)',
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            scaleType: 'band',
          }}
        >
          <XAxis showLine showTickMarks label="Day of Week" />
          <YAxis
            showGrid
            showLine
            showTickMarks
            label="Revenue"
            position="right"
            requestedTickCount={5}
            tickLabelFormatter={(value) => `$${value}k`}
          />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Negative Values with Top Axis">
        <CartesianChart
          height={400}
          series={[
            {
              id: 'losses',
              data: [-45, -52, -38, -45, -19, -23, -32],
              color: 'var(--color-fgNegative)',
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            scaleType: 'band',
          }}
        >
          <XAxis showLine showTickMarks label="Day of Week" position="top" />
          <YAxis
            showGrid
            showLine
            showTickMarks
            label="Loss"
            requestedTickCount={5}
            tickLabelFormatter={(value) => `$${value}k`}
          />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Positive and Negative Cash Flow">
        <PositiveAndNegativeCashFlow />
      </Example>
      <Example title="Fiat & Stablecoin Balance">
        <FiatAndStablecoinBalance />
      </Example>
      <Example title="Monthly Rewards">
        <MonthlyRewards />
      </Example>
      <Example title="Multiple Y Axes">
        <CartesianChart
          height={400}
          series={[
            {
              id: 'revenue',
              data: [455, 520, 380, 455, 190, 235],
              yAxisId: 'revenue',
              color: 'var(--color-accentBoldYellow)',
            },
            {
              id: 'profit',
              data: [23, 15, 30, 56, 4, 12],
              yAxisId: 'profit',
              color: 'var(--color-fgPositive)',
            },
          ]}
          xAxis={{
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            scaleType: 'band',
          }}
          yAxis={[
            {
              id: 'revenue',
            },
            {
              id: 'profit',
            },
          ]}
        >
          <XAxis showLine showTickMarks label="Month" />
          <YAxis
            showGrid
            showLine
            showTickMarks
            axisId="revenue"
            label="Revenue"
            position="left"
            requestedTickCount={5}
            tickLabelFormatter={(value) => `$${value}k`}
            width={80}
          />
          <YAxis
            showLine
            showTickMarks
            axisId="profit"
            label="Profit"
            position="right"
            requestedTickCount={5}
            tickLabelFormatter={(value) => `$${value}k`}
            width={70}
          />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Candlestick Chart">
        <Candlesticks />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Simple gain/loss chart. Bars below zero are red (negative), bars at or above zero are
            green (positive). Uses hard transition at 0.
          </Text>
        }
        title="Gradient - Gain/Loss"
      >
        <BarChart
          showXAxis
          showYAxis
          height={300}
          series={[
            {
              id: 'profit',
              data: [-40, -28, 15, -5, 48, -12, 22, -8, 35, -18, 42, -3],
              gradient: {
                axis: 'y',
                stops: [
                  { offset: -50, color: 'var(--color-fgNegative)' },
                  { offset: 0, color: 'var(--color-fgNegative)' },
                  { offset: 0, color: 'var(--color-fgPositive)' },
                  { offset: 50, color: 'var(--color-fgPositive)' },
                ],
              },
            },
          ]}
          xAxis={{
            data: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          }}
          yAxis={{
            requestedTickCount: 5,
            tickLabelFormatter: (value) => `$${value}k`,
            showGrid: true,
          }}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Continuous gradient applied to bars. Each bar&apos;s color is determined by its value,
            transitioning smoothly from green (low) to yellow (mid) to red (high).
          </Text>
        }
        title="Gradient - Continuous (Y-Axis)"
      >
        <BarChart
          showXAxis
          showYAxis
          height={300}
          series={[
            {
              id: 'temperature',
              data: [12, 25, 38, 52, 45, 30, 18],
              gradient: {
                axis: 'y',
                stops: ({ min, max }: { min: number; max: number }) => [
                  { offset: min, color: 'var(--color-accentBoldGreen)' },
                  { offset: (min + max) / 2, color: 'var(--color-accentBoldYellow)' },
                  { offset: max, color: 'var(--color-accentBoldRed)' },
                ],
              },
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          }}
          yAxis={{
            requestedTickCount: 5,
            tickLabelFormatter: (value) => `${value}°C`,
            showGrid: true,
          }}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Hard transitions at 30 and 45. Bars below 30 are green (cool), 30-45 are yellow (warm),
            and above 45 are red (hot).
          </Text>
        }
        title="Gradient - Hard Transitions (Y-Axis)"
      >
        <BarChart
          showXAxis
          showYAxis
          height={300}
          series={[
            {
              id: 'temperature',
              data: [25, 32, 48, 52, 29, 38, 22],
              gradient: {
                axis: 'y',
                stops: [
                  { offset: 0, color: 'var(--color-accentBoldGreen)' },
                  { offset: 30, color: 'var(--color-accentBoldGreen)' },
                  { offset: 30, color: 'var(--color-accentBoldYellow)' },
                  { offset: 45, color: 'var(--color-accentBoldYellow)' },
                  { offset: 45, color: 'var(--color-accentBoldRed)' },
                  { offset: 60, color: 'var(--color-accentBoldRed)' },
                ],
              },
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          }}
          yAxis={{
            requestedTickCount: 5,
            tickLabelFormatter: (value) => `${value}°C`,
            showGrid: true,
          }}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Gradient applied on X-axis (category index). Each bar gets a color based on its position
            in the chart, creating a rainbow effect.
          </Text>
        }
        title="Gradient - Continuous (X-Axis)"
      >
        <BarChart
          showXAxis
          showYAxis
          height={300}
          series={[
            {
              id: 'sales',
              data: [50, 65, 45, 70, 55, 60, 52],
              gradient: {
                axis: 'x',
                stops: [
                  { offset: 0, color: '#ef4444' },
                  { offset: 1.5, color: '#f59e0b' },
                  { offset: 3, color: '#10b981' },
                  { offset: 4.5, color: '#3b82f6' },
                  { offset: 6, color: '#8b5cf6' },
                ],
              },
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          }}
          yAxis={{
            requestedTickCount: 5,
            showGrid: true,
          }}
        />
      </Example>
      <Example
        description={
          <Text color="fgMuted" font="body">
            Stacked bars with gradient. Each series can have its own gradient configuration,
            allowing for complex color compositions.
          </Text>
        }
        title="Gradient - Stacked Bars"
      >
        <BarChart
          showXAxis
          showYAxis
          stacked
          height={300}
          series={[
            {
              id: 'category-a',
              data: [20, 30, 25, 35, 28, 32, 27],
              gradient: {
                axis: 'y',
                stops: ({ min, max }: { min: number; max: number }) => [
                  { offset: min, color: '#3b82f6' },
                  { offset: max, color: '#8b5cf6' },
                ],
              },
            },
            {
              id: 'category-b',
              data: [15, 25, 20, 30, 22, 28, 23],
              gradient: {
                axis: 'y',
                stops: ({ min, max }: { min: number; max: number }) => [
                  { offset: min, color: '#10b981' },
                  { offset: max, color: '#059669' },
                ],
              },
            },
          ]}
          xAxis={{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          }}
          yAxis={{
            requestedTickCount: 5,
            showGrid: true,
          }}
        />
      </Example>
    </VStack>
  );
};
