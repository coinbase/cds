import { useCallback, useMemo } from 'react';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { AreaChart } from '../area';
import { XAxis, YAxis } from '../axis';
import { BarPlot } from '../bar';
import { CartesianChart } from '../CartesianChart';
import { ChartTooltip } from '../ChartTooltip';
import { Legend } from '../legend';
import { LineChart } from '../line';
import { Scrubber } from '../scrubber';

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
        <Scrubber />
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

  return (
    <Example title="Bar Chart Tooltip">
      <Text color="fgMuted" font="body">
        ChartTooltip works with bar charts too.
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
        <BarPlot />
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
        Tooltip shows individual series values for stacked charts.
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
        <BarPlot />
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
    </VStack>
  );
};
