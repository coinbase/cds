import { useEffect, useRef } from 'react';
import type { TextStyle } from 'react-native';
import {
  type AnimatedStyle,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useTheme } from '../../hooks/useTheme';

import type { RollingNumberTransitionConfig } from './RollingNumber';
import { defaultTransitionConfig } from './RollingNumber';

export type AnimatedTextStyle = AnimatedStyle<TextStyle>;

export function useColorPulse({
  value,
  formatted,
  defaultColor,
  colorPulseOnUpdate,
  positivePulseColor,
  negativePulseColor,
  transitionConfig,
}: {
  value: number;
  formatted: string;
  defaultColor: ThemeVars.Color;
  colorPulseOnUpdate: boolean;
  positivePulseColor: ThemeVars.Color;
  negativePulseColor: ThemeVars.Color;
  transitionConfig?: RollingNumberTransitionConfig;
}): AnimatedTextStyle {
  const theme = useTheme();
  const baseColor = theme.color[defaultColor];
  const previousValue = useRef<number>(Number(value));
  const previousStringValue = useRef<string>(formatted);
  const animatedColor = useSharedValue<string>(baseColor);

  useEffect(() => {
    if (!baseColor) return;
    // this make sure if base color changes it reflects that change even tought when colorPulseOnUpdate is false
    animatedColor.value = baseColor;
    if (!colorPulseOnUpdate) return;

    const prev = previousValue.current;
    const next = Number(value);
    const hasMeaningfulChange =
      !Number.isNaN(prev) &&
      !Number.isNaN(next) &&
      prev !== next &&
      // a change from 125,000 to 125,001 should not pulse if it's being formatted as 125K, since the displayed value is the same
      previousStringValue.current !== formatted;
    const pulseColor = hasMeaningfulChange
      ? theme.color[next > prev ? positivePulseColor : negativePulseColor]
      : undefined;

    if (hasMeaningfulChange && pulseColor) {
      cancelAnimation(animatedColor);
      animatedColor.value = pulseColor;
      if (transitionConfig?.color?.type === 'spring') {
        animatedColor.value = withSpring(baseColor, transitionConfig?.color);
      } else {
        animatedColor.value = withTiming(
          baseColor,
          transitionConfig?.color ?? defaultTransitionConfig.color,
        );
      }
    }

    previousValue.current = next;
    previousStringValue.current = formatted;
  }, [
    value,
    colorPulseOnUpdate,
    transitionConfig?.color,
    baseColor,
    positivePulseColor,
    negativePulseColor,
    animatedColor,
    theme.color,
    formatted,
  ]);

  return useAnimatedStyle(() => ({ color: animatedColor.value }));
}
