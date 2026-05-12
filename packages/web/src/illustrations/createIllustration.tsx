import React, { memo, useEffect, useMemo, useState } from 'react';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import type {
  HeroSquareDimension,
  PictogramDimension,
  SpotIconDimension,
  SpotRectangleDimension,
  SpotSquareDimension,
} from '@coinbase/cds-common/types/IllustrationProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { convertDimensionToSize } from '@coinbase/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@coinbase/cds-common/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@coinbase/cds-common/utils/getDefaultSizeObjectForIllustration';
import type {
  HeroSquareName,
  PictogramName,
  SpotIconName,
  SpotRectangleName,
  SpotSquareName,
} from '@coinbase/cds-illustrations';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';

const STATIC_ASSETS_CDN = 'https://static-assets.coinbase.com/ui-infra/illustration/v1';

export type IllustrationNamesMap = {
  heroSquare: HeroSquareName;
  spotRectangle: SpotRectangleName;
  pictogram: PictogramName;
  spotSquare: SpotSquareName;
  spotIcon: SpotIconName;
};

export type IllustrationDimensionsMap = {
  heroSquare: HeroSquareDimension;
  spotSquare: SpotSquareDimension;
  spotRectangle: SpotRectangleDimension;
  pictogram: PictogramDimension;
  spotIcon: SpotIconDimension;
};

export type IllustrationBaseProps<T extends keyof IllustrationNamesMap> = SharedProps & {
  /** Name of illustration as defined in Figma */
  name: IllustrationNamesMap[T];
  /**
   * HeroSquare Default:  240x240
   * SpotSquare Default: 96x96
   * Pictogram Default: 48x48
   * SpotRectangle Default: 240x120
   *
   */
  dimension?: IllustrationDimensionsMap[T];
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
  /**
   * Fallback element to render if unable to find an illustration with the matching name,
   * or while the themed SVG is loading when applyTheme is set.
   * @default null
   * */
  fallback?: null | React.ReactElement;
  /** Apply the theme to the illustration */
  applyTheme?: boolean;
};

type IllustrationVersionMapShape<Variant extends IllustrationVariant> = Record<
  IllustrationNamesMap[Variant],
  number
>;

/**
 * ESM-compatible lazy loader map. Each entry uses a relative dynamic import so
 * any bundler (Vite, webpack, esbuild) can code-split without CORS or bare-specifier issues.
 */
type SvgEsmConfigShape<Variant extends IllustrationVariant> = Partial<
  Record<IllustrationNamesMap[Variant], { themeable?: () => Promise<string> }>
>;

export type IllustrationA11yProps = {
  /** Alt tag to apply to the img
   * @default "" will identify the image as decorative
   */
  alt?: string;
};

export type IllustrationBasePropsWithA11y<Type extends IllustrationVariant> =
  IllustrationBaseProps<Type> & IllustrationA11yProps;

export function createIllustration<Variant extends IllustrationVariant>(
  variant: Variant,
  versionMap: IllustrationVersionMapShape<Variant>,
  svgEsmConfig?: SvgEsmConfigShape<Variant>,
) {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  type IllustrationProps = IllustrationBasePropsWithA11y<Variant>;

  const Illustration = memo(function Illustration({
    name,
    dimension,
    scaleMultiplier,
    testID,
    alt = '',
    fallback,
    applyTheme,
  }: IllustrationProps) {
    const { activeColorScheme, illustrationColor } = useTheme();
    const version = versionMap[name];

    // null = not yet loaded (or load failed), string = loaded inline SVG
    const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

    useEffect(() => {
      let cancelled = false;
      const themeableLoader = svgEsmConfig?.[name]?.themeable;
      const shouldLoad = applyTheme && illustrationColor && themeableLoader;

      setSvgMarkup(null);

      if (shouldLoad) {
        themeableLoader()
          .then((svg) => {
            if (!cancelled) setSvgMarkup(svg);
          })
          .catch((err) => {
            if (isDevelopment()) {
              console.error(`Failed to load themeable illustration ${name}:`, err);
            }
          });
      }

      return () => {
        cancelled = true;
      };
    }, [name, version, applyTheme, illustrationColor]);

    const { width, height } = useMemo(() => {
      let size = defaultSize;
      if (dimension) size = convertDimensionToSize(dimension);
      if (scaleMultiplier) size = convertSizeWithMultiplier(size, scaleMultiplier);
      return size;
    }, [dimension, scaleMultiplier]);

    if (applyTheme) {
      if (svgMarkup) {
        // The SVG retains its var(--illustration-*) tokens. ThemeProvider emits the resolved
        // --illustration-* CSS vars so the browser applies them through normal cascade.
        return (
          <div
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
            aria-label={alt || undefined}
            data-testid={testID}
            role={alt ? 'img' : 'presentation'}
            style={{ width, height, display: 'inline-block' }}
          />
        );
      }

      // Still loading or failed — return fallback (defaults to null).
      return fallback ?? null;
    }

    // Default CDN path — used when applyTheme is false.
    return version ? (
      <img
        alt={alt}
        data-testid={testID}
        height={height}
        src={`${STATIC_ASSETS_CDN}/${variant}/svg/${activeColorScheme}/${name}-${version}.svg`}
        width={width}
      />
    ) : (
      (fallback ?? null)
    );
  });

  Illustration.displayName = 'Illustration';
  return Illustration;
}
