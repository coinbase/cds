import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/** @deprecated Use `Text` with `font="title4"` instead. This component will be removed in a future major release. */
export type TextTitle4BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="title4"` instead. This component will be removed in a future major release. */
export type TextTitle4Props = TextProps;

/** @deprecated Use `Text` with `font="title4"` instead. This component will be removed in a future major release. */
export const TextTitle4 = memo(
  forwardRef<NativeText, TextTitle4Props>(({ font = 'title4', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
