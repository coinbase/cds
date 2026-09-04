import type { DensityTheme } from '../../../core/theme';
import * as vars from '../../../styles/vars';

export const denseDensityTheme = {
  space: {
    '0': '0px',
    '0.5': '3px',
    '1': '6px',
    '2': '12px',
    '3': '18px',
    '4': '24px',
    '5': '30px',
    '6': '36px',
    '7': '42px',
    '8': '48px',
    '9': '54px',
    '10': '60px',
  },
  size: {
    'icon-xs': '8px',
    'icon-s': '12px',
    'icon-m': '16px',
    'icon-l': '24px',
  },
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  fontWeight: vars.fontWeight,
  lineHeight: vars.lineHeight,
} as const satisfies DensityTheme;
