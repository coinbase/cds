import type { ViewStyle } from 'react-native';
import { getBlendedColor } from '@coinbase/cds-common/color/getBlendedColor';
import {
  accessibleOpacityDisabled,
  opacityPressed,
} from '@coinbase/cds-common/tokens/interactable';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';

import { type Theme } from '../core/theme';

export type InteractableStyles = {
  staticStyles: ViewStyle;
  pressedStyles: ViewStyle;
  disabledStyles: ViewStyle;
  contentStyles: {
    pressed: ViewStyle;
    disabled: ViewStyle;
  };
};

export type GetInteractableStylesParams = {
  theme: Theme;
  background: string;
  pressedBackground?: string;
  disabledBackground?: string;
  borderColor: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  elevation?: ElevationLevels;
};

export const getInteractableStyles = ({
  theme,
  background,
  pressedBackground,
  disabledBackground,
  borderColor,
  pressedBorderColor,
  disabledBorderColor,
}: GetInteractableStylesParams) => {
  /**
   * Apply an interactive background style. Blend the color with the background or backgroundInverse values
   */
  const wrapperStyles = {
    base: {
      backgroundColor: background,
      borderColor: borderColor,
    },
    pressed: {
      backgroundColor: getBlendedColor({
        overlayColor: pressedBackground ?? background,
        blendOpacity: opacityPressed,
        colorScheme: theme.activeColorScheme,
      }),
      borderColor: getBlendedColor({
        overlayColor: pressedBorderColor ?? borderColor,
        blendOpacity: opacityPressed,
        colorScheme: theme.activeColorScheme,
      }),
    },
    disabled: {
      backgroundColor: getBlendedColor({
        overlayColor: disabledBackground ?? background,
        blendOpacity: accessibleOpacityDisabled,
        colorScheme: theme.activeColorScheme,
        skipContrastOptimization: true,
      }),
      borderColor: getBlendedColor({
        overlayColor: disabledBorderColor ?? borderColor,
        blendOpacity: accessibleOpacityDisabled,
        colorScheme: theme.activeColorScheme,
        skipContrastOptimization: true,
      }),
    },
  };

  const contentStyles = {
    pressed: {
      opacity: opacityPressed,
    },
    disabled: {
      opacity: accessibleOpacityDisabled,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
};
