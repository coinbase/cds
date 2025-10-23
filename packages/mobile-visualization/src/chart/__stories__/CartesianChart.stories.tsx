import { memo, useCallback, useMemo } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { TextLabel1, TextLabel2, TextTitle1, TextTitle2 } from '@coinbase/cds-mobile/typography';
import { Circle, Group, Path, Skia } from '@shopify/react-native-skia';

import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import { BarPlot } from '../bar/BarPlot';
import { useCartesianChartContext } from '../ChartProvider';
import { Line } from '../line/Line';
import { Point } from '../Point';
import { Scrubber } from '../scrubber/Scrubber';
import { type Gradient, isCategoricalScale } from '../utils';
import { CartesianChart, DottedArea, ReferenceLine, SolidLine, type SolidLineProps } from '../';

const defaultChartHeight = 250;

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
        LineComponent={(lineProps) => <SolidLine {...lineProps} strokeWidth={4} />}
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
      height={defaultChartHeight}
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
      <Group>
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
              color={series?.color || theme.color.fgPrimary}
              cx={centerX}
              cy={centerY}
              opacity={opacity}
              r={diameter / 2}
            />
          );
        })}
      </Group>
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
        height={defaultChartHeight}
        inset={{ top: 32, bottom: 0, left: 0, right: 0 }}
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

  const scrubberLabel = useCallback(
    (dataIndex: number) => {
      return formatDate(btcDates[dataIndex]);
    },
    [btcDates, formatDate],
  );

  // Display the last values in the header
  const displayIndex = btcPrices.length - 1;
  const currentPrice = btcPrices[displayIndex];
  const currentVolume = btcVolumes[displayIndex];
  const currentDate = btcDates[displayIndex];

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
        height={defaultChartHeight}
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
        <YAxis showGrid axisId="price" tickLabelFormatter={formatPriceInThousands} width={20} />
        <BarPlot seriesIds={['volume']} />
        <Line showArea curve="monotone" seriesId="prices" />
        <Scrubber label={scrubberLabel} seriesIds={['prices']} />
      </CartesianChart>
    </VStack>
  );
};

function TradingTrends() {
  const theme = useTheme();

  const profitData = [34, 24, 28, -4, 8, -16, -3, 12, 24, 18, 20, 28];
  const gains = profitData.map((value) => (value > 0 ? value : 0));
  const losses = profitData.map((value) => (value < 0 ? value : 0));

  const renderProfit = useCallback((value: number) => {
    return `$${value}M`;
  }, []);

  const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);
  const ThickSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={2} />);

  return (
    <CartesianChart
      height={250}
      series={[
        {
          id: 'gains',
          data: gains,
          yAxisId: 'profit',
          color: theme.color.bgPositive,
          stackId: 'bars',
        },
        {
          id: 'losses',
          data: losses,
          yAxisId: 'profit',
          color: theme.color.bgNegative,
          stackId: 'bars',
        },
        {
          id: 'revenue',
          data: [128, 118, 122, 116, 120, 114, 118, 122, 126, 130, 134, 138],
          yAxisId: 'revenue',
          color: theme.color.fgMuted,
        },
      ]}
      xAxis={{
        scaleType: 'band',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }}
      yAxis={[
        {
          id: 'profit',
          range: ({ min, max }) => ({ min: min, max: max - 64 }),
          domain: { min: -40, max: 40 },
        },
        { id: 'revenue', range: ({ min, max }) => ({ min: max - 64, max }), domain: { min: 100 } },
      ]}
    >
      <YAxis
        showGrid
        GridLineComponent={ThinSolidLine}
        axisId="profit"
        position="left"
        tickLabelFormatter={renderProfit}
      />
      <XAxis />
      <ReferenceLine LineComponent={ThickSolidLine} dataY={0} yAxisId="profit" />
      <BarPlot seriesIds={['gains', 'losses']} />
      <Line showArea curve="monotone" seriesId="revenue" />
    </CartesianChart>
  );
}

const UVGradient: Gradient = {
  axis: 'y',
  stops: [
    { offset: 0, color: 'green' },
    { offset: 3, color: 'yellow' },
    { offset: 5, color: 'orange' },
    { offset: 8, color: 'red' },
    { offset: 10, color: 'purple' },
  ],
};

const PreviousData = memo(
  ({
    children,
    currentHour,
    clipOffset = 0,
  }: {
    children: React.ReactNode;
    currentHour: number;
    clipOffset?: number;
  }) => {
    // we will clip the data to the current hour
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    const currentHourX = xScale?.(currentHour);

    const clipPath = useMemo(() => {
      if (!xScale || currentHourX === undefined) return null;

      // Create a rectangle from top-left of drawing area to currentHourX on the right
      // Apply clipOffset to left, top, and bottom edges only (NOT to currentHourX)
      const pathString = `M ${drawingArea.x - clipOffset} ${drawingArea.y - clipOffset} L ${currentHourX} ${drawingArea.y - clipOffset} L ${currentHourX} ${drawingArea.y + drawingArea.height + clipOffset} L ${drawingArea.x - clipOffset} ${drawingArea.y + drawingArea.height + clipOffset} Z`;
      return Skia.Path.MakeFromSVGString(pathString);
    }, [xScale, currentHourX, drawingArea, clipOffset]);

    if (!clipPath) return null;

    return (
      <Group clip={clipPath} opacity={0.75}>
        {children}
      </Group>
    );
  },
);

const FutureData = memo(
  ({
    children,
    currentHour,
    clipOffset = 0,
  }: {
    children: React.ReactNode;
    currentHour: number;
    clipOffset?: number;
  }) => {
    // we will clip the data from the current hour to the right edge
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    const currentHourX = xScale?.(currentHour);

    const clipPath = useMemo(() => {
      if (!xScale || currentHourX === undefined) return null;

      // Create a rectangle from currentHourX to right edge of drawing area
      // Apply clipOffset to top, bottom, and right, but NOT left (currentHourX)
      const pathString = `M ${currentHourX} ${drawingArea.y - clipOffset} L ${drawingArea.x + drawingArea.width + clipOffset} ${drawingArea.y - clipOffset} L ${drawingArea.x + drawingArea.width + clipOffset} ${drawingArea.y + drawingArea.height + clipOffset} L ${currentHourX} ${drawingArea.y + drawingArea.height + clipOffset} Z`;
      return Skia.Path.MakeFromSVGString(pathString);
    }, [xScale, currentHourX, drawingArea, clipOffset]);

    if (!clipPath) return null;

    return <Group clip={clipPath}>{children}</Group>;
  },
);

const UVIndexChart = () => {
  const theme = useTheme();
  const data = [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0];

  const currentHour = 14;

  return (
    <CartesianChart
      height={defaultChartHeight}
      series={[
        {
          id: 'uv',
          data: data,
          gradient: UVGradient,
        },
      ]}
    >
      <PreviousData clipOffset={8} currentHour={currentHour}>
        <Area fillOpacity={0.25} seriesId="uv" type="gradient" />
        <Line seriesId="uv" strokeWidth={8} type="dotted" />
      </PreviousData>
      <FutureData clipOffset={8} currentHour={currentHour}>
        <Area fillOpacity={0.5} seriesId="uv" type="gradient" />
        <Line seriesId="uv" strokeWidth={8} type="solid" />
      </FutureData>
      <ReferenceLine
        LineComponent={(props) => <SolidLine {...props} stroke={theme.color.bg} strokeWidth={4} />}
        dataX={currentHour}
      />
      <Point
        dataX={currentHour}
        dataY={data[currentHour]}
        fill={theme.color.fg}
        radius={8}
        stroke={theme.color.bg}
        strokeWidth={4}
      />
    </CartesianChart>
  );
};

const ChartStories = () => {
  return (
    <ScrollView>
      <ExampleScreen>
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
        <Example title="Trading Trends">
          <TradingTrends />
        </Example>
        <Example title="UV Index">
          <UVIndexChart />
        </Example>
      </ExampleScreen>
    </ScrollView>
  );
};

export default ChartStories;
