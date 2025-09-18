import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextDisplay3BaseProps = TextBaseProps;

export type TextDisplay3Props = TextProps;

export const TextDisplay3 = memo(
  forwardRef<NativeText, TextDisplay3Props>(
    ({ accessibilityRole = 'header', font = 'display3', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
