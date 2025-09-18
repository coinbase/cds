import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextTitle2BaseProps = TextBaseProps;

export type TextTitle2Props = TextProps;

export const TextTitle2 = memo(
  forwardRef<NativeText, TextTitle2Props>(
    ({ accessibilityRole = 'header', font = 'title2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
