import React from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@cbhq/cds-mobile';
import { VStack } from '@cbhq/cds-mobile/layout';
import { Icon } from '@cbhq/cds-mobile/icons';
import { Text } from '@cbhq/cds-mobile/typography';
import type { IconName } from '@cbhq/cds-common/types';

export type TabBarButtonProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function TabBarButton({ icon, label, active = false, onPress, style }: TabBarButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="tab"
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: theme.space[1],
        },
        style,
      ]}
    >
      <VStack alignItems="center" gap={0.25}>
        <Icon name={icon} size="s" color={active ? 'fgPrimary' : 'fgMuted'} active={active} />
        <Text font="legal" color={active ? 'fgPrimary' : 'fgMuted'} numberOfLines={1}>
          {label}
        </Text>
      </VStack>
    </Pressable>
  );
}
