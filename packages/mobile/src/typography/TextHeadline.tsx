import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextHeadlineBaseProps = TextBaseProps;

export type TextHeadlineProps = TextProps;

export const TextHeadline = memo(
  forwardRef<NativeText, TextHeadlineProps>(({ font = 'headline', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
