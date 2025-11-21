import { forwardRef, memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { ListCell } from '@coinbase/cds-web/cells';
import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Avatar, RemoteImage } from '@coinbase/cds-web/media';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import { Pressable } from '@coinbase/cds-web/system';
import {
  SegmentedTab,
  type SegmentedTabProps,
  type TabComponent,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-web/tabs';
import { Text, TextLabel1 } from '@coinbase/cds-web/typography';
import { m } from 'framer-motion';

import {
  type AxisBounds,
  DefaultScrubberBeacon,
  DefaultScrubberLabel,
  defaultTransition,
  PeriodSelector,
  PeriodSelectorActiveIndicator,
  Point,
  projectPoint,
  Scrubber,
  type ScrubberBeaconProps,
  type ScrubberLabelProps,
  type ScrubberRef,
  useCartesianChartContext,
  useScrubberContext,
} from '../..';
import { Area, DottedArea, type DottedAreaProps, GradientArea } from '../../area';
import { DefaultAxisTickLabel, XAxis, YAxis } from '../../axis';
import { CartesianChart } from '../../CartesianChart';
import {
  DottedLine,
  type DottedLineProps,
  Line,
  LineChart,
  ReferenceLine,
  SolidLine,
  type SolidLineProps,
} from '..';

export default {
  component: LineChart,
  title: 'Components/Chart/LineChart',
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

function MultipleLine() {
  const pages = useMemo(
    () => ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
    [],
  );
  const pageViews = useMemo(() => [2400, 1398, 9800, 3908, 4800, 3800, 4300], []);
  const uniqueVisitors = useMemo(() => [4000, 3000, 2000, 2780, 1890, 2390, 3490], []);

  const chartAccessibilityLabel = `Website visitors across ${pageViews.length} pages.`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `${pages[index]} has ${pageViews[index]} views and ${uniqueVisitors[index]} unique visitors.`;
    },
    [pages, pageViews, uniqueVisitors],
  );

  const numberFormatter = useCallback(
    (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value),
    [],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: 'var(--color-accentBoldGreen)',
          // Label will render next to scrubber beacon
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: 'var(--color-accentBoldPurple)',
          label: 'Unique Visitors',
          // Default area is gradient
          areaType: 'dotted',
        },
      ]}
      xAxis={{
        // Used on the x-axis to provide context for each index from the series data array
        data: pages,
      }}
      yAxis={{
        showGrid: true,
        tickLabelFormatter: numberFormatter,
      }}
    >
      <Scrubber accessibilityLabel={scrubberAccessibilityLabel} />
    </LineChart>
  );
}

function DataFormat() {
  const yData = useMemo(() => [2, 5.5, 2, 8.5, 1.5, 5], []);
  const xData = useMemo(() => [1, 2, 3, 5, 8, 10], []);

  const chartAccessibilityLabel = `Chart with custom X and Y data. ${yData.length} data points`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `Point ${index + 1}: X value ${xData[index]}, Y value ${yData[index]}`;
    },
    [xData, yData],
  );

  return (
    <LineChart
      enableScrubbing
      points
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      curve="natural"
      height={{ base: 200, tablet: 225, desktop: 250 }}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      series={[
        {
          id: 'line',
          data: yData,
        },
      ]}
      xAxis={{ data: xData, showLine: true, showTickMarks: true, showGrid: true }}
      yAxis={{
        domain: { min: 0 },
        position: 'left',
        showLine: true,
        showTickMarks: true,
        showGrid: true,
      }}
    >
      <Scrubber hideOverlay accessibilityLabel={scrubberAccessibilityLabel} />
    </LineChart>
  );
}

function LiveUpdates() {
  const scrubberRef = useRef<ScrubberRef>(null);

  const initialData = useMemo(() => {
    return sparklineInteractiveData.hour.map((d) => d.value);
  }, []);

  const [priceData, setPriceData] = useState(initialData);

  const lastDataPointTimeRef = useRef(Date.now());
  const updateCountRef = useRef(0);

  const intervalSeconds = 3600 / initialData.length;

  const maxPercentChange = Math.abs(initialData[initialData.length - 1] - initialData[0]) * 0.05;

  useEffect(() => {
    const priceUpdateInterval = setInterval(
      () => {
        setPriceData((currentData) => {
          const newData = [...currentData];
          const lastPrice = newData[newData.length - 1];

          const priceChange = (Math.random() - 0.5) * maxPercentChange;
          const newPrice = Math.round((lastPrice + priceChange) * 100) / 100;

          // Check if we should roll over to a new data point
          const currentTime = Date.now();
          const timeSinceLastPoint = (currentTime - lastDataPointTimeRef.current) / 1000;

          if (timeSinceLastPoint >= intervalSeconds) {
            // Time for a new data point - remove first, add new at end
            lastDataPointTimeRef.current = currentTime;
            newData.shift(); // Remove oldest data point
            newData.push(newPrice); // Add new data point
            updateCountRef.current = 0;
          } else {
            // Just update the last data point
            newData[newData.length - 1] = newPrice;
            updateCountRef.current++;
          }

          return newData;
        });

        // Pulse the scrubber on each update
        scrubberRef.current?.pulse();
      },
      2000 + Math.random() * 1000,
    );

    return () => clearInterval(priceUpdateInterval);
  }, [intervalSeconds, maxPercentChange]);

  const chartAccessibilityLabel = useMemo(() => {
    return `Live Bitcoin price chart. Current price: $${priceData[priceData.length - 1].toFixed(2)}`;
  }, [priceData]);

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      const price = priceData[index];
      return `Bitcoin price at position ${index + 1}: $${price.toFixed(2)}`;
    },
    [priceData],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      inset={{ right: 64 }}
      series={[
        {
          id: 'btc',
          data: priceData,
          color: assets.btc.color,
        },
      ]}
    >
      <Scrubber ref={scrubberRef} labelElevated accessibilityLabel={scrubberAccessibilityLabel} />
    </LineChart>
  );
}

function MissingData() {
  const pages = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];
  const pageViews = [2400, 1398, null, 3908, 4800, 3800, 4300];
  const uniqueVisitors = [4000, 3000, null, 2780, 1890, 2390, 3490];

  const numberFormatter = useCallback(
    (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value),
    [],
  );

  return (
    <LineChart
      enableScrubbing
      points
      showArea
      showXAxis
      showYAxis
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: 'var(--color-accentBoldGreen)',
          // Label will render next to scrubber beacon
          label: 'Page Views',
          connectNulls: true,
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: 'var(--color-accentBoldPurple)',
          label: 'Unique Visitors',
        },
      ]}
      xAxis={{
        // Used on the x-axis to provide context for each index from the series data array
        data: pages,
      }}
      yAxis={{
        showGrid: true,
        tickLabelFormatter: numberFormatter,
      }}
    >
      {/* We can offset the overlay to account for the points being drawn on the lines */}
      <Scrubber overlayOffset={6} />
    </LineChart>
  );
}

function Interaction() {
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();

  return (
    <VStack gap={2}>
      <Text font="label1">
        {scrubberPosition !== undefined
          ? `Scrubber position: ${scrubberPosition}`
          : 'Not scrubbing'}
      </Text>
      <LineChart
        enableScrubbing
        showArea
        height={{ base: 200, tablet: 225, desktop: 250 }}
        onScrubberPositionChange={setScrubberPosition}
        series={[
          {
            id: 'prices',
            data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
          },
        ]}
      >
        <Scrubber />
      </LineChart>
    </VStack>
  );
}

function Points() {
  const keyMarketShiftIndices = [4, 6, 7, 9, 10];
  const data = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

  return (
    <CartesianChart
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: data,
        },
      ]}
    >
      <Area fill="rgb(var(--blue5))" seriesId="prices" />
      <Line
        points={({ dataX, dataY, ...props }) =>
          keyMarketShiftIndices.includes(dataX)
            ? {
                ...props,
                strokeWidth: 2,
                stroke: 'var(--color-bg)',
                radius: 5,
                onClick: () =>
                  alert(
                    `You have clicked a key market shift at position ${dataX + 1} with value ${dataY}!`,
                  ),
                accessibilityLabel: `Key market shift point at position ${dataX + 1}, value ${dataY}. Click to view details.`,
              }
            : false
        }
        seriesId="prices"
      />
    </CartesianChart>
  );
}

function Transitions() {
  const dataCount = 20;
  const maxDataOffset = 15000;
  const minStepOffset = 2500;
  const maxStepOffset = 10000;
  const domainLimit = 20000;
  const updateInterval = 500;

  const myTransitionConfig = { type: 'spring', stiffness: 700, damping: 20 };
  const negativeColor = 'rgb(var(--gray15))';
  const positiveColor = 'var(--color-fgPositive)';

  function generateNextValue(previousValue: number) {
    const range = maxStepOffset - minStepOffset;
    const offset = Math.random() * range + minStepOffset;

    let direction;
    if (previousValue >= maxDataOffset) {
      direction = -1;
    } else if (previousValue <= -maxDataOffset) {
      direction = 1;
    } else {
      direction = Math.random() < 0.5 ? -1 : 1;
    }

    let newValue = previousValue + offset * direction;
    newValue = Math.max(-maxDataOffset, Math.min(maxDataOffset, newValue));
    return newValue;
  }

  function generateInitialData() {
    const data = [];

    let previousValue = Math.random() * 2 * maxDataOffset - maxDataOffset;
    data.push(previousValue);

    for (let i = 1; i < dataCount; i++) {
      const newValue = generateNextValue(previousValue);
      data.push(newValue);
      previousValue = newValue;
    }

    return data;
  }

  const MyGradient = memo((props: DottedAreaProps) => {
    const areaGradient = {
      stops: ({ min, max }: AxisBounds) => [
        { offset: min, color: negativeColor, opacity: 1 },
        { offset: 0, color: negativeColor, opacity: 0 },
        { offset: 0, color: positiveColor, opacity: 0 },
        { offset: max, color: positiveColor, opacity: 1 },
      ],
    };

    return <DottedArea {...props} gradient={areaGradient} />;
  });

  function CustomTransitionsChart() {
    const [data, setData] = useState(generateInitialData);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setData((currentData) => {
          const lastValue = currentData[currentData.length - 1] ?? 0;
          const newValue = generateNextValue(lastValue);

          return [...currentData.slice(1), newValue];
        });
      }, updateInterval);

      return () => clearInterval(intervalId);
    }, []);

    const tickLabelFormatter = useCallback(
      (value: number) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(value),
      [],
    );

    const valueAtIndexFormatter = useCallback(
      (dataIndex: number) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(data[dataIndex]),
      [data],
    );

    const lineGradient = {
      stops: [
        { offset: 0, color: negativeColor },
        { offset: 0, color: positiveColor },
      ],
    };

    return (
      <CartesianChart
        enableScrubbing
        height={{ base: 200, tablet: 250, desktop: 300 }}
        inset={{ top: 32, bottom: 32, left: 16, right: 16 }}
        series={[
          {
            id: 'prices',
            data: data,
            gradient: lineGradient,
          },
        ]}
        yAxis={{ domain: { min: -domainLimit, max: domainLimit } }}
      >
        <YAxis showGrid requestedTickCount={2} tickLabelFormatter={tickLabelFormatter} />
        <Line
          showArea
          AreaComponent={MyGradient}
          seriesId="prices"
          strokeWidth={3}
          transition={myTransitionConfig}
        />
        <Scrubber
          hideOverlay
          beaconTransitions={{ update: myTransitionConfig }}
          label={valueAtIndexFormatter}
        />
      </CartesianChart>
    );
  }

  return <CustomTransitionsChart />;
}

function BasicAccessible() {
  const data = useMemo(() => [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58], []);

  // Chart-level accessibility label provides overview
  const chartAccessibilityLabel = useMemo(() => {
    const currentPrice = data[data.length - 1];
    return `Price chart showing trend over ${data.length} data points. Current value: ${currentPrice}. Use arrow keys to adjust view`;
  }, [data]);

  // Scrubber-level accessibility label provides specific position info
  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `Price at position ${index + 1} of ${data.length}: ${data[index]}`;
    },
    [data],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: data,
        },
      ]}
      yAxis={{
        showGrid: true,
      }}
    >
      <Scrubber accessibilityLabel={scrubberAccessibilityLabel} />
    </LineChart>
  );
}

function AccessibleWithHeader() {
  const headerId = useId();
  const data = useMemo(() => [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58], []);

  // Display label provides overview
  const displayLabel = useMemo(
    () => `Revenue chart showing trend. Current value: ${data[data.length - 1]}`,
    [data],
  );

  // Scrubber-specific accessibility label
  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `Viewing position ${index + 1} of ${data.length}, value: ${data[index]}`;
    },
    [data],
  );

  return (
    <VStack gap={2}>
      <Text font="label1" id={headerId}>
        {displayLabel}
      </Text>
      <LineChart
        enableScrubbing
        showArea
        showYAxis
        aria-labelledby={headerId}
        height={{ base: 200, tablet: 225, desktop: 250 }}
        series={[
          {
            id: 'revenue',
            data: data,
          },
        ]}
        yAxis={{
          showGrid: true,
        }}
      >
        <Scrubber accessibilityLabel={scrubberAccessibilityLabel} />
      </LineChart>
    </VStack>
  );
}

function Gradients() {
  const spectrumColors = [
    'blue',
    'green',
    'orange',
    'yellow',
    'gray',
    'indigo',
    'pink',
    'purple',
    'red',
    'teal',
    'chartreuse',
  ];
  const data = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

  const [currentSpectrumColor, setCurrentSpectrumColor] = useState('pink');

  return (
    <VStack gap={2}>
      <HStack flexWrap="wrap" gap={1} justifyContent="flex-end">
        {spectrumColors.map((color) => (
          <Pressable
            key={color}
            accessibilityLabel={`Select ${color}`}
            borderRadius={1000}
            height={{ base: 16, tablet: 24, desktop: 24 }}
            onClick={() => setCurrentSpectrumColor(color)}
            style={{
              backgroundColor: `rgb(var(--${color}20))`,
              border: `2px solid rgb(var(--${color}50))`,
              outlineColor: `rgb(var(--${color}80))`,
              outline:
                currentSpectrumColor === color ? `2px solid rgb(var(--${color}80))` : undefined,
            }}
            width={{ base: 16, tablet: 24, desktop: 24 }}
          />
        ))}
      </HStack>
      <LineChart
        points
        showYAxis
        height={{ base: 200, tablet: 225, desktop: 250 }}
        series={[
          {
            id: 'continuousGradient',
            data: data,
            gradient: {
              stops: [
                { offset: 0, color: `rgb(var(--${currentSpectrumColor}80))` },
                { offset: Math.max(...data), color: `rgb(var(--${currentSpectrumColor}20))` },
              ],
            },
          },
          {
            id: 'discreteGradient',
            data: data.map((d) => d + 50),
            // You can create a "discrete" gradient by having multiple stops at the same offset
            gradient: {
              stops: ({ min, max }) => [
                // Allows a function which accepts min/max or direct array
                { offset: min, color: `rgb(var(--${currentSpectrumColor}80))` },
                { offset: min + (max - min) / 3, color: `rgb(var(--${currentSpectrumColor}80))` },
                { offset: min + (max - min) / 3, color: `rgb(var(--${currentSpectrumColor}50))` },
                {
                  offset: min + ((max - min) / 3) * 2,
                  color: `rgb(var(--${currentSpectrumColor}50))`,
                },
                {
                  offset: min + ((max - min) / 3) * 2,
                  color: `rgb(var(--${currentSpectrumColor}20))`,
                },
                { offset: max, color: `rgb(var(--${currentSpectrumColor}20))` },
              ],
            },
          },
          {
            id: 'xAxisGradient',
            data: data.map((d) => d + 100),
            gradient: {
              // You can also configure by the x-axis.
              axis: 'x',
              stops: ({ min, max }) => [
                { offset: min, color: `rgb(var(--${currentSpectrumColor}80))`, opacity: 0 },
                { offset: max, color: `rgb(var(--${currentSpectrumColor}20))`, opacity: 1 },
              ],
            },
          },
        ]}
        strokeWidth={4}
        yAxis={{
          showGrid: true,
        }}
      />
    </VStack>
  );
}

function GainLossChart() {
  const data = useMemo(() => [-40, -28, -21, -5, 48, -5, -28, 2, -29, -46, 16, -30, -29, 8], []);
  const negativeColor = 'rgb(var(--gray15))';
  const positiveColor = 'var(--color-fgPositive)';

  const tickLabelFormatter = useCallback(
    (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value),
    [],
  );

  // Line gradient: hard color change at 0 (full opacity for line)
  const lineGradient = {
    stops: [
      { offset: 0, color: negativeColor },
      { offset: 0, color: positiveColor },
    ],
  };

  const chartAccessibilityLabel = `Gain/Loss chart showing price changes. Current value: ${tickLabelFormatter(data[data.length - 1])}`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      const value = data[index];
      const status = value >= 0 ? 'gain' : 'loss';
      return `Position ${index + 1} of ${data.length}: ${tickLabelFormatter(value)} ${status}`;
    },
    [data, tickLabelFormatter],
  );

  const GradientDottedArea = memo((props: DottedAreaProps) => (
    <DottedArea
      {...props}
      gradient={{
        stops: ({ min, max }) => [
          { offset: min, color: negativeColor, opacity: 0.4 },
          { offset: 0, color: negativeColor, opacity: 0 },
          { offset: 0, color: positiveColor, opacity: 0 },
          { offset: max, color: positiveColor, opacity: 0.4 },
        ],
      }}
    />
  ));

  return (
    <CartesianChart
      enableScrubbing
      accessibilityLabel={chartAccessibilityLabel}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: data,
          gradient: lineGradient,
        },
      ]}
    >
      <YAxis showGrid requestedTickCount={2} tickLabelFormatter={tickLabelFormatter} />
      <Line showArea AreaComponent={GradientDottedArea} seriesId="prices" strokeWidth={3} />
      <Scrubber hideOverlay accessibilityLabel={scrubberAccessibilityLabel} />
    </CartesianChart>
  );
}

function HighLowPrice() {
  const data = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];
  const minPrice = Math.min(...data);
  const maxPrice = Math.max(...data);

  const minPriceIndex = data.indexOf(minPrice);
  const maxPriceIndex = data.indexOf(maxPrice);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  return (
    <LineChart
      showArea
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: data,
        },
      ]}
    >
      <Point
        dataX={minPriceIndex}
        dataY={minPrice}
        label={formatPrice(minPrice)}
        labelPosition="bottom"
      />
      <Point
        dataX={maxPriceIndex}
        dataY={maxPrice}
        label={formatPrice(maxPrice)}
        labelPosition="top"
      />
    </LineChart>
  );
}

function StylingScrubber() {
  const pages = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];
  const pageViews = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const uniqueVisitors = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

  const numberFormatter = useCallback(
    (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value),
    [],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      showYAxis
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: 'var(--color-accentBoldGreen)',
          // Label will render next to scrubber beacon
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: 'var(--color-accentBoldPurple)',
          label: 'Unique Visitors',
          // Default area is gradient
          areaType: 'dotted',
        },
      ]}
      xAxis={{
        // Used on the x-axis to provide context for each index from the series data array
        data: pages,
        // Give space between the scrubber and the axis
        range: ({ min, max }) => ({ min, max: max - 8 }),
      }}
      yAxis={{
        showGrid: true,
        tickLabelFormatter: numberFormatter,
      }}
    >
      <Scrubber idlePulse LineComponent={SolidLine} seriesIds={['pageViews']} />
    </LineChart>
  );
}

function DynamicChartSizing() {
  const candles = [...btcCandles].reverse();
  const prices = candles.map((candle) => parseFloat(candle.close));
  const highs = candles.map((candle) => parseFloat(candle.high));
  const lows = candles.map((candle) => parseFloat(candle.low));

  const latestPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2];
  const change24h = ((latestPrice - previousPrice) / previousPrice) * 100;

  function DetailCell({ title, description }: { title: string; description: string }) {
    return (
      <VStack>
        <Text color="fgMuted" font="label2">
          {title}
        </Text>
        <Text font="headline">{description}</Text>
      </VStack>
    );
  }

  // Calculate 7-day moving average
  const calculateMA = (data: number[], period: number): number[] => {
    const ma: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i >= period - 1) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        ma.push(sum / period);
      }
    }
    return ma;
  };

  const ma7 = calculateMA(prices, 7);
  const latestMA7: number = ma7[ma7.length - 1];

  const periodHigh = Math.max(...highs);
  const periodLow = Math.min(...lows);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const formatPercentage = useCallback((value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }, []);

  return (
    <HStack gap={3}>
      <Box
        borderBottomLeftRadius={300}
        borderTopLeftRadius={300}
        flexGrow={1}
        style={{
          background: 'linear-gradient(0deg, #D07609 0%, #F7931A 100%)',
          marginTop: 'calc(-1 * var(--space-3))',
          marginLeft: 'calc(-1 * var(--space-3))',
          marginBottom: 'calc(-1 * var(--space-3))',
        }}
      >
        {/* LineChart fills to take up available width and height */}
        <LineChart
          series={[
            {
              id: 'btc',
              data: prices,
              color: 'white',
            },
          ]}
        />
      </Box>
      <VStack gap={1}>
        <VStack>
          <Text font="title1">BTC</Text>
          <Text font="title2">{formatPrice(latestPrice)}</Text>
        </VStack>
        <DetailCell description={formatPrice(periodHigh)} title="High" />
        <DetailCell description={formatPrice(periodLow)} title="Low" />
        <VStack display={{ base: 'none', tablet: 'flex', desktop: 'flex' }} gap={1}>
          <DetailCell description={formatPercentage(change24h)} title="24h" />
          <DetailCell description={formatPrice(latestMA7)} title="7d MA" />
        </VStack>
      </VStack>
    </HStack>
  );
}

function Compact() {
  const dimensions = { width: 62, height: 18 };

  const sparklineData = prices
    .map((price) => parseFloat(price))
    .filter((price, index) => index % 10 === 0);
  const positiveFloor = Math.min(...sparklineData) - 10;

  const negativeData = sparklineData.map((price) => -1 * price).reverse();
  const negativeCeiling = Math.max(...negativeData) + 10;

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  type CompactChartProps = {
    data: number[];
    showArea?: boolean;
    color?: string;
    referenceY: number;
  };

  const CompactChart = memo(({ data, showArea, color, referenceY }: CompactChartProps) => (
    <Box style={{ padding: 1 }}>
      <LineChart
        {...dimensions}
        enableScrubbing={false}
        inset={0}
        series={[
          {
            id: 'btc',
            data,
            color,
          },
        ]}
        showArea={showArea}
      >
        <ReferenceLine dataY={referenceY} />
      </LineChart>
    </Box>
  ));

  const ChartCell = memo(
    ({
      data,
      showArea,
      color,
      referenceY,
      subdetail,
    }: CompactChartProps & { subdetail: string }) => {
      const { isPhone } = useBreakpoints();

      return (
        <ListCell
          description={isPhone ? undefined : assets.btc.symbol}
          detail={formatPrice(parseFloat(prices[0]))}
          intermediary={
            <CompactChart color={color} data={data} referenceY={referenceY} showArea={showArea} />
          }
          media={<Avatar src={assets.btc.imageUrl} />}
          onClick={() => console.log('clicked')}
          spacingVariant="condensed"
          style={{ padding: 0 }}
          subdetail={subdetail}
          title={isPhone ? undefined : assets.btc.name}
        />
      );
    },
  );

  return (
    <VStack>
      <ChartCell
        color={assets.btc.color}
        data={sparklineData}
        referenceY={parseFloat(prices[Math.floor(prices.length / 4)])}
        subdetail="-4.55%"
      />
      <ChartCell
        showArea
        color={assets.btc.color}
        data={sparklineData}
        referenceY={parseFloat(prices[Math.floor(prices.length / 4)])}
        subdetail="-4.55%"
      />
      <ChartCell
        showArea
        color="var(--color-fgPositive)"
        data={sparklineData}
        referenceY={positiveFloor}
        subdetail="+0.25%"
      />
      <ChartCell
        showArea
        color="var(--color-fgNegative)"
        data={negativeData}
        referenceY={negativeCeiling}
        subdetail="-4.55%"
      />
    </VStack>
  );
}

function AssetPriceWithDottedArea() {
  const BTCTab: TabComponent = memo(
    forwardRef(
      ({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const { activeTab } = useTabsContext();
        const isActive = activeTab?.id === props.id;

        return (
          <SegmentedTab
            ref={ref}
            label={
              <TextLabel1
                style={{
                  transition: 'color 0.2s ease',
                  color: isActive ? assets.btc.color : undefined,
                }}
              >
                {label}
              </TextLabel1>
            }
            {...props}
          />
        );
      },
    ),
  );

  const BTCActiveIndicator = memo(({ style, ...props }: TabsActiveIndicatorProps) => (
    <PeriodSelectorActiveIndicator
      {...props}
      style={{ ...style, backgroundColor: `${assets.btc.color}1A` }}
    />
  ));

  const AssetPriceDotted = memo(() => {
    const currentPrice =
      sparklineInteractiveData.hour[sparklineInteractiveData.hour.length - 1].value;
    const tabs = useMemo(
      () => [
        { id: 'hour', label: '1H' },
        { id: 'day', label: '1D' },
        { id: 'week', label: '1W' },
        { id: 'month', label: '1M' },
        { id: 'year', label: '1Y' },
        { id: 'all', label: 'All' },
      ],
      [],
    );
    const [timePeriod, setTimePeriod] = useState<TabValue>(tabs[0]);

    const sparklineTimePeriodData = useMemo(() => {
      return sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData];
    }, [timePeriod]);

    const sparklineTimePeriodDataValues = useMemo(() => {
      return sparklineTimePeriodData.map((d) => d.value);
    }, [sparklineTimePeriodData]);

    const sparklineTimePeriodDataTimestamps = useMemo(() => {
      return sparklineTimePeriodData.map((d) => d.date);
    }, [sparklineTimePeriodData]);

    const onPeriodChange = useCallback(
      (period: TabValue | null) => {
        setTimePeriod(period || tabs[0]);
      },
      [tabs, setTimePeriod],
    );

    const priceFormatter = useMemo(
      () =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      [],
    );

    const scrubberPriceFormatter = useMemo(
      () =>
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      [],
    );

    const formatPrice = useCallback(
      (price: number) => {
        return priceFormatter.format(price);
      },
      [priceFormatter],
    );

    const formatDate = useCallback((date: Date) => {
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

      const monthDay = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      return `${dayOfWeek}, ${monthDay}, ${time}`;
    }, []);

    const scrubberLabel = useCallback(
      (index: number) => {
        const price = scrubberPriceFormatter.format(sparklineTimePeriodDataValues[index]);
        const date = formatDate(sparklineTimePeriodDataTimestamps[index]);
        return (
          <>
            <tspan style={{ fontWeight: 'bold' }}>{price} USD</tspan> {date}
          </>
        );
      },
      [
        scrubberPriceFormatter,
        sparklineTimePeriodDataValues,
        sparklineTimePeriodDataTimestamps,
        formatDate,
      ],
    );

    const chartAccessibilityLabel = `Bitcoin price chart for ${timePeriod.label} period. Current price: ${formatPrice(currentPrice)}`;

    const scrubberAccessibilityLabel = useCallback(
      (index: number) => {
        const price = scrubberPriceFormatter.format(sparklineTimePeriodDataValues[index]);
        const date = formatDate(sparklineTimePeriodDataTimestamps[index]);
        return `${price} USD ${date}`;
      },
      [
        scrubberPriceFormatter,
        sparklineTimePeriodDataValues,
        sparklineTimePeriodDataTimestamps,
        formatDate,
      ],
    );

    return (
      <VStack gap={2}>
        <SectionHeader
          balance={<Text font="title2">{formatPrice(currentPrice)}</Text>}
          end={
            <VStack justifyContent="center">
              <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
            </VStack>
          }
          style={{ padding: 0 }}
          title={<Text font="title1">Bitcoin</Text>}
        />
        <LineChart
          enableScrubbing
          showArea
          accessibilityLabel={chartAccessibilityLabel}
          areaType="dotted"
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'btc',
              data: sparklineTimePeriodDataValues,
              color: assets.btc.color,
            },
          ]}
          style={{ outlineColor: assets.btc.color }}
        >
          <Scrubber
            idlePulse
            labelElevated
            accessibilityLabel={scrubberAccessibilityLabel}
            label={scrubberLabel}
          />
        </LineChart>
        <PeriodSelector
          TabComponent={BTCTab}
          TabsActiveIndicatorComponent={BTCActiveIndicator}
          activeTab={timePeriod}
          onChange={onPeriodChange}
          tabs={tabs}
        />
      </VStack>
    );
  });

  return <AssetPriceDotted />;
}

function AssetPriceWidget() {
  const { isPhone } = useBreakpoints();
  const prices = [...btcCandles].reverse().map((candle) => parseFloat(candle.close));
  const latestPrice = prices[prices.length - 1];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatPercentChange = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const percentChange = (latestPrice - prices[0]) / prices[0];

  const chartAccessibilityLabel = `Bitcoin price chart. Current price: ${formatPrice(latestPrice)}. Change: ${formatPercentChange(percentChange)}`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `Bitcoin price at position ${index + 1}: ${formatPrice(prices[index])}`;
    },
    [prices],
  );

  return (
    <VStack
      borderRadius={300}
      gap={2}
      overflow="hidden"
      padding={2}
      paddingBottom={0}
      style={{
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), #ED702F',
      }}
    >
      <HStack alignItems="center" gap={2}>
        <RemoteImage aria-hidden shape="circle" size="xxl" source={assets.btc.imageUrl} />
        {!isPhone && (
          <VStack flexGrow={1} gap={0.25}>
            <Text aria-hidden font="title1" style={{ color: 'white' }}>
              BTC
            </Text>
            <Text color="fgMuted" font="label1">
              Bitcoin
            </Text>
          </VStack>
        )}
        <VStack alignItems="flex-end" flexGrow={isPhone ? 1 : undefined} gap={0.25}>
          <Text font="title1" style={{ color: 'white' }}>
            {formatPrice(latestPrice)}
          </Text>
          <Text
            accessibilityLabel={`Up ${formatPercentChange(percentChange)}`}
            color="fgPositive"
            font="label1"
          >
            +{formatPercentChange(percentChange)}
          </Text>
        </VStack>
      </HStack>
      <div
        style={{
          marginLeft: 'calc(-1 * var(--space-2))',
          marginRight: 'calc(-1 * var(--space-2))',
        }}
      >
        <LineChart
          showArea
          accessibilityLabel={chartAccessibilityLabel}
          height={92}
          inset={{ left: 0, right: 18, bottom: 0, top: 0 }}
          series={[
            {
              id: 'btcPrice',
              data: prices,
              color: assets.btc.color,
            },
          ]}
          width="100%"
          xAxis={{
            // Give space for idle pulse animation
            range: ({ min, max }) => ({ min, max: max - 16 }),
          }}
        >
          <Scrubber
            idlePulse
            accessibilityLabel={scrubberAccessibilityLabel}
            styles={{ beacon: { stroke: 'white' } }}
          />
        </LineChart>
      </div>
    </VStack>
  );
}

function ServiceAvailability() {
  const availabilityEvents = useMemo(
    () => [
      { date: new Date('2022-01-01'), availability: 79 },
      { date: new Date('2022-01-03'), availability: 81 },
      { date: new Date('2022-01-04'), availability: 82 },
      { date: new Date('2022-01-06'), availability: 91 },
      { date: new Date('2022-01-07'), availability: 92 },
      { date: new Date('2022-01-10'), availability: 86 },
    ],
    [],
  );

  const chartAccessibilityLabel = `Availability chart showing ${availabilityEvents.length} data points over time`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      const event = availabilityEvents[index];
      const formattedDate = event.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const status =
        event.availability >= 90 ? 'Good' : event.availability >= 85 ? 'Warning' : 'Critical';
      return `${formattedDate}: Availability ${event.availability}% - Status: ${status}`;
    },
    [availabilityEvents],
  );

  return (
    <CartesianChart
      enableScrubbing
      accessibilityLabel={chartAccessibilityLabel}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      series={[
        {
          id: 'availability',
          data: availabilityEvents.map((event) => event.availability),
          gradient: {
            stops: ({ min, max }) => [
              { offset: min, color: 'var(--color-fgNegative)' },
              { offset: 85, color: 'var(--color-fgNegative)' },
              { offset: 85, color: 'var(--color-fgWarning)' },
              { offset: 90, color: 'var(--color-fgWarning)' },
              { offset: 90, color: 'var(--color-fgPositive)' },
              { offset: max, color: 'var(--color-fgPositive)' },
            ],
          },
        },
      ]}
      xAxis={{
        data: availabilityEvents.map((event) => event.date.getTime()),
      }}
      yAxis={{
        domain: ({ min, max }) => ({ min: Math.max(min - 2, 0), max: Math.min(max + 2, 100) }),
      }}
    >
      <XAxis
        showGrid
        showLine
        showTickMarks
        tickLabelFormatter={(value) => new Date(value).toLocaleDateString()}
      />
      <YAxis
        showGrid
        showLine
        showTickMarks
        position="left"
        tickLabelFormatter={(value) => `${value}%`}
      />
      <Line
        curve="stepAfter"
        points={(props) => ({
          ...props,
          fill: 'var(--color-bg)',
          stroke: props.fill,
        })}
        seriesId="availability"
      />
      <Scrubber hideOverlay accessibilityLabel={scrubberAccessibilityLabel} />
    </CartesianChart>
  );
}

function ForecastAssetPrice() {
  const startYear = 2020;
  const data = [50, 45, 47, 46, 54, 54, 60, 61, 63, 66, 70];
  const currentIndex = 6;

  const strokeWidth = 3;
  // To prevent cutting off the edge of our lines
  const clipOffset = strokeWidth;

  const axisFormatter = useCallback(
    (dataIndex: number) => {
      return startYear + dataIndex;
    },
    [startYear],
  );

  const HistoricalLineComponent = memo((props: SolidLineProps) => {
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    if (!xScale || !drawingArea) return;

    const currentX = xScale(currentIndex);

    if (currentX === undefined) return;

    return (
      <>
        <defs>
          <clipPath id="historical-clip">
            <rect
              height={drawingArea.height + clipOffset * 2}
              width={currentX + clipOffset - drawingArea.x}
              x={drawingArea.x - clipOffset}
              y={drawingArea.y - clipOffset}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#historical-clip)">
          <SolidLine strokeWidth={strokeWidth} {...props} />
        </g>
      </>
    );
  });

  // Since the solid and dotted line have different curves,
  // we need two separate line components. Otherwise we could
  // have one line component with SolidLine and DottedLine inside
  // of it and two clipPaths.
  const ForecastLineComponent = memo((props: DottedLineProps) => {
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    if (!xScale || !drawingArea) return;

    const currentX = xScale(currentIndex);

    if (currentX === undefined) return;

    return (
      <>
        <defs>
          <clipPath id="forecast-clip">
            <rect
              height={drawingArea.height + clipOffset * 2}
              width={drawingArea.x + drawingArea.width - currentX + clipOffset * 2}
              x={currentX}
              y={drawingArea.y - clipOffset}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#forecast-clip)">
          <DottedLine
            strokeDasharray={`0 ${strokeWidth * 2}`}
            strokeWidth={strokeWidth}
            {...props}
          />
        </g>
      </>
    );
  });

  const CustomScrubber = memo(() => {
    const { scrubberPosition } = useScrubberContext();
    const isScrubbing = scrubberPosition !== undefined;
    // We need a fade in animation for the Scrubber
    return (
      <m.g
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.35 }}
      >
        <g style={{ opacity: isScrubbing ? 1 : 0 }}>
          <Scrubber hideOverlay />
        </g>
        <g style={{ opacity: isScrubbing ? 0 : 1 }}>
          <DefaultScrubberBeacon dataX={currentIndex} dataY={data[currentIndex]} seriesId="price" />
        </g>
      </m.g>
    );
  });

  return (
    <CartesianChart
      enableScrubbing
      height={{ base: 200, tablet: 225, desktop: 250 }}
      maxWidth={512}
      series={[{ id: 'price', data, color: assets.btc.color }]}
      style={{ margin: '0 auto' }}
    >
      <Line LineComponent={HistoricalLineComponent} curve="linear" seriesId="price" />
      <Line LineComponent={ForecastLineComponent} curve="monotone" seriesId="price" type="dotted" />
      <XAxis position="bottom" requestedTickCount={3} tickLabelFormatter={axisFormatter} />
      <CustomScrubber />
    </CartesianChart>
  );
}

function MonotoneAssetPrice() {
  const prices = sparklineInteractiveData.hour;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    [],
  );

  const scrubberPriceFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [],
  );

  const formatPrice = useCallback(
    (price: number) => {
      return priceFormatter.format(price);
    },
    [priceFormatter],
  );

  // Custom tick label component with offset positioning
  const CustomYAxisTickLabel = useCallback(
    (props: any) => <DefaultAxisTickLabel {...props} dx={4} dy={-12} horizontalAlignment="left" />,
    [],
  );

  const formatDate = useCallback((date: Date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    const monthDay = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${dayOfWeek}, ${monthDay}, ${time}`;
  }, []);

  const scrubberLabel = useCallback(
    (index: number) => {
      const price = scrubberPriceFormatter.format(prices[index].value);
      const date = formatDate(prices[index].date);
      return (
        <>
          <tspan style={{ fontWeight: 'bold' }}>{price} USD</tspan> {date}
        </>
      );
    },
    [scrubberPriceFormatter, prices, formatDate],
  );

  const CustomScrubberBeacon = memo(({ dataX, dataY, seriesId, isIdle }: ScrubberBeaconProps) => {
    const { getSeries, getXScale, getYScale } = useCartesianChartContext();
    const targetSeries = getSeries(seriesId);
    const xScale = getXScale();
    const yScale = getYScale(targetSeries?.yAxisId);

    const pixelCoordinate = useMemo(() => {
      if (!xScale || !yScale) return;
      return projectPoint({ x: dataX, y: dataY, xScale, yScale });
    }, [dataX, dataY, xScale, yScale]);

    if (!pixelCoordinate) return;

    if (isIdle) {
      return (
        <m.circle
          animate={{ cx: pixelCoordinate.x, cy: pixelCoordinate.y }}
          cx={pixelCoordinate.x}
          cy={pixelCoordinate.y}
          fill="var(--color-bg)"
          r={5}
          stroke="var(--color-fg)"
          strokeWidth={3}
          transition={defaultTransition}
        />
      );
    }

    return (
      <circle
        cx={pixelCoordinate.x}
        cy={pixelCoordinate.y}
        fill="var(--color-bg)"
        r={5}
        stroke="var(--color-fg)"
        strokeWidth={3}
      />
    );
  });

  return (
    <LineChart
      enableScrubbing
      showYAxis
      height={{ base: 200, tablet: 250, desktop: 300 }}
      inset={{ top: 64 }}
      series={[
        {
          id: 'btc',
          data: prices.map((price) => price.value),
          color: 'var(--color-fg)',
          gradient: {
            axis: 'x',
            stops: ({ min, max }) => [
              { offset: min, color: 'var(--color-fg)', opacity: 0 },
              { offset: 32, color: 'var(--color-fg)', opacity: 1 },
            ],
          },
        },
      ]}
      style={{ outlineColor: 'var(--color-fg)' }}
      xAxis={{
        range: ({ min, max }) => ({ min: 96, max: max }),
      }}
      yAxis={{
        position: 'left',
        width: 0,
        showGrid: true,
        tickLabelFormatter: formatPrice,
        TickLabelComponent: CustomYAxisTickLabel,
      }}
    >
      <Scrubber
        hideOverlay
        labelElevated
        BeaconComponent={CustomScrubberBeacon}
        LineComponent={SolidLine}
        label={scrubberLabel}
      />
    </LineChart>
  );
}

function CustomLabelComponent() {
  const CustomLabelComponent = memo((props: ScrubberLabelProps) => {
    const { drawingArea } = useCartesianChartContext();

    if (!drawingArea) return;

    return (
      <DefaultScrubberLabel
        {...props}
        elevated
        background="var(--color-bgPrimary)"
        color="var(--color-bgPrimaryWash)"
        dy={32}
        fontWeight="label1"
        y={drawingArea.y + drawingArea.height}
      />
    );
  });
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      inset={{ top: 16, bottom: 64 }}
      series={[
        {
          id: 'prices',
          data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
        },
      ]}
    >
      <Scrubber
        LabelComponent={CustomLabelComponent}
        label={(dataIndex: number) => `Day ${dataIndex + 1}`}
      />
    </LineChart>
  );
}

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <LineChart
          showArea
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        />
      </Example>
      <Example title="Multiple Lines">
        <MultipleLine />
      </Example>
      <Example title="Data Format">
        <DataFormat />
      </Example>
      <Example title="Live Updates">
        <LiveUpdates />
      </Example>
      <Example title="Missing Data">
        <MissingData />
      </Example>
      <Example title="Empty State">
        <LineChart
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'line',
              color: 'rgb(var(--gray50))',
              data: [1, 1],
              showArea: true,
            },
          ]}
          yAxis={{ domain: { min: -1, max: 3 } }}
        />
      </Example>
      <Example title="Scales">
        <LineChart
          showArea
          showYAxis
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
          yAxis={{
            scaleType: 'log',
            showGrid: true,
            ticks: [1, 10, 100],
          }}
        />
      </Example>
      <Example title="Interaction">
        <Interaction />
      </Example>
      <Example title="Points">
        <Points />
      </Example>
      <Example title="Transitions">
        <Transitions />
      </Example>
      <Example title="Basic Accessible">
        <BasicAccessible />
      </Example>
      <Example title="Accessible with Header">
        <AccessibleWithHeader />
      </Example>
      <Example title="Styling Axes">
        <LineChart
          showArea
          showXAxis
          showYAxis
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
          xAxis={{
            showGrid: true,
            showLine: true,
            showTickMarks: true,
            tickLabelFormatter: (dataX: number) => `Day ${dataX}`,
          }}
          yAxis={{
            showGrid: true,
            showLine: true,
            showTickMarks: true,
          }}
        />
      </Example>
      <Example title="Gradients">
        <Gradients />
      </Example>
      <Example title="Gain/Loss">
        <GainLossChart />
      </Example>
      <Example title="Styling Lines">
        <LineChart
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'top',
              data: [15, 28, 32, 44, 46, 36, 40, 45, 48, 38],
            },
            {
              id: 'upperMiddle',
              data: [12, 23, 21, 29, 34, 28, 31, 38, 42, 35],
              color: '#ef4444',
              type: 'dotted',
            },
            {
              id: 'lowerMiddle',
              data: [8, 15, 14, 25, 20, 18, 22, 28, 24, 30],
              color: '#f59e0b',
              curve: 'natural',
              gradient: {
                axis: 'x',
                stops: [
                  { offset: 0, color: '#E3D74D' },
                  { offset: 9, color: '#F7931A' },
                ],
              },
              strokeWidth: 6,
            },
            {
              id: 'bottom',
              data: [4, 8, 11, 15, 16, 14, 16, 10, 12, 14],
              color: '#800080',
              curve: 'step',
              AreaComponent: DottedArea,
              showArea: true,
            },
          ]}
        />
      </Example>
      <Example title="Styling Reference Lines">
        <LineChart
          enableScrubbing
          showArea
          height={{ base: 200, tablet: 225, desktop: 250 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
              color: 'var(--color-fgPositive)',
            },
          ]}
          xAxis={{
            // Give space before the end of the chart for the scrubber
            range: ({ min, max }) => ({ min, max: max - 24 }),
          }}
        >
          <ReferenceLine
            LineComponent={(props) => (
              <DottedLine {...props} strokeDasharray="0 16" strokeWidth={3} />
            )}
            dataY={10}
            stroke="var(--color-fg)"
          />
          <Scrubber />
        </LineChart>
      </Example>
      <Example title="High/Low Price">
        <HighLowPrice />
      </Example>
      <Example title="Styling Scrubber">
        <StylingScrubber />
      </Example>
      <Example title="Dynamic Chart Sizing">
        <DynamicChartSizing />
      </Example>
      <Example title="Compact">
        <Compact />
      </Example>
      <Example title="Asset Price With Dotted Area">
        <AssetPriceWithDottedArea />
      </Example>
      <Example title="Monotone Asset Price">
        <MonotoneAssetPrice />
      </Example>
      <Example title="Asset Price Widget">
        <AssetPriceWidget />
      </Example>
      <Example title="Service Availability">
        <ServiceAvailability />
      </Example>
      <Example title="Forecast Asset Price">
        <ForecastAssetPrice />
      </Example>
      <Example title="Custom Label Component">
        <CustomLabelComponent />
      </Example>
    </VStack>
  );
};
