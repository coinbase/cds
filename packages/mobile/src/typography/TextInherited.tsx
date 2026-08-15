import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextInheritedBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextInheritedProps = TextProps;

/**
 * @deprecated Use `Text` with `font="inherit"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextInherited = memo(
  ({
    ref,
    font = 'inherit',
    ...props
  }: TextInheritedProps & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} font={font} {...props} />,
);
