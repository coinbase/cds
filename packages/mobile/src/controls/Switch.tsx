import React, { memo, useMemo } from 'react';
import { type StyleProp, StyleSheet, type View, type ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, type ControlIconProps } from './Control';

/** Border width of the switch head/handle, kept as a hairline regardless of theme. */
const switchThumbBorderWidth = 0.5;

/** Semantic color variants for Switch, matching the semantics used by other control components. */
export type SwitchVariant = 'primary' | 'positive' | 'negative';

/** Track background color applied when Switch is checked, keyed by `variant`. */
const switchVariantBackground: Record<SwitchVariant, ThemeVars.Color> = {
  primary: 'bgPrimary',
  positive: 'bgPositive',
  negative: 'bgNegative',
};

export type SwitchBaseProps<SwitchValue extends string> = Omit<
  ControlBaseProps<SwitchValue>,
  'controlSize' | 'dotSize'
> & {
  /**
   * Semantic color variant applied to the track when checked. The `background` prop always
   * takes priority over the background set by the variant, as does any custom `style`/`styles.control`.
   * @default primary
   */
  variant?: SwitchVariant;
};

export type SwitchProps<SwitchValue extends string> = SwitchBaseProps<SwitchValue> & {
  /**
   * Label content rendered next to the switch control.
   *
   * @example
   * ```tsx
   * <Switch onChange={handleChange}>Dark mode</Switch>
   * ```
   */
  children?: React.ReactNode;
  /** Slot-level styles for Switch. */
  styles?: {
    /** Persistent outer wrapper across all variants. */
    root?: StyleProp<ViewStyle>;
    /**
     * Control wrapper style.
     * Applied to the underlying `Control` element (same element that receives `style`).
     */
    control?: StyleProp<ViewStyle>;
  };
};

const SwitchIcon = ({
  pressed,
  checked,
  disabled,
  controlColor,
  background = 'bgTertiary',
  borderColor,
  borderRadius = 1000,
  borderWidth = 0,
  animatedScaleValue,
  testID,
  elevation,
}: ControlIconProps) => {
  const theme = useTheme();

  const borderSize = theme.borderWidth[borderWidth];
  const defaultControlColor = theme.activeColorScheme === 'dark' ? 'fg' : 'fgInverse';

  const { switchWidth, switchHeight, switchThumbSize } = theme.controlSize;

  // Inset that keeps the thumb centered within the track regardless of the
  // configured track/thumb sizes (built-in themes use a 1px inset).
  const thumbInset = (switchHeight - switchThumbSize) / 2;

  const trackStyle = useMemo(
    () => [
      {
        width: switchWidth,
        height: switchHeight,
      } as const,
    ],
    [switchWidth, switchHeight],
  );

  const thumbStyle = useMemo(
    () => [
      styles.thumb,
      {
        width: switchThumbSize,
        height: switchThumbSize,
        position: 'absolute',
        top: thumbInset - borderSize,
        left: thumbInset - borderSize,
        borderWidth: switchThumbBorderWidth,
      } as const,
      {
        transform: [
          {
            translateX: animatedScaleValue.interpolate({
              inputRange: [0.9, 1],
              outputRange: [0, switchWidth - switchThumbSize - thumbInset * 2],
            }),
          },
        ],
      },
    ],
    [animatedScaleValue, borderSize, thumbInset, switchThumbSize, switchWidth],
  );

  return (
    <Interactable
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      disabled={disabled}
      pressed={pressed}
      style={trackStyle}
      testID={testID}
    >
      <Interactable
        background={controlColor ?? defaultControlColor}
        borderColor="bgLine"
        borderRadius={borderRadius}
        borderWidth={100}
        disabled={disabled}
        elevation={elevation}
        pressed={pressed}
        style={thumbStyle}
        testID="switch-thumb"
      />
    </Interactable>
  );
};

const SwitchWithRef = function SwitchWithRef<SwitchValue extends string>({
  ref,
  ..._props
}: SwitchProps<SwitchValue> & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('Switch', _props);
  const {
    children,
    style,
    styles,
    variant = 'primary',
    background,
    checked,
    ...props
  } = mergedProps;
  const theme = useTheme();
  const { switchHeight } = theme.controlSize;
  const controlStyles = useMemo(
    () => StyleSheet.flatten([style, styles?.control]),
    [style, styles?.control],
  );
  // The variant only informs the track color while checked; the background prop is more
  // specific and always wins when provided.
  const resolvedBackground = useMemo(
    () => background ?? (checked ? switchVariantBackground[variant] : undefined),
    [background, checked, variant],
  );

  const switchNode = (
    <Control
      ref={ref}
      accessible
      shouldUseSwitchTransition
      accessibilityRole="switch"
      background={resolvedBackground}
      checked={checked}
      label={children}
      style={controlStyles}
      {...props}
    >
      {SwitchIcon}
    </Control>
  );

  return (
    <Box
      alignItems={children ? 'center' : undefined}
      flexDirection={children ? 'row' : undefined}
      minHeight={children ? switchHeight : undefined}
      style={styles?.root}
    >
      {switchNode}
    </Box>
  );
};

export const Switch = memo(SwitchWithRef);

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
});
