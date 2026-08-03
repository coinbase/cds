import React, { forwardRef, memo, useMemo } from 'react';
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
  /** Resolved pixel size from the theme for the requested `size` token. */
  pixelSize: number;
  /** Whether the active variant was requested. */
  active: boolean;
};

/** Configuration used to bind an icon set to a typed `Icon` component. */
export type CreateIconConfig<Name extends string> = {
  /** Generated glyph map for this icon set. */
  glyphMap: GlyphMap<Name>;
  /**
   * `@font-face` family name registered by the icon set's font.
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
     * @deprecationExpectedRemoval v10
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

/**
 * Creates a typed `Icon` component bound to a specific icon set (glyph map,
 * font family, and name union). The default CDS `Icon` is created from this
 * factory; consumers with their own icon package can create their own typed
 * icon component that reuses all of the CDS rendering, accessibility, and
 * theming behavior.
 */
export function createIcon<Name extends string>({
  glyphMap,
  fontFamily = DEFAULT_ICON_FONT_FAMILY,
  getGlyph = defaultGetGlyph,
}: CreateIconConfig<Name>) {
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

      const rootStyle = useMemo(
        () => ({
          ...(dangerouslySetColor ? { color: dangerouslySetColor } : {}),
          ...style,
          ...styles?.root,
        }),
        [dangerouslySetColor, style, styles?.root],
      );

      // Only override the font-family CSS variable when a custom font is bound;
      // the default is applied by the static Linaria block's fallback value.
      const iconStyle = useMemo(
        () =>
          fontFamily === DEFAULT_ICON_FONT_FAMILY
            ? styles?.icon
            : ({
                '--cds-icon-font-family': fontFamily,
                ...styles?.icon,
              } as React.CSSProperties),
        [styles?.icon],
      );

      const glyph = getGlyph({
        glyphMap,
        name,
        size,
        pixelSize: iconSize,
        active: Boolean(active),
      });

      if (glyph === undefined) {
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
            {glyph}
          </span>
        </Box>
      );
    }),
  );

  Icon.displayName = 'Icon';

  return Icon;
}

export { getIconSourceSize };
