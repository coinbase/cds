import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextTitle4BaseProps = TextBaseProps;

export type TextTitle4Props = TextProps;

export const TextTitle4 = memo(
  forwardRef<NativeText, TextTitle4Props>(({ font = 'title4', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
