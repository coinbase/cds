import React, { memo } from 'react';

import { HStack } from '../../../../layout/HStack';
import { VStack } from '../../../../layout/VStack';
import { Tag } from '../../../../tag/Tag';
import { tagColorSchemes } from '../themeVars';

export const TagExample = memo(() => {
  return (
    <VStack gap={1} width="100%">
      <HStack flexWrap="wrap" gap={1}>
        <Tag intent="informational">primary</Tag>
        <Tag intent="promotional">primary</Tag>
      </HStack>
      {tagColorSchemes.map((colorScheme) => (
        <HStack key={colorScheme} flexWrap="wrap" gap={1}>
          <Tag colorScheme={colorScheme} intent="informational">
            {colorScheme}
          </Tag>
          <Tag colorScheme={colorScheme} intent="promotional">
            {colorScheme}
          </Tag>
        </HStack>
      ))}
    </VStack>
  );
});
