import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { useTheme } from '@coinbase/cds-mobile';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { RemoteImage } from '@coinbase/cds-mobile/media';
import { SectionHeader } from '@coinbase/cds-mobile/section-header/SectionHeader';
import { type TabComponent, type TabsActiveIndicatorProps } from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { Text } from '@coinbase/cds-mobile/typography';
import { FontWeight, Skia, type SkTextStyle, TextAlign } from '@shopify/react-native-skia';

import { XAxis, YAxis } from '../axis';
import { BarChart } from '../bar/BarChart';
import { BarPlot } from '../bar/BarPlot';
import { CartesianChart } from '../CartesianChart';
import { Legend } from '../legend';
import { Line, ReferenceLine, SolidLine, type SolidLineProps } from '../line';
import { LineChart } from '../line/LineChart';
import { PeriodSelector, PeriodSelectorActiveIndicator } from '../PeriodSelector';
import { Scrubber } from '../scrubber';

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const BasicLineChart = memo(function BasicLineChart() {
  const theme = useTheme();
  const data = useMemo(() => [2, 4, 3, 6, 5, 8, 7], []);
  const categories = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${categories[index]}: ${data[index]}`,
    [categories, data],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={`Line chart with ${data.length} days of data. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={180}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      series={[{ id: 'line', data, color: theme.color.accentBoldBlue }]}
      xAxis={{ data: categories, showGrid: true }}
      yAxis={{ domain: { min: 0 }, showGrid: true }}
    >
      <Scrubber hideOverlay />
    </LineChart>
  );
});

const DataFormatLineChart = memo(function DataFormatLineChart() {
  const theme = useTheme();
  const yData = useMemo(() => [2, 5.5, 2, 8.5, 1.5, 5], []);
  const xData = useMemo(() => [1, 2, 3, 5, 8, 10], []);

  const chartAccessibilityLabel = `Chart with uneven X values ${xData.join(', ')}. ${yData.length} data points.`;

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `Point ${index + 1}: X value ${xData[index]}, Y value ${yData[index]}`,
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
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={180}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      series={[{ id: 'line', data: yData, color: theme.color.accentBoldGreen }]}
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
});

const AccessibilityBarChart = memo(function AccessibilityBarChart() {
  const theme = useTheme();
  const categories = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);
  const values = useMemo(() => [40, 65, 55, 80, 72, 90], []);

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${categories[index]}: ${values[index]}`,
    [categories, values],
  );

  return (
    <BarChart
      enableScrubbing
      showXAxis
      showYAxis
      accessibilityLabel={`Bar chart with ${values.length} months. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={180}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      series={[{ id: 'bars', data: values, color: theme.color.accentBoldPurple }]}
      xAxis={{ data: categories, showGrid: true }}
      yAxis={{ domain: { min: 0 }, showGrid: true }}
    />
  );
});

const AccessibilityHorizontalBarChart = memo(function AccessibilityHorizontalBarChart() {
  const theme = useTheme();
  const dataset = useMemo(
    () => [
      { month: 'Jan', rainfall: 21 },
      { month: 'Feb', rainfall: 28 },
      { month: 'Mar', rainfall: 41 },
      { month: 'Apr', rainfall: 73 },
      { month: 'May', rainfall: 99 },
      { month: 'June', rainfall: 144 },
      { month: 'July', rainfall: 319 },
      { month: 'Aug', rainfall: 249 },
      { month: 'Sept', rainfall: 131 },
      { month: 'Oct', rainfall: 55 },
      { month: 'Nov', rainfall: 48 },
      { month: 'Dec', rainfall: 25 },
    ],
    [],
  );

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${dataset[index].month}: ${dataset[index].rainfall}mm rainfall`,
    [dataset],
  );

  return (
    <BarChart
      enableScrubbing
      showXAxis
      showYAxis
      accessibilityLabel={`Horizontal bar chart showing Seoul rainfall by month. ${dataset.length} months. Swipe to navigate.`}
      borderRadius={2}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={400}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      layout="horizontal"
      series={[
        {
          id: 'seoul',
          label: 'Seoul rainfall',
          data: dataset.map((d) => d.rainfall),
          color: theme.color.accentBoldBlue,
        },
      ]}
      xAxis={{
        label: 'rainfall (mm)',
        GridLineComponent: (props) => <SolidLine {...props} strokeWidth={1} />,
        showGrid: true,
        showLine: true,
        showTickMarks: true,
      }}
      yAxis={{
        position: 'left',
        data: dataset.map((d) => d.month),
        showLine: true,
        showTickMarks: true,
        bandTickMarkPlacement: 'edges',
      }}
    ></BarChart>
  );
});

const ServiceAvailability = memo(function ServiceAvailability() {
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

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `Point ${index + 1}: ${availabilityEvents[index].availability}% availability on ${availabilityEvents[index].date.toLocaleDateString()}`,
    [availabilityEvents],
  );

  return (
    <CartesianChart
      enableScrubbing
      accessibilityLabel={`Service availability chart with ${availabilityEvents.length} data points. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={200}
      scrubberAccessibilityLabelStep={1}
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
});

const BasicPricesWithManyPoints = memo(function BasicPricesWithManyPoints() {
  const theme = useTheme();
  const data = useMemo(
    () => [
      10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58, 10, 22, 29, 45, 98, 45, 22, 52, 21, 4,
      68, 20, 21, 58,
    ],
    [],
  );

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `Point ${index + 1}: ${data[index]}`,
    [data],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={`Line chart with ${data.length} data points. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={200}
      scrubberAccessibilityLabelStep={1}
      series={[{ id: 'prices', data, color: theme.color.accentBoldBlue }]}
    >
      <Scrubber hideOverlay />
    </LineChart>
  );
});

const PositiveAndNegativeCashFlow = memo(function PositiveAndNegativeCashFlow() {
  const theme = useTheme();
  const categories = useMemo(() => Array.from({ length: 31 }, (_, i) => `3/${i + 1}`), []);
  const gains = useMemo(
    () => [
      5, 0, 6, 18, 0, 5, 12, 0, 12, 22, 28, 18, 0, 12, 6, 0, 0, 24, 0, 0, 4, 0, 18, 0, 0, 14, 10,
      16, 0, 0, 0,
    ],
    [],
  );
  const losses = useMemo(
    () => [
      -4, 0, -8, -12, -6, 0, 0, 0, -18, 0, -12, 0, -9, -6, 0, 0, 0, 0, -22, -8, 0, 0, -10, -14, 0,
      0, 0, 0, 0, -12, -10,
    ],
    [],
  );
  const series = useMemo(
    () => [
      { id: 'gains', data: gains, color: theme.color.fgPositive, stackId: 'bars' },
      { id: 'losses', data: losses, color: theme.color.fgNegative, stackId: 'bars' },
    ],
    [gains, losses, theme.color.fgNegative, theme.color.fgPositive],
  );

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => {
      const net = gains[index] + losses[index];
      const netStr = net >= 0 ? `+$${net}M` : `-$${Math.abs(net)}M`;
      return `${categories[index]}: ${netStr}`;
    },
    [categories, gains, losses],
  );

  return (
    <CartesianChart
      enableScrubbing
      accessibilityLabel={`Cash flow chart: ${categories.length} days with gains and losses. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={280}
      inset={32}
      series={series}
      xAxis={{ data: categories, scaleType: 'band' }}
    >
      <XAxis />
      <YAxis
        showGrid
        GridLineComponent={ThinSolidLine}
        tickLabelFormatter={(value) => `$${value}M`}
      />
      <BarPlot />
      <ReferenceLine LineComponent={SolidLine} dataY={0} />
    </CartesianChart>
  );
});

const LegendPosition = memo(function LegendPosition() {
  const theme = useTheme();
  const categories = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);
  const revenueData = useMemo(() => [455, 520, 380, 455, 285, 235], []);
  const profitMarginData = useMemo(() => [23, 20, 16, 38, 12, 9], []);

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `${categories[index]}: Revenue $${revenueData[index]}k, Profit Margin ${profitMarginData[index]}%`,
    [categories, profitMarginData, revenueData],
  );

  return (
    <CartesianChart
      enableScrubbing
      accessibilityLabel="Bar chart showing Revenue and Profit Margin by month. January through June. Swipe to navigate."
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={200}
      inset={{ bottom: 8, left: 0, right: 0, top: 8 }}
      legend={
        <Legend
          accessibilityLabel="Chart legend: Revenue and Profit Margin"
          justifyContent="flex-end"
        />
      }
      legendPosition="bottom"
      series={[
        {
          id: 'revenue',
          label: 'Revenue',
          data: revenueData,
          yAxisId: 'revenue',
          color: `rgb(${theme.spectrum.yellow40})`,
          legendShape: 'squircle',
        },
        {
          id: 'profitMargin',
          label: 'Profit Margin',
          data: profitMarginData,
          yAxisId: 'profitMargin',
          color: theme.color.fgPositive,
          legendShape: 'squircle',
        },
      ]}
      xAxis={{
        data: categories,
        scaleType: 'band',
        range: ({ min, max }) => ({ min, max: max - 128 }),
      }}
      yAxis={[
        {
          id: 'revenue',
          domain: { min: 0 },
        },
        {
          id: 'profitMargin',
          domain: { max: 100, min: 0 },
        },
      ]}
    >
      <XAxis showLine showTickMarks />
      <YAxis
        showGrid
        showLine
        showTickMarks
        axisId="revenue"
        position="left"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `$${value}k`}
        width={60}
      />
      <YAxis
        showLine
        showTickMarks
        axisId="profitMargin"
        position="right"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `${value}%`}
      />
      <BarPlot />
    </CartesianChart>
  );
});

const AssetPriceWithDottedArea = memo(function AssetPriceWithDottedArea() {
  const theme = useTheme();
  const fontMgr = useMemo(() => Skia.TypefaceFontProvider.Make(), []);

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

  const sparklineTimePeriodData = useMemo(
    () => sparklineInteractiveData[timePeriod.id as keyof typeof sparklineInteractiveData],
    [timePeriod],
  );
  const sparklineTimePeriodDataValues = useMemo(
    () => sparklineTimePeriodData.map((d) => d.value),
    [sparklineTimePeriodData],
  );
  const sparklineTimePeriodDataTimestamps = useMemo(
    () => sparklineTimePeriodData.map((d) => d.date),
    [sparklineTimePeriodData],
  );

  const currentPrice = sparklineTimePeriodDataValues[sparklineTimePeriodDataValues.length - 1];

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    [],
  );
  const formatPrice = useCallback(
    (price: number) => priceFormatter.format(price),
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

  const chartAccessibilityLabel = useMemo(
    () =>
      `Bitcoin price chart for ${timePeriod.label} period. Current price: ${formatPrice(currentPrice)}.`,
    [currentPrice, formatPrice, timePeriod.label],
  );
  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => {
      const price = formatPrice(sparklineTimePeriodDataValues[index]);
      const date = formatDate(sparklineTimePeriodDataTimestamps[index]);
      return `${price} ${date}`;
    },
    [formatDate, formatPrice, sparklineTimePeriodDataTimestamps, sparklineTimePeriodDataValues],
  );

  const BTCTab: TabComponent = memo(
    forwardRef(({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<View>) => {
      const { activeTab } = useTabsContext();
      const isActive = activeTab?.id === props.id;
      return (
        <SegmentedTab
          ref={ref}
          label={
            <Text font="label1" style={{ color: isActive ? assets.btc.color : undefined }}>
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

  const onPeriodChange = useCallback(
    (period: TabValue | null) => setTimePeriod(period || tabs[0]),
    [tabs],
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
        title={<Text font="title1">Bitcoin</Text>}
      />
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel={chartAccessibilityLabel}
        areaType="dotted"
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
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
          hideOverlay
          idlePulse
          labelElevated
          label={(d: number) => {
            const date = formatDate(sparklineTimePeriodDataTimestamps[d]);
            const price = formatPrice(sparklineTimePeriodDataValues[d]);
            const regularStyle: SkTextStyle = {
              fontFamilies: ['Inter'],
              fontSize: 14,
              fontStyle: { weight: FontWeight.Normal },
              color: Skia.Color(theme.color.fgMuted),
            };
            const boldStyle: SkTextStyle = {
              ...regularStyle,
              fontStyle: { weight: FontWeight.Bold },
            };
            const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Left }, fontMgr);
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

function ExampleNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo(
    () => [
      { title: 'Basic Line Chart', component: <BasicLineChart /> },
      { title: 'Data Format (Uneven X)', component: <DataFormatLineChart /> },
      { title: 'Bar Chart', component: <AccessibilityBarChart /> },
      {
        title: 'Horizontal Bar Chart',
        component: <AccessibilityHorizontalBarChart />,
      },
      { title: 'Service Availability', component: <ServiceAvailability /> },
      {
        title: 'Basic Prices (28 pts, step 1)',
        component: <BasicPricesWithManyPoints />,
      },
      { title: 'Positive/Negative Cash Flow', component: <PositiveAndNegativeCashFlow /> },
      { title: 'Legend Position', component: <LegendPosition /> },
      { title: 'Bitcoin Price (Dotted Area)', component: <AssetPriceWithDottedArea /> },
    ],
    [],
  );

  const currentExample = examples[currentIndex];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  }, [examples.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 + examples.length) % examples.length);
  }, [examples.length]);

  return (
    <ExampleScreen paddingX={0}>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" padding={2}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center">
            <Text font="title3">{currentExample.title}</Text>
            <Text color="fgMuted" font="label1">
              {currentIndex + 1} / {examples.length}
            </Text>
          </VStack>
          <IconButton
            accessibilityHint="Navigate to next example"
            accessibilityLabel="Next"
            name="arrowRight"
            onPress={handleNext}
            variant="secondary"
          />
        </HStack>
        <VStack gap={2} padding={2}>
          <Text color="fgMuted" font="label2">
            Swipe to navigate chart segments.
          </Text>
          <Box padding={1}>{currentExample.component}</Box>
        </VStack>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
