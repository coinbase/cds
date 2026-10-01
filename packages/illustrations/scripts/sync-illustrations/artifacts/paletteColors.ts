import type { ColorPalette } from '../illustration';

/** Matches the uppercase 6-digit hex colors `optimizeSvg` guarantees, without eating 8-digit ones. */
const hexColorPattern = /#[0-9A-F]{6}(?![0-9A-Fa-f])/g;

/**
 * Replaces every palette color in the light SVG in a single pass with whatever `replacement`
 * returns for it; colors outside the palette are kept. A single pass matters: replacing one color
 * at a time could re-replace a value that an earlier substitution just produced.
 *
 * This is the primitive sinks build their theming on; how a destination expresses a theme (dark
 * hex values, CSS variables, platform color resources) is the destination's decision.
 */
export function replacePaletteColors(
  lightSvg: string,
  palette: ColorPalette,
  replacement: (color: ColorPalette[number]) => string,
) {
  const byLightColor = new Map<string, ColorPalette[number]>();
  for (const color of palette) {
    if (!byLightColor.has(color.light)) byLightColor.set(color.light, color);
  }
  return lightSvg.replace(hexColorPattern, (hex) => {
    const color = byLightColor.get(hex);
    return color ? replacement(color) : hex;
  });
}

/** The dark variant: every palette color swapped for its dark-mode value. */
export const toDarkSvg = (lightSvg: string, palette: ColorPalette) =>
  replacePaletteColors(lightSvg, palette, ({ dark }) => dark);

/** A themeable variant for CSS consumers: every palette color becomes `var(--<prefix>-<name>)`. */
export const toCssVariableSvg = (lightSvg: string, palette: ColorPalette, prefix: string) =>
  replacePaletteColors(lightSvg, palette, ({ name }) => `var(--${prefix}-${name})`);
