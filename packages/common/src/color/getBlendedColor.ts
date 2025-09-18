import { color } from 'd3-color';

import type { ColorScheme } from '../core/theme';

import { blendColors } from './blendColors';
import { getLuminance } from './getLuminance';

/**
 * Configuration for the color scheme.
 *
 * For each color scheme, it has an underlay color and a high contrast luminance threshold.
 * The underlay color is the color that is used to blend with the overlay color.
 * The high contrast luminance threshold is the luminance value, above (in dark color scheme)
 * or below (in light color scheme) which the overlay color is considered in high contrast to the underlay color.
 */
export type ColorBlendConfigByColorScheme = {
  light: {
    underlayColor: string;
    highContrastLuminanceThreshold: number;
  };
  dark: {
    underlayColor: string;
    highContrastLuminanceThreshold: number;
  };
};

const defaultColorBlendConfigByColorScheme: ColorBlendConfigByColorScheme = {
  light: {
    underlayColor: '#fff',
    highContrastLuminanceThreshold: 0.11,
  },
  dark: {
    underlayColor: '#000',
    highContrastLuminanceThreshold: 0.4,
  },
};

/**
 * The type of easing function to use for opacity adjustment.
 * - `linear`: A straight linear progression.
 * - `ease-out`: An "ease-out" curve, where the adjustment starts fast and slows down as the luminance delta gets larger. This is the default.
 * - `ease-in`: An "ease-in" curve, where the adjustment starts slow and speeds up as the luminance delta.
 */
export type BlendOpacityAdjustmentEasingFunction = 'linear' | 'ease-in' | 'ease-out';

/**
 * Configuration for fine-tuning the automatic blend opacity adjustment.
 */
export type BlendOpacityAdjustmentConfig = {
  /**
   * The minimum luminance difference between the overlay and underlay colors, below which no opacity adjustment occurs.
   * A value between 0 and 1.
   * @default 0.2
   */
  noAdjustmentLuminanceDelta: number;
  /**
   * This ratio controls the maximum strength of the opacity adjustment. It is a proportion of the "available
   * room for increase" (the difference between the starting blend opacity and 1.0).
   * @default 0.75
   */
  adjustmentStrengthRatio: number;
  /**
   * The easing function to use for the opacity adjustment.
   * @default 'ease-out'
   */
  adjustmentEasingFunction?: BlendOpacityAdjustmentEasingFunction;
};

const defaultBlendOpacityAdjustmentConfig: BlendOpacityAdjustmentConfig = {
  noAdjustmentLuminanceDelta: 0.2,
  adjustmentStrengthRatio: 0.75,
  adjustmentEasingFunction: 'ease-out',
};

/**
 * Adjusts the blend opacity based on the luminance difference between the overlay and underlay colors.
 * When the luminance difference is large (e.g., a light overlay color on a dark underlay color), the blending
 * effect is toned down (opacity of the overlay color is increased). This makes the resulting color variation more subtle
 * and preserves the overlay color's character.
 *
 * Conversely, when the luminance difference is small (less than the `noAdjustmentLuminanceDelta`), the original blend opacity is used to allow
 * for a more pronounced blending effect. This ensures that colors with similar brightness to the
 * background still produce a noticeable visual change.
 */
const getAdjustedBlendOpacity = ({
  overlayColorLuminance,
  underlayColorLuminance,
  blendOpacity,
  blendOpacityAdjustmentConfig: {
    noAdjustmentLuminanceDelta,
    adjustmentStrengthRatio,
    adjustmentEasingFunction,
  } = defaultBlendOpacityAdjustmentConfig,
}: {
  overlayColorLuminance: number;
  underlayColorLuminance: number;
  blendOpacity: number;
  blendOpacityAdjustmentConfig?: BlendOpacityAdjustmentConfig;
}) => {
  // Calculate absolute difference in luminance (0 to 1)
  const luminanceDelta = Math.abs(overlayColorLuminance - underlayColorLuminance);

  // If luminance difference is below threshold, return original blend opacity unchanged
  if (luminanceDelta < noAdjustmentLuminanceDelta) {
    return blendOpacity;
  }

  // Normalize the luminance difference to a 0-to-1 scale. This ensures the adjustment
  // starts from 0 and increases smoothly and predictably as the luminance difference
  // surpasses the threshold.
  // Example: if noAdjustmentLuminanceDelta is 0.2 and luminanceDelta is 0.6,
  // the raw difference is 0.4. The total possible adjustment range is 0.8 (from 0.2 to 1.0).
  // The normalizedDiff is 0.4 / 0.8 = 0.5, meaning we are 50% of the way through the adjustable range.
  // This provides a consistent 0-1 scale for the easing curve.
  const normalizedDiff =
    (luminanceDelta - noAdjustmentLuminanceDelta) / (1 - noAdjustmentLuminanceDelta);

  // Apply the selected easing to the normalized difference for gentler scaling
  let scaleFactor: number;
  switch (adjustmentEasingFunction) {
    case 'linear':
      scaleFactor = normalizedDiff;
      break;
    case 'ease-in':
      scaleFactor = Math.pow(normalizedDiff, 2);
      break;
    case 'ease-out':
    default:
      scaleFactor = Math.pow(normalizedDiff, 0.5);
      break;
  }

  const scale = scaleFactor * adjustmentStrengthRatio;

  // Calculate how much we can increase the blendOpacity (cannot exceed 1.0)
  const maxIncrease = 1 - blendOpacity;
  const blendStrengthIncrease = maxIncrease * scale;

  // Return adjusted blend opacity, increased based on luminance difference
  return blendOpacity + blendStrengthIncrease;
};

/**
 * Configuration for the `getBlendedColor` function.
 */
export type ColorBlendConfig = {
  /**
   * The overlay color to create a variation of (CSS color string, hex, rgb, hsl, etc.).
   */
  overlayColor: string;
  /**
   * The opacity of the overlay color when blending (0-1).
   * A value of `1` means the color is fully opaque (no blending).
   * Lower values result in more blending with the background.
   */
  blendOpacity: number;
  /**
   * Optional configuration to fine-tune the automatic opacity adjustment logic.
   */
  blendOpacityAdjustmentConfig?: BlendOpacityAdjustmentConfig;
  /**
   * The current color scheme ('light' or 'dark').
   */
  colorScheme: ColorScheme;
  /**
   * Optional configuration for the color schemes, including underlay colors and luminance thresholds.
   */
  configByColorScheme?: ColorBlendConfigByColorScheme;
  /**
   * If true, disables automatic contrast optimization and always uses the current color scheme for blending.
   * @default false
   */
  skipContrastOptimization?: boolean;
};

/**
 * Creates subtle color variations by blending overlay color with underlay color based on the input color's luminance
 * and current theme. Automatically optimizes for contrast unless disabled.
 *
 * @param config - The configuration for the function.
 * @returns CSS color string with the blended result.
 *
 * @example
 * ```typescript
 * // Light theme
 * const lightVariation = getBlendedColor({
 *   overlayColor: '#0052ff',
 *   blendOpacity: 0.88,
 *   colorScheme: 'light'
 * });
 *
 * // Dark theme
 * const darkVariation = getBlendedColor({
 *   overlayColor: '#0052ff',
 *   blendOpacity: 0.82,
 *   colorScheme: 'dark'
 * });
 *
 * // Skip contrast optimization
 * const simpleVariation = getBlendedColor({
 *   overlayColor: '#0052ff',.
 *   blendOpacity: 0.75,
 *   colorScheme: 'light',
 *   skipContrastOptimization: true
 * });
 * ```
 */
export const getBlendedColor = ({
  overlayColor,
  blendOpacity,
  blendOpacityAdjustmentConfig,
  colorScheme,
  configByColorScheme = defaultColorBlendConfigByColorScheme,
  skipContrastOptimization = false,
}: ColorBlendConfig) => {
  // Special cases: these color values cannot be analyzed or blended, return as-is
  if (overlayColor === 'currentColor' || overlayColor === 'transparent') {
    return overlayColor;
  }

  const overlayColorRgba = color(overlayColor);
  if (overlayColorRgba === null) {
    return overlayColor;
  }

  // Preserve original opacity for semi-transparent overlay colors (e.g., bgLine, bgLineHeavy),
  // which will be re-applied post-blending.
  const overlayColorOpacity = overlayColorRgba.opacity;
  // Handle fully transparent colors (alpha = 0)
  if (overlayColorOpacity === 0) {
    return 'transparent';
  }

  const overlayColorLuminance = getLuminance(overlayColor) ?? 1;
  const oppositeColorScheme = colorScheme === 'dark' ? 'light' : 'dark';

  // Determine if overlay color has high contrast with the theme background
  // High contrast overlays use current scheme underlay, low contrast overlays use opposite scheme underlay
  const isHighContrast =
    colorScheme === 'dark'
      ? overlayColorLuminance >= configByColorScheme.dark.highContrastLuminanceThreshold // Light overlays on dark background = high contrast
      : overlayColorLuminance <= configByColorScheme.light.highContrastLuminanceThreshold; // Dark overlays on light background = high contrast

  const shouldUseCurrentColorScheme = skipContrastOptimization || isHighContrast;
  // Choose underlay color from the current scheme when skipping optimization or high-contrast,
  // otherwise use the one from the opposite scheme.
  const underlayColor = shouldUseCurrentColorScheme
    ? configByColorScheme[colorScheme].underlayColor
    : configByColorScheme[oppositeColorScheme].underlayColor;

  const underlayColorLuminance = getLuminance(underlayColor) ?? 1;

  // Automatically adjust blend opacity based on luminance difference for optimal visual contrast
  const adjustedBlendOpacity = getAdjustedBlendOpacity({
    overlayColorLuminance,
    underlayColorLuminance,
    blendOpacity,
    blendOpacityAdjustmentConfig,
  });

  // Create adjusted overlay color with the calculated blend strength
  const overlayColorWithAdjustedBlendOpacity = overlayColorRgba.copy({
    opacity: adjustedBlendOpacity,
  });

  const blendedRgb = blendColors({
    underlayColor,
    overlayColor: overlayColorWithAdjustedBlendOpacity,
  });

  if (overlayColorOpacity < 1) {
    return blendedRgb.copy({ opacity: overlayColorOpacity }).formatRgb();
  }

  return blendedRgb.formatRgb();
};
