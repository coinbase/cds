import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="title2"` instead. This component will be removed in a future major release. */
export type TextTitle2BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="title2"` instead. This component will be removed in a future major release. */
export type TextTitle2Props = TextProps;

/** @deprecated Use `Text` with `font="title2"` instead. This component will be removed in a future major release. */
export const TextTitle2 = memo(
  forwardRef<NativeText, TextTitle2Props>(
    ({ accessibilityRole = 'header', font = 'title2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
