import React, { forwardRef, memo } from 'react';
import { Path } from 'react-native-svg';

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
};

export const SparklineArea = memo(
  forwardRef<Path | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <Path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
