import React, { useMemo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { fireEvent, screen } from '@testing-library/react-native';
import { measurePerformance } from 'reassure';

import type { ComponentConfig } from '../../core/componentConfig';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';

const consumerCount = 1000;
const updateIterations = 50;
const testTimeoutMs = 20000;

const stableButtonConfig: NonNullable<ComponentConfig['Button']> = () => ({
  compact: true,
});

const stableAvatarConfig: NonNullable<ComponentConfig['Avatar']> = () => ({});

type ConsumerProps = {
  index: number;
};

const ButtonConfigConsumer = ({ index }: ConsumerProps) => {
  const mergedProps = useComponentConfig('Button', {
    compact: false,
    variant: 'primary',
  });

  return <Text testID={`consumer-${index}`}>{mergedProps.compact ? 'compact' : 'default'}</Text>;
};

const ButtonConfigConsumerList = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ButtonConfigConsumer key={index} index={index} />
      ))}
    </>
  );
};

const UnrelatedKeyUpdateHarness = ({ count }: { count: number }) => {
  const [unrelatedUpdates, setUnrelatedUpdates] = useState(0);

  const value: ComponentConfig = useMemo(
    () => ({
      Avatar: () => (unrelatedUpdates % 2 === 0 ? {} : {}),
      Button: stableButtonConfig,
    }),
    [unrelatedUpdates],
  );

  return (
    <>
      <Pressable onPress={() => setUnrelatedUpdates((v) => v + 1)} testID="update-unrelated-key">
        <Text>Update unrelated key</Text>
      </Pressable>
      <ComponentConfigProvider value={value}>
        <ButtonConfigConsumerList count={count} />
      </ComponentConfigProvider>
    </>
  );
};

const TargetKeyUpdateHarness = ({ count }: { count: number }) => {
  const [targetUpdates, setTargetUpdates] = useState(0);

  const value: ComponentConfig = useMemo(
    () => ({
      Avatar: stableAvatarConfig,
      Button: () => ({
        compact: targetUpdates % 2 === 0,
      }),
    }),
    [targetUpdates],
  );

  return (
    <>
      <Pressable onPress={() => setTargetUpdates((v) => v + 1)} testID="update-target-key">
        <Text>Update target key</Text>
      </Pressable>
      <ComponentConfigProvider value={value}>
        <ButtonConfigConsumerList count={count} />
      </ComponentConfigProvider>
    </>
  );
};

describe('ComponentConfigProvider performance tests (mobile)', () => {
  jest.setTimeout(testTimeoutMs);

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Scenario A: renders 1000 consumers under one provider', async () => {
    await measurePerformance(
      <ComponentConfigProvider value={{ Button: stableButtonConfig }}>
        <ButtonConfigConsumerList count={consumerCount} />
      </ComponentConfigProvider>,
    );
  });

  it('Scenario B: updates unrelated component key 50 times', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.press(screen.getByTestId('update-unrelated-key'));
      }
    };

    await measurePerformance(<UnrelatedKeyUpdateHarness count={consumerCount} />, { scenario });
  });

  it('Scenario C: updates target component key 50 times', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.press(screen.getByTestId('update-target-key'));
      }
    };

    await measurePerformance(<TargetKeyUpdateHarness count={consumerCount} />, { scenario });
  });

  it('Scenario D (baseline): no provider with 1000 consumers', async () => {
    await measurePerformance(<ButtonConfigConsumerList count={consumerCount} />);
  });

  it('Scenario D (provider): provider enabled with 1000 consumers', async () => {
    await measurePerformance(
      <ComponentConfigProvider value={{ Button: stableButtonConfig }}>
        <ButtonConfigConsumerList count={consumerCount} />
      </ComponentConfigProvider>,
    );
  });
});
