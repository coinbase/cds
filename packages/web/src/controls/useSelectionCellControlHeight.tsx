import { useTheme } from '../hooks/useTheme';

/**
 * Returns the height of the selection cell control based on the theme's headline line height and font size
 * @returns The height of the selection cell control
 */
export const useSelectionCellControlHeight = () => {
  const { lineHeight, fontSize } = useTheme();
  const headlineLineHeight = lineHeight.headline;

  if (typeof headlineLineHeight === 'string' && headlineLineHeight.endsWith('%')) {
    // If the line height is a percentage, we need to convert it to a number by timing it to the font size
    const headlineFontSize = fontSize.headline;
    // convert the percentage string to a number
    const headlineLineHeightNumber = Number(headlineLineHeight.replace('%', '')) / 100;
    if (typeof headlineFontSize === 'number') {
      // multiply the font size by the line height percentage
      return headlineFontSize * headlineLineHeightNumber;
    } else if (headlineFontSize.endsWith('rem')) {
      // if font size is a rem, we need to convert it to a number by multiplying it by 16
      const headlineFontSizeNumber = Number(headlineFontSize.replace('rem', '')) * 16;
      return headlineFontSizeNumber * headlineLineHeightNumber;
    } else if (headlineFontSize.endsWith('px')) {
      // if font size is a px, we need to convert it to a number
      const headlineFontSizeNumber = Number(headlineFontSize.replace('px', ''));
      return headlineFontSizeNumber * headlineLineHeightNumber;
    } else {
      // fall to 24 in all other cases
      return headlineLineHeightNumber * 24;
    }
  }

  return headlineLineHeight;
};
