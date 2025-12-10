import { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@coinbase/cds-mobile';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { TextLabel1, TextLabel2 } from '@coinbase/cds-mobile/typography';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { DonutChart } from '../../DonutChart';
import { LineChart } from '../../line';
import { PieChart } from '../../pie';
import type { LegendShapeVariant } from '../../utils/chart';
import type { LegendItemProps } from '../DefaultLegendItem';
import { DefaultLegendShape } from '../DefaultLegendShape';
import { Legend } from '../Legend';

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

  return (
    <VStack gap={2}>
      <LineChart
        legend
        showArea
        height={400}
        legendPosition="bottom"
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
          },
        ]}
        width="100%"
        xAxis={{
          data: pages,
        }}
      />
    </VStack>
  );
};

const ShapeVariants = () => {
  const theme = useTheme();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <VStack gap={2}>
      <LineChart
        showArea
        height={200}
        legend={<Legend flexDirection="column" />}
        legendPosition="bottom"
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
      />
    </VStack>
  );
};

const PieChartLegend = () => {
  const theme = useTheme();

  const series = [
    {
      id: 'stocks',
      data: 45,
      label: 'Stocks',
      color: `rgb(${theme.spectrum.blue40})`,
      legendShape: 'circle' as const,
    },
    {
      id: 'bonds',
      data: 25,
      label: 'Bonds',
      color: `rgb(${theme.spectrum.green40})`,
      legendShape: 'circle' as const,
    },
    {
      id: 'realEstate',
      data: 15,
      label: 'Real Estate',
      color: `rgb(${theme.spectrum.orange40})`,
      legendShape: 'circle' as const,
    },
    {
      id: 'commodities',
      data: 10,
      label: 'Commodities',
      color: `rgb(${theme.spectrum.purple40})`,
      legendShape: 'circle' as const,
    },
    {
      id: 'cash',
      data: 5,
      label: 'Cash',
      color: `rgb(${theme.spectrum.gray40})`,
      legendShape: 'circle' as const,
    },
  ];

  return (
    <VStack gap={2}>
      <Text font="headline">Portfolio Allocation</Text>
      <PieChart
        height={150}
        legend={<Legend flexDirection="column" />}
        legendPosition="right"
        series={series}
        width={300}
      />
    </VStack>
  );
};

const DonutChartLegend = () => {
  const theme = useTheme();

  const series = [
    {
      id: 'completed',
      data: 68,
      label: 'Completed',
      color: theme.color.fgPositive,
      legendShape: 'squircle' as const,
    },
    {
      id: 'inProgress',
      data: 22,
      label: 'In Progress',
      color: `rgb(${theme.spectrum.blue40})`,
      legendShape: 'squircle' as const,
    },
    {
      id: 'pending',
      data: 10,
      label: 'Pending',
      color: `rgb(${theme.spectrum.gray40})`,
      legendShape: 'squircle' as const,
    },
  ];

  return (
    <VStack gap={2}>
      <Text font="headline">Task Status</Text>
      <DonutChart legend height={150} legendPosition="bottom" series={series} width={150} />
    </VStack>
  );
};

const CustomLegendItem = () => {
  const theme = useTheme();

  const CustomItem = memo<LegendItemProps>(function CustomItem({ label, color, shape }) {
    return (
      <HStack gap={1} style={{ alignItems: 'center' }}>
        <DefaultLegendShape color={color} shape={shape} />
        <TextLabel2>{label}</TextLabel2>
        <TextLabel1>100%</TextLabel1>
      </HStack>
    );
  });

  return (
    <VStack gap={2}>
      <Text font="headline">Custom Legend Item</Text>
      <DonutChart
        height={150}
        legend={<Legend ItemComponent={CustomItem} />}
        legendPosition="bottom"
        series={[
          {
            id: 'btc',
            data: 60,
            label: 'Bitcoin',
            color: `rgb(${theme.spectrum.orange40})`,
          },
          {
            id: 'eth',
            data: 30,
            label: 'Ethereum',
            color: `rgb(${theme.spectrum.purple40})`,
          },
          {
            id: 'other',
            data: 10,
            label: 'Other',
            color: `rgb(${theme.spectrum.gray40})`,
          },
        ]}
        width={150}
      />
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
      { title: 'Shapes', component: <Shapes /> },
      { title: 'Basic Legend', component: <BasicLegend /> },
      { title: 'Shape Variants', component: <ShapeVariants /> },
      { title: 'Pie Chart Legend', component: <PieChartLegend /> },
      { title: 'Donut Chart Legend', component: <DonutChartLegend /> },
      { title: 'Custom Legend Item', component: <CustomLegendItem /> },
    ],
    [],
  );

  const currentExample = examples[currentIndex];
  const isFirstExample = currentIndex === 0;
  const isLastExample = currentIndex === examples.length - 1;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(examples.length - 1, prev + 1));
  }, [examples.length]);

  return (
    <ExampleScreen>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" padding={2}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            disabled={isFirstExample}
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center" gap={1}>
            <Text font="title3">{currentExample.title}</Text>
            <TextLabel1 color="fgMuted">
              {currentIndex + 1} / {examples.length}
            </TextLabel1>
          </VStack>
          <IconButton
            accessibilityHint="Navigate to next example"
            accessibilityLabel="Next"
            disabled={isLastExample}
            name="arrowRight"
            onPress={handleNext}
            variant="secondary"
          />
        </HStack>
        <Box alignItems="center" padding={2}>
          {currentExample.component}
        </Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
