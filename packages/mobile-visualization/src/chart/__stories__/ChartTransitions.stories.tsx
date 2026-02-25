import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@coinbase/cds-mobile/buttons/Button';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';

import { Area } from '../area/Area';
import type { BarProps } from '../bar/Bar';
import { BarChart } from '../bar/BarChart';
import { CartesianChart } from '../CartesianChart';
import { Line, type LineProps } from '../line/Line';
import type { PathProps } from '../Path';
import type { PointBaseProps, PointProps } from '../point';
import { Scrubber, type ScrubberRef } from '../scrubber';

const dataCount = 15;
const updateInterval = 2500;
const rapidUpdateInterval = 800;

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

// Transition presets
const enterOnly: PathProps['transitions'] = {
  update: null,
};
const updateOnly: PathProps['transitions'] = {
  enter: null,
};
const bothDisabled: PathProps['transitions'] = { enter: null, update: null };
const customEnterUpdate: PathProps['transitions'] = {
  enter: { type: 'timing', duration: 1500 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const customEnterUpdateBeacon: PathProps['transitions'] = {
  enter: { type: 'timing', duration: 500, delay: 1000 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const slowSpringBoth: PathProps['transitions'] = {
  enter: { type: 'spring', stiffness: 100, damping: 10 },
  update: { type: 'spring', stiffness: 100, damping: 10 },
};
const staggeredBoth: BarProps['transitions'] = {
  enter: { type: 'timing', duration: 750, staggerDelay: 250 },
  update: { type: 'spring', stiffness: 300, damping: 20, staggerDelay: 150 },
};
const slowTimingBoth: PathProps['transitions'] = {
  enter: { type: 'timing', duration: 2000 },
  update: { type: 'timing', duration: 2000 },
};

// --- Reusable Chart Components ---

const TransitionLineChart = memo<{
  data: number[];
  transitions: PathProps['transitions'];
  scrubberTransitions?: PathProps['transitions'];
  animate?: boolean;
  idlePulse?: boolean;
  scrubberRef?: React.RefObject<ScrubberRef | null>;
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
      height={200}
      inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
      series={[{ id: 'values', data }]}
    >
      <Line points={points} seriesId="values" strokeWidth={3} transitions={transitions} />
      {enableScrubbing && (
        <Scrubber
          ref={scrubberRef as React.RefObject<ScrubberRef>}
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
  scrubberRef?: React.RefObject<ScrubberRef | null>;
}>(({ data, transitions, idlePulse, scrubberRef }) => (
  <CartesianChart
    enableScrubbing
    height={200}
    inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
    series={[{ id: 'values', data }]}
  >
    <Area seriesId="values" transitions={transitions} />
    <Line seriesId="values" transitions={transitions} />
    <Scrubber
      ref={scrubberRef as React.RefObject<ScrubberRef>}
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
    height={200}
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

// --- Self-contained Example Wrappers ---

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
  scrubberTransitions?: PathProps['transitions'];
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
        <Box paddingX={2}>
          <Button compact onPress={handleReset} variant="secondary">
            Reset
          </Button>
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
        <Box paddingX={2}>
          <Button compact onPress={handleReset} variant="secondary">
            Reset
          </Button>
        </Box>
      )}
    </VStack>
  );
}

// --- Bar Chart Components ---

const barCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function generateBarData() {
  return barCategories.map(() => Math.round(Math.random() * 80 + 10));
}

const barChartProps = {
  showXAxis: true,
  enableScrubbing: true,
  height: 200,
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
        <Box paddingX={2}>
          <Button compact onPress={handleReset} variant="secondary">
            Reset
          </Button>
        </Box>
      )}
    </VStack>
  );
}

function RapidLineExample({ transitions }: { transitions: PathProps['transitions'] }) {
  const [data, setData] = useState(generateInitialData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((current) => {
        const last = current[current.length - 1];
        return [...current.slice(1), generateNextValue(last)];
      });
    }, rapidUpdateInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <VStack gap={2}>
      <TransitionLineChart key={resetKey} data={data} transitions={transitions} />
      <Box paddingX={2}>
        <Button compact onPress={handleReset} variant="secondary">
          Reset
        </Button>
      </Box>
    </VStack>
  );
}

function RapidBarExample({ transitions }: { transitions: PathProps['transitions'] }) {
  const [data, setData] = useState(generateBarData);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(generateBarData());
    }, rapidUpdateInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <VStack gap={2}>
      <TransitionBarChart key={resetKey} data={data} transitions={transitions} />
      <Box paddingX={2}>
        <Button compact onPress={handleReset} variant="secondary">
          Reset
        </Button>
      </Box>
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
      <Box paddingX={2}>
        <Button compact onPress={handleReset} variant="secondary">
          Reset
        </Button>
      </Box>
    </VStack>
  );
}

// --- Main Navigator ---

type ExampleItem = {
  category: string;
  title: string;
  component: React.ReactNode;
};

function ExampleNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      {
        category: 'Line',
        title: 'Enter Only',
        component: <LineExample idlePulse transitions={enterOnly} />,
      },
      {
        category: 'Line',
        title: 'Update Only',
        component: (
          <LineExample idlePulse points pointTransitions={updateOnly} transitions={updateOnly} />
        ),
      },
      {
        category: 'Line',
        title: 'Both Disabled',
        component: <LineExample transitions={bothDisabled} />,
      },
      {
        category: 'Line',
        title: 'Custom 2',
        component: (
          <LineExample
            points
            pointTransitions={customEnterUpdateBeacon}
            scrubberTransitions={customEnterUpdateBeacon}
            transitions={customEnterUpdate}
          />
        ),
      },
      {
        category: 'Line',
        title: 'Imperative Pulse',
        component: <LineExample imperative resettable={false} transitions={updateOnly} />,
      },
      {
        category: 'Multi-Line',
        title: 'Update Only',
        component: <MultiLineExample transitions={updateOnly} />,
      },
      {
        category: 'Area',
        title: 'Both Disabled',
        component: <AreaExample transitions={bothDisabled} />,
      },
      {
        category: 'Area',
        title: 'Imperative Pulse',
        component: <AreaExample imperative resettable={false} transitions={updateOnly} />,
      },
      {
        category: 'Bar',
        title: 'Enter Only',
        component: <BarExample transitions={enterOnly} />,
      },
      {
        category: 'Bar',
        title: 'Update Only',
        component: <BarExample transitions={updateOnly} />,
      },
      {
        category: 'Bar',
        title: 'Both Disabled',
        component: <BarExample transitions={bothDisabled} />,
      },
      {
        category: 'Bar',
        title: 'Slow Spring Both',
        component: <BarExample transitions={slowSpringBoth} />,
      },
      {
        category: 'Bar',
        title: 'Staggered Both',
        component: <BarExample transitions={staggeredBoth} />,
      },
      {
        category: 'Line',
        title: 'Rapid Interrupts',
        component: <RapidLineExample transitions={slowTimingBoth} />,
      },
      {
        category: 'Bar',
        title: 'Rapid Interrupts',
        component: <RapidBarExample transitions={slowTimingBoth} />,
      },
    ],
    [],
  );

  const currentExample = examples[currentIndex];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  }, [examples.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
  }, [examples.length]);

  return (
    <ExampleScreen paddingX={0}>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" paddingX={1}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center">
            <Text color="fgMuted" font="label2">
              {currentExample.category}
            </Text>
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
        <Box key={currentIndex}>{currentExample.component}</Box>
      </VStack>
    </ExampleScreen>
  );
}

export default ExampleNavigator;
