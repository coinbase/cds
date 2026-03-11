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
import { CartesianChart } from '../CartesianChart';
import { BarChart } from '../bar/BarChart';
import { BarPlot } from '../bar/BarPlot';
import { LineChart } from '../line/LineChart';
import { ReferenceLine, SolidLine, type SolidLineProps } from '../line';
import { PeriodSelector, PeriodSelectorActiveIndicator } from '../PeriodSelector';
import { Scrubber } from '../scrubber';

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const BasicLineChart = memo(function BasicLineChart() {
  const theme = useTheme();
  const data = useMemo(() => [2, 4, 3, 6, 5, 8, 7], []);
  const categories = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);

  const scrubberAccessibilityLabel = useCallback(
    (index?: number) => {
      if (index === undefined) {
        return `Line chart with ${data.length} days of data. Tap segments to move scrubber.`;
      }
      return `${categories[index]}: ${data[index]}`;
    },
    [categories, data],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={scrubberAccessibilityLabel}
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

  const scrubberAccessibilityLabel = useCallback(
    (index?: number) => {
      if (index === undefined) return chartAccessibilityLabel;
      return `Point ${index + 1}: X value ${xData[index]}, Y value ${yData[index]}`;
    },
    [chartAccessibilityLabel, xData, yData],
  );

  return (
    <LineChart
      enableScrubbing
      points
      showArea
      showXAxis
      showYAxis
      accessibilityLabel={scrubberAccessibilityLabel}
      curve="natural"
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

  const scrubberAccessibilityLabel = useCallback(
    (index?: number) => {
      if (index === undefined) {
        return `Bar chart with ${values.length} months. Tap segments to move scrubber.`;
      }
      return `${categories[index]}: ${values[index]}`;
    },
    [categories, values],
  );

  return (
    <BarChart
      enableScrubbing
      showXAxis
      showYAxis
      accessibilityLabel={scrubberAccessibilityLabel}
      height={180}
      inset={{ top: 16, right: 16, bottom: 0, left: 0 }}
      series={[{ id: 'bars', data: values, color: theme.color.accentBoldPurple }]}
      xAxis={{ data: categories, showGrid: true }}
      yAxis={{ domain: { min: 0 }, showGrid: true }}
    >
      <Scrubber hideOverlay />
    </BarChart>
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

  const scrubberAccessibilityLabel = useCallback(
    (index?: number) => {
      if (index === undefined) {
        return `Cash flow chart: ${categories.length} days with gains and losses. Tap segments to move scrubber.`;
      }
      const net = gains[index] + losses[index];
      const netStr = net >= 0 ? `+$${net}M` : `-$${Math.abs(net)}M`;
      return `${categories[index]}: ${netStr}`;
    },
    [categories, gains, losses],
  );

  return (
    <CartesianChart
      enableScrubbing
      height={280}
      inset={32}
      series={series}
      xAxis={{ data: categories, scaleType: 'band' }}
      accessibilityLabel={scrubberAccessibilityLabel}
    >
      <XAxis />
      <YAxis
        showGrid
        GridLineComponent={ThinSolidLine}
        tickLabelFormatter={(value) => `$${value}M`}
      />
      <BarPlot />
      <ReferenceLine LineComponent={SolidLine} dataY={0} />
      <Scrubber hideOverlay />
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

  const accessibilityLabel = useCallback(
    (index?: number) => {
      if (index === undefined) {
        return `Bitcoin price chart for ${timePeriod.label} period. Current price: ${formatPrice(currentPrice)}.`;
      }
      const price = formatPrice(sparklineTimePeriodDataValues[index]);
      const date = formatDate(sparklineTimePeriodDataTimestamps[index]);
      return `${price} ${date}`;
    },
    [
      currentPrice,
      formatDate,
      formatPrice,
      sparklineTimePeriodDataTimestamps,
      sparklineTimePeriodDataValues,
      timePeriod.label,
    ],
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
        accessibilityLabel={accessibilityLabel}
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
      { title: 'Positive/Negative Cash Flow', component: <PositiveAndNegativeCashFlow /> },
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
            Tap chart segments to move the scrubber beacon. With screen reader: swipe to navigate.
          </Text>
          <Box padding={1}>{currentExample.component}</Box>
        </VStack>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
