import type { ThemeVars } from '@coinbase/cds-common/core/theme';

/**
 * Font descriptor for Skia text rendering.
 *
 * Note: This is a simplified version that uses system fonts.
 * Apps can provide their own font manager via context if custom fonts are needed.
 */
export type SkiaFontDescriptor = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: 'normal' | 'italic';
};

/**
 * Maps CDS font tokens to Skia font descriptors using system fonts.
 *
 * Note: This is a temporary stub implementation. Apps should provide their own
 * font manager via context if custom Coinbase fonts are needed.
 *
 * @param font - CDS font token (e.g., 'body1', 'headline')
 * @param theme - Theme object with font definitions
 * @param fontSizeOverride - Optional font size override
 * @param fontStyleOverride - Optional font style override
 * @returns Skia font descriptor
 */
export const getSkiaFontDescriptor = (
  font: string | undefined,
  theme: any,
  fontSizeOverride?: number,
  fontStyleOverride?: 'normal' | 'italic',
): SkiaFontDescriptor => {
  // Fallback to simple defaults if theme is not available or malformed
  if (!theme || !theme.font) {
    return {
      fontFamily: 'System',
      fontSize: fontSizeOverride || 14,
      fontWeight: 400,
      fontStyle: fontStyleOverride || 'normal',
    };
  }

  // Get font definition from theme
  const fontDef = font && theme.font[font] ? theme.font[font] : theme.font.body1;

  // If still no font definition, use fallback
  if (!fontDef) {
    return {
      fontFamily: 'System',
      fontSize: fontSizeOverride || 14,
      fontWeight: 400,
      fontStyle: fontStyleOverride || 'normal',
    };
  }

  // Parse font size (remove 'px' suffix if present)
  const fontSize = fontSizeOverride || parseFloat(fontDef.fontSize) || 14;

  // Parse font weight
  const fontWeight = parseInt(fontDef.fontWeight, 10) || 400;

  // Parse font style
  const fontStyle = fontStyleOverride || (fontDef.fontStyle as 'normal' | 'italic') || 'normal';

  // Map font family to system font
  // Apps should provide their own font manager if custom fonts are needed
  let fontFamily = 'System';

  if (fontDef.fontFamily && fontDef.fontFamily.includes('Mono')) {
    fontFamily = 'Courier';
  }

  return {
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
  };
};
