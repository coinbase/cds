import React, { memo } from 'react';

import { Icon } from '../../../../icons/Icon';
import { HStack } from '../../../../layout/HStack';
import { VStack } from '../../../../layout/VStack';

export const IconExample = memo(() => {
  return (
    <VStack gap={1} width="100%">
      <HStack gap={1}>
        <Icon name="search" size="l" />
        <Icon name="search" size="m" />
        <Icon name="search" size="s" />
        <Icon name="search" size="xs" />
      </HStack>
      <HStack gap={1}>
        <Icon name="add" size="l" />
        <Icon name="add" size="m" />
        <Icon name="add" size="s" />
        <Icon name="add" size="xs" />
      </HStack>
      <HStack gap={1}>
        <Icon name="account" size="l" />
        <Icon name="account" size="m" />
        <Icon name="account" size="s" />
        <Icon name="account" size="xs" />
      </HStack>
    </VStack>
  );
});
