import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { IconSize, ValidateProps } from '@coinbase/cds-common/types';
import { formatCount } from '@coinbase/cds-common/utils/formatCount';
import type { IconName } from '@coinbase/cds-icons';

import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system/Pressable';
import { Text } from '../typography/Text';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or a ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | IconName;
  /**
   * @deprecated Use `size` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v8
   */
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
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
};

export type IconCounterButtonProps = IconCounterButtonBaseProps &
  Omit<PressableProps<PressableDefaultElement>, 'background'>;

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
      background = 'transparent',
      ...props
    }: IconCounterButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) {
    return (
      <Pressable
        ref={ref}
        background={background}
        {...(props satisfies ValidateProps<
          typeof props,
          Omit<IconCounterButtonProps, keyof PressableProps<PressableDefaultElement>>
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
            <Text mono as="p" display="block" font="label1">
              {formatCount(count)}
            </Text>
          ) : null}
        </HStack>
      </Pressable>
    );
  }),
);
