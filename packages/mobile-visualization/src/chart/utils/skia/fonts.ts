import { useMemo } from 'react';
import { Platform } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SkFont } from '@shopify/react-native-skia';
import { matchFont } from '@shopify/react-native-skia';

/**
 * Hook to create a Skia Font for chart rendering.
 *
 * TEMPORARY: Uses hardcoded font configurations instead of theme values
 * to avoid React Context issues inside Skia's rendering tree.
 *
 * @param fontFamily - Optional CDS font family key. Defaults to 'label2' (15px).
 * @returns Skia Font object ready for rendering and measurement.
 *
 * @example
 * ```tsx
 * // Use default font (label2 - 15px)
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

// Temporary hardcoded font configurations matching CDS theme
// TODO: Find a way to safely access theme values inside Skia rendering context
const FONT_CONFIGS: Record<string, { fontSize: number; fontWeight: SkiaFontWeight }> = {
  label1: { fontSize: 17, fontWeight: '600' },
  label2: { fontSize: 15, fontWeight: '400' },
  body: { fontSize: 17, fontWeight: '400' },
  caption: { fontSize: 13, fontWeight: '400' },
  headline: { fontSize: 20, fontWeight: '600' },
  title1: { fontSize: 28, fontWeight: '700' },
  title2: { fontSize: 22, fontWeight: '600' },
  title3: { fontSize: 20, fontWeight: '600' },
};

export const useChartFont = (fontFamily?: ThemeVars.FontFamily): SkFont => {
  return useMemo(() => {
    const font = fontFamily ?? 'label2';
    const fontConfig = FONT_CONFIGS[font] ?? FONT_CONFIGS.label2;

    const config = {
      // Use platform-appropriate system fonts
      fontFamily: Platform.select({ ios: 'Helvetica', default: 'sans-serif' }),
      fontSize: fontConfig.fontSize,
      fontWeight: fontConfig.fontWeight,
    };

    return matchFont(config);
  }, [fontFamily]);
};
