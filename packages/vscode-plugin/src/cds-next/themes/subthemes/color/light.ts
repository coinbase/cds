import type { ColorTheme } from '../../../core/theme';
import * as vars from '../../../styles/vars';

export const lightColorTheme = {
  color: vars.color,
} as const satisfies ColorTheme;
