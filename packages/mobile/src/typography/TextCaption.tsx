import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextCaptionBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextCaptionProps = TextProps;

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextCaption = memo(
  ({
    ref,
    font = 'caption',
    ...props
  }: TextCaptionProps & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
