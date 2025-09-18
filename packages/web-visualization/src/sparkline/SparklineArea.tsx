import React, { forwardRef, memo } from 'react';

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
};

export const SparklineArea = memo(
  forwardRef<SVGPathElement | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
