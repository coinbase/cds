import { useMemo } from 'react';
import { Platform } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import type { SkFont } from '@shopify/react-native-skia';
import { matchFont } from '@shopify/react-native-skia';

/**
 * Hook to create a Skia Font for chart rendering using theme values.
 *
 * @param fontFamily - Optional CDS font family key. Defaults to 'label2'.
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

export const useChartFont = (fontFamily?: ThemeVars.FontFamily): SkFont => {
  const theme = useTheme();

  return useMemo(() => {
    const font = fontFamily ?? 'label2';
    const fontStr = String(font);

    // Handle special case for label1Emphasized which isn't in the theme
    // It uses label1 size with bold weight
    const fontSize =
      fontStr === 'label1Emphasized'
        ? theme.fontSize.label1
        : (theme.fontSize[font as keyof typeof theme.fontSize] ?? theme.fontSize.label2);

    const fontWeight =
      fontStr === 'label1Emphasized'
        ? '700'
        : (theme.fontWeight[font as keyof typeof theme.fontWeight] ?? theme.fontWeight.label2);

    const config = {
      // Use platform-appropriate system fonts
      fontFamily: Platform.select({ ios: 'Helvetica', default: 'sans-serif' }),
      fontSize,
      fontWeight: fontWeight as SkiaFontWeight,
    };

    return matchFont(config);
  }, [fontFamily, theme.fontSize, theme.fontWeight]);
};
