import React, { forwardRef, memo } from 'react';

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
  maskId?: string;
};

/**
 * @deprecated Use AreaChart instead.
 */
export const SparklineArea = memo(
  forwardRef<SVGPathElement | null, SparklineAreaBaseProps>(
    ({ area, patternId, maskId }: SparklineAreaBaseProps, ref) => {
      return (
        <path
          ref={ref}
          d={area}
          fill={`url(#${patternId})`}
          mask={maskId ? `url(#${maskId})` : undefined}
        />
      );
    },
  ),
);
