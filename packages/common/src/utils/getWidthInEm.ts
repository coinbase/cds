/**
 * Returns the width of an element in em units by dividing its computed width by font-size.
 * Useful for animating width across font-size changes without hardcoding pixels.
 */
export const getWidthInEm = (element: HTMLElement): string => {
  const { width, fontSize } = getComputedStyle(element);
  const widthPx = parseFloat(width);
  const fontSizePx = parseFloat(fontSize);
  return `${widthPx / fontSizePx}em`;
};
