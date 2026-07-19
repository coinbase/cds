import React, { memo } from 'react';
import type { Text as NativeText } from 'react-native';

import { Text, type TextBaseProps, type TextProps } from './Text';

/**
 * @deprecated Use `Text` with `font="display1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay1BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="display1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextDisplay1Props = TextProps;

/**
 * @deprecated Use `Text` with `font="display1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextDisplay1 = memo(
  ({
    ref,
    accessibilityRole = 'header',
    font = 'display1',
    ...props
  }: TextDisplay1Props & {
    ref?: React.Ref<NativeText>;
  }) => <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />,
);
