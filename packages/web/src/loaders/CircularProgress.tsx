import React, { memo, useEffect, useState } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

export type CircularProgressProps = {
  /** Radius of circular progress */
  radius: number;
  /** Stroke width of circular progress */
  strokeWidth: number;
  /**
   * For determinate variant, you can specify the exact moment to pause the circular progress at
   */
  progress: number;
  /**
   *  A boolean flag indicating whether the circular progress is
   *  in indeterminate or determinate states.
   *  Indeterminate (true) - indicators visualize an unspecified wait time
   *  Determinate (false) - indicators display how long an operation will take.
   *  @default true
   */
  indeterminate?: boolean;
} & SharedProps;

export const CircularProgress = memo(
  ({ radius, strokeWidth, progress, indeterminate = true, testID }: CircularProgressProps) => {
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const [internalProgress, setProgress] = useState(indeterminate ? 0 : progress);
    const [direction, setDirection] = useState('forward');

    // Used for calculating the position of the circular progress based on
    // the progress
    const strokeDashoffset =
      circumference - ((indeterminate ? internalProgress : progress) / 100) * circumference;

    useEffect(() => {
      if (indeterminate) {
        // Toggle between circular progress going forward and backward
        // to create a less abrupt animation experience
        const timer = setInterval(() => {
          if (internalProgress >= 100) setDirection('backward');
          if (internalProgress <= 0) setDirection('forward');
          setProgress((prog) => (direction === 'forward' ? prog + 1 : prog - 1));
        }, 10);

        return () => {
          clearInterval(timer);
        };
      }
      return undefined;
    }, [indeterminate, internalProgress, direction]);
    return (
      <svg data-testid={testID} height={radius * 2} width={radius * 2}>
        <circle
          cx={radius}
          cy={radius}
          data-testid={`${testID}-circle`}
          fill="transparent"
          r={normalizedRadius}
          stroke="blue"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';
