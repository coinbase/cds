import React, { memo, useCallback, useId, useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Radio } from '@coinbase/cds-web/controls/Radio';
import { Box, type BoxBaseProps, Divider, HStack, VStack } from '@coinbase/cds-web/layout';
import { RemoteImage } from '@coinbase/cds-web/media';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import { Pressable } from '@coinbase/cds-web/system';
import { Text, TextHeadline } from '@coinbase/cds-web/typography';

import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import { useCartesianChartContext } from '../ChartProvider';
import { ReferenceLine, SolidLine, type SolidLineProps } from '../line';
import { Line } from '../line/Line';
import { LineChart } from '../line/LineChart';
import { isCategoricalScale } from '../utils';
import {
  BarPlot,
  CartesianChart,
  type ChartTextChildren,
  PeriodSelector,
  Point,
  Scrubber,
} from '../';

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
        <Scrubber label={scrubberLabel} seriesIds={scrubbedSeries} />
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
        <LegendItem label="Estimated EPS" opacity={0.5} />
        <LegendItem label="Actual EPS" />
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

  const accessibilityLabel = useMemo(() => {
    if (scrubIndex === undefined)
      return `Current Bitcoin price: ${formatPrice(currentPrice)}, Volume: ${formatVolume(currentVolume)}`;
    return `Bitcoin price at ${formatDate(currentDate)}: ${formatPrice(currentPrice)}, Volume: ${formatVolume(currentVolume)}`;
  }, [scrubIndex, currentPrice, currentVolume, currentDate, formatPrice, formatVolume, formatDate]);

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
        accessibilityLabel={accessibilityLabel}
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
        <Scrubber seriesIds={['prices']} />
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

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <TextHeadline>{title}</TextHeadline>
      {description}
      {children}
    </VStack>
  );
};

export const Miscellaneous = () => {
  return (
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
    </VStack>
  );
};
