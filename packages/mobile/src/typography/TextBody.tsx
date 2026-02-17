import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="body"` instead. This component will be removed in a future major release. */
export type TextBodyBaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="body"` instead. This component will be removed in a future major release. */
export type TextBodyProps = TextProps;

/** @deprecated Use `Text` with `font="body"` instead. This component will be removed in a future major release. */
export const TextBody = memo(
  forwardRef<NativeText, TextBodyProps>(({ font = 'body', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
