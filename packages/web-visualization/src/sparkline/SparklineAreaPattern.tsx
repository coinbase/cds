import React from 'react';
import { useSparklineAreaOpacity } from '@cbhq/cds-common/visualizations/useSparklineAreaOpacity';
import { useTheme } from '@cbhq/cds-web/hooks/useTheme';

export type SparklineAreaPatternBaseProps = {
  color: string;
  id: string;
};

export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const { activeColorScheme } = useTheme();
  const fillOpacity = useSparklineAreaOpacity(activeColorScheme);
  return (
    <pattern height="4" id={id} patternUnits="userSpaceOnUse" width="4" x="0" y="0">
      <g>
        <rect fill="transparent" height="4" width="4" />
        <circle cx="1" cy="1" fill={color} fillOpacity={fillOpacity} r="1" />
      </g>
    </pattern>
  );
};
