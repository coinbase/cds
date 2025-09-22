import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { glyphMap } from '@cbhq/cds-icons/glyphMap';

import { useTheme } from '../hooks/useTheme';
import { getIconSourceSize } from '../icons/Icon';
import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default fgMuted
   */
  color?: ThemeVars.Color;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps;

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  align,
  dangerouslySetColor,
  ...props
}: HelperTextProps) {
  const theme = useTheme();
  // Get info icon for negative variant
  const iconSize = theme.iconSize.xs;
  const sourceSize = getIconSourceSize(iconSize);
  const glyphKey = `info-${sourceSize}-active` as const;
  const glyph = glyphMap[glyphKey];

  const iconStyle = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
      letterSpacing: 4,
    }),
    [iconSize],
  );

  return (
    <Text
      align={align}
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      font="label2"
      {...props}
    >
      {color === 'fgNegative' && (
        <Text
          accessible
          accessibilityLabel={errorIconAccessibilityLabel}
          accessibilityRole="image"
          align={align}
          color={color}
          dangerouslySetColor={dangerouslySetColor}
          font="label2"
          style={iconStyle}
          testID={errorIconTestID}
        >
          {glyph}
        </Text>
      )}
      {children}
    </Text>
  );
});
