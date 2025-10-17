import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { IconSize, ValidateProps } from '@coinbase/cds-common/types';
import { formatCount } from '@coinbase/cds-common/utils/formatCount';
import type { IconName } from '@coinbase/cds-icons';

import { Icon } from '../icons';
import { HStack } from '../layout';
import type { PressableProps } from '../system';
import { Pressable } from '../system';
import { Text } from '../typography/Text';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or a ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | IconName;
  /** @deprecated Use `size` instead. This prop will be removed in a future version. */
  iconSize?: IconSize;
  /** Size for given icon. */
  size?: IconSize;
  /** Whether the icon is active */
  active?: boolean;
  /** Number to display */
  count?: number;
  /** Color of the icon */
  color?: ThemeVars.Color;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
};

export type IconCounterButtonProps = IconCounterButtonBaseProps & PressableProps;

export const IconCounterButton = memo(
  forwardRef(function IconCounterButton(
    {
      icon,
      iconSize = 's',
      size = iconSize,
      active,
      count = 0,
      color = 'fg',
      dangerouslySetColor,
      ...props
    }: IconCounterButtonProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <Pressable
        ref={ref}
        background="transparent"
        {...(props satisfies ValidateProps<
          typeof props,
          Omit<IconCounterButtonProps, keyof PressableProps>
        >)}
      >
        <HStack alignItems="center" gap={1}>
          {typeof icon === 'string' ? (
            <Icon
              active={active}
              color={color}
              dangerouslySetColor={dangerouslySetColor}
              name={icon as IconName}
              size={size}
            />
          ) : (
            icon
          )}
          {count > 0 ? (
            <Text mono font="label1">
              {formatCount(count)}
            </Text>
          ) : null}
        </HStack>
      </Pressable>
    );
  }),
);
