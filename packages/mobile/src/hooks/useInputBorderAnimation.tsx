import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInputBorderInConfig,
  animateInputBorderOutConfig,
} from '@cbhq/cds-common/animation/border';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { InputVariant } from '@cbhq/cds-common/types/InputBaseProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';

import { useTheme } from './useTheme';

type InputBorderAnimationReturnType = {
  animateInputBorderIn: Animated.CompositeAnimation;
  animateInputBorderOut: Animated.CompositeAnimation;
  focusedBorderOpacity: Animated.Value;
  focusedBorderRgba: string;
  unFocusedBorderRgba: string;
};

// Animating opacity of 2nd Layer Input Border.
// This is the focused border styling
const borderInConfig = convertMotionConfig(animateInputBorderInConfig);
const borderOutConfig = convertMotionConfig(animateInputBorderOutConfig);

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'bgPrimary',
  positive: 'bgPositive',
  negative: 'bgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const useInputBorderAnimation = (
  fromVariant: InputVariant,
  toVariant: InputVariant,
): InputBorderAnimationReturnType => {
  const theme = useTheme();
  const focusedBorderOpacity = useRef(new Animated.Value(0)).current;

  const fromVariantRgbaString = theme.color[variantColorMap[fromVariant]];
  const toVariantRgbaString = theme.color[variantColorMap[toVariant]];

  return useMemo(() => {
    return {
      animateInputBorderIn: Animated.timing(focusedBorderOpacity, borderInConfig),
      animateInputBorderOut: Animated.timing(focusedBorderOpacity, borderOutConfig),
      focusedBorderRgba: toVariantRgbaString,
      unFocusedBorderRgba: fromVariantRgbaString,
      focusedBorderOpacity,
    };
  }, [focusedBorderOpacity, fromVariantRgbaString, toVariantRgbaString]);
};
