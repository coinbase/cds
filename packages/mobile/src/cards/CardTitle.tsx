import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text as CDSText, type TextProps } from '../typography/Text';

export type CardTitleProps = TextProps;

/**
 * Text component with default font for Card titles.
 */
export const CardTitle = memo(
  forwardRef<NativeText, CardTitleProps>(({ font = 'headline', ...props }, ref) => {
    return <CDSText ref={ref} font={font} {...props} />;
  }),
);

CardTitle.displayName = 'CardTitle';
