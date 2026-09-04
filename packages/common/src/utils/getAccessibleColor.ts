import { rgb } from 'd3-color';

import { isAccessibleColor } from '../color/isAccessibleColor';
import { type A11yColorUsage } from '../types/Color';

const contrastRatio = (l1: number, l2: number) => {
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

type GetAccessibleColorParams = {
  /* Valid color value (hex, rgb, rgba, etc) */
  background: string;
  /* Valid color value (hex, rgb, rgba, etc) */
  foreground?: 'auto';
  /**
   * Where the foreground color is being applied.
   * @default 'normalText'
   */
  usage?: A11yColorUsage;
  /** Use higher contrast ratio. */
  enhanced?: boolean;
};

/**
 * People with low vision often have difficulty reading text that does not contrast with its background.
 * This can be exacerbated if the person has a color vision deficiency that lowers the contrast even further.
 * Providing a minimum luminance contrast ratio between the text and its background can make the text more
 * readable even if the person does not see the full range of colors. It also works for the rare individuals who see no color.
 *
 * If foreground='auto:
 * 2. Return white or black based on contrast ratio with background.
 *
 * If foreground does not exist or doesn't meet contrast criteria:
 * 1. Check background color contrast ratios with white and black
 * 2. Return the color with higher contrast.
 */
export const getAccessibleColor = ({
  background,
  foreground,
  usage = 'normalText',
  enhanced,
}: GetAccessibleColorParams) => {
  if (foreground === 'auto')
    return isAccessibleColor({ background, foreground: 'white', usage, enhanced })
      ? 'rgb(255,255,255)'
      : 'rgb(0,0,0)';

  const { r, g, b } = rgb(background);
  const rLuminance = (r / 255) ** 2.2;
  const gLuminance = (g / 255) ** 2.2;
  const bLuminance = (b / 255) ** 2.2;

  // sRGB constants
  const colorLuminance = 0.2126 * rLuminance + 0.7151 * gLuminance + 0.0721 * bLuminance;

  // Contrast ratios with white and black
  const whiteContrast = contrastRatio(colorLuminance, 1); // White luminance = 1
  const blackContrast = contrastRatio(colorLuminance, 0); // Black luminance = 0

  // Return the color with higher contrast
  return whiteContrast >= blackContrast ? '#ffffff' : '#000000';
};
