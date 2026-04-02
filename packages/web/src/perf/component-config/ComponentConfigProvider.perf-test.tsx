import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

import type { ComponentConfig } from '../../core/componentConfig';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';

const consumerCount = 1000;
const updateIterations = 50;

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
  return <div data-compact={String(mergedProps.compact)} data-index={index} />;
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
  const [unrelatedUpdates, setUnrelatedUpdates] = React.useState(0);

  const value: ComponentConfig = React.useMemo(
    () => ({
      Avatar: () => (unrelatedUpdates % 2 === 0 ? {} : {}),
      Button: stableButtonConfig,
    }),
    [unrelatedUpdates],
  );

  return (
    <>
      <button data-testid="update-unrelated-key" onClick={() => setUnrelatedUpdates((v) => v + 1)}>
        Update unrelated key
      </button>
      <ComponentConfigProvider value={value}>
        <ButtonConfigConsumerList count={count} />
      </ComponentConfigProvider>
    </>
  );
};

const TargetKeyUpdateHarness = ({ count }: { count: number }) => {
  const [targetUpdates, setTargetUpdates] = React.useState(0);

  const value: ComponentConfig = React.useMemo(
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
      <button data-testid="update-target-key" onClick={() => setTargetUpdates((v) => v + 1)}>
        Update target key
      </button>
      <ComponentConfigProvider value={value}>
        <ButtonConfigConsumerList count={count} />
      </ComponentConfigProvider>
    </>
  );
};

describe('ComponentConfigProvider performance tests', () => {
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
        fireEvent.click(screen.getByTestId('update-unrelated-key'));
      }
    };

    await measurePerformance(<UnrelatedKeyUpdateHarness count={consumerCount} />, { scenario });
  });

  it('Scenario C: updates target component key 50 times', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.click(screen.getByTestId('update-target-key'));
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
