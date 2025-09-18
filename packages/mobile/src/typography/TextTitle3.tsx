import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextTitle3BaseProps = TextBaseProps;

export type TextTitle3Props = TextProps;

export const TextTitle3 = memo(
  forwardRef<NativeText, TextTitle3Props>(({ font = 'title3', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
