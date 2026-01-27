import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@coinbase/cds-mobile/buttons/Button';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { RollingNumber } from '@coinbase/cds-mobile/numbers/RollingNumber';
import { Text } from '@coinbase/cds-mobile/typography';

import { SkiaRollingNumberValueSection } from '../RollingNumber/SkiaRollingNumberValueSection';

type PlaybackState = 'paused' | 'playing' | 'fast';

const PlaybackButton = ({ onNext }: { onNext: () => void }) => {
  const [state, setState] = useState<PlaybackState>('paused');

  useEffect(() => {
    if (state === 'paused') return;

    const interval = state === 'playing' ? 1000 : 500;
    const id = setInterval(onNext, interval);
    return () => clearInterval(id);
  }, [state, onNext]);

  const handlePress = useCallback(() => {
    setState((prev) => {
      if (prev === 'paused') return 'playing';
      if (prev === 'playing') return 'fast';
      return 'paused';
    });
  }, []);

  const iconName = state === 'paused' ? 'play' : state === 'playing' ? 'forwardArrow' : 'pause';

  return <IconButton name={iconName} onPress={handlePress} variant="secondary" />;
};

const SkiaRenderer = () => {
  const [price, setPrice] = useState(12345.67);
  const onNext = useCallback(() => {
    setPrice(Math.random() * 180000);
  }, []);

  // increase count to benchmark performance
  const skiaCount = 1;
  const defaultCount = 0;

  return (
    <VStack gap={2}>
      <Text font="label1">Skia Renderer (Single Canvas)</Text>
      {Array.from({ length: skiaCount }).map((_, index) => (
        <RollingNumber
          key={index}
          colorPulseOnUpdate
          RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
          font="display3"
          format={{ style: 'currency', currency: 'USD' }}
          value={price}
        />
      ))}
      {Array.from({ length: defaultCount }).map((_, index) => (
        <RollingNumber
          key={index}
          colorPulseOnUpdate
          font="display3"
          format={{ style: 'currency', currency: 'USD' }}
          value={price}
        />
      ))}
      <HStack gap={1}>
        <Button onPress={onNext}>Next</Button>
        <PlaybackButton onNext={onNext} />
      </HStack>
    </VStack>
  );
};

const SkiaRollingNumberScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Skia Renderer">
        <SkiaRenderer />
      </Example>
    </ExampleScreen>
  );
};

export default SkiaRollingNumberScreen;
