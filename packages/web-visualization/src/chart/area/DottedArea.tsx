import React, { memo, useRef } from 'react';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { generateRandomId } from '@coinbase/cds-utils';

import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity' | 'clipRect'> &
  Omit<AreaComponentProps, 'clipRect'> & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity at the peak values (top/bottom of gradient).
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * ID of the y-axis to use for gradient range.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the pattern element.
       */
      pattern?: string;
      /**
       * Custom class name for the area path element.
       */
      path?: string;
    };
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the pattern element.
       */
      pattern?: React.CSSProperties;
      /**
       * Custom styles for the area path element.
       */
      path?: React.CSSProperties;
    };
  };

export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill,
    className,
    style,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    classNames,
    styles,
    animate,
    ...pathProps
  }) => {
    const context = useChartContext();
    const patternIdRef = useRef<string>(generateRandomId());
    const gradientIdRef = useRef<string>(generateRandomId());
    const maskIdRef = useRef<string>(generateRandomId());

    const dotCenterPosition = patternSize / 2;

    // Get the y-scale for the specified axis (or default)
    const yScale = context.getYScale?.(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();

    // Use chart range if available, otherwise fall back to percentage
    const useUserSpaceUnits = yRange !== undefined;

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

    const gradientY1 = useUserSpaceUnits ? yRange![1] : '0%';
    const gradientY2 = useUserSpaceUnits ? yRange![0] : '100%';

    return (
      <g className={className ?? classNames?.root} style={style ?? styles?.root}>
        <defs>
          <pattern
            className={classNames?.pattern}
            height={patternSize}
            id={patternIdRef.current}
            patternUnits="userSpaceOnUse"
            style={styles?.pattern}
            width={patternSize}
            x="0"
            y="0"
          >
            <circle cx={dotCenterPosition} cy={dotCenterPosition} fill={fill} r={dotSize} />
          </pattern>
          <linearGradient
            gradientUnits={useUserSpaceUnits ? 'userSpaceOnUse' : 'objectBoundingBox'}
            id={gradientIdRef.current}
            x1={useUserSpaceUnits ? 0 : '0%'}
            x2={useUserSpaceUnits ? 0 : '0%'}
            y1={gradientY1}
            y2={gradientY2}
          >
            {baselinePosition !== undefined || baselinePercentage !== undefined ? (
              <>
                {/* Diverging gradient: high opacity at extremes, low at baseline */}
                <stop offset="0%" stopColor="white" stopOpacity={peakOpacity} />
                <stop
                  offset={
                    baselinePercentage ??
                    `${((baselinePosition! - yRange![1]) / (yRange![0] - yRange![1])) * 100}%`
                  }
                  stopColor="white"
                  stopOpacity={baselineOpacity}
                />
                <stop offset="100%" stopColor="white" stopOpacity={peakOpacity} />
              </>
            ) : (
              <>
                {/* Simple gradient from top to bottom */}
                <stop offset="0%" stopColor="white" stopOpacity={peakOpacity} />
                <stop offset="100%" stopColor="white" stopOpacity={baselineOpacity} />
              </>
            )}
          </linearGradient>
          <mask id={maskIdRef.current}>
            <Path animate={animate} d={d} fill={`url(#${gradientIdRef.current})`} />
          </mask>
        </defs>
        <Path
          animate={animate}
          className={classNames?.path}
          d={d}
          fill={`url(#${patternIdRef.current})`}
          mask={`url(#${maskIdRef.current})`}
          style={styles?.path}
          {...pathProps}
        />
      </g>
    );
  },
);
