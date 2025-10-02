import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Circle, G } from 'react-native-svg';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { isCategoricalScale } from '@coinbase/cds-common/visualizations/charts';
import { Radio } from '@coinbase/cds-mobile/controls/Radio';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, Divider, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Pressable } from '@coinbase/cds-mobile/system';
import {
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '@coinbase/cds-mobile/typography';

import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import { BarPlot } from '../bar/BarPlot';
import { useCartesianChartContext } from '../ChartProvider';
import { Line } from '../line/Line';
import { LineChart } from '../line/LineChart';
import { PeriodSelector } from '../PeriodSelector';
import { Scrubber } from '../scrubber/Scrubber';
import { CartesianChart, DottedArea, GradientLine } from '../';

const defaultChartHeight = 250;

const BasicLineChart = () => {
  const chartData = [65, 78, 45, 88, 92, 73, 69];

  return (
    <LineChart
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'monthly-growth',
          data: chartData,
          label: 'Monthly Growth',
          color: '#2ca02c',
        },
      ]}
      yAxis={{
        requestedTickCount: 2,
        tickLabelFormatter: (value) => `$${value}`,
        showGrid: true,
      }}
    />
  );
};

const LineStyles = () => {
  const topChartData = [15, 28, 32, 44, 46, 36, 40, 45, 48, 38];
  const upperMiddleChartData = [12, 23, 21, 29, 34, 28, 31, 38, 42, 35];
  const lowerMiddleChartData = [8, 15, 14, 25, 20, 18, 22, 28, 24, 30];
  const bottomChartData = [4, 8, 11, 15, 16, 14, 16, 10, 12, 14];

  return (
    <CartesianChart
      height={defaultChartHeight}
      series={[
        {
          id: 'top',
          data: topChartData,
        },
        {
          id: 'upperMiddle',
          data: upperMiddleChartData,
          color: '#ef4444',
        },
        {
          id: 'lowerMiddle',
          data: lowerMiddleChartData,
          color: '#f59e0b',
        },
        {
          id: 'bottom',
          data: bottomChartData,
          color: '#800080',
        },
      ]}
    >
      <Line seriesId="top" />
      <Line seriesId="upperMiddle" type="dotted" />
      <Line
        LineComponent={(lineProps) => (
          <GradientLine
            d={lineProps.d}
            endColor="#F7931A"
            startColor="#E3D74D"
            stroke={lineProps.stroke}
            strokeOpacity={lineProps.strokeOpacity}
            strokeWidth={4}
          />
        )}
        curve="natural"
        seriesId="lowerMiddle"
      />
      <Line showArea AreaComponent={DottedArea} curve="step" seriesId="bottom" />
    </CartesianChart>
  );
};

const MultipleChart = () => {
  const barData = [1, 2, 3, 2, 1];
  const lineData = [4, 3, 1, 3, 4];

  return (
    <CartesianChart
      height={350}
      series={[
        { id: 'bar', data: barData },
        { id: 'line', data: lineData },
      ]}
    >
      <Area seriesId="bar" type="dotted" />
      <Line curve="natural" seriesId="line" />
    </CartesianChart>
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
}: PredictionRowProps) => {
  const theme = useTheme();

  return (
    <Pressable
      alignItems="center"
      gap={3}
      justifyContent="space-between"
      onPress={onSelect}
      style={{ flexDirection: 'row' }}
    >
      <TextHeadline>{seriesData.label}</TextHeadline>
      <LineChart
        curve="natural"
        enableScrubbing={false}
        height={theme.space[6]}
        inset={0}
        overflow="visible"
        series={[seriesData]}
        width={60}
      />
      <HStack alignItems="center" gap={2}>
        <TextTitle4>{currentPrice.toFixed(0)}¢</TextTitle4>
        <Radio checked={isSelected} controlColor={controlColor} onChange={() => {}} />
      </HStack>
    </Pressable>
  );
};

const CustomYAxis = memo(() => {
  return (
    <YAxis
      showGrid
      requestedTickCount={2}
      tickLabelFormatter={(value) => `${Math.round(value)}%`}
    />
  );
});

const PredictionMarket = () => {
  const theme = useTheme();
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
        color: theme.color.accentBoldBlue,
        controlColor: 'accentBoldBlue' as const,
      },
      {
        id: 'ravens',
        data: eaglesData.map((price) => 100 - price),
        label: 'Ravens',
        color: theme.color.accentBoldGreen,
        controlColor: 'accentBoldGreen' as const,
      },
    ],
    [eaglesData, theme],
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
    (scrubberPosition: number | undefined) => {
      if (
        scrubberPosition === null ||
        scrubberPosition === undefined ||
        scrubberPosition >= eaglesData.length
      )
        return null;

      const timestamp = Date.now() - (eaglesData.length - 1 - scrubberPosition) * 60000;
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
    <VStack gap={4} style={{ margin: -(theme.space[2] + theme.space[0.5]) }}>
      <VStack gap={0} paddingTop={2} paddingX={2}>
        <TextTitle1>Super Bowl LX</TextTitle1>
        <TextTitle2 color="fgMuted">Eagles vs. Ravens</TextTitle2>
      </VStack>
      <CartesianChart
        enableScrubbing
        height={300}
        inset={{ top: 40, right: 0, bottom: 32, left: 0 }}
        onScrubberPositionChange={updateScrubberLabel}
        paddingEnd={2}
        series={seriesConfig}
        xAxis={{
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
            showArea={selectedSeriesId !== null && selectedSeriesId === series.id}
          />
        ))}
        <CustomYAxis />
        <Scrubber label={scrubberLabel} seriesIds={scrubbedSeries} />
      </CartesianChart>
      <Box paddingX={2}>
        <PeriodSelector activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      </Box>
      <Divider />
      <VStack gap={3} paddingX={2}>
        <HStack alignItems="center" gap={2}>
          <TextTitle3>Make a prediction</TextTitle3>
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

const EarningsHistory = () => {
  const theme = useTheme();
  const CirclePlot = memo(({ seriesId, opacity = 1 }: { seriesId: string; opacity?: number }) => {
    const { getSeries, getSeriesData, getXScale, getYScale } = useCartesianChartContext();
    const series = getSeries(seriesId);
    const data = getSeriesData(seriesId);
    const xScale = getXScale();
    const yScale = getYScale(series?.yAxisId);

    if (!xScale || !yScale || !data || !isCategoricalScale(xScale)) return null;

    const yScaleSize = Math.abs(yScale.range()[1] - yScale.range()[0]);

    // Have circle diameter be the smaller of the x scale bandwidth or 10% of the y space available
    const diameter = Math.min(xScale.bandwidth(), yScaleSize / 10);

    return (
      <G>
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
            <Circle
              key={`${seriesId}-${index}`}
              cx={centerX}
              cy={centerY}
              fill={series?.color || theme.color.fgPrimary}
              opacity={opacity}
              r={diameter / 2}
            />
          );
        })}
      </G>
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
    (index: number): string => {
      const percentage = (actualEPS[index] - estimatedEPS[index]) / estimatedEPS[index];
      const percentageString = percentage.toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const prefix = percentage > 0 ? '+' : '';
      return `${prefix}${percentageString}`;
    },
    [actualEPS, estimatedEPS],
  );

  const styles = StyleSheet.create({
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 1000,
      backgroundColor: theme.color.bgPositive,
    },
  });

  const LegendItem = memo(({ opacity = 1, label }: { opacity?: number; label: string }) => {
    return (
      <Box alignItems="center" flexDirection="row" gap={0.5}>
        <Box style={[styles.legendDot, { opacity }]} />
        <TextLabel2>{label}</TextLabel2>
      </Box>
    );
  });

  return (
    <VStack gap={0.5}>
      <CartesianChart
        height={250}
        inset={0}
        overflow="visible"
        series={[
          {
            id: 'estimatedEPS',
            data: estimatedEPS,
            color: theme.color.bgPositive,
          },
          { id: 'actualEPS', data: actualEPS, color: theme.color.bgPositive },
        ]}
        xAxis={{ scaleType: 'band', categoryPadding: 0.25 }}
      >
        <YAxis
          showGrid
          position="left"
          requestedTickCount={3}
          tickLabelFormatter={formatEarningAmount}
        />
        <XAxis height={20} tickLabelFormatter={(index) => quarters[index]} />
        <XAxis height={20} tickLabelFormatter={surprisePercentage} />
        <CirclePlot opacity={0.5} seriesId="estimatedEPS" />
        <CirclePlot seriesId="actualEPS" />
      </CartesianChart>
      <HStack gap={2} justifyContent="flex-end">
        <LegendItem label="Estimated EPS" opacity={0.5} />
        <LegendItem label="Actual EPS" />
      </HStack>
    </VStack>
  );
};

const PriceWithVolume = () => {
  const theme = useTheme();
  const [scrubIndex, setScrubIndex] = useState<number | undefined>(undefined);
  const btcData = btcCandles.slice(0, 180).reverse();

  const btcPrices = btcData.map((candle) => parseFloat(candle.close));
  const btcVolumes = btcData.map((candle) => parseFloat(candle.volume));
  const btcDates = btcData.map((candle) => new Date(parseInt(candle.start) * 1000));

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const formatPriceInThousands = useCallback((price: number) => {
    return `$${(price / 1000).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}k`;
  }, []);

  const formatVolume = useCallback((volume: number) => {
    return `${(volume / 1000).toFixed(2)}K`;
  }, []);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const displayIndex = scrubIndex ?? btcPrices.length - 1;
  const currentPrice = btcPrices[displayIndex];
  const currentVolume = btcVolumes[displayIndex];
  const currentDate = btcDates[displayIndex];

  const accessibilityLabel = useMemo(() => {
    if (scrubIndex === undefined)
      return `Current Bitcoin price: ${formatPrice(currentPrice)}, Volume: ${formatVolume(currentVolume)}`;
    return `Bitcoin price at ${formatDate(currentDate)}: ${formatPrice(currentPrice)}, Volume: ${formatVolume(currentVolume)}`;
  }, [scrubIndex, currentPrice, currentVolume, currentDate, formatPrice, formatVolume, formatDate]);

  return (
    <VStack gap={2}>
      <HStack gap={2} justifyContent="space-between" paddingX={0}>
        <VStack gap={0}>
          <TextTitle1>Bitcoin</TextTitle1>
          <TextTitle2>{formatPrice(currentPrice)}</TextTitle2>
        </VStack>
        <HStack gap={2}>
          <VStack alignItems="flex-end" justifyContent="center">
            <TextLabel1>{formatDate(currentDate)}</TextLabel1>
            <TextLabel2>{formatVolume(currentVolume)}</TextLabel2>
          </VStack>
          <VStack justifyContent="center">
            <Image
              source={{ uri: assets.btc.imageUrl }}
              style={{ width: theme.iconSize.l, height: theme.iconSize.l, borderRadius: 1000 }}
            />
          </VStack>
        </HStack>
      </HStack>
      <CartesianChart
        enableScrubbing
        accessibilityLabel={accessibilityLabel}
        height={250}
        onScrubberPositionChange={setScrubIndex}
        series={[
          {
            id: 'prices',
            data: btcPrices,
            color: assets.btc.color,
            yAxisId: 'price',
          },
          {
            id: 'volume',
            data: btcVolumes,
            color: theme.color.fgMuted,
            yAxisId: 'volume',
          },
        ]}
        xAxis={{ scaleType: 'band' }}
        yAxis={[
          {
            id: 'price',
            domain: ({ min, max }) => ({ min: min * 0.9, max }),
          },
          {
            id: 'volume',
            range: ({ min, max }) => ({ min: max - 32, max }),
          },
        ]}
      >
        <YAxis showGrid axisId="price" tickLabelFormatter={formatPriceInThousands} width={80} />
        <BarPlot seriesIds={['volume']} />
        <Line showArea curve="monotone" seriesId="prices" />
        <Scrubber seriesIds={['prices']} />
      </CartesianChart>
    </VStack>
  );
};

const ChartStories = () => {
  return (
    <ScrollView>
      <ExampleScreen>
        <Example title="Basic Line Chart">
          <BasicLineChart />
        </Example>
        <Example title="Line Styles">
          <LineStyles />
        </Example>
        <Example title="Multiple Types">
          <MultipleChart />
        </Example>
        <Example title="Earnings History">
          <EarningsHistory />
        </Example>
        <Example title="Price With Volume">
          <PriceWithVolume />
        </Example>
        <Example title="Prediction Market">
          <PredictionMarket />
        </Example>
      </ExampleScreen>
    </ScrollView>
  );
};

export default ChartStories;
