import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="title1"` instead. This component will be removed in a future major release. */
export type TextTitle1BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="title1"` instead. This component will be removed in a future major release. */
export type TextTitle1Props = TextProps;

/** @deprecated Use `Text` with `font="title1"` instead. This component will be removed in a future major release. */
export const TextTitle1 = memo(
  forwardRef<NativeText, TextTitle1Props>(
    ({ accessibilityRole = 'header', font = 'title1', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
