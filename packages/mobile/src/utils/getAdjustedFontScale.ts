import type { TextStyle } from 'react-native';

export function getAdjustedFontScale<T extends TextStyle>(
  { fontSize, lineHeight }: T,
  length: number,
  maxLength: number,
): Pick<T, 'fontSize' | 'lineHeight'> {
  // For text with length up to maxLength, set ratio to 1.
  // For text longer than maxLength, scale based on the the text length.
  const ratio = length <= maxLength ? 1 : maxLength / length;

  return {
    fontSize: fontSize !== undefined ? fontSize * ratio : undefined,
    lineHeight: lineHeight !== undefined ? lineHeight * ratio : undefined,
  };
}
