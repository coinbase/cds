import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';

import { Area } from '../area/Area';
import { BarChart } from '../bar/BarChart';
import { CartesianChart } from '../CartesianChart';
import { Line } from '../line/Line';
import { Scrubber, type ScrubberRef } from '../scrubber';
import type { BarChartTransition } from '../utils/bar';
import type { ChartTransition } from '../utils/transition';

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

// Transition presets
const enterOnly: ChartTransition = {
  update: null,
};
const updateOnly: ChartTransition = {
  enter: null,
};
const bothDisabled: ChartTransition = { enter: null, update: null };
const instantEnter: ChartTransition = {
  enter: { type: 'timing', duration: 0 },
};
const instantUpdate: ChartTransition = {
  update: { type: 'timing', duration: 0 },
};
const customEnterUpdate: ChartTransition = {
  enter: { type: 'timing', duration: 1500 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const customEnterUpdateBeacon: ChartTransition = {
  enter: { type: 'timing', duration: 500, delay: 1000 },
  update: { type: 'spring', stiffness: 400, damping: 30 },
};
const slowEnterNoUpdate: ChartTransition = {
  enter: { type: 'timing', duration: 5000 },
  update: null,
};
const slowEnterDelayedBeacon: ChartTransition = {
  enter: { type: 'timing', duration: 1000, delay: 4000 },
  update: null,
};
const slowSpringEnter: ChartTransition = {
  enter: { type: 'spring', stiffness: 100, damping: 10 },
  update: null,
};
const slowSpringUpdate: ChartTransition = {
  enter: null,
  update: { type: 'spring', stiffness: 100, damping: 10 },
};
const slowSpringBoth: ChartTransition = {
  enter: { type: 'spring', stiffness: 100, damping: 10 },
  update: { type: 'spring', stiffness: 100, damping: 10 },
};
const staggeredEnter: BarChartTransition = {
  enter: { type: 'timing', duration: 750, staggerDelay: 250 },
  update: null,
};
const staggeredUpdate: BarChartTransition = {
  enter: null,
  update: { type: 'spring', stiffness: 300, damping: 20, staggerDelay: 150 },
};
const staggeredBoth: BarChartTransition = {
  enter: { type: 'timing', duration: 750, staggerDelay: 250 },
  update: { type: 'spring', stiffness: 300, damping: 20, staggerDelay: 150 },
};

// --- Reusable Chart Components ---

const TransitionLineChart = memo<{
  data: number[];
  transitions: ChartTransition;
  scrubberTransitions?: ChartTransition;
  animate?: boolean;
  idlePulse?: boolean;
  scrubberRef?: React.RefObject<ScrubberRef | null>;
  enableScrubbing?: boolean;
}>(
  ({
    data,
    transitions,
    scrubberTransitions,
    animate: animateProp,
    idlePulse,
    scrubberRef,
    enableScrubbing = true,
  }) => (
    <CartesianChart
      animate={animateProp}
      enableScrubbing={enableScrubbing}
      height={200}
      inset={{ top: 16, bottom: 16, left: 16, right: 16 }}
      series={[{ id: 'values', data }]}
    >
      <Line seriesId="values" strokeWidth={3} transitions={transitions} />
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
  transitions: ChartTransition;
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
  transitions: ChartTransition;
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
  animate,
  idlePulse,
  resettable = true,
  imperative = false,
}: {
  transitions: ChartTransition;
  scrubberTransitions?: ChartTransition;
  animate?: boolean;
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
      <TransitionLineChart
        key={resetKey}
        animate={animate}
        data={data}
        idlePulse={idlePulse}
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
  transitions: ChartTransition;
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
  transitions: ChartTransition;
}>(({ data, transitions }) => (
  <BarChart {...barChartProps} series={[{ id: 'values', data }]} transitions={transitions}>
    <Scrubber hideOverlay seriesIds={[]} transitions={transitions} />
  </BarChart>
));

function BarExample({
  transitions,
  resettable = true,
}: {
  transitions: ChartTransition;
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

function MultiLineExample({ transitions }: { transitions: ChartTransition }) {
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
      // Line Transitions
      {
        category: 'Line',
        title: 'Enter Only',
        component: <LineExample idlePulse transitions={enterOnly} />,
      },
      {
        category: 'Line',
        title: 'Update Only',
        component: <LineExample idlePulse transitions={updateOnly} />,
      },
      {
        category: 'Line',
        title: 'Both Disabled',
        component: <LineExample transitions={bothDisabled} />,
      },
      {
        category: 'Line',
        title: 'Instant Enter',
        component: <LineExample transitions={instantEnter} />,
      },
      {
        category: 'Line',
        title: 'Instant Update',
        component: <LineExample transitions={instantUpdate} />,
      },
      {
        category: 'Line',
        title: 'Custom',
        component: (
          <LineExample
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
        category: 'Line',
        title: 'Slow Enter',
        component: (
          <LineExample
            idlePulse
            scrubberTransitions={slowEnterDelayedBeacon}
            transitions={slowEnterNoUpdate}
          />
        ),
      },
      {
        category: 'Line',
        title: 'No Animate',
        component: <LineExample animate={false} transitions={updateOnly} />,
      },
      {
        category: 'Line',
        title: 'No Animate Off',
        component: <LineExample animate={false} transitions={bothDisabled} />,
      },
      {
        category: 'Multi-Line',
        title: 'Update Only',
        component: <MultiLineExample transitions={updateOnly} />,
      },
      {
        category: 'Multi-Line',
        title: 'Enter Only',
        component: <MultiLineExample transitions={enterOnly} />,
      },
      {
        category: 'Multi-Line',
        title: 'Both Disabled',
        component: <MultiLineExample transitions={bothDisabled} />,
      },
      // Area Transitions
      {
        category: 'Area',
        title: 'Enter Only',
        component: <AreaExample idlePulse transitions={enterOnly} />,
      },
      {
        category: 'Area',
        title: 'Update Only',
        component: <AreaExample idlePulse transitions={updateOnly} />,
      },
      {
        category: 'Area',
        title: 'Both Disabled',
        component: <AreaExample transitions={bothDisabled} />,
      },
      {
        category: 'Area',
        title: 'Instant Enter',
        component: <AreaExample transitions={instantEnter} />,
      },
      {
        category: 'Area',
        title: 'Instant Update',
        component: <AreaExample transitions={instantUpdate} />,
      },
      {
        category: 'Area',
        title: 'Imperative Pulse',
        component: <AreaExample imperative resettable={false} transitions={updateOnly} />,
      },
      // Bar Transitions
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
        title: 'Instant Enter',
        component: <BarExample transitions={instantEnter} />,
      },
      {
        category: 'Bar',
        title: 'Instant Update',
        component: <BarExample transitions={instantUpdate} />,
      },
      {
        category: 'Bar',
        title: 'Slow Spring Enter',
        component: <BarExample transitions={slowSpringEnter} />,
      },
      {
        category: 'Bar',
        title: 'Slow Spring Update',
        component: <BarExample transitions={slowSpringUpdate} />,
      },
      {
        category: 'Bar',
        title: 'Slow Spring Both',
        component: <BarExample transitions={slowSpringBoth} />,
      },
      {
        category: 'Bar',
        title: 'Staggered Enter',
        component: <BarExample transitions={staggeredEnter} />,
      },
      {
        category: 'Bar',
        title: 'Staggered Update',
        component: <BarExample transitions={staggeredUpdate} />,
      },
      {
        category: 'Bar',
        title: 'Staggered Both',
        component: <BarExample transitions={staggeredBoth} />,
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
