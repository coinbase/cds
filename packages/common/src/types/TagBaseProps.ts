import type { ThemeVars } from '../core/theme';

export type TagIntent = 'informational' | 'promotional';

export type TagColorScheme = Extract<
  ThemeVars.SpectrumHue,
  'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'gray'
>;
