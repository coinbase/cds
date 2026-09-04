import React from 'react';

import { Spacer, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { MaterialSpinner } from '../MaterialSpinner';

export default {
  component: MaterialSpinner,
  title: 'Components/Loaders/MaterialSpinner',
};

export const MaterialSpinnerDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Material Spinner
      </Text>
      <Spacer />
      <MaterialSpinner color="bgPrimary" size={30} />
    </VStack>
  );
};
