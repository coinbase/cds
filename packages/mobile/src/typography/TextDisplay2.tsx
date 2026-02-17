import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="display2"` instead. Note: this component defaults `accessibilityRole` to "header". When migrating, add `accessibilityRole="header"` to preserve accessibility behavior. This component will be removed in a future major release. */
export type TextDisplay2BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="display2"` instead. Note: this component defaults `accessibilityRole` to "header". When migrating, add `accessibilityRole="header"` to preserve accessibility behavior. This component will be removed in a future major release. */
export type TextDisplay2Props = TextProps;

/** @deprecated Use `Text` with `font="display2"` instead. Note: this component defaults `accessibilityRole` to "header". When migrating, add `accessibilityRole="header"` to preserve accessibility behavior. This component will be removed in a future major release. */
export const TextDisplay2 = memo(
  forwardRef<NativeText, TextDisplay2Props>(
    ({ accessibilityRole = 'header', font = 'display2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
