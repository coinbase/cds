import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import type { CardHeaderProps } from '@cbhq/cds-common/types';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Avatar } from '../media/Avatar';
import { Text } from '../typography/Text';

export const CardHeader = memo(function CardHeader({
  avatar,
  metaData,
  description,
  action,
  testID,
}: CardHeaderProps) {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      paddingTop={2}
      paddingX={gutter}
      testID={testID}
    >
      <HStack alignItems="center" flexGrow={1} gap={1}>
        {avatar ? (
          <Avatar alt={description ?? avatar} shape="circle" size="xl" src={avatar} />
        ) : null}
        <VStack>
          {description ? <Text font="label1">{description}</Text> : null}
          {metaData ? (
            <Text color="fgMuted" font="legal">
              {metaData}
            </Text>
          ) : null}
        </VStack>
      </HStack>
      {action}
    </HStack>
  );
});
