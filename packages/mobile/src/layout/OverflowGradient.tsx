import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { PinningDirection } from '@coinbase/cds-common/types/BoxBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { LinearGradient } from '../gradients/LinearGradient';
import { useTheme } from '../hooks/useTheme';
import { pinStyles } from '../styles/pinStyles';

export type OverflowGradientProps = {
  pin?: Exclude<PinningDirection, 'all'>;
  style?: ViewStyle;
} & SharedProps;

const gradient = {
  left: {
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  },
  right: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  bottom: {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  top: {
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
  },
} as const;

export const OverflowGradient = memo(function OverflowGradient({
  pin = 'right',
  style,
  testID,
}: OverflowGradientProps) {
  const theme = useTheme();
  const gradientColors = useMemo(
    () => [
      /* Override background to be transparent bc android can't gradient from 'transparent' string */
      theme.color.transparent, // transparent will always be an rgba string
      theme.color.bg,
    ],
    [theme.color],
  );

  return (
    <LinearGradient
      colors={gradientColors}
      end={gradient[pin].end}
      pointerEvents="none"
      start={gradient[pin].start}
      style={[styles.gradient, pinStyles[pin], style]}
      testID={testID}
    />
  );
});

OverflowGradient.displayName = 'OverflowGradient';

const styles = StyleSheet.create({
  gradient: {
    width: 30,
  },
});
