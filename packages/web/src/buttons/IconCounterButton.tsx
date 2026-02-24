import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { IconSize, ValidateProps } from '@coinbase/cds-common/types';
import { formatCount } from '@coinbase/cds-common/utils/formatCount';
import type { IconName } from '@coinbase/cds-icons';

import { cx } from '../cx';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system/Pressable';
import { Text } from '../typography/Text';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or a ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | IconName;
  /** @deprecated Use `size` instead. */
  iconSize?: IconSize;
  /** Size for given icon. */
  size?: IconSize;
  /** Whether the icon is active */
  active?: boolean;
  /** Number to display */
  count?: number;
  /** Color of the icon */
  color?: ThemeVars.Color;
  /** @deprecated Use `styles.icon`, `classNames.icon`, or `color` to customize icon color. This prop will be removed in a future major version of CDS. */
  dangerouslySetColor?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
};

export type IconCounterButtonProps = IconCounterButtonBaseProps &
  Omit<PressableProps<PressableDefaultElement>, 'background'> & {
    /** Custom inline styles for individual elements of the IconCounterButton component */
    styles?: {
      /** Root Pressable element */
      root?: React.CSSProperties;
      /** Icon element rendered when `icon` is an icon name */
      icon?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the IconCounterButton component */
    classNames?: {
      /** Root Pressable element */
      root?: string;
      /** Icon element rendered when `icon` is an icon name */
      icon?: string;
    };
  };

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
      styles,
      classNames,
      className,
      style,
      ...props
    }: IconCounterButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) {
    return (
      <Pressable
        ref={ref}
        background={background}
        className={cx(className, classNames?.root)}
        style={{ ...style, ...styles?.root }}
        {...(props satisfies ValidateProps<
          typeof props,
          Omit<IconCounterButtonProps, keyof PressableProps<PressableDefaultElement>>
        >)}
      >
        <HStack alignItems="center" gap={1}>
          {typeof icon === 'string' ? (
            <Icon
              active={active}
              className={classNames?.icon}
              color={color}
              dangerouslySetColor={dangerouslySetColor}
              name={icon as IconName}
              size={size}
              style={styles?.icon}
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
