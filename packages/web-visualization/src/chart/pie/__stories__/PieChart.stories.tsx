import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { ChartTooltip } from '../../ChartTooltip';
import { PieChart } from '../PieChart';

export default {
  component: PieChart,
  title: 'Components/Chart/PieChart',
};

const Basic = () => {
  return (
    <PieChart
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

const Corners = () => {
  return (
    <PieChart
      cornerRadius={8}
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

const Stroke = () => {
  return (
    <PieChart
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
    <PieChart
      legend
      angularAxis={{ range: { min: -90, max: 90 } }}
      height={120}
      legendPosition="bottom"
      series={[
        { id: 'low', data: 25, label: 'Low', color: 'rgb(var(--green40))' },
        { id: 'medium', data: 50, label: 'Medium', color: 'rgb(var(--yellow40))' },
        { id: 'high', data: 25, label: 'High', color: 'rgb(var(--red40))' },
      ]}
    />
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
        <PieChart animate height={200} series={dataSets[dataSet]} />
      </VStack>
      <VStack alignItems="center" gap={2}>
        <Text font="label1">animate=false</Text>
        <PieChart animate={false} height={200} series={dataSets[dataSet]} />
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
    <PieChart
      enableHighlighting
      legend
      height={200}
      legendPosition="right"
      maxWidth={400}
      series={series}
      style={{ margin: '0 auto' }}
    >
      <ChartTooltip label="Asset Allocation" valueFormatter={percentFormatter} />
    </PieChart>
  );
};

const CompactPie = () => {
  return (
    <HStack flexWrap="wrap" gap={4} justifyContent="center">
      <HStack alignItems="center" gap={2}>
        <PieChart
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
        <PieChart
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
      <Corners />
      <Stroke />
      <Angles />
      <Animations />
      <WithTooltip />
      <CompactPie />
    </VStack>
  );
};
