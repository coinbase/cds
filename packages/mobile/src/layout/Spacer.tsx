import React, { memo, useMemo } from 'react';
import { Animated, View } from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { FlexStyles } from '@coinbase/cds-common/types/BoxBaseProps';
import type { FixedValue } from '@coinbase/cds-common/types/DimensionStyles';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

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
  style,
  ...viewProps
}: SpacerProps) {
  const theme = useTheme();
  const Component = animated ? Animated.View : View;
  const styles = useMemo(
    () =>
      [
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
        }) as ViewStyle,
        style,
      ] as StyleProp<ViewStyle>,
    [
      flexGrow,
      flexShrink,
      flexBasis,
      horizontal,
      vertical,
      maxHorizontal,
      maxVertical,
      minHorizontal,
      minVertical,
      theme.space,
      style,
    ],
  );

  return <Component accessibilityRole="none" style={styles} {...viewProps} />;
});
