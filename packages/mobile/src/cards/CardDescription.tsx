import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text as CDSText, type TextProps } from '../typography/Text';

export type CardDescriptionProps = TextProps;

export const CardDescription = memo(
  forwardRef<NativeText, CardDescriptionProps>(
    ({ font = 'label2', color = 'fgMuted', ...props }, ref) => {
      return <CDSText ref={ref} color={color} font={font} {...props} />;
    },
  ),
);

CardDescription.displayName = 'CardDescription';
