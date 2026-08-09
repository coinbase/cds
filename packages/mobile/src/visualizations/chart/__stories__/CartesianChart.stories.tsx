import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { Circle, Group, Line as SkiaLine, RoundedRect, vec } from '@shopify/react-native-skia';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { useTheme } from '../../../hooks/useTheme';
import { Box, HStack, VStack } from '../../../layout';
import { Text } from '../../../typography';
import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import type { AxisTickLabelComponentProps } from '../axis/Axis';
import { BarPlot } from '../bar/BarPlot';
import { useCartesianChartContext } from '../ChartProvider';
import { Line, type LineComponentProps } from '../line/Line';
import { Point } from '../point/Point';
import { Scrubber } from '../scrubber/Scrubber';
import { ChartText } from '../text';
import { type GradientDefinition, isCategoricalScale } from '../utils';
import { unwrapAnimatedValue } from '../utils/chart';
import { defaultBarEnterOpacityTransition } from '../utils/bar';
import { buildTransition, defaultTransition, type Transition } from '../utils/transition';
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

  const LegendEntry = memo(({ opacity = 1, label }: { opacity?: number; label: string }) => {
    return (
      <Box alignItems="center" flexDirection="row" gap={0.5}>
        <Box style={[styles.legendDot, { opacity }]} />
        <Text font="label2">{label}</Text>
      </Box>
    );
  });

  return (
    <VStack gap={0.5}>
      <CartesianChart
        height={defaultChartHeight}
        inset={{ top: 32, bottom: 0, left: 0, right: 0 }}
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
        <LegendEntry label="Estimated EPS" opacity={0.5} />
        <LegendEntry label="Actual EPS" />
      </HStack>
    </VStack>
  );
};

const btcData = btcCandles.slice(0, 180).reverse();

const btcOpenClose = btcData.map(
  (candle) => [parseFloat(candle.open), parseFloat(candle.close)] as [number, number],
);
const btcHighLow = btcData.map(
  (candle) => [parseFloat(candle.low), parseFloat(candle.high)] as [number, number],
);

const btcPrices = btcData.map((candle) => parseFloat(candle.close));
const btcVolumes = btcData.map((candle) => parseFloat(candle.volume));
const btcDates = btcData.map((candle) => new Date(parseInt(candle.start) * 1000));

const displayIndex = btcPrices.length - 1;
const currentPrice = btcPrices[displayIndex];
const currentDate = btcDates[displayIndex];

const PriceWithVolumeChart = memo(
  ({
    onScrubberPositionChange,
  }: {
    onScrubberPositionChange: (index: number | undefined) => void;
  }) => {
    const theme = useTheme();

    const formatPriceInThousands = useCallback((price: number) => {
      return `$${(price / 1000).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}k`;
    }, []);

    const formatDate = useCallback((date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }, []);

    const formatVolume = useCallback((volume: number) => {
      return `${(volume / 1000).toFixed(2)}K`;
    }, []);

    const scrubberLabel = useCallback(
      (dataIndex: number) => {
        return formatDate(btcDates[dataIndex]);
      },
      [formatDate],
    );

    const chartAccessibilityLabel = useMemo(() => {
      const lastIndex = btcPrices.length - 1;
      return `Bitcoin chart. Current date ${formatDate(btcDates[lastIndex])}. Current price ${formatPriceInThousands(
        btcPrices[lastIndex],
      )}. Current volume ${formatVolume(btcVolumes[lastIndex])}.`;
    }, [formatDate, formatPriceInThousands, formatVolume]);

    const getScrubberAccessibilityLabel = useCallback(
      (dataIndex: number) =>
        `Bitcoin on ${formatDate(btcDates[dataIndex])}. Price ${formatPriceInThousands(
          btcPrices[dataIndex],
        )}. Volume ${formatVolume(btcVolumes[dataIndex])}.`,
      [formatDate, formatPriceInThousands, formatVolume],
    );

    return (
      <CartesianChart
        enableScrubbing
        accessibilityLabel={chartAccessibilityLabel}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={defaultChartHeight}
        onScrubberPositionChange={onScrubberPositionChange}
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
        xAxis={{ scaleType: 'band', range: ({ min, max }) => ({ min, max: max - 8 }) }}
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
        <Line showArea seriesId="prices" />
        <Scrubber label={scrubberLabel} seriesIds={['prices']} />
      </CartesianChart>
    );
  },
);

const PriceWithVolumeHeader = memo(({ currentIndex }: { currentIndex: number | undefined }) => {
  const theme = useTheme();

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const formatVolume = useCallback((volume: number) => {
    return `${(volume / 1000).toFixed(2)}K`;
  }, []);

  const volumeText = useMemo(() => {
    return formatVolume(
      currentIndex !== undefined ? btcVolumes[currentIndex] : btcVolumes[displayIndex],
    );
  }, [currentIndex, formatVolume]);

  return (
    <HStack gap={2} justifyContent="space-between" paddingX={0}>
      <VStack gap={0}>
        <Text font="title1">Bitcoin</Text>
        <Text font="title2">{formatPrice(currentPrice)}</Text>
      </VStack>
      <HStack gap={2}>
        <VStack alignItems="flex-end" justifyContent="center">
          <Text font="label1">{formatDate(currentDate)}</Text>
          <Text font="label2">{volumeText}</Text>
        </VStack>
        <VStack justifyContent="center">
          <Image
            source={{ uri: assets.btc.imageUrl }}
            style={{ width: theme.iconSize.l, height: theme.iconSize.l, borderRadius: 1000 }}
          />
        </VStack>
      </HStack>
    </HStack>
  );
});

const PriceWithVolume = memo(() => {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>();

  return (
    <VStack gap={2}>
      <PriceWithVolumeHeader currentIndex={currentIndex} />
      <PriceWithVolumeChart onScrubberPositionChange={setCurrentIndex} />
    </VStack>
  );
});

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
      <Line showArea seriesId="revenue" />
    </CartesianChart>
  );
}

const ScatterplotWithCustomLabels = memo(() => {
  const theme = useTheme();
  const dataPoints = useMemo(
    () => [
      { x: 12, y: 34, label: 'A', color: theme.color.accentBoldBlue },
      { x: 28, y: 67, label: 'B', color: theme.color.accentBoldBlue },
      { x: 45, y: 23, label: 'C', color: theme.color.accentBoldBlue },
      { x: 67, y: 89, label: 'D', color: theme.color.bgPositive },
      { x: 82, y: 76, label: 'E', color: theme.color.bgPositive },
      { x: 34, y: 91, label: 'F', color: theme.color.bgPositive },
      { x: 56, y: 45, label: 'G', color: theme.color.bgPositive },
      { x: 19, y: 12, label: 'H', color: theme.color.fgWarning },
      { x: 73, y: 28, label: 'I', color: theme.color.fgWarning },
      { x: 91, y: 54, label: 'J', color: theme.color.fgWarning },
      { x: 15, y: 58, label: 'K', color: theme.color.fgPrimary },
      { x: 39, y: 72, label: 'L', color: theme.color.fgPrimary },
      { x: 88, y: 15, label: 'M', color: theme.color.fgPrimary },
      { x: 52, y: 82, label: 'N', color: theme.color.fgPrimary },
    ],
    [theme],
  );

  // Calculate domain based on data
  const xValues = useMemo(() => dataPoints.map((p) => p.x), [dataPoints]);
  const yValues = useMemo(() => dataPoints.map((p) => p.y), [dataPoints]);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  // Custom label component that places labels to the top-right
  const TopRightPointLabel = useCallback(({ x, y, offset = 0, children }: any) => {
    return (
      <ChartText
        font="label1"
        fontWeight={600}
        horizontalAlignment="left"
        verticalAlignment="bottom"
        x={x + offset}
        y={y - offset}
      >
        {children}
      </ChartText>
    );
  }, []);

  return (
    <CartesianChart
      height={300}
      xAxis={{
        domain: { min: xMin, max: xMax },
        domainLimit: 'nice',
      }}
      yAxis={{
        domain: { min: yMin, max: yMax },
        domainLimit: 'nice',
      }}
    >
      <XAxis showGrid showLine showTickMarks />
      <YAxis showGrid showLine showTickMarks position="left" />
      {dataPoints.map((point, index) => (
        <Point
          key={index}
          LabelComponent={TopRightPointLabel}
          dataX={point.x}
          dataY={point.y}
          fill={point.color}
          label={point.label}
          labelOffset={8}
          radius={5}
        />
      ))}
    </CartesianChart>
  );
});

const ChartStories = () => {
  return (
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
      <Example title="Scatterplot with Custom Labels">
        <ScatterplotWithCustomLabels />
      </Example>
    </ExampleScreen>
  );
};

// export default ChartStories;

const liveCandleCount = 10;
const liveTickIntervalMinMs = 250;
const liveTickIntervalMaxMs = 1_000;
const liveLoopDurationMs = 60_000;
const liveCandleDurationMs = 6_000;
const liveTicksPerCandle = 12;
const liveBasePrice = 50_000;
const liveTickStepMin = 75;
const liveTickStepMax = 450;
const livePriceTickStep = 2_000;
const livePriceTickMin = 40_000;
const livePriceTickMax = 60_000;
const livePriceTicks = Array.from(
  { length: (livePriceTickMax - livePriceTickMin) / livePriceTickStep + 1 },
  (_, index) => livePriceTickMin + index * livePriceTickStep,
);

const parseHorizontalLinePath = (path?: string) => {
  if (!path) return null;

  const commaMatch = path.match(/M\s*([\d.-]+)\s*,\s*([\d.-]+)\s+L\s*([\d.-]+)\s*,\s*([\d.-]+)/);
  if (commaMatch) {
    return { x1: Number(commaMatch[1]), y: Number(commaMatch[2]), x2: Number(commaMatch[3]) };
  }

  const spaceMatch = path.match(/M\s*([\d.-]+)\s+([\d.-]+)\s+L\s*([\d.-]+)\s+([\d.-]+)/);
  if (spaceMatch) {
    return { x1: Number(spaceMatch[1]), y: Number(spaceMatch[2]), x2: Number(spaceMatch[3]) };
  }

  return null;
};

type LiveCandle = {
  id: number;
  open: number;
  close: number;
  high: number;
  low: number;
};

type ExitingCandle = {
  candle: LiveCandle;
  slotIndex: number;
};

type LiveCandleData = {
  openClose: [number, number][];
  highLow: [number, number][];
};

let liveCandleId = 0;

const nextLiveCandleId = () => {
  liveCandleId += 1;
  return liveCandleId;
};

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43_758.5453;
  return value - Math.floor(value);
};

const createLiveCandle = (open: number): LiveCandle => ({
  id: nextLiveCandleId(),
  open,
  close: open,
  high: open,
  low: open,
});

const candlePriceTransition: Transition = { type: 'spring', stiffness: 1_400, damping: 90 };
const candleShiftTransition: Transition = { type: 'spring', stiffness: 1_200, damping: 85 };
const candleExitTransition: Transition = { type: 'timing', duration: 250 };
const candleEnterTransition = defaultTransition;
const candleEnterOpacityTransition = defaultBarEnterOpacityTransition;
const candleEnterDurationMs = candleEnterOpacityTransition.duration ?? 200;
const candleExitDurationMs = 250;
const minCandleBodyHeight = 1;

const LiveAxisGridLine = memo(({ d, stroke }: LineComponentProps) => {
  const path = typeof d === 'string' ? d : undefined;
  const coords = useMemo(() => parseHorizontalLinePath(path), [path]);
  const animatedY = useSharedValue(coords?.y ?? 0);

  useEffect(() => {
    if (!coords) return;
    animatedY.value = buildTransition(coords.y, candlePriceTransition);
  }, [animatedY, coords]);

  const lineStart = useDerivedValue(() => vec(coords?.x1 ?? 0, animatedY.value));
  const lineEnd = useDerivedValue(() => vec(coords?.x2 ?? 0, animatedY.value));

  if (!coords) return null;

  return <SkiaLine color={stroke} p1={lineStart} p2={lineEnd} strokeWidth={1} />;
});

const LiveAxisTickLabel = memo(({ x, y, children, ...props }: AxisTickLabelComponentProps) => {
  const targetY = unwrapAnimatedValue(y);
  const animatedY = useSharedValue(targetY);

  useEffect(() => {
    animatedY.value = buildTransition(targetY, candlePriceTransition);
  }, [animatedY, targetY]);

  return (
    <ChartText disableRepositioning x={x} y={animatedY} {...props}>
      {children}
    </ChartText>
  );
});

type AnimatedCandleProps = {
  candle: LiveCandle;
  slotIndex: number;
  yAxisId?: string;
  wickStrokeWidth?: number;
  isExiting?: boolean;
  isEntering?: boolean;
  onExitComplete?: () => void;
};

const AnimatedCandle = memo(
  ({
    candle,
    slotIndex,
    yAxisId,
    wickStrokeWidth = 1,
    isExiting = false,
    isEntering = false,
    onExitComplete,
  }: AnimatedCandleProps) => {
    const theme = useTheme();
    const { drawingArea, getXScale, getYScale } = useCartesianChartContext();
    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const slotX = useMemo(() => {
      if (!xScale || !isCategoricalScale(xScale)) return 0;
      return xScale(slotIndex) ?? 0;
    }, [slotIndex, xScale]);

    const barWidth = useMemo(() => {
      if (!xScale || !isCategoricalScale(xScale)) return 0;
      return xScale.bandwidth();
    }, [xScale]);

    const geometry = useMemo(() => {
      const wickCenterX = slotX + barWidth / 2;
      const highY = yScale?.(candle.high) ?? 0;
      const lowY = yScale?.(candle.low) ?? 0;
      const openY = yScale?.(candle.open) ?? 0;
      const closeY = yScale?.(candle.close) ?? 0;
      const bodyY = Math.min(openY, closeY);
      const bodyHeight = Math.max(Math.abs(openY - closeY), minCandleBodyHeight);
      const bullish = candle.open < candle.close;
      const color = bullish ? `rgb(${theme.spectrum.green40})` : `rgb(${theme.spectrum.red40})`;

      return { wickCenterX, highY, lowY, bodyY, bodyHeight, color, bodyX: slotX };
    }, [barWidth, candle, slotX, theme.spectrum.green40, theme.spectrum.red40, yScale]);

    const isReady = Boolean(xScale && yScale && drawingArea && barWidth > 0);

    const animatedWickX = useSharedValue(
      isEntering ? geometry.wickCenterX + barWidth : geometry.wickCenterX,
    );
    const animatedHighY = useSharedValue(geometry.highY);
    const animatedLowY = useSharedValue(geometry.lowY);
    const animatedBodyY = useSharedValue(geometry.bodyY);
    const animatedBodyHeight = useSharedValue(
      isEntering ? minCandleBodyHeight : geometry.bodyHeight,
    );
    const animatedOpacity = useSharedValue(isEntering ? 0 : 1);

    useEffect(() => {
      if (!isReady || isEntering) return;

      const shiftTransition = isExiting ? candleExitTransition : candleShiftTransition;
      const targetWickX = isExiting ? geometry.wickCenterX - barWidth * 2 : geometry.wickCenterX;

      animatedWickX.value = buildTransition(targetWickX, shiftTransition);
      animatedHighY.value = buildTransition(geometry.highY, candlePriceTransition);
      animatedLowY.value = buildTransition(geometry.lowY, candlePriceTransition);
      animatedBodyY.value = buildTransition(geometry.bodyY, candlePriceTransition);
      animatedBodyHeight.value = buildTransition(geometry.bodyHeight, candlePriceTransition);
    }, [
      animatedBodyHeight,
      animatedBodyY,
      animatedHighY,
      animatedLowY,
      animatedWickX,
      barWidth,
      geometry.bodyHeight,
      geometry.bodyY,
      geometry.highY,
      geometry.lowY,
      geometry.wickCenterX,
      isEntering,
      isExiting,
      isReady,
    ]);

    useEffect(() => {
      if (!isReady || !isEntering) return;

      animatedOpacity.value = buildTransition(1, candleEnterOpacityTransition);
      animatedWickX.value = buildTransition(geometry.wickCenterX, candleEnterTransition);
      animatedHighY.value = buildTransition(geometry.highY, candleEnterTransition);
      animatedLowY.value = buildTransition(geometry.lowY, candleEnterTransition);
      animatedBodyY.value = buildTransition(geometry.bodyY, candleEnterTransition);
      animatedBodyHeight.value = buildTransition(geometry.bodyHeight, candleEnterTransition);
    }, [
      animatedBodyHeight,
      animatedBodyY,
      animatedHighY,
      animatedLowY,
      animatedOpacity,
      animatedWickX,
      geometry.bodyHeight,
      geometry.bodyY,
      geometry.highY,
      geometry.lowY,
      geometry.wickCenterX,
      isEntering,
      isReady,
    ]);

    useEffect(() => {
      if (!isExiting) return;

      animatedOpacity.value = buildTransition(0, candleExitTransition);

      const timeoutId = setTimeout(() => {
        onExitComplete?.();
      }, candleExitDurationMs);

      return () => clearTimeout(timeoutId);
    }, [animatedOpacity, isExiting, onExitComplete]);

    const wickStart = useDerivedValue(() => vec(animatedWickX.value, animatedHighY.value));
    const wickEnd = useDerivedValue(() => vec(animatedWickX.value, animatedLowY.value));
    const animatedBodyX = useDerivedValue(() => animatedWickX.value - barWidth / 2);

    if (!isReady) return null;

    return (
      <Group opacity={animatedOpacity}>
        <SkiaLine
          color={geometry.color}
          p1={wickStart}
          p2={wickEnd}
          strokeWidth={wickStrokeWidth}
        />
        <RoundedRect
          color={geometry.color}
          height={animatedBodyHeight}
          r={2}
          width={barWidth}
          x={animatedBodyX}
          y={animatedBodyY}
        />
      </Group>
    );
  },
);

type AnimatedCandlestickPlotProps = {
  candles: LiveCandle[];
  enteringCandleId: number | null;
  exitingCandles: ExitingCandle[];
  onExitComplete: (candleId: number) => void;
  yAxisId?: string;
  wickStrokeWidth?: number;
};

const AnimatedCandlestickPlot = memo(
  ({
    candles,
    enteringCandleId,
    exitingCandles,
    onExitComplete,
    yAxisId,
    wickStrokeWidth = 1,
  }: AnimatedCandlestickPlotProps) => {
    const { drawingArea, getXScale, getYScale } = useCartesianChartContext();
    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    if (!drawingArea || !xScale || !yScale) return null;

    return (
      <Group>
        {exitingCandles.map(({ candle, slotIndex }) => (
          <AnimatedCandle
            key={`exit-${candle.id}`}
            candle={candle}
            isExiting
            slotIndex={slotIndex}
            wickStrokeWidth={wickStrokeWidth}
            yAxisId={yAxisId}
            onExitComplete={() => onExitComplete(candle.id)}
          />
        ))}
        {candles.map((candle, index) => (
          <AnimatedCandle
            key={candle.id}
            candle={candle}
            isEntering={candle.id === enteringCandleId}
            slotIndex={index}
            wickStrokeWidth={wickStrokeWidth}
            yAxisId={yAxisId}
          />
        ))}
      </Group>
    );
  },
);

const getLiveTickIntervalMs = (tickIndex: number) => {
  const random = seededRandom(tickIndex * 7 + 13);
  return liveTickIntervalMinMs + random * (liveTickIntervalMaxMs - liveTickIntervalMinMs);
};

const getNextClose = (currentClose: number, tickIndex: number) => {
  const directionRandom = seededRandom(tickIndex * 11 + 3);
  const stepRandom = seededRandom(tickIndex * 11 + 9);
  const direction = directionRandom < 0.5 ? 1 : -1;
  const step = liveTickStepMin + stepRandom * (liveTickStepMax - liveTickStepMin);

  return currentClose + direction * step;
};

const tickLiveCandle = (candle: LiveCandle, tickIndex: number): LiveCandle => {
  const close = getNextClose(candle.close, tickIndex);

  return {
    ...candle,
    close,
    high: Math.max(candle.high, close),
    low: Math.min(candle.low, close),
  };
};

const toLiveCandleData = (candles: LiveCandle[]): LiveCandleData => ({
  openClose: candles.map((candle) => [candle.open, candle.close]),
  highLow: candles.map((candle) => [candle.low, candle.high]),
});

const shiftLiveCandles = (candles: LiveCandle[]) => {
  const exited = candles[0];
  const lastClose = candles[candles.length - 1]?.close ?? liveBasePrice;
  const nextCandles = [...candles.slice(1), createLiveCandle(lastClose)];

  return {
    candles: nextCandles,
    exited,
    entered: nextCandles[nextCandles.length - 1],
  };
};

const buildLiveCandle = (open: number, startTickIndex: number) => {
  let candle = createLiveCandle(open);
  let tickIndex = startTickIndex;

  for (let tick = 0; tick < liveTicksPerCandle; tick++) {
    candle = tickLiveCandle(candle, tickIndex);
    tickIndex += 1;
  }

  return { candle, nextTickIndex: tickIndex };
};

const createInitialLiveCandles = () => {
  const candles: LiveCandle[] = [];
  let price = liveBasePrice;
  let tickIndex = 0;

  for (let index = 0; index < liveCandleCount; index++) {
    const result = buildLiveCandle(price, tickIndex);
    candles.push(result.candle);
    price = result.candle.close;
    tickIndex = result.nextTickIndex;
  }

  return { candles, tickIndex };
};

const initialLiveState = createInitialLiveCandles();

const RefreshedChart = memo(() => {
  const theme = useTheme();
  const [candles, setCandles] = useState(() => initialLiveState.candles);
  const [exitingCandles, setExitingCandles] = useState<ExitingCandle[]>([]);
  const [enteringCandleId, setEnteringCandleId] = useState<number | null>(null);
  const tickIndexRef = useRef(initialLiveState.tickIndex);
  const loopStartRef = useRef(Date.now());
  const lastShiftRef = useRef(Date.now());

  const handleExitComplete = useCallback((candleId: number) => {
    setExitingCandles((current) => current.filter(({ candle }) => candle.id !== candleId));
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleTick = () => {
      const tickIndex = tickIndexRef.current;
      const intervalMs = getLiveTickIntervalMs(tickIndex);

      timeoutId = setTimeout(() => {
        const now = Date.now();

        if (now - loopStartRef.current >= liveLoopDurationMs) {
          const reset = createInitialLiveCandles();
          loopStartRef.current = now;
          lastShiftRef.current = now;
          tickIndexRef.current = reset.tickIndex;
          setExitingCandles([]);
          setEnteringCandleId(null);
          setCandles(reset.candles);
          scheduleTick();
          return;
        }

        if (now - lastShiftRef.current >= liveCandleDurationMs) {
          lastShiftRef.current = now;

          setCandles((current) => {
            const shifted = shiftLiveCandles(current);
            setExitingCandles((exiting) => [...exiting, { candle: shifted.exited, slotIndex: 0 }]);
            setEnteringCandleId(shifted.entered.id);
            setTimeout(() => {
              setEnteringCandleId((activeId) =>
                activeId === shifted.entered.id ? null : activeId,
              );
            }, candleEnterDurationMs);

            const next = [...shifted.candles];
            const formingIndex = next.length - 1;
            next[formingIndex] = tickLiveCandle(next[formingIndex], tickIndex);
            return next;
          });
        } else {
          setCandles((current) => {
            if (current.length === 0) return current;

            const next = [...current];
            const formingIndex = next.length - 1;
            next[formingIndex] = tickLiveCandle(next[formingIndex], tickIndex);
            return next;
          });
        }

        tickIndexRef.current += 1;
        scheduleTick();
      }, intervalMs);
    };

    scheduleTick();

    return () => clearTimeout(timeoutId);
  }, []);

  const candleData = useMemo(() => toLiveCandleData(candles), [candles]);

  const yDomainExtent = useMemo(() => {
    const domainCandles = [...exitingCandles.map(({ candle }) => candle), ...candles];
    if (domainCandles.length === 0) return null;

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const candle of domainCandles) {
      min = Math.min(min, candle.low);
      max = Math.max(max, candle.high);
    }

    return { min, max };
  }, [candles, exitingCandles]);

  const formatPriceInThousands = useCallback((price: number) => {
    return `$${(price / 1000).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}k`;
  }, []);

  const series = useMemo(
    () => [
      {
        id: 'open/close',
        data: candleData.openClose,
        color: theme.color.fgPrimary,
      },
      {
        id: 'high/low',
        data: candleData.highLow,
        color: theme.color.fgMuted,
      },
    ],
    [candleData, theme.color.fgMuted, theme.color.fgPrimary],
  );

  const xAxis = useMemo(
    () => ({
      scaleType: 'band' as const,
      range: ({ min, max }: { min: number; max: number }) => ({ min, max: max - 8 }),
    }),
    [],
  );

  const yAxis = useMemo(
    () => ({
      domain: ({ min, max }: { min: number; max: number }) => {
        if (!yDomainExtent) {
          return { min, max };
        }

        const dataMin = Math.min(min, yDomainExtent.min);
        const dataMax = Math.max(max, yDomainExtent.max);
        const snappedMin = Math.floor(dataMin / livePriceTickStep) * livePriceTickStep;
        const snappedMax = Math.ceil(dataMax / livePriceTickStep) * livePriceTickStep;

        return {
          min: Math.max(snappedMin, livePriceTickMin),
          max: Math.min(snappedMax, livePriceTickMax),
        };
      },
    }),
    [yDomainExtent],
  );

  return (
    <ExampleScreen>
      <Example title="Live Candlesticks">
        <Box marginX={-3}>
          <CartesianChart
            height={defaultChartHeight}
            series={series}
            xAxis={xAxis}
            yAxis={yAxis}
            animate={false}
          >
            <YAxis
              showGrid
              GridLineComponent={LiveAxisGridLine}
              TickLabelComponent={LiveAxisTickLabel}
              minTickLabelGap={0}
              tickLabelFormatter={formatPriceInThousands}
              ticks={livePriceTicks}
              width={40}
            />
            <AnimatedCandlestickPlot
              candles={candles}
              enteringCandleId={enteringCandleId}
              exitingCandles={exitingCandles}
              onExitComplete={handleExitComplete}
            />
          </CartesianChart>
        </Box>
      </Example>
    </ExampleScreen>
  );
});

export default RefreshedChart;
