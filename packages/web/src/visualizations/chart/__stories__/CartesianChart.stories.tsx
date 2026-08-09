import React, { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { m as motion, type Transition } from 'framer-motion';

import { Radio } from '../../../controls/Radio';
import { Box, type BoxBaseProps, Divider, HStack, VStack } from '../../../layout';
import { RemoteImage } from '../../../media';
import { SectionHeader } from '../../../section-header/SectionHeader';
import { Pressable } from '../../../system';
import { Text } from '../../../typography';
import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import type { AxisTickLabelComponentProps } from '../axis/Axis';
import { useCartesianChartContext } from '../ChartProvider';
import { ReferenceLine, SolidLine, type LineComponentProps, type SolidLineProps } from '../line';
import { Line } from '../line/Line';
import { LineChart } from '../line/LineChart';
import { isCategoricalScale } from '../utils';
import { defaultBarEnterOpacityTransition } from '../utils/bar';
import { defaultTransition } from '../utils/transition';
import { BarPlot, CartesianChart, type ChartTextChildren, PeriodSelector, Scrubber } from '../';

export default {
  component: CartesianChart,
  title: 'Components/Chart/CartesianChart',
};

const MultipleChart = () => {
  const barData = [1, 2, 3, 2, 1];
  const lineData = [4, 3, 1, 3, 4];

  return (
    <VStack gap={3}>
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
      inset={0}
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
      requestedTickCount={2}
      tickLabelFormatter={(value) => `${Math.round(value)}%`}
    />
  );
});

const PredictionMarket = () => {
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

  const chartAccessibilityLabel = useMemo(() => {
    const lastIndex = eaglesData.length - 1;
    const teamA = eaglesData[lastIndex];
    const teamB = 100 - teamA;

    return `Prediction market chart with ${eaglesData.length} data points. Latest odds: Team A ${teamA.toFixed(
      1,
    )}%, Team B ${teamB.toFixed(1)}%.`;
  }, [eaglesData]);

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

  const getScrubberAccessibilityLabel = useCallback(
    (dataIndex: number) => {
      const teamA = eaglesData[dataIndex];
      const teamB = 100 - teamA;
      return `At position ${dataIndex + 1} of ${eaglesData.length}: Team A ${teamA.toFixed(
        1,
      )}%, Team B ${teamB.toFixed(1)}%.`;
    },
    [eaglesData],
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
      <CartesianChart
        enableScrubbing
        accessibilityLabel={chartAccessibilityLabel}
        height={300}
        inset={{ top: 40, right: 0, bottom: 32, left: 0 }}
        onScrubberPositionChange={updateScrubberLabel}
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
            showArea={selectedSeriesId !== null && selectedSeriesId === series.id}
          />
        ))}
        <CustomYAxis />
        <Scrubber
          accessibilityLabel={getScrubberAccessibilityLabel}
          label={scrubberLabel}
          seriesIds={scrubbedSeries}
        />
      </CartesianChart>
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

const EarningsHistory = () => {
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

  const LegendEntry = memo(({ opacity = 1, label }: { opacity?: number; label: string }) => {
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
      <CartesianChart
        animate={false}
        height={250}
        inset={0}
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

const PriceWithVolume = () => {
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

  const chartAccessibilityLabel = useMemo(() => {
    const lastIndex = btcPrices.length - 1;
    return `Bitcoin chart. Current date ${formatDate(btcDates[lastIndex])}. Current price ${formatPrice(
      btcPrices[lastIndex],
    )}. Current volume ${formatVolume(btcVolumes[lastIndex])}.`;
  }, [btcDates, btcPrices, btcVolumes, formatDate, formatPrice, formatVolume]);

  const getScrubberAccessibilityLabel = useCallback(
    (dataIndex: number) => {
      return `Bitcoin on ${formatDate(btcDates[dataIndex])}. Price ${formatPrice(
        btcPrices[dataIndex],
      )}. Volume ${formatVolume(btcVolumes[dataIndex])}.`;
    },
    [btcDates, btcPrices, btcVolumes, formatDate, formatPrice, formatVolume],
  );

  const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

  const headerId = useId();

  return (
    <VStack gap={2}>
      <SectionHeader
        balance={<Text font="title2">{formatPrice(currentPrice)}</Text>}
        end={
          <HStack gap={2}>
            <VStack alignItems="flex-end" justifyContent="center">
              <Text font="label1">{formatDate(currentDate)}</Text>
              <Text font="label2">{formatVolume(currentVolume)}</Text>
            </VStack>
            <VStack justifyContent="center">
              <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
            </VStack>
          </HStack>
        }
        id={headerId}
        style={{ padding: 0 }}
        title={<Text font="title1">Bitcoin</Text>}
      />
      <CartesianChart
        enableScrubbing
        accessibilityLabel={chartAccessibilityLabel}
        aria-labelledby={headerId}
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
            color: 'var(--color-fgMuted)',
            yAxisId: 'volume',
          },
        ]}
        style={{ outlineColor: assets.btc.color }}
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
        <YAxis
          showGrid
          GridLineComponent={ThinSolidLine}
          axisId="price"
          tickLabelFormatter={formatPriceInThousands}
          width={80}
        />
        <BarPlot seriesIds={['volume']} />
        <Line showArea seriesId="prices" />
        <Scrubber accessibilityLabel={getScrubberAccessibilityLabel} seriesIds={['prices']} />
      </CartesianChart>
    </VStack>
  );
};

function TradingTrends() {
  const profitData = [34, 24, 28, -4, 8, -16, -3, 12, 24, 18, 20, 28];
  const gains = profitData.map((value) => (value > 0 ? value : 0));
  const losses = profitData.map((value) => (value < 0 ? value : 0));

  const renderProfit = useCallback((value: number) => {
    return `$${value}M`;
  }, []);

  const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);
  const ThickSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={4} />);

  return (
    <CartesianChart
      height={250}
      series={[
        {
          id: 'gains',
          data: gains,
          yAxisId: 'profit',
          color: 'var(--color-bgPositive)',
          stackId: 'bars',
        },
        {
          id: 'losses',
          data: losses,
          yAxisId: 'profit',
          color: 'var(--color-bgNegative)',
          stackId: 'bars',
        },
        {
          id: 'revenue',
          data: [128, 118, 122, 116, 120, 114, 118, 122, 126, 130, 134, 138],
          yAxisId: 'revenue',
          color: 'var(--color-fgMuted)',
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

const liveChartHeight = 400;
const liveCandleCount = 30;
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

const candlePriceTransition: Transition = {
  type: 'spring',
  stiffness: 1_400,
  damping: 90,
  mass: 4,
};
const candleShiftTransition: Transition = {
  type: 'spring',
  stiffness: 1_200,
  damping: 85,
  mass: 4,
};
const candleExitTransition: Transition = { type: 'tween', duration: 0.25 };
const candleEnterTransition = defaultTransition;
const candleEnterOpacityTransition = defaultBarEnterOpacityTransition;
const candleEnterDurationMs = 200;
const candleExitDurationMs = 250;
const minCandleBodyHeight = 1;

const LiveAxisGridLine = memo(({ d, stroke, strokeWidth = 1 }: LineComponentProps) => {
  const coords = useMemo(() => parseHorizontalLinePath(d), [d]);

  if (!coords) return null;

  return (
    <motion.line
      animate={{ y1: coords.y, y2: coords.y }}
      initial={false}
      stroke={stroke ?? 'var(--color-bgLine)'}
      strokeWidth={strokeWidth}
      transition={candlePriceTransition}
      x1={coords.x1}
      x2={coords.x2}
      y1={coords.y}
      y2={coords.y}
    />
  );
});

const LiveAxisTickLabel = memo(
  ({
    x,
    y,
    children,
    horizontalAlignment = 'left',
    verticalAlignment = 'middle',
    color = 'var(--color-fgMuted)',
    style,
  }: AxisTickLabelComponentProps) => {
    const textAnchor =
      horizontalAlignment === 'right' ? 'end' : horizontalAlignment === 'left' ? 'start' : 'middle';
    const dominantBaseline =
      verticalAlignment === 'middle' ? 'middle' : verticalAlignment === 'top' ? 'hanging' : 'auto';

    return (
      <motion.text
        animate={{ x, y }}
        dominantBaseline={dominantBaseline}
        fill={color}
        initial={false}
        style={{
          fontFamily: 'var(--fontFamily-label2)',
          ...style,
        }}
        textAnchor={textAnchor}
        transition={candlePriceTransition}
      >
        {children}
      </motion.text>
    );
  },
);

type AnimatedCandleProps = {
  candle: LiveCandle;
  slotIndex: number;
  isExiting?: boolean;
  isEntering?: boolean;
  onExitComplete?: () => void;
};

const AnimatedCandle = memo(
  ({
    candle,
    slotIndex,
    isExiting = false,
    isEntering = false,
    onExitComplete,
  }: AnimatedCandleProps) => {
    const { drawingArea, getXScale, getYScale } = useCartesianChartContext();
    const xScale = getXScale();
    const yScale = getYScale();

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
      const color = bullish ? 'var(--color-fgPositive)' : 'var(--color-fgNegative)';

      return { wickCenterX, highY, lowY, bodyY, bodyHeight, color };
    }, [barWidth, candle, slotX, yScale]);

    const isReady = Boolean(xScale && yScale && drawingArea && barWidth > 0);
    const exitWickX = geometry.wickCenterX - barWidth * 2;
    const enterWickX = geometry.wickCenterX + barWidth;
    const targetWickX = isExiting ? exitWickX : geometry.wickCenterX;
    const xTransition = isEntering
      ? candleEnterTransition
      : isExiting
        ? candleExitTransition
        : candleShiftTransition;
    const yTransition = isEntering ? candleEnterTransition : candlePriceTransition;

    useEffect(() => {
      if (!isExiting) return;

      const timeoutId = setTimeout(() => {
        onExitComplete?.();
      }, candleExitDurationMs);

      return () => clearTimeout(timeoutId);
    }, [isExiting, onExitComplete]);

    if (!isReady) return null;

    return (
      <motion.g
        animate={{
          opacity: isExiting ? 0 : 1,
          x: targetWickX,
        }}
        initial={
          isEntering
            ? {
                opacity: 0,
                x: enterWickX,
              }
            : false
        }
        transition={{
          opacity: isEntering
            ? candleEnterOpacityTransition
            : isExiting
              ? candleExitTransition
              : undefined,
          x: xTransition,
        }}
      >
        <motion.line
          animate={{ y1: geometry.highY, y2: geometry.lowY }}
          initial={isEntering ? { y1: geometry.highY, y2: geometry.lowY } : false}
          stroke={geometry.color}
          strokeWidth={1}
          transition={{ y1: yTransition, y2: yTransition }}
          x1={0}
          x2={0}
          y1={geometry.highY}
          y2={geometry.lowY}
        />
        <motion.rect
          animate={{
            height: geometry.bodyHeight,
            width: barWidth,
            x: -barWidth / 2,
            y: geometry.bodyY,
          }}
          fill={geometry.color}
          initial={
            isEntering
              ? {
                  height: minCandleBodyHeight,
                  width: barWidth,
                  x: -barWidth / 2,
                  y: geometry.bodyY,
                }
              : false
          }
          rx={2}
          transition={{ height: yTransition, x: yTransition, y: yTransition, width: yTransition }}
        />
      </motion.g>
    );
  },
);

type AnimatedCandlestickPlotProps = {
  candles: LiveCandle[];
  enteringCandleId: number | null;
  exitingCandles: ExitingCandle[];
  onExitComplete: (candleId: number) => void;
};

const AnimatedCandlestickPlot = memo(
  ({ candles, enteringCandleId, exitingCandles, onExitComplete }: AnimatedCandlestickPlotProps) => {
    const { drawingArea, getXScale, getYScale } = useCartesianChartContext();
    const xScale = getXScale();
    const yScale = getYScale();

    if (!drawingArea || !xScale || !yScale) return null;

    return (
      <g>
        {exitingCandles.map(({ candle, slotIndex }) => (
          <AnimatedCandle
            key={`exit-${candle.id}`}
            candle={candle}
            isExiting
            slotIndex={slotIndex}
            onExitComplete={() => onExitComplete(candle.id)}
          />
        ))}
        {candles.map((candle, index) => (
          <AnimatedCandle
            key={candle.id}
            candle={candle}
            isEntering={candle.id === enteringCandleId}
            slotIndex={index}
          />
        ))}
      </g>
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

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const LiveCandlesticksChart = memo(() => {
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
        color: 'var(--color-fgPrimary)',
      },
      {
        id: 'high/low',
        data: candleData.highLow,
        color: 'var(--color-fgMuted)',
      },
    ],
    [candleData],
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
          return { min: min * 0.9, max };
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
    <CartesianChart
      animate={false}
      height={liveChartHeight}
      series={series}
      xAxis={xAxis}
      yAxis={yAxis}
    >
      <YAxis
        showGrid
        GridLineComponent={LiveAxisGridLine}
        TickLabelComponent={LiveAxisTickLabel}
        minTickLabelGap={0}
        tickLabelFormatter={formatPriceInThousands}
        ticks={livePriceTicks}
        width={80}
      />
      <AnimatedCandlestickPlot
        candles={candles}
        enteringCandleId={enteringCandleId}
        exitingCandles={exitingCandles}
        onExitComplete={handleExitComplete}
      />
    </CartesianChart>
  );
});

export const LiveCandlesticks = () => {
  return (
    <React.StrictMode>
      <LiveCandlesticksChart />
    </React.StrictMode>
  );
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <Text font="headline">{title}</Text>
      {description}
      {children}
    </VStack>
  );
};

export const Miscellaneous = () => {
  return (
    <React.StrictMode>
      <VStack gap={2}>
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
        <Example title="Trading Trends">
          <TradingTrends />
        </Example>
        <Example title="Live Candlesticks">
          <LiveCandlesticksChart />
        </Example>
      </VStack>
    </React.StrictMode>
  );
};
