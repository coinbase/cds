import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="display3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay3BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="display3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay3Props = TextProps;

/**
 * @deprecated Use `Text` with `font="display3"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextDisplay3 = memo(
  ({
    ref,
    accessibilityRole = 'header',
    font = 'display3',
    ...props
  }: TextDisplay3Props & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />,
);
