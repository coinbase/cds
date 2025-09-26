import React, { memo, useId } from 'react';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { isCategoricalScale, ScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { Chart } from '../..';
import { XAxis, YAxis } from '../../axis';
import { useChartContext } from '../../ChartProvider';
import { ReferenceLine, SolidLine, type SolidLineProps } from '../../line';
import { PeriodSelector } from '../../PeriodSelector';
import { Scrubber } from '../../scrubber';
import { BarChart } from '../BarChart';
import { BarPlot } from '../BarPlot';
import { DefaultStackComponent, type StackComponentProps } from '../DefaultStackComponent';
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

/**
 * todo examples
 * simple
 * have an outline on stacks
 * have a custom stripe pattern for a bar with outline
 * dotted with outline
 * bar chart with lines on top
 * stack gap and all related examples with border radius
 * Showcase example legend and even a popover would be great
 * Showcase a highlighted background maybe even that
 * handle bar plot needing to know about x and/or y scale so we can only render those
 * ignore any series that aren't in that scale and only factor in the series provided when handling # of different stacks per category
 */

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
    <Chart
      height={420}
      padding={32}
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
    </Chart>
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
      barMinSize={1}
      height={420}
      padding={32}
      series={series}
      stackGap={0.25}
      stackMinSize={2}
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

  const CustomStackComponent = ({ children, ...props }: StackComponentProps) => {
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

    return <DefaultStackComponent {...props}>{children}</DefaultStackComponent>;
  };

  return (
    <BarChart
      roundBaseline
      showXAxis
      stacked
      StackComponent={CustomStackComponent}
      borderRadius={1000}
      height={300}
      padding={0}
      series={series}
      showYAxis={false}
      stackMinSize={3}
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
  const { getXScale, getYScale } = useChartContext();
  const { highlightedIndex } = React.useContext(ScrubberContext) ?? {};
  const xScale = getXScale();
  const yScale = getYScale();

  if (!xScale || !yScale || highlightedIndex === undefined || !isCategoricalScale(xScale))
    return null;

  const yScaleDomain = yScale.range();
  const [yMax, yMin] = yScaleDomain;

  const barWidth = xScale.bandwidth();

  return (
    <rect
      fill="var(--color-bgLine)"
      height={yMax - yMin}
      width={barWidth}
      x={xScale(highlightedIndex)}
      y={yMin}
    />
  );
});

// todo: show a 31 day example on the doc site and explain how bearish vs bullish candles work
const Candlesticks = () => {
  const infoTextRef = React.useRef<HTMLSpanElement>(null);
  const selectedIndexRef = React.useRef<number | null>(null);
  const [timePeriod, setTimePeriod] = React.useState<TimePeriodTab>(tabs[0]);
  const stockData = btcCandles
    .slice(0, timePeriod.id === 'week' ? 7 : timePeriod.id === 'month' ? 30 : btcCandles.length)
    .reverse();
  const min = Math.min(...stockData.map((data) => parseFloat(data.low)));

  const candlesData = stockData.map((data) => [parseFloat(data.low), parseFloat(data.high)]) as [
    number,
    number,
  ][];

  const CandlestickBarComponent = memo<BarComponentProps>(
    ({ x, y, width, height, originY, dataX, ...props }) => {
      const { getYScale } = useChartContext();
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

  const formatPrice = React.useCallback((price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
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
    (index: number | null) => {
      if (!infoTextRef.current) return;

      const text =
        index !== null
          ? `Open: ${formatPrice(stockData[index].open)}, Close: ${formatPrice(
              stockData[index].close,
            )}, Volume: ${formatVolume(stockData[index].volume)}`
          : formatPrice(stockData[stockData.length - 1].close);

      // Direct DOM manipulation - no React re-render
      infoTextRef.current.textContent = text;
      selectedIndexRef.current = index;
    },
    [stockData, formatPrice, formatVolume],
  );

  // todo: see if we can support a bar chart for volume
  // todo: see if we can have this toggle between line candlestick for price

  // Initial value for the info text
  const initialInfo = formatPrice(stockData[stockData.length - 1].close);

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
        StackComponent={({ children, ...props }) => <g {...props}>{children}</g>}
        animate={false}
        aria-labelledby={infoTextId}
        borderRadius={0}
        dataKey={timePeriod.id}
        height={400}
        onScrubberPosChange={updateInfoText}
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
          size: 80,
          showGrid: true,
          GridLineComponent: ThinSolidLine,
        }}
      >
        {timePeriod.id === 'year' ? (
          <Scrubber
            hideOverlay
            scrubberComponents={{
              ScrubberLineComponent: (props) => (
                <ReferenceLine {...props} LineComponent={ThinSolidLine} />
              ),
            }}
            seriesIds={[]}
          />
        ) : (
          <ScrubberRect />
        )}
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
            tickMarkSize: 1.5,
            domain: { max: 50 },
          }}
        />
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
        <Chart
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
          <XAxis showLine showTickMarks />
          <YAxis
            showGrid
            showLine
            showTickMarks
            axisId="revenue"
            position="start"
            requestedTickCount={5}
            size={60}
            tickLabelFormatter={(value) => `$${value}k`}
          />
          <YAxis
            showLine
            showTickMarks
            axisId="profit"
            position="end"
            requestedTickCount={5}
            tickLabelFormatter={(value) => `$${value}k`}
          />
          <BarPlot />
        </Chart>
      </Example>
      <Example title="Candlestick Chart">
        <Candlesticks />
      </Example>
    </VStack>
  );
};
