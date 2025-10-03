import React, { forwardRef, memo } from 'react';
import { Path } from 'react-native-svg';

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
  maskId?: string;
};

/**
 * @deprecated Use AreaChart instead.
 */
export const SparklineArea = memo(
  forwardRef<Path | null, SparklineAreaBaseProps>(
    ({ area, patternId, maskId }: SparklineAreaBaseProps, ref) => {
      return (
        <Path
          ref={ref}
          d={area}
          fill={`url(#${patternId})`}
          mask={maskId ? `url(#${maskId})` : undefined}
        />
      );
    },
  ),
);
