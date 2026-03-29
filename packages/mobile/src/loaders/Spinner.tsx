import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import type { ActivityIndicatorProps } from 'react-native';

import { useTheme } from '../hooks/useTheme';

/**
 * @deprecated Use indeterminate ProgressCircle or ActivityIndicator component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const Spinner = memo(function Spinner({
  size = 'small',
  animating,
  accessibilityLabel = 'Loading',
  ...props
}: ActivityIndicatorProps) {
  const theme = useTheme();
  const color = theme.color.bgPrimary;

  return (
    <ActivityIndicator
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityLiveRegion="polite"
      animating={animating}
      color={color}
      size={size}
      {...props}
    />
  );
});
