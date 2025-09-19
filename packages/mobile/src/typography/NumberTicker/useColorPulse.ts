import { useEffect, useRef } from 'react';
import type { TextStyle } from 'react-native';
import {
  type AnimatedStyle,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useTheme } from '../../hooks/useTheme';

import { buildAnimation } from './buildAnimation';
import type { TransitionConfig } from './NumberTicker';
import { DEFAULT_TRANSITION } from './NumberTicker';

export type AnimatedTextStyle = AnimatedStyle<TextStyle>;

export function useColorPulse({
  value,
  defaultColor,
  colorPulseOnUpdate,
  positivePulseColor,
  negativePulseColor,
  transitionConfig,
}: {
  value: number | bigint;
  defaultColor: ThemeVars.Color;
  colorPulseOnUpdate: boolean;
  positivePulseColor: ThemeVars.Color;
  negativePulseColor: ThemeVars.Color;
  transitionConfig?: TransitionConfig;
}): AnimatedTextStyle {
  const theme = useTheme();
  const baseColor = theme.color[defaultColor];
  const animatedColor = useSharedValue<string>(baseColor);
  const previousValue = useRef<number>(Number(value));

  useEffect(() => {
    if (!baseColor) return;
    // this make sure if base color changes it reflects that change even tought when colorPulseOnUpdate is false
    animatedColor.value = baseColor;
    if (!colorPulseOnUpdate) return;

    const prev = previousValue.current;
    const next = Number(value);
    const hasMeaningfulChange = !Number.isNaN(prev) && !Number.isNaN(next) && prev !== next;
    const pulseColor = hasMeaningfulChange
      ? theme.color[next > prev ? positivePulseColor : negativePulseColor]
      : undefined;

    if (hasMeaningfulChange && pulseColor) {
      cancelAnimation(animatedColor);
      animatedColor.value = pulseColor;
      animatedColor.value = buildAnimation({
        toValue: baseColor,
        transition: transitionConfig?.color ?? DEFAULT_TRANSITION.color,
      });
    }

    previousValue.current = next;
  }, [
    value,
    colorPulseOnUpdate,
    transitionConfig?.color,
    baseColor,
    positivePulseColor,
    negativePulseColor,
    animatedColor,
    theme.color,
  ]);

  return useAnimatedStyle(() => ({ color: animatedColor.value }));
}
