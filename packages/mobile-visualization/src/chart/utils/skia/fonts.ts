import { useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import type { SkFont } from '@shopify/react-native-skia';
import { matchFont } from '@shopify/react-native-skia';

/**
 * Hook to create a Skia Font for chart rendering using theme values with optional overrides.
 *
 * @param font - Base font to use (e.g., 'headline', 'body', 'label1'). Defaults to 'label2'.
 * @param fontFamilyOverride - Override fontFamily (can be a font name to lookup or a direct font family string)
 * @param fontSizeOverride - Override fontSize (can be a number or a font name to lookup the size)
 * @param fontWeightOverride - Override fontWeight (can be a weight string or a font name to lookup the weight)
 * @returns Skia Font object ready for rendering and measurement.
 *
 * @example
 * ```tsx
 * // Use default font (label2)
 * const font = useChartFont();
 *
 * // Use custom font
 * const headlineFont = useChartFont('headline');
 * const captionFont = useChartFont('caption');
 *
 * // Use display1's family and weight, but body's size
 * const mixedFont = useChartFont('display1', undefined, 'body');
 *
 * // Use headline, but override size to 20
 * const customSizeFont = useChartFont('headline', undefined, 20);
 *
 * // Measure text
 * const { width, height } = font.measureText('Hello');
 * ```
 */

type SkiaFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const useChartFont = (
  font?: ThemeVars.FontFamily,
  fontFamilyOverride?: string | ThemeVars.FontFamily,
  fontSizeOverride?: number | ThemeVars.FontFamily,
  fontWeightOverride?: string | ThemeVars.FontFamily,
): SkFont => {
  const theme = useTheme();

  return useMemo(() => {
    const baseFont = font ?? 'label2';

    // Get base values from theme
    const baseFontFamily: string = (theme.fontFamily[baseFont as keyof typeof theme.fontFamily] ??
      theme.fontFamily.label2) as string;
    const baseFontSize: number = (theme.fontSize[baseFont as keyof typeof theme.fontSize] ??
      theme.fontSize.label2) as number;
    const baseFontWeight: string = (theme.fontWeight[baseFont as keyof typeof theme.fontWeight] ??
      theme.fontWeight.label2) as string;

    // Resolve fontFamily override
    let fontFamily: string = baseFontFamily;
    if (fontFamilyOverride !== undefined) {
      // Check if it's a theme font key or a direct font family string
      const lookupFamily = theme.fontFamily[fontFamilyOverride as keyof typeof theme.fontFamily];
      fontFamily = (lookupFamily ?? fontFamilyOverride) as string;
    }

    // Resolve fontSize override
    let fontSize: number = baseFontSize;
    if (fontSizeOverride !== undefined) {
      if (typeof fontSizeOverride === 'number') {
        fontSize = fontSizeOverride;
      } else {
        // It's a font name, look up the size
        fontSize = (theme.fontSize[fontSizeOverride as keyof typeof theme.fontSize] ??
          baseFontSize) as number;
      }
    }

    // Resolve fontWeight override
    let fontWeight: string = baseFontWeight;
    if (fontWeightOverride !== undefined) {
      // Check if it's a theme font key or a direct weight string
      const lookupWeight = theme.fontWeight[fontWeightOverride as keyof typeof theme.fontWeight];
      fontWeight = (lookupWeight ?? fontWeightOverride) as string;
    }

    return matchFont({
      fontFamily: fontFamily as string,
      fontSize,
      fontWeight: fontWeight as SkiaFontWeight,
    });
  }, [font, fontFamilyOverride, fontSizeOverride, fontWeightOverride, theme]);
};
