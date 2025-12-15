import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { useChartContext, usePolarChartContext } from '../ChartProvider';
import { ChartTooltip } from '../ChartTooltip';
import { DonutChart } from '../DonutChart';
import { ChartText } from '../text';
import { degreesToRadians } from '../utils';

export default {
  component: DonutChart,
  title: 'Components/Chart/DonutChart',
};

const Basic = () => {
  return (
    <DonutChart
      height={200}
      series={[
        { id: 'a', data: 30, label: 'Category A', color: 'rgb(var(--blue40))' },
        { id: 'b', data: 20, label: 'Category B', color: 'rgb(var(--purple40))' },
        { id: 'c', data: 15, label: 'Category C', color: 'rgb(var(--pink50))' },
        { id: 'd', data: 10, label: 'Category D', color: 'rgb(var(--orange40))' },
        { id: 'e', data: 15, label: 'Category E', color: 'rgb(var(--yellow40))' },
        { id: 'f', data: 10, label: 'Category F', color: 'rgb(var(--green40))' },
      ]}
    />
  );
};

const InnerRadiusVariants = () => {
  return (
    <HStack gap={4} justifyContent="center">
      <VStack alignItems="center" gap={2}>
        <DonutChart
          height={150}
          innerRadiusRatio={0.3}
          series={[
            { id: 'a', data: 60, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          innerRadiusRatio: 0.3
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <DonutChart
          height={150}
          innerRadiusRatio={0.5}
          series={[
            { id: 'a', data: 60, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          innerRadiusRatio: 0.5
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <DonutChart
          height={150}
          innerRadiusRatio={0.75}
          series={[
            { id: 'a', data: 60, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          innerRadiusRatio: 0.75
        </Text>
      </VStack>
    </HStack>
  );
};

const Corners = () => {
  return (
    <HStack gap={4} justifyContent="center">
      <VStack alignItems="center" gap={2}>
        <DonutChart
          cornerRadius={0}
          height={150}
          series={[
            { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
            { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          cornerRadius: 0
        </Text>
      </VStack>
      <VStack alignItems="center" gap={2}>
        <DonutChart
          cornerRadius={8}
          height={150}
          series={[
            { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--green40))' },
            { id: 'c', data: 30, color: 'rgb(var(--purple40))' },
          ]}
          width={150}
        />
        <Text color="fgMuted" font="label2">
          cornerRadius: 8
        </Text>
      </VStack>
    </HStack>
  );
};

const Stroke = () => {
  return (
    <DonutChart
      height={200}
      series={[
        { id: 'a', data: 30, label: 'Category A', color: 'rgb(var(--blue40))' },
        { id: 'b', data: 20, label: 'Category B', color: 'rgb(var(--purple40))' },
        { id: 'c', data: 15, label: 'Category C', color: 'rgb(var(--pink50))' },
        { id: 'd', data: 10, label: 'Category D', color: 'rgb(var(--orange40))' },
        { id: 'e', data: 15, label: 'Category E', color: 'rgb(var(--yellow40))' },
        { id: 'f', data: 10, label: 'Category F', color: 'rgb(var(--green40))' },
      ]}
      strokeWidth={0}
    />
  );
};

const Angles = () => {
  return (
    <DonutChart
      angularAxis={{ range: { min: -90, max: 90 } }}
      height={200}
      innerRadiusRatio={0.85}
      series={[
        { id: 'low', data: 25, label: 'Low', color: 'rgb(var(--green40))' },
        { id: 'medium', data: 50, label: 'Medium', color: 'rgb(var(--yellow40))' },
        { id: 'high', data: 25, label: 'High', color: 'rgb(var(--red40))' },
      ]}
      strokeWidth={0}
    />
  );
};

const Padding = () => {
  return (
    <DonutChart
      angularAxis={{ paddingAngle: 4 }}
      cornerRadius={100}
      height={200}
      innerRadiusRatio={0.7}
      series={[
        { id: 'card', data: 15, label: 'Card', color: 'rgb(var(--blue40))' },
        { id: 'cash', data: 45, label: 'Cash', color: 'rgb(var(--green40))' },
        { id: 'stake', data: 20, label: 'Stake', color: 'rgb(var(--orange40))' },
        { id: 'lend', data: 20, label: 'Lend', color: 'rgb(var(--teal40))' },
      ]}
    />
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

const Animations = () => {
  const [dataSet, setDataSet] = useState(0);

  const dataSets = useMemo(
    () => [
      [
        { id: 'a', data: 30, color: 'rgb(var(--blue40))' },
        { id: 'b', data: 40, color: 'rgb(var(--green40))' },
        { id: 'c', data: 30, color: 'rgb(var(--orange40))' },
      ],
      [
        { id: 'a', data: 50, color: 'rgb(var(--blue40))' },
        { id: 'b', data: 30, color: 'rgb(var(--green40))' },
        { id: 'c', data: 20, color: 'rgb(var(--orange40))' },
      ],
      [
        { id: 'a', data: 20, color: 'rgb(var(--blue40))' },
        { id: 'b', data: 50, color: 'rgb(var(--green40))' },
        { id: 'c', data: 30, color: 'rgb(var(--orange40))' },
      ],
    ],
    [],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataSet((prev) => (prev + 1) % dataSets.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [dataSets.length]);

  return (
    <HStack gap={4} justifyContent="center">
      <VStack alignItems="center" gap={2}>
        <Text font="label1">animate=true</Text>
        <DonutChart animate height={200} series={dataSets[dataSet]} />
      </VStack>
      <VStack alignItems="center" gap={2}>
        <Text font="label1">animate=false</Text>
        <DonutChart animate={false} height={200} series={dataSets[dataSet]} />
      </VStack>
    </HStack>
  );
};

const WithTooltip = () => {
  const series = useMemo(
    () => [
      { id: 'stocks', data: 45, label: 'Stocks', color: 'rgb(var(--blue40))' },
      { id: 'bonds', data: 25, label: 'Bonds', color: 'rgb(var(--green40))' },
      { id: 'crypto', data: 20, label: 'Crypto', color: 'rgb(var(--orange40))' },
      { id: 'cash', data: 10, label: 'Cash', color: 'rgb(var(--gray40))' },
    ],
    [],
  );

  const total = useMemo(() => series.reduce((sum, s) => sum + s.data, 0), [series]);

  const percentFormatter = useCallback(
    (value: number) => {
      const percent = Math.round((value / total) * 100);
      return `${percent}% of portfolio`;
    },
    [total],
  );

  return (
    <DonutChart
      enableHighlighting
      legend
      height={200}
      legendPosition="right"
      maxWidth={400}
      series={series}
      style={{ margin: '0 auto' }}
    >
      <ChartTooltip label="Asset Allocation" valueFormatter={percentFormatter} />
    </DonutChart>
  );
};

const Gauge = () => {
  const series = [
    {
      id: 'low',
      data: 25,
      label: 'Poor',
      color: 'rgb(var(--red40))',
      textColor: 'rgb(var(--red80))',
      bgColor: 'rgb(var(--red20))',
    },
    {
      id: 'medium',
      data: 50,
      label: 'Fair',
      color: 'rgb(var(--yellow40))',
      textColor: 'rgb(var(--yellow80))',
      bgColor: 'rgb(var(--yellow20))',
    },
    {
      id: 'high',
      data: 25,
      label: 'Healthy',
      color: 'rgb(var(--green40))',
      textColor: 'rgb(var(--green80))',
      bgColor: 'rgb(var(--green20))',
    },
  ];

  const GaugeIndicator = ({ value }: { value: number }) => {
    const { drawingArea, getAngularAxis, getRadialAxis } = usePolarChartContext();

    if (!drawingArea.width) return null;

    const angularAxis = getAngularAxis();
    const radialAxis = getRadialAxis();

    const minAngle = angularAxis?.range?.min ?? -90;
    const maxAngle = angularAxis?.range?.max ?? 90;

    const angle = minAngle + (value / 100) * (maxAngle - minAngle);

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    const outerRadius = Math.min(drawingArea.width, drawingArea.height) / 2;
    const innerRadius = radialAxis?.range?.min ?? outerRadius * 0.85;

    const arrowRadius = innerRadius * 0.5;

    const angleRadians = degreesToRadians(angle - 90);
    const arrowX = centerX + Math.cos(angleRadians) * arrowRadius;
    const arrowY = centerY + Math.sin(angleRadians) * arrowRadius;

    const total = series.reduce((sum, s) => sum + s.data, 0);
    let cumulative = 0;
    let activeSegment = series[0];
    for (const segment of series) {
      cumulative += segment.data;
      if (value <= (cumulative / total) * 100) {
        activeSegment = segment;
        break;
      }
    }

    return (
      <>
        <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
          <path
            clipRule="evenodd"
            d="M0 -3.13135L6.5657 3.4343L5.4343 4.5657L0 -0.86861L-5.4343 4.5657L-6.56567 3.4343L0 -3.13135Z"
            fill="var(--color-fg)"
            fillRule="evenodd"
          />
        </g>
        <ChartText
          background={activeSegment.bgColor}
          borderRadius={4}
          color={activeSegment.textColor}
          font="label2"
          inset={4}
          x={centerX}
          y={centerY}
        >
          {activeSegment.label}
        </ChartText>
      </>
    );
  };

  return (
    <VStack style={{ marginBottom: 'calc(var(--space-10) * -1)' }}>
      <DonutChart
        angularAxis={{ range: { min: -90, max: 90 } }}
        height={200}
        innerRadiusRatio={0.85}
        series={series}
        strokeWidth={0}
      >
        <GaugeIndicator value={60} />
      </DonutChart>
    </VStack>
  );
};

const CompactDonut = () => {
  return (
    <HStack flexWrap="wrap" gap={4} justifyContent="center">
      <HStack alignItems="center" gap={2}>
        <DonutChart
          height={40}
          inset={0}
          series={[
            { id: 'a', data: 60, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 40, color: 'rgb(var(--gray20))' },
          ]}
          width={40}
        />
        <VStack gap={0}>
          <Text font="label1">60%</Text>
          <Text color="fgMuted" font="label2">
            Allocation
          </Text>
        </VStack>
      </HStack>
      <HStack alignItems="center" gap={2}>
        <DonutChart
          height={40}
          inset={0}
          series={[
            { id: 'a', data: 33, color: 'rgb(var(--blue40))' },
            { id: 'b', data: 33, color: 'rgb(var(--green40))' },
            { id: 'c', data: 34, color: 'rgb(var(--purple40))' },
          ]}
          width={40}
        />
        <VStack gap={0}>
          <Text font="label1">Equal</Text>
          <Text color="fgMuted" font="label2">
            Split
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export const All = () => {
  return (
    <VStack gap={4}>
      <Basic />
      <InnerRadiusVariants />
      <Corners />
      <Stroke />
      <Angles />
      <Padding />
      <CenterLabel />
      <Animations />
      <WithTooltip />
      <Gauge />
      <CompactDonut />
    </VStack>
  );
};
