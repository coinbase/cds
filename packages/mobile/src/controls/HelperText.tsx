import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';

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
  /** Custom styles for individual elements of the HelperText component */
  styles?: {
    /** Root text element */
    root?: TextProps['style'];
    /** Error icon element */
    icon?: TextProps['style'];
  };
} & TextProps;

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  align,
  dangerouslySetColor,
  style,
  styles,
  ...props
}: HelperTextProps) {
  const theme = useTheme();
  // Get info icon for negative variant
  const iconSize = theme.iconSize.xs;
  const sourceSize = getIconSourceSize(iconSize);
  const glyphKey = `info-${sourceSize}-active` as const;
  const glyph = glyphMap[glyphKey];

  const iconStyle = useMemo(
    () => [
      {
        fontFamily: 'CoinbaseIcons',
        fontSize: iconSize,
        height: iconSize,
        width: iconSize,
        letterSpacing: 4,
      },
      // TODO: when we actually remove dangerouslySetColor:
      // when migrating from dangerouslySetColor to style.color,
      // root style/className color will not automatically style the error icon like dangerouslySetColor.
      // Consumers must set both styles.root and styles.icon (or classNames equivalents).
      // We need to have a migrator handle this or document in future migration guide.
      styles?.icon,
    ],
    [iconSize, styles?.icon],
  );

  return (
    <Text
      align={align}
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      font="label2"
      style={[style, styles?.root]}
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
