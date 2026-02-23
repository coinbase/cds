import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="label2"` instead. This component will be removed in a future major release. */
export type TextLabel2BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="label2"` instead. This component will be removed in a future major release. */
export type TextLabel2Props = TextProps;

/** @deprecated Use `Text` with `font="label2"` instead. This component will be removed in a future major release. */
export const TextLabel2 = memo(
  forwardRef<NativeText, TextLabel2Props>(({ font = 'label2', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
