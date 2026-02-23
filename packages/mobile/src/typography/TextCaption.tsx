import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="caption"` instead. This component will be removed in a future major release. */
export type TextCaptionBaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="caption"` instead. This component will be removed in a future major release. */
export type TextCaptionProps = TextProps;

/** @deprecated Use `Text` with `font="caption"` instead. This component will be removed in a future major release. */
export const TextCaption = memo(
  forwardRef<NativeText, TextCaptionProps>(({ font = 'caption', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
