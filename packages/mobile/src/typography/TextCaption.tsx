import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextCaptionBaseProps = TextBaseProps;

export type TextCaptionProps = TextProps;

export const TextCaption = memo(
  forwardRef<NativeText, TextCaptionProps>(({ font = 'caption', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
