import { type A11yColorUsage } from '../types/Color';

import { getContrastRatio } from './getContrastRatio';

const contrastRatioMap: Record<string, Record<A11yColorUsage, number>> = {
  minimum: {
    normalText: 4.5,
    largeText: 3,
    graphic: 3,
  },
  enhanced: {
    normalText: 7,
    largeText: 4.5,
    graphic: 3,
  },
};

type AccessibleColorParams = {
  background: string;
  foreground: string;
  usage: A11yColorUsage;
  enhanced?: boolean;
};

/**
 * isAccessibleColor will default to using "minimum" contrast ratios
 * Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
 * 7 - "enhanced" contrast for regular sized text under WCAG 2.0 1.4.6 (Level AAA)
 * 4.5 - minimum contrast for regular sized text under WCAG 2.0 1.4.3 (Level AA)
 * 3 - minimum contrast for "large scale" text (18 pt or 14 pt bold, or larger) under WCAG 2.0 1.4.3 (Level AA)
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export const isAccessibleColor = ({
  background,
  foreground,
  usage,
  enhanced,
}: AccessibleColorParams) => {
  const ratio = getContrastRatio(background, foreground);
  return ratio >= contrastRatioMap[enhanced ? 'enhanced' : 'minimum'][usage];
};
