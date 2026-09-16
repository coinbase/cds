import type { DropShadowImageFilterProps } from '@shopify/react-native-skia';

import type { BoxShadowToken, Shadow } from '../core/theme';

/**
 * react-native renders `boxShadow` on iOS as `layer.shadowRadius = blurRadius / 2`, so a
 * `blurRadius` is roughly twice the `shadowRadius` it replaces.
 *
 * @see https://github.com/facebook/react-native/blob/v0.81.5/packages/react-native/React/Fabric/Utils/RCTBoxShadow.mm#L67
 */
const blurRadiusToShadowRadiusRatio = 2;

/** Every legacy token ships an explicit `shadowColor: '#000000'`, so black is the natural fallback. */
const defaultShadowColor = '#000000';

const defaultShadowOpacity = 1;

/** The subset of Skia's `<Shadow>` props a CDS shadow token can describe. */
export type SkiaShadowParams = Pick<DropShadowImageFilterProps, 'dx' | 'dy' | 'blur'> & {
  /** Narrowed to the string member of Skia's `Color` so it can be composed with an opacity. */
  color: Extract<DropShadowImageFilterProps['color'], string>;
  /**
   * Skia's `<Shadow>` has no opacity prop, so callers must fold this into `color` themselves —
   * `getColorWithOpacity(color, opacity)`. Doing it here would pull Skia into the styles module.
   *
   * Undefined for `boxShadow` tokens, whose color already carries its own alpha. Folding an
   * opacity in would overwrite that alpha rather than compose with it.
   */
  opacity?: number;
};

/** Narrows a shadow token to the cross-platform `boxShadow` form. */
export const isBoxShadowToken = (shadow: Shadow): shadow is BoxShadowToken =>
  shadow.boxShadow !== undefined;

/** Coerces react-native's `number | string` dimension values to a number, treating junk as zero. */
const toNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Resolves either shadow token form into the parameters Skia's `<Shadow>` image filter needs.
 *
 * Skia's `<Shadow>` can express a single shadow with no spread, so `boxShadow` tokens are reduced
 * to their first entry and `spreadDistance` is dropped.
 */
export const getSkiaShadowParams = (shadow: Shadow | undefined): SkiaShadowParams | undefined => {
  if (!shadow) return undefined;

  if (isBoxShadowToken(shadow)) {
    const [firstShadow, ...remainingShadows] = shadow.boxShadow;
    if (!firstShadow) return undefined;

    if (__DEV__ && (remainingShadows.length > 0 || toNumber(firstShadow.spreadDistance) !== 0)) {
      console.warn(
        '[cds-mobile] Skia can only render a single shadow without spread. Additional boxShadow entries and spreadDistance are ignored.',
      );
    }

    return {
      dx: toNumber(firstShadow.offsetX),
      dy: toNumber(firstShadow.offsetY),
      blur: toNumber(firstShadow.blurRadius) / blurRadiusToShadowRadiusRatio,
      color: firstShadow.color ?? defaultShadowColor,
    };
  }

  return {
    dx: toNumber(shadow.shadowOffset?.width),
    dy: toNumber(shadow.shadowOffset?.height),
    blur: toNumber(shadow.shadowRadius),
    color: String(shadow.shadowColor ?? defaultShadowColor),
    opacity: toNumber(shadow.shadowOpacity ?? defaultShadowOpacity),
  };
};
