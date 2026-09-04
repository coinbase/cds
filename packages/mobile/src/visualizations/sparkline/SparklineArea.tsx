import React, { memo } from 'react';
import { Path } from 'react-native-svg';

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
  maskId?: string;
};

/**
 * @deprecated Use AreaChart instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v4
 */
export const SparklineArea = memo(
  ({
    ref,
    area,
    patternId,
    maskId,
  }: SparklineAreaBaseProps & {
    ref?: React.Ref<Path | null>;
  }) => {
    return (
      <Path
        ref={ref}
        d={area}
        fill={`url(#${patternId})`}
        mask={maskId ? `url(#${maskId})` : undefined}
      />
    );
  },
);
