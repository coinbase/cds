import { memo, useCallback, useMemo } from 'react';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

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
      curve="monotone"
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
    </ExampleScreen>
  );
};

export default AxisStories;
