import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextDisplay2BaseProps = TextBaseProps;

export type TextDisplay2Props = TextProps;

export const TextDisplay2 = memo(
  forwardRef<NativeText, TextDisplay2Props>(
    ({ accessibilityRole = 'header', font = 'display2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
