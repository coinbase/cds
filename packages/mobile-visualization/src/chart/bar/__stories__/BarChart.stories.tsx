import { memo, useEffect, useState } from 'react';
import { Button } from '@coinbase/cds-mobile/buttons';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { VStack } from '@coinbase/cds-mobile/layout';

import { XAxis, YAxis } from '../../axis';
import { CartesianChart } from '../../CartesianChart';
import { ReferenceLine, SolidLine, type SolidLineProps } from '../../line';
import { Bar } from '../Bar';
import { BarChart } from '../BarChart';
import { BarPlot } from '../BarPlot';
import type { BarStackComponentProps } from '../BarStack';
import { DefaultBarStack } from '../DefaultBarStack';

const ThinSolidLine = memo((props: SolidLineProps) => <SolidLine {...props} strokeWidth={1} />);

const defaultChartHeight = 250;

const PositiveAndNegativeCashFlow = () => {
  const theme = useTheme();
  const categories = Array.from({ length: 31 }, (_, i) => `3/${i + 1}`);
  const gains = [
    5, 0, 6, 18, 0, 5, 12, 0, 12, 22, 28, 18, 0, 12, 6, 0, 0, 24, 0, 0, 4, 0, 18, 0, 0, 14, 10, 16,
    0, 0, 0,
  ];

  const losses = [
    -4, 0, -8, -12, -6, 0, 0, 0, -18, 0, -12, 0, -9, -6, 0, 0, 0, 0, -22, -8, 0, 0, -10, -14, 0, 0,
    0, 0, 0, -12, -10,
  ];
  const series = [
    { id: 'gains', data: gains, color: theme.color.fgPositive, stackId: 'bars' },
    { id: 'losses', data: losses, color: theme.color.fgNegative, stackId: 'bars' },
  ];

  return (
    <CartesianChart
      height={420}
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
};

const FiatAndStablecoinBalance = () => {
  const theme = useTheme();
  const categories = Array.from({ length: 31 }, (_, i) => `3/${i + 1}`);

  const usd = [
    20, 20, 20, 20, 20, 40, 60, 60, 80, 120, 200, 240, 240, 240, 240, 240, 240, 240, 240, 60, 30,
    20, 25, 5, 0, 0, 0, 0, 80, 120, 150,
  ];
  const usdc = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 260, 260, 240, 220, 180, 160, 200, 240, 220, 0, 0, 0, 0, 0, 0,
    250, 250, 250, 250, 250, 250,
  ];
  const brl = [
    0, 0, 0, 0, 0, 0, 0, 20, 40, 100, 60, 60, 60, 0, 0, 0, 0, 0, 0, 160, 40, 80, 140, 180, 120, 0,
    0, 0, 30, 30, 40,
  ];

  const series = [
    { id: 'BRL', data: brl, color: theme.color.accentBoldGreen },
    { id: 'USDC', data: usdc, color: theme.color.accentBoldBlue },
    { id: 'USD', data: usd, color: '#5b6cff' },
  ];

  return (
    <BarChart
      showXAxis
      stacked
      barMinSize={8}
      height={420}
      inset={32}
      series={series}
      stackGap={2}
      stackMinSize={16}
      xAxis={{ data: categories }}
    />
  );
};

const CustomBarStackComponent = memo(({ children, ...props }: BarStackComponentProps) => {
  const theme = useTheme();
  if (props.height === 0) {
    const diameter = props.width;
    return (
      <Bar
        roundBottom
        roundTop
        borderRadius={1000}
        fill={theme.color.bgTertiary}
        height={diameter}
        originY={props.y}
        width={diameter}
        x={props.x}
        y={props.y - diameter}
      />
    );
  }

  return <DefaultBarStack {...props}>{children}</DefaultBarStack>;
});

const MonthlyRewards = () => {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const purple = [null, 6, 8, 10, 7, 6, 6, 8, null, null, null, null];
  const blue = [null, 10, 12, 11, 10, 9, 10, 11, null, null, null, null];
  const cyan = [null, 7, 10, 12, 11, 10, 8, 11, null, null, null, null];
  const green = [10, null, null, null, 1, null, null, 6, null, null, null, null];

  const [roundBaseline, setRoundBaseline] = useState(true);

  const series = [
    { id: 'purple', data: purple, color: '#b399ff' },
    { id: 'blue', data: blue, color: '#4f7cff' },
    { id: 'cyan', data: cyan, color: '#00c2df' },
    { id: 'green', data: green, color: '#33c481' },
  ];

  return (
    <VStack gap={2}>
      <BarChart
        showXAxis
        stacked
        BarStackComponent={CustomBarStackComponent}
        borderRadius={1000}
        height={300}
        inset={0}
        roundBaseline={roundBaseline}
        series={series}
        showYAxis={false}
        stackMinSize={24}
        xAxis={{
          tickLabelFormatter: (index) => {
            return months[index];
          },
          categoryPadding: 0.27,
        }}
      />
      <Button onPress={() => setRoundBaseline(!roundBaseline)}>Toggle Round Baseline</Button>
    </VStack>
  );
};

const MultipleYAxes = () => {
  const theme = useTheme();
  return (
    <CartesianChart
      height={defaultChartHeight}
      series={[
        {
          id: 'revenue',
          data: [455, 520, 380, 455, 190, 235],
          yAxisId: 'revenue',
          color: theme.color.accentBoldYellow,
        },
        {
          id: 'profit',
          data: [23, 15, 30, 56, 4, 12],
          yAxisId: 'profit',
          color: theme.color.fgPositive,
        },
      ]}
      xAxis={{
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        scaleType: 'band',
      }}
      yAxis={[
        {
          id: 'revenue',
        },
        {
          id: 'profit',
        },
      ]}
    >
      <XAxis showLine showTickMarks label="Month" />
      <YAxis
        showGrid
        showLine
        showTickMarks
        axisId="revenue"
        label="Revenue"
        position="left"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `$${value}k`}
        width={80}
      />
      <YAxis
        showLine
        showTickMarks
        axisId="profit"
        label="Profit"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `$${value}k`}
        width={70}
      />
      <BarPlot />
    </CartesianChart>
  );
};

const initialData = [45, 52, 38, 45, 19, 23, 32];

const MyCustomLine = memo(({ animate, ...props }: SolidLineProps) => <SolidLine {...props} />);

const UpdatingChartValues = () => {
  const [data, setData] = useState(initialData);

  return (
    <VStack gap={2}>
      <BarChart
        height={100}
        series={[
          {
            id: 'weekly-data',
            data: data,
          },
        ]}
        xAxis={{
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          showTickMarks: true,
          showLine: true,
        }}
        yAxis={{
          requestedTickCount: 5,
          tickLabelFormatter: (value) => `$${value}k`,
          showGrid: true,
          showTickMarks: true,
          showLine: true,
          tickMarkSize: 12,
          domain: { max: 250 },
        }}
      />
      <BarChart
        height={100}
        series={[
          {
            id: 'weekly-data',
            data: data,
          },
        ]}
        transition={{ type: 'timing', duration: 300 }}
        xAxis={{
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          showTickMarks: true,
          showLine: true,
        }}
        yAxis={{
          requestedTickCount: 5,
          tickLabelFormatter: (value) => `$${value}k`,
          showGrid: true,
          showTickMarks: true,
          showLine: true,
          tickMarkSize: 12,
          domain: { max: 250 },
        }}
      />
      <BarChart
        height={100}
        series={[
          {
            id: 'weekly-data',
            data: data.map((d, i) => (i % 2 === 0 ? d : -d)),
          },
        ]}
        xAxis={{
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          showTickMarks: true,
          showLine: true,
        }}
        yAxis={{
          requestedTickCount: 5,
          tickLabelFormatter: (value) => `$${value}k`,
          showGrid: true,
          showTickMarks: true,
          showLine: true,
          tickMarkSize: 12,
          domain: { max: 250 },
        }}
      >
        <ReferenceLine LineComponent={MyCustomLine} dataY={0} />
      </BarChart>
      <Button
        onPress={() => setData((data) => (data[0] > 200 ? initialData : data.map((d) => d + 50)))}
      >
        Update Data
      </Button>
    </VStack>
  );
};

const AnimatedUpdatingChartValues = () => {
  const [data, setData] = useState([45, 52, 38, 45, 19, 23, 32]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((value) => {
          // Generate random change between -15 and +15
          const change = Math.floor(Math.random() * 31) - 15;
          // Ensure values stay between 10 and 200
          return Math.max(10, Math.min(200, value + change));
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'weekly-data',
          data: data,
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        showTickMarks: true,
        showLine: true,
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `$${value}k`,
        showGrid: true,
        showTickMarks: true,
        showLine: true,
        tickMarkSize: 12,
        domain: { max: 250 },
      }}
    />
  );
};

const NegativeValuesWithTopAxis = () => {
  const theme = useTheme();
  return (
    <CartesianChart
      height={defaultChartHeight}
      series={[
        {
          id: 'losses',
          data: [-45, -52, -38, -45, -19, -23, -32],
          color: theme.color.fgNegative,
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        scaleType: 'band',
      }}
    >
      <XAxis showLine showTickMarks label="Day of Week" position="top" />
      <YAxis
        showGrid
        showLine
        showTickMarks
        label="Loss"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `$${value}k`}
      />
      <BarPlot />
    </CartesianChart>
  );
};

type TimePeriod = 'week' | 'month' | 'year';
type TimePeriodTab = { id: TimePeriod; label: string };

const tabs: TimePeriodTab[] = [
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1Y' },
];

const YAxisContinuousColorMap = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'temperature',
          data: [12, 25, 38, 52, 45, 30, 18],
          // Continuous gradient from blue (cold) to red (hot)
          gradient: {
            axis: 'y',
            stops: ({ min, max }) => [
              { offset: min, color: theme.color.accentBoldGreen },
              { offset: (min + max) / 2, color: theme.color.accentBoldYellow },
              { offset: max, color: theme.color.accentBoldRed },
            ],
          },
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `${value}°C`,
        showGrid: true,
      }}
    />
  );
};

const YAxisDiscreteColorMap = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'temperature',
          data: [12, 25, 38, 52, 45, 30, 18],
          // Hard transitions based on performance thresholds
          gradient: {
            axis: 'y',
            stops: [
              { offset: 20, color: theme.color.accentBoldGreen },
              { offset: 20, color: theme.color.accentBoldYellow },
              { offset: 40, color: theme.color.accentBoldYellow },
              { offset: 40, color: theme.color.accentBoldRed },
              { offset: 60, color: theme.color.accentBoldRed },
            ], // Hard transitions at 20, 40
          },
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `${value}°C`,
        showGrid: true,
      }}
    />
  );
};

const XAxisContinuousColorMap = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'weekly-trend',
          data: [45, 52, 38, 45, 48, 50, 55],
          // Gradient from left (start of week) to right (end of week)
          gradient: {
            axis: 'x',
            stops: ({ min, max }) => [
              { offset: min, color: theme.color.accentBoldPurple },
              { offset: max, color: theme.color.accentBoldBlue },
            ],
          },
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `${value}`,
        showGrid: true,
      }}
    />
  );
};

const XAxisDiscreteColorMap = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'weekly-trend',
          data: [45, 52, 38, 45, 48, 50, 55],
          // Hard color transition from purple to blue at midweek
          gradient: {
            axis: 'x',
            stops: [
              { offset: 4, color: theme.color.accentBoldPurple }, // First half of week
              { offset: 4, color: theme.color.accentBoldBlue }, // Second half of week - hard transition at index 4 (Thursday)
            ],
          },
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `${value}`,
        showGrid: true,
      }}
    />
  );
};

const XAxisMultiSegmentColorMap = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'quarters',
          data: [120, 135, 142, 128, 145, 158, 162, 155, 168, 175, 182, 190],
          // Different color for each quarter
          gradient: {
            axis: 'x',
            stops: [
              { offset: 3, color: theme.color.accentBoldBlue }, // Q1 (Jan-Mar)
              { offset: 3, color: theme.color.accentBoldGreen }, // Q2 (Apr-Jun)
              { offset: 6, color: theme.color.accentBoldGreen },
              { offset: 6, color: theme.color.accentBoldYellow }, // Q3 (Jul-Sep)
              { offset: 9, color: theme.color.accentBoldYellow },
              { offset: 9, color: theme.color.accentBoldPurple }, // Q4 (Oct-Dec)
            ], // Hard transitions at indices 3, 6, 9
          },
        },
      ]}
      xAxis={{
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `$${value}k`,
        showGrid: true,
      }}
    />
  );
};

const ColorMapWithOpacity = () => {
  const theme = useTheme();
  return (
    <BarChart
      showXAxis
      showYAxis
      height={defaultChartHeight}
      series={[
        {
          id: 'confidence',
          data: [25, 35, 45, 55, 65, 75, 85],
          // Gradient with opacity changes
          gradient: {
            axis: 'y',
            stops: ({ min, max }) => [
              { offset: min, color: theme.color.accentBoldBlue, opacity: 0 }, // Low values - more transparent
              { offset: max, color: theme.color.accentBoldBlue, opacity: 1.0 }, // High values - more opaque
            ],
          },
        },
      ]}
      xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }}
      yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: (value) => `${value}%`,
        showGrid: true,
      }}
    />
  );
};

const BandGridPositionExample = ({
  position,
}: {
  position: 'start' | 'middle' | 'end' | 'edges';
}) => (
  <CartesianChart
    height={180}
    inset={4}
    series={[{ id: 'data', data: [30, 50, 40, 60, 35] }]}
    xAxis={{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }}
    yAxis={{ domain: { min: 0 } }}
  >
    <XAxis showGrid showLine bandGridLinePlacement={position} label={position} />
    <BarPlot />
  </CartesianChart>
);

const BarChartStories = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <UpdatingChartValues />
      </Example>
      <Example title="Animated Auto-Updating">
        <AnimatedUpdatingChartValues />
      </Example>
      <Example title="Negative Values with Top Axis">
        <NegativeValuesWithTopAxis />
      </Example>
      <Example title="Positive and Negative Cash Flow">
        <PositiveAndNegativeCashFlow />
      </Example>
      <Example title="Fiat & Stablecoin Balance">
        <FiatAndStablecoinBalance />
      </Example>
      <Example title="Monthly Rewards">
        <MonthlyRewards />
      </Example>
      <Example title="Multiple Y Axes">
        <MultipleYAxes />
      </Example>
      <Example title="Y-Axis Continuous ColorMap">
        <YAxisContinuousColorMap />
      </Example>
      <Example title="Y-Axis Discrete ColorMap">
        <YAxisDiscreteColorMap />
      </Example>
      <Example title="X-Axis Continuous ColorMap">
        <XAxisContinuousColorMap />
      </Example>
      <Example title="X-Axis Discrete ColorMap">
        <XAxisDiscreteColorMap />
      </Example>
      <Example title="X-Axis Multi-Segment ColorMap">
        <XAxisMultiSegmentColorMap />
      </Example>
      <Example title="ColorMap with Opacity">
        <ColorMapWithOpacity />
      </Example>
      <Example title="Band Grid Position">
        <BandGridPositionExample position="edges" />
        <BandGridPositionExample position="start" />
        <BandGridPositionExample position="middle" />
        <BandGridPositionExample position="end" />
      </Example>
    </ExampleScreen>
  );
};

export default BarChartStories;
