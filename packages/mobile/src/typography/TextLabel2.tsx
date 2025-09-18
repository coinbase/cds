import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextLabel2BaseProps = TextBaseProps;

export type TextLabel2Props = TextProps;

export const TextLabel2 = memo(
  forwardRef<NativeText, TextLabel2Props>(({ font = 'label2', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
