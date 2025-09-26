import React, { memo, useRef } from 'react';
import { generateRandomId } from '@coinbase/cds-utils';

import { useChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color at peak values (top/bottom of gradient).
     * @default fill or 'var(--color-fgPrimary)'
     */
    peakColor?: string;
    /**
     * The color at the baseline (0 or edge closest to 0).
     * @default peakColor or fill
     */
    baselineColor?: string;
    /**
     * Opacity at peak values.
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * A customizable gradient area component which uses Path.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    peakColor,
    baselineColor,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    ...pathProps
  }) => {
    const context = useChartContext();
    const patternIdRef = useRef<string>(generateRandomId());

    // Get the y-scale for the specified axis (or default)
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();

    // Use chart range if available, otherwise fall back to percentage
    const useUserSpaceUnits = yRange !== undefined;
    const gradientY1 = useUserSpaceUnits ? yRange[1] : '0%';
    const gradientY2 = useUserSpaceUnits ? yRange[0] : '100%';

    // Auto-calculate baseline position based on domain
    let baselinePosition: number | undefined;
    let baselinePercentage: string | undefined;

    if (yScale && yDomain) {
      const [minValue, maxValue] = yDomain;

      let dataBaseline: number;
      if (minValue >= 0) {
        // All positive: baseline at min
        dataBaseline = minValue;
      } else if (maxValue <= 0) {
        // All negative: baseline at max
        dataBaseline = maxValue;
      } else {
        // Crosses zero: baseline at 0
        dataBaseline = 0;
      }

      if (useUserSpaceUnits) {
        // Get the actual y coordinate for the baseline
        const scaledValue = yScale(baseline ?? dataBaseline);
        if (typeof scaledValue === 'number') {
          baselinePosition = scaledValue;
        }
      } else {
        // Calculate percentage position
        baselinePercentage = `${((maxValue - (baseline ?? dataBaseline)) / (maxValue - minValue)) * 100}%`;
      }
    }

    const effectivePeakColor = peakColor ?? fill;
    const effectiveBaselineColor = baselineColor ?? fill;

    return (
      <>
        <defs>
          <linearGradient
            gradientUnits={useUserSpaceUnits ? 'userSpaceOnUse' : 'objectBoundingBox'}
            id={patternIdRef.current}
            x1={useUserSpaceUnits ? 0 : '0%'}
            x2={useUserSpaceUnits ? 0 : '0%'}
            y1={gradientY1}
            y2={gradientY2}
          >
            {baselinePosition !== undefined || baselinePercentage !== undefined ? (
              <>
                {/* Diverging gradient: peak opacity at extremes, baseline opacity at baseline */}
                <stop offset="0%" stopColor={effectivePeakColor} stopOpacity={peakOpacity} />
                <stop
                  offset={
                    baselinePercentage ??
                    `${((baselinePosition! - yRange![1]) / (yRange![0] - yRange![1])) * 100}%`
                  }
                  stopColor={effectiveBaselineColor}
                  stopOpacity={baselineOpacity}
                />
                <stop offset="100%" stopColor={effectivePeakColor} stopOpacity={peakOpacity} />
              </>
            ) : (
              <>
                {/* Simple gradient from peak to baseline */}
                <stop offset="0%" stopColor={effectivePeakColor} stopOpacity={peakOpacity} />
                <stop
                  offset="100%"
                  stopColor={effectiveBaselineColor}
                  stopOpacity={baselineOpacity}
                />
              </>
            )}
          </linearGradient>
        </defs>
        <Path d={d} fill={`url(#${patternIdRef.current})`} {...pathProps} />
      </>
    );
  },
);
