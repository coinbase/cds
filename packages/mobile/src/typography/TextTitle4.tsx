import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="title4"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextTitle4BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="title4"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextTitle4Props = TextProps;

/**
 * @deprecated Use `Text` with `font="title4"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextTitle4 = memo(
  ({
    ref,
    font = 'title4',
    ...props
  }: TextTitle4Props & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
