import React, { useCallback, useMemo, useState } from 'react';
import type { LottieStatus } from '@coinbase/cds-common';
import { join } from '@coinbase/cds-common';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { Spacer } from '../../layout/Spacer';
import { LottieStatusAnimation } from '../LottieStatusAnimation';

const statuses: LottieStatus[] = ['loading', 'success', 'failure', 'pending', 'cardSuccess'];

const LottieStatusAnimationScreen = () => {
  const [status, setStatus] = useState<LottieStatus>('loading');
  const buttons = useMemo(() => {
    return join(
      statuses.map((item) => (
        <Button key={item} onPress={() => setStatus(item)}>
          {item}
        </Button>
      )),
      <Spacer />,
    );
  }, []);

  const [key, setKey] = useState(0);
  const handleReset = useCallback(() => {
    setKey(key + 1);
    setStatus('loading');
  }, [key]);

  return (
    <ExampleScreen>
      <Example>
        <LottieStatusAnimation key={key} height={250} status={status} />
        <HStack flexWrap="wrap">{buttons}</HStack>
        <Button onPress={handleReset} variant="secondary">
          Reset animation
        </Button>
      </Example>
    </ExampleScreen>
  );
};

export default LottieStatusAnimationScreen;
