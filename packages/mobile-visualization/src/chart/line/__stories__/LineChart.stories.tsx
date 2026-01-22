import { forwardRef, memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { View } from 'react-native';
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { useTheme } from '@coinbase/cds-mobile';
import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
import { ListCell } from '@coinbase/cds-mobile/cells';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, type BoxBaseProps, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Avatar, RemoteImage } from '@coinbase/cds-mobile/media';
import { SectionHeader } from '@coinbase/cds-mobile/section-header/SectionHeader';
import { Pressable } from '@coinbase/cds-mobile/system';
import { type TabComponent, type TabsActiveIndicatorProps } from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { Text } from '@coinbase/cds-mobile/typography';
import {
  Circle,
  FontWeight,
  Group,
  Line as SkiaLine,
  Rect,
  Skia,
  type SkTextStyle,
  TextAlign,
} from '@shopify/react-native-skia';

import { Area, DottedArea, type DottedAreaProps } from '../../area';
import { DefaultAxisTickLabel, XAxis, YAxis } from '../../axis';
import { BarChart, type BarComponentProps, BarPlot } from '../../bar';
import { CartesianChart } from '../../CartesianChart';
import { useCartesianChartContext } from '../../ChartProvider';
import { PeriodSelector, PeriodSelectorActiveIndicator } from '../../PeriodSelector';
import { Point } from '../../point';
import {
  DefaultScrubberBeacon,
  DefaultScrubberBeaconLabel,
  DefaultScrubberLabel,
  Scrubber,
  type ScrubberBeaconLabelProps,
  type ScrubberBeaconProps,
  type ScrubberLabelProps,
  type ScrubberRef,
} from '../../scrubber';
import {
  type AxisBounds,
  buildTransition,
  defaultTransition,
  getLineData,
  getPointOnSerializableScale,
  projectPointWithSerializableScale,
  type Transition,
  unwrapAnimatedValue,
  useScrubberContext,
} from '../../utils';
import {
  DottedLine,
  type DottedLineProps,
  Line,
  LineChart,
  type LineComponentProps,
  ReferenceLine,
  SolidLine,
  type SolidLineProps,
} from '..';

function MultipleLine() {
  const theme = useTheme();
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();
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

  const accessibilityLabel = useMemo(() => {
    if (scrubberPosition !== undefined) {
      return scrubberAccessibilityLabel(scrubberPosition);
    }
    return chartAccessibilityLabel;
  }, [scrubberPosition, chartAccessibilityLabel, scrubberAccessibilityLabel]);

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={accessibilityLabel}
      height={200}
      onScrubberPositionChange={setScrubberPosition}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: theme.color.accentBoldGreen,
          // Label will render next to scrubber beacon
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: theme.color.accentBoldPurple,
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
      <Scrubber />
    </LineChart>
  );
}

function DataFormat() {
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();
  const yData = useMemo(() => [2, 5.5, 2, 8.5, 1.5, 5], []);
  const xData = useMemo(() => [1, 2, 3, 5, 8, 10], []);

  const chartAccessibilityLabel = `Chart with custom X and Y data. ${yData.length} data points`;

  const scrubberAccessibilityLabel = useCallback(
    (index: number) => {
      return `Point ${index + 1}: X value ${xData[index]}, Y value ${yData[index]}`;
    },
    [xData, yData],
  );

  const accessibilityLabel = useMemo(() => {
    if (scrubberPosition !== undefined) {
      return scrubberAccessibilityLabel(scrubberPosition);
    }
    return chartAccessibilityLabel;
  }, [scrubberPosition, chartAccessibilityLabel, scrubberAccessibilityLabel]);

  return (
    <LineChart
      enableScrubbing
      points
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={accessibilityLabel}
      curve="natural"
      height={200}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      onScrubberPositionChange={setScrubberPosition}
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
      <Scrubber hideOverlay />
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

  return (
    <LineChart
      enableScrubbing
      showArea
      height={200}
      inset={{ right: 64 }}
      series={[
        {
          id: 'btc',
          data: priceData,
          color: assets.btc.color,
        },
      ]}
    >
      <Scrubber ref={scrubberRef} />
    </LineChart>
  );
}

function MissingData() {
  const theme = useTheme();
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
      height={200}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: theme.color.accentBoldGreen,
          // Label will render next to scrubber beacon
          label: 'Page Views',
          connectNulls: true,
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: theme.color.accentBoldPurple,
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
        height={200}
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
  const theme = useTheme();
  const keyMarketShiftIndices = [4, 6, 7, 9, 10];
  const data = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

  return (
    <CartesianChart
      height={200}
      series={[
        {
          id: 'prices',
          data: data,
        },
      ]}
    >
      <Area fill={`rgb(${theme.spectrum.blue5})`} seriesId="prices" />
      <Line
        points={({ dataX, dataY, ...props }) =>
          keyMarketShiftIndices.includes(dataX)
            ? {
                ...props,
                strokeWidth: 2,
                stroke: theme.color.bg,
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
  const theme = useTheme();
  const dataCount = 20;
  const maxDataOffset = 15000;
  const minStepOffset = 2500;
  const maxStepOffset = 10000;
  const domainLimit = 20000;
  const updateInterval = 500;

  const myTransitionConfig: Transition = { type: 'spring', stiffness: 700, damping: 20 };
  const negativeColor = `rgb(${theme.spectrum.gray15})`;
  const positiveColor = theme.color.fgPositive;

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
        height={200}
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
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();
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

  const accessibilityLabel = useMemo(() => {
    if (scrubberPosition !== undefined) {
      return scrubberAccessibilityLabel(scrubberPosition);
    }
    return chartAccessibilityLabel;
  }, [scrubberPosition, chartAccessibilityLabel, scrubberAccessibilityLabel]);

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      accessibilityLabel={accessibilityLabel}
      height={200}
      onScrubberPositionChange={setScrubberPosition}
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
      <Scrubber />
    </LineChart>
  );
}

function Gradients() {
  const theme = useTheme();
  const spectrumColors: ThemeVars.SpectrumHue[] = [
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

  const [currentSpectrumColor, setCurrentSpectrumColor] = useState<ThemeVars.SpectrumHue>('pink');

  return (
    <VStack gap={2}>
      <HStack flexWrap="wrap" gap={1} justifyContent="flex-end">
        {spectrumColors.map((color) => (
          <Pressable
            key={color}
            accessibilityLabel={`Select ${color}`}
            height={16}
            onPress={() => setCurrentSpectrumColor(color)}
            style={{
              backgroundColor: `rgb(${theme.spectrum[`${color}20`]})`,
              borderColor: `rgb(${theme.spectrum[`${color}50`]})`,
              borderWidth: 2,
            }}
            width={16}
          />
        ))}
      </HStack>
      <LineChart
        points
        showYAxis
        height={200}
        series={[
          {
            id: 'continuousGradient',
            data: data,
            gradient: {
              stops: [
                { offset: 0, color: `rgb(${theme.spectrum[`${currentSpectrumColor}80`]})` },
                {
                  offset: Math.max(...data),
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}20`]})`,
                },
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
                { offset: min, color: `rgb(${theme.spectrum[`${currentSpectrumColor}80`]})` },
                {
                  offset: min + (max - min) / 3,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}80`]})`,
                },
                {
                  offset: min + (max - min) / 3,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}50`]})`,
                },
                {
                  offset: min + ((max - min) / 3) * 2,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}50`]})`,
                },
                {
                  offset: min + ((max - min) / 3) * 2,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}20`]})`,
                },
                { offset: max, color: `rgb(${theme.spectrum[`${currentSpectrumColor}20`]})` },
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
                {
                  offset: min,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}80`]})`,
                  opacity: 0,
                },
                {
                  offset: max,
                  color: `rgb(${theme.spectrum[`${currentSpectrumColor}20`]})`,
                  opacity: 1,
                },
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
  const theme = useTheme();
  const data = useMemo(() => [-40, -28, -21, -5, 48, -5, -28, 2, -29, -46, 16, -30, -29, 8], []);
  const negativeColor = `rgb(${theme.spectrum.gray15})`;
  const positiveColor = theme.color.fgPositive;

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
      height={200}
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
      <Scrubber hideOverlay />
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
      height={200}
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
  const theme = useTheme();
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
      height={200}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: theme.color.accentBoldGreen,
          // Label will render next to scrubber beacon
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: theme.color.accentBoldPurple,
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
      <Scrubber idlePulse LineComponent={SolidLine} seriesIds={['pageViews']} />
    </LineChart>
  );
}

function Compact() {
  const theme = useTheme();
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
      return (
        <ListCell
          detail={formatPrice(parseFloat(prices[0]))}
          intermediary={
            <CompactChart color={color} data={data} referenceY={referenceY} showArea={showArea} />
          }
          media={<Avatar src={assets.btc.imageUrl} />}
          onPress={() => console.log('clicked')}
          spacingVariant="condensed"
          style={{ padding: 0 }}
          subdetail={subdetail}
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
        color={theme.color.fgPositive}
        data={sparklineData}
        referenceY={positiveFloor}
        subdetail="+0.25%"
      />
      <ChartCell
        showArea
        color={theme.color.fgNegative}
        data={negativeData}
        referenceY={negativeCeiling}
        subdetail="-4.55%"
      />
    </VStack>
  );
}

function AssetPriceWithDottedArea() {
  const fontMgr = useMemo(() => {
    const fontProvider = Skia.TypefaceFontProvider.Make();
    // Register system fonts if available, otherwise Skia will use defaults
    return fontProvider;
  }, []);

  const BTCTab: TabComponent = memo(
    forwardRef(({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<View>) => {
      const { activeTab } = useTabsContext();
      const isActive = activeTab?.id === props.id;

      return (
        <SegmentedTab
          ref={ref}
          label={
            <Text
              font="label1"
              style={{
                color: isActive ? assets.btc.color : undefined,
              }}
            >
              {label}
            </Text>
          }
          {...props}
        />
      );
    }),
  );
  const BTCActiveIndicator = memo(({ style, ...props }: TabsActiveIndicatorProps) => (
    <PeriodSelectorActiveIndicator
      {...props}
      style={[style, { backgroundColor: `${assets.btc.color}1A` }]}
    />
  ));

  const AssetPriceDotted = memo(() => {
    const theme = useTheme();
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

    return (
      <VStack gap={2}>
        <SectionHeader
          balance={<Text font="title2">{formatPrice(currentPrice)}</Text>}
          end={
            <VStack justifyContent="center">
              <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
            </VStack>
          }
          title={<Text font="title1">Bitcoin</Text>}
        />
        <LineChart
          enableScrubbing
          showArea
          areaType="dotted"
          height={200}
          inset={{ top: 52 }}
          series={[
            {
              id: 'btc',
              data: sparklineTimePeriodDataValues,
              color: assets.btc.color,
            },
          ]}
        >
          <Scrubber
            idlePulse
            labelElevated
            label={(d: number) => {
              const date = formatDate(sparklineTimePeriodDataTimestamps[d]);
              const price = formatPrice(sparklineTimePeriodDataValues[d]);

              const regularStyle: SkTextStyle = {
                fontFamilies: ['Inter'],
                fontSize: 14,
                fontStyle: {
                  weight: FontWeight.Normal,
                },
                color: Skia.Color(theme.color.fgMuted),
              };

              const boldStyle: SkTextStyle = {
                fontFamilies: ['Inter'],
                ...regularStyle,
                fontStyle: {
                  weight: FontWeight.Bold,
                },
              };

              // 3. Use the ParagraphBuilder
              const builder = Skia.ParagraphBuilder.Make(
                {
                  textAlign: TextAlign.Left,
                },
                fontMgr,
              );

              builder.pushStyle(boldStyle);
              builder.addText(price);

              builder.pushStyle(regularStyle);
              builder.addText(` ${date}`);

              const para = builder.build();
              para.layout(512);
              return para;
            }}
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

const LegendDot = memo((props: BoxBaseProps) => {
  return <Box borderRadius={1000} height={10} width={10} {...props} />;
});

const LegendItem = memo(
  ({
    color = assets.btc.color,
    label,
    value,
  }: {
    color?: string;
    label: string;
    value?: string;
  }) => {
    return (
      <Box alignItems="center" flexDirection="row" gap={0.5}>
        <LegendDot style={{ backgroundColor: color }} />
        <Text font="label2">{label}</Text>
        {value && (
          <Text color="fgMuted" font="label2" style={{ fontWeight: 'bold' }}>
            {value}
          </Text>
        )}
      </Box>
    );
  },
);

const PerformanceHeader = memo(
  ({
    scrubberPosition,
    sparklineTimePeriodDataValues,
  }: {
    scrubberPosition: number | undefined;
    sparklineTimePeriodDataValues: number[];
  }) => {
    const theme = useTheme();

    const formatPriceThousands = useCallback((price: number) => {
      return `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price / 1000)}k`;
    }, []);

    const shownPosition =
      scrubberPosition !== undefined ? scrubberPosition : sparklineTimePeriodDataValues.length - 1;

    return (
      <HStack gap={1} paddingX={1}>
        <LegendItem
          color={theme.color.fgPositive}
          label="High Price"
          value={formatPriceThousands(sparklineTimePeriodDataValues[shownPosition] * 1.2)}
        />
        <LegendItem
          color={assets.btc.color}
          label="Actual Price"
          value={formatPriceThousands(sparklineTimePeriodDataValues[shownPosition])}
        />
        <LegendItem
          color={theme.color.fgNegative}
          label="Low Price"
          value={formatPriceThousands(sparklineTimePeriodDataValues[shownPosition] * 0.8)}
        />
      </HStack>
    );
  },
);

const PerformanceChart = memo(
  ({
    timePeriod,
    onScrubberPositionChange,
  }: {
    timePeriod: TabValue;
    onScrubberPositionChange: (position: number | undefined) => void;
  }) => {
    const theme = useTheme();

    const sparklineTimePeriodData = useMemo(() => {
      return sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData];
    }, [timePeriod]);

    const sparklineTimePeriodDataValues = useMemo(() => {
      return sparklineTimePeriodData.map((d) => d.value);
    }, [sparklineTimePeriodData]);

    const sparklineTimePeriodDataTimestamps = useMemo(() => {
      return sparklineTimePeriodData.map((d) => d.date);
    }, [sparklineTimePeriodData]);

    const formatPriceThousands = useCallback((price: number) => {
      return `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price / 1000)}k`;
    }, []);

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

    const getScrubberLabel = useCallback(
      (d: number) => formatDate(sparklineTimePeriodDataTimestamps[d]),
      [formatDate, sparklineTimePeriodDataTimestamps],
    );

    return (
      <LineChart
        enableScrubbing
        showArea
        showYAxis
        areaType="dotted"
        height={300}
        inset={{ top: 52, left: 0, right: 0 }}
        onScrubberPositionChange={onScrubberPositionChange}
        series={[
          {
            id: 'high',
            data: sparklineTimePeriodDataValues.map((d) => d * 1.2),
            color: theme.color.fgPositive,
            label: 'High Price',
          },
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
            label: 'Actual Price',
          },
          {
            id: 'low',
            data: sparklineTimePeriodDataValues.map((d) => d * 0.8),
            color: theme.color.fgNegative,
            label: 'Low Price',
          },
        ]}
        yAxis={{ showGrid: true, tickLabelFormatter: formatPriceThousands }}
      >
        <Scrubber idlePulse label={getScrubberLabel} />
      </LineChart>
    );
  },
);

function Performance() {
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
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();

  const sparklineTimePeriodData = useMemo(() => {
    return sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData];
  }, [timePeriod]);

  const sparklineTimePeriodDataValues = useMemo(() => {
    return sparklineTimePeriodData.map((d) => d.value);
  }, [sparklineTimePeriodData]);

  const onPeriodChange = useCallback(
    (period: TabValue | null) => {
      setTimePeriod(period || tabs[0]);
    },
    [tabs],
  );

  return (
    <VStack gap={2} style={{ marginLeft: -8, marginRight: -8 }}>
      <PerformanceHeader
        scrubberPosition={scrubberPosition}
        sparklineTimePeriodDataValues={sparklineTimePeriodDataValues}
      />
      <PerformanceChart onScrubberPositionChange={setScrubberPosition} timePeriod={timePeriod} />
      <PeriodSelector activeTab={timePeriod} onChange={onPeriodChange} tabs={tabs} />
    </VStack>
  );
}

const candlestickStockData = btcCandles.slice(0, 90).reverse();

const CandlesticksHeader = memo(({ currentIndex }: { currentIndex: number | undefined }) => {
  const formatPrice = useCallback((price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  }, []);

  const formatThousandsPriceNumber = useCallback((price: number) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 1000);

    return `${formattedPrice}k`;
  }, []);

  const currentText = useMemo(() => {
    if (currentIndex !== undefined) {
      return `Open: ${formatThousandsPriceNumber(parseFloat(candlestickStockData[currentIndex].open))}, Close: ${formatThousandsPriceNumber(
        parseFloat(candlestickStockData[currentIndex].close),
      )}, Volume: ${(parseFloat(candlestickStockData[currentIndex].volume) / 1000).toFixed(2)}k`;
    }
    return formatPrice(candlestickStockData[candlestickStockData.length - 1].close);
  }, [currentIndex, formatThousandsPriceNumber, formatPrice]);

  return (
    <Text aria-live="polite" font="headline">
      {currentText}
    </Text>
  );
});

const CandlesticksChart = memo(
  ({
    infoTextId,
    onScrubberPositionChange,
  }: {
    infoTextId: string;
    onScrubberPositionChange: (index: number | undefined) => void;
  }) => {
    const theme = useTheme();
    const min = useMemo(
      () => Math.min(...candlestickStockData.map((data) => parseFloat(data.low))),
      [],
    );

    const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

    // Custom line component that renders a rect to highlight the entire bandwidth
    const BandwidthHighlight = memo(({ stroke }: LineComponentProps) => {
      const { getXSerializableScale, drawingArea } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);

      const rectWidth = useMemo(() => {
        if (xScale !== undefined && xScale.type === 'band') {
          return xScale.bandwidth;
        }
        return 0;
      }, [xScale]);

      const xPos = useDerivedValue(() => {
        const position = unwrapAnimatedValue(scrubberPosition);
        const xPos =
          position !== undefined && xScale
            ? getPointOnSerializableScale(position, xScale)
            : undefined;
        return xPos !== undefined ? xPos - rectWidth / 2 : 0;
      }, [scrubberPosition, xScale]);

      const opacity = useDerivedValue(() => (xPos.value !== undefined ? 1 : 0), [xPos]);

      return (
        <Rect
          color={stroke}
          height={drawingArea.height}
          opacity={opacity}
          width={rectWidth}
          x={xPos}
          y={drawingArea.y}
        />
      );
    });

    const candlesData = useMemo(
      () =>
        candlestickStockData.map((data) => [parseFloat(data.low), parseFloat(data.high)]) as [
          number,
          number,
        ][],
      [],
    );

    const CandlestickBarComponent = memo<BarComponentProps>(
      ({ x, y, width, height, originY, dataX, ...props }) => {
        const { getYScale } = useCartesianChartContext();
        const yScale = getYScale();

        const wickX = x + width / 2;

        const timePeriodValue = candlestickStockData[dataX as number];

        const open = parseFloat(timePeriodValue.open);
        const close = parseFloat(timePeriodValue.close);

        const bullish = open < close;
        const theme = useTheme();
        const color = bullish ? theme.color.fgPositive : theme.color.fgNegative;
        const openY = yScale?.(open) ?? 0;
        const closeY = yScale?.(close) ?? 0;

        const bodyHeight = Math.abs(openY - closeY);
        const bodyY = openY < closeY ? openY : closeY;

        return (
          <>
            <SkiaLine
              color={color}
              p1={{ x: wickX, y }}
              p2={{ x: wickX, y: y + height }}
              strokeWidth={1}
            />
            <Rect color={color} height={bodyHeight} width={width} x={x} y={bodyY} />
          </>
        );
      },
    );

    const formatThousandsPriceNumber = useCallback((price: number) => {
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price / 1000);

      return `${formattedPrice}k`;
    }, []);

    const formatTime = useCallback((index: number | null) => {
      if (index === null || index === undefined || index >= candlestickStockData.length) return '';
      const ts = parseInt(candlestickStockData[index].start);
      return new Date(ts * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }, []);

    return (
      <CartesianChart
        enableScrubbing
        animate={false}
        aria-labelledby={infoTextId}
        borderRadius={0}
        height={150}
        inset={{ top: 8, bottom: 8, left: 0, right: 0 }}
        onScrubberPositionChange={onScrubberPositionChange}
        series={[
          {
            id: 'stock-prices',
            data: candlesData,
          },
        ]}
        xAxis={{
          scaleType: 'band',
        }}
        yAxis={{
          domain: { min },
        }}
      >
        <XAxis tickLabelFormatter={formatTime} />
        <YAxis
          showGrid
          GridLineComponent={ThinSolidLine}
          tickLabelFormatter={formatThousandsPriceNumber}
          width={40}
        />
        <Scrubber
          hideOverlay
          LineComponent={BandwidthHighlight}
          lineStroke={theme.color.fgMuted}
          seriesIds={[]}
        />
        <BarPlot
          BarComponent={CandlestickBarComponent}
          BarStackComponent={({ children }) => <g>{children}</g>}
        />
      </CartesianChart>
    );
  },
);

function Candlesticks() {
  const infoTextId = useId();
  const [currentIndex, setCurrentIndex] = useState<number | undefined>();

  return (
    <VStack gap={2}>
      <CandlesticksHeader currentIndex={currentIndex} />
      <CandlesticksChart infoTextId={infoTextId} onScrubberPositionChange={setCurrentIndex} />
    </VStack>
  );
}

function MonotoneAssetPrice() {
  const theme = useTheme();
  const prices = sparklineInteractiveData.hour;

  const fontMgr = useMemo(() => {
    const fontProvider = Skia.TypefaceFontProvider.Make();
    // Register system fonts if available, otherwise Skia will use defaults
    return fontProvider;
  }, []);

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
      const price = scrubberPriceFormatter.format(prices[index].value);
      const date = formatDate(prices[index].date);

      const regularStyle: SkTextStyle = {
        fontFamilies: ['Inter'],
        fontSize: 14,
        fontStyle: {
          weight: FontWeight.Normal,
        },
        color: Skia.Color(theme.color.fgMuted),
      };

      const boldStyle: SkTextStyle = {
        fontFamilies: ['Inter'],
        ...regularStyle,
        fontStyle: {
          weight: FontWeight.Bold,
        },
      };

      const builder = Skia.ParagraphBuilder.Make(
        {
          textAlign: TextAlign.Left,
        },
        fontMgr,
      );

      builder.pushStyle(boldStyle);
      builder.addText(`${price} USD`);

      builder.pushStyle(regularStyle);
      builder.addText(` ${date}`);

      const para = builder.build();
      para.layout(512);
      return para;
    },
    [scrubberPriceFormatter, prices, formatDate, theme.color.fgMuted, fontMgr],
  );

  const formatAxisLabelPrice = useCallback(
    (price: number) => {
      return formatPrice(price);
    },
    [formatPrice],
  );

  // Custom tick label component with offset positioning
  const CustomYAxisTickLabel = useCallback(
    (props: any) => <DefaultAxisTickLabel {...props} dx={4} dy={-12} horizontalAlignment="left" />,
    [],
  );

  const CustomScrubberBeacon = memo(
    ({ dataX, dataY, seriesId, isIdle, animate = true }: ScrubberBeaconProps) => {
      const { getSeries, getXSerializableScale, getYSerializableScale } =
        useCartesianChartContext();

      const targetSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);
      const yScale = useMemo(
        () => getYSerializableScale(targetSeries?.yAxisId),
        [getYSerializableScale, targetSeries?.yAxisId],
      );

      const animatedX = useSharedValue(0);
      const animatedY = useSharedValue(0);

      // Calculate the target point position - project data to pixels
      const targetPoint = useDerivedValue(() => {
        if (!xScale || !yScale) return { x: 0, y: 0 };
        return projectPointWithSerializableScale({
          x: unwrapAnimatedValue(dataX),
          y: unwrapAnimatedValue(dataY),
          xScale,
          yScale,
        });
      }, [dataX, dataY, xScale, yScale]);

      useAnimatedReaction(
        () => {
          return { point: targetPoint.value, isIdle: unwrapAnimatedValue(isIdle) };
        },
        (current, previous) => {
          // When animation is disabled, on initial render, or when we are starting,
          // continuing, or finishing scrubbing we should immediately transition
          if (!animate || previous === null || !previous.isIdle || !current.isIdle) {
            animatedX.value = current.point.x;
            animatedY.value = current.point.y;
            return;
          }

          animatedX.value = buildTransition(current.point.x, defaultTransition);
          animatedY.value = buildTransition(current.point.y, defaultTransition);
        },
        [animate],
      );

      // Create animated point using the animated values
      const animatedPoint = useDerivedValue(() => {
        return { x: animatedX.value, y: animatedY.value };
      }, [animatedX, animatedY]);

      return (
        <>
          <Circle c={animatedPoint} color={theme.color.bg} r={5} />
          <Circle c={animatedPoint} color={theme.color.fg} r={5} strokeWidth={3} style="stroke" />
        </>
      );
    },
  );

  return (
    <LineChart
      enableScrubbing
      showYAxis
      height={200}
      inset={{ top: 64 }}
      series={[
        {
          id: 'btc',
          data: prices.map((price) => price.value),
          color: theme.color.fg,
          gradient: {
            axis: 'x',
            stops: ({ min }) => [
              { offset: min, color: theme.color.fg, opacity: 0 },
              { offset: 32, color: theme.color.fg, opacity: 1 },
            ],
          },
        },
      ]}
      xAxis={{
        range: ({ max }) => ({ min: 96, max }),
      }}
      yAxis={{
        position: 'left',
        width: 0,
        showGrid: true,
        tickLabelFormatter: formatAxisLabelPrice,
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

function ServiceAvailability() {
  const theme = useTheme();
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

  return (
    <CartesianChart
      enableScrubbing
      height={200}
      series={[
        {
          id: 'availability',
          data: availabilityEvents.map((event) => event.availability),
          gradient: {
            stops: ({ min, max }) => [
              { offset: min, color: theme.color.fgNegative },
              { offset: 85, color: theme.color.fgNegative },
              { offset: 85, color: theme.color.fgWarning },
              { offset: 90, color: theme.color.fgWarning },
              { offset: 90, color: theme.color.fgPositive },
              { offset: max, color: theme.color.fgPositive },
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
          fill: theme.color.bg,
          stroke: props.fill,
        })}
        seriesId="availability"
      />
      <Scrubber hideOverlay />
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
      return `${startYear + dataIndex}`;
    },
    [startYear],
  );

  const HistoricalLineComponent = memo((props: SolidLineProps) => {
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    const historicalClipPath = useMemo(() => {
      if (!xScale || !drawingArea) return null;

      const currentX = xScale(currentIndex);
      if (currentX === undefined) return null;

      // Create clip path for historical data (left side)
      const clip = Skia.Path.Make();
      clip.addRect({
        x: drawingArea.x - clipOffset,
        y: drawingArea.y - clipOffset,
        width: currentX + clipOffset - drawingArea.x,
        height: drawingArea.height + clipOffset * 2,
      });
      return clip;
    }, [xScale, drawingArea]);

    if (!historicalClipPath) return null;

    return (
      <Group clip={historicalClipPath}>
        <SolidLine strokeWidth={strokeWidth} {...props} />
      </Group>
    );
  });

  // Since the solid and dotted line have different curves,
  // we need two separate line components. Otherwise we could
  // have one line component with SolidLine and DottedLine inside
  // of it and two clipPaths.
  const ForecastLineComponent = memo((props: DottedLineProps) => {
    const { drawingArea, getXScale } = useCartesianChartContext();
    const xScale = getXScale();

    const forecastClipPath = useMemo(() => {
      if (!xScale || !drawingArea) return null;

      const currentX = xScale(currentIndex);
      if (currentX === undefined) return null;

      // Create clip path for forecast data (right side)
      const clip = Skia.Path.Make();
      clip.addRect({
        x: currentX,
        y: drawingArea.y - clipOffset,
        width: drawingArea.x + drawingArea.width - currentX + clipOffset * 2,
        height: drawingArea.height + clipOffset * 2,
      });
      return clip;
    }, [xScale, drawingArea]);

    if (!forecastClipPath) return null;

    return (
      <Group clip={forecastClipPath}>
        <DottedLine dashIntervals={[0, strokeWidth * 2]} strokeWidth={strokeWidth} {...props} />
      </Group>
    );
  });
  const CustomScrubber = memo(() => {
    const { scrubberPosition } = useScrubberContext();

    const idleScrubberOpacity = useDerivedValue(
      () => (scrubberPosition.value === undefined ? 1 : 0),
      [scrubberPosition],
    );
    const scrubberOpacity = useDerivedValue(
      () => (scrubberPosition.value !== undefined ? 1 : 0),
      [scrubberPosition],
    );

    // Fade in animation for the Scrubber
    const fadeInOpacity = useSharedValue(0);

    useEffect(() => {
      fadeInOpacity.value = withDelay(350, withTiming(1, { duration: 150 }));
    }, [fadeInOpacity]);

    return (
      <Group opacity={fadeInOpacity}>
        <Group opacity={scrubberOpacity}>
          <Scrubber hideOverlay />
        </Group>
        <Group opacity={idleScrubberOpacity}>
          <DefaultScrubberBeacon
            isIdle
            dataX={currentIndex}
            dataY={data[currentIndex]}
            seriesId="price"
          />
        </Group>
      </Group>
    );
  });

  return (
    <CartesianChart
      enableScrubbing
      height={200}
      series={[{ id: 'price', data, color: assets.btc.color }]}
    >
      <Line LineComponent={HistoricalLineComponent} curve="linear" seriesId="price" />
      <Line LineComponent={ForecastLineComponent} curve="monotone" seriesId="price" type="dotted" />
      <XAxis position="bottom" requestedTickCount={3} tickLabelFormatter={axisFormatter} />
      <CustomScrubber />
    </CartesianChart>
  );
}

function ImperativeHandle() {
  const theme = useTheme();
  const scrubberRef = useRef<ScrubberRef>(null);

  return (
    <VStack gap={2}>
      <LineChart
        enableScrubbing
        showYAxis
        height={250}
        series={[
          {
            id: 'priceA',
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            label: 'Price A',
            color: theme.color.accentBoldBlue,
          },
          {
            id: 'priceB',
            data: [2000, 2491, 4501, 6049, 5019, 4930, 5910],
            label: 'Price B',
            color: theme.color.accentBoldGreen,
          },
          {
            id: 'priceC',
            data: [1000, 4910, 2300, 5910, 3940, 2940, 1940],
            label: 'Price C',
            color: theme.color.accentBoldPurple,
          },
          {
            id: 'priceD',
            data: [4810, 2030, 5810, 3940, 2940, 1940, 940],
            label: 'Price D',
            color: theme.color.accentBoldYellow,
          },
        ]}
        xAxis={{
          // Give space for pulse animation
          range: ({ min, max }) => ({ min, max: max - 8 }),
        }}
        yAxis={{
          domain: {
            min: 0,
          },
          showGrid: true,
          tickLabelFormatter: (value) => value.toLocaleString(),
        }}
      >
        <Scrubber ref={scrubberRef} />
      </LineChart>
      <Button onPress={() => scrubberRef.current?.pulse()}>Pulse</Button>
    </VStack>
  );
}

function CustomBeaconLabel() {
  const theme = useTheme();
  // This custom component label shows the percentage value of the data at the scrubber position.
  const MyScrubberBeaconLabel = memo(
    ({ seriesId, color, label, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, series } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataLength = useMemo(
        () =>
          series?.reduce((max, s) => {
            const seriesData = getSeriesData(s.id);
            return Math.max(max, seriesData?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const percentageLabel = useDerivedValue(() => {
        if (seriesData !== undefined) {
          const dataAtPosition = seriesData[dataIndex.value];
          return `${unwrapAnimatedValue(label)} · ${dataAtPosition}%`;
        }
        return unwrapAnimatedValue(label);
      }, [label, seriesData, dataIndex]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background={color}
          color={theme.color.bg}
          label={percentageLabel}
          seriesId={seriesId}
        />
      );
    },
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      areaType="dotted"
      height={200}
      series={[
        {
          id: 'Boston',
          data: [25, 30, 35, 45, 60, 100],
          color: `rgb(${theme.spectrum.green40})`,
          label: 'Boston',
        },
        {
          id: 'Miami',
          data: [20, 25, 30, 35, 20, 0],
          color: `rgb(${theme.spectrum.blue40})`,
          label: 'Miami',
        },
        {
          id: 'Denver',
          data: [10, 15, 20, 25, 40, 0],
          color: `rgb(${theme.spectrum.orange40})`,
          label: 'Denver',
        },
        {
          id: 'Phoenix',
          data: [15, 10, 5, 0, 0, 0],
          color: `rgb(${theme.spectrum.red40})`,
          label: 'Phoenix',
        },
      ]}
      yAxis={{
        showGrid: true,
      }}
    >
      <Scrubber BeaconLabelComponent={MyScrubberBeaconLabel} />
    </LineChart>
  );
}

function CustomLabelComponent() {
  const CustomLabelComponent = memo((props: ScrubberLabelProps) => {
    const theme = useTheme();
    const { drawingArea } = useCartesianChartContext();

    if (!drawingArea) return;

    return (
      <DefaultScrubberLabel
        {...props}
        elevated
        background={theme.color.bgPrimary}
        color={theme.color.bgPrimaryWash}
        dy={32}
        fontWeight={FontWeight.Bold}
        y={drawingArea.y + drawingArea.height}
      />
    );
  });
  return (
    <LineChart
      enableScrubbing
      showArea
      height={200}
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

function HiddenScrubberWhenIdle() {
  const MyScrubberBeacon = memo((props: ScrubberBeaconProps) => {
    const { scrubberPosition } = useScrubberContext();
    const beaconOpacity = useDerivedValue(
      () => (scrubberPosition.value !== undefined ? 1 : 0),
      [scrubberPosition],
    );

    return <DefaultScrubberBeacon {...props} opacity={beaconOpacity} />;
  });

  const MyScrubberBeaconLabel = memo((props: ScrubberBeaconLabelProps) => {
    const { scrubberPosition } = useScrubberContext();
    const labelOpacity = useDerivedValue(
      () => (scrubberPosition.value !== undefined ? 1 : 0),
      [scrubberPosition],
    );

    return <DefaultScrubberBeaconLabel {...props} opacity={labelOpacity} />;
  });

  return (
    <LineChart
      enableScrubbing
      showArea
      height={150}
      series={[
        {
          id: 'prices',
          data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
          label: 'hello',
        },
      ]}
    >
      <Scrubber BeaconComponent={MyScrubberBeacon} BeaconLabelComponent={MyScrubberBeaconLabel} />
    </LineChart>
  );
}

function CustomBeaconStroke() {
  const theme = useTheme();
  const backgroundColor = `rgb(${theme.spectrum.red40})`;
  const foregroundColor = `rgb(${theme.spectrum.gray0})`;

  return (
    <Box borderRadius={300} padding={2} style={{ backgroundColor }}>
      <LineChart
        enableScrubbing
        showArea
        height={150}
        series={[
          {
            id: 'prices',
            data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            color: foregroundColor,
          },
        ]}
      >
        <Scrubber
          hideOverlay
          idlePulse
          beaconStroke={backgroundColor}
          lineStroke={foregroundColor}
        />
      </LineChart>
    </Box>
  );
}

function CustomBeaconSize() {
  const theme = useTheme();

  const dataCount = 14;
  const minDataValue = 0;
  const maxDataValue = 100;
  const minStepOffset = 5;
  const maxStepOffset = 20;
  const updateInterval = 2000;

  function generateNextValue(previousValue: number) {
    const range = maxStepOffset - minStepOffset;
    const offset = Math.random() * range + minStepOffset;

    let direction;
    if (previousValue >= maxDataValue) {
      direction = -1;
    } else if (previousValue <= minDataValue) {
      direction = 1;
    } else {
      direction = Math.random() < 0.5 ? -1 : 1;
    }

    const newValue = previousValue + offset * direction;
    return Math.max(minDataValue, Math.min(maxDataValue, newValue));
  }

  function generateInitialData() {
    const data = [];
    let previousValue = Math.random() * (maxDataValue - minDataValue) + minDataValue;
    data.push(previousValue);

    for (let i = 1; i < dataCount; i++) {
      const newValue = generateNextValue(previousValue);
      data.push(newValue);
      previousValue = newValue;
    }
    return data;
  }

  const InvertedBeacon = useMemo(
    () => (props: ScrubberBeaconProps) => (
      <DefaultScrubberBeacon
        {...props}
        color={theme.color.bg}
        radius={5}
        stroke={theme.color.fg}
        strokeWidth={3}
      />
    ),
    [theme.color.fg, theme.color.bg],
  );

  const CustomBeaconSizeChart = memo(() => {
    const [data, setData] = useState(generateInitialData);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setData((currentData) => {
          const lastValue = currentData[currentData.length - 1] ?? 50;
          const newValue = generateNextValue(lastValue);
          return [...currentData.slice(1), newValue];
        });
      }, updateInterval);

      return () => clearInterval(intervalId);
    }, []);

    return (
      <LineChart
        enableScrubbing
        showArea
        showYAxis
        height={150}
        series={[
          {
            id: 'prices',
            data,
            color: theme.color.fg,
          },
        ]}
        xAxis={{
          range: ({ min, max }) => ({ min, max: max - 16 }),
        }}
        yAxis={{
          showGrid: true,
          domain: { min: 0, max: 100 },
        }}
      >
        <Scrubber BeaconComponent={InvertedBeacon} />
      </LineChart>
    );
  });

  return <CustomBeaconSizeChart />;
}

function TwoLineScrubberLabel() {
  const theme = useTheme();
  const data = useMemo(() => [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58], []);
  const [alignment, setAlignment] = useState<TextAlign>(TextAlign.Center);

  const fontMgr = useMemo(() => {
    const fontProvider = Skia.TypefaceFontProvider.Make();
    return fontProvider;
  }, []);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  const scrubberLabel = useCallback(
    (index: number) => {
      const price = formatPrice(data[index] * 100);
      const day = `Day ${index + 100}`;

      const priceStyle: SkTextStyle = {
        fontFamilies: ['Inter'],
        fontSize: 16,
        fontStyle: {
          weight: FontWeight.Bold,
        },
        color: Skia.Color(theme.color.fg),
      };

      const dayStyle: SkTextStyle = {
        fontFamilies: ['Inter'],
        fontSize: 14,
        fontStyle: {
          weight: FontWeight.Normal,
        },
        color: Skia.Color(theme.color.fgMuted),
      };

      const builder = Skia.ParagraphBuilder.Make(
        {
          textAlign: alignment,
        },
        fontMgr,
      );

      builder.pushStyle(priceStyle);
      builder.addText(price);
      builder.addText('\n');

      builder.pushStyle(dayStyle);
      builder.addText(day);

      const para = builder.build();
      // First layout with large width to get intrinsic size
      para.layout(384);
      return para;
    },
    [data, formatPrice, theme.color.fg, theme.color.fgMuted, fontMgr, alignment],
  );

  // Custom scrubber label component that uses the selected alignment
  const AlignedScrubberLabel = memo((props: ScrubberLabelProps) => (
    <DefaultScrubberLabel {...props} paragraphAlignment={alignment} />
  ));

  return (
    <VStack gap={2}>
      <HStack gap={1}>
        <Button
          compact
          onPress={() => setAlignment(TextAlign.Left)}
          variant={alignment === TextAlign.Left ? 'primary' : 'secondary'}
        >
          Left
        </Button>
        <Button
          compact
          onPress={() => setAlignment(TextAlign.Center)}
          variant={alignment === TextAlign.Center ? 'primary' : 'secondary'}
        >
          Center
        </Button>
        <Button
          compact
          onPress={() => setAlignment(TextAlign.Right)}
          variant={alignment === TextAlign.Right ? 'primary' : 'secondary'}
        >
          Right
        </Button>
      </HStack>
      <LineChart
        enableScrubbing
        showArea
        height={200}
        inset={{ top: 64 }}
        series={[
          {
            id: 'prices',
            data: data,
            color: theme.color.accentBoldBlue,
          },
        ]}
      >
        <Scrubber
          idlePulse
          labelElevated
          LabelComponent={AlignedScrubberLabel}
          label={scrubberLabel}
        />
      </LineChart>
    </VStack>
  );
}

type ExampleItem = {
  title: string;
  component: React.ReactNode;
};

function ExampleNavigator() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      {
        title: 'Basic',
        component: (
          <LineChart
            showArea
            height={200}
            series={[
              {
                id: 'prices',
                data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
              },
            ]}
          />
        ),
      },
      {
        title: 'Imperative Handle',
        component: <ImperativeHandle />,
      },
      {
        title: 'Multiple Lines',
        component: <MultipleLine />,
      },
      {
        title: 'Data Format',
        component: <DataFormat />,
      },
      {
        title: 'Live Updates',
        component: <LiveUpdates />,
      },
      {
        title: 'Missing Data',
        component: <MissingData />,
      },
      {
        title: 'Empty State',
        component: (
          <LineChart
            height={200}
            series={[
              {
                id: 'line',
                color: `rgb(${theme.spectrum.gray50})`,
                data: [1, 1],
                showArea: true,
              },
            ]}
            yAxis={{ domain: { min: -1, max: 3 } }}
          />
        ),
      },
      {
        title: 'Scales',
        component: (
          <LineChart
            showArea
            showYAxis
            height={200}
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
        ),
      },
      {
        title: 'Interaction',
        component: <Interaction />,
      },
      {
        title: 'Points',
        component: <Points />,
      },
      {
        title: 'Transitions',
        component: <Transitions />,
      },
      {
        title: 'Basic Accessible',
        component: <BasicAccessible />,
      },
      {
        title: 'Styling Axes',
        component: (
          <LineChart
            showArea
            showXAxis
            showYAxis
            height={200}
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
        ),
      },
      {
        title: 'Gradients',
        component: <Gradients />,
      },
      {
        title: 'Gain/Loss',
        component: <GainLossChart />,
      },
      {
        title: 'Styling Lines',
        component: (
          <LineChart
            height={200}
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
        ),
      },
      {
        title: 'Styling Reference Lines',
        component: (
          <LineChart
            enableScrubbing
            showArea
            height={200}
            series={[
              {
                id: 'prices',
                data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
                color: theme.color.fgPositive,
              },
            ]}
            xAxis={{
              // Give space before the end of the chart for the scrubber
              range: ({ min, max }) => ({ min, max: max - 24 }),
            }}
          >
            <ReferenceLine
              LineComponent={(props) => (
                <DottedLine {...props} dashIntervals={[0, 16]} strokeWidth={3} />
              )}
              dataY={10}
              stroke={theme.color.fg}
            />
            <Scrubber />
          </LineChart>
        ),
      },
      {
        title: 'High/Low Price',
        component: <HighLowPrice />,
      },
      {
        title: 'Styling Scrubber',
        component: <StylingScrubber />,
      },
      {
        title: 'Compact',
        component: <Compact />,
      },
      {
        title: 'Asset Price With Dotted Area',
        component: <AssetPriceWithDottedArea />,
      },
      {
        title: 'Performance',
        component: <Performance />,
      },
      {
        title: 'Candlesticks',
        component: <Candlesticks />,
      },
      {
        title: 'Monotone Asset Price',
        component: <MonotoneAssetPrice />,
      },
      {
        title: 'Service Availability',
        component: <ServiceAvailability />,
      },
      {
        title: 'Forecast Asset Price',
        component: <ForecastAssetPrice />,
      },
      {
        title: 'Custom Beacon Label',
        component: <CustomBeaconLabel />,
      },
      {
        title: 'Custom Label Component',
        component: <CustomLabelComponent />,
      },
      {
        title: 'Hidden Scrubber When Idle',
        component: <HiddenScrubberWhenIdle />,
      },
      {
        title: 'Two-Line Scrubber Label',
        component: <TwoLineScrubberLabel />,
      },
      {
        title: 'Custom Beacon Stroke',
        component: <CustomBeaconStroke />,
      },
      {
        title: 'Custom Beacon Size',
        component: <CustomBeaconSize />,
      },
    ],
    [theme.color.fg, theme.color.fgPositive, theme.spectrum.gray50],
  );

  const currentExample = examples[currentIndex];
  const isFirstExample = currentIndex === 0;
  const isLastExample = currentIndex === examples.length - 1;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(examples.length - 1, prev + 1));
  }, [examples.length]);

  return (
    <ExampleScreen>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" padding={2}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            disabled={isFirstExample}
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center" gap={1}>
            <Text font="title3">{currentExample.title}</Text>
            <Text color="fgMuted" font="label1">
              {currentIndex + 1} / {examples.length}
            </Text>
          </VStack>
          <IconButton
            accessibilityHint="Navigate to next example"
            accessibilityLabel="Next"
            disabled={isLastExample}
            name="arrowRight"
            onPress={handleNext}
            variant="secondary"
          />
        </HStack>
        <Box padding={1}>{currentExample.component}</Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
