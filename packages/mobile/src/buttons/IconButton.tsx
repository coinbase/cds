import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, type PressableStateCallbackType, type ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type { IconButtonVariant, IconName, SharedProps } from '@coinbase/cds-common/types';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

export type IconButtonBaseProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush' | 'loading'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  };

export type IconButtonProps = IconButtonBaseProps;

export const IconButton = memo(function IconButton({
  name,
  active,
  variant = 'secondary',
  transparent,
  compact = true,
  background,
  color,
  borderColor,
  borderWidth = 100,
  borderRadius = 1000,
  feedback = compact ? 'light' : 'normal',
  flush,
  loading,
  style,
  accessibilityHint,
  accessibilityLabel,
  ...props
}: IconButtonProps) {
  const theme = useTheme();
  const iconSize = compact ? 's' : 'm';

  const variantMap = transparent ? transparentVariants : variants;
  const variantStyle = variantMap[variant];

  const colorValue = color ?? variantStyle.color;
  const backgroundValue = background ?? variantStyle.background;
  const borderColorValue = borderColor ?? variantStyle.borderColor;

  const minHeight = interactableHeight[compact ? 'compact' : 'regular'];

  const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

  const sizingStyle = useMemo<ViewStyle>(
    () => ({
      height: minHeight,
      width: minHeight,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    }),
    [minHeight],
  );

  const pressableStyle = useCallback(
    (state: PressableStateCallbackType) => [
      sizingStyle,
      typeof style === 'function' ? style(state) : style,
    ],
    [sizingStyle, style],
  );

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={loading ? `${accessibilityLabel ?? ''}, loading` : accessibilityLabel}
      background={backgroundValue}
      borderColor={borderColorValue}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      feedback={feedback}
      loading={loading}
      marginEnd={marginEnd}
      marginStart={marginStart}
      style={pressableStyle}
      transparentWhileInactive={transparent}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.color[colorValue]}
          size="small"
          style={sizingStyle}
          testID={props.testID ? `${props.testID}-activity-indicator` : undefined}
        />
      ) : (
        /* TO DO: test using currentColor like web does on Icon here */
        <Icon active={active} color={colorValue} name={name} size={iconSize} style={sizingStyle} />
      )}
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
