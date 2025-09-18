import type { IllustrationColorTheme } from '../../../core/theme';
import * as vars from '../../../styles/vars';

export const lightIllustrationColorTheme = {
  illustrationColor: vars.illustrationColor,
} as const satisfies IllustrationColorTheme;
