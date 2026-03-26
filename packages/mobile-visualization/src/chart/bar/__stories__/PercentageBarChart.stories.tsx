import { useCallback, useMemo, useState } from 'react';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';

import { PercentageBarChart, type PercentageBarChartSegment } from '../PercentageBarChart';

const defaultSeries: PercentageBarChartSegment[] = [
  { id: 'a', value: 70, label: 'Segment A', color: 'var(--color-fgPositive)' },
  { id: 'b', value: 30, label: 'Segment B', color: 'var(--color-fgCaution)' },
];

const Basic = () => (
  <VStack gap={2}>
    <PercentageBarChart
      height={24}
      series={defaultSeries}
      testID="percentage-bar-basic"
      width={400}
    />
  </VStack>
);

const TaxesStyleConfirmedVsNeedReview = () => {
  const series: PercentageBarChartSegment[] = [
    {
      id: 'confirmed',
      value: 28,
      label: 'Confirmed',
      color: 'var(--color-fgPositive)',
    },
    {
      id: 'need-review',
      value: 2,
      label: 'Need review',
      color: 'var(--color-fgCaution)',
    },
  ];

  return (
    <VStack gap={1.5}>
      <Text color="fgMuted" font="body">
        Estimated gain: +$30,000
      </Text>
      <PercentageBarChart
        legend
        borderRadius={3}
        height={24}
        legendPosition="bottom"
        series={series}
        stackGap={0}
        testID="percentage-bar-taxes"
        width={400}
      />
    </VStack>
  );
};

const CustomColors = () => (
  <PercentageBarChart
    animate={false}
    height={32}
    series={[
      { id: 'blue', value: 40, color: 'var(--color-accentBoldBlue)' },
      { id: 'green', value: 35, color: 'var(--color-accentBoldGreen)' },
      { id: 'orange', value: 25, color: 'var(--color-accentBoldOrange)' },
    ]}
    testID="percentage-bar-custom-colors"
    width={400}
  />
);

const SingleSegment = () => (
  <PercentageBarChart
    animate={false}
    height={24}
    series={[{ id: 'full', value: 100, color: 'var(--color-fgPrimary)' }]}
    testID="percentage-bar-single"
    width={400}
  />
);

const WithLegend = () => {
  const series: PercentageBarChartSegment[] = [
    { id: 'buy', value: 76, label: 'Bought', color: 'var(--color-fgPositive)' },
    { id: 'sell', value: 24, label: 'Sold', color: 'var(--color-fgNegative)' },
  ];

  return (
    <PercentageBarChart
      legend
      borderRadius={3}
      height={24}
      legendPosition="bottom"
      series={series}
      testID="percentage-bar-with-legend"
      width={400}
    />
  );
};

const NoAnimation = () => (
  <PercentageBarChart
    animate={false}
    height={24}
    series={defaultSeries}
    testID="percentage-bar-no-animation"
    width={400}
  />
);

const WithPercentageAxis = () => (
  <PercentageBarChart
    showXAxis
    borderRadius={6}
    height={48}
    series={[
      { id: 'btc', value: 55, label: 'BTC', color: 'var(--color-accentBoldOrange)' },
      { id: 'eth', value: 30, label: 'ETH', color: 'var(--color-accentBoldBlue)' },
      { id: 'other', value: 15, label: 'Other', color: 'var(--color-fgMuted)' },
    ]}
    testID="percentage-bar-with-axis"
    width={400}
    xAxis={{ requestedTickCount: 5 }}
  />
);

const MultiGroup = () => (
  <VStack gap={1.5}>
    <Text color="fgMuted" font="body">
      Each row is one category; segment values are normalized to 100% within that category.
    </Text>
    <PercentageBarChart
      legend
      showXAxis
      showYAxis
      borderRadius={6}
      height={200}
      series={[
        {
          id: 'q1-btc',
          value: 55,
          label: 'BTC',
          color: 'var(--color-fgWarning)',
          category: 'Q1',
        },
        {
          id: 'q1-eth',
          value: 30,
          label: 'ETH',
          color: 'var(--color-accentBoldPurple)',
          category: 'Q1',
        },
        {
          id: 'q1-other',
          value: 15,
          label: 'Other',
          color: 'var(--color-fgMuted)',
          category: 'Q1',
        },
        {
          id: 'q2-btc',
          value: 40,
          label: 'BTC',
          color: 'var(--color-fgWarning)',
          category: 'Q2',
        },
        {
          id: 'q2-eth',
          value: 45,
          label: 'ETH',
          color: 'var(--color-accentBoldPurple)',
          category: 'Q2',
        },
        {
          id: 'q2-other',
          value: 15,
          label: 'Other',
          color: 'var(--color-fgMuted)',
          category: 'Q2',
        },
      ]}
      stackGap={4}
      testID="percentage-bar-multi-group"
      width={400}
      yAxis={{ position: 'left', categoryPadding: 0.1 }}
    />
  </VStack>
);

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
        component: <Basic />,
      },
      {
        title: 'Taxes Style: Confirmed vs Need Review',
        component: <TaxesStyleConfirmedVsNeedReview />,
      },
      {
        title: 'Custom Colors',
        component: <CustomColors />,
      },
      {
        title: 'Single Segment',
        component: <SingleSegment />,
      },
      {
        title: 'With Legend',
        component: <WithLegend />,
      },
      {
        title: 'No Animation',
        component: <NoAnimation />,
      },
      {
        title: 'With Percentage Axis',
        component: <WithPercentageAxis />,
      },
      {
        title: 'Multi-Group',
        component: <MultiGroup />,
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
