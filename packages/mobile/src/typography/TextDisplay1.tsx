import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="display1"` instead. This component will be removed in a future major release. */
export type TextDisplay1BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="display1"` instead. This component will be removed in a future major release. */
export type TextDisplay1Props = TextProps;

/** @deprecated Use `Text` with `font="display1"` instead. This component will be removed in a future major release. */
export const TextDisplay1 = memo(
  forwardRef<NativeText, TextDisplay1Props>(
    ({ accessibilityRole = 'header', font = 'display1', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
