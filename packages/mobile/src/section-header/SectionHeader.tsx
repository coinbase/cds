import React, { memo } from 'react';
import type { View } from 'react-native';
import type { SectionHeaderProps } from '@coinbase/cds-common/types/SectionHeaderProps';
import type { IconName } from '@coinbase/cds-icons';

import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export const SectionHeader = memo(function SectionHeader({
  ref,
  title,
  start,
  icon,
  iconActive,
  testID,
  balance,
  description,
  end,
  accessibilityLabel,
  padding = 2,
  ...props
}: SectionHeaderProps & {
  ref?: React.Ref<View>;
}) {
  return (
    <HStack
      ref={ref}
      accessibilityLabel={accessibilityLabel}
      flexWrap="wrap"
      gap={1}
      justifyContent="space-between"
      padding={padding}
      testID={testID as string}
      {...props}
    >
      <VStack gap={0.5}>
        <HStack alignItems="center" gap={1}>
          {!!start && start}
          {typeof title === 'string' ? (
            <Text accessibilityRole="header" font="title3">
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof icon === 'string' ? (
            <Icon active={iconActive} color="fg" name={icon as IconName} size="xs" />
          ) : (
            icon
          )}
        </HStack>
        {typeof balance === 'string' ? <Text font="title3">{balance}</Text> : balance}
        {typeof description === 'string' ? (
          <Text color="fgMuted" font="body" numberOfLines={2}>
            {description}
          </Text>
        ) : (
          description
        )}
      </VStack>
      {!!end && <HStack>{end}</HStack>}
    </HStack>
  );
});
