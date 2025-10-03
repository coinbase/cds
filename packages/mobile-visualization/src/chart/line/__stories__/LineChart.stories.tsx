import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { View } from 'react-native';
import { Defs, LinearGradient, Stop, TSpan } from 'react-native-svg';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { useTheme } from '@coinbase/cds-mobile';
import { Button } from '@coinbase/cds-mobile/buttons';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { RemoteImage } from '@coinbase/cds-mobile/media';
import { SectionHeader } from '@coinbase/cds-mobile/section-header/SectionHeader';
import {
  SegmentedTabs,
  type TabComponent,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { TextLabel1 } from '@coinbase/cds-mobile/typography';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { Area, DottedArea, GradientArea } from '../../area';
import { XAxis, YAxis } from '../../axis';
import { CartesianChart } from '../../CartesianChart';
import { useCartesianChartContext } from '../../ChartProvider';
import { PeriodSelector, PeriodSelectorActiveIndicator } from '../../PeriodSelector';
import { Point } from '../../Point';
import { Scrubber, type ScrubberRef } from '../../scrubber';
import type { ChartTextChildren } from '../../text';
import type { ChartAxisScaleType } from '../../utils/scale';
import { GradientLine, Line, LineChart, ReferenceLine } from '..';

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
      <Point
        dataX={2}
        dataY={60}
        fill="purple"
        label="hello world im on a point!"
        labelProps={{
          verticalAlignment: 'bottom',
          // why does this go in the opposite direction than what i would expect?
          dy: -16,
        }}
        onPress={() => console.log('clicked')}
        radius={6}
        stroke="purple"
        strokeWidth={7}
      />
      <ReferenceLine
        dataX={2}
        label="testing 123"
        labelProps={{
          color: '#10b981',
          inset: 0,
          verticalAlignment: 'middle',
        }}
      />
      <ReferenceLine dataY={60} label="testing 123" labelProps={{ horizontalAlignment: 'left' }} />
      <Point dataX={5} dataY={50} fill="orange" radius={5} />
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
  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number | undefined>(undefined);

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

  const onScrubberPositionChange = useCallback((scrubberPosition: number | undefined) => {
    setHighlightedItemIndex(scrubberPosition);
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
        inset={{ top: 4, bottom: 8, left: 0, right: 0 }}
        onScrubberPositionChange={onScrubberPositionChange}
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
        LineComponent={(props) => (
          <GradientLine {...props} endColor="#F7931A" startColor="#E3D74D" strokeWidth={4} />
        )}
        curve="natural"
        seriesId="lowerMiddle"
      />
      <Line showArea AreaComponent={DottedArea} curve="step" seriesId="bottom" />
    </CartesianChart>
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
          width: 70,
        }}
      />
    </VStack>
  );
};

export const ColorShiftChart = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabValue | null>({ id: '1H', label: '1H' });

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
  const currentPrice = currentData[currentData.length - 1];
  const priceChange = currentPrice - startPrice;

  // Determine colors based on trend
  const trendColor = useMemo(() => {
    return priceChange >= 0 ? theme.color.fgPositive : theme.color.fgNegative;
  }, [priceChange, theme.color.fgPositive, theme.color.fgNegative]);

  const activeBackground = useMemo(() => {
    return priceChange >= 0 ? 'bgPositiveWash' : 'bgNegativeWash';
  }, [priceChange]);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const scrubberLabel = useCallback(
    (index: number) => {
      const timestamp = currentTimestamps[index];
      return formatChartDate(timestamp, activeTab?.id || '1H');
    },
    [activeTab?.id, currentTimestamps],
  );

  // Custom tab component that uses the trend color for both active and inactive states
  const ColorShiftTab: TabComponent = useMemo(
    () =>
      memo(
        forwardRef(({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<any>) => {
          return (
            <SegmentedTab
              ref={ref}
              activeColor={trendColor as any}
              color={trendColor as any}
              font="label1"
              label={label}
              {...props}
            />
          );
        }),
      ),
    [trendColor],
  );

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

  return (
    <Box style={{ marginLeft: -16, marginRight: -16 }}>
      <VStack gap={3} width="100%">
        <LineChart
          enableScrubbing
          showArea
          showXAxis
          height={defaultChartHeight}
          inset={{ left: 0, right: 24, bottom: 0 }}
          series={[
            {
              id: 'price',
              data: currentData,
              color: trendColor,
            },
          ]}
        >
          <Scrubber idlePulse label={scrubberLabel} />
          <ReferenceLine
            dataY={startPrice}
            label={formatPrice(startPrice)}
            labelProps={{
              horizontalAlignment: 'right',
              inset: 4,
              borderRadius: 4,
              dx: -8,
              color: theme.color.fgInverse,
              background: priceChange >= 0 ? theme.color.bgPositive : theme.color.bgNegative,
            }}
            stroke={priceChange >= 0 ? theme.color.bgPositive : theme.color.bgNegative}
          />
        </LineChart>
        <PeriodSelector
          TabComponent={ColorShiftTab}
          activeBackground={activeBackground}
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={tabs}
        />
      </VStack>
    </Box>
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

  const onScrubberPositionChange = useCallback((item: number | undefined) => {
    setIsHovering(item !== undefined);
  }, []);

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

  const scrubberLabel = useCallback(
    (item: number | undefined) => {
      if (item === undefined) return null;
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

  return (
    <VStack gap={3} width="100%">
      {/*<HStack alignItems="flex-start" gap={3} justifyContent="space-between" inset={32}>
        <CartesianChartHeader
          description={formattedPrice}
          title={<Text font="headline">Ethereum</Text>}
          trend={formattedPriceChange}
          trendDirection={trendDirection as 'up' | 'down' | 'neutral'}
        />
      </HStack>*/}
      <LineChart
        showArea
        height={defaultChartHeight}
        inset={{ left: 0, right: 3, bottom: 3, top: 3 }}
        onScrubberPositionChange={onScrubberPositionChange}
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
                  labelProps: {
                    position: 'top',
                    dy: -16,
                  },
                };
              }

              if (lowestPriceIndices.includes(index)) {
                return {
                  opacity: 0,
                  label: formatPrice(currentData[index]),
                  labelProps: {
                    position: 'bottom',
                    dy: 16,
                  },
                };
              }
            },
          },
        ]}
        yAxis={{ domainLimit: 'strict' }}
      >
        <Scrubber />
      </LineChart>
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
      inset={{
        top: 4,
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
        tickInterval: 32,
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

const BTCTab: TabComponent = memo(
  forwardRef(({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<View>) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab?.id === props.id;

    return (
      <SegmentedTab
        ref={ref}
        label={
          <TextLabel1
            style={{
              color: isActive ? assets.btc.color : undefined,
            }}
          >
            {label}
          </TextLabel1>
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

const AssetPriceDotted = () => {
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

  const scrubberLabel = useCallback(
    (dataIndex: number) => {
      const price = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(sparklineTimePeriodDataValues[dataIndex]);
      const date = formatDate(sparklineTimePeriodDataTimestamps[dataIndex]);
      return `${price} USD ${date}`;
    },
    [sparklineTimePeriodDataValues, formatDate, sparklineTimePeriodDataTimestamps],
  );

  // Chart overview accessibility label
  const chartOverviewLabel = useMemo(() => {
    if (sparklineTimePeriodData.length === 0) return '';

    const firstDate = sparklineTimePeriodData[0].date;
    const lastDate = sparklineTimePeriodData[sparklineTimePeriodData.length - 1].date;
    const currentYear = new Date().getFullYear();
    const shouldIncludeTime = timePeriod.id === 'hour' || timePeriod.id === 'day';

    const dateRangeOptions: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: firstDate.getFullYear() !== currentYear ? 'numeric' : undefined,
      ...(shouldIncludeTime && {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    const startDateStr = shouldIncludeTime
      ? firstDate.toLocaleString('en-US', dateRangeOptions)
      : firstDate.toLocaleDateString('en-US', dateRangeOptions);
    const endDateStr = shouldIncludeTime
      ? lastDate.toLocaleString('en-US', {
          ...dateRangeOptions,
          year: lastDate.getFullYear() !== currentYear ? 'numeric' : undefined,
        })
      : lastDate.toLocaleDateString('en-US', {
          ...dateRangeOptions,
          year: lastDate.getFullYear() !== currentYear ? 'numeric' : undefined,
        });

    return `Price chart for Bitcoin, ${startDateStr} to ${endDateStr}. Swipe left or right to navigate data points.`;
  }, [sparklineTimePeriodData, timePeriod.id]);

  return (
    <Box accessibilityLabel={chartOverviewLabel} accessibilityLiveRegion="polite">
      <VStack gap={2}>
        <SectionHeader
          aria-hidden="true"
          balance={
            <Text font="title2">
              {formatPrice(currentPrice)} {sparklineTimePeriodDataValues.length}
            </Text>
          }
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
          accessibilityLiveRegion="polite"
          areaType="dotted"
          height={defaultChartHeight}
          series={[
            {
              id: 'btc',
              data: sparklineTimePeriodDataValues,
              color: assets.btc.color,
            },
          ]}
        >
          <Scrubber idlePulse label={scrubberLabel} />
        </LineChart>
        <PeriodSelector
          TabComponent={BTCTab}
          TabsActiveIndicatorComponent={BTCActiveIndicator}
          accessibilityLabel="Select time period for chart"
          activeTab={timePeriod}
          onChange={onPeriodChange}
          tabs={tabs}
        />
      </VStack>
    </Box>
  );
};

const AssetPriceDottedNonMemoized = () => {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>(undefined);
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
    if (scrubIndex === undefined) return null;
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
          <Text font="title2">
            {formatPrice(currentPrice)} {sparklineTimePeriodDataValues.length}
          </Text>
        }
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
        onScrubberPositionChange={setScrubIndex}
        series={[
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
          },
        ]}
      >
        <Scrubber label={scrubberLabel} />
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

const AssetPriceMultipleDotted = () => {
  const [scrubIndex, setScrubIndex] = useState<number | undefined>(undefined);
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
    if (scrubIndex === undefined) return null;
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
          <Text font="title2">
            {formatPrice(currentPrice)} {sparklineTimePeriodDataValues.length}
          </Text>
        }
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
        height={defaultChartHeight}
        series={[
          {
            id: 'btc',
            data: sparklineTimePeriodDataValues,
            color: assets.btc.color,
          },
          {
            id: 'eth',
            data: sparklineTimePeriodDataValues.map((d) => d * 0.75),
            color: assets.eth.color,
          },
          {
            id: 'xrp',
            data: sparklineTimePeriodDataValues.map((d) => d * 0.5),
            color: assets.xrp.color,
          },
        ]}
      >
        <Scrubber />
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

const GainLossChart = () => {
  const theme = useTheme();
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

      const negativeColor = `rgb(${theme.spectrum.gray20})`;
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
    <CartesianChart
      enableScrubbing
      height={defaultChartHeight}
      inset={{ top: 1.5, bottom: 1.5, left: 0, right: 0 }}
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

const BitcoinChartWithScrubberBeacon = () => {
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
          inset={{ left: 0, right: 3, bottom: 0, top: 2 }}
          series={[
            {
              id: 'btcPrice',
              data: prices,
              color: assets.btc.color,
            },
          ]}
          width="100%"
        >
          <Scrubber />
        </LineChart>
      </VStack>
    </Box>
  );
};

const ScrubberWithImperativeHandle = () => {
  const theme = useTheme();
  const scrubberRef = useRef<ScrubberRef>(null);

  return (
    <VStack gap={2}>
      <LineChart
        enableScrubbing
        showYAxis
        height={defaultChartHeight}
        series={[
          {
            id: 'priceA',
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            label: 'Page Views',
            color: theme.color.accentBoldBlue,
            curve: 'natural',
          },
          {
            id: 'priceB',
            data: [2000, 2491, 4501, 6049, 5019, 4930, 5910],
            label: 'Unique Visitors G',
            color: theme.color.accentBoldGreen,
            curve: 'natural',
          },
          {
            id: 'priceC',
            data: [1000, 4910, 2300, 5910, 3940, 2940, 1940],
            label: 'Unique Visitors P',
            color: theme.color.accentBoldPurple,
            curve: 'natural',
          },
        ]}
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
      <Button onPress={() => scrubberRef.current?.pulse()}>Pulse Beacons</Button>
    </VStack>
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
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
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

  const onScrubberPositionChange = useCallback((item?: number) => {
    setHighlightedItem(item);
  }, []);

  const displayPrice =
    highlightedItem !== null && highlightedItem !== undefined
      ? currentData[highlightedItem]
      : currentPrice;

  const btcAccentColor = '#F0A73C';

  const { displayDate } = useMemo(() => {
    return calculateTrendData(
      highlightedItem,
      currentData,
      currentTimestamps,
      startPrice,
      currentPrice,
      activeTab?.id || 'hour',
    );
  }, [highlightedItem, currentData, currentTimestamps, startPrice, currentPrice, activeTab]);

  const formattedPrice = `$${displayPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const AreaComponent = useMemo(
    () => (props: any) => <GradientArea {...props} peakOpacity={0.15} />,
    [],
  );

  return (
    <Box
      borderRadius={300}
      overflow="hidden"
      style={{ backgroundColor: btcAccentColor }}
      width="100%"
    >
      <VStack gap={3} width="100%">
        <HStack alignItems="flex-start" gap={3} justifyContent="space-between" padding={4}>
          <VStack flexGrow={1} gap={1}>
            <Text font="title1">Coinbase Wrapped BTC</Text>
            <Text font="title2">{formattedPrice}</Text>
          </VStack>
          <VStack justifyContent="center">
            <RemoteImage shape="circle" size="xxl" source={assets.btc.imageUrl} />
          </VStack>
        </HStack>
        <CartesianChart
          enableScrubbing
          height={200}
          inset={{ bottom: 0, right: 3, left: 0, top: 6 }}
          onScrubberPositionChange={onScrubberPositionChange}
          series={[
            {
              id: 'price',
              data: currentData,
              color: 'black',
            },
          ]}
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
          />
        </CartesianChart>
        <Box padding={2}>
          <PeriodSelector activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} tabs={tabs} />
        </Box>
      </VStack>
    </Box>
  );
};

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
      height={defaultChartHeight}
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

// Generate prediction probability data for three candidates
const generatePredictionData = () => {
  const now = new Date();
  const baseTimestamp = now.getTime();

  // Generate data for different time periods
  const generateForPeriod = (points: number, intervalMs: number) => {
    return Array.from({ length: points }, (_, i) => {
      const timestamp = new Date(baseTimestamp - (points - 1 - i) * intervalMs);

      // Generate percentage values for three candidates that roughly sum to 100%
      const candidate1 = 45 + Math.random() * 30; // 45-75%
      const candidate2 = 15 + Math.random() * 20; // 15-35%
      const candidate3 = Math.max(0, 100 - candidate1 - candidate2 - Math.random() * 5); // remainder

      return {
        date: timestamp,
        candidate1: Math.round(candidate1 * 10) / 10,
        candidate2: Math.round(candidate2 * 10) / 10,
        candidate3: Math.round(candidate3 * 10) / 10,
      };
    });
  };

  return {
    hour: generateForPeriod(60, 60 * 1000), // 60 points, 1 min apart
    day: generateForPeriod(96, 15 * 60 * 1000), // 96 points, 15 min apart
    week: generateForPeriod(84, 2 * 60 * 60 * 1000), // 84 points, 2 hours apart
    month: generateForPeriod(120, 6 * 60 * 60 * 1000), // 120 points, 6 hours apart
    year: generateForPeriod(365, 24 * 60 * 60 * 1000), // 365 points, 1 day apart
    all: generateForPeriod(100, 7 * 24 * 60 * 60 * 1000), // 100 points, 1 week apart
  };
};

const predictionData = generatePredictionData();

type PredictionLegendData = {
  candidate1: number[];
  candidate2: number[];
  candidate3: number[];
};

type PredictionLegendRef = {
  updateSelectedIndex: (index: number) => void;
};

type PredictionLegendProps = {
  data: PredictionLegendData;
  colors: { pink: string; teal: string; green: string };
};

const PredictionLegend = memo(
  forwardRef<PredictionLegendRef, PredictionLegendProps>(({ data, colors }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(data.candidate1.length - 1);

    useImperativeHandle(ref, () => ({
      updateSelectedIndex: (index: number) => {
        setSelectedIndex(index);
      },
    }));

    const candidate1Value = Math.round(data.candidate1[selectedIndex]);
    const candidate2Value = Math.round(data.candidate2[selectedIndex]);
    const candidate3Value = Math.round(data.candidate3[selectedIndex]);

    return (
      <VStack gap={2}>
        <HStack alignItems="center" gap={2}>
          <Box style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.pink }} />
          <Text font="label2">Noah Wyle</Text>
          <Text font="label1">{candidate1Value}%</Text>
        </HStack>
        <HStack alignItems="center" gap={2}>
          <Box style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.teal }} />
          <Text font="label2">Adam Scott</Text>
          <Text font="label1">{candidate2Value}%</Text>
        </HStack>
        <HStack alignItems="center" gap={2}>
          <Box
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.green,
            }}
          />
          <Text font="label2">Pedro Pascal</Text>
          <Text font="label1">{candidate3Value}%</Text>
        </HStack>
      </VStack>
    );
  }),
);

const PredictionChart = () => {
  const theme = useTheme();

  // Ref for the legend component
  const legendRef = useRef<PredictionLegendRef>(null);

  // Define colors using spectrum
  const colors = useMemo(
    () => ({
      pink: `rgb(${theme.spectrum.pink50})`,
      teal: `rgb(${theme.spectrum.teal50})`,
      green: `rgb(${theme.spectrum.green50})`,
    }),
    [theme.spectrum],
  );

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

  const periodData = useMemo(() => {
    return predictionData[timePeriod.id as keyof typeof predictionData];
  }, [timePeriod]);

  const candidate1Data = useMemo(() => periodData.map((d) => d.candidate1), [periodData]);
  const candidate2Data = useMemo(() => periodData.map((d) => d.candidate2), [periodData]);
  const candidate3Data = useMemo(() => periodData.map((d) => d.candidate3), [periodData]);
  const timestamps = useMemo(() => periodData.map((d) => d.date), [periodData]);

  // Data object for the legend
  const legendData = useMemo(
    () => ({
      candidate1: candidate1Data,
      candidate2: candidate2Data,
      candidate3: candidate3Data,
    }),
    [candidate1Data, candidate2Data, candidate3Data],
  );

  // Update legend via imperative ref when scrubber position changes
  const onScrubberPositionChange = useCallback(
    (dataIndex: number | undefined) => {
      const idx = dataIndex ?? candidate1Data.length - 1;
      legendRef.current?.updateSelectedIndex(idx);
    },
    [candidate1Data.length],
  );

  // Update legend when data length changes
  useEffect(() => {
    legendRef.current?.updateSelectedIndex(candidate1Data.length - 1);
  }, [candidate1Data.length]);

  const onPeriodChange = useCallback(
    (period: TabValue | null) => {
      setTimePeriod(period || tabs[0]);
    },
    [tabs],
  );

  const scrubberLabel = useCallback(
    (dataIndex: number) => {
      const date = timestamps[dataIndex];
      const currentYear = new Date().getFullYear();
      const shouldIncludeTime = timePeriod.id === 'hour' || timePeriod.id === 'day';

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== currentYear ? 'numeric' : undefined,
        ...(shouldIncludeTime && {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };

      const dateStr = shouldIncludeTime
        ? date.toLocaleString('en-US', dateOptions)
        : date.toLocaleDateString('en-US', dateOptions);

      return dateStr;
    },
    [timestamps, timePeriod.id],
  );

  const chartOverviewLabel = useMemo(() => {
    if (periodData.length === 0) return '';

    const firstDate = periodData[0].date;
    const lastDate = periodData[periodData.length - 1].date;
    const currentYear = new Date().getFullYear();
    const shouldIncludeTime = timePeriod.id === 'hour' || timePeriod.id === 'day';

    const dateRangeOptions: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: firstDate.getFullYear() !== currentYear ? 'numeric' : undefined,
      ...(shouldIncludeTime && {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    const startDateStr = shouldIncludeTime
      ? firstDate.toLocaleString('en-US', dateRangeOptions)
      : firstDate.toLocaleDateString('en-US', dateRangeOptions);
    const endDateStr = shouldIncludeTime
      ? lastDate.toLocaleString('en-US', {
          ...dateRangeOptions,
          year: lastDate.getFullYear() !== currentYear ? 'numeric' : undefined,
        })
      : lastDate.toLocaleDateString('en-US', {
          ...dateRangeOptions,
          year: lastDate.getFullYear() !== currentYear ? 'numeric' : undefined,
        });

    return `Prediction chart, ${startDateStr} to ${endDateStr}. Swipe left or right to navigate data points.`;
  }, [periodData, timePeriod.id]);

  return (
    <Box accessibilityLabel={chartOverviewLabel} accessibilityLiveRegion="polite">
      <VStack gap={4}>
        {/* Legend */}
        <PredictionLegend ref={legendRef} colors={colors} data={legendData} />

        <Box style={{ marginLeft: -16, marginRight: -16 }}>
          <LineChart
            enableScrubbing
            showYAxis
            accessibilityLiveRegion="polite"
            height={defaultChartHeight}
            inset={{ left: 0 }}
            onScrubberPositionChange={onScrubberPositionChange}
            series={[
              {
                id: 'candidate1',
                data: candidate1Data,
                color: colors.pink,
              },
              {
                id: 'candidate2',
                data: candidate2Data,
                color: colors.teal,
              },
              {
                id: 'candidate3',
                data: candidate3Data,
                color: colors.green,
              },
            ]}
            xAxis={{
              range: ({ min, max }) => ({ min, max: max - 32 }),
            }}
            yAxis={{
              domain: { min: 0, max: 100 },
              tickLabelFormatter: (value) => `${value}%`,
              requestedTickCount: 5,
              showGrid: true,
            }}
          >
            <Scrubber idlePulse label={scrubberLabel} />
          </LineChart>
        </Box>

        {/* Period Selector */}
        <PeriodSelector
          accessibilityLabel="Select time period for prediction chart"
          activeTab={timePeriod}
          onChange={onPeriodChange}
          tabs={tabs}
        />
      </VStack>
    </Box>
  );
};

const AvailabilityChart = () => {
  const theme = useTheme();
  const [scrubIndex, setScrubIndex] = useState<number | undefined>();

  const ChartDefs = memo(
    ({
      yellowThresholdPercentage = 85,
      greenThresholdPercentage = 90,
    }: {
      yellowThresholdPercentage?: number;
      greenThresholdPercentage?: number;
    }) => {
      const { getYScale, getYAxis } = useCartesianChartContext();
      const yScale = getYScale();
      const yAxis = getYAxis();

      if (!yScale) return null;

      const rangeBounds = yAxis?.domain;
      const rangeMin = rangeBounds?.min ?? 0;
      const rangeMax = rangeBounds?.max ?? 100;

      // Calculate the Y positions in the chart coordinate system
      const yellowThresholdY = yScale(yellowThresholdPercentage) ?? 0;
      const greenThresholdY = yScale(greenThresholdPercentage) ?? 0;
      const minY = yScale(rangeMax) ?? 0; // Top of chart (max value)
      const maxY = yScale(rangeMin) ?? 0; // Bottom of chart (min value)

      // Calculate percentages based on actual chart positions
      const yellowThreshold = ((yellowThresholdY - minY) / (maxY - minY)) * 100;
      const greenThreshold = ((greenThresholdY - minY) / (maxY - minY)) * 100;

      return (
        <Defs>
          <LinearGradient
            gradientUnits="userSpaceOnUse"
            id="availabilityGradient"
            x1="0%"
            x2="0%"
            y1={minY}
            y2={maxY}
          >
            <Stop offset="0%" stopColor={theme.color.fgPositive} />
            <Stop offset={`${greenThreshold}%`} stopColor={theme.color.fgPositive} />
            <Stop offset={`${greenThreshold}%`} stopColor={theme.color.fgWarning} />
            <Stop offset={`${yellowThreshold}%`} stopColor={theme.color.fgWarning} />
            <Stop offset={`${yellowThreshold}%`} stopColor={theme.color.fgNegative} />
            <Stop offset="100%" stopColor={theme.color.fgNegative} />
          </LinearGradient>
        </Defs>
      );
    },
  );

  return (
    <CartesianChart
      enableScrubbing
      height={defaultChartHeight}
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
          fill: theme.color.bg,
          stroke: 'url(#availabilityGradient)',
          strokeWidth: 2,
        })}
        seriesId="availability"
      />
      <Scrubber overlayOffset={10} />
    </CartesianChart>
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
      <Example title="BTC Price Chart">
        <BTCPriceChart />
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
            scaleType: 'band',
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
      </Example>
      <Example title="Points">
        <CartesianChart
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
        </CartesianChart>
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
            position: 'left',
            showLine: true,
            showTickMarks: true,
            showGrid: true,
          }}
        >
          <Scrubber />
        </LineChart>
      </Example>
      <Example title="Bitcoin Chart with Scrubber Beacon">
        <BitcoinChartWithScrubberBeacon />
      </Example>
      <Example title="Scrubber with Imperative Handle">
        <ScrubberWithImperativeHandle />
      </Example>
      <Example title="Asset Price">
        <AssetPrice />
      </Example>
      <Example title="Line Styles">
        <LineStyles />
      </Example>
      <Example title="Chart Scale">
        <ChartScale />
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
      </Example>
      <Example title="Live Asset Price">
        <LiveAssetPrice />
      </Example>
      <Example title="Availability Chart">
        <AvailabilityChart />
      </Example>
    </ExampleScreen>
  );
};

const AssetPriceScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Scrubber with Imperative Handle">
        <ScrubberWithImperativeHandle />
      </Example>
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
      <Example title="Data Formats">
        <LineChart
          enableScrubbing
          showArea
          showXAxis
          showYAxis
          curve="natural"
          height={defaultChartHeight}
          series={[
            {
              id: 'line',
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          xAxis={{ data: [1, 2, 3, 5, 8, 10], showLine: true, showTickMarks: true, showGrid: true }}
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
      <Example title="Color Shift Chart">
        <ColorShiftChart />
      </Example>
      <Example title="Asset Price Dotted">
        <AssetPriceDotted />
      </Example>
      <Example title="Asset Price Multiple Dotted">
        <AssetPriceMultipleDotted />
      </Example>
      <Example title="Asset Price Dotted (Old)">
        <AssetPriceDottedNonMemoized />
      </Example>
      <Example title="BTC Price Chart">
        <BTCPriceChart />
      </Example>
      <Example title="Gain/Loss">
        <GainLossChart />
      </Example>
      <Example title="Live Asset Price">
        <LiveAssetPrice />
      </Example>
      <Example title="Prediction Chart">
        <PredictionChart />
      </Example>
      <Example title="Availability Chart">
        <AvailabilityChart />
      </Example>
    </ExampleScreen>
  );
};

export default AssetPriceScreen;
