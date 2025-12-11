import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import { PiePlot, type PiePlotProps, type PieSeries } from './pie';
import { PolarChart, type PolarChartBaseProps, type PolarChartProps } from './PolarChart';

/**
 * Series type for DonutChart
 */
export type DonutSeries = PieSeries;

export type DonutChartBaseProps = Omit<PolarChartBaseProps, 'series'> &
  Pick<PiePlotProps, 'ArcComponent' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'cornerRadius'> & {
    /**
     * Array of series, where each series represents one slice.
     * Each series must have a single numeric value.
     */
    series?: DonutSeries[];
    /**
     * Inner radius as a ratio of the outer radius (0-1).
     * This sets the default radial axis to: `range: ({ max }) => ({ min: max * innerRadiusRatio, max })`
     *
     * @note if you provide a custom `radialAxis` prop, this will be ignored.
     * @default 0.5
     */
    innerRadiusRatio?: number;
  };

export type DonutChartProps = DonutChartBaseProps & Omit<PolarChartProps, 'series'>;

/**
 * A donut chart component for visualizing proportional data with a hollow center.
 * Each series represents one slice, with its value as a proportion of the total.
 * The hollow center can be used for displaying additional information.
 *
 * @example
 * ```tsx
 * <DonutChart
 *   series={[
 *     { id: 'a', data: 30, label: 'Category A', color: '#5B8DEF' },
 *     { id: 'b', data: 50, label: 'Category B', color: '#4CAF93' },
 *     { id: 'c', data: 20, label: 'Category C', color: '#E67C5C' },
 *   ]}
 *   innerRadiusRatio={0.6}
 *   width={200}
 *   height={200}
 * />
 * ```
 */
export const DonutChart = memo(
  forwardRef<View, DonutChartProps>(
    (
      {
        series,
        children,
        innerRadiusRatio = 0.5,
        ArcComponent,
        fillOpacity,
        stroke,
        strokeWidth,
        cornerRadius,
        radialAxis,
        ...chartProps
      },
      ref,
    ) => {
      const defaultRadialAxis = useMemo(
        () => ({
          range: ({ max }: { min: number; max: number }) => ({
            min: max * innerRadiusRatio,
            max,
          }),
        }),
        [innerRadiusRatio],
      );

      return (
        <PolarChart
          ref={ref}
          {...chartProps}
          radialAxis={radialAxis ?? defaultRadialAxis}
          series={series}
        >
          <PiePlot
            ArcComponent={ArcComponent}
            cornerRadius={cornerRadius}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          {children}
        </PolarChart>
      );
    },
  ),
);
