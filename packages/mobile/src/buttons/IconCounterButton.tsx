import React, { memo, useMemo } from 'react';
import type { PressableStateCallbackType, StyleProp, TextStyle, View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import type { ValidateProps } from '@coinbase/cds-common/types/SpreadPropsSafely';
import { formatCount } from '@coinbase/cds-common/utils/formatCount';
import type { IconName } from '@coinbase/cds-icons';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import type { PressableProps } from '../system/Pressable';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or a ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | IconName;
  /** Size for given icon. */
  size?: IconSize;
  /** Whether the icon is active */
  active?: boolean;
  /** Number to display */
  count?: number;
  /** Color of the icon */
  color?: ThemeVars.Color;
  /**
   * @deprecated Use `styles.icon` or `color` to customize icon color. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  dangerouslySetColor?: string;
};

export type IconCounterButtonProps = IconCounterButtonBaseProps &
  PressableProps & {
    /** Custom styles for individual elements of the IconCounterButton component */
    styles?: {
      /** Root Pressable element */
      root?: PressableProps['style'];
      /** Icon element rendered when `icon` is an icon name */
      icon?: StyleProp<TextStyle>;
    };
  };

export const IconCounterButton = memo(function IconCounterButton({
  ref,
  ..._props
}: IconCounterButtonProps & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('IconCounterButton', _props);
  const {
    icon,
    size = 's',
    active,
    count = 0,
    color = 'fg',
    dangerouslySetColor,
    styles,
    style,
    ...props
  } = mergedProps;

  const rootStyleOverride = styles?.root;

  const rootStyle = useMemo<PressableProps['style']>(() => {
    if (typeof style === 'function' || typeof rootStyleOverride === 'function') {
      return (state: PressableStateCallbackType) => {
        const baseStyle = typeof style === 'function' ? style(state) : style;
        const rootOverride =
          typeof rootStyleOverride === 'function' ? rootStyleOverride(state) : rootStyleOverride;
        return [baseStyle, rootOverride];
      };
    }
    return [style, rootStyleOverride];
  }, [rootStyleOverride, style]);

  return (
    <Pressable
      ref={ref}
      background="transparent"
      style={rootStyle}
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
            style={styles?.icon}
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
});
