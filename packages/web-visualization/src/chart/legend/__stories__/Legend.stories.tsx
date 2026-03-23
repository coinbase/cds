import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Chip } from '@coinbase/cds-web/chips';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { XAxis, YAxis } from '../../axis';
import { BarChart, type BarComponentProps, BarPlot, DefaultBar } from '../../bar';
import { CartesianChart } from '../../CartesianChart';
import { useCartesianChartContext } from '../../ChartProvider';
import { LineChart } from '../../line';
import { Scrubber } from '../../scrubber';
import { useScrubberContext } from '../../utils';
import type { LegendShapeVariant, Series } from '../../utils/chart';
import { DefaultLegendShape } from '../DefaultLegendShape';
import { Legend, type LegendEntryProps } from '../Legend';

export default {
  component: Legend,
  title: 'Components/Chart/Legend',
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

const spectrumColors = [
  'blue',
  'green',
  'orange',
  'yellow',
  'gray',
  'indigo',
  'pink',
  'purple',
  'red',
  'teal',
  'chartreuse',
];

const shapes: LegendShapeVariant[] = ['pill', 'circle', 'squircle', 'square'];

const Shapes = () => {
  return (
    <Example title="Shapes">
      <VStack gap={2}>
        {shapes.map((shape) => (
          <HStack key={shape} gap={1}>
            {spectrumColors.map((color) => (
              <Box key={color} justifyContent="center" style={{ width: 10 }}>
                <DefaultLegendShape color={`rgb(var(--${color}40))`} shape={shape} />
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </Example>
  );
};

const Basic = () => {
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

  return (
    <Example title="Basic Legend">
      <LineChart
        enableScrubbing
        legend
        showArea
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 225, desktop: 250 }}
        legendPosition="right"
        series={[
          {
            id: 'pageViews',
            data: pageViews,
            color: 'rgb(var(--green40))',
            label: 'Page Views',
          },
          {
            id: 'uniqueVisitors',
            data: uniqueVisitors,
            color: 'rgb(var(--purple40))',
            label: 'Unique Visitors',
            areaType: 'dotted',
          },
        ]}
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
    </Example>
  );
};

const AutoScale = () => {
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
      id: 'ohioValley',
      label: 'Ohio Valley',
      data: [4.74, 1.83, 3.1, 5.42, 5.69, 3.29, 5.02, 2.57, 4.13, 0.79, 4.31, 3.67],
      color: 'rgb(var(--orange40))',
    },
    {
      id: 'southeast',
      label: 'Southeast',
      data: [5.48, 3.11, 5.73, 2.97, 5.45, 3.28, 7.18, 5.67, 7.93, 1.33, 2.69, 3.21],
      color: 'rgb(var(--yellow40))',
    },
    {
      id: 'northernRockiesAndPlains',
      label: 'Northern Rockies and Plains',
      data: [0.64, 1.01, 1.06, 2.12, 3.34, 2.65, 1.54, 1.89, 0.95, 0.57, 1.23, 0.67],
      color: 'rgb(var(--indigo40))',
    },
    {
      id: 'south',
      label: 'South',
      data: [4.19, 1.79, 2.93, 3.84, 5.25, 3.4, 4.27, 1.84, 3.08, 0.52, 4.5, 2.62],
      color: 'rgb(var(--pink40))',
    },
    {
      id: 'southwest',
      label: 'Southwest',
      data: [1.12, 1.5, 1.52, 0.75, 0.76, 1.27, 1.44, 2.01, 0.62, 1.08, 1.23, 0.25],
      color: 'rgb(var(--purple40))',
    },
    {
      id: 'northwest',
      label: 'Northwest',
      data: [5.69, 3.67, 3.32, 1.95, 2.08, 1.31, 0.28, 0.81, 0.95, 2.03, 5.45, 5.8],
      color: 'rgb(var(--red40))',
    },
    {
      id: 'west',
      label: 'West',
      data: [3.39, 4.7, 3.09, 1.07, 0.55, 0.12, 0.23, 0.26, 0.22, 0.4, 2.7, 2.54],
      color: 'rgb(var(--teal40))',
    },
  ];

  const xAxisData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Example title="Auto Scale">
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
      </LineChart>
    </Example>
  );
};

const Position = () => {
  return (
    <Example title="Position">
      <CartesianChart
        height={{ base: 150, tablet: 200, desktop: 250 }}
        inset={{ bottom: 8, left: 0, right: 0, top: 8 }}
        legend={<Legend justifyContent="flex-end" />}
        legendPosition="bottom"
        series={[
          {
            id: 'revenue',
            label: 'Revenue',
            data: [455, 520, 380, 455, 285, 235],
            yAxisId: 'revenue',
            color: 'rgb(var(--yellow40))',
            legendShape: 'squircle',
          },
          {
            id: 'profitMargin',
            label: 'Profit Margin',
            data: [23, 20, 16, 38, 12, 9],
            yAxisId: 'profitMargin',
            color: 'var(--color-fgPositive)',
            legendShape: 'squircle',
          },
        ]}
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
    </Example>
  );
};

const ShapeVariants = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <Example title="Shape Variants">
      <LineChart
        legend
        showArea
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        legendPosition="left"
        series={[
          {
            id: 'pill',
            label: 'Pill',
            data: [120, 150, 130, 170, 160, 190],
            color: 'rgb(var(--blue40))',
            legendShape: 'pill',
          },
          {
            id: 'circle',
            label: 'Circle',
            data: [80, 110, 95, 125, 115, 140],
            color: 'rgb(var(--green40))',
            legendShape: 'circle',
          },
          {
            id: 'square',
            label: 'Square',
            data: [60, 85, 70, 100, 90, 115],
            color: 'rgb(var(--orange40))',
            legendShape: 'square',
          },
          {
            id: 'squircle',
            label: 'Squircle',
            data: [40, 60, 50, 75, 65, 85],
            color: 'rgb(var(--purple40))',
            legendShape: 'squircle',
          },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true }}
      />
    </Example>
  );
};

const DynamicData = () => {
  const timeLabels = [
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

  const series: Series[] = [
    {
      id: 'candidate-a',
      label: 'Candidate A',
      data: [48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38],
      color: 'rgb(var(--blue40))',
      legendShape: 'circle',
    },
    {
      id: 'candidate-b',
      label: 'Candidate B',
      data: [null, null, null, 6, 10, 14, 18, 22, 26, 29, 32, 35],
      color: 'rgb(var(--orange40))',
      legendShape: 'circle',
    },
    {
      id: 'candidate-c',
      label: 'Candidate C',
      data: [52, 53, 54, 49, 46, 43, 40, 37, 34, 32, 30, 27],
      color: 'rgb(var(--gray40))',
      legendShape: 'circle',
    },
  ];

  const ValueLegendEntry = memo(function ValueLegendEntry({
    seriesId,
    label,
    color,
    shape,
  }: LegendEntryProps) {
    const { scrubberPosition } = useScrubberContext();
    const { series, dataLength } = useCartesianChartContext();

    const dataIndex = scrubberPosition ?? dataLength - 1;

    const seriesData = series.find((s) => s.id === seriesId);
    const rawValue = seriesData?.data?.[dataIndex];

    const formattedValue =
      rawValue === null || rawValue === undefined ? '--' : `${Math.round(rawValue as number)}%`;

    return (
      <HStack alignItems="center" gap={1}>
        <DefaultLegendShape color={color} shape={shape} />
        <Text font="label2">{label}</Text>
        <Text tabularNumbers font="label1">
          {formattedValue}
        </Text>
      </HStack>
    );
  });

  return (
    <Example title="Dynamic Data">
      <LineChart
        enableScrubbing
        showArea
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        legend={
          <Legend EntryComponent={ValueLegendEntry} justifyContent="flex-start" paddingX={2} />
        }
        legendPosition="top"
        series={series}
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
    </Example>
  );
};

const Interactive = () => {
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
        baseColor: '--blue',
      },
      {
        id: 'expenses',
        label: 'Expenses',
        data: [80, 95, 110, 105, 120, 130, 145, 140, 155, 165, 180, 195],
        baseColor: '--orange',
      },
      {
        id: 'profit',
        label: 'Profit',
        data: [40, 55, 70, 60, 70, 80, 95, 80, 105, 115, 130, 155],
        baseColor: '--green',
      },
    ],
    [],
  );

  const handleToggle = useCallback((seriesId: string) => {
    setEmphasizedId((prev) => (prev === seriesId ? null : seriesId));
  }, []);

  const ChipLegendEntry = memo(function ChipLegendEntry({ seriesId, label }: LegendEntryProps) {
    const chipRef = useRef<HTMLButtonElement>(null);
    const isEmphasized = emphasizedId === seriesId;
    const config = seriesConfig.find((s) => s.id === seriesId);
    const baseColor = config?.baseColor ?? '--gray';

    // Restore focus when chip becomes emphasized
    useEffect(() => {
      if (isEmphasized && chipRef.current) {
        chipRef.current.focus();
      }
    }, [isEmphasized]);

    return (
      <Chip
        ref={chipRef}
        compact
        aria-label={`${isEmphasized ? 'Remove emphasis from' : 'Emphasize'} ${label} series`}
        aria-pressed={isEmphasized}
        invertColorScheme={isEmphasized}
        onClick={() => handleToggle(seriesId)}
        style={{
          backgroundColor: `rgb(var(${baseColor}10))`,
          borderWidth: 0,
          color: 'var(--color-fg)',
          outlineColor: `rgb(var(${baseColor}50))`,
        }}
      >
        <HStack alignItems="center" gap={1}>
          <DefaultLegendShape color={`rgb(var(${baseColor}50))`} />
          <Text font="label2">{label}</Text>
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
        color: `rgb(var(${config.baseColor}40))`,
        opacity: isDimmed ? 0.3 : 1,
      };
    });
  }, [emphasizedId, seriesConfig]);

  return (
    <Example title="Interactive Legend">
      <LineChart
        showArea
        showXAxis
        showYAxis
        height={{ base: 300, tablet: 350, desktop: 400 }}
        legend={<Legend EntryComponent={ChipLegendEntry} gap={1} paddingTop={1} />}
        legendPosition="top"
        series={series}
        xAxis={{
          data: months,
        }}
        yAxis={{
          domain: { min: 0 },
          showGrid: true,
          tickLabelFormatter: (value) => `$${value}k`,
        }}
      />
    </Example>
  );
};

const Accessible = () => {
  const months = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);

  const chartAccessibilityLabel =
    'Monthly financial performance chart showing revenue and expenses over 6 months.';

  return (
    <Example title="Accessible Legend">
      <LineChart
        legend
        showArea
        showXAxis
        showYAxis
        accessibilityLabel={chartAccessibilityLabel}
        height={{ base: 200, tablet: 225, desktop: 250 }}
        legendAccessibilityLabel="Financial performance chart, legend"
        legendPosition="bottom"
        series={[
          {
            id: 'revenue',
            label: 'Revenue',
            data: [120, 150, 180, 165, 190, 210],
            color: 'rgb(var(--green40))',
          },
          {
            id: 'expenses',
            label: 'Expenses',
            data: [80, 95, 110, 105, 120, 130],
            color: 'rgb(var(--orange40))',
          },
        ]}
        xAxis={{ data: months }}
        yAxis={{ domain: { min: 0 }, showGrid: true }}
      />
    </Example>
  );
};

const LegendShapes = () => {
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
  const patternId = useId();
  const maskId = useId();
  const legendPatternId = useId();

  // Custom legend indicator that matches the dotted bar pattern
  const DottedLegendIndicator = (
    <svg height={10} viewBox="0 0 10 10" width={10}>
      <defs>
        <pattern
          height={patternSize / 2}
          id={legendPatternId}
          patternUnits="userSpaceOnUse"
          width={patternSize / 2}
        >
          <circle cx={patternSize / 4} cy={patternSize / 4} fill="white" r={dotSize / 2} />
        </pattern>
        <mask id={`${legendPatternId}-mask`}>
          <rect fill={`url(#${legendPatternId})`} height={8} rx={2} width={8} x={1} y={1} />
        </mask>
      </defs>
      <g mask={`url(#${legendPatternId}-mask)`}>
        <rect fill="var(--color-fgPositive)" height={8} rx={2} width={8} x={1} y={1} />
      </g>
      <rect
        fill="transparent"
        height={8}
        rx={2}
        stroke="var(--color-fgPositive)"
        strokeWidth={2}
        width={8}
        x={1}
        y={1}
      />
    </svg>
  );

  // Custom bar component that renders bars with dotted pattern fill
  const DottedBarComponent = memo<BarComponentProps>((props) => {
    const { dataX, x, y } = props;
    // Create unique IDs per bar so patterns are scoped to each bar
    const uniqueMaskId = `${maskId}-${dataX}`;
    const uniquePatternId = `${patternId}-${dataX}`;
    return (
      <>
        <defs>
          {/* Pattern positioned relative to this bar's origin */}
          <pattern
            height={patternSize}
            id={uniquePatternId}
            patternUnits="userSpaceOnUse"
            width={patternSize}
            x={x}
            y={y}
          >
            <circle cx={patternSize / 2} cy={patternSize / 2} fill="white" r={dotSize} />
          </pattern>
          <mask id={uniqueMaskId}>
            <DefaultBar {...props} fill={`url(#${uniquePatternId})`} />
          </mask>
        </defs>
        <g mask={`url(#${uniqueMaskId})`}>
          <DefaultBar {...props} />
        </g>
        <DefaultBar {...props} fill="transparent" stroke={props.fill} strokeWidth={4} />
      </>
    );
  });

  return (
    <Example title="Legend Shapes">
      <BarChart
        legend
        showXAxis
        showYAxis
        height={{ base: 200, tablet: 250, desktop: 300 }}
        inset={0}
        legendPosition="top"
        series={[
          {
            id: 'actual',
            label: 'Historical',
            data: actualRevenue,
            color: 'var(--color-fgPositive)',
            legendShape: 'squircle',
            stackId: 'revenue',
          },
          {
            id: 'forecast',
            label: 'Forecasted',
            data: forecastRevenue,
            color: 'var(--color-fgPositive)',
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
    </Example>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Shapes />
      <Basic />
      <AutoScale />
      <Position />
      <ShapeVariants />
      <DynamicData />
      <Interactive />
      <LegendShapes />
      <Accessible />
    </VStack>
  );
};
