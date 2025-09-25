import { useCallback, useId, useMemo, useState } from 'react';
import { Defs, G, LinearGradient, Stop } from 'react-native-svg';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { projectPoint, useChartContext } from '@coinbase/cds-common/visualizations/charts';
import type { ChartAxisScaleType } from '@coinbase/cds-common/visualizations/charts/scale';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { RemoteImage } from '@coinbase/cds-mobile/media';
import { SectionHeader } from '@coinbase/cds-mobile/section-header/SectionHeader';
import {
  SegmentedTabs,
  TabsActiveIndicator,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-mobile/tabs';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { Area, type AreaComponentProps, DottedArea, GradientArea } from '../../area';
import { XAxis, YAxis } from '../../axis';
import { Chart } from '../../Chart';
import { PeriodSelector } from '../../PeriodSelector';
import { Point } from '../../point';
import { Scrubber } from '../../scrubber';
import type { ChartTextChildren } from '../../text';
import { DottedLine, GradientLine, Line, LineChart, ReferenceLine, SolidLine } from '..';

const defaultChartHeight = 200;

const formatChartDate = (timestamp: string, timeframe: string): string => {
  const date = new Date(timestamp);

  switch (timeframe) {
    case 'hour':
    case '1H':
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    case 'day':
    case '1D':
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    case 'week':
    case 'month':
    case '1W':
    case '1M':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    case 'year':
    case 'all':
    case '1Y':
    case 'All':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    default:
      return date.toLocaleDateString('en-US');
  }
};

type TrendData = {
  trendPrice: number;
  trendPreviousPrice: number;
  trendDirection: 'up' | 'down' | 'neutral';
  displayDate: string;
};

const calculateTrendData = (
  highlightedIndex: number | null,
  currentData: number[],
  currentTimestamps: string[],
  startPrice: number,
  currentPrice: number,
  activeTimeframe: string,
): TrendData => {
  if (highlightedIndex !== null && highlightedIndex !== undefined) {
    // When hovering, show trend relative to START of time period (not previous point)
    const hoverIndex = highlightedIndex;
    const hoverPrice = currentData[hoverIndex];
    const hoverPriceChange = hoverPrice - startPrice; // Fixed: relative to start price
    const hoverTimestamp = currentTimestamps[hoverIndex];

    return {
      trendPrice: hoverPrice,
      trendPreviousPrice: startPrice, // Fixed: always use start price
      trendDirection: hoverPriceChange > 0 ? 'up' : hoverPriceChange < 0 ? 'down' : 'neutral',
      displayDate: formatChartDate(hoverTimestamp, activeTimeframe),
    };
  } else {
    // When not hovering, show current trend relative to start
    const latestTimestamp = currentTimestamps[currentTimestamps.length - 1];
    const priceChange = currentPrice - startPrice;

    return {
      trendPrice: currentPrice,
      trendPreviousPrice: startPrice,
      trendDirection: priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral',
      displayDate: formatChartDate(latestTimestamp, activeTimeframe),
    };
  }
};

export const BasicLineChart = () => {
  const chartData = [65, 78, 45, 88, 92, 73, 69];

  return (
    <LineChart
      enableScrubbing
      showYAxis
      height={defaultChartHeight}
      renderPoints={() => true}
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
    >
      <Scrubber />
    </LineChart>
  );
};

export const BasicLineChartWithPoints = () => {
  const chartData = [65, 78, 45, 88, 92, 73, 69];

  return (
    <LineChart
      showYAxis
      height={defaultChartHeight}
      renderPoints={() => true}
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
    >
      {/* Standalone points at explicit coordinates (not on the line) */}
      <Point
        pulse
        color="purple"
        dataX={2}
        dataY={60}
        label="hello world im on a point!"
        labelConfig={{
          position: 'top',
          // why does this go in the opposite direction than what i would expect?
          dy: -16,
        }}
        onClick={() => console.log('clicked')}
        radius={6}
        stroke="purple"
        strokeWidth={7}
      />
      <ReferenceLine
        dataX={2}
        label="testing 123"
        labelConfig={{
          color: '#10b981',
          elevation: 1,
        }}
        labelPosition="center"
      />
      <ReferenceLine
        dataY={60}
        label="testing 123"
        labelConfig={{ elevation: 1 }}
        labelPosition="left"
      />
      <Point color="orange" dataX={5} dataY={50} radius={5} />
    </LineChart>
  );
};

export const AssetPrice = () => {
  const pricePointsPerHour = 12;
  const currentHour = 14;
  const pricePointsToShow = currentHour * pricePointsPerHour;
  const parsedPrices = useMemo(
    () => prices.slice(0, pricePointsToShow).map((price) => parseFloat(price)),
    [pricePointsToShow],
  );
  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number | null>(null);

  const isHovering = useMemo(
    () => typeof highlightedItemIndex === 'number' && highlightedItemIndex < pricePointsToShow,
    [highlightedItemIndex, pricePointsToShow],
  );

  const indexToTime = useCallback((index: number) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMinutes(index * 5);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }, []);

  const onScrubberPosChange = useCallback((highlightedIndex: number | null) => {
    setHighlightedItemIndex(highlightedIndex ?? null);
  }, []);

  const highlightedPrice = useMemo(() => {
    const price =
      isHovering && typeof highlightedItemIndex === 'number'
        ? prices[highlightedItemIndex]
        : prices[prices.length - 1];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  }, [highlightedItemIndex, isHovering]);

  // Calculate trend information
  const trendInfo: { direction: 'up' | 'down' | 'neutral'; text: string } = useMemo(() => {
    const currentPrice =
      isHovering && typeof highlightedItemIndex === 'number'
        ? parseFloat(prices[highlightedItemIndex])
        : parseFloat(prices[prices.length - 1]);
    const startPrice = parseFloat(prices[0]);
    const priceChange = currentPrice - startPrice;
    const percentChange = (priceChange / startPrice) * 100;

    const trendDirection = priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral';

    const formattedPriceChange = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(priceChange));

    const formattedPercentChange = `${Math.abs(percentChange).toFixed(2)}%`;

    return {
      direction: trendDirection,
      text: `${formattedPriceChange} (${formattedPercentChange})`,
    };
  }, [highlightedItemIndex, isHovering]);

  return (
    <VStack gap={2}>
      <LineChart
        showArea
        height={defaultChartHeight}
        onScrubberPosChange={onScrubberPosChange}
        padding={{ top: 24, bottom: 52, left: 0, right: 0 }}
        series={[
          {
            id: 'price',
            data: parsedPrices,
            color: assets.btc.color,
          },
        ]}
        xAxis={{ domain: { min: 0, max: pricePointsPerHour * 24 } }}
      >
        <XAxis
          position="end"
          tickLabelFormatter={(index) => indexToTime(index).slice(0, -3)}
          ticks={(index) => index % (12 * 6) === 0}
        />
        <ReferenceLine dataY={parsedPrices[0]} />
      </LineChart>
    </VStack>
  );
};

export const LineStyles = () => {
  const topChartData = [15, 28, 32, 44, 46, 36, 40, 45, 48, 38];
  const upperMiddleChartData = [12, 23, 21, 29, 34, 28, 31, 38, 42, 35];
  const lowerMiddleChartData = [8, 15, 14, 25, 20, 18, 22, 28, 24, 30];
  const bottomChartData = [4, 8, 11, 15, 16, 14, 16, 10, 12, 14];

  return (
    <Chart
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
        LineComponent={(props) => (
          <GradientLine {...props} endColor="#F7931A" startColor="#E3D74D" strokeWidth={4} />
        )}
        curve="natural"
        seriesId="lowerMiddle"
      />
      <Line showArea AreaComponent={DottedArea} curve="step" seriesId="bottom" />
    </Chart>
  );
};

export const ChartScale = () => {
  // Generate exponential growth data that benefits from log scaling
  const exponentialData = [
    1, 2, 4, 8, 15, 30, 65, 140, 280, 580, 1200, 2400, 4800, 9500, 19000, 38000, 75000, 150000,
  ];

  const scaleTypes = [
    { id: 'linear', label: 'Linear' },
    { id: 'log', label: 'Log' },
  ];

  const [selectedScaleType, setSelectedScaleType] = useState<TabValue | null>(scaleTypes[0]);

  return (
    <VStack gap={3}>
      <VStack alignItems="flex-end" gap={2}>
        <HStack alignItems="center" gap={2}>
          <Text font="label1">Scale Type</Text>
          <SegmentedTabs
            activeTab={selectedScaleType}
            onChange={setSelectedScaleType}
            tabs={scaleTypes}
          />
        </HStack>
      </VStack>
      <LineChart
        showArea
        showYAxis
        curve="natural"
        height={defaultChartHeight}
        series={[
          {
            id: 'growth',
            data: exponentialData,
            color: '#10b981',
          },
        ]}
        yAxis={{
          scaleType: selectedScaleType?.id as ChartAxisScaleType,
          requestedTickCount: 5,
          tickLabelFormatter: (value) => value.toLocaleString(),
          showGrid: true,
          size: 70,
        }}
      />
    </VStack>
  );
};

const UnderlineIndicator = (props: TabsActiveIndicatorProps) => (
  <TabsActiveIndicator
    {...props}
    background="fg"
    borderRadius={0}
    bottom={0}
    height={2}
    top="auto"
  />
);

export const BTCPriceChart = () => {
  const tabs = [
    { id: 'hour', label: '1H' },
    { id: 'day', label: '1D' },
    { id: 'week', label: '1W' },
    { id: 'month', label: '1M' },
    { id: 'year', label: '1Y' },
    { id: 'all', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]); // Data source for chart
  const [selectedTab, setSelectedTab] = useState<TabValue | null>(tabs[0]); // UI state for PeriodSelector
  const [isHovering, setIsHovering] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);

  const currentPriceData = activeTab
    ? sparklineInteractiveData[activeTab.id as keyof typeof sparklineInteractiveData]
    : sparklineInteractiveData.hour;

  const currentData = useMemo(
    () => [...currentPriceData.map((price) => price.value)],
    [currentPriceData],
  );
  const currentTimestamps = useMemo(
    () => [...currentPriceData.map((price) => price.date.toISOString())],
    [currentPriceData],
  );
  const currentPrice = currentData[currentData.length - 1];
  const startPrice = currentData[0];

  const latestPriceCoords = useMemo(() => {
    if (currentData.length === 0) return {};
    return {
      x: currentData.length - 1,
      y: currentData[currentData.length - 1],
    };
  }, [currentData]);

  const onScrubberPosChange = useCallback((item: number | null) => {
    setHighlightedItem(item);
    setIsHovering(!!item);
  }, []);

  const displayPrice =
    highlightedItem !== null && highlightedItem !== undefined
      ? currentData[highlightedItem]
      : currentPrice;

  const btcAccentColor = '#F0A73C';

  // Calculate trend based on current context (hovering vs current)
  const { trendPrice, trendPreviousPrice, trendDirection, displayDate } = useMemo(() => {
    return calculateTrendData(
      highlightedItem,
      currentData,
      currentTimestamps,
      startPrice,
      currentPrice,
      activeTab?.id || 'hour',
    );
  }, [highlightedItem, currentData, currentTimestamps, startPrice, currentPrice, activeTab]);

  const calculatedPriceChange = trendPrice - trendPreviousPrice;
  const calculatedPercentChange = (calculatedPriceChange / trendPreviousPrice) * 100;

  const formattedPrice = `$${displayPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedPriceChange = `${calculatedPriceChange >= 0 ? '+' : ''}$${Math.abs(
    calculatedPriceChange,
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} (${Math.abs(calculatedPercentChange).toFixed(2)}%)`;

  const AreaComponent = useMemo(
    () => (props: AreaComponentProps) => (
      <GradientArea {...props} baselineColor="#ffffff" peakColor="#ffffff" peakOpacity={0.15} />
    ),
    [],
  );

  return (
    <Box
      borderRadius={200}
      overflow="hidden"
      style={{ backgroundColor: btcAccentColor }}
      width="100%"
    >
      <VStack gap={3} width="100%">
        <Chart
          height={defaultChartHeight}
          onScrubberPosChange={onScrubberPosChange}
          padding={{ left: 0, right: 20, bottom: 0, top: 40 }}
          series={[
            {
              id: 'price',
              data: currentData,
              color: '#000000',
            },
          ]}
          width="100%"
        >
          {selectedTab === activeTab && (
            <Line
              key={activeTab?.id}
              showArea
              AreaComponent={AreaComponent}
              seriesId="price"
              strokeWidth={3}
            />
          )}
        </Chart>
      </VStack>
    </Box>
  );
};
export const ColorShiftChart = () => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(null);

  const tabs = useMemo(
    () => [
      { id: '1H', label: '1H' },
      { id: '1D', label: '1D' },
      { id: '1W', label: '1W' },
      { id: '1M', label: '1M' },
      { id: '1Y', label: '1Y' },
      { id: 'All', label: 'All' },
    ],
    [],
  );

  // Set initial tab
  if (!activeTab) {
    setActiveTab(tabs[0]);
  }

  const [isHovering, setIsHovering] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);

  const tabConversion = {
    '1H': 'hour',
    '1D': 'day',
    '1W': 'week',
    '1M': 'month',
    '1Y': 'year',
    All: 'all',
  };

  const currentPriceData = activeTab
    ? sparklineInteractiveData[
        tabConversion[
          activeTab.id as keyof typeof tabConversion
        ] as keyof typeof sparklineInteractiveData
      ]
    : sparklineInteractiveData.hour;

  // Reverse the data so it displays chronologically (oldest to newest)
  const reversedPrices = [...currentPriceData.map((price) => price.value)];
  const reversedTimestamps = [...currentPriceData.map((price) => price.date.toISOString())];

  const currentData = reversedPrices;
  const currentTimestamps = reversedTimestamps;
  const startPrice = currentData[0];
  const currentPrice = currentData[currentData.length - 1];

  const latestPriceCoords = useMemo(() => {
    if (currentData.length === 0) return {};
    return {
      x: currentData.length - 1,
      y: currentData[currentData.length - 1],
    };
  }, [currentData]);

  const onScrubberPosChange = useCallback((item: number | null) => {
    setHighlightedItem(item);
    setIsHovering(!!item);
  }, []);

  const displayPrice =
    highlightedItem !== null && highlightedItem !== undefined
      ? currentData[highlightedItem]
      : currentPrice;

  // Calculate trend based on current context (hovering vs current)
  const { trendPrice, trendPreviousPrice, trendDirection } = useMemo(() => {
    return calculateTrendData(
      highlightedItem,
      currentData,
      currentTimestamps,
      startPrice,
      currentPrice,
      activeTab?.id || '1H',
    );
  }, [highlightedItem, currentData, currentTimestamps, startPrice, currentPrice, activeTab]);

  const calculatedPriceChange = trendPrice - trendPreviousPrice;
  const calculatedPercentChange = (calculatedPriceChange / trendPreviousPrice) * 100;

  const formattedPrice = `$${displayPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedPriceChange = `${calculatedPriceChange >= 0 ? '+' : ''}$${Math.abs(
    calculatedPriceChange,
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} (${Math.abs(calculatedPercentChange).toFixed(2)}%)`;

  const chartActiveColor = useMemo(() => {
    const priceChange = currentPrice - startPrice;
    return priceChange >= 0 ? '#10b981' : '#ef4444'; // Green for positive, red for negative
  }, [currentPrice, startPrice]);

  const scrubberLabel = useCallback(
    (dataIndex: number | null) => {
      if (dataIndex === null) return null;
      const timestamp = currentTimestamps[dataIndex];
      return formatChartDate(timestamp, activeTab?.id || '1H');
    },
    [currentTimestamps, activeTab],
  );

  // todo: add this to chart context?
  const dataKey = activeTab?.id ?? '1H';

  return (
    <VStack gap={3} width="100%">
      <LineChart
        showArea
        showXAxis
        dataKey={dataKey}
        height={defaultChartHeight}
        onScrubberPosChange={onScrubberPosChange}
        padding={{ top: 48, left: 0, right: 0, bottom: 0 }}
        series={[
          {
            id: 'price',
            data: currentData,
            color: chartActiveColor,
            label: 'XRP',
          },
        ]}
      >
        <ReferenceLine
          dataY={startPrice}
          label={`$${startPrice}`}
          labelConfig={{
            elevation: 1,
            textAnchor: 'start',
          }}
          labelPosition="right"
          lineStroke={chartActiveColor}
        />
      </LineChart>
    </VStack>
  );
};

export const ReturnsChart = () => {
  const returnsData = [
    0.0, -25.18, -60.45, -81.99, -55.12, -20.66, 35.11, 95.88, 160.43, 225.91, 285.17, 340.62,
    385.49, 410.15, 405.88, 380.12, 340.77, 290.15, 230.84, 175.43, 115.99, 60.18, 10.44, -45.82,
    -95.11, -140.67, -152.81, -130.49, -90.15, -45.72, -5.11, 45.88, 95.12, 140.67, 185.22, 220.98,
    251.15, 240.66, 210.19, 170.83, 125.44, 80.91, 40.12, -15.77, -85.14, -160.99, -240.18, -320.67,
    -390.41, -452.93, -410.11, -350.88, -280.15, -200.43, -150.11, -80.49, -45.18, -55.29, -30.15,
    50.11, 120.88, 190.45, 260.12, 310.99, 280.43, 250.19, 350.88, 450.12, 550.93, 650.11, 720.84,
    680.49, 630.15, 650.88, 750.19, 850.43, 950.91, 1050.22, 1110.75, 1080.15, 1050.92, 1150.48,
    1250.19, 1350.77, 1450.21, 1510.29,
  ];
  const positiveColor = '#10b981';
  const negativeColor = '#6b7280';

  const ChartDefs = ({ threshold = 0 }) => {
    const { height, getYScale, getYAxis } = useChartContext();
    const yScale = getYScale?.();
    const yAxis = getYAxis?.();

    if (!yScale) return null;

    const thresholdPixel = projectPoint({ x: 0, y: threshold, xScale: (() => 0) as any, yScale });
    const thresholdY = thresholdPixel.y;

    const rangeBounds = yAxis?.domain;
    const rangeMin = rangeBounds?.min ?? 0;
    const rangeMax = rangeBounds?.max ?? 1;
    const thresholdPercent = ((threshold - rangeMin) / (rangeMax - rangeMin)) * 100;

    return (
      <defs>
        <clipPath id="positiveClip">
          <rect height={thresholdY} width="100%" x="0" y="0" />
        </clipPath>
        <clipPath id="negativeClip">
          <rect height={height - thresholdY} width="100%" x="0" y={thresholdY} />
        </clipPath>
        <linearGradient id="conditionalGradient" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stopColor={negativeColor} />
          <stop offset={`${thresholdPercent}%`} stopColor={negativeColor} />
          <stop offset={`${thresholdPercent}%`} stopColor={positiveColor} />
          <stop offset="100%" stopColor={positiveColor} />
        </linearGradient>
      </defs>
    );
  };

  return (
    <Chart
      height={defaultChartHeight}
      series={[
        {
          id: 'returnsLine',
          data: returnsData,
        },
        {
          id: 'returnsArea',
          data: returnsData.map((value) => [value, 0]) as [number, number][],
        },
      ]}
    >
      <ChartDefs threshold={0} />
      <G clipPath="url(#positiveClip)">
        <Area fill={positiveColor} seriesId="returnsArea" type="dotted" />
      </G>
      <G clipPath="url(#negativeClip)">
        <Area fill={negativeColor} seriesId="returnsArea" type="dotted" />
      </G>
      <Line seriesId="returnsLine" stroke="url(#conditionalGradient)" />
      <ReferenceLine
        LineComponent={(props) => <SolidLine {...props} strokeWidth={8} />}
        dataY={0}
        disableAnimations={false}
        lineStroke="#ffffff"
      />
      <ReferenceLine
        LineComponent={(props) => (
          <DottedLine {...props} strokeDasharray="0.01 6" strokeWidth={3} />
        )}
        dataY={0}
        disableAnimations={false}
        lineStroke="#6b7280"
      />
    </Chart>
  );
};

export const PriceChart = () => {
  const { latestPrice, formattedPrice } = useMemo(() => {
    const latestPrice =
      sparklineInteractiveData.hour[sparklineInteractiveData.hour.length - 1].value;
    return {
      latestPrice,
      formattedPrice: `$${latestPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    };
  }, []);

  const tabs = useMemo(
    () => [
      {
        id: '1H',
        label: '1H',
      },
      { id: '1D', label: '1D' },
      { id: '1W', label: '1W' },
      { id: '1M', label: '1M' },
      { id: '1Y', label: '1Y' },
      { id: 'All', label: 'All' },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  const activeBackground = useMemo(() => (!isLive ? 'bgPrimaryWash' : 'bgNegativeWash'), [isLive]);

  const [isHovering, setIsHovering] = useState(false);

  const tabConversion = {
    '1H': 'hour',
    '1D': 'day',
    '1W': 'week',
    '1M': 'month',
    '1Y': 'year',
    All: 'all',
  };

  const currentPriceData = activeTab
    ? sparklineInteractiveData[
        tabConversion[
          activeTab.id as keyof typeof tabConversion
        ] as keyof typeof sparklineInteractiveData
      ]
    : sparklineInteractiveData.hour;

  const currentData = useMemo(
    () => [...currentPriceData.map((price) => price.value)],
    [currentPriceData],
  );
  const currentTimestamps = useMemo(
    () => [...currentPriceData.map((price) => price.date.toISOString())],
    [currentPriceData],
  );
  const startPrice = currentData[0];

  const { lowestPriceIndices, highestPriceIndices } = useMemo(() => {
    if (currentData.length === 0) {
      return { lowestPriceIndices: [], highestPriceIndices: [], minPrice: 0, maxPrice: 0 };
    }

    let minPrice = currentData[0];
    let maxPrice = currentData[0];

    // First pass: find min and max values
    for (let i = 1; i < currentData.length; i++) {
      if (currentData[i] < minPrice) {
        minPrice = currentData[i];
      }
      if (currentData[i] > maxPrice) {
        maxPrice = currentData[i];
      }
    }

    // Second pass: find all indices where min and max occur
    const lowestPriceIndices: number[] = [];
    const highestPriceIndices: number[] = [];

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i] === minPrice) {
        lowestPriceIndices.push(i);
      }
      if (currentData[i] === maxPrice) {
        highestPriceIndices.push(i);
      }
    }

    return { lowestPriceIndices, highestPriceIndices, minPrice, maxPrice };
  }, [currentData]);

  const latestPriceCoords = useMemo(() => {
    if (currentData.length === 0) return {};
    return {
      x: currentData.length - 1,
      y: currentData[currentData.length - 1],
    };
  }, [currentData]);

  const onScrubberPosChange = useCallback((item: number | null) => {
    setIsHovering(item !== null);
  }, []);

  const { trendPrice, trendPreviousPrice, trendDirection } = useMemo(() => {
    return calculateTrendData(
      null,
      currentData,
      currentTimestamps,
      startPrice,
      latestPrice,
      activeTab?.id || '1H',
    );
  }, [currentData, currentTimestamps, startPrice, latestPrice, activeTab]);

  const calculatedPriceChange = trendPrice - trendPreviousPrice;
  const calculatedPercentChange = (calculatedPriceChange / trendPreviousPrice) * 100;

  const formattedPriceChange = `$${Math.abs(calculatedPriceChange).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} (${Math.abs(calculatedPercentChange).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%)`;

  const scrubberLabel = useCallback(
    (item: number | null) => {
      if (item === null) return null;
      const timestamp = currentTimestamps[item];
      const price = currentData[item];
      const formattedPrice =
        price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' USD';
      const formattedDate = formatChartDate(timestamp, activeTab?.id || '1H');

      return (
        <>
          <tspan style={{ fontWeight: 'bold', display: 'inline-block' }}>{formattedPrice}</tspan>
          <tspan style={{ display: 'inline-block' }}> {formattedDate}</tspan>
        </>
      );
    },
    [currentTimestamps, currentData, activeTab?.id],
  );

  const formatPrice = useCallback((value: number) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  // todo: add this to chart context?
  const dataKey = activeTab?.id ?? '1H';

  return (
    <VStack gap={3} width="100%">
      {/*<HStack alignItems="flex-start" gap={3} justifyContent="space-between" padding={4}>
        <ChartHeader
          description={formattedPrice}
          title={<Text font="headline">Ethereum</Text>}
          trend={formattedPriceChange}
          trendDirection={trendDirection as 'up' | 'down' | 'neutral'}
        />
      </HStack>*/}
      <LineChart
        showArea
        dataKey={dataKey}
        height={defaultChartHeight}
        onScrubberPosChange={onScrubberPosChange}
        padding={{ left: 0, right: 24, bottom: 24, top: 24 }}
        series={[
          {
            id: 'price',
            data: currentData,
            color: assets.eth.color,
            renderPoints: ({ dataX: index }) => {
              if (highestPriceIndices.includes(index)) {
                return {
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelConfig: {
                    position: 'top',
                    dy: -16,
                  },
                };
              }

              if (lowestPriceIndices.includes(index)) {
                return {
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelConfig: {
                    position: 'bottom',
                    dy: 16,
                  },
                };
              }
            },
          },
        ]}
        yAxis={{ domainLimit: 'strict' }}
      ></LineChart>
      <PeriodSelector activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} tabs={tabs} />
    </VStack>
  );
};

export const ForecastChart = () => {
  const getDataFromSparkline = (startDate: Date) => {
    const allData = sparklineInteractiveData.all;
    if (!allData || allData.length === 0) return [];

    const timelineData = allData.filter((point) => point.date >= startDate);

    return timelineData.map((point) => ({
      date: point.date,
      value: point.value,
    }));
  };

  const historicalData = useMemo(() => getDataFromSparkline(new Date('2019-01-01')), []);

  const annualGrowthRate = 10;

  const generateForecastData = useCallback(
    (lastDate: Date, lastPrice: number, growthRate: number) => {
      const dailyGrowthRate = Math.pow(1 + growthRate / 100, 1 / 365) - 1;
      const forecastData: Array<{ date: Date; value: number }> = [];
      const fiveYearsFromNow = new Date(lastDate);
      fiveYearsFromNow.setFullYear(fiveYearsFromNow.getFullYear() + 5);

      // Generate daily forecast points for 5 years
      const currentDate = new Date(lastDate);
      let currentPrice = lastPrice;

      while (currentDate <= fiveYearsFromNow) {
        currentPrice = currentPrice * (1 + dailyGrowthRate * 10);
        forecastData.push({
          date: new Date(currentDate),
          value: Math.round(currentPrice),
        });
        currentDate.setDate(currentDate.getDate() + 10);
      }

      return forecastData;
    },
    [],
  );

  const forecastData = useMemo(() => {
    if (historicalData.length === 0) return [];
    const lastPoint = historicalData[historicalData.length - 1];
    return generateForecastData(lastPoint.date, lastPoint.value, annualGrowthRate);
  }, [generateForecastData, historicalData, annualGrowthRate]);

  // Combine all data points with dates converted to timestamps for x-axis
  const allDataPoints = useMemo(
    () => [...historicalData, ...forecastData],
    [historicalData, forecastData],
  );

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  // Format x-axis labels to show years
  const formatXAxisLabel = useCallback((timestamp: number) => {
    return new Date(timestamp).getFullYear().toString();
  }, []);

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      areaType="dotted"
      height={defaultChartHeight}
      padding={{
        top: 32,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      series={[
        {
          id: 'historical',
          data: historicalData.map((d) => d.value),
          color: assets.btc.color,
        },
        {
          id: 'forecast',
          data: [...historicalData.map((d) => null), ...forecastData.map((d) => d.value)],
          color: assets.btc.color,
          type: 'dotted',
        },
      ]}
      xAxis={{
        data: allDataPoints.map((d) => d.date.getTime()),
        tickLabelFormatter: formatXAxisLabel,
        tickInterval: 4,
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

const PeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: '1H' },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return <PeriodSelector activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} tabs={tabs} />;
};

const AssetPriceDotted = () => {
  const [scrubIndex, setScrubIndex] = useState<number | null>(null);
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

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
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

  const scrubberLabel: ChartTextChildren = useMemo(() => {
    if (scrubIndex === null) return null;
    const price = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sparklineTimePeriodDataValues[scrubIndex]);
    const date = formatDate(sparklineTimePeriodDataTimestamps[scrubIndex]);
    return `${price} USD ${date}`;
  }, [scrubIndex, sparklineTimePeriodDataValues, formatDate, sparklineTimePeriodDataTimestamps]);

  return (
    <VStack gap={2}>
      <SectionHeader
        balance={<Text font="title2">{formatPrice(currentPrice)}</Text>}
        end={
          <VStack justifyContent="center">
            <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
          </VStack>
        }
        padding={0}
        title={<Text font="title1">Bitcoin</Text>}
      />
      <LineChart
        enableScrubbing
        showArea
        areaType="dotted"
        height={defaultChartHeight}
        onScrubberPosChange={setScrubIndex}
        series={[
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
          },
        ]}
      >
        <Scrubber pulse scrubberLabel={scrubberLabel} />
      </LineChart>
      <PeriodSelector activeTab={timePeriod} onChange={onPeriodChange} tabs={tabs} />
    </VStack>
  );
};

const GainLossChart = () => {
  const theme = useTheme();
  const gradientId = useId();

  const data = [-40, -28, -21, -5, 48, -5, -28, 2, -29, -46, 16, -30, -29, 8];

  const ChartDefs = ({ threshold = 0 }) => {
    const { getYScale } = useChartContext();
    // get the default y-axis scale
    const yScale = getYScale?.();

    if (yScale) {
      const domain = yScale.domain();
      const range = yScale.range();

      const baselinePercentage = ((threshold - domain[0]) / (domain[1] - domain[0])) * 100;

      const negativeColor = `rgb(${theme.spectrum.gray15})`;
      const positiveColor = theme.color.fgPositive;

      return (
        <Defs>
          <LinearGradient
            gradientUnits="userSpaceOnUse"
            id={`${gradientId}-solid`}
            x1="0%"
            x2="0%"
            y1={range[0]}
            y2={range[1]}
          >
            <Stop offset="0%" stopColor={negativeColor} />
            <Stop offset={`${baselinePercentage}%`} stopColor={negativeColor} />
            <Stop offset={`${baselinePercentage}%`} stopColor={positiveColor} />
            <Stop offset="100%" stopColor={positiveColor} />
          </LinearGradient>
          <LinearGradient
            gradientUnits="userSpaceOnUse"
            id={`${gradientId}-gradient`}
            x1="0%"
            x2="0%"
            y1={range[0]}
            y2={range[1]}
          >
            <Stop offset="0%" stopColor={negativeColor} stopOpacity={0.3} />
            <Stop offset={`${baselinePercentage}%`} stopColor={negativeColor} stopOpacity={0} />
            <Stop offset={`${baselinePercentage}%`} stopColor={positiveColor} stopOpacity={0} />
            <Stop offset="100%" stopColor={positiveColor} stopOpacity={0.3} />
          </LinearGradient>
        </Defs>
      );
    }

    return null;
  };

  const tickLabelFormatter = useCallback(
    (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value),
    [],
  );

  const solidColor = `url(#${gradientId}-solid)`;

  return (
    <Chart
      enableScrubbing
      height={defaultChartHeight}
      padding={{ top: 12, bottom: 12, left: 0, right: 0 }}
      series={[
        {
          id: 'prices',
          data: data,
          color: solidColor,
        },
      ]}
    >
      <ChartDefs />
      <YAxis showGrid requestedTickCount={2} tickLabelFormatter={tickLabelFormatter} />
      <Area curve="monotone" fill={`url(#${gradientId}-gradient)`} seriesId="prices" />
      <Line curve="monotone" seriesId="prices" stroke={solidColor} strokeWidth={3} />
      <Scrubber hideOverlay />
    </Chart>
  );
};

const BitcoinChartWithScrubberHead = () => {
  const theme = useTheme();
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

  return (
    <Box borderRadius={300} overflow="hidden" style={{ backgroundColor: '#ED702F' }}>
      {/* Semi-transparent black overlay */}
      <VStack style={{ backgroundColor: 'rgba(0, 0, 0, 0.80)' }}>
        <HStack alignItems="center" gap={2} padding={2} paddingBottom={0}>
          <RemoteImage shape="circle" size="xxl" source={assets.btc.imageUrl} />
          <VStack flexGrow={1} gap={0.25}>
            <Text font="title1" style={{ color: 'white' }}>
              BTC
            </Text>
            <Text color="fgMuted" font="label1">
              Bitcoin
            </Text>
          </VStack>
          <VStack alignItems="flex-end" gap={0.25}>
            <Text font="title1" style={{ color: 'white' }}>
              {formatPrice(latestPrice)}
            </Text>
            <Text color="fgPositive" font="label1">
              +{formatPercentChange(percentChange)}
            </Text>
          </VStack>
        </HStack>
        <LineChart
          showArea
          height={64}
          padding={{ left: 0, right: 24, bottom: 0, top: 15 }}
          series={[
            {
              id: 'btcPrice',
              data: prices,
              color: assets.btc.color,
            },
          ]}
          width="100%"
        >
          <Scrubber pulse />
        </LineChart>
      </VStack>
    </Box>
  );
};

const sampleData = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

const LineChartStories = () => {
  const theme = useTheme();

  return (
    <ExampleScreen>
      <Example title="Basic">
        <LineChart
          enableScrubbing
          showArea
          showYAxis
          curve="monotone"
          height={defaultChartHeight}
          series={[
            {
              id: 'prices',
              data: sampleData,
            },
          ]}
          yAxis={{
            showGrid: true,
          }}
        >
          <Scrubber />
        </LineChart>
      </Example>
      <Example title="Simple">
        <LineChart
          curve="monotone"
          height={defaultChartHeight}
          series={[
            {
              id: 'prices',
              data: sampleData,
            },
          ]}
        />
      </Example>
      <Example title="Gain/Loss">
        <GainLossChart />
      </Example>
      <Example title="Price Chart">
        <PriceChart />
      </Example>
      <Example title="Asset Price Dotted">
        <AssetPriceDotted />
      </Example>
      <Example title="Multiple Series">
        <LineChart
          enableScrubbing
          showXAxis
          showYAxis
          height={defaultChartHeight}
          series={[
            {
              id: 'pageViews',
              data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
              label: 'Page Views',
              color: theme.color.accentBoldBlue,
              curve: 'natural',
            },
            {
              id: 'uniqueVisitors',
              data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
              label: 'Unique Visitors',
              color: theme.color.accentBoldGreen,
              curve: 'natural',
            },
          ]}
          xAxis={{
            data: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
            ticks: true,
            scaleType: 'band',
          }}
          yAxis={{
            domain: {
              min: 0,
            },
            showGrid: true,
            tickLabelFormatter: (value) => value.toLocaleString(),
          }}
        />
      </Example>
      <Example title="Points">
        <Chart
          height={defaultChartHeight}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <Area curve="monotone" fill={`rgb(${theme.spectrum.blue5})`} seriesId="prices" />
          <Line
            curve="monotone"
            renderPoints={({ dataX, ...props }) =>
              [4, 6, 7, 9, 10].includes(dataX)
                ? {
                    ...props,
                    strokeWidth: 2,
                    stroke: theme.color.bg,
                    radius: 5,
                    onClick: () => alert('You have clicked a key market shift!'),
                  }
                : false
            }
            seriesId="prices"
          />
        </Chart>
      </Example>
      <Example title="Data Formats">
        <LineChart
          enableScrubbing
          showArea
          showXAxis
          showYAxis
          curve="natural"
          height={defaultChartHeight}
          renderPoints={() => true}
          series={[
            {
              id: 'line',
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          xAxis={{ data: [1, 2, 3, 5, 8, 10], showLine: true, showTickMarks: true, showGrid: true }}
          yAxis={{
            domain: { min: 0 },
            position: 'start',
            showLine: true,
            showTickMarks: true,
            showGrid: true,
          }}
        >
          <Scrubber />
        </LineChart>
      </Example>
      <Example title="Bitcoin Chart with Scrubber Head">
        <BitcoinChartWithScrubberHead />
      </Example>
      {/*<Example title="Asset Price">
        <AssetPrice />
      </Example>
      <Example title="Line Styles">
        <LineStyles />
      </Example>
      <Example title="Chart Scale">
        <ChartScale />
      </Example>
      <Example title="BTC Price Chart">
        <BTCPriceChart />
      </Example>
      <Example title="Color Shift Chart">
        <ColorShiftChart />
      </Example>
      <Example title="Price Chart">
        <PriceChart />
      </Example>
      <Example title="Forecast Chart">
        <ForecastChart />
      </Example>
      <Example title="Period Selector">
        <PeriodSelectorExample />
      </Example>*/}
    </ExampleScreen>
  );
};

export default LineChartStories;
