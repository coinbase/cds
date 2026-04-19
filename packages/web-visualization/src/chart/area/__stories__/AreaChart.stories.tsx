import React, { memo, useCallback } from 'react';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import {
  DefaultReferenceLineLabel,
  DottedLine,
  ReferenceLine,
  type ReferenceLineLabelComponentProps,
} from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import { AreaChart } from '..';

export default {
  title: 'Components/Chart/AreaChart',
  component: AreaChart,
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

const CustomBaseline = () => {
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

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, []);

  const formatLabel = useCallback(
    (dataIndex: number) => {
      const price = prices[dataIndex];
      const date = dates[dataIndex];

      return (
        <>
          <tspan style={{ fontWeight: 'bold' }}>{formatPrice(price)}</tspan> {formatDate(date)}
        </>
      );
    },
    [dates, formatDate, formatPrice, prices],
  );

  const PriceLabel = memo((props: ReferenceLineLabelComponentProps) => (
    <DefaultReferenceLineLabel
      {...props}
      background="var(--color-bgSecondary)"
      borderRadius={12.5}
      color="var(--color-fg)"
      dx={12}
      font="label1"
      horizontalAlignment="left"
      inset={{ top: 4, bottom: 4, left: 8, right: 8 }}
    />
  ));

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${formatPrice(prices[index])} ${formatDate(dates[index])}`,
    [dates, formatDate, formatPrice, prices],
  );

  return (
    <AreaChart
      enableScrubbing
      showLines
      showYAxis
      fillOpacity={0.5}
      height={300}
      series={[
        {
          id: 'prices',
          data: prices,
          gradient: {
            stops: [
              { offset: startingPrice, color: 'var(--color-fgNegative)' },
              { offset: startingPrice, color: 'var(--color-fgPositive)' },
            ],
          },
        },
      ]}
      yAxis={{
        baseline: startingPrice,
        showGrid: true,
        tickLabelFormatter: formatPrice,
        domain: { min: 70000, max: 120000 },
        width: 80,
        ticks: [80000, 100000, 120000],
      }}
    >
      <Scrubber
        labelElevated
        accessibilityLabel={getScrubberAccessibilityLabel}
        label={formatLabel}
      />
      <ReferenceLine
        LabelComponent={PriceLabel}
        LineComponent={(props) => (
          <DottedLine {...props} stroke="var(--color-fg)" strokeDasharray="0 16" strokeWidth={3} />
        )}
        dataY={startingPrice}
        label={formatPrice(startingPrice)}
      />
    </AreaChart>
  );
};

export const All = () => {
  return (
    <React.StrictMode>
      <VStack gap={2}>
        <Example title="Basic">
          <AreaChart
            enableScrubbing
            showYAxis
            height={400}
            series={[
              {
                id: 'pageViews',
                data: [24, 13, 98, 39, 48, 38, 43],
              },
            ]}
            yAxis={{
              showGrid: true,
              domain: { min: 0 },
            }}
          >
            <Scrubber />
          </AreaChart>
        </Example>
        <Example title="Stacked">
          <AreaChart
            enableScrubbing
            showLines
            stacked
            curve="natural"
            height={256}
            series={[
              {
                id: 'currentRewards',
                data: [
                  100, 150, 200, 280, 380, 500, 650, 820, 1020, 1250, 1510, 1800, 2120, 2470, 2850,
                  3260, 3700, 4170,
                ],
                color: 'var(--color-fg)',
              },
              {
                id: 'potentialRewards',
                data: [
                  150, 220, 300, 400, 520, 660, 820, 1000, 1200, 1420, 1660, 1920, 2200, 2500, 2820,
                  3160, 3520, 3900,
                ],
                color: 'var(--color-fgPositive)',
                type: 'dotted',
                LineComponent: DottedLine,
              },
            ]}
            type="dotted"
          >
            <Scrubber />
          </AreaChart>
        </Example>
        <Example title="Negative Values">
          <AreaChart
            enableScrubbing
            showLines
            showYAxis
            height={400}
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
            height={200}
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
        <Example title="Custom Baseline">
          <CustomBaseline />
        </Example>
      </VStack>
    </React.StrictMode>
  );
};
