import React, { memo, useMemo } from 'react';
import {
  Animated,
  type StyleProp,
  Text,
  type TextStyle,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type {
  IconName,
  IconSize,
  IconSourcePixelSize,
  PaddingProps,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';

export type IconBaseProps = SharedProps &
  PaddingProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> & {
    /**
     * Size for a given icon.
     * @default m
     */
    size?: IconSize;
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Fallback element to render if unable to find an icon with matching name
     * @default null
     * */
    fallback?: null | React.ReactNode;
    /**
     * Toggles the active and inactive state of the navigation icon
     * @default false
     */
    active?: boolean;
    /** Color of the icon when used as a foreground.
     * @default primary
     */
    color?: ThemeVars.Color;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string | Animated.AnimatedInterpolation<string>;
    animated?: boolean;
    style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
  };

export type IconProps = IconBaseProps & {
  /** Custom styles for individual elements of the Icon component */
  styles?: {
    /** Outer Box wrapper element */
    root?: StyleProp<ViewStyle>;
    /** Inner icon glyph Text element */
    icon?: StyleProp<TextStyle>;
  };
};

const getIconSourceSize = (iconSize: number): IconSourcePixelSize => {
  if (iconSize <= 12) return 12;
  if (iconSize <= 16) return 16;
  return 24;
};

export const Icon = memo(function Icon({
  accessibilityLabel,
  accessibilityHint,
  animated = false,
  color = 'fgPrimary',
  dangerouslySetColor,
  style,
  styles,
  fallback = null,
  name,
  size = 'm',
  testID,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingEnd,
  paddingBottom,
  paddingStart,
  active,
}: IconProps) {
  const TextComponent = animated ? Animated.Text : Text;
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  // Scale according to device a11y font size settings
  const iconSize = theme.iconSize[size] * fontScale;
  const sourceSize = getIconSourceSize(iconSize);

  const iconColor = theme.color[color];
  const finalColor = dangerouslySetColor ?? iconColor;

  const rootStyle = useMemo(
    () => [
      {
        paddingTop: theme.space[paddingTop ?? paddingY ?? padding ?? 0],
        paddingEnd: theme.space[paddingEnd ?? paddingX ?? padding ?? 0],
        paddingBottom: theme.space[paddingBottom ?? paddingY ?? padding ?? 0],
        paddingStart: theme.space[paddingStart ?? paddingX ?? padding ?? 0],
      },
      style,
      styles?.root,
    ],
    [
      style,
      theme.space,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingEnd,
      paddingBottom,
      paddingStart,
      styles?.root,
    ],
  );

  const iconStyle = useMemo(
    () => [
      {
        fontFamily: 'CoinbaseIcons',
        fontSize: iconSize,
        height: iconSize,
        width: iconSize,
        lineHeight: iconSize,
        color: finalColor,
      },
      styles?.icon,
    ],
    [finalColor, iconSize, styles?.icon],
  );

  const iconName = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}`;
  const glyph = glyphMap[iconName as keyof typeof glyphMap];

  if (glyph === undefined) {
    if (isDevelopment()) {
      console.error(`Unable to find glyph for icon name "${name}" with glyph key "${iconName}"`);
    }
    return fallback;
  }

  return (
    <Box animated={animated} style={rootStyle} testID={testID}>
      <TextComponent
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        accessible={!!accessibilityLabel}
        allowFontScaling={false}
        style={iconStyle}
      >
        {glyph}
      </TextComponent>
    </Box>
  );
});

export { getIconSourceSize };
