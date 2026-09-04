import { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInputBorderInConfig,
  animateInputBorderOutConfig,
} from '@coinbase/cds-common/animation/border';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { convertMotionConfig } from '../animation/convertMotionConfig';

import { useTheme } from './useTheme';

// Animating opacity of 2nd Layer Input Border.
// This is the focused border styling
const borderInConfig = convertMotionConfig(animateInputBorderInConfig);
const borderOutConfig = convertMotionConfig(animateInputBorderOutConfig);

export const useSelectionCellBorderStyle = ({
  pressed,
  pressedBorderColor = 'bgPrimary',
  borderColor = 'bgLine',
  pressedBorderWidth = 200,
  borderWidth = 100,
}: {
  pressed: boolean;
  pressedBorderColor: ThemeVars.Color;
  borderColor: ThemeVars.Color;
  pressedBorderWidth: ThemeVars.BorderWidth;
  borderWidth: ThemeVars.BorderWidth;
}) => {
  const theme = useTheme();

  const pressedBorderOpacity = useRef(new Animated.Value(0)).current;

  const unpressedBorderRgba = theme.color[borderColor];
  const pressedBorderRgba = theme.color[pressedBorderColor];

  const animateInputBorderIn = Animated.timing(pressedBorderOpacity, borderInConfig);
  const animateInputBorderOut = Animated.timing(pressedBorderOpacity, borderOutConfig);

  const pressedStyle = useMemo(() => {
    return {
      borderColor: 'transparent',
      borderWidth: theme.borderWidth[borderWidth],
    };
  }, [theme.borderWidth, borderWidth]);

  const unpressedStyle = useMemo(() => {
    return {
      borderColor: unpressedBorderRgba,
      borderWidth: theme.borderWidth[borderWidth],
    };
  }, [theme.borderWidth, unpressedBorderRgba, borderWidth]);

  const focusRingStyle = useMemo(() => {
    return {
      opacity: pressedBorderOpacity,
      borderColor: pressedBorderRgba,
      borderWidth: theme.borderWidth[pressedBorderWidth],
    };
  }, [pressedBorderOpacity, pressedBorderRgba, pressedBorderWidth, theme.borderWidth]);

  useEffect(() => {
    if (pressed) {
      animateInputBorderOut.stop();
      animateInputBorderIn.start();
    } else {
      animateInputBorderIn.stop();
      animateInputBorderOut.start();
    }
  }, [animateInputBorderIn, animateInputBorderOut, pressed]);

  return {
    focusRingStyle,
    pressedStyle,
    unpressedStyle,
  };
};
