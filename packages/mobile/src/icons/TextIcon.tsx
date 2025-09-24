import React, { memo, useMemo } from 'react';
import { Animated, Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { IconName } from '@coinbase/cds-common';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';

import type { IconProps } from './Icon';
import { getIconSourceSize } from './Icon';

export type TextIconProps = Pick<IconProps, 'color' | 'size' | 'testID'> & {
  name: IconName;
  active?: boolean;
} & (
    | {
        animated: true;
        style: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
      }
    | {
        animated?: false | undefined;
        style?: StyleProp<TextStyle>;
      }
  );
/**
 *
 * This is a simplified, text-only version of the Icon component.
 * Nested text components need to all be RN Text and the Icon component has a box wrapper to handle border and badges.
 * Adheres to all the requirements for Nested Text on react native. https://reactnative.dev/docs/text#nested-text
 */
export const TextIcon = memo(function TextIcon({
  name,
  size = 'm',
  active,
  color = 'fgPrimary',
  animated,
  testID,
  style,
}: TextIconProps) {
  const theme = useTheme();
  const Component = animated ? Animated.Text : Text;
  const iconSize = theme.iconSize[size];
  const sourceSize = getIconSourceSize(iconSize);
  const iconColor = theme.color[color];

  const styles = useMemo(
    () => [
      {
        fontFamily: 'CoinbaseIcons',
        fontSize: iconSize,
        color: iconColor,
      },
      style,
    ],
    [style, iconColor, iconSize],
  );

  const iconName = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}`;
  const glyph = glyphMap[iconName as keyof typeof glyphMap];

  if (glyph === undefined) {
    if (isDevelopment()) {
      console.error(`Unable to find glyph for icon name "${name}" with glyph key "${iconName}"`);
    }
    return null;
  }

  return (
    <Component accessibilityRole="image" style={styles as any} testID={testID}>
      {glyph}
    </Component>
  );
});
