import {
  memo,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@coinbase/cds-web/buttons';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { Area } from '../area/Area';
import type { BarProps } from '../bar/Bar';
import { BarChart } from '../bar/BarChart';
import { CartesianChart } from '../CartesianChart';
import { Line, type LineProps } from '../line/Line';
import type { PathProps } from '../Path';
import type { PointBaseProps, PointProps } from '../point';
import { Scrubber, type ScrubberProps, type ScrubberRef } from '../scrubber';

export default {
  title: 'Components/Chart/CartesianChart',
  component: CartesianChart,
  parameters: {
    percy: { skip: true },
  },
};

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

const enterOnly: PathProps['transitions'] = {
  update: null,
};
const updateOnly: PathProps['transitions'] = {
  enter: null,
};
const bothDisabled: PathProps['transitions'] = { enter: null, update: null };
const customEnterUpdate: PathProps['transitions'] = {
  enter: { type: 'tween', duration: 1.5 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const customEnterUpdateBeacon: PathProps['transitions'] = {
  enter: { type: 'tween', duration: 0.5, delay: 1.0 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const slowSpringBoth: PathProps['transitions'] = {
  enter: { type: 'spring', stiffness: 100, damping: 10 },
  update: { type: 'spring', stiffness: 100, damping: 10 },
};
const staggeredBoth: BarProps['transitions'] = {
  enter: { type: 'tween', duration: 0.75, staggerDelay: 0.25 },
  update: { type: 'spring', stiffness: 300, damping: 20, staggerDelay: 0.15 },
};

const TransitionLineChart = memo<{
  data: number[];
  transitions: PathProps['transitions'];
  scrubberTransitions?: PathProps['transitions'];
  animate?: boolean;
  idlePulse?: boolean;
  scrubberRef?: RefObject<ScrubberRef | null>;
  enableScrubbing?: boolean;
  points?: LineProps['points'];
}>(
  ({
    data,
    transitions,
    scrubberTransitions,
    animate: animateProp,
    idlePulse,
    scrubberRef,
    enableScrubbing = true,
    points,
  }) => (
    <CartesianChart
      animate={animateProp}
      enableScrubbing={enableScrubbing}
      height={{ base: 200, tablet: 225, desktop: 250 }}
      inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
      series={[{ id: 'values', data }]}
    >
      <Line points={points} seriesId="values" strokeWidth={3} transitions={transitions} />
      {enableScrubbing && (
        <Scrubber
          ref={scrubberRef as RefObject<ScrubberRef>}
          hideOverlay
          idlePulse={idlePulse}
          transitions={scrubberTransitions ?? transitions}
        />
      )}
    </CartesianChart>
  ),
);

const TransitionAreaChart = memo<{
  data: number[];
  transitions: PathProps['transitions'];
  idlePulse?: boolean;
  scrubberRef?: RefObject<ScrubberRef | null>;
}>(({ data, transitions, idlePulse, scrubberRef }) => (
  <CartesianChart
    enableScrubbing
    height={{ base: 200, tablet: 225, desktop: 250 }}
    inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
    series={[{ id: 'values', data }]}
  >
    <Area seriesId="values" transitions={transitions} />
    <Line seriesId="values" transitions={transitions} />
    <Scrubber
      ref={scrubberRef as RefObject<ScrubberRef>}
      hideOverlay
      idlePulse={idlePulse}
      transitions={transitions}
    />
  </CartesianChart>
));

const MultiLineChart = memo<{
  data1: number[];
  data2: number[];
  transitions: PathProps['transitions'];
}>(({ data1, data2, transitions }) => (
  <CartesianChart
    enableScrubbing
    height={{ base: 200, tablet: 225, desktop: 250 }}
    inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
    series={[
      { id: 'series1', data: data1, label: 'Series 1' },
      { id: 'series2', data: data2, label: 'Series 2' },
    ]}
  >
    <Line seriesId="series1" strokeWidth={3} transitions={transitions} />
    <Line seriesId="series2" strokeWidth={3} transitions={transitions} />
    <Scrubber hideOverlay idlePulse transitions={transitions} />
  </CartesianChart>
));

function LineExample({
  transitions,
  scrubberTransitions,
  pointTransitions,
  animate,
  idlePulse,
  resettable = true,
  imperative = false,
  points,
}: {
  transitions: PathProps['transitions'];
  scrubberTransitions?: ScrubberProps['transitions'];
  pointTransitions?: PointProps['transitions'];
  animate?: boolean;
  idlePulse?: boolean;
  resettable?: boolean;
  imperative?: boolean;
  points?: boolean;
}) {
  const scrubberRef = useRef<ScrubberRef>(null);
  const [data, setData] = useState(generateInitialData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((current) => {
        const last = current[current.length - 1];
        return [...current.slice(1), generateNextValue(last)];
      });
      if (imperative) scrubberRef.current?.pulse();
    }, updateInterval);
    return () => clearInterval(intervalId);
  }, [imperative]);

  const pointFunction: LineProps['points'] = (props: PointBaseProps) => ({
    ...props,
    transitions: pointTransitions,
  });

  const pointProps: LineProps['points'] = points ? pointFunction : false;

  return (
    <VStack gap={2}>
      <TransitionLineChart
        key={resetKey}
        animate={animate}
        data={data}
        idlePulse={idlePulse}
        points={pointProps}
        scrubberRef={imperative ? scrubberRef : undefined}
        scrubberTransitions={scrubberTransitions}
        transitions={transitions}
      />
      {resettable && (
        <Box>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </VStack>
  );
}

function AreaExample({
  transitions,
  idlePulse,
  resettable = true,
  imperative = false,
}: {
  transitions: PathProps['transitions'];
  idlePulse?: boolean;
  resettable?: boolean;
  imperative?: boolean;
}) {
  const scrubberRef = useRef<ScrubberRef>(null);
  const [data, setData] = useState(generateInitialData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((current) => {
        const last = current[current.length - 1];
        return [...current.slice(1), generateNextValue(last)];
      });
      if (imperative) scrubberRef.current?.pulse();
    }, updateInterval);
    return () => clearInterval(intervalId);
  }, [imperative]);

  return (
    <VStack gap={2}>
      <TransitionAreaChart
        key={resetKey}
        data={data}
        idlePulse={idlePulse}
        scrubberRef={imperative ? scrubberRef : undefined}
        transitions={transitions}
      />
      {resettable && (
        <Box>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </VStack>
  );
}

const barCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function generateBarData() {
  return barCategories.map(() => Math.round(Math.random() * 80 + 10));
}

const barChartProps = {
  showXAxis: true,
  enableScrubbing: true,
  height: 250,
  xAxis: { data: barCategories },
  yAxis: { domain: { min: 0, max: 100 } },
} as const;

const TransitionBarChart = memo<{
  data: number[];
  transitions: PathProps['transitions'];
}>(({ data, transitions }) => (
  <BarChart {...barChartProps} series={[{ id: 'values', data }]} transitions={transitions}>
    <Scrubber hideOverlay seriesIds={[]} transitions={transitions} />
  </BarChart>
));

function BarExample({
  transitions,
  resettable = true,
}: {
  transitions: PathProps['transitions'];
  resettable?: boolean;
}) {
  const [data, setData] = useState(generateBarData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(generateBarData());
    }, updateInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <VStack gap={2}>
      <TransitionBarChart key={resetKey} data={data} transitions={transitions} />
      {resettable && (
        <Box>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </VStack>
  );
}

function MultiLineExample({ transitions }: { transitions: PathProps['transitions'] }) {
  const [data1, setData1] = useState(generateInitialData);
  const [data2, setData2] = useState(generateInitialData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData1((current) => {
        const last = current[current.length - 1];
        return [...current.slice(1), generateNextValue(last)];
      });
      setData2((current) => {
        const last = current[current.length - 1];
        return [...current.slice(1), generateNextValue(last)];
      });
    }, updateInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <VStack gap={2}>
      <MultiLineChart key={resetKey} data1={data1} data2={data2} transitions={transitions} />
      <Box>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </VStack>
  );
}

const Example = ({
  category,
  title,
  children,
}: PropsWithChildren<{ category: string; title: string }>) => (
  <VStack gap={2}>
    <VStack gap={0.5}>
      <Text color="fgMuted" font="label2">
        {category}
      </Text>
      <Text font="title3">{title}</Text>
    </VStack>
    {children}
  </VStack>
);

export const Transitions = () => {
  return (
    <VStack gap={4}>
      <Example category="Line" title="Enter Only">
        <LineExample idlePulse transitions={enterOnly} />
      </Example>
      <Example category="Line" title="Update Only">
        <LineExample idlePulse points pointTransitions={updateOnly} transitions={updateOnly} />
      </Example>
      <Example category="Line" title="Both Disabled">
        <LineExample transitions={bothDisabled} />
      </Example>
      <Example category="Line" title="Custom">
        <LineExample
          points
          pointTransitions={customEnterUpdateBeacon}
          scrubberTransitions={customEnterUpdateBeacon}
          transitions={customEnterUpdate}
        />
      </Example>
      <Example category="Line" title="Imperative Pulse">
        <LineExample imperative resettable={false} transitions={updateOnly} />
      </Example>
      <Example category="Multi-Line" title="Update Only">
        <MultiLineExample transitions={updateOnly} />
      </Example>
      <Example category="Area" title="Both Disabled">
        <AreaExample transitions={bothDisabled} />
      </Example>
      <Example category="Area" title="Imperative Pulse">
        <AreaExample imperative resettable={false} transitions={updateOnly} />
      </Example>
      <Example category="Bar" title="Enter Only">
        <BarExample transitions={enterOnly} />
      </Example>
      <Example category="Bar" title="Update Only">
        <BarExample transitions={updateOnly} />
      </Example>
      <Example category="Bar" title="Both Disabled">
        <BarExample transitions={bothDisabled} />
      </Example>
      <Example category="Bar" title="Slow Spring Both">
        <BarExample transitions={slowSpringBoth} />
      </Example>
      <Example category="Bar" title="Staggered Both">
        <BarExample transitions={staggeredBoth} />
      </Example>
    </VStack>
  );
};
