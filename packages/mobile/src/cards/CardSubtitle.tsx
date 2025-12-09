import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextProps } from '../typography/Text';

export type CardSubtitleProps = TextProps;

/**
 * Text component with default font and color for Card subtitles.
 */
export const CardSubtitle = memo(
  forwardRef<NativeText, CardSubtitleProps>(
    ({ font = 'label2', color = 'fgMuted', ...props }, ref) => {
      return <Text ref={ref} color={color} font={font} {...props} />;
    },
  ),
);

CardSubtitle.displayName = 'CardSubtitle';
