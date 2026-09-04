import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="label2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel2BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="label2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel2Props = TextProps;

/**
 * @deprecated Use `Text` with `font="label2"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextLabel2 = memo(
  ({
    ref,
    font = 'label2',
    ...props
  }: TextLabel2Props & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
