import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="display2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay2BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="display2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay2Props = TextProps;

/**
 * @deprecated Use `Text` with `font="display2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextDisplay2 = memo(
  forwardRef<NativeText, TextDisplay2Props>(
    ({ accessibilityRole = 'header', font = 'display2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
