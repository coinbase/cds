import React from 'react';
import { Circle, G, Pattern, Rect } from 'react-native-svg';
import { useSparklineAreaOpacity } from '@cbhq/cds-common/visualizations/useSparklineAreaOpacity';
import { useTheme } from '@cbhq/cds-mobile/hooks/useTheme';

export type SparklineAreaPatternBaseProps = {
  color: string;
  id: string;
};

export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const { activeColorScheme } = useTheme();
  const fillOpacity = useSparklineAreaOpacity(activeColorScheme);
  return (
    <Pattern height="4" id={id} patternUnits="userSpaceOnUse" width="4" x="0" y="0">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" fill={color} fillOpacity={fillOpacity} r="1" />
      </G>
    </Pattern>
  );
};
