import { memo, useCallback, useMemo } from 'react';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { AreaChart } from '../area';
import { XAxis, YAxis } from '../axis';
import type { BarComponentProps } from '../bar';
import { BarPlot, DefaultBar } from '../bar';
import { CartesianChart } from '../CartesianChart';
import { useCartesianChartContext } from '../ChartProvider';
import { ChartTooltip } from '../ChartTooltip';
import { DonutChart } from '../DonutChart';
import type { LineComponentProps } from '../line';
import { LineChart } from '../line';
import { PieChart } from '../pie';
import { Scrubber } from '../scrubber';
import { useHighlightContext } from '../utils';

export default {
  component: ChartTooltip,
  title: 'Components/Chart/ChartTooltip',
};

const Example: React.FC<React.PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {children}
    </VStack>
  );
};

const Basic = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenue = [120, 150, 180, 165, 190, 210];
  const expenses = [80, 95, 110, 105, 120, 130];

  return (
    <Example title="Basic Tooltip">
      <Text color="fgMuted" font="body">
        Hover over the chart to see the tooltip. The label defaults to the x-axis value.
      </Text>
      <LineChart
        enableScrubbing
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          { id: 'revenue', label: 'Revenue', data: revenue, color: 'rgb(var(--blue40))' },
          { id: 'expenses', label: 'Expenses', data: expenses, color: 'rgb(var(--orange40))' },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip />
      </LineChart>
    </Example>
  );
};

const WithValueFormatter = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const sales = [45000, 52000, 48000, 61000, 55000, 67000];
  const profit = [12000, 15000, 11000, 18000, 14000, 21000];

  const currencyFormatter = useCallback(
    (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value),
    [],
  );

  return (
    <Example title="Value Formatter">
      <Text color="fgMuted" font="body">
        Format tooltip values with a custom formatter function.
      </Text>
      <AreaChart
        enableScrubbing
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          { id: 'sales', label: 'Sales', data: sales, color: 'rgb(var(--green40))' },
          { id: 'profit', label: 'Profit', data: profit, color: 'rgb(var(--purple40))' },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true, tickLabelFormatter: currencyFormatter }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip valueFormatter={currencyFormatter} />
      </AreaChart>
    </Example>
  );
};

const CustomLabel = () => {
  const dates = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];
  const displayDates = [
    'January 2024',
    'February 2024',
    'March 2024',
    'April 2024',
    'May 2024',
    'June 2024',
  ];
  const temperature = [32, 35, 45, 58, 68, 78];
  const humidity = [65, 60, 55, 50, 55, 60];

  return (
    <Example title="Custom Label">
      <Text color="fgMuted" font="body">
        Use a function to customize the tooltip label based on the data index.
      </Text>
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          {
            id: 'temperature',
            label: 'Temperature (°F)',
            data: temperature,
            color: 'rgb(var(--red40))',
          },
          { id: 'humidity', label: 'Humidity (%)', data: humidity, color: 'rgb(var(--blue40))' },
        ]}
        xAxis={{ data: dates }}
        yAxis={{ domain: { min: 0 }, showGrid: true }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip
          label={(dataIndex) => (
            <HStack alignItems="center" gap={1}>
              <Text font="label1">{displayDates[dataIndex]}</Text>
            </HStack>
          )}
        />
      </LineChart>
    </Example>
  );
};

const FilteredSeries = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const primary = [100, 120, 140, 130, 150, 170];
  const secondary = [60, 70, 80, 75, 85, 95];
  const tertiary = [30, 35, 40, 38, 42, 48];

  return (
    <Example title="Filtered Series">
      <Text color="fgMuted" font="body">
        Show only specific series in the tooltip using the seriesIds prop.
      </Text>
      <LineChart
        enableScrubbing
        legend
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          { id: 'primary', label: 'Primary', data: primary, color: 'rgb(var(--blue40))' },
          { id: 'secondary', label: 'Secondary', data: secondary, color: 'rgb(var(--green40))' },
          {
            id: 'tertiary',
            label: 'Tertiary',
            data: tertiary,
            color: 'rgb(var(--gray40))',
          },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip seriesIds={['primary', 'secondary']} />
      </LineChart>
    </Example>
  );
};

const WithBarChart = () => {
  const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const revenue = [250, 320, 280, 410];
  const costs = [180, 220, 200, 280];

  const numberFormatter = useCallback((value: number) => `$${value}k`, []);

  // Custom bar component that dims non-highlighted bars
  const DimmingBarComponent = memo<BarComponentProps>(({ seriesId, dataX, ...props }) => {
    const highlightContext = useHighlightContext();
    const highlightedItem = highlightContext?.highlightedItem;
    return (
      <DefaultBar
        {...props}
        dataX={dataX}
        fillOpacity={
          highlightedItem?.dataIndex === undefined || highlightedItem.dataIndex === dataX ? 1 : 0.5
        }
        seriesId={seriesId}
      />
    );
  });

  // Custom line component that renders a rect to highlight the entire bandwidth including gaps
  const BandwidthHighlight = memo<LineComponentProps>(({ stroke }) => {
    const { getXScale, drawingArea } = useCartesianChartContext();
    const highlightContext = useHighlightContext();
    const scrubberPosition = highlightContext?.highlightedItem?.dataIndex;
    const xScale = getXScale();

    if (!xScale || scrubberPosition === undefined) return null;

    const xPos = xScale(scrubberPosition);

    if (xPos === undefined) return null;

    const bandwidth = 'bandwidth' in xScale ? xScale.bandwidth() : 0;
    const step = 'step' in xScale ? xScale.step() : bandwidth;
    const gap = step - bandwidth;

    // Expand the highlight to include half the gap on each side
    const highlightWidth = bandwidth + gap;
    const highlightX = xPos - gap / 2;

    return (
      <rect
        fill={stroke}
        height={drawingArea.height}
        width={highlightWidth}
        x={highlightX}
        y={drawingArea.y}
      />
    );
  });

  return (
    <Example title="Bar Chart Tooltip">
      <Text color="fgMuted" font="body">
        ChartTooltip works with bar charts. Non-highlighted bars are dimmed for emphasis.
      </Text>
      <CartesianChart
        enableScrubbing
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          { id: 'revenue', label: 'Revenue', data: revenue, color: 'rgb(var(--green40))' },
          { id: 'costs', label: 'Costs', data: costs, color: 'rgb(var(--red40))' },
        ]}
        xAxis={{ data: categories, scaleType: 'band' }}
        yAxis={{ domain: { min: 0 } }}
      >
        <XAxis showLine showTickMarks />
        <YAxis showGrid tickLabelFormatter={numberFormatter} />
        <BarPlot BarComponent={DimmingBarComponent} />
        <Scrubber
          hideOverlay
          LineComponent={BandwidthHighlight}
          lineStroke="var(--color-bgLine)"
          seriesIds={[]}
        />
        <ChartTooltip valueFormatter={numberFormatter} />
      </CartesianChart>
    </Example>
  );
};

const StackedAreaTooltip = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const desktop = [4000, 4200, 3800, 4500, 4800, 5200, 5000, 5500];
  const mobile = [2400, 2800, 3000, 3200, 3500, 3800, 4000, 4200];
  const tablet = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];

  const numberFormatter = useCallback((value: number) => value.toLocaleString(), []);

  return (
    <Example title="Stacked Area Tooltip">
      <Text color="fgMuted" font="body">
        Tooltip shows individual series values (not cumulative totals).
      </Text>
      <AreaChart
        enableScrubbing
        legend
        showXAxis
        showYAxis
        stacked
        height={{ base: 250, tablet: 300, desktop: 350 }}
        series={[
          { id: 'desktop', label: 'Desktop', data: desktop, color: 'rgb(var(--blue40))' },
          { id: 'mobile', label: 'Mobile', data: mobile, color: 'rgb(var(--green40))' },
          { id: 'tablet', label: 'Tablet', data: tablet, color: 'rgb(var(--orange40))' },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true, tickLabelFormatter: numberFormatter }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip valueFormatter={numberFormatter} />
      </AreaChart>
    </Example>
  );
};

const CustomValueDisplay = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const steps = [8500, 12000, 7200, 9800, 11500, 15000, 6500];
  const goal = 10000;

  const stepsFormatter = useCallback((value: number) => {
    const percentage = Math.round((value / goal) * 100);
    const isGoalMet = value >= goal;
    return (
      <HStack alignItems="center" gap={1}>
        <Text color={isGoalMet ? 'fgPositive' : 'fgMuted'} font="label2">
          {value.toLocaleString()} steps
        </Text>
        <Text color={isGoalMet ? 'fgPositive' : 'fgMuted'} font="caption">
          ({percentage}%)
        </Text>
      </HStack>
    );
  }, []);

  return (
    <Example title="Custom Value Display">
      <Text color="fgMuted" font="body">
        Return a custom ReactNode from valueFormatter for rich value display.
      </Text>
      <AreaChart
        enableScrubbing
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[{ id: 'steps', label: 'Daily Steps', data: steps, color: 'rgb(var(--green40))' }]}
        xAxis={{ data: days }}
        yAxis={{ domain: { min: 0, max: 20000 }, showGrid: true }}
      >
        <Scrubber hideBeaconLabels />
        <ChartTooltip label="Daily Activity" valueFormatter={stepsFormatter} />
      </AreaChart>
    </Example>
  );
};

const MultiAxisTooltip = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenue = [455, 520, 380, 455, 285, 235];
  const profitMargin = [23, 20, 16, 38, 12, 9];

  // Custom bar component that dims non-highlighted bars
  const DimmingBarComponent = memo<BarComponentProps>(({ seriesId, dataX, ...props }) => {
    const highlightContext = useHighlightContext();
    const highlightedItem = highlightContext?.highlightedItem;
    return (
      <DefaultBar
        {...props}
        dataX={dataX}
        fillOpacity={
          highlightedItem?.dataIndex === undefined || highlightedItem.dataIndex === dataX ? 1 : 0.5
        }
        seriesId={seriesId}
      />
    );
  });

  // Custom line component that renders a rect to highlight the entire bandwidth including gaps
  const BandwidthHighlight = memo<LineComponentProps>(({ stroke }) => {
    const { getXScale, drawingArea } = useCartesianChartContext();
    const highlightContext = useHighlightContext();
    const scrubberPosition = highlightContext?.highlightedItem?.dataIndex;
    const xScale = getXScale();

    if (!xScale || scrubberPosition === undefined) return null;

    const xPos = xScale(scrubberPosition);

    if (xPos === undefined) return null;

    const bandwidth = 'bandwidth' in xScale ? xScale.bandwidth() : 0;
    const step = 'step' in xScale ? xScale.step() : bandwidth;
    const gap = step - bandwidth;

    // Expand the highlight to include half the gap on each side
    const highlightWidth = bandwidth + gap;
    const highlightX = xPos - gap / 2;

    return (
      <rect
        fill={stroke}
        height={drawingArea.height}
        width={highlightWidth}
        x={highlightX}
        y={drawingArea.y}
      />
    );
  });

  return (
    <Example title="Multi-Axis Tooltip">
      <Text color="fgMuted" font="body">
        Tooltip works with multiple y-axes, showing values from all series.
      </Text>
      <CartesianChart
        enableScrubbing
        height={{ base: 200, tablet: 250, desktop: 300 }}
        series={[
          {
            id: 'revenue',
            label: 'Revenue',
            data: revenue,
            yAxisId: 'revenue',
            color: 'rgb(var(--blue40))',
          },
          {
            id: 'profitMargin',
            label: 'Profit Margin',
            data: profitMargin,
            yAxisId: 'profitMargin',
            color: 'rgb(var(--green40))',
          },
        ]}
        xAxis={{ data: months, scaleType: 'band' }}
        yAxis={[
          { id: 'revenue', domain: { min: 0 } },
          { id: 'profitMargin', domain: { min: 0, max: 100 } },
        ]}
      >
        <XAxis showLine showTickMarks />
        <YAxis
          showGrid
          showLine
          axisId="revenue"
          position="left"
          tickLabelFormatter={(value) => `$${value}k`}
        />
        <YAxis
          showLine
          axisId="profitMargin"
          position="right"
          tickLabelFormatter={(value) => `${value}%`}
        />
        <BarPlot BarComponent={DimmingBarComponent} />
        <Scrubber
          hideOverlay
          LineComponent={BandwidthHighlight}
          lineStroke="var(--color-bgLine)"
          seriesIds={[]}
        />
        <ChartTooltip
          valueFormatter={(value) => {
            // Simple formatter - in real usage you'd differentiate by series
            return value < 100 ? `${value}%` : `$${value}k`;
          }}
        />
      </CartesianChart>
    </Example>
  );
};

const PieChartTooltip = () => {
  const series = useMemo(
    () => [
      { id: 'stocks', data: 45, label: 'Stocks', color: 'rgb(var(--blue40))' },
      { id: 'bonds', data: 25, label: 'Bonds', color: 'rgb(var(--green40))' },
      { id: 'crypto', data: 20, label: 'Crypto', color: 'rgb(var(--orange40))' },
      { id: 'cash', data: 10, label: 'Cash', color: 'rgb(var(--gray40))' },
    ],
    [],
  );

  return (
    <Example title="Pie Chart Tooltip">
      <Text color="fgMuted" font="body">
        Hover over slices to see the tooltip. For polar charts, the tooltip shows the highlighted
        slice.
      </Text>
      <Box height={300} width={300}>
        <PieChart enableHighlighting series={series}>
          <ChartTooltip />
        </PieChart>
      </Box>
    </Example>
  );
};

const DonutChartTooltip = () => {
  const series = useMemo(
    () => [
      { id: 'completed', data: 68, label: 'Completed', color: 'rgb(var(--green40))' },
      { id: 'inProgress', data: 22, label: 'In Progress', color: 'rgb(var(--blue40))' },
      { id: 'pending', data: 10, label: 'Pending', color: 'rgb(var(--gray40))' },
    ],
    [],
  );

  const percentFormatter = useCallback((value: number) => {
    const total = 68 + 22 + 10;
    const percent = Math.round((value / total) * 100);
    return `${value} tasks (${percent}%)`;
  }, []);

  return (
    <Example title="Donut Chart Tooltip">
      <Text color="fgMuted" font="body">
        Donut chart with a custom value formatter showing percentage.
      </Text>
      <Box height={300} width={300}>
        <DonutChart enableHighlighting innerRadiusRatio={0.6} series={series}>
          <ChartTooltip valueFormatter={percentFormatter} />
        </DonutChart>
      </Box>
    </Example>
  );
};

const DonutChartCustomLabel = () => {
  const series = useMemo(
    () => [
      { id: 'btc', data: 42000, label: 'Bitcoin', color: 'rgb(var(--orange40))' },
      { id: 'eth', data: 28000, label: 'Ethereum', color: 'rgb(var(--blue40))' },
      { id: 'sol', data: 15000, label: 'Solana', color: 'rgb(var(--purple40))' },
      { id: 'other', data: 15000, label: 'Other', color: 'rgb(var(--gray40))' },
    ],
    [],
  );

  const currencyFormatter = useCallback(
    (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value),
    [],
  );

  return (
    <Example title="Donut Chart with Custom Label">
      <Text color="fgMuted" font="body">
        Polar chart tooltip with static custom label and currency formatting.
      </Text>
      <Box height={300} width={300}>
        <DonutChart enableHighlighting innerRadiusRatio={0.5} series={series}>
          <ChartTooltip label="Portfolio Holdings" valueFormatter={currencyFormatter} />
        </DonutChart>
      </Box>
    </Example>
  );
};

const WithLegend = () => {
  const precipitationData = [
    {
      id: 'northeast',
      label: 'Northeast',
      data: [5.14, 1.53, 5.73, 4.29, 3.78, 3.92, 4.19, 5.54, 2.03, 1.42, 2.95, 3.89],
      color: 'rgb(var(--blue40))',
    },
    {
      id: 'upperMidwest',
      label: 'Upper Midwest',
      data: [1.44, 0.49, 2.16, 3.67, 5.44, 6.21, 4.02, 3.67, 0.92, 1.47, 3.05, 1.48],
      color: 'rgb(var(--green40))',
    },
    {
      id: 'southwest',
      label: 'Southwest',
      data: [1.12, 1.5, 1.52, 0.75, 0.76, 1.27, 1.44, 2.01, 0.62, 1.08, 1.23, 0.25],
      color: 'rgb(var(--purple40))',
    },
  ];

  const xAxisData = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <Example title="With Legend">
      <Text color="fgMuted" font="body">
        ChartTooltip can be combined with Legend to provide both persistent series identification
        and on-hover details.
      </Text>
      <LineChart
        enableScrubbing
        legend
        showArea
        showXAxis
        showYAxis
        height={{ base: 300, tablet: 400, desktop: 500 }}
        legendPosition="bottom"
        series={precipitationData}
        xAxis={{ data: xAxisData, label: 'Month', showLine: true, showTickMarks: true }}
        yAxis={{
          label: 'Precipitation (in)',
          showGrid: true,
          showLine: true,
          showTickMarks: true,
        }}
      >
        <Scrubber hideBeaconLabels hideOverlay />
        <ChartTooltip valueFormatter={(value) => `${value} in`} />
      </LineChart>
    </Example>
  );
};

export const All = () => {
  return (
    <VStack gap={4}>
      <Basic />
      <WithValueFormatter />
      <CustomLabel />
      <FilteredSeries />
      <WithBarChart />
      <StackedAreaTooltip />
      <CustomValueDisplay />
      <MultiAxisTooltip />
      <PieChartTooltip />
      <DonutChartTooltip />
      <DonutChartCustomLabel />
      <WithLegend />
    </VStack>
  );
};
