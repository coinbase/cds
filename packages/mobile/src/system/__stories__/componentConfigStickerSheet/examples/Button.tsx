import React, { memo } from 'react';

import { Button } from '../../../../buttons/Button';
import { IconButton } from '../../../../buttons/IconButton';
import { HStack } from '../../../../layout/HStack';
import { VStack } from '../../../../layout/VStack';
import { Text } from '../../../../typography/Text';
import { buttonVariants } from '../themeVars';

export const ButtonExample = memo(() => {
  return (
    <VStack gap={1} width="100%">
      <Text font="caption">Regular</Text>
      {buttonVariants.map((variant) => (
        <HStack key={`regular-${variant}`} alignItems="center" gap={1}>
          <Button variant={variant} width={180}>
            Button
          </Button>
          <IconButton
            accessibilityLabel={`add-${variant}`}
            compact={false}
            name="add"
            variant={variant}
          />
        </HStack>
      ))}
      <HStack alignItems="center" gap={1}>
        <Button loading width={180}>
          Button
        </Button>
        <IconButton
          loading
          accessibilityLabel="add-loading"
          compact={false}
          name="add"
          variant="primary"
        />
      </HStack>

      <Text font="caption">Compact</Text>
      {buttonVariants.map((variant) => (
        <HStack key={`compact-${variant}`} alignItems="center" gap={1}>
          <Button compact variant={variant} width={180}>
            Button
          </Button>
          <IconButton
            compact
            accessibilityLabel={`add-compact-${variant}`}
            name="add"
            variant={variant}
          />
        </HStack>
      ))}
      <HStack alignItems="center" gap={1}>
        <Button compact loading width={180}>
          Button
        </Button>
        <IconButton
          compact
          loading
          accessibilityLabel="add-compact-loading"
          name="add"
          variant="primary"
        />
      </HStack>
    </VStack>
  );
});
