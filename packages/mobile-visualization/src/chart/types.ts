/**
 * Shared types for chart components
 */

/**
 * A color stop can be either:
 * - A color string: 'red', '#FF0000', 'rgb(255, 0, 0)'
 * - An object with color and optional opacity: { color: 'red', opacity: 0.5 }
 */
export type ColorStop = string | { color: string; opacity?: number };

/**
 * Unified color mapping configuration for chart visualizations.
 */
export type ColorMap = {
  /**
   * Type of color mapping.
   * - 'continuous': Smooth interpolation between colors
   * - 'discrete': Hard transitions at threshold boundaries
   */
  type: 'continuous' | 'discrete';

  /**
   * Which axis to map colors against.
   * - 'y': Map colors based on y-values (high/low values) - most common
   * - 'x': Map colors based on x-position (left/right, or time progression)
   * @default 'y'
   */
  axis?: 'x' | 'y';

  /**
   * Colors to use in the mapping. At least 2 required.
   *
   * Can be:
   * - Color strings: ['red', 'yellow', 'green']
   * - Objects with opacity: [{ color: 'red', opacity: 1 }, { color: 'green', opacity: 0.5 }]
   * - Mixed: ['red', { color: 'green', opacity: 0.5 }]
   *
   * **For continuous type:**
   * Colors are interpolated smoothly between stops.
   * If no stops provided, colors are evenly distributed.
   *
   * **For discrete type:**
   * Each color represents a segment. Must have length stops.length + 1.
   * Each segment has a distinct color with no interpolation.
   */
  colors: ColorStop[];

  /**
   * Stop positions that control color distribution.
   * Must be in ascending order.
   *
   * **For continuous type (optional):**
   * Normalized positions (0-1) for each color.
   * Allows non-uniform color distribution.
   * If provided, must match colors array length.
   * @example [0, 0.3, 1] places colors at 0%, 30%, and 100%
   *
   * **For discrete type (optional):**
   * Data value thresholds where colors change.
   * Creates colors.length segments from stops.length thresholds.
   * If not provided, creates single segment with first color.
   * @example [0, 10] with colors ['red', 'yellow', 'green']
   * - values < 0: red
   * - values 0-10: yellow
   * - values > 10: green
   */
  stops?: number[];
};
