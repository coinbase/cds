import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextLabel1BaseProps = TextBaseProps;

export type TextLabel1Props = TextProps;

export const TextLabel1 = memo(
  forwardRef<NativeText, TextLabel1Props>(({ font = 'label1', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
