import React, { memo, useMemo } from 'react';
import {
  Animated,
  type StyleProp,
  Text,
  type TextProps as NativeTextProps,
  type TextStyle,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { IconSize, IconSourcePixelSize } from '@coinbase/cds-common/types/IconSize';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { PaddingProps } from '@coinbase/cds-common/types/SpacingProps';
import { isDevelopment } from '@coinbase/cds-utils';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';

import { useIconGlyphSources } from './IconGlyphSourceContext';

/** Default font family for the CDS icon glyph font. */
export const DEFAULT_ICON_FONT_FAMILY = 'CoinbaseIcons';

/**
 * Shape of the glyph map an icon set must provide. Keys are
 * `${name}-${sourcePixelSize}-${'active' | 'inactive'}` and values are the
 * single Unicode character rendered in the icon font.
 */
export type GlyphMap<Name extends string> = Record<
  `${Name}-${IconSourcePixelSize}-${'active' | 'inactive'}`,
  string
>;

/** Arguments passed to a glyph resolver to look up an icon's glyph. */
export type IconGlyphResolverArgs<Name extends string> = {
  /** Glyph map bound to this icon set. */
  glyphMap: GlyphMap<Name>;
  /** Icon name requested via the `name` prop. */
  name: Name;
  /** Size token requested via the `size` prop. */
  size: IconSize;
  /** Resolved pixel size from the theme (includes device font scaling). */
  pixelSize: number;
  /** Whether the active variant was requested. */
  active: boolean;
};

/**
 * An icon font and the glyphs it provides. Pass it to `createIcon` to bind a
 * typed `Icon` component, or to `IconGlyphSourceProvider` to add its glyphs to
 * the icons rendered below, so an icon package can expose one object usable
 * either way.
 */
export type IconGlyphSource<Name extends string = string> = {
  /** Generated glyph map for this icon set. */
  glyphMap: GlyphMap<Name>;
  /**
   * Font family registered by the icon set's font (loaded via `expo-font`).
   * @default 'CoinbaseIcons'
   */
  fontFamily?: string;
  /**
   * Resolves the glyph to render for an icon from the glyph map. Override to
   * support a custom key format or size model. Defaults to the CDS scheme:
   * `${name}-${sourceSize}-${'active' | 'inactive'}`, where `sourceSize` is
   * `12`, `16`, or `24`.
   */
  getGlyph?: (args: IconGlyphResolverArgs<Name>) => string | undefined;
};

export type IconBaseProps<Name extends string = string> = SharedProps &
  PaddingProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  Pick<NativeTextProps, 'allowFontScaling'> & {
    /**
     * Size for a given icon.
     * @default m
     */
    size?: IconSize;
    /** Name of the icon, as defined in Figma. */
    name: Name;
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
    /**
     * @deprecated Use `style`, `styles.icon`, or the `color` prop to customize icon color. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    dangerouslySetColor?: string | Animated.AnimatedInterpolation<string>;
    animated?: boolean;
  };

export type IconProps<Name extends string = string> = IconBaseProps<Name> & {
  /** Custom style applied to the outer container. */
  style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
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

/** Default glyph resolver using the CDS `${name}-${sourceSize}-${state}` key scheme. */
const defaultGetGlyph = <Name extends string>({
  glyphMap,
  name,
  pixelSize,
  active,
}: IconGlyphResolverArgs<Name>): string | undefined => {
  const sourceSize = getIconSourceSize(pixelSize);
  const key = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}` as keyof GlyphMap<Name>;
  return glyphMap[key];
};

/** Returns the first source that has a glyph for the request, with its font. */
const resolveGlyph = (
  sources: readonly IconGlyphSource<any>[],
  args: Omit<IconGlyphResolverArgs<string>, 'glyphMap'>,
): { char: string; fontFamily: string } | undefined => {
  for (const source of sources) {
    const char = (source.getGlyph ?? defaultGetGlyph)({ ...args, glyphMap: source.glyphMap });
    if (char !== undefined) {
      return { char, fontFamily: source.fontFamily ?? DEFAULT_ICON_FONT_FAMILY };
    }
  }
  return undefined;
};

/**
 * Creates a typed `Icon` component bound to a specific icon set (glyph map,
 * font family, and name union). The default CDS `Icon` is created from this
 * factory; consumers with their own icon package can create their own typed
 * icon component that reuses all of the CDS rendering, accessibility, and
 * theming behavior.
 */
export function createIcon<Name extends string>(source: IconGlyphSource<Name>) {
  const Icon = memo(({ ref, ..._props }: IconProps<Name> & { ref?: React.Ref<Text> }) => {
    const mergedProps = useComponentConfig('Icon', _props);
    const {
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
      allowFontScaling = true,
    } = mergedProps;
    const TextComponent = animated ? Animated.Text : Text;
    const theme = useTheme();
    const { fontScale } = useWindowDimensions();

    const iconSize = allowFontScaling ? theme.iconSize[size] * fontScale : theme.iconSize[size];

    const iconColor = theme.color[color];
    const finalColor = dangerouslySetColor ?? iconColor;

    // Sources added by `IconGlyphSourceProvider` are tried before this set's
    // own, so a consumer's icons resolve — and can override a built-in — with
    // no change to the components that render icons by name.
    const contextSources = useIconGlyphSources();
    const resolved = resolveGlyph([...contextSources, source], {
      name,
      size,
      pixelSize: iconSize,
      active: Boolean(active),
    });

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

    // The matching source decides the font, since composed sets mix fonts.
    const iconStyle = useMemo(
      () => [
        {
          fontFamily: resolved?.fontFamily,
          fontSize: iconSize,
          height: iconSize,
          width: iconSize,
          lineHeight: iconSize,
          color: finalColor,
        },
        styles?.icon,
      ],
      [finalColor, iconSize, resolved?.fontFamily, styles?.icon],
    );

    if (resolved === undefined) {
      if (isDevelopment()) {
        console.error(`Unable to find glyph for icon "${name}" at size "${size}"`);
      }
      return fallback;
    }

    return (
      <Box animated={animated} style={rootStyle} testID={testID}>
        <TextComponent
          ref={ref}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="image"
          accessible={!!accessibilityLabel}
          // We do not use the built in scaling because it changes the icon thickness
          allowFontScaling={false}
          // TODO https://linear.app/coinbase/issue/CDS-1518/audit-potentially-harmful-reactnative-animated-pattern
          style={iconStyle as StyleProp<TextStyle>}
        >
          {resolved.char}
        </TextComponent>
      </Box>
    );
  });

  Icon.displayName = 'Icon';

  return Icon;
}

export { getIconSourceSize };
