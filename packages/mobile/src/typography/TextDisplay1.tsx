import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextDisplay1BaseProps = TextBaseProps;

export type TextDisplay1Props = TextProps;

export const TextDisplay1 = memo(
  forwardRef<NativeText, TextDisplay1Props>(
    ({ accessibilityRole = 'header', font = 'display1', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
