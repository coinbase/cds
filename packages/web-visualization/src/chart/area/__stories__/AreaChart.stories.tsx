import { useEffect, useRef, useState } from 'react';
import { VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { CartesianChart } from '../../CartesianChart';
import { DottedLine, Line } from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import type { ScrubberRef } from '../../scrubber/Scrubber';
import type { ChartTransition } from '../../utils';
import { Area, AreaChart } from '..';

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

export const Transitions = () => {
  const dataCount = 15;
  const updateInterval = 2500;

  function generateNextValue(previousValue: number) {
    const step = Math.random() * 30 - 15;
    return Math.max(0, Math.min(100, previousValue + step));
  }

  function generateInitialData() {
    const data = [50];
    for (let i = 1; i < dataCount; i++) {
      data.push(generateNextValue(data[i - 1]));
    }
    return data;
  }

  const enterOnly: ChartTransition = { update: null, enter: { type: 'tween', duration: 1.0 } };
  const updateOnly: ChartTransition = {
    enter: null,
    update: { type: 'spring', stiffness: 900, damping: 120, mass: 8 },
  };
  const bothDisabled: ChartTransition = { enter: null, update: null };
  const instantEnter: ChartTransition = {
    enter: { type: 'tween', duration: 0 },
    update: { type: 'spring', stiffness: 900, damping: 120, mass: 8 },
  };
  const instantUpdate: ChartTransition = {
    enter: { type: 'tween', duration: 1.0 },
    update: { type: 'tween', duration: 0 },
  };

  function TransitionChart({
    data,
    transitions,
    idlePulse,
    scrubberRef,
  }: {
    data: number[];
    transitions: ChartTransition;
    idlePulse?: boolean;
    scrubberRef?: React.RefObject<ScrubberRef | null>;
  }) {
    return (
      <CartesianChart
        enableScrubbing
        height={{ base: 200, tablet: 225, desktop: 250 }}
        inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
        series={[{ id: 'values', data }]}
      >
        <Area seriesId="values" transitions={transitions} />
        <Line seriesId="values" transitions={transitions} />
        <Scrubber
          ref={scrubberRef as React.RefObject<ScrubberRef>}
          hideOverlay
          beaconTransitions={transitions}
          idlePulse={idlePulse}
        />
      </CartesianChart>
    );
  }

  function TransitionsStory() {
    const scrubberRef = useRef<ScrubberRef>(null);
    const [data, setData] = useState(generateInitialData);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setData((current) => {
          const last = current[current.length - 1];
          return [...current.slice(1), generateNextValue(last)];
        });
        scrubberRef.current?.pulse();
      }, updateInterval);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <VStack gap={4}>
        <Example title="Enter Only (idlePulse)">
          <TransitionChart data={data} idlePulse transitions={enterOnly} />
        </Example>
        <Example title="Update Only (idlePulse)">
          <TransitionChart data={data} idlePulse transitions={updateOnly} />
        </Example>
        <Example title="Both Disabled (null)">
          <TransitionChart data={data} transitions={bothDisabled} />
        </Example>
        <Example title="Instant Enter (duration: 0)">
          <TransitionChart data={data} transitions={instantEnter} />
        </Example>
        <Example title="Instant Update (duration: 0)">
          <TransitionChart data={data} transitions={instantUpdate} />
        </Example>
        <Example title="Imperative Pulse on Data Change">
          <TransitionChart data={data} scrubberRef={scrubberRef} transitions={updateOnly} />
        </Example>
      </VStack>
    );
  }

  return <TransitionsStory />;
};
