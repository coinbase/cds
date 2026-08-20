import React, { createContext, forwardRef, memo, useContext, useMemo } from 'react';
import type { IconSize, IconSourcePixelSize } from '@coinbase/cds-common/types/IconSize';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { ValidateProps } from '@coinbase/cds-common/types/SpreadPropsSafely';
import { isDevelopment } from '@coinbase/cds-utils/env';
import { css, type LinariaClassName } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';

const COMPONENT_STATIC_CLASSNAME = 'cds-Icon';

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
  /** Pixel size resolved from the theme for the requested `size` token. */
  pixelSize: number;
  active: boolean;
};

/** An icon font and the glyphs it provides. */
export type IconGlyphSource<Name extends string = string> = {
  glyphMap: GlyphMap<Name>;
  /**
   * `@font-face` family name registered by the icon set's font.
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
  /** Consulted before the built-in glyphs. A nested provider replaces it. */
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
  Pick<
    BoxBaseProps,
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingEnd'
    | 'paddingBottom'
    | 'paddingStart'
  > & {
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
    /**
     * @deprecated Use `style`, `styles.root`, `className`, `classNames.root`, or the `color` prop to customize icon color. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    dangerouslySetColor?: string;
  };

export type IconProps<Name extends string = string> = IconBaseProps<Name> &
  BoxProps<BoxDefaultElement> & {
    /** Custom inline styles for individual elements of the Icon component */
    styles?: {
      /** Outer Box wrapper element */
      root?: React.CSSProperties;
      /** Inner icon glyph element */
      icon?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the Icon component */
    classNames?: {
      /** Outer Box wrapper element */
      root?: string;
      /** Inner icon glyph element */
      icon?: string;
    };
  };

const iconCss = css`
  color: currentColor;
  font-family: var(--cds-icon-font-family, 'CoinbaseIcons');
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: geometricPrecision;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  text-decoration: none;

  > * {
    transition: fill 150ms ease-in-out;
  }
`;
const sizeCss: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    width: var(--iconSize-xs);
    height: var(--iconSize-xs);
    font-size: var(--iconSize-xs);
  `,
  s: css`
    width: var(--iconSize-s);
    height: var(--iconSize-s);
    font-size: var(--iconSize-s);
  `,
  m: css`
    width: var(--iconSize-m);
    height: var(--iconSize-m);
    font-size: var(--iconSize-m);
  `,
  l: css`
    width: var(--iconSize-l);
    height: var(--iconSize-l);
    font-size: var(--iconSize-l);
  `,
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
  const Icon = memo(
    forwardRef((_props: IconProps<Name>, ref: React.Ref<HTMLElement>) => {
      const mergedProps = useComponentConfig('Icon', _props);
      const {
        accessibilityLabel,
        color = 'fgPrimary',
        dangerouslySetColor,
        fallback = null,
        name,
        size = 'm',
        testID,
        className,
        classNames,
        style,
        styles,
        active,
        ...props
      } = mergedProps;
      const theme = useTheme();

      const iconSize = theme.iconSize[size];

      // Tried before the bound set, so a source can override a built-in icon.
      const contextSource = useContext(IconGlyphSourceContext);
      const resolved = resolveGlyph(contextSource, source, {
        name,
        size,
        pixelSize: iconSize,
        active: Boolean(active),
      });

      const rootStyle = useMemo(
        () => ({
          ...(dangerouslySetColor ? { color: dangerouslySetColor } : {}),
          ...style,
          ...styles?.root,
        }),
        [dangerouslySetColor, style, styles?.root],
      );

      // The matching source decides the font, so a source covering only some
      // sizes or states of a name mixes fonts across that name.
      // Only set the variable for non-default fonts; the Linaria block has the default.
      const fontFamily = resolved?.fontFamily;
      const iconStyle = useMemo(
        () =>
          fontFamily === undefined || fontFamily === DEFAULT_ICON_FONT_FAMILY
            ? styles?.icon
            : ({
                '--cds-icon-font-family': fontFamily,
                ...styles?.icon,
              } as React.CSSProperties),
        [fontFamily, styles?.icon],
      );

      if (resolved === undefined) {
        if (isDevelopment()) {
          console.error(`Unable to find glyph for icon "${name}" at size "${size}"`);
        }
        return fallback;
      }

      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      return (
        <Box
          className={cx(COMPONENT_STATIC_CLASSNAME, className, classNames?.root)}
          color={color}
          position="relative"
          style={rootStyle}
          testID={testID}
          {...(props satisfies ValidateProps<
            typeof props,
            Omit<IconProps<Name>, keyof BoxProps<BoxDefaultElement>>
          >)}
        >
          <span
            ref={ref}
            aria-hidden={!accessibilityLabel}
            aria-label={accessibilityLabel}
            className={cx(iconCss, sizeCss[size], classNames?.icon)}
            data-icon-name={name}
            data-testid={glyphTestId}
            role="img"
            style={iconStyle}
            title={accessibilityLabel}
            translate="no"
          >
            {resolved.char}
          </span>
        </Box>
      );
    }),
  );

  Icon.displayName = 'Icon';

  return Icon;
}

export { getIconSourceSize };
