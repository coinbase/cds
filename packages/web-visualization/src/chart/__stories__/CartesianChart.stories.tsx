import React, { memo, useCallback, useId, useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { IconButton } from '@coinbase/cds-web/buttons';
import { Radio } from '@coinbase/cds-web/controls/Radio';
import { Icon } from '@coinbase/cds-web/icons';
import { Box, type BoxBaseProps, Divider, HStack, VStack } from '@coinbase/cds-web/layout';
import { RemoteImage } from '@coinbase/cds-web/media';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import { Pressable } from '@coinbase/cds-web/system';
import { SegmentedTabs } from '@coinbase/cds-web/tabs';
import { Text } from '@coinbase/cds-web/typography';
import { AnimatePresence, m as motion } from 'framer-motion';
import type { DateTimeFormatOptions } from 'intl';

import { Area } from '../area/Area';
import { XAxis, YAxis } from '../axis';
import { useCartesianChartContext } from '../ChartProvider';
import {
  DefaultReferenceLineLabel,
  DottedLine,
  ReferenceLine,
  type ReferenceLineLabelComponentProps,
  SolidLine,
  type SolidLineProps,
} from '../line';
import { Line, type LineComponentProps } from '../line/Line';
import { LineChart } from '../line/LineChart';
import { defaultTransition, isCategoricalScale } from '../utils';
import { BarPlot, CartesianChart, type ChartTextChildren, PeriodSelector, Scrubber } from '../';

export default {
  component: CartesianChart,
  title: 'Components/Chart/CartesianChart',
  parameters: {
    a11y: {
      test: 'todo',
    },
  },
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
  const btcData = [...btcCandles].reverse().slice(0, 180);

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

  const scrubberLabel = useCallback(
    (dataIndex: number) =>
      `${formatPrice(btcPrices[dataIndex])} ${formatDate(btcDates[dataIndex])}`,
    [btcDates, btcPrices, formatDate, formatPrice],
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
        <Scrubber
          accessibilityLabel={getScrubberAccessibilityLabel}
          label={scrubberLabel}
          seriesIds={['prices']}
        />
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

const advancedTabs = [
  { id: 'hour', label: '1H' },
  { id: 'day', label: '1D' },
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: 'YTD' },
];

type ChartType = 'area' | 'line' | 'candlestick';
type ChartScaleType = 'linear' | 'log';

const chartTypeTabs: TabValue<ChartType>[] = [
  { id: 'area', label: <Icon active color="currentColor" name="lineChartCrypto" size="s" /> },
  { id: 'line', label: <Icon active color="currentColor" name="chartLine" size="s" /> },
  { id: 'candlestick', label: <Icon active color="currentColor" name="chartCandles" size="s" /> },
];

const chartScaleTypeTabs: TabValue<ChartScaleType>[] = [
  { id: 'linear', label: 'Linear' },
  { id: 'log', label: 'Log' },
];

const getFormattingConfigForPeriod = (period: string): DateTimeFormatOptions => {
  switch (period) {
    case 'hour':
    case 'day':
      return {
        hour: 'numeric',
        minute: 'numeric',
      };

    case 'week':
    case 'month':
      return {
        month: 'numeric',
        day: 'numeric',
      };

    default:
      return {
        month: 'numeric',
        year: 'numeric',
      };
  }
};

const chartTransition = { enter: null };

const DottedReferenceLine = memo((props: LineComponentProps) => (
  <DottedLine
    {...props}
    animate={true}
    stroke="var(--color-fg)"
    strokeDasharray="0 16"
    strokeWidth={3}
    transitions={chartTransition}
  />
));

export const Advanced = () => {
  const [activeTab, setActiveTab] = useState(advancedTabs[3]);
  const [chartType, setChartType] = useState<TabValue<ChartType>>(chartTypeTabs[0]);
  const [scaleType, setScaleType] = useState<TabValue<ChartScaleType>>(chartScaleTypeTabs[0]);
  const [showVolume, setShowVolume] = useState(true);

  const candles = useMemo(() => [...btcCandles].reverse(), []);

  const prices = candles.map((candle) => parseFloat(candle.close));
  const dates = candles.map((candle) => new Date(parseInt(candle.start, 10) * 1000));
  const volumes = candles.map((candle) => parseFloat(candle.volume));

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

  const formatXAxisDate = useCallback(
    (index: number) => {
      if (!candles[index]) return '';
      const date = dates[index];
      const formatConfig = getFormattingConfigForPeriod(activeTab.id);

      if (activeTab.id === 'hour' || activeTab.id === 'day') {
        return date.toLocaleTimeString('en-US', formatConfig);
      } else {
        return date.toLocaleDateString('en-US', formatConfig);
      }
    },
    [candles, dates, activeTab.id],
  );

  const handleChartTypeChange = useCallback((chartType: TabValue<ChartType> | null) => {
    setChartType(chartType ?? chartTypeTabs[0]);
  }, []);

  const handleScaleTypeChange = useCallback((scaleType: TabValue<ChartScaleType> | null) => {
    setScaleType(scaleType ?? chartScaleTypeTabs[0]);
  }, []);

  const series = useMemo(
    () => [
      {
        id: 'pricesArea',
        data: prices,
        color: assets.btc.color,
        gradient: {
          stops: [
            { offset: startingPrice, color: 'var(--color-fgNegative)' },
            { offset: startingPrice, color: 'var(--color-fgPositive)' },
          ],
        },
        yAxisId: 'pricesArea',
      },
      {
        id: 'pricesLine',
        data: prices,
        color: assets.btc.color,
        yAxisId: 'pricesLine',
      },
      {
        id: 'volume',
        data: volumes,
        color: 'var(--color-fgMuted)',
        yAxisId: 'volume',
      },
    ],
    [prices, startingPrice, volumes],
  );

  return (
    <VStack gap={2}>
      <CartesianChart
        enableScrubbing
        height={300}
        series={series}
        xAxis={{
          scaleType: 'band',
        }}
        yAxis={[
          {
            id: 'pricesArea',
            baseline: startingPrice,
            scaleType: scaleType.id,
            domainLimit: scaleType.id === 'log' ? 'strict' : 'nice',
            range: ({ min, max }) => ({ min: min, max: showVolume ? max - 32 : max }),
          },
          {
            id: 'pricesLine',
            scaleType: scaleType.id,
            domainLimit: scaleType.id === 'log' ? 'strict' : 'nice',
            range: ({ min, max }) => ({ min: min, max: showVolume ? max - 32 : max }),
          },
          { id: 'volume', range: ({ max }) => ({ min: max - 32, max }) },
        ]}
      >
        <XAxis tickLabelFormatter={formatXAxisDate} />
        <YAxis showGrid axisId="pricesLine" tickLabelFormatter={formatPrice} width={80} />
        <AnimatePresence key="animations" initial={false}>
          {chartType.id === 'area' && (
            <motion.g
              key="area"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={defaultTransition}
            >
              <Area fillOpacity={0.5} seriesId="pricesArea" transitions={chartTransition} />
              <Line seriesId="pricesArea" transitions={chartTransition} />
            </motion.g>
          )}
          {chartType.id === 'line' && (
            <motion.g
              key="line"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={defaultTransition}
            >
              <Line
                showArea
                areaType="dotted"
                seriesId="pricesLine"
                transitions={chartTransition}
              />
            </motion.g>
          )}
          {showVolume && (
            <motion.g
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={defaultTransition}
            >
              <BarPlot seriesIds={['volume']} transitions={chartTransition} />
            </motion.g>
          )}
        </AnimatePresence>
        <ReferenceLine
          LabelComponent={PriceLabel}
          LineComponent={DottedReferenceLine}
          dataY={startingPrice}
          label={formatPrice(startingPrice)}
          yAxisId="pricesLine"
        />
        <Scrubber
          hideOverlay
          idlePulse
          labelElevated
          accessibilityLabel={getScrubberAccessibilityLabel}
          label={formatLabel}
          seriesIds={[chartType.id === 'area' ? 'pricesArea' : 'pricesLine']}
        />
      </CartesianChart>
      <HStack gap={2}>
        <SegmentedTabs
          accessibilityLabel="Switch chart type"
          activeTab={chartType}
          borderRadius={300}
          gap={0.5}
          onChange={handleChartTypeChange}
          padding={0.5}
          styles={{
            activeIndicator: { borderRadius: 'var(--borderRadius-200)' },
          }}
          tabs={chartTypeTabs}
          width="fit-content"
        />
        <IconButton
          active={showVolume}
          name="chartVolume"
          onClick={() => setShowVolume(!showVolume)}
        />
        <SegmentedTabs
          accessibilityLabel="Switch chart scale type"
          activeTab={scaleType}
          borderRadius={300}
          gap={0.5}
          onChange={handleScaleTypeChange}
          padding={0.5}
          styles={{
            activeIndicator: { borderRadius: 'var(--borderRadius-200)' },
          }}
          tabs={chartScaleTypeTabs}
          width="fit-content"
        />
      </HStack>
    </VStack>
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
      <Example title="Trading Trends">
        <TradingTrends />
      </Example>
      <Example title="Advanced">
        <Advanced />
      </Example>
    </VStack>
  );
};
