import { useEffect, useMemo } from 'react';
import { inputBorderWidth } from '@cbhq/cds-common/tokens/input';
import type { InputVariant } from '@cbhq/cds-common/types/InputBaseProps';

import { useInputBorderAnimation } from './useInputBorderAnimation';

/**
 *
 * @param focused
 * @param initialVariant
 * @param focusedVariant
 * @param bordered
 */
export const useInputBorderStyle = (
  focused: boolean,
  initialVariant: InputVariant,
  focusedVariant: InputVariant,
  bordered = true,
) => {
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
      borderWidth: bordered ? inputBorderWidth : 0,
    };
  }, [focused, focusedBorderRgba, initialVariant, unFocusedBorderRgba, bordered]);

  /** Border style for when input is focused */
  const borderFocusedStyle = useMemo(() => {
    return {
      opacity: focusedBorderOpacity,
      borderColor: focusedBorderRgba,
      borderWidth: bordered ? inputBorderWidth : 0,
    };
  }, [focusedBorderOpacity, focusedBorderRgba, bordered]);

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
