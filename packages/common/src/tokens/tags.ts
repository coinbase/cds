import type { ThemeVars } from '../core/theme';
import type { TagColorScheme, TagEmphasis, TagIntent } from '../types/TagBaseProps';

export const tagEmphasisMap: Record<TagEmphasis, TagIntent> = {
  high: 'promotional',
  low: 'informational',
} as const;

export const tagHorizontalSpacing: Record<TagIntent, ThemeVars.Space> = {
  informational: 0.5,
  promotional: 1,
} as const;

export const tagFontMap: Record<TagIntent, ThemeVars.FontFamily> = {
  informational: 'label1',
  promotional: 'caption',
};

export const tagBorderRadiusMap: Record<TagIntent, ThemeVars.BorderRadius> = {
  informational: 100,
  promotional: 1000,
};

type TagEmphasisColorMap = Record<
  TagEmphasis,
  Record<
    TagColorScheme,
    { background: ThemeVars.SpectrumColor; foreground: ThemeVars.SpectrumColor }
  >
>;

export const tagEmphasisColorMap: TagEmphasisColorMap = {
  low: {
    green: {
      background: 'green0',
      foreground: 'green60',
    },
    blue: {
      background: 'blue0',
      foreground: 'blue60',
    },
    yellow: {
      background: 'yellow0',
      foreground: 'yellow70',
    },
    purple: {
      background: 'purple0',
      foreground: 'purple80',
    },
    red: {
      background: 'red0',
      foreground: 'red60',
    },
    gray: {
      background: 'gray10',
      foreground: 'gray80',
    },
  },
  high: {
    green: {
      background: 'green60',
      foreground: 'green0',
    },
    blue: {
      background: 'blue60',
      foreground: 'blue0',
    },
    yellow: {
      background: 'yellow30',
      foreground: 'yellow70',
    },
    purple: {
      background: 'purple80',
      foreground: 'purple0',
    },
    red: {
      background: 'red60',
      foreground: 'red0',
    },
    gray: {
      background: 'gray80',
      foreground: 'gray10',
    },
  },
};

type TagColorMap = Record<
  TagIntent,
  Record<
    TagColorScheme,
    { background: ThemeVars.SpectrumColor; foreground: ThemeVars.SpectrumColor }
  >
>;

/**
 * @deprecated Use tagEmphasisColorMap instead
 */
export const tagColorMap: TagColorMap = {
  informational: tagEmphasisColorMap.low,
  promotional: tagEmphasisColorMap.high,
};
