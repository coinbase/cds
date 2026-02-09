import { useEffect, useMemo, useState } from 'react';
import { VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { DottedLine } from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import { AreaChart } from '..';

export default {
  title: 'Components/Chart/AreaChart',
  component: AreaChart,
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {description}
      {children}
    </VStack>
  );
};

const TransitionModes = () => {
  const [data, setData] = useState<number[]>(() => [28, 52, 46, 68, 60, 74, 66, 82]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((currentData) => {
        const lastValue = currentData[currentData.length - 1] ?? 0;
        const delta = (Math.random() - 0.5) * 18;
        const nextValue = Math.max(10, Math.min(90, Math.round(lastValue + delta)));
        return [...currentData.slice(1), nextValue];
      });
    }, 900);

    return () => clearInterval(intervalId);
  }, []);

  const series = useMemo(
    () => [
      {
        id: 'traffic',
        data,
        color: 'var(--color-accentBoldBlue)',
      },
    ],
    [data],
  );

  const enterTransition = useMemo(() => ({ duration: 0.35 }), []);
  const updateTransition = useMemo(() => ({ type: 'spring', stiffness: 700, damping: 24 }), []);
  const transitionModes = useMemo(
    () => [
      {
        label: 'Enter + Update',
        transition: { enter: enterTransition, update: updateTransition },
      },
      {
        label: 'Enter Only',
        transition: { enter: enterTransition, update: null },
      },
      {
        label: 'Update Only',
        transition: { enter: null, update: updateTransition },
      },
    ],
    [enterTransition, updateTransition],
  );

  return (
    <VStack gap={2}>
      {transitionModes.map((mode) => (
        <VStack key={mode.label} gap={1}>
          <Text color="fgMuted" font="label2">
            {mode.label}
          </Text>
          <AreaChart
            height={140}
            inset={0}
            series={series}
            transition={mode.transition}
            yAxis={{ domain: { min: 0, max: 100 } }}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic">
        <AreaChart
          enableScrubbing
          showYAxis
          height={400}
          series={[
            {
              id: 'pageViews',
              data: [24, 13, 98, 39, 48, 38, 43],
            },
          ]}
          yAxis={{
            showGrid: true,
            domain: { min: 0 },
          }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Stacked">
        <AreaChart
          enableScrubbing
          showLines
          stacked
          curve="natural"
          height={256}
          series={[
            {
              id: 'currentRewards',
              data: [
                100, 150, 200, 280, 380, 500, 650, 820, 1020, 1250, 1510, 1800, 2120, 2470, 2850,
                3260, 3700, 4170,
              ],
              color: 'var(--color-fg)',
            },
            {
              id: 'potentialRewards',
              data: [
                150, 220, 300, 400, 520, 660, 820, 1000, 1200, 1420, 1660, 1920, 2200, 2500, 2820,
                3160, 3520, 3900,
              ],
              color: 'var(--color-fgPositive)',
              type: 'dotted',
              LineComponent: DottedLine,
            },
          ]}
          type="dotted"
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Transitions">
        <TransitionModes />
      </Example>
      <Example title="Negative Values">
        <AreaChart
          enableScrubbing
          showLines
          showYAxis
          height={400}
          series={[
            {
              id: 'pageViews',
              data: [24, 13, -98, 39, 48, 38, 43],
            },
          ]}
          type="gradient"
          yAxis={{
            showGrid: true,
          }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Styles">
        <AreaChart
          enableScrubbing={false}
          height={350}
          series={[
            {
              id: 'visitors',
              data: [450, 520, 480, 600, 750, 680, 590],
              label: 'Weekly Visitors',
              color: '#fb4d3d',
              type: 'dotted',
            },
            {
              id: 'repeatVisitors',
              data: [250, 200, 150, 140, 100, 80, 50],
              label: 'Weekly Repeat Visitors',
              color: '#16a34a',
            },
            {
              id: 'signups',
              data: [45, 62, 55, 250, 380, 400, 450],
              label: 'Weekly Signups',
              color: '#2563eb',
              type: 'gradient',
            },
          ]}
        />
      </Example>
    </VStack>
  );
};
