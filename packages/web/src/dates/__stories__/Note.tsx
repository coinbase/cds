import React from 'react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

export const Note = ({ children }: { children: React.ReactNode }) => (
  <>
    <VStack background="bgAlternate" borderRadius={200} padding={2}>
      <Text as="p" display="block" font="label2">
        {children}
      </Text>
    </VStack>
    <br />
  </>
);
