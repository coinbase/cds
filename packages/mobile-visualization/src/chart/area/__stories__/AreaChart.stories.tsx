import { memo, useCallback } from 'react';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { VStack } from '@coinbase/cds-mobile/layout';

import {
  DefaultReferenceLineLabel,
  DottedLine,
  ReferenceLine,
  type ReferenceLineLabelComponentProps,
} from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import { AreaChart } from '..';

const basicData = [24, 13, 98, 39, 48, 38, 43];
const baselineThresholdData = [40, 28, 21, 5, 48, 5, 28, 2, 29, 48, 18, 30, 29, 8].map(
  (value) => value + 50,
);

const BasicExample = () => {
  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `Point ${index + 1}: ${basicData[index]}`,
    [],
  );

  return (
    <AreaChart
      enableScrubbing
      showYAxis
      accessibilityLabel={`Area chart with ${basicData.length} data points. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={400}
      series={[{ id: 'pageViews', data: basicData }]}
      yAxis={{
        showGrid: true,
        domain: { min: 0 },
      }}
    >
      <Scrubber />
    </AreaChart>
  );
};

const currentRewardsData = [
  100, 150, 200, 280, 380, 500, 650, 820, 1020, 1250, 1510, 1800, 2120, 2470, 2850, 3260, 3700,
  4170,
];
const potentialRewardsData = [
  150, 220, 300, 400, 520, 660, 820, 1000, 1200, 1420, 1660, 1920, 2200, 2500, 2820, 3160, 3520,
  3900,
];

const StackedExample = () => {
  const theme = useTheme();

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `Point ${index + 1}: current ${currentRewardsData[index]}, potential ${potentialRewardsData[index]}`,
    [],
  );

  return (
    <AreaChart
      enableScrubbing
      showLines
      stacked
      accessibilityLabel={`Stacked rewards chart with ${currentRewardsData.length} data points. Swipe to navigate.`}
      curve="natural"
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={256}
      series={[
        {
          id: 'currentRewards',
          data: currentRewardsData,
          color: theme.color.fg,
        },
        {
          id: 'potentialRewards',
          data: potentialRewardsData,
          color: theme.color.fgPositive,
          type: 'dotted',
          LineComponent: (props) => <DottedLine {...props} dashIntervals={[6, 6]} />,
        },
      ]}
      type="dotted"
    >
      <Scrubber />
    </AreaChart>
  );
};

const CustomBaselineExample = () => {
  const theme = useTheme();
  const candles = [...btcCandles].reverse().slice(0, 180);
  const prices = candles.map((candle) => parseFloat(candle.close));
  const dates = candles.map((candle) => new Date(parseInt(candle.start, 10) * 1000));

  const startingPrice = prices[0];

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const formatPriceInThousands = useCallback((price: number) => {
    return `$${(price / 1000).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}k`;
  }, []);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, []);

  const formatLabel = useCallback(
    (dataIndex: number) => `${formatPrice(prices[dataIndex])} ${formatDate(dates[dataIndex])}`,
    [dates, formatDate, formatPrice, prices],
  );

  const PriceLabel = memo((props: ReferenceLineLabelComponentProps) => (
    <DefaultReferenceLineLabel
      {...props}
      background={theme.color.bgSecondary}
      borderRadius={12.5}
      color={theme.color.fg}
      dx={12}
      font="label1"
      horizontalAlignment="left"
      inset={{ top: 4, bottom: 4, left: 8, right: 8 }}
    />
  ));

  const chartAccessibilityLabel = `Bitcoin area chart with custom baseline. Current price: ${formatPrice(
    prices[prices.length - 1],
  )}. Swipe to navigate.`;

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${formatPrice(prices[index])} ${formatDate(dates[index])}`,
    [dates, formatDate, formatPrice, prices],
  );

  return (
    <AreaChart
      enableScrubbing
      showLines
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      fillOpacity={0.5}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={300}
      series={[
        {
          id: 'prices',
          data: prices,
          gradient: {
            stops: [
              { offset: startingPrice, color: theme.color.fgNegative },
              { offset: startingPrice, color: theme.color.fgPositive },
            ],
          },
        },
      ]}
      yAxis={{
        baseline: startingPrice,
        showGrid: true,
        tickLabelFormatter: formatPriceInThousands,
        domain: { min: 70000, max: 120000 },
        ticks: [80000, 100000, 120000],
      }}
    >
      <Scrubber labelElevated label={formatLabel} />
      <ReferenceLine
        LabelComponent={PriceLabel}
        LineComponent={(props) => <DottedLine {...props} dashIntervals={[0, 16]} strokeWidth={3} />}
        dataY={startingPrice}
        label={formatPrice(startingPrice)}
        stroke={theme.color.fg}
      />
    </AreaChart>
  );
};

const AxisBaselineThresholdExample = () => {
  const theme = useTheme();

  return (
    <VStack gap={2}>
      <AreaChart
        enableScrubbing
        showLines
        showYAxis
        accessibilityLabel="Area chart with threshold baseline at 30."
        getScrubberAccessibilityLabel={(index: number) =>
          `Point ${index + 1}: ${baselineThresholdData[index]}`
        }
        height={220}
        inset={0}
        series={[
          {
            id: 'axis-baseline-threshold-vertical',
            data: baselineThresholdData,
            gradient: {
              stops: [
                { offset: 30, color: theme.color.fgNegative },
                { offset: 30, color: theme.color.fgPositive },
              ],
            },
          },
        ]}
        type="dotted"
        yAxis={{
          showGrid: true,
          baseline: 30,
        }}
      >
        <Scrubber />
      </AreaChart>
      <AreaChart
        enableScrubbing
        showLines
        showXAxis
        accessibilityLabel="Horizontal area chart with threshold baseline at 30."
        getScrubberAccessibilityLabel={(index: number) =>
          `Point ${index + 1}: ${baselineThresholdData[index]}`
        }
        height={220}
        inset={0}
        layout="horizontal"
        series={[
          {
            id: 'axis-baseline-threshold-horizontal',
            data: baselineThresholdData,
            gradient: {
              stops: [
                { offset: 30, color: theme.color.fgNegative },
                { offset: 30, color: theme.color.fgPositive },
              ],
            },
          },
        ]}
        type="dotted"
        xAxis={{
          showGrid: true,
          baseline: 30,
        }}
      >
        <Scrubber />
      </AreaChart>
    </VStack>
  );
};

const AreaChartStories = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <BasicExample />
      </Example>
      <Example title="Stacked">
        <StackedExample />
      </Example>
      <Example title="Negative Values">
        <AreaChart
          enableScrubbing
          showLines
          showYAxis
          accessibilityLabel="Area chart with negative values. 7 data points. Swipe to navigate."
          getScrubberAccessibilityLabel={(index: number) =>
            `Point ${index + 1}: ${[24, 13, -98, 39, 48, 38, 43][index]}`
          }
          height={150}
          series={[
            {
              id: 'pageViews',
              data: [24, 13, -98, 39, 48, 38, 43],
            },
          ]}
          type="gradient"
          yAxis={{
            showGrid: true,
          }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Axis Baseline">
        <AreaChart
          enableScrubbing
          showLines
          showYAxis
          accessibilityLabel="Area chart with custom axis baseline at 100."
          getScrubberAccessibilityLabel={(index: number) =>
            `Point ${index + 1}: ${[112, 97, 121, 103, 129, 118, 94][index]}`
          }
          height={220}
          series={[
            {
              id: 'netFlow',
              data: [112, 97, 121, 103, 129, 118, 94],
            },
          ]}
          yAxis={{
            baseline: 100,
            domain: { min: 80, max: 140 },
            showGrid: true,
            tickLabelFormatter: (value) => `${value}`,
          }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Axis Baseline Threshold">
        <AxisBaselineThresholdExample />
      </Example>
      <Example title="Custom Baseline">
        <CustomBaselineExample />
      </Example>
      <Example title="Styles">
        <AreaChart
          enableScrubbing={false}
          height={350}
          series={[
            {
              id: 'visitors',
              data: [450, 520, 480, 600, 750, 680, 590],
              label: 'Weekly Visitors',
              color: '#fb4d3d',
              type: 'dotted',
            },
            {
              id: 'repeatVisitors',
              data: [250, 200, 150, 140, 100, 80, 50],
              label: 'Weekly Repeat Visitors',
              color: '#16a34a',
            },
            {
              id: 'signups',
              data: [45, 62, 55, 250, 380, 400, 450],
              label: 'Weekly Signups',
              color: '#2563eb',
              type: 'gradient',
            },
          ]}
        />
      </Example>
      <Example title="Horizontal Layout">
        <AreaChart
          enableScrubbing
          showLines
          showXAxis
          showYAxis
          accessibilityLabel="Volume by asset. 5 data points. Swipe to navigate."
          getScrubberAccessibilityLabel={(index: number) =>
            `${['BTC', 'ETH', 'SOL', 'DOGE', 'ADA'][index]}: ${[68, 54, 43, 29, 18][index]}%`
          }
          height={280}
          layout="horizontal"
          series={[
            {
              id: 'volume',
              data: [68, 54, 43, 29, 18],
              label: 'Volume',
            },
          ]}
          type="gradient"
          xAxis={{ domain: { min: 0, max: 80 }, tickLabelFormatter: (value) => `${value}%` }}
          yAxis={{ data: ['BTC', 'ETH', 'SOL', 'DOGE', 'ADA'], scaleType: 'band' }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
    </ExampleScreen>
  );
};

export default AreaChartStories;
