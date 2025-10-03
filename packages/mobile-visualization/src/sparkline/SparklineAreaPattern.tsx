import React from 'react';
import { Circle, G, Pattern, Rect } from 'react-native-svg';
import { useSparklineAreaOpacity } from '@coinbase/cds-common/visualizations/useSparklineAreaOpacity';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

export type SparklineAreaPatternBaseProps = {
  color: string;
  id: string;
  /**
   * Opacity for the pattern. If not provided, uses theme-based opacity from useSparklineAreaOpacity.
   */
  opacity?: number;
};

export const SparklineAreaPattern = ({ color, id, opacity }: SparklineAreaPatternBaseProps) => {
  const { activeColorScheme } = useTheme();
  const themeOpacity = useSparklineAreaOpacity(activeColorScheme);
  const fillOpacity = opacity ?? themeOpacity;

  return (
    <Pattern height="4" id={id} patternUnits="userSpaceOnUse" width="4" x="0" y="0">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" fill={color} fillOpacity={fillOpacity} r="1" />
      </G>
    </Pattern>
  );
};
