import { memo, useMemo } from 'react';
import { type Animated, type StyleProp, View, type ViewProps, type ViewStyle } from 'react-native';
import type { ElevationLevels, ThemeVars } from '@coinbase/cds-common';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps } from '../layout/Box';
import { getInteractableStyles } from '../styles/getInteractableStyles';

/**
 * Custom color overrides for different interaction states.
 * Base colors (background, borderColor) are used directly, while interaction
 * state colors (pressed, disabled) are used as alternative base colors
 * for blending calculations with blend strength and color scheme considerations.
 *
 * @example
 * ```tsx
 * <Interactable
 *   blendStyles={{
 *     background: '#ffffff',
 *     pressedBackground: '#e0e0e0',
 *     borderColor: '#cccccc'
 *   }}
 * />
 * ```
 */
export type InteractableBlendStyles = {
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
};

export type InteractableBaseProps = Omit<BoxBaseProps, 'animated'> & {
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>[];
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Is the element elevated. */
  elevation?: ElevationLevels;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   * */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   * */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
  /** Apply animated styles to the inner container. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Apply styles to the outer container. */
  wrapperStyles?: {
    base?: StyleProp<ViewStyle>;
    pressed?: StyleProp<ViewStyle>;
    disabled?: StyleProp<ViewStyle>;
  };
};

export type InteractableProps = InteractableBaseProps & Omit<ViewProps, 'style'>;

export const Interactable = memo(function Interactable({
  background = 'transparent',
  borderColor = background,
  borderWidth = 100,
  block,
  children,
  disabled,
  pressed,
  style,
  contentStyle,
  wrapperStyles,
  blendStyles,
  transparentWhileInactive,
  transparentWhilePressed,
  ...props
}: InteractableProps) {
  const theme = useTheme();
  const isTransparent = transparentWhileInactive && !pressed;
  const isPressedAndTransparent = transparentWhilePressed && pressed;

  const { wrapperStyles: defaultWrapperStyles, contentStyles } = useMemo(() => {
    const backgroundColor = blendStyles?.background ?? theme.color[background];
    const borderColorValue = blendStyles?.borderColor ?? theme.color[borderColor];

    return getInteractableStyles({
      theme,
      background: isTransparent ? 'transparent' : backgroundColor,
      pressedBackground:
        isTransparent || isPressedAndTransparent
          ? 'transparent'
          : (blendStyles?.pressedBackground ?? backgroundColor),
      disabledBackground: isTransparent
        ? 'transparent'
        : (blendStyles?.disabledBackground ?? backgroundColor),
      borderColor: isTransparent ? 'transparent' : borderColorValue,
      pressedBorderColor:
        isTransparent || isPressedAndTransparent
          ? 'transparent'
          : (blendStyles?.pressedBorderColor ?? borderColorValue),
      disabledBorderColor: isTransparent
        ? 'transparent'
        : (blendStyles?.disabledBorderColor ?? borderColorValue),
    });
  }, [theme, background, isTransparent, isPressedAndTransparent, blendStyles, borderColor]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      defaultWrapperStyles.base,
      wrapperStyles?.base,
      isTransparent && { borderColor: 'transparent' },
      pressed && defaultWrapperStyles.pressed,
      pressed && wrapperStyles?.pressed,
      disabled && defaultWrapperStyles.disabled,
      disabled && wrapperStyles?.disabled,
      style,
    ],
    [block, defaultWrapperStyles, wrapperStyles, isTransparent, style, pressed, disabled],
  );

  const mergedContentStyles = useMemo(
    () => [contentStyle, pressed && contentStyles.pressed, disabled && contentStyles.disabled],
    [contentStyle, contentStyles.disabled, contentStyles.pressed, disabled, pressed],
  );

  return (
    <Box
      animated
      borderColor={borderColor}
      borderWidth={borderWidth}
      style={mergedWrapperStyles}
      {...props}
    >
      <View style={mergedContentStyles}>{children}</View>
    </Box>
  );
});
