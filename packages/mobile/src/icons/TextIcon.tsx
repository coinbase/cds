import React, { memo, useContext, useMemo } from 'react';
import { Animated, Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';

import type { IconProps } from './Icon';
import { DEFAULT_ICON_FONT_FAMILY, getIconSourceSize, IconGlyphSourceContext } from './createIcon';

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

  const contextSource = useContext(IconGlyphSourceContext);

  const iconKey = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}`;

  // Context source (e.g. retail-icons override) takes priority over the CDS glyphMap.
  const contextGlyph = contextSource
    ? contextSource.getGlyph
      ? contextSource.getGlyph({
          glyphMap: contextSource.glyphMap,
          name,
          size,
          pixelSize: iconSize,
          active: Boolean(active),
        })
      : contextSource.glyphMap[iconKey as keyof typeof contextSource.glyphMap]
    : undefined;

  const glyph = contextGlyph ?? glyphMap[iconKey as keyof typeof glyphMap];
  const fontFamily =
    contextGlyph !== undefined
      ? (contextSource?.fontFamily ?? DEFAULT_ICON_FONT_FAMILY)
      : DEFAULT_ICON_FONT_FAMILY;

  const styles = useMemo(
    () =>
      [
        {
          fontFamily,
          fontSize: iconSize,
          color: iconColor,
        },
        style,
        // TODO https://linear.app/coinbase/issue/CDS-1518/audit-potentially-harmful-reactnative-animated-pattern
      ] as StyleProp<TextStyle>,
    [style, iconColor, iconSize, fontFamily],
  );

  if (glyph === undefined) {
    if (isDevelopment()) {
      console.error(`Unable to find glyph for icon name "${name}" with glyph key "${iconKey}"`);
    }
    return null;
  }

  return (
    <Component accessibilityRole="image" style={styles} testID={testID}>
      {glyph}
    </Component>
  );
});
