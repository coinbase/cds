import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import {
  isCategoricalScale,
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import { CellMedia, ListCell } from '@coinbase/cds-web/cells';
import { Radio } from '@coinbase/cds-web/controls/Radio';
import { Box, type BoxBaseProps, Divider, HStack, VStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system';
import { Text } from '@coinbase/cds-web/typography';

import { GradientArea } from '../area';
import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import { SolidLine } from '../line';
import { Line } from '../line/Line';
import { LineChart } from '../line/LineChart';
import { ReferenceLine } from '../line/ReferenceLine';
import { Chart, type ChartTextChildren, PeriodSelector, Scrubber } from '../';

export default {
  component: Chart,
  title: 'Components/Chart',
};

export const MultipleChart = () => {
  // todo: make a line chart with a bar chart underneath
  const barData = [1, 2, 3, 2, 1];
  const lineData = [4, 3, 1, 3, 4];

  return (
    <VStack gap={3}>
      <Chart
        enableScrubbing
        height={350}
        series={[
          { id: 'bar', data: barData },
          { id: 'line', data: lineData },
        ]}
      >
        <Area seriesId="bar" type="dotted" />
        <Line curve="natural" seriesId="line" />
        <Scrubber />
      </Chart>
    </VStack>
  );
};

type PredictionRowProps = {
  seriesData: {
    id: string;
    data: number[];
    label: string;
    color: string;
  };
  currentPrice: number;
  isSelected: boolean;
  onSelect: () => void;
  controlColor: 'accentBoldBlue' | 'accentBoldGreen';
};

const PredictionRow = ({
  seriesData,
  currentPrice,
  isSelected,
  onSelect,
  controlColor,
}: PredictionRowProps) => (
  <Pressable alignItems="center" gap={3} justifyContent="space-between" onClick={onSelect}>
    <Text font="headline">{seriesData.label}</Text>
    <LineChart
      curve="natural"
      enableScrubbing={false}
      height={6}
      overflow="visible"
      padding={0}
      series={[seriesData]}
      width={60}
    />
    <HStack alignItems="center" gap={2}>
      <Text font="title4">{currentPrice}¢</Text>
      <Radio checked={isSelected} controlColor={controlColor} onChange={() => {}} tabIndex={-1} />
    </HStack>
  </Pressable>
);

const CustomYAxis = memo(() => {
  return (
    <YAxis
      showGrid
      GridLineComponent={SolidLine}
      position="end"
      requestedTickCount={2}
      tickLabelFormatter={(value) => `${Math.round(value)}%`}
    />
  );
});

export const PredictionMarket = () => {
  const tabs = [
    { id: '1H', label: '1H' },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];

  const eaglesData = useMemo(
    () => [
      48, 48.2, 48.8, 49.1, 49.5, 50.2, 50.8, 51.1, 51.3, 51.5, 51.8, 51.6, 51.4, 51.7, 51.9, 51.5,
      51.3, 51.1, 50.9, 50.7, 50.5, 50.8, 51.0, 50.6, 50.3, 49.8, 49.5, 49.2, 48.9, 49.1, 49.4,
      49.7, 50.0, 50.2, 49.9, 49.6, 49.3, 49.0, 48.7, 48.9, 49.2, 49.5, 49.8, 50.1, 50.3, 51.0,
      51.7, 52.4, 53.1, 54,
    ],
    [],
  );

  const seriesConfig = useMemo(
    () => [
      {
        id: 'eagles',
        data: eaglesData,
        label: 'Eagles',
        color: 'var(--color-accentBoldBlue)',
        controlColor: 'accentBoldBlue' as const,
      },
      {
        id: 'ravens',
        data: eaglesData.map((price) => 100 - price),
        label: 'Ravens',
        color: 'var(--color-accentBoldGreen)',
        controlColor: 'accentBoldGreen' as const,
      },
    ],
    [eaglesData],
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);

  const handleSeriesClick = useCallback((seriesId: string) => {
    setSelectedSeriesId((prev) => (prev === seriesId ? null : seriesId));
  }, []);

  const getSeriesOpacity = (seriesId: string) => {
    if (selectedSeriesId === null) {
      return 1;
    }
    return selectedSeriesId === seriesId ? 1 : 0.3;
  };

  const scrubbedSeries = useMemo(() => {
    return selectedSeriesId ? [selectedSeriesId] : undefined;
  }, [selectedSeriesId]);

  const [scrubberLabel, setScrubberLabel] = useState<string | null>(null);
  const updateScrubberLabel = useCallback(
    (highlightedIndex: number | null) => {
      if (
        highlightedIndex === null ||
        highlightedIndex === undefined ||
        highlightedIndex >= eaglesData.length
      )
        return null;

      const timestamp = Date.now() - (eaglesData.length - 1 - highlightedIndex) * 60000;
      const date = new Date(timestamp);
      setScrubberLabel(
        date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      );
    },
    [eaglesData.length],
  );

  return (
    <VStack gap={4} style={{ margin: 'calc(var(--space-1) * -2.5)' }}>
      <VStack paddingTop={2} paddingX={2}>
        <Text as="h1" font="title1">
          Super Bowl LX
        </Text>
        <Text color="fgMuted" font="title2">
          Eagles vs. Ravens
        </Text>
      </VStack>
      <Chart
        enableScrubbing
        height={300}
        onScrubberPosChange={updateScrubberLabel}
        padding={{ top: 40, right: 0, bottom: 20, left: 0 }}
        paddingEnd={2}
        series={seriesConfig}
        xAxis={{
          // Add a bit of margin within the chart's range (pixels)
          range: ({ max, min }) => ({ min, max: max - 32 }),
        }}
        yAxis={{
          domain: { min: 40, max: 60 },
        }}
      >
        {seriesConfig.map((series) => (
          <Line
            key={series.id}
            curve="natural"
            opacity={getSeriesOpacity(series.id)}
            seriesId={series.id}
          />
        ))}
        <CustomYAxis />
        <Scrubber scrubberLabel={scrubberLabel} seriesIds={scrubbedSeries} />
      </Chart>
      <Box paddingX={2}>
        <PeriodSelector activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      </Box>
      <Divider />
      <VStack gap={3} paddingX={2}>
        <HStack alignItems="center" gap={2}>
          <Text as="h2" font="title3">
            Make a prediction
          </Text>
        </HStack>
        <VStack gap={2}>
          {seriesConfig.map((series) => (
            <PredictionRow
              key={series.id}
              controlColor={series.controlColor}
              currentPrice={series.data[series.data.length - 1]}
              isSelected={selectedSeriesId === series.id}
              onSelect={() => handleSeriesClick(series.id)}
              seriesData={series}
            />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export const CompactSparkline = () => {
  const dimensions = { width: 62, height: 18 };
  return (
    <ListCell
      description={assets.btc.symbol}
      detail={prices[0]}
      intermediary={
        <Box style={{ padding: 1 }}>
          <LineChart
            {...dimensions}
            enableScrubbing={false}
            overflow="visible"
            padding={0}
            series={[
              {
                id: 'btc',
                data: prices
                  .map((price) => parseFloat(price))
                  .filter((price, index) => index % 10 === 0),
                color: assets.btc.color,
              },
            ]}
          >
            <ReferenceLine dataY={parseFloat(prices[Math.floor(prices.length / 4)])} />
          </LineChart>
        </Box>
      }
      media={<CellMedia source={assets.btc.imageUrl} title="BTC" type="image" />}
      onClick={() => console.log('clicked')}
      subdetail="+4.55%"
      title={assets.btc.name}
      variant="positive"
    />
  );
};

export const EarningsHistory = () => {
  const CirclePlot = memo(({ seriesId, opacity = 1 }: { seriesId: string; opacity?: number }) => {
    const { getSeries, getSeriesData, getXScale, getYScale } = useChartContext();
    const series = getSeries(seriesId);
    const data = getSeriesData(seriesId);
    const xScale = getXScale?.(series?.xAxisId);
    const yScale = getYScale?.(series?.yAxisId);

    if (!xScale || !yScale || !data || !isCategoricalScale(xScale)) return null;

    const yScaleSize = Math.abs(yScale.range()[1] - yScale.range()[0]);

    // Have circle diameter be the smaller of the x scale bandwidth or 10% of the y space available
    const diameter = Math.min(xScale.bandwidth(), yScaleSize / 10);

    return (
      <g>
        {data.map((value: any, index: any) => {
          if (value === null || value === undefined) return null;

          // Get x position from band scale - center of the band
          const xPos = xScale(index);
          if (xPos === undefined) return null;

          const centerX = xPos + xScale.bandwidth() / 2;

          // Get y position from value
          const yValue = Array.isArray(value) ? value[1] : value;
          const centerY = yScale(yValue);
          if (centerY === undefined) return null;

          return (
            <circle
              key={`${seriesId}-${index}`}
              cx={centerX}
              cy={centerY}
              fill={series?.color || 'var(--color-fgPrimary)'}
              opacity={opacity}
              r={diameter / 2}
            />
          );
        })}
      </g>
    );
  });

  const quarters = useMemo(() => ['Q1', 'Q2', 'Q3', 'Q4'], []);
  const estimatedEPS = useMemo(() => [1.71, 1.82, 1.93, 2.34], []);
  const actualEPS = useMemo(() => [1.68, 1.83, 2.01, 2.24], []);

  const formatEarningAmount = useCallback((value: number) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const surprisePercentage = useCallback(
    (index: number): ChartTextChildren => {
      const percentage = (actualEPS[index] - estimatedEPS[index]) / estimatedEPS[index];
      const percentageString = percentage.toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return (
        <tspan
          style={{
            fill: percentage > 0 ? 'var(--color-fgPositive)' : 'var(--color-fgNegative)',
            fontWeight: 'bold',
          }}
        >
          {percentage > 0 ? '+' : ''}
          {percentageString}
        </tspan>
      );
    },
    [actualEPS, estimatedEPS],
  );

  const LegendItem = memo(({ opacity = 1, label }: { opacity?: number; label: string }) => {
    return (
      <Box alignItems="center" gap={0.5}>
        <LegendDot opacity={opacity} />
        <Text font="label2">{label}</Text>
      </Box>
    );
  });

  const LegendDot = memo((props: BoxBaseProps) => {
    return <Box background="bgPositive" borderRadius={1000} height={10} width={10} {...props} />;
  });

  return (
    <VStack gap={0.5}>
      <Chart
        animate={false}
        height={250}
        padding={0}
        series={[
          {
            id: 'estimatedEPS',
            data: estimatedEPS,
            color: 'var(--color-bgPositive)',
          },
          { id: 'actualEPS', data: actualEPS, color: 'var(--color-bgPositive)' },
        ]}
        xAxis={{ scaleType: 'band', categoryPadding: 0.25 }}
      >
        <YAxis
          showGrid
          position="start"
          requestedTickCount={3}
          tickLabelFormatter={formatEarningAmount}
        />
        <XAxis size={20} tickLabelFormatter={(index) => quarters[index]} />
        <XAxis size={20} tickLabelFormatter={surprisePercentage} />
        <CirclePlot opacity={0.5} seriesId="estimatedEPS" />
        <CirclePlot seriesId="actualEPS" />
      </Chart>
      <HStack gap={2} justifyContent="flex-end">
        <LegendItem label="Estimated EPS" opacity={0.5} />
        <LegendItem label="Actual EPS" />
      </HStack>
    </VStack>
  );
};
