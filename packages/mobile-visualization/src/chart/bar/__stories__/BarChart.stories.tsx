import { memo, useContext, useState } from 'react';
import { Rect as SvgRect } from 'react-native-svg';
import { Button } from '@coinbase/cds-mobile/buttons';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { VStack } from '@coinbase/cds-mobile/layout';

import { XAxis, YAxis } from '../../axis';
import { CartesianChart } from '../../CartesianChart';
import { useCartesianChartContext } from '../../ChartProvider';
import { ReferenceLine, SolidLine, type SolidLineProps } from '../../line';
import { isCategoricalScale, ScrubberContext } from '../../utils';
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

const MonthlyRewards = () => {
  const theme = useTheme();
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const purple = [null, 6, 8, 10, 7, 6, 6, 8, null, null, null, null];
  const blue = [null, 10, 12, 11, 10, 9, 10, 11, null, null, null, null];
  const cyan = [null, 7, 10, 12, 11, 10, 8, 11, null, null, null, null];
  const green = [10, null, null, null, 1, null, null, 6, null, null, null, null];

  const series = [
    { id: 'purple', data: purple, color: '#b399ff' },
    { id: 'blue', data: blue, color: '#4f7cff' },
    { id: 'cyan', data: cyan, color: '#00c2df' },
    { id: 'green', data: green, color: '#33c481' },
  ];

  const CustomBarStackComponent = ({ children, ...props }: BarStackComponentProps) => {
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
  };

  return (
    <BarChart
      roundBaseline
      showXAxis
      stacked
      BarStackComponent={CustomBarStackComponent}
      borderRadius={1000}
      height={300}
      inset={0}
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
        axisId="profit"
        requestedTickCount={5}
        tickLabelFormatter={(value) => `$${value}k`}
      />
      <BarPlot />
    </CartesianChart>
  );
};

const UpdatingChartValues = () => {
  const [data, setData] = useState([45, 52, 38, 45, 19, 23, 32]);

  return (
    <VStack gap={2}>
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
        }}
      />
      <Button onPress={() => setData((data) => data.map((d) => d + 10))}>Update Data</Button>
    </VStack>
  );
};

type TimePeriod = 'week' | 'month' | 'year';
type TimePeriodTab = { id: TimePeriod; label: string };

const tabs: TimePeriodTab[] = [
  { id: 'week', label: '1W' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1Y' },
];

const ScrubberRect = memo(() => {
  const theme = useTheme();
  const { getXScale, getYScale } = useCartesianChartContext();
  const { scrubberPosition } = useContext(ScrubberContext) ?? {};
  const xScale = getXScale();
  const yScale = getYScale();

  if (!xScale || !yScale || scrubberPosition === undefined || !isCategoricalScale(xScale))
    return null;

  const yScaleDomain = yScale.range();
  const [yMax, yMin] = yScaleDomain;

  const barWidth = xScale.bandwidth();

  return (
    <SvgRect
      fill={theme.color.bgLine}
      height={yMax - yMin}
      width={barWidth}
      x={xScale(scrubberPosition)}
      y={yMin}
    />
  );
});

const BarChartStories = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <UpdatingChartValues />
      </Example>
      <Example title="Positive and Negative Cash Flow">
        <PositiveAndNegativeCashFlow />
      </Example>
      {/*<Example title="Fiat & Stablecoin Balance">
        <FiatAndStablecoinBalance />
      </Example>
      <Example title="Monthly Rewards">
        <MonthlyRewards />
      </Example>
      <Example title="Multiple Y Axes">
        <MultipleYAxes />
      </Example>
      <Example title="Candlestick Chart">
        <Candlesticks />
      </Example>*/}
    </ExampleScreen>
  );
};

export default BarChartStories;
