import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextInheritedBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextInheritedProps = TextProps;

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextInherited = memo(
  forwardRef<NativeText, TextInheritedProps>(({ font = 'inherit', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
