import React, { useCallback, useMemo, useRef } from 'react';
import type { MotionTransition } from '@coinbase/cds-common/types';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { ColorSurge as ColorSurgeComponent, type ColorSurgeRefBaseProps } from '../ColorSurge';
import { Pulse as PulseComponent, type PulseRefBaseProps } from '../Pulse';
import { Shake as ShakeComponent, type ShakeRefBaseProps } from '../Shake';

const ColorSurge = () => {
  const ref = useRef<ColorSurgeRefBaseProps>(null);

  const handleSurgePrimary = useCallback(async () => ref.current?.play('bgPrimary'), []);
  const handleSurgePositive = useCallback(async () => ref.current?.play('bgPositive'), []);
  const handleSurgeNegative = useCallback(async () => ref.current?.play('bgNegative'), []);

  return (
    <VStack gap={3}>
      <Box bordered borderRadius={200} overflow="hidden" padding={3} position="relative">
        <ColorSurgeComponent ref={ref} disableAnimateOnMount />
        <Text font="body">Color Surge</Text>
      </Box>
      <Button onPress={handleSurgePrimary}>Surge - Primary</Button>
      <Button onPress={handleSurgePositive}>Surge - Positive</Button>
      <Button onPress={handleSurgeNegative}>Surge - Negative</Button>
    </VStack>
  );
};

const Shake = () => {
  const ref = useRef<ShakeRefBaseProps>(null);

  const handleShake = useCallback(async () => ref.current?.play(), []);

  return (
    <VStack gap={3}>
      <ShakeComponent ref={ref} disableAnimateOnMount>
        <Box bordered borderRadius={200} padding={3}>
          <Text font="body">Shaking Box</Text>
        </Box>
      </ShakeComponent>
      <Button onPress={handleShake}>Shake</Button>
    </VStack>
  );
};

const Pulse = () => {
  const ref = useRef<PulseRefBaseProps>(null);
  const customRef = useRef<PulseRefBaseProps>(null);
  const handlePulseHeavy = useCallback(async () => ref.current?.play('heavy'), []);
  const handlePulseModerate = useCallback(async () => ref.current?.play('moderate'), []);
  const handlePulseSubtle = useCallback(async () => ref.current?.play('subtle'), []);
  const handleStop = useCallback(() => ref.current?.stop(), []);

  const customTransition: MotionTransition = useMemo(
    () => ({ oneOffDuration: 1000, easing: 'global' }),
    [],
  );
  const handleCustom = useCallback(async () => customRef.current?.play(), []);
  const handleCustomStop = useCallback(() => customRef.current?.stop(), []);

  return (
    <VStack gap={3}>
      <PulseComponent ref={ref} disableAnimateOnMount variant="heavy">
        <Box background="bgPrimary" height={50} width={50} />
        <Box background="bgNegative" height={50} width={50} />
        <Box background="bgPositive" height={50} width={50} />
      </PulseComponent>
      <Button onPress={handlePulseHeavy}>Pulse - Heavy</Button>
      <Button onPress={handlePulseModerate}>Pulse - Moderate</Button>
      <Button onPress={handlePulseSubtle}>Pulse - Subtle</Button>
      <Button onPress={handleStop}>Stop</Button>
      <Text font="body">Custom Transition</Text>
      <PulseComponent ref={customRef} disableAnimateOnMount motionConfig={customTransition}>
        <Box background="bgPrimary" height={50} width={50} />
        <Box background="bgNegative" height={50} width={50} />
        <Box background="bgPositive" height={50} width={50} />
      </PulseComponent>
      <Button onPress={handleCustom}>Pulse - Custom</Button>
      <Button onPress={handleCustomStop}>Stop</Button>
    </VStack>
  );
};

const HintMotionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Color Surge">
        <ColorSurge />
      </Example>
      <Example title="Shake">
        <Shake />
      </Example>
      <Example title="Pulse">
        <Pulse />
      </Example>
    </ExampleScreen>
  );
};

export default HintMotionScreen;
