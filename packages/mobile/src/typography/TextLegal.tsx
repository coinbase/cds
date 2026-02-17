import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="legal"` instead. This component will be removed in a future major release. */
export type TextLegalBaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="legal"` instead. This component will be removed in a future major release. */
export type TextLegalProps = TextProps;

/** @deprecated Use `Text` with `font="legal"` instead. This component will be removed in a future major release. */
export const TextLegal = memo(
  forwardRef<NativeText, TextLegalProps>(({ font = 'legal', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
