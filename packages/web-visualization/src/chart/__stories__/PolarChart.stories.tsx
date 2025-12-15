import React, { memo, useMemo } from 'react';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { useChartContext, usePolarChartContext } from '../ChartProvider';
import { ChartTooltip } from '../ChartTooltip';
import { DonutChart } from '../DonutChart';
import { Legend } from '../legend';
import { Arc, PieChart, PiePlot } from '../pie';
import { PolarChart } from '../PolarChart';
import { ChartText } from '../text';
import { degreesToRadians, getArcPath, polarToCartesian, useHighlightContext } from '../utils';

export default {
  component: PolarChart,
  title: 'Components/Chart/PolarChart',
};

const Basics = () => {
  return (
    <HStack gap={4} justifyContent="center">
      <VStack alignItems="center" gap={2}>
        <PieChart
          height={150}
          series={[
            { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
            { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          PieChart
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <DonutChart
          height={150}
          innerRadiusRatio={0.6}
          series={[
            { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
            { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          DonutChart
        </Text>
      </VStack>
    </HStack>
  );
};

const Series = () => {
  return (
    <PolarChart
      height={200}
      series={[
        { id: 'btc', data: 40, label: 'Bitcoin', color: 'rgb(var(--orange40))' },
        { id: 'eth', data: 30, label: 'Ethereum', color: 'rgb(var(--blue40))' },
        { id: 'sol', data: 20, label: 'Solana', color: 'rgb(var(--purple40))' },
        { id: 'other', data: 10, label: 'Other', color: 'rgb(var(--gray40))' },
      ]}
    >
      <PiePlot />
    </PolarChart>
  );
};

const CustomRange = () => {
  return (
    <HStack gap={4} justifyContent="center">
      <VStack alignItems="center" gap={2}>
        <PolarChart
          angularAxis={{ range: { min: -90, max: 90 } }}
          height={120}
          series={[
            { id: 'a', data: 35, color: 'rgb(var(--green40))' },
            { id: 'b', data: 65, color: 'rgb(var(--gray20))' },
          ]}
          width={200}
        >
          <PiePlot cornerRadius={2} />
        </PolarChart>
        <Text color="fgMuted" font="label2">
          Semicircle (top)
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <PolarChart
          angularAxis={{ range: { min: 90, max: 270 } }}
          height={120}
          series={[
            { id: 'a', data: 35, color: 'rgb(var(--green40))' },
            { id: 'b', data: 65, color: 'rgb(var(--gray20))' },
          ]}
          width={200}
        >
          <PiePlot cornerRadius={2} />
        </PolarChart>
        <Text color="fgMuted" font="label2">
          Semicircle (bottom)
        </Text>
      </VStack>
    </HStack>
  );
};

const PaddingAngle = () => {
  return (
    <PolarChart
      angularAxis={{ paddingAngle: 5 }}
      height={200}
      radialAxis={{
        range: ({ max }) => ({ min: max - 16, max }),
      }}
      series={[
        { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
        { id: 'b', data: 40, color: 'rgb(var(--green40))' },
        { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
      ]}
    >
      <PiePlot cornerRadius={8} />
    </PolarChart>
  );
};

const MultipleAngularAxes = () => {
  return (
    <PolarChart
      angularAxis={[
        { id: 'top', range: { min: -45, max: 45 } },
        { id: 'bottom', range: { min: 135, max: 225 } },
      ]}
      height={200}
      radialAxis={{
        range: ({ max }) => ({ min: max - 16, max }),
      }}
      series={[
        { id: 'revenue', data: 30, color: 'rgb(var(--blue40))', angularAxisId: 'top' },
        { id: 'profit', data: 50, color: 'rgb(var(--green40))', angularAxisId: 'top' },
        { id: 'costs', data: 20, color: 'rgb(var(--orange40))', angularAxisId: 'top' },
        { id: 'users', data: 40, color: 'rgb(var(--purple40))', angularAxisId: 'bottom' },
        { id: 'sessions', data: 35, color: 'rgb(var(--yellow40))', angularAxisId: 'bottom' },
        { id: 'conversions', data: 25, color: 'rgb(var(--teal40))', angularAxisId: 'bottom' },
      ]}
    >
      <PiePlot angularAxisId="top" cornerRadius={4} />
      <PiePlot angularAxisId="bottom" cornerRadius={4} />
    </PolarChart>
  );
};

const Donut = () => {
  return (
    <PolarChart
      height={200}
      radialAxis={{ range: ({ max }) => ({ min: max * 0.6, max }) }}
      series={[
        { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
        { id: 'b', data: 40, color: 'rgb(var(--green40))' },
        { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
      ]}
    >
      <PiePlot cornerRadius={4} />
    </PolarChart>
  );
};

const NestedRings = () => {
  return (
    <PolarChart
      height={250}
      radialAxis={[
        { id: 'inner', range: ({ max }) => ({ min: 0, max: max * 0.8 }) },
        { id: 'outer', range: ({ max }) => ({ min: max * 0.85, max }) },
      ]}
      series={[
        {
          id: 'a',
          radialAxisId: 'inner',
          data: 30,
          label: 'Category A',
          color: 'rgb(var(--blue40))',
        },
        {
          id: 'b',
          radialAxisId: 'inner',
          data: 20,
          label: 'Category B',
          color: 'rgb(var(--purple40))',
        },
        {
          id: 'c',
          radialAxisId: 'inner',
          data: 15,
          label: 'Category C',
          color: 'rgb(var(--pink50))',
        },
        {
          id: 'd',
          radialAxisId: 'inner',
          data: 10,
          label: 'Category D',
          color: 'rgb(var(--orange40))',
        },
        {
          id: 'e',
          radialAxisId: 'inner',
          data: 15,
          label: 'Category E',
          color: 'rgb(var(--yellow40))',
        },
        {
          id: 'f',
          radialAxisId: 'inner',
          data: 10,
          label: 'Category F',
          color: 'rgb(var(--green40))',
        },
        {
          id: 'aa',
          radialAxisId: 'outer',
          data: 20,
          label: 'Category AA',
          color: 'rgb(var(--blue30))',
        },
        {
          id: 'ab',
          radialAxisId: 'outer',
          data: 10,
          label: 'Category AB',
          color: 'rgb(var(--blue50))',
        },
        {
          id: 'ba',
          radialAxisId: 'outer',
          data: 15,
          label: 'Category BA',
          color: 'rgb(var(--purple30))',
        },
        {
          id: 'bb',
          radialAxisId: 'outer',
          data: 5,
          label: 'Category BB',
          color: 'rgb(var(--purple50))',
        },
        {
          id: 'ca',
          radialAxisId: 'outer',
          data: 12,
          label: 'Category CA',
          color: 'rgb(var(--pink40))',
        },
        {
          id: 'cb',
          radialAxisId: 'outer',
          data: 3,
          label: 'Category CB',
          color: 'rgb(var(--pink60))',
        },
        {
          id: 'da',
          radialAxisId: 'outer',
          data: 4,
          label: 'Category DA',
          color: 'rgb(var(--orange30))',
        },
        {
          id: 'db',
          radialAxisId: 'outer',
          data: 6,
          label: 'Category DB',
          color: 'rgb(var(--orange50))',
        },
        {
          id: 'ea',
          radialAxisId: 'outer',
          data: 15,
          label: 'Category EA',
          color: 'rgb(var(--yellow40))',
        },
        {
          id: 'fa',
          radialAxisId: 'outer',
          data: 3,
          label: 'Category FA',
          color: 'rgb(var(--green30))',
        },
        {
          id: 'fb',
          radialAxisId: 'outer',
          data: 7,
          label: 'Category FB',
          color: 'rgb(var(--green50))',
        },
      ]}
    >
      <PiePlot radialAxisId="inner" strokeWidth={0} />
      <PiePlot radialAxisId="outer" strokeWidth={0} />
    </PolarChart>
  );
};

const CenterLabel = () => {
  const series = [
    { id: 'a', data: 30, label: 'Category A', color: 'rgb(var(--blue40))' },
    { id: 'b', data: 20, label: 'Category B', color: 'rgb(var(--purple40))' },
    { id: 'c', data: 15, label: 'Category C', color: 'rgb(var(--pink50))' },
    { id: 'd', data: 10, label: 'Category D', color: 'rgb(var(--orange40))' },
    { id: 'e', data: 15, label: 'Category E', color: 'rgb(var(--yellow40))' },
    { id: 'f', data: 10, label: 'Category F', color: 'rgb(var(--green40))' },
  ];

  const total = series.reduce((sum, s) => sum + s.data, 0);

  const Label = () => {
    const { drawingArea } = useChartContext();

    if (!drawingArea.width) return null;

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    return (
      <>
        <ChartText font="label2" verticalAlignment="bottom" x={centerX} y={centerY}>
          Total
        </ChartText>
        <ChartText
          color="var(--color-fg)"
          font="headline"
          verticalAlignment="top"
          x={centerX}
          y={centerY}
        >
          {`$${(total * 100).toLocaleString()}`}
        </ChartText>
      </>
    );
  };

  return (
    <DonutChart
      height={200}
      innerRadiusRatio={0.65}
      series={series}
      stroke="var(--color-bg)"
      strokeWidth={2}
    >
      <Label />
    </DonutChart>
  );
};

const InteractiveNestedChart = () => {
  const getParent = (seriesId: string | undefined) => seriesId?.[0];

  type CustomArcProps = {
    isRelated: boolean;
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
    paddingAngle?: number;
    fill?: string;
    seriesId?: string;
    onMouseEnter?: React.MouseEventHandler<SVGPathElement>;
    onMouseLeave?: React.MouseEventHandler<SVGPathElement>;
  };

  const CustomArc = memo(({ isRelated, ...props }: CustomArcProps) => {
    const highlightContext = useHighlightContext();
    const highlightedId = highlightContext?.highlightedItem?.seriesId;
    const { drawingArea } = usePolarChartContext();

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    const path = getArcPath({
      startAngle: props.startAngle,
      endAngle: props.endAngle,
      innerRadius: props.innerRadius,
      outerRadius: props.outerRadius,
      paddingAngle: props.paddingAngle,
    });

    const shouldDim = highlightedId && !isRelated;

    return (
      <g transform={`translate(${centerX}, ${centerY})`}>
        <path
          d={path}
          fill={props.fill}
          fillOpacity={shouldDim ? 0.3 : 1}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          style={{ transition: 'fill-opacity 0.2s ease-out' }}
        />
      </g>
    );
  });

  const InnerArc = (props: Omit<CustomArcProps, 'isRelated'>) => {
    const highlightContext = useHighlightContext();
    const highlightedId = highlightContext?.highlightedItem?.seriesId;

    const isExactMatch = props.seriesId === highlightedId;
    const isParentOfHighlighted = getParent(highlightedId) === props.seriesId;
    const isRelated = isExactMatch || isParentOfHighlighted;

    return <CustomArc {...props} isRelated={isRelated} />;
  };

  const OuterArc = (props: Omit<CustomArcProps, 'isRelated'>) => {
    const highlightContext = useHighlightContext();
    const highlightedId = highlightContext?.highlightedItem?.seriesId;

    const isExactMatch = props.seriesId === highlightedId;
    const myParent = getParent(props.seriesId);
    const isHighlightedMyParent = myParent === highlightedId;
    const isRelated = isExactMatch || isHighlightedMyParent;

    return <CustomArc {...props} isRelated={isRelated} />;
  };

  return (
    <PolarChart
      enableHighlighting
      height={250}
      legend={<Legend seriesIds={['a', 'b', 'c', 'd', 'e', 'f']} />}
      legendPosition="bottom"
      radialAxis={[
        { id: 'inner', range: ({ max }) => ({ min: 0, max: max * 0.8 }) },
        { id: 'outer', range: ({ max }) => ({ min: max * 0.85, max }) },
      ]}
      series={[
        {
          id: 'a',
          radialAxisId: 'inner',
          data: 30,
          label: 'Category A',
          color: 'rgb(var(--blue40))',
        },
        {
          id: 'b',
          radialAxisId: 'inner',
          data: 20,
          label: 'Category B',
          color: 'rgb(var(--purple40))',
        },
        {
          id: 'c',
          radialAxisId: 'inner',
          data: 15,
          label: 'Category C',
          color: 'rgb(var(--pink50))',
        },
        {
          id: 'd',
          radialAxisId: 'inner',
          data: 10,
          label: 'Category D',
          color: 'rgb(var(--orange40))',
        },
        {
          id: 'e',
          radialAxisId: 'inner',
          data: 15,
          label: 'Category E',
          color: 'rgb(var(--yellow40))',
        },
        {
          id: 'f',
          radialAxisId: 'inner',
          data: 10,
          label: 'Category F',
          color: 'rgb(var(--green40))',
        },
        {
          id: 'aa',
          radialAxisId: 'outer',
          data: 20,
          label: 'Category AA',
          color: 'rgb(var(--blue30))',
        },
        {
          id: 'ab',
          radialAxisId: 'outer',
          data: 10,
          label: 'Category AB',
          color: 'rgb(var(--blue50))',
        },
        {
          id: 'ba',
          radialAxisId: 'outer',
          data: 15,
          label: 'Category BA',
          color: 'rgb(var(--purple30))',
        },
        {
          id: 'bb',
          radialAxisId: 'outer',
          data: 5,
          label: 'Category BB',
          color: 'rgb(var(--purple50))',
        },
        {
          id: 'ca',
          radialAxisId: 'outer',
          data: 12,
          label: 'Category CA',
          color: 'rgb(var(--pink40))',
        },
        {
          id: 'cb',
          radialAxisId: 'outer',
          data: 3,
          label: 'Category CB',
          color: 'rgb(var(--pink60))',
        },
        {
          id: 'da',
          radialAxisId: 'outer',
          data: 4,
          label: 'Category DA',
          color: 'rgb(var(--orange30))',
        },
        {
          id: 'db',
          radialAxisId: 'outer',
          data: 6,
          label: 'Category DB',
          color: 'rgb(var(--orange50))',
        },
        {
          id: 'ea',
          radialAxisId: 'outer',
          data: 15,
          label: 'Category EA',
          color: 'rgb(var(--yellow40))',
        },
        {
          id: 'fa',
          radialAxisId: 'outer',
          data: 3,
          label: 'Category FA',
          color: 'rgb(var(--green30))',
        },
        {
          id: 'fb',
          radialAxisId: 'outer',
          data: 7,
          label: 'Category FB',
          color: 'rgb(var(--green50))',
        },
      ]}
    >
      <PiePlot ArcComponent={InnerArc} radialAxisId="inner" strokeWidth={0} />
      <PiePlot ArcComponent={OuterArc} radialAxisId="outer" strokeWidth={0} />
      <ChartTooltip />
    </PolarChart>
  );
};

const TemperatureRing = () => {
  const minTemp = 14;
  const maxTemp = 24;
  const currentTemp = 22;

  // Arc configuration - 3/4 circle with gap at top
  const startAngleDegrees = -135;
  const endAngleDegrees = 135;
  const innerRadiusRatio = 0.75;

  // Background track arc - uses the angular axis range for consistent positioning
  const BackgroundArc = memo(() => {
    const { drawingArea, getAngularAxis } = usePolarChartContext();
    const angularAxis = getAngularAxis();

    const { innerRadius, outerRadius } = useMemo(() => {
      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      return {
        innerRadius: r * innerRadiusRatio,
        outerRadius: r,
      };
    }, [drawingArea]);

    if (!angularAxis) return null;

    return (
      <Arc
        animate={false}
        cornerRadius={100}
        endAngle={degreesToRadians(angularAxis.range.max)}
        fill="var(--color-bgSecondary)"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={0}
        startAngle={degreesToRadians(angularAxis.range.min)}
      />
    );
  });

  // Circle indicator - uses getAngularScale + polarToCartesian for positioning
  const CurrentTempIndicator = memo(() => {
    const { drawingArea, getAngularScale } = usePolarChartContext();
    const angularScale = getAngularScale();

    const { x, y, indicatorRadius } = useMemo(() => {
      if (!angularScale) return { x: 0, y: 0, indicatorRadius: 0 };

      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      const midRadius = r * ((1 + innerRadiusRatio) / 2);
      // Use the scale to convert temperature to angle, then polarToCartesian for position
      const angleDegrees = angularScale(currentTemp) as number;
      const pos = polarToCartesian(angleDegrees, midRadius);

      return {
        ...pos,
        indicatorRadius: (r * (1 - innerRadiusRatio)) / 2,
      };
    }, [drawingArea, angularScale]);

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    if (!angularScale) return null;

    return (
      <g transform={`translate(${centerX}, ${centerY})`}>
        <circle cx={x} cy={y} fill="var(--color-bg)" r={indicatorRadius + 4} />
        <circle cx={x} cy={y} fill="var(--color-fgMuted)" r={indicatorRadius} />
      </g>
    );
  });

  // Min/Max temperature labels - uses getAngularScale + polarToCartesian for positioning
  const TempLabels = memo(() => {
    const { drawingArea, getAngularScale } = usePolarChartContext();
    const angularScale = getAngularScale();

    const { minPos, maxPos, radius } = useMemo(() => {
      if (!angularScale) return { minPos: { x: 0, y: 0 }, maxPos: { x: 0, y: 0 } };

      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      const labelRadius = r * innerRadiusRatio - 20;

      // Use the scale to get angles for min/max temps, then polarToCartesian for positions
      const minAngleDegrees = (angularScale(minTemp) as number) + 10;
      const maxAngleDegrees = (angularScale(maxTemp) as number) - 10;

      return {
        minPos: polarToCartesian(minAngleDegrees, labelRadius),
        maxPos: polarToCartesian(maxAngleDegrees, labelRadius),
        radius: r,
      };
    }, [drawingArea, angularScale]);

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    if (!angularScale! || !radius) return;

    return (
      <>
        <ChartText
          color="var(--color-fgMuted)"
          font="label2"
          x={centerX + minPos.x}
          y={centerY + minPos.y + radius / 2}
        >
          {`${minTemp}°`}
        </ChartText>
        <ChartText
          color="var(--color-fgMuted)"
          font="label2"
          x={centerX + maxPos.x}
          y={centerY + maxPos.y + radius / 2}
        >
          {`${maxTemp}°`}
        </ChartText>
      </>
    );
  });

  // Center label showing current temperature
  const CenterLabel = memo(() => {
    const { drawingArea } = useChartContext();

    if (!drawingArea.width) return null;

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    return (
      <>
        <ChartText color="var(--color-fg)" font="display1" x={centerX} y={centerY}>
          {`${currentTemp}`}
        </ChartText>
      </>
    );
  });

  return (
    <PolarChart
      // Configure angular axis: domain is temperature range, range is arc angles
      angularAxis={{
        domain: { min: minTemp, max: maxTemp },
        range: { min: startAngleDegrees, max: endAngleDegrees },
      }}
      height={200}
      inset={0}
      radialAxis={{ range: ({ max }) => ({ min: innerRadiusRatio * max, max }) }}
      series={[]}
    >
      <BackgroundArc />
      <CurrentTempIndicator />
      <TempLabels />
      <CenterLabel />
    </PolarChart>
  );
};

const SegmentedProgressRing = () => {
  const innerRadiusRatio = 0.75;
  const angleEachSideGap = (45 / 4) * 3;
  const startAngleDegrees = angleEachSideGap - 180;
  const endAngleDegrees = 180 - angleEachSideGap;
  const totalSweepDegrees = endAngleDegrees - startAngleDegrees;
  const gapBetweenDegrees = 5;
  // Subtract total gap space (2 gaps for 3 sections), then divide remaining space by 3
  const sectionLengthDegrees = (totalSweepDegrees - gapBetweenDegrees * 2) / 3;

  const firstSectionEnd = startAngleDegrees + sectionLengthDegrees;
  const secondSectionStart = firstSectionEnd + gapBetweenDegrees;
  const secondSectionEnd = secondSectionStart + sectionLengthDegrees;
  const thirdSectionStart = secondSectionEnd + gapBetweenDegrees;
  const thirdSectionEnd = thirdSectionStart + sectionLengthDegrees;
  const progressAngle = -45;

  const BackgroundArcs = memo(() => {
    const { drawingArea } = usePolarChartContext();

    const { innerRadius, outerRadius } = useMemo(() => {
      const r = Math.min(drawingArea.width, drawingArea.height) / 2;
      return {
        innerRadius: r * innerRadiusRatio,
        outerRadius: r,
      };
    }, [drawingArea]);

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
      [],
    );

    return (
      <>
        {sections.map((section, i) => (
          <Arc
            key={i}
            animate={false}
            cornerRadius={100}
            endAngle={section.endAngle}
            fill="var(--color-fgMuted)"
            fillOpacity={0.25}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={0}
            startAngle={section.startAngle}
          />
        ))}
      </>
    );
  });

  const ClippedProgress = memo(() => {
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
    }, [drawingArea]);

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
  });

  return (
    <PolarChart
      animate
      angularAxis={{ range: { min: startAngleDegrees, max: progressAngle } }}
      height={200}
      inset={0}
      radialAxis={{ range: ({ max }) => ({ min: innerRadiusRatio * max, max }) }}
      series={[{ id: 'progress', data: 100, color: 'var(--color-fg)' }]}
    >
      <BackgroundArcs />
      <ClippedProgress />
    </PolarChart>
  );
};

export const All = () => {
  return (
    <VStack gap={4}>
      <Basics />
      <Series />
      <CustomRange />
      <PaddingAngle />
      <MultipleAngularAxes />
      <Donut />
      <NestedRings />
      <CenterLabel />
      <InteractiveNestedChart />
      <TemperatureRing />
      <SegmentedProgressRing />
    </VStack>
  );
};
