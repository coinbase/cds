import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { BarChart, BarPlot } from '../../bar';
import { CartesianChart } from '../../CartesianChart';
import { LineChart, SolidLine, type SolidLineProps } from '../../line';
import { Line } from '../../line/Line';
import { Scrubber } from '../../scrubber/Scrubber';
import { XAxis, YAxis } from '..';

const defaultChartHeight = 250;

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const Simple = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const pageViews = data.map((d) => d.pv);
  const pageNames = data.map((d) => d.name);
  const pageUniqueVisitors = data.map((d) => d.uv);

  return (
    <LineChart
      enableScrubbing
      showXAxis
      showYAxis
      height={defaultChartHeight}
      inset={32}
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          label: 'Page Views',
          color: '#8884d8',
          curve: 'monotone',
        },
        {
          id: 'uniqueVisitors',
          data: pageUniqueVisitors,
          label: 'Unique Visitors',
          color: '#82ca9d',
          curve: 'monotone',
        },
      ]}
      xAxis={{
        data: pageNames,
        showLine: true,
        showGrid: true,
        showTickMarks: true,
        GridLineComponent: ThinSolidLine,
        position: 'bottom',
        requestedTickCount: 5,
      }}
      yAxis={{
        domain: {
          min: 0,
        },
        showGrid: true,
        showLine: true,
        showTickMarks: true,
        GridLineComponent: ThinSolidLine,
        position: 'left',
        requestedTickCount: 5,
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

const TimeOfDayAxesExample = () => {
  const theme = useTheme();
  const lineA = [5, 5, 10, 90, 85, 70, 30, 25, 25];
  const lineB = [90, 85, 70, 25, 23, 40, 45, 40, 50];

  const timeData = useMemo(
    () =>
      [
        new Date(2023, 7, 31),
        new Date(2023, 7, 31, 12),
        new Date(2023, 8, 1),
        new Date(2023, 8, 1, 12),
        new Date(2023, 8, 2),
        new Date(2023, 8, 2, 12),
        new Date(2023, 8, 3),
        new Date(2023, 8, 3, 12),
        new Date(2023, 8, 4),
      ].map((d) => d.getTime()),
    [],
  );

  const dateFormatter = useCallback(
    (index: number) => {
      return new Date(timeData[index]).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
      });
    },
    [timeData],
  );

  const timeOfDayFormatter = useCallback(
    (index: number) => {
      return new Date(timeData[index]).toLocaleTimeString('en-US', {
        hour: '2-digit',
      });
    },
    [timeData],
  );

  const timeOfDayTicks = useMemo(() => {
    return timeData.map((d, index) => index);
  }, [timeData]);

  const dateTicks = useMemo(() => {
    return timeData.map((d, index) => index).filter((d) => d % 2 === 0);
  }, [timeData]);

  return (
    <LineChart
      enableScrubbing
      height={defaultChartHeight}
      series={[
        {
          id: 'lineA',
          data: lineA,
          color: theme.color.accentBoldBlue,
        },
        {
          id: 'lineB',
          data: lineB,
          color: theme.color.accentBoldGreen,
        },
      ]}
      yAxis={{
        domain: { min: 0, max: 100 },
      }}
    >
      <XAxis
        showLine
        showTickMarks
        position="top"
        tickLabelFormatter={dateFormatter}
        ticks={dateTicks}
      />
      <XAxis
        showGrid
        showLine
        showTickMarks
        tickLabelFormatter={timeOfDayFormatter}
        ticks={timeOfDayTicks}
      />
      <Scrubber />
    </LineChart>
  );
};

const MultipleYAxesExample = () => (
  <CartesianChart
    enableScrubbing
    height={defaultChartHeight}
    series={[
      {
        id: 'linear',
        yAxisId: 'linearAxis',
        data: [1, 10, 30, 50, 70, 90, 100],
        label: 'linear',
      },
      { id: 'log', yAxisId: 'logAxis', data: [1, 10, 30, 50, 70, 90, 100], label: 'log' },
    ]}
    xAxis={{ data: [1, 10, 30, 50, 70, 90, 100] }}
    yAxis={[
      { id: 'linearAxis', scaleType: 'linear' },
      { id: 'logAxis', scaleType: 'log' },
    ]}
  >
    <XAxis showLine showTickMarks />
    <YAxis showLine showTickMarks axisId="logAxis" position="left" />
    <YAxis showLine showTickMarks axisId="linearAxis" position="left" />
    <Line curve="natural" seriesId="linear" />
    <Line curve="natural" seriesId="log" />
    <Scrubber />
  </CartesianChart>
);

const AxesOnAllSides = () => {
  const theme = useTheme();
  const data = [30, 45, 60, 80, 55, 40, 65];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <CartesianChart
      height={defaultChartHeight}
      series={[
        {
          id: 'data',
          data,
          color: theme.color.accentBoldBlue,
        },
      ]}
      xAxis={{
        data: labels,
      }}
      yAxis={{
        domain: { min: 0, max: 100 },
      }}
    >
      <XAxis
        showLine
        showTickMarks
        label="Bottom Axis"
        position="bottom"
        ticks={labels.map((label, index) => index)}
      />
      <XAxis
        showLine
        showTickMarks
        label="Top Axis"
        position="top"
        ticks={labels.map((label, index) => index)}
      />
      <YAxis showLine showTickMarks label="Left Axis" position="left" />
      <YAxis showLine showTickMarks label="Right Axis" position="right" />
      <Line curve="natural" seriesId="data" />
    </CartesianChart>
  );
};

const CustomTickMarkSizes = () => {
  const theme = useTheme();
  const data = [25, 50, 75, 60, 45, 80, 35];

  return (
    <CartesianChart
      height={300}
      series={[
        {
          id: 'data',
          data,
          color: theme.color.accentBoldGreen,
        },
      ]}
      xAxis={{
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      }}
      yAxis={{
        domain: { min: 0, max: 100 },
      }}
    >
      <XAxis showLine showTickMarks label="tickMarkSize=4 (default)" tickMarkSize={4} />
      <XAxis
        showLine
        showTickMarks
        height={60}
        label="tickMarkSize=8"
        position="top"
        tickMarkSize={8}
      />
      <YAxis
        showLine
        showTickMarks
        label="tickMarkSize=16"
        position="left"
        tickMarkSize={16}
        width={76}
      />
      <YAxis
        showLine
        showTickMarks
        label="tickMarkSize=24"
        position="right"
        tickMarkSize={24}
        width={84}
      />
      <Line curve="monotone" seriesId="data" />
    </CartesianChart>
  );
};

const DomainLimitType = ({ limit }: { limit: 'nice' | 'strict' }) => {
  const exponentialData = [
    1, 2, 4, 8, 15, 30, 65, 140, 280, 580, 1200, 2400, 4800, 9500, 19000, 38000, 75000, 150000,
  ];

  return (
    <CartesianChart
      enableScrubbing
      height={defaultChartHeight}
      series={[
        {
          id: 'growthLinear',
          data: exponentialData,
          color: '#10b981',
          yAxisId: 'linear',
        },
        {
          id: 'growthExponential',
          data: exponentialData,
          color: '#10b981',
          yAxisId: 'exponential',
        },
      ]}
      yAxis={[
        {
          id: 'linear',
          scaleType: 'linear',
          domainLimit: limit,
        },
        {
          id: 'exponential',
          scaleType: 'log',
          domainLimit: limit,
        },
      ]}
    >
      <Line showArea curve="natural" seriesId="growthLinear" />
      <Line showArea curve="natural" seriesId="growthExponential" />
      <XAxis showLine />
      <YAxis
        showLine
        showTickMarks
        axisId="exponential"
        position="left"
        requestedTickCount={6}
        tickLabelFormatter={(value) => value.toLocaleString()}
        width={70}
      />
      <YAxis
        showLine
        showTickMarks
        axisId="linear"
        tickLabelFormatter={(value) => value.toLocaleString()}
        width={70}
      />
      <Scrubber />
    </CartesianChart>
  );
};

// Band scale with tick filtering - show every other tick
const BandScaleTickFiltering = () => (
  <CartesianChart
    height={defaultChartHeight}
    inset={8}
    series={[{ id: 'data', data: [10, 22, 29, 45, 98, 45, 22, 35, 42, 18, 55, 67] }]}
    xAxis={{
      scaleType: 'band',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }}
    yAxis={{ domain: { min: 0 } }}
  >
    <XAxis
      showGrid
      showLine
      showTickMarks
      label="ticks={(i) => i % 2 === 0}"
      ticks={(i) => i % 2 === 0}
    />
    <BarPlot />
  </CartesianChart>
);

// Band scale with explicit ticks array
const BandScaleExplicitTicks = () => (
  <CartesianChart
    height={defaultChartHeight}
    inset={8}
    series={[{ id: 'data', data: [10, 22, 29, 45, 98, 45, 22] }]}
    xAxis={{
      scaleType: 'band',
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }}
    yAxis={{ domain: { min: 0 } }}
  >
    <XAxis
      showGrid
      showLine
      showTickMarks
      label="ticks={[0, 3, 6]} (first, middle, last)"
      ticks={[0, 3, 6]}
    />
    <BarPlot />
  </CartesianChart>
);

// Line chart on band scale - comparing grid placements
const LineChartOnBandScale = ({
  bandGridLinePlacement,
}: {
  bandGridLinePlacement: 'start' | 'middle' | 'end' | 'edges';
}) => {
  const theme = useTheme();
  return (
    <CartesianChart
      height={180}
      inset={8}
      series={[
        { id: 'line1', data: [10, 22, 29, 45, 98, 45, 22], color: theme.color.accentBoldBlue },
      ]}
      xAxis={{
        scaleType: 'band',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{ domain: { min: 0 } }}
    >
      <XAxis
        showGrid
        showLine
        showTickMarks
        bandGridLinePlacement={bandGridLinePlacement}
        bandTickMarkPlacement={bandGridLinePlacement}
        label={`bandGridLinePlacement: ${bandGridLinePlacement}`}
      />
      <YAxis showGrid position="left" />
      <Line seriesId="line1" />
    </CartesianChart>
  );
};

const AxisStories = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <Simple />
      </Example>
      <Example title="Time of Day">
        <TimeOfDayAxesExample />
      </Example>
      <Example title="Multiple Axes on Same Side">
        <MultipleYAxesExample />
      </Example>
      <Example title="Strict Domain Limit">
        <DomainLimitType limit="strict" />
      </Example>
      <Example title="Nice Domain Limit">
        <DomainLimitType limit="nice" />
      </Example>
      <Example title="Band Axis Grid Alignment">
        <CartesianChart
          height={350}
          inset={8}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22],
            },
          ]}
          xAxis={{
            scaleType: 'band',
            data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          }}
          yAxis={{
            domain: { min: 0 },
          }}
        >
          <XAxis showGrid showLine showTickMarks label="Default" />
          <XAxis showLine showTickMarks bandTickMarkPlacement="start" label="Start" />
          <XAxis showLine showTickMarks bandTickMarkPlacement="end" label="End" />
          <XAxis showLine showTickMarks bandTickMarkPlacement="middle" label="Middle" />
          <XAxis showLine showTickMarks bandTickMarkPlacement="edges" label="Edges" />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Band Scale - Tick Filtering">
        <BandScaleTickFiltering />
      </Example>
      <Example title="Band Scale - Explicit Ticks">
        <BandScaleExplicitTicks />
      </Example>
      <Example title="Line Chart on Band Scale - Grid Positions">
        <LineChartOnBandScale bandGridLinePlacement="edges" />
        <LineChartOnBandScale bandGridLinePlacement="start" />
        <LineChartOnBandScale bandGridLinePlacement="middle" />
        <LineChartOnBandScale bandGridLinePlacement="end" />
      </Example>
      <Example title="Axes on All Sides">
        <AxesOnAllSides />
      </Example>
      <Example title="Custom Tick Mark Sizes">
        <CustomTickMarkSizes />
      </Example>
    </ExampleScreen>
  );
};

export default AxisStories;
