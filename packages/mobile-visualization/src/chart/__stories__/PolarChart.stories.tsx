import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@coinbase/cds-mobile';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { TextLabel1 } from '@coinbase/cds-mobile/typography';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import { Rect } from '@shopify/react-native-skia';

import { usePolarChartContext } from '../ChartProvider';
import { DonutChart } from '../DonutChart';
import { Arc, PieChart, PiePlot } from '../pie';
import { PolarChart } from '../PolarChart';
import { ChartText, type ChartTextProps } from '../text';
import { getArcPath } from '../utils';

const DonutCenterLabel = memo<Omit<ChartTextProps, 'x' | 'y'>>(({ children, ...props }) => {
  const { drawingArea } = usePolarChartContext();

  if (drawingArea.width <= 0 || drawingArea.height <= 0) return;

  const centerX = drawingArea.x + drawingArea.width / 2;
  const centerY = drawingArea.y + drawingArea.height / 2;

  return (
    <ChartText {...props} x={centerX} y={centerY}>
      {children}
    </ChartText>
  );
});

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

    return <PiePlot clipPathId={clipPath} cornerRadius={100} strokeWidth={0} />;
  },
);

const VariableRadiusPieArcs = memo(() => {
  const theme = useTheme();
  const { drawingArea } = usePolarChartContext();

  const data = useMemo(
    () => [
      { id: 'a', value: 2548, color: `rgb(${theme.spectrum.blue40})` },
      { id: 'b', value: 1754, color: `rgb(${theme.spectrum.purple40})` },
      { id: 'c', value: 390, color: `rgb(${theme.spectrum.orange40})` },
      { id: 'd', value: 250, color: `rgb(${theme.spectrum.green40})` },
      { id: 'e', value: 280, color: `rgb(${theme.spectrum.teal40})` },
    ],
    [theme],
  );

  const maxRadius = Math.min(drawingArea.width, drawingArea.height) / 2;
  const minRadius = maxRadius * 0.5;
  const maxValue = Math.max(...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const arcs = useMemo(() => {
    let currentAngle = 0; // Start at 3 o'clock (0°)
    return data.map((d) => {
      const angleSpan = (d.value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angleSpan;
      currentAngle = endAngle;

      const outerRadius = minRadius + (d.value / maxValue) * (maxRadius - minRadius);

      return {
        startAngle,
        endAngle,
        innerRadius: 0,
        outerRadius,
        paddingAngle: 0,
        id: d.id,
        color: d.color,
      };
    });
  }, [data, total, maxValue, minRadius, maxRadius]);

  return (
    <>
      {arcs.map((arc) => (
        <Arc
          key={arc.id}
          cornerRadius={0}
          endAngle={arc.endAngle}
          fill={arc.color}
          innerRadius={arc.innerRadius}
          outerRadius={arc.outerRadius}
          paddingAngle={arc.paddingAngle}
          startAngle={arc.startAngle}
          stroke={theme.color.bg}
          strokeWidth={2}
        />
      ))}
    </>
  );
});

function MyCustomDrawingArea() {
  const theme = useTheme();
  const { drawingArea } = usePolarChartContext();

  return (
    <Rect
      color={theme.color.bg}
      height={drawingArea.height}
      width={drawingArea.width}
      x={drawingArea.x}
      y={drawingArea.y}
    />
  );
}

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
        { id: 'orange', data: 15, label: 'Solana', color: `rgb(${theme.spectrum.orange40})` },
        { id: 'yellow', data: 12, label: 'USDC', color: `rgb(${theme.spectrum.yellow40})` },
        { id: 'green', data: 8, label: 'Doge', color: `rgb(${theme.spectrum.green40})` },
      ]}
      width={200}
    >
      <PiePlot stroke={theme.color.bg} strokeWidth={2} />
      <DonutCenterLabel color={theme.color.fgMuted} font="label2" verticalAlignment="bottom">
        label
      </DonutCenterLabel>
      <DonutCenterLabel color={theme.color.fg} font="headline" verticalAlignment="top">
        $9,999.99
      </DonutCenterLabel>
    </PolarChart>
  );
};

const SemicircleChart = () => {
  const theme = useTheme();

  return (
    <PieChart
      animate
      angularAxis={{ range: { min: -90, max: 90 } }}
      height={120}
      inset={0}
      series={[
        { id: 'low', data: 25, label: 'Low', color: `rgb(${theme.spectrum.green40})` },
        { id: 'medium', data: 50, label: 'Medium', color: `rgb(${theme.spectrum.yellow40})` },
        { id: 'high', data: 25, label: 'High', color: `rgb(${theme.spectrum.orange40})` },
      ]}
      width={200}
    />
  );
};

const VariableRadiusPieChart = () => (
  <PolarChart animate height={200} inset={0} series={[]} width={200}>
    <VariableRadiusPieArcs />
  </PolarChart>
);

const PaddingAngleChart = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      angularAxis={{ paddingAngle: 5 }}
      height={200}
      inset={0}
      series={[
        { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
        { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.green40})` },
        { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
      ]}
      width={200}
    >
      <PiePlot />
    </PolarChart>
  );
};

const CornerRadiusChart = () => {
  const theme = useTheme();

  return (
    <HStack gap={2} justifyContent="center">
      <PolarChart
        animate
        height={100}
        inset={0}
        series={[
          { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
          { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.green40})` },
          { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
        ]}
        width={100}
      >
        <PiePlot cornerRadius={0} />
      </PolarChart>
      <PolarChart
        animate
        height={100}
        inset={0}
        series={[
          { id: 'a', data: 30, label: 'A', color: `rgb(${theme.spectrum.blue40})` },
          { id: 'b', data: 40, label: 'B', color: `rgb(${theme.spectrum.green40})` },
          { id: 'c', data: 30, label: 'C', color: `rgb(${theme.spectrum.orange40})` },
        ]}
        width={100}
      >
        <PiePlot cornerRadius={8} />
      </PolarChart>
    </HStack>
  );
};

const NestedRingsChart = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      height={200}
      inset={0}
      radialAxis={[
        { id: 'inner', range: ({ max }) => ({ min: 0, max: max - 20 }) },
        { id: 'outer', range: ({ max }) => ({ min: max - 20, max }) },
      ]}
      series={[
        {
          id: 'crypto',
          data: 35,
          label: 'Crypto',
          color: `rgb(${theme.spectrum.blue40})`,
          radialAxisId: 'inner',
        },
        {
          id: 'fiat',
          data: 45,
          label: 'Fiat',
          color: `rgb(${theme.spectrum.green40})`,
          radialAxisId: 'inner',
        },
        {
          id: 'rewards',
          data: 20,
          label: 'Rewards',
          color: `rgb(${theme.spectrum.orange40})`,
          radialAxisId: 'inner',
        },
        {
          id: 'btc',
          data: 15,
          label: 'Bitcoin',
          color: `rgb(${theme.spectrum.blue30})`,
          radialAxisId: 'outer',
        },
        {
          id: 'eth',
          data: 12,
          label: 'Ethereum',
          color: `rgb(${theme.spectrum.blue20})`,
          radialAxisId: 'outer',
        },
        {
          id: 'other-crypto',
          data: 8,
          label: 'Other',
          color: `rgb(${theme.spectrum.blue10})`,
          radialAxisId: 'outer',
        },
        {
          id: 'usd',
          data: 30,
          label: 'USD',
          color: `rgb(${theme.spectrum.green30})`,
          radialAxisId: 'outer',
        },
        {
          id: 'eur',
          data: 15,
          label: 'EUR',
          color: `rgb(${theme.spectrum.green20})`,
          radialAxisId: 'outer',
        },
        {
          id: 'cashback',
          data: 12,
          label: 'Cash Back',
          color: `rgb(${theme.spectrum.orange30})`,
          radialAxisId: 'outer',
        },
        {
          id: 'points',
          data: 8,
          label: 'Points',
          color: `rgb(${theme.spectrum.orange20})`,
          radialAxisId: 'outer',
        },
      ]}
      width={200}
    >
      <PiePlot radialAxisId="inner" />
      <PiePlot radialAxisId="outer" />
    </PolarChart>
  );
};

const MultiAxisSemicircles = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      angularAxis={[
        { id: 'top', range: { min: -90, max: 90 } },
        { id: 'bottom', range: { min: 90, max: 270 } },
      ]}
      height={200}
      inset={0}
      series={[
        {
          id: 'revenue',
          data: 30,
          label: 'Revenue',
          color: `rgb(${theme.spectrum.blue40})`,
          angularAxisId: 'top',
        },
        {
          id: 'profit',
          data: 50,
          label: 'Profit',
          color: `rgb(${theme.spectrum.green40})`,
          angularAxisId: 'top',
        },
        {
          id: 'costs',
          data: 20,
          label: 'Costs',
          color: `rgb(${theme.spectrum.orange40})`,
          angularAxisId: 'top',
        },
        {
          id: 'users',
          data: 40,
          label: 'Users',
          color: `rgb(${theme.spectrum.purple40})`,
          angularAxisId: 'bottom',
        },
        {
          id: 'sessions',
          data: 35,
          label: 'Sessions',
          color: `rgb(${theme.spectrum.yellow40})`,
          angularAxisId: 'bottom',
        },
        {
          id: 'conversions',
          data: 25,
          label: 'Conv.',
          color: `rgb(${theme.spectrum.teal40})`,
          angularAxisId: 'bottom',
        },
      ]}
      width={200}
    >
      <PiePlot angularAxisId="top" cornerRadius={4} />
      <PiePlot angularAxisId="bottom" cornerRadius={4} />
    </PolarChart>
  );
};

const QuadrantChart = () => {
  const theme = useTheme();

  return (
    <PolarChart
      animate
      angularAxis={[
        { id: 'q1', range: { min: 0, max: 90 }, paddingAngle: 3 },
        { id: 'q2', range: { min: 90, max: 180 }, paddingAngle: 3 },
        { id: 'q3', range: { min: 180, max: 270 }, paddingAngle: 3 },
        { id: 'q4', range: { min: 270, max: 360 }, paddingAngle: 3 },
      ]}
      height={200}
      inset={0}
      series={[
        {
          id: 'a',
          data: 50,
          label: 'A',
          color: `rgb(${theme.spectrum.blue40})`,
          angularAxisId: 'q1',
        },
        {
          id: 'b',
          data: 30,
          label: 'B',
          color: `rgb(${theme.spectrum.blue30})`,
          angularAxisId: 'q1',
        },
        {
          id: 'c',
          data: 20,
          label: 'C',
          color: `rgb(${theme.spectrum.blue20})`,
          angularAxisId: 'q1',
        },
        {
          id: 'd',
          data: 40,
          label: 'D',
          color: `rgb(${theme.spectrum.green40})`,
          angularAxisId: 'q2',
        },
        {
          id: 'e',
          data: 35,
          label: 'E',
          color: `rgb(${theme.spectrum.green30})`,
          angularAxisId: 'q2',
        },
        {
          id: 'f',
          data: 25,
          label: 'F',
          color: `rgb(${theme.spectrum.green20})`,
          angularAxisId: 'q2',
        },
        {
          id: 'g',
          data: 45,
          label: 'G',
          color: `rgb(${theme.spectrum.pink40})`,
          angularAxisId: 'q3',
        },
        {
          id: 'h',
          data: 30,
          label: 'H',
          color: `rgb(${theme.spectrum.pink30})`,
          angularAxisId: 'q3',
        },
        {
          id: 'i',
          data: 25,
          label: 'I',
          color: `rgb(${theme.spectrum.purple40})`,
          angularAxisId: 'q3',
        },
        {
          id: 'j',
          data: 35,
          label: 'J',
          color: `rgb(${theme.spectrum.orange40})`,
          angularAxisId: 'q4',
        },
        {
          id: 'k',
          data: 40,
          label: 'K',
          color: `rgb(${theme.spectrum.orange30})`,
          angularAxisId: 'q4',
        },
        {
          id: 'l',
          data: 25,
          label: 'L',
          color: `rgb(${theme.spectrum.yellow40})`,
          angularAxisId: 'q4',
        },
      ]}
      width={200}
    >
      <PiePlot angularAxisId="q1" cornerRadius={6} />
      <PiePlot angularAxisId="q2" cornerRadius={6} />
      <PiePlot angularAxisId="q3" cornerRadius={6} />
      <PiePlot angularAxisId="q4" cornerRadius={6} />
    </PolarChart>
  );
};

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

const AnimatedDataChange = () => {
  const theme = useTheme();
  const [dataSet, setDataSet] = useState(0);

  const dataSets = useMemo(
    () => [
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
    ],
    [theme],
  );

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
      <HStack alignItems="center" gap={2}>
        <IconButton
          accessibilityHint="Switch to previous data set"
          accessibilityLabel="Previous"
          name="arrowLeft"
          onPress={() => setDataSet((prev) => (prev - 1 + dataSets.length) % dataSets.length)}
          variant="secondary"
        />
        <Text font="label1">Data Set {dataSet + 1}</Text>
        <IconButton
          accessibilityHint="Switch to next data set"
          accessibilityLabel="Next"
          name="arrowRight"
          onPress={() => setDataSet((prev) => (prev + 1) % dataSets.length)}
          variant="secondary"
        />
      </HStack>
    </VStack>
  );
};

const WalletBreakdownDonut = () => {
  const theme = useTheme();

  return (
    <DonutChart
      animate
      angularAxis={{ paddingAngle: 3 }}
      cornerRadius={100}
      height={200}
      innerRadiusRatio={0.8}
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

type ExampleItem = {
  title: string;
  component: React.ReactNode;
};

function ExampleNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      { title: 'Basic Pie Chart', component: <BasicPieChart /> },
      { title: 'Basic Donut Chart', component: <BasicDonutChart /> },
      { title: 'Donut with Center Label', component: <DonutWithCenterLabel /> },
      { title: 'Animated Data Change', component: <AnimatedDataChange /> },
      { title: 'Wallet Breakdown', component: <WalletBreakdownDonut /> },
      { title: 'Semicircle', component: <SemicircleChart /> },
      { title: 'Variable Radius', component: <VariableRadiusPieChart /> },
      { title: 'Padding Angle', component: <PaddingAngleChart /> },
      { title: 'Corner Radius', component: <CornerRadiusChart /> },
      { title: 'Nested Rings', component: <NestedRingsChart /> },
      { title: 'Multi-Axis Semicircles', component: <MultiAxisSemicircles /> },
      { title: 'Quadrants', component: <QuadrantChart /> },
      { title: 'Coinbase One Rewards', component: <CoinbaseOneRewardsChart /> },
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
        <Box alignItems="center" padding={1}>
          {currentExample.component}
        </Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
