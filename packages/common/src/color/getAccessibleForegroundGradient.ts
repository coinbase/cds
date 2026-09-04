import type { ColorScheme } from '../core/theme';
import type { A11yColorUsage, GradientArray } from '../types/Color';
import { getAccessibleColor } from '../utils/getAccessibleColor';

import { darkenColor } from './darkenColor';

type GetAccessibleForegroundGradientParams = {
  /* Valid color value (hex, rgb, rgba, etc) */
  background: string;
  /* Valid color value (hex, rgb, rgba, etc) */
  color: string;
  /** Active colorScheme (light or dark) */
  colorScheme: ColorScheme;
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage;
};

export const getAccessibleForegroundGradient = ({
  background,
  color,
  colorScheme,
  usage,
}: GetAccessibleForegroundGradientParams): GradientArray => {
  let color1 = color;
  let color2 = color;
  // Disable gradients in dark mode
  if (colorScheme === 'dark' || color === 'auto') {
    color1 =
      color !== 'auto' ? color : getAccessibleColor({ background, foreground: 'auto', usage });
    color2 = color1;
  } else {
    color1 = color;
    color2 = darkenColor(color) ?? color;
  }
  return [
    { offset: '0%', color: color1 },
    { offset: '100%', color: color2 },
  ];
};
