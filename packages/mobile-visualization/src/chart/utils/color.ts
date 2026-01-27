/**
 * Convert any CSS color format to hex for Skia compatibility.
 * Skia.Color() works best with hex format.
 */
export function toHexColor(color: string): string {
  // Already hex
  if (color.startsWith('#')) {
    return color;
  }

  // Parse rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Return as-is and let Skia try to parse it
  return color;
}
