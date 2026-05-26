import React, { memo } from 'react';

import { IconButton } from '../../../../buttons/IconButton';
import { DotCount } from '../../../../dots/DotCount';
import { HStack } from '../../../../layout/HStack';

const dotCounts = [3, 12, 100];

export const DotCountExample = memo(() => {
  return (
    <HStack gap={2}>
      {dotCounts.map((count) => (
        <DotCount key={count} count={count} pin="top-end">
          <IconButton transparent accessibilityLabel="Notifications" iconSize="m" name="bell" />
        </DotCount>
      ))}
    </HStack>
  );
});
