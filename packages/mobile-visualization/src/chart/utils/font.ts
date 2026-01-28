import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { Theme } from '@coinbase/cds-mobile/core/theme';
import { FontWeight } from '@shopify/react-native-skia';

/**
 * Extract Skia font family name from CDS font family strings.
 * CDS uses names like "Inter_400Regular" or "CoinbaseDisplay-Medium"
 * but Skia expects just "Inter" or "CoinbaseDisplay" or "Coinbase Display".
 */
export function extractBaseFontFamily(fontFamily: string): string {
  // Handle underscore format: "Inter_400Regular" -> "Inter"
  if (fontFamily.includes('_')) {
    return fontFamily.split('_')[0];
  }
  // Handle dash format: "CoinbaseDisplay-Medium" -> "CoinbaseDisplay"
  // But be careful - some fonts use dashes in base name like "Source-Code-Pro"
  // CDS fonts use pattern: BaseName-Weight (e.g., CoinbaseSans-Medium)
  const dashMatch = fontFamily.match(/^(.+?)-(?:Regular|Medium|SemiBold|Bold|Light|Thin)$/i);
  if (dashMatch) {
    return dashMatch[1];
  }
  // Return as-is if no pattern matches
  return fontFamily;
}

/**
 * Extract font weight from CDS font family strings.
 * CDS uses names like "Inter_600SemiBold" or "CoinbaseDisplay-Medium".
 * Returns Skia FontWeight value (100-900).
 */
export function extractFontWeight(fontFamily: string): number {
  const lowerFamily = fontFamily.toLowerCase();

  // Check for explicit numeric weight in underscore format (e.g., "Inter_600SemiBold")
  const numericMatch = fontFamily.match(/_(\d{3})/);
  if (numericMatch) {
    return parseInt(numericMatch[1], 10);
  }

  // Check for weight keywords (order matters - check more specific first)
  if (lowerFamily.includes('thin') || lowerFamily.includes('hairline')) {
    return 100;
  }
  if (lowerFamily.includes('extralight') || lowerFamily.includes('ultralight')) {
    return 200;
  }
  if (lowerFamily.includes('light')) {
    return 300;
  }
  if (lowerFamily.includes('medium')) {
    return 500;
  }
  if (lowerFamily.includes('semibold') || lowerFamily.includes('demibold')) {
    return 600;
  }
  if (lowerFamily.includes('extrabold') || lowerFamily.includes('ultrabold')) {
    return 800;
  }
  if (lowerFamily.includes('bold')) {
    return 700;
  }
  if (lowerFamily.includes('black') || lowerFamily.includes('heavy')) {
    return 900;
  }
  if (lowerFamily.includes('regular') || lowerFamily.includes('normal')) {
    return 400;
  }

  // Default to normal weight
  return 400;
}

/**
 * Convert a CDS font family name to an array of possible Skia font names.
 * Skia's fontFamilies array uses the first one it can resolve.
 *
 * CDS uses: "CoinbaseDisplay-Regular"
 * Skia sees: "Coinbase Display" (with space)
 *
 * Returns both formats so Skia can match whichever is available.
 */
export function extractFontFamilies(fontFamily: string): string[] {
  const baseName = extractBaseFontFamily(fontFamily);

  // Add spaces before capital letters: "CoinbaseDisplay" -> "Coinbase Display"
  const spacedName = baseName.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Return both formats - Skia will use the first one it finds
  if (spacedName !== baseName) {
    return [spacedName, baseName, fontFamily];
  }
  return [baseName, fontFamily];
}

/**
 * Converts a fontWeight from Theme to a Skia FontWeight.
 * Only works when the fontWeight is a valid number (i.e., not 'bold').
 *
 * @param theme - The theme to use
 * @param font - The font to use
 * @returns The FontWeight or undefined if the fontWeight is not a valid number
 */
export function getThemeFontWeight(theme: Theme, font: ThemeVars.Font): FontWeight | undefined {
  const themeFontWeight = theme.fontWeight[font];

  const numericWeight =
    typeof themeFontWeight === 'string' ? Number(themeFontWeight) : themeFontWeight;

  const validFontWeights = Object.values(FontWeight).filter(
    (value): value is number => typeof value === 'number',
  );

  return numericWeight !== undefined && validFontWeights.includes(numericWeight)
    ? numericWeight
    : undefined;
}
