import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextTitle1BaseProps = TextBaseProps;

export type TextTitle1Props = TextProps;

export const TextTitle1 = memo(
  forwardRef<NativeText, TextTitle1Props>(
    ({ accessibilityRole = 'header', font = 'title1', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
