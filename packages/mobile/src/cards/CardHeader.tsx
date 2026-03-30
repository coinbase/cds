import React, { memo } from 'react';
import type { CardHeaderProps as CardHeaderBaseProps } from '@coinbase/cds-common/types';

import { HStack } from '../layout/HStack';
import { RemoteImage } from '../media/RemoteImage';
import { Text } from '../typography/Text';

/**
 * @deprecated Use ContentCardHeaderProps instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type CardHeaderProps = CardHeaderBaseProps;

/**
 * @deprecated Use ContentCardHeader instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const CardHeader = memo(
  ({ avatar, metaData, description, action, testID }: CardHeaderProps) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={3}
        paddingY={2}
        testID={testID}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {avatar ? (
            <RemoteImage height={32} resizeMode="center" source={{ uri: avatar }} width={32} />
          ) : null}
          {!!description && <Text font="label1">{description}</Text>}
          {!!metaData && <Text font="legal">{metaData}</Text>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
