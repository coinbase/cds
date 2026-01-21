import { memo, useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { Chip } from '@coinbase/cds-mobile/chips';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { TextLabel1, TextLabel2 } from '@coinbase/cds-mobile/typography';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import { Canvas, Group, Path as SkiaPath, Skia } from '@shopify/react-native-skia';

import { XAxis, YAxis } from '../../axis';
import type { BarComponentProps } from '../../bar';
import { BarChart, BarPlot, DefaultBar } from '../../bar';
import { CartesianChart } from '../../CartesianChart';
import { LineChart } from '../../line';
import { Scrubber } from '../../scrubber';
import type { LegendShapeVariant, Series } from '../../utils/chart';
import { getDottedAreaPath } from '../../utils/path';
import { DefaultLegendShape } from '../DefaultLegendShape';
import { Legend, type LegendEntryProps } from '../Legend';

const spectrumColors = [
  'blue40',
  'green40',
  'orange40',
  'yellow40',
  'gray40',
  'indigo40',
  'pink40',
  'purple40',
  'red40',
  'teal40',
];

const shapes: LegendShapeVariant[] = ['pill', 'circle', 'squircle', 'square'];

const Shapes = () => {
  const theme = useTheme();

  return (
    <VStack gap={2}>
      {shapes.map((shape) => (
        <HStack key={shape} gap={1}>
          {spectrumColors.map((color) => (
            <Box key={color} style={{ width: 10, justifyContent: 'center' }}>
              <DefaultLegendShape
                color={`rgb(${theme.spectrum[color as keyof typeof theme.spectrum]})`}
                shape={shape}
              />
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

const BasicLegend = () => {
  const theme = useTheme();
  const pages = useMemo(
    () => ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
    [],
  );
  const pageViews = useMemo(() => [2400, 1398, 9800, 3908, 4800, 3800, 4300], []);
  const uniqueVisitors = useMemo(() => [4000, 3000, 2000, 2780, 1890, 2390, 3490], []);

  const numberFormatter = useCallback(
    (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value),
    [],
  );

  const chartAccessibilityLabel = `Website traffic across ${pages.length} pages showing page views and unique visitors.`;

  return (
    <LineChart
      enableScrubbing
      legend
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      height={150}
      legendPosition="right"
      series={[
        {
          id: 'pageViews',
          data: pageViews,
          color: `rgb(${theme.spectrum.green40})`,
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: uniqueVisitors,
          color: `rgb(${theme.spectrum.purple40})`,
          label: 'Unique Visitors',
          areaType: 'dotted',
        },
      ]}
      width="100%"
      xAxis={{
        data: pages,
      }}
      yAxis={{
        showGrid: true,
        tickLabelFormatter: numberFormatter,
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

const Position = () => {
  const theme = useTheme();

  return (
    <CartesianChart
      height={200}
      inset={{ bottom: 8, left: 0, right: 0, top: 8 }}
      legend={<Legend justifyContent="flex-end" />}
      legendPosition="bottom"
      series={[
        {
          id: 'revenue',
          label: 'Revenue',
          data: [455, 520, 380, 455, 285, 235],
          yAxisId: 'revenue',
          color: `rgb(${theme.spectrum.yellow40})`,
          legendShape: 'squircle',
        },
        {
          id: 'profitMargin',
          label: 'Profit Margin',
          data: [23, 20, 16, 38, 12, 9],
          yAxisId: 'profitMargin',
          color: theme.color.fgPositive,
          legendShape: 'squircle',
        },
      ]}
      width="100%"
      xAxis={{
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        scaleType: 'band',
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
};

const ShapeVariants = () => {
  const theme = useTheme();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <LineChart
      legend
      showArea
      height={200}
      legendPosition="left"
      series={[
        {
          id: 'pill',
          label: 'Pill',
          data: [120, 150, 130, 170, 160, 190],
          color: `rgb(${theme.spectrum.blue40})`,
          legendShape: 'pill',
        },
        {
          id: 'circle',
          label: 'Circle',
          data: [80, 110, 95, 125, 115, 140],
          color: `rgb(${theme.spectrum.green40})`,
          legendShape: 'circle',
        },
        {
          id: 'square',
          label: 'Square',
          data: [60, 85, 70, 100, 90, 115],
          color: `rgb(${theme.spectrum.orange40})`,
          legendShape: 'square',
        },
        {
          id: 'squircle',
          label: 'Squircle',
          data: [40, 60, 50, 75, 65, 85],
          color: `rgb(${theme.spectrum.purple40})`,
          legendShape: 'squircle',
        },
      ]}
      width="100%"
      xAxis={{ data: months }}
      yAxis={{ domain: { min: 0 }, showGrid: true }}
    />
  );
};

const DynamicData = () => {
  const theme = useTheme();
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>();

  const timeLabels = useMemo(
    () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [],
  );

  const seriesConfig: Series[] = useMemo(
    () => [
      {
        id: 'candidate-a',
        label: 'Candidate A',
        data: [48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38],
        color: `rgb(${theme.spectrum.blue40})`,
        legendShape: 'circle',
      },
      {
        id: 'candidate-b',
        label: 'Candidate B',
        data: [null, null, null, 6, 10, 14, 18, 22, 26, 29, 32, 35],
        color: `rgb(${theme.spectrum.orange40})`,
        legendShape: 'circle',
      },
      {
        id: 'candidate-c',
        label: 'Candidate C',
        data: [52, 53, 54, 49, 46, 43, 40, 37, 34, 32, 30, 27],
        color: `rgb(${theme.spectrum.gray40})`,
        legendShape: 'circle',
      },
    ],
    [theme.spectrum.blue40, theme.spectrum.gray40, theme.spectrum.orange40],
  );

  const dataLength = seriesConfig[0].data?.length ?? 0;
  const dataIndex = scrubberPosition ?? dataLength - 1;

  const chartAccessibilityLabel = `Candidate polling data over ${timeLabels.length} months showing support percentages for 3 candidates.`;

  const ValueLegendEntry = useCallback(
    ({ seriesId, label, color, shape }: LegendEntryProps) => {
      const seriesData = seriesConfig.find((s) => s.id === seriesId);
      const rawValue = seriesData?.data?.[dataIndex];

      const formattedValue =
        rawValue === null || rawValue === undefined ? '--' : `${Math.round(rawValue as number)}%`;

      return (
        <HStack gap={1} style={{ alignItems: 'center' }}>
          <DefaultLegendShape color={color} shape={shape} />
          <TextLabel2>{label}</TextLabel2>
          <TextLabel1>{formattedValue}</TextLabel1>
        </HStack>
      );
    },
    [seriesConfig, dataIndex],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      height={250}
      legend={<Legend EntryComponent={ValueLegendEntry} justifyContent="flex-start" paddingX={2} />}
      legendPosition="top"
      onScrubberPositionChange={setScrubberPosition}
      series={seriesConfig}
      width="100%"
      xAxis={{
        data: timeLabels,
      }}
      yAxis={{
        domain: { max: 100, min: 0 },
        showGrid: true,
        tickLabelFormatter: (value) => `${value}%`,
      }}
    >
      <Scrubber />
    </LineChart>
  );
};

const Interactive = () => {
  const theme = useTheme();
  const [emphasizedId, setEmphasizedId] = useState<string | null>(null);

  const months = [
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

  const seriesConfig = useMemo(
    () => [
      {
        id: 'revenue',
        label: 'Revenue',
        data: [120, 150, 180, 165, 190, 210, 240, 220, 260, 280, 310, 350],
        baseColor: 'blue',
      },
      {
        id: 'expenses',
        label: 'Expenses',
        data: [80, 95, 110, 105, 120, 130, 145, 140, 155, 165, 180, 195],
        baseColor: 'orange',
      },
      {
        id: 'profit',
        label: 'Profit',
        data: [40, 55, 70, 60, 70, 80, 95, 80, 105, 115, 130, 155],
        baseColor: 'green',
      },
    ],
    [],
  );

  const handleToggle = useCallback((seriesId: string) => {
    setEmphasizedId((prev) => (prev === seriesId ? null : seriesId));
  }, []);

  const ChipLegendEntry = memo(function ChipLegendEntry({ seriesId, label }: LegendEntryProps) {
    const isEmphasized = emphasizedId === seriesId;
    const config = seriesConfig.find((s) => s.id === seriesId);
    const baseColor = config?.baseColor ?? 'gray';

    const color10 = theme.spectrum[`${baseColor}10` as keyof typeof theme.spectrum];
    const color50 = theme.spectrum[`${baseColor}50` as keyof typeof theme.spectrum];
    const color90 = theme.spectrum[`${baseColor}90` as keyof typeof theme.spectrum];

    return (
      <Chip
        compact
        accessibilityLabel={`${isEmphasized ? 'Remove emphasis from' : 'Emphasize'} ${label} series`}
        background="transparent"
        onPress={() => handleToggle(seriesId)}
        style={{
          backgroundColor: `rgb(${isEmphasized ? color90 : color10})`,
          borderWidth: 0,
          borderRadius: theme.borderRadius[1000],
        }}
      >
        <HStack gap={1} style={{ alignItems: 'center' }}>
          <DefaultLegendShape color={`rgb(${color50})`} />
          <TextLabel2 color={isEmphasized ? 'bg' : 'fg'}>{label}</TextLabel2>
        </HStack>
      </Chip>
    );
  });

  const series = useMemo(() => {
    return seriesConfig.map((config) => {
      const isEmphasized = emphasizedId === config.id;
      const isDimmed = emphasizedId !== null && !isEmphasized;

      return {
        id: config.id,
        label: config.label,
        data: config.data,
        color: `rgb(${theme.spectrum[`${config.baseColor}40` as keyof typeof theme.spectrum]})`,
        opacity: isDimmed ? 0.3 : 1,
      };
    });
  }, [emphasizedId, seriesConfig, theme]);

  return (
    <LineChart
      showArea
      height={300}
      legend={<Legend EntryComponent={ChipLegendEntry} gap={1} paddingTop={1} />}
      legendPosition="top"
      series={series}
      width="100%"
      xAxis={{
        data: months,
      }}
      yAxis={{
        domain: { min: 0 },
        showGrid: true,
        tickLabelFormatter: (value) => `$${value}k`,
      }}
    />
  );
};

const Accessible = () => {
  const theme = useTheme();
  const months = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);

  return (
    <LineChart
      legend
      showArea
      height={200}
      legendAccessibilityLabel="Financial performance chart, legend"
      legendPosition="bottom"
      series={[
        {
          id: 'revenue',
          label: 'Revenue',
          data: [120, 150, 180, 165, 190, 210],
          color: `rgb(${theme.spectrum.green40})`,
        },
        {
          id: 'expenses',
          label: 'Expenses',
          data: [80, 95, 110, 105, 120, 130],
          color: `rgb(${theme.spectrum.orange40})`,
        },
      ]}
      width="100%"
      xAxis={{ data: months }}
      yAxis={{ domain: { min: 0 }, showGrid: true }}
    />
  );
};

const LegendShapes = () => {
  const theme = useTheme();
  const months = [
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

  // Actual revenue (first 9 months)
  const actualRevenue = [320, 380, 420, 390, 450, 480, 520, 490, 540, null, null, null];

  // Forecasted revenue (last 3 months)
  const forecastRevenue = [null, null, null, null, null, null, null, null, null, 580, 620, 680];

  const numberFormatter = useCallback(
    (value: number) =>
      `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}k`,
    [],
  );

  // Pattern settings for dotted fill
  const patternSize = 4;
  const dotSize = 1;

  // Custom legend indicator that matches the dotted bar pattern
  const DottedLegendIndicator = useMemo(() => {
    // Create a small dotted pattern for the legend indicator
    const indicatorSize = 10;
    const legendPatternSize = patternSize / 2;
    const legendDotSize = dotSize / 2;
    const dottedPath = getDottedAreaPath(
      { x: 1, y: 1, width: indicatorSize - 2, height: indicatorSize - 2 },
      legendPatternSize,
      legendDotSize,
    );
    const skiaPath = Skia.Path.MakeFromSVGString(dottedPath);
    // Create squircle path for clipping
    const squirclePath = Skia.Path.Make();
    squirclePath.addRRect(Skia.RRectXY(Skia.XYWHRect(1, 1, 8, 8), 2, 2));

    return (
      <Canvas style={{ width: indicatorSize, height: indicatorSize }}>
        <Group clip={squirclePath}>
          {skiaPath && <SkiaPath color={theme.color.fgPositive} path={skiaPath} style="fill" />}
        </Group>
        <SkiaPath
          color={theme.color.fgPositive}
          path={squirclePath}
          strokeWidth={2}
          style="stroke"
        />
      </Canvas>
    );
  }, [theme.color.fgPositive]);

  // Custom bar component that renders bars with dotted pattern fill
  const DottedBarComponent = useMemo(() => {
    return memo<BarComponentProps>(function DottedBar(props) {
      const { x, y, width, height, fill, d } = props;

      // Generate dotted path for this bar's bounds
      const dottedPath = useMemo(() => {
        return getDottedAreaPath({ x, y, width, height }, patternSize, dotSize);
      }, [x, y, width, height]);

      // Create Skia paths
      const barClipPath = useMemo(() => {
        return d ? (Skia.Path.MakeFromSVGString(d) ?? undefined) : undefined;
      }, [d]);

      const dotsSkiaPath = useMemo(() => {
        return Skia.Path.MakeFromSVGString(dottedPath) ?? undefined;
      }, [dottedPath]);

      return (
        <>
          {/* Dotted fill clipped to bar shape */}
          <Group clip={barClipPath}>
            {dotsSkiaPath && <SkiaPath color={fill} path={dotsSkiaPath} style="fill" />}
          </Group>
          {/* Stroke outline */}
          <DefaultBar {...props} fill={undefined} stroke={fill} strokeWidth={2} />
        </>
      );
    });
  }, []);

  return (
    <BarChart
      legend
      showXAxis
      showYAxis
      height={250}
      inset={0}
      legendPosition="top"
      series={[
        {
          id: 'actual',
          label: 'Historical',
          data: actualRevenue,
          color: theme.color.fgPositive,
          legendShape: 'squircle',
          stackId: 'revenue',
        },
        {
          id: 'forecast',
          label: 'Forecasted',
          data: forecastRevenue,
          color: theme.color.fgPositive,
          legendShape: DottedLegendIndicator,
          stackId: 'revenue',
          BarComponent: DottedBarComponent,
        },
      ]}
      xAxis={{
        data: months,
        scaleType: 'band',
        showLine: true,
        showTickMarks: true,
      }}
      yAxis={{
        domain: { min: 0 },
        showGrid: true,
        showLine: true,
        showTickMarks: true,
        position: 'left',
        tickLabelFormatter: numberFormatter,
        width: 60,
      }}
    />
  );
};

const LegendStories = () => {
  return (
    <ScrollView>
      <ExampleScreen>
        <Example title="Shapes">
          <Shapes />
        </Example>
        <Example title="Basic Legend">
          <BasicLegend />
        </Example>
        <Example title="Position">
          <Position />
        </Example>
        <Example title="Shape Variants">
          <ShapeVariants />
        </Example>
        <Example title="Dynamic Data">
          <DynamicData />
        </Example>
        <Example title="Interactive Legend">
          <Interactive />
        </Example>
        <Example title="Legend Shapes">
          <LegendShapes />
        </Example>
        <Example title="Accessible Legend">
          <Accessible />
        </Example>
      </ExampleScreen>
    </ScrollView>
  );
};

export default LegendStories;
