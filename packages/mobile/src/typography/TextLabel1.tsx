import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel1BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel1Props = TextProps;

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextLabel1 = memo(
  ({
    ref,
    font = 'label1',
    ...props
  }: TextLabel1Props & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
