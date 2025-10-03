import { memo, useId } from 'react';
import { Circle, Defs, G, LinearGradient, Mask, Pattern, Stop } from 'react-native-svg';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
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
  };

export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    ...pathProps
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();
    const patternId = useId();
    const gradientId = useId();
    const maskId = useId();

    const dotCenterPosition = patternSize / 2;

    // Get the y-scale for the specified axis (or default)
    const yScale = context.getYScale(yAxisId);
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

      if (useUserSpaceUnits && yRange) {
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

    const gradientY1 = useUserSpaceUnits && yRange ? String(yRange[1]) : '0%';
    const gradientY2 = useUserSpaceUnits && yRange ? String(yRange[0]) : '100%';

    const effectiveFill = fill ?? theme.color.fgPrimary;

    return (
      <G>
        <Defs>
          <Pattern
            height={patternSize}
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={patternSize}
            x="0"
            y="0"
          >
            <Circle
              cx={dotCenterPosition}
              cy={dotCenterPosition}
              fill={effectiveFill}
              r={dotSize}
            />
          </Pattern>
          <LinearGradient
            gradientUnits={useUserSpaceUnits ? 'userSpaceOnUse' : 'objectBoundingBox'}
            id={gradientId}
            x1={useUserSpaceUnits ? '0' : '0%'}
            x2={useUserSpaceUnits ? '0' : '0%'}
            y1={gradientY1}
            y2={gradientY2}
          >
            {baselinePosition !== undefined || baselinePercentage !== undefined
              ? /* Diverging gradient: high opacity at extremes, low at baseline */
                [
                  <Stop key="0" offset="0%" stopColor="white" stopOpacity={peakOpacity} />,
                  <Stop
                    key="1"
                    offset={
                      baselinePercentage ??
                      `${((baselinePosition! - yRange![1]) / (yRange![0] - yRange![1])) * 100}%`
                    }
                    stopColor="white"
                    stopOpacity={baselineOpacity}
                  />,
                  <Stop key="2" offset="100%" stopColor="white" stopOpacity={peakOpacity} />,
                ]
              : /* Simple gradient from top to bottom */
                [
                  <Stop key="0" offset="0%" stopColor="white" stopOpacity={peakOpacity} />,
                  <Stop key="1" offset="100%" stopColor="white" stopOpacity={baselineOpacity} />,
                ]}
          </LinearGradient>
          <Mask id={maskId}>
            <Path d={d} fill={`url(#${gradientId})`} />
          </Mask>
        </Defs>
        <Path
          clipRect={clipRect}
          d={d}
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
          {...pathProps}
        />
      </G>
    );
  },
);
