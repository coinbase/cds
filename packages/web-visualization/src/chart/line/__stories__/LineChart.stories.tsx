import { forwardRef, memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { useTheme } from '@coinbase/cds-web';
import { ListCell } from '@coinbase/cds-web/cells';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Avatar, RemoteImage } from '@coinbase/cds-web/media';
import { RollingNumber } from '@coinbase/cds-web/numbers';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import {
  SegmentedTab,
  type SegmentedTabProps,
  type TabComponent,
  TabsActiveIndicator,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-web/tabs';
import { Text, TextLabel1 } from '@coinbase/cds-web/typography';
import { m as motion } from 'framer-motion';

import {
  type ChartTextChildren,
  LiveTabLabel,
  PeriodSelector,
  PeriodSelectorActiveIndicator,
  Scrubber,
  type ScrubberRef,
  useCartesianChartContext,
} from '../..';
import { Area, type AreaComponentProps, DottedArea, GradientArea } from '../../area';
import { XAxis, YAxis } from '../../axis';
import { BarPlot } from '../../bar';
import { CartesianChart } from '../../CartesianChart';
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
  scrubberPosition: number | undefined,
  currentData: number[],
  currentTimestamps: string[],
  startPrice: number,
  currentPrice: number,
  activeTimeframe: string,
): TrendData => {
  if (scrubberPosition !== undefined) {
    // When hovering, show trend relative to START of time period (not previous point)
    const hoverIndex = scrubberPosition;
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
  forwardRef((props: SegmentedTabProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const theme = useTheme();
    const isLight = theme.activeColorScheme === 'light';
    return (
      <SegmentedTab
        {...props}
        ref={ref}
        activeColor={isLight ? 'fg' : 'bg'}
        style={{ outlineColor: 'var(--color-fg) !important' }}
      />
    );
  }),
);

/*export const ChartScale = () => {
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
          width: 70,
        }}
      >
        <Scrubber />
      </LineChart>
    </VStack>
  );
};*/

const UnderlineIndicator = (props: TabsActiveIndicatorProps) => {
  const theme = useTheme();
  const isLight = theme.activeColorScheme === 'light';

  return (
    <TabsActiveIndicator
      {...props}
      background={isLight ? 'fg' : 'bg'}
      borderRadius={0}
      bottom={0}
      height={2}
      top="auto"
    />
  );
};

const BTCPriceChart = () => {
  const tabs = [
    { id: 'hour', label: '1H' },
    { id: 'day', label: '1D' },
    { id: 'week', label: '1W' },
    { id: 'month', label: '1M' },
    { id: 'year', label: '1Y' },
    { id: 'all', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]); // Data source for chart
  const [isHovering, setIsHovering] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState<number | undefined>();

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

  const onScrubberPositionChange = useCallback((item?: number) => {
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

  const formattedPrice = `$${displayPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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
          <SectionHeader
            balance={<Text font="title2">{formattedPrice}</Text>}
            end={
              <VStack justifyContent="center">
                <RemoteImage shape="circle" size="xxl" source={assets.btc.imageUrl} />
              </VStack>
            }
            style={{ padding: 0, flexGrow: 1 }}
            title={<Text font="title1">BTC</Text>}
          />
        </HStack>
        <CartesianChart
          enableScrubbing
          height={350}
          inset={{ left: 0, bottom: 0 }}
          onScrubberPositionChange={onScrubberPositionChange}
          overflow="visible"
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
          <Line showArea AreaComponent={AreaComponent} seriesId="price" strokeWidth={3} />
          <Scrubber
            idlePulse
            label={displayDate}
            labelProps={{
              color: 'black',
            }}
            lineStroke="black"
            styles={{
              beacon: {
                stroke: btcAccentColor,
              },
              overlay: {
                fill: btcAccentColor,
              },
            }}
          />
        </CartesianChart>
        <Box paddingX={{ phone: 2, tablet: 4, desktop: 4 }}>
          <PeriodSelector
            TabComponent={PeriodSelectorTab}
            TabsActiveIndicatorComponent={UnderlineIndicator}
            activeBackground="transparent"
            activeTab={activeTab}
            background="transparent"
            onChange={(tab) => setActiveTab(tab)}
            tabs={tabs}
          />
        </Box>
      </VStack>
    </Box>
  );
};

const ColorShiftChart = () => {
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

  const [scrubberLabel, setScrubberLabel] = useState<string | null>(null);
  const onScrubberPositionChange = useCallback(
    (index?: number) => {
      if (index === undefined) return null;

      const timestamp = currentTimestamps[index];
      setScrubberLabel(formatChartDate(timestamp, activeTab?.id || '1H'));
    },
    [activeTab?.id, currentTimestamps],
  );

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

  return (
    <motion.div
      // @ts-expect-error we're using a custom color variable here
      animate={{ '--chartActiveColor': chartActiveColor }}
      style={{ '--chartActiveColor': chartActiveColor } as React.CSSProperties}
      transition={{ duration: 0.3 }}
    >
      <VStack gap={3} width="100%">
        <LineChart
          enableScrubbing
          showArea
          showXAxis
          height={350}
          inset={{ left: 0, right: 0, bottom: 0 }}
          onScrubberPositionChange={onScrubberPositionChange}
          overflow="visible"
          series={[
            {
              id: 'price',
              data: currentData,
              color: 'var(--chartActiveColor)',
              label: 'Price',
            },
          ]}
          xAxis={{
            tickLabelFormatter: indexToTime,
          }}
        >
          <Scrubber label={scrubberLabel} />
          <ReferenceLine
            dataY={startPrice}
            label={`$${startPrice}`}
            labelPosition="right"
            labelProps={{
              elevation: 1,
              color: 'var(--color-fgInverse)',
              background:
                currentPrice - startPrice > 0
                  ? 'var(--color-bgPositive)'
                  : 'var(--color-bgNegative)',
            }}
            stroke={
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

const PriceChart = () => {
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
  const onScrubberPositionChange = useCallback(
    (index?: number) => {
      setIsHovering(index !== undefined);
      if (index === undefined) return null;
      const timestamp = currentTimestamps[index];
      const price = currentData[index];
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
      undefined,
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

  return (
    <VStack gap={3} width="100%">
      <LineChart
        enableScrubbing
        showArea
        height={372}
        inset={{ left: 0, right: 18, bottom: 32, top: 56 }}
        onScrubberPositionChange={onScrubberPositionChange}
        overflow="visible"
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
                  labelProps: {
                    verticalAlignment: 'bottom',
                    dy: -8,
                    color: 'var(--color-bgPositive)',
                  },
                };
              }

              if (lowestPriceIndices.includes(index)) {
                return {
                  color: 'var(--color-fgNegative)',
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelProps: {
                    verticalAlignment: 'top',
                    dy: 8,
                    color: 'var(--color-bgNegative)',
                  },
                };
              }
            },
          },
        ]}
        yAxis={{ domainLimit: 'strict' }}
      >
        <Scrubber label={scrubberLabel} labelProps={{ elevation: 1 }} />
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

function ForecastAssetPrice() {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>();
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

  const AreaComponent = memo((props: AreaComponentProps) => (
    <DottedArea {...props} baselineOpacity={0.4} peakOpacity={0.4} />
  ));

  const scrubberLabel: ChartTextChildren = useMemo(() => {
    if (scrubIndex === undefined) return null;
    const price = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(allDataPoints[scrubIndex].value);
    const date = formatDate(allDataPoints[scrubIndex].date);
    return (
      <>
        <tspan style={{ fontWeight: 'bold' }}>{price} USD</tspan> {date}
      </>
    );
  }, [allDataPoints, formatDate, scrubIndex]);

  const accessibilityLabel: string | undefined = useMemo(() => {
    if (scrubIndex === undefined) return;
    const price = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(allDataPoints[scrubIndex].value);
    const date = formatDate(allDataPoints[scrubIndex].date);
    return `${price} USD ${date}`;
  }, [allDataPoints, formatDate, scrubIndex]);

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      AreaComponent={(props) => <DottedArea {...props} baselineOpacity={0.4} peakOpacity={0.4} />}
      accessibilityLabel={accessibilityLabel}
      animate={false}
      height={350}
      inset={{
        top: 30,
        left: 16,
        right: 16,
        bottom: 0,
      }}
      onScrubberPositionChange={setScrubIndex}
      overflow="visible"
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
      style={{ outlineColor: assets.btc.color }}
      xAxis={{
        data: allDataPoints.map((d) => d.date.getTime()),
        tickLabelFormatter: (value: number) => {
          return new Date(value).toLocaleDateString('en-US', {
            month: 'numeric',
            year: 'numeric',
          });
        },
        tickInterval: 2,
      }}
    >
      <Scrubber label={scrubberLabel} labelProps={{ elevation: 1 }} />
    </LineChart>
  );
}

const BitcoinChartWithScrubberBeacon = () => {
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
        <RemoteImage aria-hidden shape="circle" size="xxl" source={assets.btc.imageUrl} />
        <VStack flexGrow={1} gap={0.25}>
          <Text aria-hidden font="title1" style={{ color: 'white' }}>
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
        >
          <Scrubber idlePulse styles={{ beacon: { stroke: 'white' } }} />
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

const LiveAssetPrice = () => {
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
      <Scrubber ref={scrubberRef} labelProps={{ elevation: 1 }} />
    </LineChart>
  );
};

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

const AvailabilityChart = () => {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>();

  const accessibilityLabel = useMemo(() => {
    if (scrubIndex === undefined) return;
    const event = availabilityEvents[scrubIndex];
    const formattedDate = event.date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const status =
      event.availability >= 90 ? 'Good' : event.availability >= 85 ? 'Warning' : 'Critical';
    return `${formattedDate}: Availability ${event.availability}% - Status: ${status}`;
  }, [scrubIndex]);

  const ChartDefs = memo(
    ({
      yellowThresholdPercentage = 85,
      greenThresholdPercentage = 90,
    }: {
      yellowThresholdPercentage?: number;
      greenThresholdPercentage?: number;
    }) => {
      const { series, getYScale, getYAxis, drawingArea } = useCartesianChartContext();
      const yScale = getYScale();
      const yAxis = getYAxis();

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
    <CartesianChart
      enableScrubbing
      accessibilityLabel={accessibilityLabel}
      height={300}
      onScrubberPositionChange={setScrubIndex}
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
        domain: ({ min, max }: { min: number; max: number }) => ({
          min: Math.max(min - 2, 0),
          max: Math.min(max + 2, 100),
        }),
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
        position="left"
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
      <Scrubber overlayOffset={10} />
    </CartesianChart>
  );
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

const GainLossChart = () => {
  const gradientId = useId();

  const data = [-40, -28, -21, -5, 48, -5, -28, 2, -29, -46, 16, -30, -29, 8];

  const ChartDefs = ({ threshold = 0 }) => {
    const { getYScale } = useCartesianChartContext();
    // get the default y-axis scale
    const yScale = getYScale();

    if (yScale) {
      const domain = yScale.domain();
      const range = yScale.range();

      const baselinePercentage = ((threshold - domain[0]) / (domain[1] - domain[0])) * 100;

      const negativeColor = 'rgb(var(--gray15))';
      const positiveColor = 'var(--color-fgPositive)';

      return (
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`${gradientId}-solid`}
            x1="0%"
            x2="0%"
            y1={range[0]}
            y2={range[1]}
          >
            <stop offset="0%" stopColor={negativeColor} />
            <stop offset={`${baselinePercentage}%`} stopColor={negativeColor} />
            <stop offset={`${baselinePercentage}%`} stopColor={positiveColor} />
            <stop offset="100%" stopColor={positiveColor} />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`${gradientId}-gradient`}
            x1="0%"
            x2="0%"
            y1={range[0]}
            y2={range[1]}
          >
            <stop offset="0%" stopColor={negativeColor} stopOpacity={0.3} />
            <stop offset={`${baselinePercentage}%`} stopColor={negativeColor} stopOpacity={0} />
            <stop offset={`${baselinePercentage}%`} stopColor={positiveColor} stopOpacity={0} />
            <stop offset="100%" stopColor={positiveColor} stopOpacity={0.3} />
          </linearGradient>
        </defs>
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
    <CartesianChart
      enableScrubbing
      height={250}
      inset={{ top: 12, bottom: 12, left: 0, right: 0 }}
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
    </CartesianChart>
  );
};

const CompactLineChart = () => {
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

  return (
    <VStack>
      <ListCell
        description={assets.btc.symbol}
        detail={formatPrice(parseFloat(prices[0]))}
        intermediary={
          <Box style={{ padding: 1 }}>
            <LineChart
              {...dimensions}
              enableScrubbing={false}
              inset={0}
              overflow="visible"
              series={[
                {
                  id: 'btc',
                  data: sparklineData,
                  color: assets.btc.color,
                },
              ]}
            >
              <ReferenceLine dataY={parseFloat(prices[Math.floor(prices.length / 4)])} />
            </LineChart>
          </Box>
        }
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={() => console.log('clicked')}
        spacingVariant="condensed"
        subdetail="-4.55%"
        title={assets.btc.name}
        variant="negative"
      />
      <ListCell
        description={assets.btc.symbol}
        detail={formatPrice(parseFloat(prices[0]))}
        intermediary={
          <Box style={{ padding: 1 }}>
            <LineChart
              {...dimensions}
              showArea
              enableScrubbing={false}
              inset={0}
              overflow="visible"
              series={[
                {
                  id: 'btc',
                  data: sparklineData,
                  color: assets.btc.color,
                },
              ]}
            >
              <ReferenceLine dataY={parseFloat(prices[Math.floor(prices.length / 4)])} />
            </LineChart>
          </Box>
        }
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={() => console.log('clicked')}
        spacingVariant="condensed"
        subdetail="-4.55%"
        title={assets.btc.name}
        variant="negative"
      />
      <ListCell
        description={assets.btc.symbol}
        detail={formatPrice(parseFloat(prices[0]))}
        intermediary={
          <Box style={{ padding: 1 }}>
            <LineChart
              {...dimensions}
              showArea
              enableScrubbing={false}
              inset={0}
              overflow="visible"
              series={[
                {
                  id: 'btc',
                  data: sparklineData,
                  color: 'var(--color-fgPositive)',
                },
              ]}
            >
              <ReferenceLine dataY={positiveFloor} />
            </LineChart>
          </Box>
        }
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={() => console.log('clicked')}
        spacingVariant="condensed"
        subdetail="+0.25%"
        title={assets.btc.name}
        variant="positive"
      />
      <ListCell
        description={assets.btc.symbol}
        detail={formatPrice(parseFloat(prices[0]))}
        intermediary={
          <Box style={{ padding: 1 }}>
            <LineChart
              {...dimensions}
              showArea
              enableScrubbing={false}
              inset={0}
              overflow="visible"
              series={[
                {
                  id: 'btc',
                  data: negativeData,
                  color: 'var(--color-fgNegative)',
                },
              ]}
            >
              <ReferenceLine dataY={negativeCeiling} />
            </LineChart>
          </Box>
        }
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={() => console.log('clicked')}
        spacingVariant="condensed"
        subdetail="-4.55%"
        title={assets.btc.name}
        variant="negative"
      />
    </VStack>
  );
};

const pageViews = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const uniqueVisitors = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pages = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

const MultipleSeriesChart = () => {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>();

  const accessibilityLabel = useMemo(() => {
    if (scrubIndex === undefined) return;
    return `${pages[scrubIndex]}: Page Views ${pageViews[scrubIndex].toLocaleString()}, Unique Visitors ${uniqueVisitors[scrubIndex].toLocaleString()}`;
  }, [scrubIndex]);

  return (
    <LineChart
      enableScrubbing
      showXAxis
      showYAxis
      accessibilityLabel={accessibilityLabel}
      height={400}
      inset={{ left: 12 }}
      onScrubberPositionChange={setScrubIndex}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          label: 'Page Views',
          color: 'var(--color-accentBoldBlue)',
          curve: 'natural',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          label: 'Unique Visitors',
          color: 'var(--color-accentBoldGreen)',
          curve: 'natural',
        },
      ]}
      xAxis={{
        data: pages,
      }}
      yAxis={{
        domain: {
          min: 0,
        },
        showGrid: true,
        tickLabelFormatter: (value) => value.toLocaleString(),
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

const PointsChart = () => {
  const keyMarketShiftIndices = [4, 6, 7, 9, 10];
  const data = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

  return (
    <CartesianChart
      height={250}
      series={[
        {
          id: 'prices',
          data: data,
        },
      ]}
    >
      <Area curve="monotone" fill="rgb(var(--blue5))" seriesId="prices" />
      <Line
        curve="monotone"
        renderPoints={({ dataX, dataY, ...props }) =>
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
};

const tabs = [
  { id: 'hour', label: '1H' },
  { id: 'day', label: '1D' },
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1Y' },
  { id: 'all', label: 'All' },
];

const AssetPriceDotted = memo(() => {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>();
  const [timePeriod, setTimePeriod] = useState<TabValue>(tabs[0]);
  const sparklineTimePeriodData = useMemo(() => {
    return sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData];
  }, [timePeriod]);

  const sparklineTimePeriodDataValues = useMemo(() => {
    return sparklineTimePeriodData.map((d) => d.value);
  }, [sparklineTimePeriodData]);
  const currentPrice = sparklineTimePeriodDataValues[sparklineTimePeriodDataValues.length - 1];

  const sparklineTimePeriodDataTimestamps = useMemo(() => {
    return sparklineTimePeriodData.map((d) => d.date);
  }, [sparklineTimePeriodData]);

  const onPeriodChange = useCallback(
    (period: TabValue | null) => {
      setTimePeriod(period || tabs[0]);
    },
    [setTimePeriod],
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
    if (scrubIndex === undefined) return;
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

  const accessibilityLabel: string | undefined = useMemo(() => {
    if (scrubIndex === undefined) return;
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
        balance={
          <RollingNumber
            color="fgMuted"
            font="display3"
            format={{ style: 'currency', currency: 'USD' }}
            value={currentPrice}
          />
        }
        end={
          <VStack justifyContent="center">
            <RemoteImage shape="circle" size="xl" source={assets.btc.imageUrl} />
          </VStack>
        }
        title={<Text font="label1">Bitcoin</Text>}
      />
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel={accessibilityLabel}
        areaType="dotted"
        aria-live="polite"
        height={300}
        inset={{ top: 56 }}
        onScrubberPositionChange={setScrubIndex}
        overflow="visible"
        series={[
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
          },
        ]}
        style={{ outlineColor: assets.btc.color }}
      >
        <Scrubber idlePulse label={scrubberLabel} labelProps={{ elevation: 1 }} />
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

const sampleData = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <LineChart
          enableScrubbing
          showArea
          showYAxis
          curve="monotone"
          height={250}
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
          height={250}
          series={[
            {
              id: 'prices',
              data: sampleData,
            },
          ]}
        />
      </Example>
      <Example title="Compact">
        <CompactLineChart />
      </Example>
      <Example title="Gain/Loss">
        <GainLossChart />
      </Example>
      <Example title="Multiple Series">
        <MultipleSeriesChart />
      </Example>
      <Example title="Points">
        <PointsChart />
      </Example>
      <Example title="Empty State">
        <LineChart
          height={300}
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
      <Example title="Line Styles">
        <LineChart
          height={400}
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
              LineComponent: (props) => (
                <GradientLine {...props} endColor="#F7931A" startColor="#E3D74D" strokeWidth={4} />
              ),
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
      <Example title="Live Data">
        <LiveAssetPrice />
      </Example>
      <Example title="Data Format">
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
            position: 'left',
            showLine: true,
            showTickMarks: true,
            showGrid: true,
          }}
        >
          <Scrubber />
        </LineChart>
      </Example>
      <Example title="High Low">
        <PriceChart />
      </Example>
      <Example title="Color Shift">
        <ColorShiftChart />
      </Example>
      <Example title="Asset Price Dotted">
        <AssetPriceDotted />
      </Example>
      <Example title="Forecast">
        <ForecastAssetPrice />
      </Example>
      <Example title="Availability">
        <AvailabilityChart />
      </Example>
      <Example title="BTC Price Chart">
        <BTCPriceChart />
      </Example>
      <Example title="Bitcoin Chart With Scrubber Beacon">
        <BitcoinChartWithScrubberBeacon />
      </Example>
    </VStack>
  );
};
