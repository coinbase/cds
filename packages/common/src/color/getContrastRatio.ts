import { getLuminance } from './getLuminance';
/**
 * The Web Content Accessibility Guidelines (WCAG) include convenient quantitative recommendations for making text and graphics accessible based on the minimum acceptable contrast of foreground against background.
 * For example, black on yellow has a high contrast ratio (19.56) and therefore should be easier to read, whereas blue on blue is low contrast (2.31) and harder to read.
 */
export const getContrastRatio = (background: string, foreground: string) => {
  const backgroundLuminance = getLuminance(background);
  const foregroundLuminance = getLuminance(foreground);
  if (backgroundLuminance === undefined || foregroundLuminance === undefined) return 1;
  return (
    (Math.max(backgroundLuminance, foregroundLuminance) + 0.05) /
    (Math.min(backgroundLuminance, foregroundLuminance) + 0.05)
  );
};
