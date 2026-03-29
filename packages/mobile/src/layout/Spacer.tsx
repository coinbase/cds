import React, { memo } from 'react';
import { Animated, View } from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { FixedValue, FlexStyles, SharedProps } from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import { getSpacerStyle } from '../utils/getSpacerStyle';

export type SpacerBaseProps = SharedProps &
  Pick<FlexStyles, 'flexGrow' | 'flexShrink' | 'flexBasis'> & {
    /** Padding in the horizontal direction */
    horizontal?: ThemeVars.Space;
    /** Padding in the vertical direction */
    vertical?: ThemeVars.Space;
    /** Max padding in the horizontal direction */
    maxHorizontal?: ThemeVars.Space;
    /** Max padding in the vertical direction */
    maxVertical?: ThemeVars.Space;
    /** Min padding in the horizontal direction */
    minHorizontal?: ThemeVars.Space;
    /** Min padding in the vertical direction */
    minVertical?: ThemeVars.Space;
    animated?: boolean;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  };

export type SpacerProps = SpacerBaseProps & Omit<ViewProps, 'style'>;

/**
 * Spacer component is for adding spacing gap between two dom nodes. If no horizontal or vertical
 * spacing size is provided, Spacer will stretch to fill up available space left in the parent container.
 */
export const Spacer = memo(function Spacer({
  flexGrow,
  flexShrink,
  flexBasis,
  horizontal,
  vertical,
  maxHorizontal,
  maxVertical,
  minHorizontal,
  minVertical,
  animated,
  ...viewProps
}: SpacerProps) {
  const theme = useTheme();
  const Component = animated ? Animated.View : View;

  return (
    <Component
      {...viewProps}
      accessibilityRole="none"
      style={
        getSpacerStyle({
          flexGrow,
          flexShrink,
          flexBasis: flexBasis as FixedValue,
          horizontal,
          vertical,
          maxHorizontal,
          maxVertical,
          minHorizontal,
          minVertical,
          spacingScaleValues: theme.space,
        }) as ViewStyle
      }
    />
  );
});
