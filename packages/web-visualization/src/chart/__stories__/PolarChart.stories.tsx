import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { IconButton } from '@coinbase/cds-web/buttons';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { usePolarChartContext } from '../ChartProvider';
import { DonutChart } from '../DonutChart';
import { Arc, PieChart, PiePlot, type PieSliceEventData } from '../pie';
import { PolarChart } from '../PolarChart';
import { getArcPath } from '../utils';

export default {
  component: PolarChart,
  title: 'Components/Chart/PolarChart',
};

const DonutCenterLabel = memo<{ children: React.ReactNode }>(({ children }) => {
  const { drawingArea } = usePolarChartContext();

  if (!drawingArea.width || !drawingArea.height) return;

  const centerX = drawingArea.x + drawingArea.width / 2;
  const centerY = drawingArea.y + drawingArea.height / 2;

  return (
    <text
      dominantBaseline="middle"
      fill="var(--color-fgPrimary)"
      fontSize={24}
      fontWeight="bold"
      textAnchor="middle"
      x={centerX}
      y={centerY}
    >
      {children}
    </text>
  );
});

const BasicPieChart = () => {
  const theme = useTheme();

  return (
    <PieChart
      animate
      height={200}
      inset={0}
      series={[
        { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.green40})` },
        { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
      ]}
      width={200}
    />
  );
};

const BasicDonutChart = () => {
  const theme = useTheme();

  return (
    <DonutChart
      animate
      height={200}
      innerRadiusRatio={0.6}
      inset={0}
      series={[
        { id: 'card', data: 15, label: 'Card', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'cash', data: 45, label: 'Cash', color: `rgb(${theme.spectrum.green40})` },
        { id: 'stake', data: 12, label: 'Stake', color: `rgb(${theme.spectrum.orange40})` },
        { id: 'lend', data: 18, label: 'Lend', color: `rgb(${theme.spectrum.teal40})` },
      ]}
      width={200}
    />
  );
};

const DonutWithCenterLabel = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      angularAxis={{ paddingAngle: 0 }}
      height={200}
      inset={0}
      radialAxis={{ range: ({ max }) => ({ min: max * 0.7, max }) }}
      series={[
        { id: 'teal', data: 10, label: 'Other', color: `rgb(${theme.spectrum.teal40})` },
        { id: 'blue', data: 25, label: 'Bitcoin', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'purple', data: 20, label: 'Ethereum', color: `rgb(${theme.spectrum.purple40})` },
        { id: 'pink', data: 15, label: 'Solana', color: `rgb(${theme.spectrum.pink40})` },
        { id: 'orange', data: 30, label: 'USDC', color: `rgb(${theme.spectrum.orange40})` },
      ]}
      width={200}
    >
      <PiePlot cornerRadius={4} stroke="none" />
      <DonutCenterLabel>$1,234</DonutCenterLabel>
    </PolarChart>
  );
};

const SemicircleDonut = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      angularAxis={{ range: { min: -90, max: 90 } }}
      height={150}
      inset={0}
      radialAxis={{ range: ({ max }) => ({ min: max * 0.6, max }) }}
      series={[
        { id: 'a', data: 35, label: 'Complete', color: `rgb(${theme.spectrum.green40})` },
        { id: 'b', data: 65, label: 'Remaining', color: `rgb(${theme.spectrum.gray30})` },
      ]}
      width={200}
    >
      <PiePlot cornerRadius={8} strokeWidth={0} />
    </PolarChart>
  );
};

const PieWithPadding = () => {
  const theme = useTheme();

  return (
    <PieChart
      animate
      angularAxis={{ paddingAngle: 4 }}
      height={200}
      inset={0}
      series={[
        { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.purple40})` },
        { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
      ]}
      width={200}
    />
  );
};

const CustomStyledPie = () => {
  const theme = useTheme();

  return (
    <PieChart
      animate
      cornerRadius={8}
      height={200}
      inset={0}
      series={[
        { id: 'a', data: 25, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'b', data: 25, label: 'B', color: `rgb(${theme.spectrum.green40})` },
        { id: 'c', data: 25, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
        { id: 'd', data: 25, label: 'D', color: `rgb(${theme.spectrum.purple40})` },
      ]}
      stroke="var(--color-bg)"
      strokeWidth={3}
      width={200}
    />
  );
};

const InteractiveDonutChart = () => {
  const theme = useTheme();
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

  const series = useMemo(
    () => [
      { id: 'btc', data: 40, label: 'Bitcoin', color: `rgb(${theme.spectrum.orange40})` },
      { id: 'eth', data: 30, label: 'Ethereum', color: `rgb(${theme.spectrum.blue40})` },
      { id: 'sol', data: 15, label: 'Solana', color: `rgb(${theme.spectrum.purple40})` },
      { id: 'other', data: 15, label: 'Other', color: `rgb(${theme.spectrum.gray30})` },
    ],
    [theme],
  );

  const total = series.reduce((sum, s) => sum + s.data, 0);
  const selectedData = selectedSlice ? series.find((s) => s.id === selectedSlice) : null;

  const handleSliceClick = useCallback((data: PieSliceEventData) => {
    setSelectedSlice((prev) => (prev === data.id ? null : data.id));
  }, []);

  return (
    <VStack alignItems="center" gap={4}>
      <Box height={200} position="relative" width={200}>
        <PolarChart
          animate
          height={200}
          inset={0}
          radialAxis={{ range: ({ max }) => ({ min: max * 0.65, max }) }}
          series={series.map((s) => ({
            ...s,
            color: selectedSlice && selectedSlice !== s.id ? `${s.color}80` : s.color,
          }))}
          width={200}
        >
          <PiePlot cursor="pointer" onSliceClick={handleSliceClick} />
        </PolarChart>
        <Box
          alignItems="center"
          bottom={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          left={0}
          position="absolute"
          right={0}
          style={{ pointerEvents: 'none' }}
          top={0}
        >
          <Text color="fgMuted" font="label1">
            {selectedData ? selectedData.label : 'Total'}
          </Text>
          <Text font="headline">
            {selectedData ? `${Math.round((selectedData.data / total) * 100)}%` : '$12,345'}
          </Text>
        </Box>
      </Box>
    </VStack>
  );
};

const AnimatedDataChange = () => {
  const theme = useTheme();
  const [dataSet, setDataSet] = useState(0);

  const dataSets = [
    [
      { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
      { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.green40})` },
      { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
    ],
    [
      { id: 'a', data: 60, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
      { id: 'b', data: 20, label: 'B', color: `rgb(${theme.spectrum.green40})` },
      { id: 'c', data: 20, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
    ],
    [
      { id: 'a', data: 15, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
      { id: 'b', data: 55, label: 'B', color: `rgb(${theme.spectrum.green40})` },
      { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
    ],
  ];

  return (
    <VStack alignItems="center" gap={4}>
      <DonutChart
        animate
        height={200}
        innerRadiusRatio={0.5}
        inset={0}
        series={dataSets[dataSet]}
        width={200}
      />
      <HStack gap={2}>
        <IconButton
          accessibilityLabel="Previous data set"
          name="caretLeft"
          onClick={() => setDataSet((prev) => (prev - 1 + dataSets.length) % dataSets.length)}
          variant="secondary"
        />
        <Text font="label1">Data Set {dataSet + 1}</Text>
        <IconButton
          accessibilityLabel="Next data set"
          name="caretRight"
          onClick={() => setDataSet((prev) => (prev + 1) % dataSets.length)}
          variant="secondary"
        />
      </HStack>
    </VStack>
  );
};

const NestedRings = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      height={250}
      inset={0}
      radialAxis={[
        { id: 'inner', range: ({ max }) => ({ min: 0, max: max * 0.35 }) },
        { id: 'outer', range: ({ max }) => ({ min: max * 0.45, max }) },
      ]}
      series={[
        // Inner ring
        {
          id: 'inner-a',
          data: 60,
          radialAxisId: 'inner',
          color: `rgb(${theme.spectrum.blue40})`,
        },
        {
          id: 'inner-b',
          data: 40,
          radialAxisId: 'inner',
          color: `rgb(${theme.spectrum.blue60})`,
        },
        // Outer ring
        {
          id: 'outer-a',
          data: 30,
          radialAxisId: 'outer',
          color: `rgb(${theme.spectrum.green40})`,
        },
        {
          id: 'outer-b',
          data: 25,
          radialAxisId: 'outer',
          color: `rgb(${theme.spectrum.green50})`,
        },
        {
          id: 'outer-c',
          data: 20,
          radialAxisId: 'outer',
          color: `rgb(${theme.spectrum.green60})`,
        },
        {
          id: 'outer-d',
          data: 25,
          radialAxisId: 'outer',
          color: `rgb(${theme.spectrum.green70})`,
        },
      ]}
      width={250}
    >
      <PiePlot cornerRadius={4} radialAxisId="inner" strokeWidth={0} />
      <PiePlot cornerRadius={4} radialAxisId="outer" strokeWidth={0} />
    </PolarChart>
  );
};

// Helper component for rewards background arcs
const RewardsBackgroundArcs = memo<{
  innerRadiusRatio: number;
  startAngleDegrees: number;
  firstSectionEnd: number;
  secondSectionStart: number;
  secondSectionEnd: number;
  thirdSectionStart: number;
  thirdSectionEnd: number;
}>(
  ({
    innerRadiusRatio,
    startAngleDegrees,
    firstSectionEnd,
    secondSectionStart,
    secondSectionEnd,
    thirdSectionStart,
    thirdSectionEnd,
  }) => {
    const theme = useTheme();
    const { drawingArea } = usePolarChartContext();

    const { innerRadius, outerRadius } = useMemo(() => {
      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      return {
        innerRadius: r * innerRadiusRatio,
        outerRadius: r,
      };
    }, [drawingArea, innerRadiusRatio]);

    const sections = useMemo(
      () => [
        {
          startAngle: (startAngleDegrees * Math.PI) / 180,
          endAngle: (firstSectionEnd * Math.PI) / 180,
        },
        {
          startAngle: (secondSectionStart * Math.PI) / 180,
          endAngle: (secondSectionEnd * Math.PI) / 180,
        },
        {
          startAngle: (thirdSectionStart * Math.PI) / 180,
          endAngle: (thirdSectionEnd * Math.PI) / 180,
        },
      ],
      [
        startAngleDegrees,
        firstSectionEnd,
        secondSectionStart,
        secondSectionEnd,
        thirdSectionStart,
        thirdSectionEnd,
      ],
    );

    return (
      <>
        {sections.map((section, i) => (
          <Arc
            key={i}
            animate={false}
            cornerRadius={100}
            endAngle={section.endAngle}
            fill={theme.color.fgMuted}
            fillOpacity={0.25}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={0}
            startAngle={section.startAngle}
          />
        ))}
      </>
    );
  },
);

// Helper component for rewards clipped progress
const RewardsClippedProgress = memo<{
  innerRadiusRatio: number;
  startAngleDegrees: number;
  firstSectionEnd: number;
  secondSectionStart: number;
  secondSectionEnd: number;
  thirdSectionStart: number;
  thirdSectionEnd: number;
}>(
  ({
    innerRadiusRatio,
    startAngleDegrees,
    firstSectionEnd,
    secondSectionStart,
    secondSectionEnd,
    thirdSectionStart,
    thirdSectionEnd,
  }) => {
    const { drawingArea } = usePolarChartContext();

    const clipPathId = useMemo(() => {
      return `rewards-clip-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const clipPath = useMemo(() => {
      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      const innerRadius = r * innerRadiusRatio;
      const outerRadius = r;

      const sections = [
        {
          startAngle: (startAngleDegrees * Math.PI) / 180,
          endAngle: (firstSectionEnd * Math.PI) / 180,
        },
        {
          startAngle: (secondSectionStart * Math.PI) / 180,
          endAngle: (secondSectionEnd * Math.PI) / 180,
        },
        {
          startAngle: (thirdSectionStart * Math.PI) / 180,
          endAngle: (thirdSectionEnd * Math.PI) / 180,
        },
      ];

      return sections
        .map((section) =>
          getArcPath({
            startAngle: section.startAngle,
            endAngle: section.endAngle,
            innerRadius,
            outerRadius,
            cornerRadius: 100,
          }),
        )
        .join(' ');
    }, [
      drawingArea,
      innerRadiusRatio,
      startAngleDegrees,
      firstSectionEnd,
      secondSectionStart,
      secondSectionEnd,
      thirdSectionStart,
      thirdSectionEnd,
    ]);

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            <path d={clipPath} transform={`translate(${centerX}, ${centerY})`} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipPathId})`}>
          <PiePlot cornerRadius={100} strokeWidth={0} />
        </g>
      </>
    );
  },
);

const CoinbaseOneRewardsChart = () => {
  const theme = useTheme();

  const innerRadiusRatio = 0.75;
  const angleEachSideGap = (45 / 4) * 3;
  const startAngleDegrees = angleEachSideGap - 180;
  const endAngleDegrees = 180 - angleEachSideGap;
  const angleGapDegrees = 5;
  const totalGapDegrees = angleGapDegrees * 2;
  const gapBetweenDegrees = totalGapDegrees / 3;
  const sectionLengthDegrees = (endAngleDegrees - startAngleDegrees) / 3 - gapBetweenDegrees;

  const firstSectionEnd = startAngleDegrees + sectionLengthDegrees;
  const secondSectionStart = firstSectionEnd + gapBetweenDegrees;
  const secondSectionEnd = secondSectionStart + sectionLengthDegrees;
  const thirdSectionStart = secondSectionEnd + gapBetweenDegrees;
  const thirdSectionEnd = thirdSectionStart + sectionLengthDegrees;
  const progressAngle = -45;

  return (
    <PolarChart
      animate
      angularAxis={{ range: { min: startAngleDegrees, max: progressAngle } }}
      height={200}
      inset={0}
      radialAxis={{ range: ({ max }) => ({ min: innerRadiusRatio * max, max }) }}
      series={[{ id: 'progress', data: 100, label: 'Progress', color: theme.color.fg }]}
      width={200}
    >
      <RewardsBackgroundArcs
        firstSectionEnd={firstSectionEnd}
        innerRadiusRatio={innerRadiusRatio}
        secondSectionEnd={secondSectionEnd}
        secondSectionStart={secondSectionStart}
        startAngleDegrees={startAngleDegrees}
        thirdSectionEnd={thirdSectionEnd}
        thirdSectionStart={thirdSectionStart}
      />
      <RewardsClippedProgress
        firstSectionEnd={firstSectionEnd}
        innerRadiusRatio={innerRadiusRatio}
        secondSectionEnd={secondSectionEnd}
        secondSectionStart={secondSectionStart}
        startAngleDegrees={startAngleDegrees}
        thirdSectionEnd={thirdSectionEnd}
        thirdSectionStart={thirdSectionStart}
      />
    </PolarChart>
  );
};

export const Default = () => (
  <VStack gap={6}>
    <Text font="headline">Pie Charts</Text>
    <HStack gap={6}>
      <VStack alignItems="center" gap={2}>
        <BasicPieChart />
        <Text color="fgMuted" font="label2">
          Basic Pie
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <PieWithPadding />
        <Text color="fgMuted" font="label2">
          With Padding
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <CustomStyledPie />
        <Text color="fgMuted" font="label2">
          Custom Styled
        </Text>
      </VStack>
    </HStack>

    <Text font="headline">Donut Charts</Text>
    <HStack gap={6}>
      <VStack alignItems="center" gap={2}>
        <BasicDonutChart />
        <Text color="fgMuted" font="label2">
          Basic Donut
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <DonutWithCenterLabel />
        <Text color="fgMuted" font="label2">
          Center Label
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <SemicircleDonut />
        <Text color="fgMuted" font="label2">
          Semicircle
        </Text>
      </VStack>
    </HStack>

    <Text font="headline">Advanced Examples</Text>
    <HStack gap={6}>
      <VStack alignItems="center" gap={2}>
        <InteractiveDonutChart />
        <Text color="fgMuted" font="label2">
          Interactive
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <AnimatedDataChange />
        <Text color="fgMuted" font="label2">
          Data Animation
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <NestedRings />
        <Text color="fgMuted" font="label2">
          Nested Rings
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <CoinbaseOneRewardsChart />
        <Text color="fgMuted" font="label2">
          Coinbase One Rewards
        </Text>
      </VStack>
    </HStack>
  </VStack>
);

export const Pie = () => <BasicPieChart />;
export const Donut = () => <BasicDonutChart />;
export const WithCenterLabel = () => <DonutWithCenterLabel />;
export const Semicircle = () => <SemicircleDonut />;
export const Interactive = () => <InteractiveDonutChart />;
export const Animated = () => <AnimatedDataChange />;
export const Nested = () => <NestedRings />;
export const CoinbaseOneRewards = () => <CoinbaseOneRewardsChart />;
