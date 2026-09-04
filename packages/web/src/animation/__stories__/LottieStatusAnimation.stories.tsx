import React, { useState } from 'react';
import type { LottieStatus } from 'packages/common/dts/types/LottieStatus';

import { Button } from '../../buttons';
import { Box, HStack, VStack } from '../../layout';
import { LottieStatusAnimation } from '../LottieStatusAnimation';

export default {
  component: LottieStatusAnimation,
  title: 'Components/LottieStatusAnimation',
};

const statuses: LottieStatus[] = ['loading', 'success', 'failure', 'pending', 'cardSuccess'];

export const Default = () => {
  const [status, setStatus] = useState<LottieStatus>('loading');

  const [key, setKey] = useState(0);
  const handleReset = () => {
    setKey(key + 1);
    setStatus('loading');
  };

  return (
    <VStack alignSelf="center">
      <LottieStatusAnimation key={key} height={350} status={status} />
      <HStack flexWrap="wrap">
        {statuses.map((item) => (
          <Box padding={1}>
            <Button key={item} onClick={() => setStatus(item)}>
              {item}
            </Button>
          </Box>
        ))}
      </HStack>
      <HStack justifyContent="center">
        <Button onClick={handleReset} variant="secondary">
          Reset animation
        </Button>
      </HStack>
    </VStack>
  );
};
