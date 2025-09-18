import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type TextInheritedBaseProps = TextBaseProps;

export type TextInheritedProps = TextProps;

export const TextInherited = memo(
  forwardRef<NativeText, TextInheritedProps>(({ font = 'inherit', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
