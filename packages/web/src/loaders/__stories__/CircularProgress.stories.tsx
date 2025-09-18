import React from 'react';

import { Spacer, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { CircularProgress } from '../CircularProgress';

export default {
  component: CircularProgress,
  title: 'Components/Loaders/CircularProgress',
};

export const Determinate = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Determinate
      </Text>
      <Spacer />
      <CircularProgress indeterminate={false} progress={80} radius={30} strokeWidth={4} />
    </VStack>
  );
};
