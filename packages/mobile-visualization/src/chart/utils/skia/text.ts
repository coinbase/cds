import type { SkFont } from '@shopify/react-native-skia';

/**
 * Measure text dimensions using Skia font.
 * This is a convenience wrapper around SkFont.measureText().
 *
 * @param font - Skia Font object
 * @param text - Text to measure
 * @returns Object with width and height properties
 *
 * @example
 * ```tsx
 * const font = useChartFont();
 * const { width, height } = measureText(font, 'Hello World');
 * console.log(`Text is ${width}px wide and ${height}px tall`);
 * ```
 */
export const measureText = (font: SkFont, text: string) => {
  return font.measureText(text);
};

/**
 * Calculate baseline-adjusted Y position for text.
 * Skia positions text by baseline, this helper adjusts for visual alignment.
 *
 * @param y - Target Y position
 * @param fontSize - Font size in pixels
 * @param verticalAlign - Vertical alignment mode
 * @returns Adjusted Y position for baseline rendering
 *
 * @example
 * ```tsx
 * // Center text vertically at y=100
 * const adjustedY = calculateTextBaseline(100, 12, 'middle');
 * <Text y={adjustedY} ... />
 * ```
 */
export const calculateTextBaseline = (
  y: number,
  fontSize: number,
  verticalAlign: 'top' | 'middle' | 'bottom' = 'middle',
): number => {
  switch (verticalAlign) {
    case 'top':
      return y + fontSize;
    case 'middle':
      return y + fontSize / 2.5; // Empirically determined for visual centering
    case 'bottom':
      return y;
  }
};

/**
 * Calculate horizontally aligned X position based on text width.
 *
 * @param x - Target X position
 * @param textWidth - Width of the text in pixels
 * @param align - Horizontal alignment mode
 * @returns Adjusted X position for the specified alignment
 *
 * @example
 * ```tsx
 * const font = useChartFont();
 * const { width } = font.measureText('Hello');
 *
 * // Center text horizontally at x=100
 * const adjustedX = calculateTextX(100, width, 'center');
 * <Text x={adjustedX} ... />
 * ```
 */
export const calculateTextX = (
  x: number,
  textWidth: number,
  align: 'start' | 'center' | 'end' = 'start',
): number => {
  switch (align) {
    case 'center':
      return x - textWidth / 2;
    case 'end':
      return x - textWidth;
    default:
      return x;
  }
};

/**
 * Helper to calculate both X and Y positions with alignment in one call.
 * Combines text measurement, horizontal alignment, and vertical baseline calculation.
 *
 * @param x - Target X position
 * @param y - Target Y position
 * @param font - Skia Font object
 * @param text - Text to position
 * @param options - Alignment options
 * @returns Object with adjusted x, y, width, and height
 *
 * @example
 * ```tsx
 * const font = useChartFont();
 * const position = calculateTextPosition(100, 50, font, 'Hello World', {
 *   horizontalAlign: 'center',
 *   verticalAlign: 'middle',
 * });
 *
 * <Text
 *   x={position.x}
 *   y={position.y}
 *   text="Hello World"
 *   font={font}
 * />
 * ```
 */
export const calculateTextPosition = (
  x: number,
  y: number,
  font: SkFont,
  text: string,
  options: {
    horizontalAlign?: 'start' | 'center' | 'end';
    verticalAlign?: 'top' | 'middle' | 'bottom';
  } = {},
) => {
  const { width } = font.measureText(text);
  const fontSize = font.getSize();

  return {
    x: calculateTextX(x, width, options.horizontalAlign),
    y: calculateTextBaseline(y, fontSize, options.verticalAlign),
    width,
    height: fontSize,
  };
};
