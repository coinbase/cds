import React, { forwardRef, memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="title3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextTitle3BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="title3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextTitle3Props = TextProps;

/**
 * @deprecated Use `Text` with `font="title3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextTitle3 = memo(
  forwardRef<NativeText, TextTitle3Props>(({ font = 'title3', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
