import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="body"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextBodyBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="body"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextBodyProps = TextProps;

/**
 * @deprecated Use `Text` with `font="body"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextBody = memo(
  forwardRef<NativeText, TextBodyProps>(({ font = 'body', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
