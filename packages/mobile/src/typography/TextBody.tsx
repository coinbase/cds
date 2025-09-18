import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextBodyBaseProps = TextBaseProps;

export type TextBodyProps = TextProps;

export const TextBody = memo(
  forwardRef<NativeText, TextBodyProps>(({ font = 'body', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
