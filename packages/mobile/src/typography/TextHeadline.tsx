import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="headline"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextHeadlineBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="headline"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextHeadlineProps = TextProps;

/**
 * @deprecated Use `Text` with `font="headline"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextHeadline = memo(
  ({
    ref,
    font = 'headline',
    ...props
  }: TextHeadlineProps & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
