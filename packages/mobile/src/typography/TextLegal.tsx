import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="legal"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLegalBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="legal"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLegalProps = TextProps;

/**
 * @deprecated Use `Text` with `font="legal"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextLegal = memo(
  ({
    ref,
    font = 'legal',
    ...props
  }: TextLegalProps & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
