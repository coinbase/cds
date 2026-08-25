import React, { createContext, memo, useContext, useMemo } from 'react';
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

/** Default font family for the CDS icon glyph font. */
export const DEFAULT_ICON_FONT_FAMILY = 'CoinbaseIcons';

/** Values are the single character to render in the icon font. */
export type GlyphMap<Name extends string> = Record<
  `${Name}-${IconSourcePixelSize}-${'active' | 'inactive'}`,
  string
>;

export type IconGlyphResolverArgs<Name extends string> = {
  glyphMap: GlyphMap<Name>;
  name: Name;
  size: IconSize;
  /** Pixel size resolved from the theme, including device font scaling. */
  pixelSize: number;
  active: boolean;
};

/** An icon font and the glyphs it provides. */
export type IconGlyphSource<Name extends string = string> = {
  glyphMap: GlyphMap<Name>;
  /**
   * Font family registered by the icon set's font (loaded via `expo-font`).
   * @default 'CoinbaseIcons'
   */
  fontFamily?: string;
  /**
   * Override to use a custom key format or size model. Defaults to the CDS
   * scheme: `${name}-${sourceSize}-${state}`, with `sourceSize` 12, 16, or 24.
   */
  getGlyph?: (args: IconGlyphResolverArgs<Name>) => string | undefined;
};

const IconGlyphSourceContext = createContext<IconGlyphSource<any> | undefined>(undefined);

export type IconGlyphSourceProviderProps = {
  /**
   * Consulted before the built-in glyphs. A nested provider replaces it. Its
   * font must be loaded (e.g. via `expo-font`).
   */
  source: IconGlyphSource<any>;
  children: React.ReactNode;
};

/**
 * Adds a custom glyph source to every CDS icon rendered below.
 *
 * Scope this to a subtree: a source reusing a built-in name re-skins that icon
 * everywhere below, including icons CDS renders internally (`close`, `caretUp`,
 * `checkmark`). Its names must be names the icon component already accepts.
 */
export function IconGlyphSourceProvider({ source, children }: IconGlyphSourceProviderProps) {
  return (
    <IconGlyphSourceContext.Provider value={source}>{children}</IconGlyphSourceContext.Provider>
  );
}

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

type ResolvedGlyph = { char: string; fontFamily: string };

/** Resolves a glyph from one source, with that source's font. */
const resolveFromSource = (
  source: IconGlyphSource<any>,
  args: Omit<IconGlyphResolverArgs<string>, 'glyphMap'>,
): ResolvedGlyph | undefined => {
  const char = (source.getGlyph ?? defaultGetGlyph)({ ...args, glyphMap: source.glyphMap });
  return char === undefined
    ? undefined
    : { char, fontFamily: source.fontFamily ?? DEFAULT_ICON_FONT_FAMILY };
};

const resolveGlyph = (
  contextSource: IconGlyphSource<any> | undefined,
  boundSource: IconGlyphSource<any>,
  args: Omit<IconGlyphResolverArgs<string>, 'glyphMap'>,
): ResolvedGlyph | undefined => {
  const fromContext = contextSource ? resolveFromSource(contextSource, args) : undefined;
  return fromContext ?? resolveFromSource(boundSource, args);
};

/** Creates a typed `Icon` component bound to an icon set. */
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

    // Tried before the bound set, so a source can override a built-in icon.
    const contextSource = useContext(IconGlyphSourceContext);
    const resolved = resolveGlyph(contextSource, source, {
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

    // The matching source decides the font, so a source covering only some
    // sizes or states of a name mixes fonts across that name.
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
