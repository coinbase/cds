import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="headline"` instead. This component will be removed in a future major release. */
export type TextHeadlineBaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="headline"` instead. This component will be removed in a future major release. */
export type TextHeadlineProps = TextProps;

/** @deprecated Use `Text` with `font="headline"` instead. This component will be removed in a future major release. */
export const TextHeadline = memo(
  forwardRef<NativeText, TextHeadlineProps>(({ font = 'headline', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
