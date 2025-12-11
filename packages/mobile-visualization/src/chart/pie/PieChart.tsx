import { forwardRef, memo } from 'react';
import type { View } from 'react-native';

import { PolarChart, type PolarChartBaseProps, type PolarChartProps } from '../PolarChart';
import type { PolarSeries } from '../utils';

import { PiePlot, type PiePlotProps } from './PiePlot';

/**
 * Series type for PieChart - enforces single number data values.
 */
export type PieSeries = Omit<PolarSeries, 'data'> & {
  /**
   * Single numeric value for this slice.
   */
  data: number;
};

export type PieChartBaseProps = Omit<PolarChartBaseProps, 'series'> &
  Pick<PiePlotProps, 'ArcComponent' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'cornerRadius'> & {
    /**
     * Array of series, where each series represents one slice.
     * Each series must have a single numeric value.
     */
    series?: PieSeries[];
  };

export type PieChartProps = PieChartBaseProps & Omit<PolarChartProps, 'series'>;

/**
 * A pie chart component for visualizing proportional data.
 * Each series represents one slice, with its value as a proportion of the total.
 *
 * By default, uses the full radius (radialAxis: { range: { min: 0, max: [radius in pixels] } }).
 *
 * @example
 * ```tsx
 * <PieChart
 *   series={[
 *     { id: 'a', data: 30, label: 'Category A', color: theme.color.fgNegative },
 *     { id: 'b', data: 50, label: 'Category B', color: theme.color.fgPositive },
 *   ]}
 *   width={200}
 *   height={200}
 * />
 * ```
 */
export const PieChart = memo(
  forwardRef<View, PieChartProps>(
    (
      {
        series = [],
        children,
        ArcComponent,
        fillOpacity,
        stroke,
        strokeWidth,
        cornerRadius,
        ...chartProps
      },
      ref,
    ) => {
      return (
        <PolarChart ref={ref} {...chartProps} series={series}>
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
