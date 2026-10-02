/** One `illustration/*` color variable: its name and its value in each Figma mode. */
export type PaletteColor = { name: string; light: string; dark: string };

/** The palette as it is stored in the manifest. */
export type PaletteRecord = Record<string, { light: string; dark: string }>;

/** Matches the uppercase 6-digit hex colors `optimizeSvg` guarantees, without eating 8-digit ones. */
const hexColorPattern = /#[0-9A-F]{6}(?![0-9A-Fa-f])/g;

/**
 * The fixed set of colors illustrations are drawn with. Design draws the light variant only; every
 * other variant is this palette substituted into the light SVG, which is what `recolor` does.
 *
 * A value object: it holds the colors and the pure operations on them, nothing else.
 */
export class ColorPalette {
  readonly colors: readonly PaletteColor[];
  private readonly byLightColor = new Map<string, PaletteColor>();

  constructor(colors: readonly PaletteColor[]) {
    this.colors = colors;
    for (const color of colors) {
      if (!this.byLightColor.has(color.light)) this.byLightColor.set(color.light, color);
    }
  }

  get size() {
    return this.colors.length;
  }

  /**
   * Replaces every palette color in the light SVG with whatever `replacement` returns for it;
   * colors outside the palette are kept. Done in a single pass: replacing one color at a time
   * could re-replace a value an earlier substitution just produced.
   *
   * This is the primitive sinks build their theming on; how a destination expresses a theme (dark
   * hex values, CSS variables, platform color resources) is the destination's decision.
   */
  recolor(lightSvg: string, replacement: (color: PaletteColor) => string) {
    return lightSvg.replace(hexColorPattern, (hex) => {
      const color = this.byLightColor.get(hex);
      return color ? replacement(color) : hex;
    });
  }

  /** The dark variant: every palette color swapped for its dark-mode value. */
  toDarkSvg(lightSvg: string) {
    return this.recolor(lightSvg, ({ dark }) => dark);
  }

  toRecord(): PaletteRecord {
    return Object.fromEntries(this.colors.map(({ name, light, dark }) => [name, { light, dark }]));
  }
}
