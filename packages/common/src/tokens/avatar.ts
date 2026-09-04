import type { ThemeVars } from '../core/theme';
import type { AvatarFallbackColor } from '../types/AvatarBaseProps';

export const colorSchemeMap = {
  blue: 'blue60',
  teal: 'teal60',
  purple: 'purple60',
  pink: 'pink60',
  green: 'green60',
  gray: 'gray60',
  orange: 'orange60',
  yellow: 'yellow60',
  indigo: 'indigo60',
  red: 'red60',
  chartreuse: 'chartreuse60',
} as const satisfies Record<AvatarFallbackColor, ThemeVars.SpectrumColor>;
