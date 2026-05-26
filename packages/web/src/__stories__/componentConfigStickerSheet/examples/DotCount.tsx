import { memo } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { DotCount } from '@coinbase/cds-web/dots/DotCount';
import { HStack } from '@coinbase/cds-web/layout/HStack';

const dotCounts = [3, 12, 100];

export const DotCountExample = memo(() => {
  return (
    <HStack alignItems="flex-start" gap={2}>
      {dotCounts.map((count) => (
        <DotCount key={count} count={count} pin="top-end">
          <IconButton transparent accessibilityLabel="Notifications" iconSize="m" name="bell" />
        </DotCount>
      ))}
    </HStack>
  );
});
