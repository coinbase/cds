import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextLegalBaseProps = TextBaseProps;

export type TextLegalProps = TextProps;

export const TextLegal = memo(
  forwardRef<NativeText, TextLegalProps>(({ font = 'legal', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
