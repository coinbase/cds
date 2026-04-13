import { memo, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';
import { Line as SkiaLine, Rect } from '@shopify/react-native-skia';

import { XAxis, YAxis } from '../../axis';
import { CartesianChart, type CartesianChartProps } from '../../CartesianChart';
import { useCartesianChartContext } from '../../ChartProvider';
import { DefaultLegendEntry } from '../../legend';
import { type LineComponentProps, ReferenceLine, SolidLine, type SolidLineProps } from '../../line';
import { Scrubber } from '../../scrubber';
import { getPointOnSerializableScale, unwrapAnimatedValue, useScrubberContext } from '../../utils';
import type { BarComponentProps } from '../Bar';
import { Bar } from '../Bar';
import { BarChart, type BarChartProps } from '../BarChart';
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
        origin={props.y}
        width={diameter}
        x={props.x}
        y={props.y - diameter}
      />
    );
  }

  return <DefaultBarStack {...props}>{children}</DefaultBarStack>;
});

const MonthlyRewards = () => {
  const theme = useTheme();
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const purple = [null, 6, 8, 10, 7, 6, 6, 8, null, null, null, null];
  const blue = [null, 10, 12, 11, 10, 9, 10, 11, null, null, null, null];
  const cyan = [null, 7, 10, 12, 11, 10, 8, 11, null, null, null, null];
  const green = [10, null, null, null, 1, null, null, 6, null, null, null, null];

  const [roundBaseline, setRoundBaseline] = useState(true);

  const series = [
    { id: 'purple', data: purple, color: `rgb(${theme.spectrum.purple30})` },
    { id: 'blue', data: blue, color: `rgb(${theme.spectrum.blue30})` },
    { id: 'cyan', data: cyan, color: `rgb(${theme.spectrum.teal30})` },
    { id: 'green', data: green, color: `rgb(${theme.spectrum.green30})` },
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
          categoryPadding: 0.25,
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

// --- Composed Examples ---

const candlestickStockData = btcCandles.slice(0, 90).reverse();

const CandlesticksHeader = memo(({ currentIndex }: { currentIndex: number | undefined }) => {
  const formatPrice = useCallback((price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  }, []);

  const formatThousandsPriceNumber = useCallback((price: number) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 1000);

    return `${formattedPrice}k`;
  }, []);

  const currentText = useMemo(() => {
    if (currentIndex !== undefined) {
      return `Open: ${formatThousandsPriceNumber(parseFloat(candlestickStockData[currentIndex].open))}, Close: ${formatThousandsPriceNumber(
        parseFloat(candlestickStockData[currentIndex].close),
      )}, Volume: ${(parseFloat(candlestickStockData[currentIndex].volume) / 1000).toFixed(2)}k`;
    }
    return formatPrice(candlestickStockData[candlestickStockData.length - 1].close);
  }, [currentIndex, formatThousandsPriceNumber, formatPrice]);

  return (
    <Text aria-live="polite" font="headline">
      {currentText}
    </Text>
  );
});

const CandlesticksChart = memo(
  ({
    infoTextId,
    onScrubberPositionChange,
  }: {
    infoTextId: string;
    onScrubberPositionChange: (index: number | undefined) => void;
  }) => {
    const theme = useTheme();
    const min = useMemo(
      () => Math.min(...candlestickStockData.map((data) => parseFloat(data.low))),
      [],
    );

    const CandleThinSolidLine = memo((props: SolidLineProps) => (
      <SolidLine {...props} strokeWidth={1} />
    ));

    const BandwidthHighlight = memo(({ stroke }: LineComponentProps) => {
      const { getXSerializableScale, drawingArea } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);

      const rectWidth = useMemo(() => {
        if (xScale !== undefined && xScale.type === 'band') {
          return xScale.bandwidth;
        }
        return 0;
      }, [xScale]);

      const xPos = useDerivedValue(() => {
        const position = unwrapAnimatedValue(scrubberPosition);
        const xPos =
          position !== undefined && xScale
            ? getPointOnSerializableScale(position, xScale)
            : undefined;
        return xPos !== undefined ? xPos - rectWidth / 2 : 0;
      }, [scrubberPosition, xScale]);

      const opacity = useDerivedValue(() => (xPos.value !== undefined ? 1 : 0), [xPos]);

      return (
        <Rect
          color={stroke}
          height={drawingArea.height}
          opacity={opacity}
          width={rectWidth}
          x={xPos}
          y={drawingArea.y}
        />
      );
    });

    const candlesData = useMemo(
      () =>
        candlestickStockData.map((data) => [parseFloat(data.low), parseFloat(data.high)]) as [
          number,
          number,
        ][],
      [],
    );

    const CandlestickBarComponent = memo<BarComponentProps>(
      ({ x, y, width, height, dataX, ...props }) => {
        const { getYScale } = useCartesianChartContext();
        const yScale = getYScale();

        const wickX = x + width / 2;

        const timePeriodValue = candlestickStockData[dataX as number];

        const open = parseFloat(timePeriodValue.open);
        const close = parseFloat(timePeriodValue.close);

        const bullish = open < close;
        const theme = useTheme();
        const color = bullish ? theme.color.fgPositive : theme.color.fgNegative;
        const openY = yScale?.(open) ?? 0;
        const closeY = yScale?.(close) ?? 0;

        const bodyHeight = Math.abs(openY - closeY);
        const bodyY = openY < closeY ? openY : closeY;

        return (
          <>
            <SkiaLine
              color={color}
              p1={{ x: wickX, y }}
              p2={{ x: wickX, y: y + height }}
              strokeWidth={1}
            />
            <Rect color={color} height={bodyHeight} width={width} x={x} y={bodyY} />
          </>
        );
      },
    );

    const formatThousandsPriceNumber = useCallback((price: number) => {
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price / 1000);

      return `${formattedPrice}k`;
    }, []);

    const formatTime = useCallback((index: number | null) => {
      if (index === null || index === undefined || index >= candlestickStockData.length) return '';
      const ts = parseInt(candlestickStockData[index].start);
      return new Date(ts * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }, []);

    const getScrubberAccessibilityLabel = useCallback(
      (index: number) => {
        const candle = candlestickStockData[index];
        return `${formatTime(index)}: O ${formatThousandsPriceNumber(parseFloat(candle.open))} H ${formatThousandsPriceNumber(parseFloat(candle.high))} L ${formatThousandsPriceNumber(parseFloat(candle.low))} C ${formatThousandsPriceNumber(parseFloat(candle.close))}`;
      },
      [formatTime, formatThousandsPriceNumber],
    );

    return (
      <CartesianChart
        enableScrubbing
        accessibilityLabel={`Candlestick chart with ${candlesData.length} data points. Swipe to navigate.`}
        animate={false}
        aria-labelledby={infoTextId}
        borderRadius={0}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={150}
        inset={{ top: 8, bottom: 8, left: 0, right: 0 }}
        onScrubberPositionChange={onScrubberPositionChange}
        series={[
          {
            id: 'stock-prices',
            data: candlesData,
          },
        ]}
        xAxis={{
          scaleType: 'band',
        }}
        yAxis={{
          domain: { min },
        }}
      >
        <XAxis tickLabelFormatter={formatTime} />
        <YAxis
          showGrid
          GridLineComponent={CandleThinSolidLine}
          tickLabelFormatter={formatThousandsPriceNumber}
          width={40}
        />
        <Scrubber
          hideOverlay
          LineComponent={BandwidthHighlight}
          lineStroke={theme.color.fgMuted}
          seriesIds={[]}
        />
        <BarPlot
          BarComponent={CandlestickBarComponent}
          BarStackComponent={({ children }) => <>{children}</>}
        />
      </CartesianChart>
    );
  },
);

const Candlesticks = () => {
  const infoTextId = useId();
  const [currentIndex, setCurrentIndex] = useState<number | undefined>();

  return (
    <VStack gap={2}>
      <CandlesticksHeader currentIndex={currentIndex} />
      <CandlesticksChart infoTextId={infoTextId} onScrubberPositionChange={setCurrentIndex} />
    </VStack>
  );
};

const DAY_LENGTH_MINUTES = 1440;

type SunlightChartData = Array<{
  label: string;
  value: number;
}>;

const sunlightData: SunlightChartData = [
  { label: 'Jan', value: 598 },
  { label: 'Feb', value: 635 },
  { label: 'Mar', value: 688 },
  { label: 'Apr', value: 753 },
  { label: 'May', value: 812 },
  { label: 'Jun', value: 855 },
  { label: 'Jul', value: 861 },
  { label: 'Aug', value: 828 },
  { label: 'Sep', value: 772 },
  { label: 'Oct', value: 710 },
  { label: 'Nov', value: 648 },
  { label: 'Dec', value: 605 },
];

const SunlightChartInner = memo(
  ({
    data,
    height = 300,
    ...props
  }: Omit<CartesianChartProps, 'series' | 'children'> & { data: SunlightChartData }) => {
    const theme = useTheme();

    const SunlightThinSolidLine = memo((props: SolidLineProps) => (
      <SolidLine {...props} strokeWidth={1} />
    ));

    return (
      <CartesianChart
        {...props}
        height={height}
        series={[
          {
            id: 'sunlight',
            data: data.map(({ value }) => value),
            yAxisId: 'sunlight',
            color: `rgb(${theme.spectrum.yellow40})`,
          },
          {
            id: 'day',
            data: data.map(() => DAY_LENGTH_MINUTES),
            yAxisId: 'day',
            color: `rgb(${theme.spectrum.blue100})`,
          },
        ]}
        xAxis={{
          ...props.xAxis,
          scaleType: 'band',
          data: data.map(({ label }) => label),
        }}
        yAxis={[
          {
            id: 'day',
            domain: { min: 0, max: DAY_LENGTH_MINUTES },
            domainLimit: 'strict',
          },
          {
            id: 'sunlight',
            domain: { min: 0, max: DAY_LENGTH_MINUTES },
            domainLimit: 'strict',
          },
        ]}
      >
        <YAxis
          showGrid
          showLine
          GridLineComponent={SunlightThinSolidLine}
          axisId="day"
          position="left"
        />
        <XAxis showLine />
        <BarPlot seriesIds={['day']} transitions={{ enter: null }} />
        <BarPlot
          borderRadius={0}
          seriesIds={['sunlight']}
          transitions={{
            enter: { type: 'spring', stiffness: 700, damping: 40, staggerDelay: 1000 },
          }}
        />
      </CartesianChart>
    );
  },
);

const SunlightChart = () => {
  return (
    <VStack gap={2}>
      <SunlightChartInner data={sunlightData} />
      <Text color="fgMuted" font="caption" textAlign="center">
        2026 Sunlight data for the first day of each month in Atlanta, Georgia, provided by NOAA.
      </Text>
    </VStack>
  );
};

const PriceRange = () => {
  const candles = btcCandles.slice(0, 180).reverse();
  const data: [number, number][] = useMemo(
    () => candles.map((candle) => [parseFloat(candle.low), parseFloat(candle.high)]),
    [candles],
  );

  const min = useMemo(() => Math.min(...data.map(([low]) => low)), [data]);
  const max = useMemo(() => Math.max(...data.map(([, high]) => high)), [data]);

  const tickFormatter = useCallback(
    (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 0,
      }).format(value),
    [],
  );

  return (
    <BarChart
      showYAxis
      height={150}
      series={[{ id: 'prices', data, color: assets.btc.color }]}
      yAxis={{ domain: { min, max }, showGrid: true, tickLabelFormatter: tickFormatter }}
    />
  );
};

const HorizontalBarChart = () => {
  const labels = ['BTC', 'ETH', 'SOL', 'ADA'];
  const allocation = [42, 28, 18, 12];

  return (
    <BarChart
      showXAxis
      showYAxis
      height={220}
      layout="horizontal"
      series={[{ id: 'allocation', data: allocation, color: assets.btc.color }]}
      xAxis={{ domain: { min: 0, max: 50 }, tickLabelFormatter: (value) => `${value}%` }}
      yAxis={{ data: labels, scaleType: 'band' }}
    />
  );
};

function BuyVsSellExample() {
  function BuyVsSellLegend({ buy, sell }: { buy: number; sell: number }) {
    const theme = useTheme();
    return (
      <HStack gap={1} justifyContent="space-between">
        <DefaultLegendEntry
          color={theme.color.fgPositive}
          label={
            <Text color="fgMuted" font="legal">
              {buy}% bought
            </Text>
          }
          seriesId="buy"
        />
        <DefaultLegendEntry
          color={theme.color.fgNegative}
          label={
            <Text color="fgMuted" font="legal">
              {sell}% sold
            </Text>
          }
          seriesId="sell"
        />
      </HStack>
    );
  }

  function BuyVsSellChart({
    buy,
    sell,
    animate = true,
    borderRadius = 3,
    height = 6,
    inset = 0,
    layout = 'horizontal',
    stackGap = 4,
    xAxis,
    yAxis,
    barMinSize = height,
    ...props
  }: Omit<BarChartProps, 'series' | 'height'> & { buy: number; sell: number; height?: number }) {
    const theme = useTheme();
    return (
      <VStack gap={1.5}>
        <BarChart
          roundBaseline
          stacked
          animate={animate}
          barMinSize={barMinSize}
          borderRadius={borderRadius}
          height={height}
          inset={inset}
          layout={layout}
          series={[
            {
              id: 'buy',
              data: [buy],
              color: theme.color.fgPositive,
              legendShape: 'circle',
            },
            {
              id: 'sell',
              data: [sell],
              color: theme.color.fgNegative,
              legendShape: 'circle',
            },
          ]}
          stackGap={stackGap}
          xAxis={{ domainLimit: 'strict', ...xAxis }}
          yAxis={{ categoryPadding: 0, ...yAxis }}
          {...props}
        />
        <BuyVsSellLegend buy={buy} sell={sell} />
      </VStack>
    );
  }

  return <BuyVsSellChart buy={76} sell={24} />;
}

const PopulationPyramid = () => {
  const theme = useTheme();

  const ageGroups = [
    '100+ yrs',
    '95-99 yrs',
    '90-94 yrs',
    '85-89 yrs',
    '80-84 yrs',
    '75-79 yrs',
    '70-74 yrs',
    '65-69 yrs',
    '60-64 yrs',
    '55-59 yrs',
    '50-54 yrs',
    '45-49 yrs',
    '40-44 yrs',
    '35-39 yrs',
    '30-34 yrs',
    '25-29 yrs',
    '20-24 yrs',
    '15-19 yrs',
    '10-14 yrs',
    '5-9 yrs',
    '0-4 yrs',
  ];

  const malePopulation = [
    14587, 48604, 83560, 128957, 184152, 248505, 498683, 706420, 852333, 939629, 1002195, 1001264,
    960282, 1161371, 1105023, 1061755, 1019343, 1023264, 1026330, 984773, 944071,
  ];

  const femalePopulation = [
    14122, 46974, 80768, 124663, 178043, 240293, 482271, 683270, 824525, 909115, 969807, 969070,
    929571, 1122380, 1068050, 1026356, 985483, 989404, 992505, 952453, 913222,
  ];

  const numberWithSuffixFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        notation: 'compact',
      }),
    [],
  );

  const tickLabelFormatter = useCallback(
    (value: number) => numberWithSuffixFormatter.format(Math.abs(value)),
    [numberWithSuffixFormatter],
  );

  const domainSymmetric = useCallback((bounds: { min: number; max: number }) => {
    const extremum = Math.max(-bounds.min, bounds.max);
    const roundedExtremum = Math.ceil(extremum / 100_000) * 100_000;
    return { min: -roundedExtremum, max: roundedExtremum };
  }, []);

  const series = [
    {
      id: 'male',
      label: 'Male',
      data: malePopulation.map((population) => -population),
      color: `rgb(${theme.spectrum.blue40})`,
      stackId: 'population',
    },
    {
      id: 'female',
      label: 'Female',
      data: femalePopulation,
      color: `rgb(${theme.spectrum.pink40})`,
      stackId: 'population',
    },
  ];

  return (
    <VStack gap={2}>
      <BarChart
        showXAxis
        showYAxis
        stacked
        borderRadius={2}
        height={550}
        inset={0}
        layout="horizontal"
        series={series}
        xAxis={{
          domain: domainSymmetric,
          GridLineComponent: ThinSolidLine,
          showGrid: true,
          showLine: true,
          showTickMarks: true,
          tickLabelFormatter,
        }}
        yAxis={{
          bandTickMarkPlacement: 'edges',
          data: ageGroups,
          position: 'left',
          showLine: true,
          showTickMarks: true,
          width: 80,
        }}
      >
        <ReferenceLine LineComponent={SolidLine} dataX={0} />
      </BarChart>
    </VStack>
  );
};

type ExampleItem = {
  title: string;
  component: React.ReactNode;
};

function ExampleNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      {
        title: 'Basic',
        component: <UpdatingChartValues />,
      },
      {
        title: 'Animated Auto-Updating',
        component: <AnimatedUpdatingChartValues />,
      },
      {
        title: 'Negative Values with Top Axis',
        component: <NegativeValuesWithTopAxis />,
      },
      {
        title: 'Positive and Negative Cash Flow',
        component: <PositiveAndNegativeCashFlow />,
      },
      {
        title: 'Fiat & Stablecoin Balance',
        component: <FiatAndStablecoinBalance />,
      },
      {
        title: 'Monthly Rewards',
        component: <MonthlyRewards />,
      },
      {
        title: 'Multiple Y Axes',
        component: <MultipleYAxes />,
      },
      {
        title: 'Y-Axis Continuous ColorMap',
        component: <YAxisContinuousColorMap />,
      },
      {
        title: 'Y-Axis Discrete ColorMap',
        component: <YAxisDiscreteColorMap />,
      },
      {
        title: 'X-Axis Continuous ColorMap',
        component: <XAxisContinuousColorMap />,
      },
      {
        title: 'X-Axis Discrete ColorMap',
        component: <XAxisDiscreteColorMap />,
      },
      {
        title: 'X-Axis Multi-Segment ColorMap',
        component: <XAxisMultiSegmentColorMap />,
      },
      {
        title: 'ColorMap with Opacity',
        component: <ColorMapWithOpacity />,
      },
      {
        title: 'Band Grid Position',
        component: (
          <VStack gap={2}>
            <BandGridPositionExample position="edges" />
            <BandGridPositionExample position="start" />
            <BandGridPositionExample position="middle" />
            <BandGridPositionExample position="end" />
          </VStack>
        ),
      },
      {
        title: 'Candlesticks',
        component: <Candlesticks />,
      },
      {
        title: 'Monthly Sunlight',
        component: <SunlightChart />,
      },
      {
        title: 'Price Range',
        component: <PriceRange />,
      },
      {
        title: 'Horizontal Layout',
        component: <HorizontalBarChart />,
      },
      {
        title: 'Buy vs Sell',
        component: <BuyVsSellExample />,
      },
      {
        title: 'Population Pyramid',
        component: <PopulationPyramid />,
      },
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
        <Box padding={1}>{currentExample.component}</Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
