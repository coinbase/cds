import React, { memo, useMemo } from 'react';
import { Animated, Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';

import type { IconProps } from './Icon';
import { DEFAULT_ICON_FONT_FAMILY, getIconSourceSize, useResolvedGlyph } from './createIcon';

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

/** Stable bound source so TextIcon participates in the same context resolution as Icon. */
const cdsGlyphSource = { glyphMap, fontFamily: DEFAULT_ICON_FONT_FAMILY };

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
  const iconColor = theme.color[color];

  const resolved = useResolvedGlyph(cdsGlyphSource, {
    name,
    size,
    pixelSize: iconSize,
    active: Boolean(active),
  });

  const styles = useMemo(
    () =>
      [
        {
          fontFamily: resolved?.fontFamily,
          fontSize: iconSize,
          color: iconColor,
        },
        style,
        // TODO https://linear.app/coinbase/issue/CDS-1518/audit-potentially-harmful-reactnative-animated-pattern
      ] as StyleProp<TextStyle>,
    [style, iconColor, iconSize, resolved?.fontFamily],
  );

  if (resolved === undefined) {
    if (isDevelopment()) {
      console.error(`Unable to find glyph for icon name "${name}" at size "${size}"`);
    }
    return null;
  }

  return (
    <Component accessibilityRole="image" style={styles} testID={testID}>
      {resolved.char}
    </Component>
  );
});
