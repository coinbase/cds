import { useEffect, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';

import { useInputBorderAnimation } from './useInputBorderAnimation';
import { useTheme } from './useTheme';

/**
 * Hook for managing input border styles with animation support.
 *
 * @param focused - Whether the input is currently focused
 * @param initialVariant - The variant when unfocused
 * @param focusedVariant - The variant when focused
 * @param bordered - Whether to show a border when unfocused
 * @param borderWidth - Width of the border (theme token). @default 100
 * @param focusedBorderWidth - Additional border width when focused (theme token). @default borderWidth
 */
export const useInputBorderStyle = (
  focused: boolean,
  initialVariant: InputVariant,
  focusedVariant: InputVariant,
  bordered = true,
  borderWidth: ThemeVars.BorderWidth = bordered ? 100 : 0,
  focusedBorderWidth: ThemeVars.BorderWidth = borderWidth,
) => {
  const theme = useTheme();

  const resolvedBorderWidth = theme.borderWidth[borderWidth];
  const resolvedFocusedBorderWidth = theme.borderWidth[focusedBorderWidth];
  const totalFocusBorderWidth = resolvedBorderWidth + resolvedFocusedBorderWidth;

  const {
    animateInputBorderIn,
    animateInputBorderOut,
    focusedBorderRgba,
    unFocusedBorderRgba,
    focusedBorderOpacity,
  } = useInputBorderAnimation(initialVariant, focusedVariant);

  /** Border style for when input is not focused */
  const borderUnfocusedStyle = useMemo(() => {
    return {
      borderColor: focused
        ? focusedBorderRgba
        : initialVariant === 'secondary'
          ? 'transparent'
          : unFocusedBorderRgba,
      borderWidth: resolvedBorderWidth,
    };
  }, [focused, focusedBorderRgba, initialVariant, unFocusedBorderRgba, resolvedBorderWidth]);

  /** Border style for when input is focused (overlay) */
  const borderFocusedStyle = useMemo(() => {
    return {
      opacity: focusedBorderOpacity,
      borderColor: focusedBorderRgba,
      borderWidth: totalFocusBorderWidth,
    };
  }, [focusedBorderOpacity, focusedBorderRgba, totalFocusBorderWidth]);

  useEffect(() => {
    if (focused) {
      animateInputBorderOut.stop();
      animateInputBorderIn.start();
    } else {
      animateInputBorderIn.stop();
      animateInputBorderOut.start();
    }
  }, [animateInputBorderIn, animateInputBorderOut, focused]);

  return useMemo(() => {
    return {
      borderUnfocusedStyle,
      borderFocusedStyle,
    };
  }, [borderUnfocusedStyle, borderFocusedStyle]);
};
