import React, { forwardRef, memo } from 'react';
import { borderWidth } from '@coinbase/cds-common/tokens/sparkline';

export type SparklinePathRef = SVGPathElement | null;

export type SparklinePathBaseProps = {
  /** The svg string path that is generate via useSparklinePath */
  path?: string;
  /** Color of the stroke for the path. */
  stroke: string;
};

export const SparklinePath = memo(
  forwardRef<SparklinePathRef, SparklinePathBaseProps>(({ path, stroke }, forwardedRef) => {
    return (
      <path
        ref={forwardedRef}
        d={path}
        fill="transparent"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={borderWidth}
      />
    );
  }),
);

SparklinePath.displayName = 'SparklinePath';
