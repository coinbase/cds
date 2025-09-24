import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import {
  projectPoint,
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import type { ChartAxisScaleType } from '@coinbase/cds-common/visualizations/charts/scale';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { RemoteImage } from '@coinbase/cds-web/media';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import {
  SegmentedTab,
  type SegmentedTabProps,
  SegmentedTabs,
  type TabComponent,
  TabsActiveIndicator,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-web/tabs';
import { Text, TextLabel1 } from '@coinbase/cds-web/typography';
import { AnimatePresence, m as motion } from 'framer-motion';

import {
  btcCandles,
  type ChartTextChildren,
  LiveTabLabel,
  PeriodSelector,
  PeriodSelectorActiveIndicator,
  Scrubber,
  type ScrubberRef,
} from '../..';
import { Area, type AreaComponentProps, DottedArea, GradientArea } from '../../area';
import { XAxis, YAxis } from '../../axis';
import { Chart } from '../../Chart';
import { ChartHeader } from '../../ChartHeader';
import { Point } from '../../point';
import { ScrubberHead } from '../../scrubber/ScrubberHead';
import { DottedLine, GradientLine, Line, LineChart, ReferenceLine, SolidLine } from '..';

export default {
  component: LineChart,
  title: 'Components/Chart/LineChart',
};

const defaultChartHeight = 400;

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

const PeriodSelectorTab: TabComponent = memo(
  forwardRef((props: SegmentedTabProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <SegmentedTab
      {...props}
      ref={ref}
      activeColor="bg"
      style={{ outlineColor: 'var(--color-fg) !important' }}
    />
  )),
);

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
        onScrubberEnter={() => console.log('scrubber entered')}
        radius={6}
        stroke="purple"
        strokeOpacity={0.2}
        strokeWidth={7}
      />
      <ReferenceLine
        dataX={2}
        label="testing 123"
        labelConfig={{
          color: 'var(--color-bgPositive)',
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
      <Scrubber />
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
      <ChartHeader
        description={highlightedPrice}
        title="Price"
        trend={trendInfo.text}
        trendDirection={trendInfo.direction}
      />
      <LineChart
        enableScrubbing
        showArea
        height={300}
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
        <Scrubber />
        <ScrubberHead
          pulse
          dataX={parsedPrices.length - 1}
          dataY={parsedPrices[parsedPrices.length - 1]}
          opacity={isHovering ? 0 : 1}
          seriesId="price"
        />
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
      enableScrubbing
      height={400}
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
      <Scrubber />
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
        enableScrubbing
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
      >
        <Scrubber />
      </LineChart>
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
      dataX: currentData.length - 1,
      dataY: currentData[currentData.length - 1],
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
    () => (props: AreaComponentProps) => <GradientArea {...props} peakOpacity={0.15} />,
    [],
  );

  return (
    <Box
      style={{ backgroundColor: btcAccentColor, borderRadius: '12px', overflow: 'hidden' }}
      width="100%"
    >
      <VStack gap={3} width="100%">
        <HStack alignItems="flex-start" gap={3} justifyContent="space-between" padding={4}>
          {/* todo: set trend to black */}
          <ChartHeader
            description={formattedPrice}
            title={<Text font="headline">Coinbase Wrapped BTC</Text>}
            trend={formattedPriceChange}
            trendDirection={trendDirection as 'up' | 'down' | 'neutral'}
          />
          <RemoteImage alt="Bitcoin" shape="circle" size="xxxl" src={assets.btc.imageUrl} />
        </HStack>
        <Chart
          enableScrubbing
          height={350}
          onScrubberPosChange={onScrubberPosChange}
          padding={{ left: 0, right: 20, bottom: 0, top: 40 }}
          series={[
            {
              id: 'price',
              data: currentData,
              color: 'black',
            },
          ]}
          style={{ outlineColor: 'var(--color-fg) !important' }}
          width="100%"
        >
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              setActiveTab(selectedTab);
            }}
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
          </AnimatePresence>
          <Scrubber
            pulse={!isHovering}
            scrubberComponents={{
              ScrubberLineComponent: ReferenceLine,
            }}
            scrubberLabel={displayDate}
            scrubberStyles={{
              scrubberLine: { stroke: 'black' },
              scrubberHead: { stroke: 'white' },
            }}
          />
        </Chart>
        <Box paddingX={{ phone: 2, tablet: 4, desktop: 4 }}>
          <PeriodSelector
            TabComponent={PeriodSelectorTab}
            TabsActiveIndicatorComponent={UnderlineIndicator}
            activeBackground="transparent"
            activeTab={selectedTab}
            background="transparent"
            onChange={(tab) => setSelectedTab(tab)}
            tabs={tabs}
          />
        </Box>
      </VStack>
    </Box>
  );
};
export const ColorShiftChart = () => {
  const tabs = useMemo(
    () => [
      {
        id: '1H',
        label: <LiveTabLabel style={{ color: 'var(--chartActiveColor)' }} />,
      },
      {
        id: '1D',
        label: (
          <Text font="headline" style={{ color: 'var(--chartActiveColor)' }}>
            1D
          </Text>
        ),
      },
      {
        id: '1W',
        label: (
          <Text font="headline" style={{ color: 'var(--chartActiveColor)' }}>
            1W
          </Text>
        ),
      },
      {
        id: '1M',
        label: (
          <Text font="headline" style={{ color: 'var(--chartActiveColor)' }}>
            1M
          </Text>
        ),
      },
      {
        id: '1Y',
        label: (
          <Text font="headline" style={{ color: 'var(--chartActiveColor)' }}>
            1Y
          </Text>
        ),
      },
      {
        id: 'All',
        label: (
          <Text font="headline" style={{ color: 'var(--chartActiveColor)' }}>
            All
          </Text>
        ),
      },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);

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
      dataX: currentData.length - 1,
      dataY: currentData[currentData.length - 1],
      y: currentData[currentData.length - 1],
    };
  }, [currentData]);

  const [scrubberLabel, setScrubberLabel] = useState<string | null>(null);
  const onScrubberPosChange = useCallback(
    (dataX: number | null) => {
      if (dataX === null) return null;

      const timestamp = currentTimestamps[dataX];
      setScrubberLabel(formatChartDate(timestamp, activeTab?.id || '1H'));
      setHighlightedItem(dataX);
      setIsHovering(!!dataX);
    },
    [activeTab?.id, currentTimestamps],
  );

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
    return priceChange >= 0 ? 'var(--color-fgPositive)' : 'var(--color-fgNegative)';
  }, [currentPrice, startPrice]);

  const activeBackground = useMemo(() => {
    const priceChange = currentPrice - startPrice;
    return priceChange >= 0 ? 'bgPositiveWash' : 'bgNegativeWash';
  }, [currentPrice, startPrice]);

  const indexToTime = useCallback(
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
    <motion.div
      // @ts-expect-error we're using a custom color variable here
      animate={{ '--chartActiveColor': chartActiveColor }}
      style={{ '--chartActiveColor': chartActiveColor } as React.CSSProperties}
      transition={{ duration: 0.3 }}
    >
      <VStack gap={3} width="100%">
        <HStack alignItems="flex-start" gap={3} justifyContent="space-between" padding={4}>
          <ChartHeader
            description={formattedPrice}
            title={<Text font="headline">XRP</Text>}
            trend={formattedPriceChange}
            trendDirection={trendDirection as 'up' | 'down' | 'neutral'}
          />
          <RemoteImage alt="XRP" shape="circle" size="xxxl" src={assets.xrp.imageUrl} />
        </HStack>
        <LineChart
          enableScrubbing
          showArea
          showXAxis
          dataKey={dataKey}
          height={350}
          onScrubberPosChange={onScrubberPosChange}
          padding={{ top: 48, left: 0, right: 0, bottom: 0 }}
          series={[
            {
              id: 'price',
              data: currentData,
              color: 'var(--chartActiveColor)',
              label: 'XRP',
            },
          ]}
          xAxis={{
            tickLabelFormatter: indexToTime,
          }}
        >
          <ScrubberHead
            dataKey={dataKey}
            pulse={!isHovering}
            seriesId="price"
            {...latestPriceCoords}
            opacity={isHovering ? 0 : 1}
          />
          <Scrubber scrubberLabel={scrubberLabel} />
          <ReferenceLine
            dataY={startPrice}
            label={`$${startPrice}`}
            labelConfig={{
              elevation: 1,
              color: 'var(--color-fgInverse)',
              textAnchor: 'start',
              background:
                currentPrice - startPrice > 0
                  ? 'var(--color-bgPositive)'
                  : 'var(--color-bgNegative)',
            }}
            labelPosition="right"
            lineStroke={
              currentPrice - startPrice > 0 ? 'var(--color-bgPositive)' : 'var(--color-bgNegative)'
            }
          />
        </LineChart>
        <Box paddingX={{ phone: 2, tablet: 4, desktop: 4 }}>
          <PeriodSelector
            activeBackground={activeBackground}
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={tabs}
          />
        </Box>
      </VStack>
    </motion.div>
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
  const positiveColor = 'var(--color-fgPositive)';
  const negativeColor = 'var(--color-fgMuted)';

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
      enableScrubbing
      height={300}
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
      <g clipPath="url(#positiveClip)">
        <Area fill={positiveColor} seriesId="returnsArea" type="dotted" />
      </g>
      <g clipPath="url(#negativeClip)">
        <Area fill={negativeColor} seriesId="returnsArea" type="dotted" />
      </g>
      <Line seriesId="returnsLine" stroke="url(#conditionalGradient)" />
      <ReferenceLine
        LineComponent={(props) => <SolidLine {...props} strokeWidth={8} />}
        dataY={0}
        lineStroke="var(--color-bg)"
      />
      <ReferenceLine
        LineComponent={(props) => (
          <DottedLine {...props} strokeDasharray="0.01 6" strokeWidth={3} />
        )}
        dataY={0}
        lineStroke="var(--color-fgMuted)"
      />
      <Scrubber />
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
        label: <LiveTabLabel />,
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
      dataX: currentData.length - 1,
      dataY: currentData[currentData.length - 1],
    };
  }, [currentData]);

  const [scrubberLabel, setScrubberLabel] = useState<ChartTextChildren | null>(null);
  const onScrubberPosChange = useCallback(
    (dataX: number | null) => {
      setIsHovering(dataX !== null);
      if (dataX === null) return null;
      const timestamp = currentTimestamps[dataX];
      const price = currentData[dataX];
      const formattedPrice =
        price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' USD';
      const formattedDate = formatChartDate(timestamp, activeTab?.id || '1H');

      setScrubberLabel(
        <>
          <tspan style={{ fontWeight: 'bold', display: 'inline-block' }}>{formattedPrice}</tspan>
          <tspan style={{ display: 'inline-block' }}> {formattedDate}</tspan>
        </>,
      );
    },
    [activeTab?.id, currentData, currentTimestamps],
  );

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
      <HStack alignItems="flex-start" gap={3} justifyContent="space-between" padding={4}>
        <ChartHeader
          description={formattedPrice}
          title={<Text font="headline">Ethereum</Text>}
          trend={formattedPriceChange}
          trendDirection={trendDirection as 'up' | 'down' | 'neutral'}
        />
      </HStack>
      <LineChart
        enableScrubbing
        showArea
        dataKey={dataKey}
        height={372}
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
                  color: 'var(--color-bgPositive)',
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelConfig: {
                    position: 'top',
                    dy: -16,
                    color: 'var(--color-bgPositive)',
                  },
                };
              }

              if (lowestPriceIndices.includes(index)) {
                return {
                  color: 'var(--color-fgNegative)',
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelConfig: {
                    position: 'bottom',
                    dy: 16,
                    color: 'var(--color-bgNegative)',
                  },
                };
              }
            },
          },
        ]}
        yAxis={{ domainLimit: 'strict' }}
      >
        <Scrubber scrubberLabel={scrubberLabel} scrubberLabelConfig={{ elevation: 1 }} />
      </LineChart>
      <Box paddingX={{ phone: 2, tablet: 4, desktop: 4 }}>
        <PeriodSelector
          activeBackground={activeBackground}
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={tabs}
        />
      </Box>
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
      const forecastData = [];
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

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      height={350}
      padding={{
        top: 24,
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
        tickLabelFormatter: (value: number) => {
          return new Date(value).toLocaleDateString('en-US', {
            month: 'numeric',
            year: 'numeric',
          });
        },
        tickInterval: 4,
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

export const DataFormat = () => {
  return (
    <VStack gap={2}>
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        curve="natural"
        height={300}
        renderPoints={() => true}
        series={[
          {
            id: 'line',
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        xAxis={{
          data: [1, 2, 3, 5, 8, 10],
          showLine: true,
          showTickMarks: true,
          showGrid: true,
        }}
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
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        curve="natural"
        height={300}
        renderPoints={() => true}
        series={[
          {
            id: 'line',
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        xAxis={{
          domain: { min: 0, max: 10 },
          data: [1, 2, 3, 5, 8, 10],
          showLine: true,
          showTickMarks: true,
          showGrid: true,
        }}
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
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        curve="natural"
        height={300}
        renderPoints={() => true}
        series={[
          {
            id: 'line',
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        xAxis={{
          domain: { min: 0, max: 20 },
          data: [1, 2, 3, 5, 8, 10],
          showLine: true,
          showTickMarks: true,
          showGrid: true,
        }}
        yAxis={{
          domain: { min: 0 },
          position: 'start',
          showLine: true,
          showTickMarks: true,
          showGrid: true,
        }}
      >
        <Scrubber />
      </LineChart>{' '}
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        curve="natural"
        height={300}
        renderPoints={() => true}
        series={[
          {
            id: 'line',
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        xAxis={{
          domain: { min: 5, max: 10 },
          data: [1, 2, 3, 5, 8, 10],
          showLine: true,
          showTickMarks: true,
          showGrid: true,
        }}
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
    </VStack>
  );
};

export const BitcoinChartWithScrubberHead = () => {
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
      <div
        style={{
          marginLeft: 'calc(-1 * var(--space-2))',
          marginRight: 'calc(-1 * var(--space-2))',
        }}
      >
        <LineChart
          showArea
          height={92}
          padding={{ left: 0, right: 24, bottom: 0, top: 0 }}
          series={[
            {
              id: 'btcPrice',
              data: prices,
              color: assets.btc.color,
            },
          ]}
          width="100%"
        >
          <Scrubber
            pulse
            scrubberStyles={{
              scrubberHead: {
                stroke: 'white',
              },
            }}
          />
        </LineChart>
      </div>
    </VStack>
  );
};

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

export const AssetPriceDotted = () => {
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
    return (
      <>
        <tspan style={{ fontWeight: 'bold' }}>{price} USD</tspan> {date}
      </>
    );
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
        style={{ padding: 0 }}
        title={<Text font="title1">Bitcoin</Text>}
      />
      <LineChart
        enableScrubbing
        showArea
        areaType="dotted"
        height={300}
        onScrubberPosChange={setScrubIndex}
        series={[
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
          },
        ]}
      >
        <Scrubber pulse scrubberLabel={scrubberLabel} scrubberLabelConfig={{ elevation: 1 }} />
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
};

export const LiveAssetPrice = () => {
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
      height={300}
      series={[
        {
          id: 'btc',
          data: priceData,
          color: assets.btc.color,
        },
      ]}
    >
      <Scrubber ref={scrubberRef} scrubberLabelConfig={{ elevation: 1 }} />
    </LineChart>
  );
};

export const AvailabilityChart = () => {
  const availabilityEvents = [
    {
      date: new Date('2022-01-01'),
      availability: 79,
    },
    {
      date: new Date('2022-01-03'),
      availability: 81,
    },
    {
      date: new Date('2022-01-04'),
      availability: 82,
    },
    {
      date: new Date('2022-01-06'),
      availability: 91,
    },
    {
      date: new Date('2022-01-07'),
      availability: 92,
    },
    {
      date: new Date('2022-01-10'),
      availability: 86,
    },
  ];

  const ChartDefs = memo(
    ({
      yellowThresholdPercentage = 85,
      greenThresholdPercentage = 90,
    }: {
      yellowThresholdPercentage?: number;
      greenThresholdPercentage?: number;
    }) => {
      const { drawingArea } = useChartDrawingAreaContext();
      const { height, series, getYScale, getYAxis } = useChartContext();
      const yScale = getYScale?.();
      const yAxis = getYAxis?.();

      if (!series || !drawingArea || !yScale) return null;

      const rangeBounds = yAxis?.domain;
      const rangeMin = rangeBounds?.min ?? 0;
      const rangeMax = rangeBounds?.max ?? 100;

      // Calculate the Y positions in the chart coordinate system
      const yellowThresholdY = yScale(yellowThresholdPercentage) ?? 0;
      const greenThresholdY = yScale(greenThresholdPercentage) ?? 0;
      const minY = yScale(rangeMax) ?? 0; // Top of chart (max value)
      const maxY = yScale(rangeMin) ?? drawingArea.height; // Bottom of chart (min value)

      // Calculate percentages based on actual chart positions
      const yellowThreshold = ((yellowThresholdY - minY) / (maxY - minY)) * 100;
      const greenThreshold = ((greenThresholdY - minY) / (maxY - minY)) * 100;

      return (
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="availabilityGradient"
            x1="0%"
            x2="0%"
            y1={minY}
            y2={maxY}
          >
            <stop offset="0%" stopColor="var(--color-fgPositive)" />
            <stop offset={`${greenThreshold}%`} stopColor="var(--color-fgPositive)" />
            <stop offset={`${greenThreshold}%`} stopColor="var(--color-fgWarning)" />
            <stop offset={`${yellowThreshold}%`} stopColor="var(--color-fgWarning)" />
            <stop offset={`${yellowThreshold}%`} stopColor="var(--color-fgNegative)" />
            <stop offset="100%" stopColor="var(--color-fgNegative)" />
          </linearGradient>
        </defs>
      );
    },
  );

  return (
    <Chart
      height={300}
      series={[
        {
          id: 'availability',
          data: availabilityEvents.map((event) => event.availability),
          color: 'url(#availabilityGradient)',
        },
      ]}
      xAxis={{
        data: availabilityEvents.map((event) => event.date.getTime()),
      }}
      yAxis={{
        domain: ({ min, max }) => ({ min: Math.max(min - 2, 0), max: Math.min(max + 2, 100) }),
      }}
    >
      <ChartDefs />
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
        position="start"
        tickLabelFormatter={(value) => `${value}%`}
      />
      <Line
        curve="stepAfter"
        renderPoints={() => ({
          fill: 'var(--color-bg)',
          stroke: 'url(#availabilityGradient)',
          strokeWidth: 2,
        })}
        seriesId="availability"
      />
    </Chart>
  );
};
