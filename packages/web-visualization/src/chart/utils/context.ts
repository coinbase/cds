import { createContext, useContext } from 'react';
import type { Rect } from '@coinbase/cds-common/types';

import type { AngularAxisConfig, CartesianAxisConfig, RadialAxisConfig } from './axis';
import type { CartesianSeries, PolarSeries } from './chart';
import type { ChartScaleFunction } from './scale';

/**
 * Base context value for all chart types.
 */
export type ChartContextValue = {
  /**
   * Whether to animate the chart.
   */
  animate: boolean;
  /**
   * Drawing area of the chart.
   */
  drawingArea: Rect;
  /**
   * Width of the chart SVG.
   */
  width: number;
  /**
   * Height of the chart SVG.
   */
  height: number;
  /**
   * Length of the data domain.
   */
  dataLength: number;
};

/**
 * Context value for Cartesian (X/Y) coordinate charts.
 * Contains axis-specific methods and properties for rectangular coordinate systems.
 */
export type CartesianChartContextValue = ChartContextValue & {
  /**
   * The series data for the chart.
   */
  series: CartesianSeries[];
  /**
   * Returns the series which matches the seriesId or undefined.
   * @param seriesId - A series' id
   */
  getSeries: (seriesId?: string) => CartesianSeries | undefined;
  /**
   * Returns the data for a series
   * @param seriesId - A series' id
   * @returns data for series, if series exists
   */
  getSeriesData: (seriesId?: string) => Array<[number, number] | null> | undefined;
  /**
   * Get x-axis configuration.
   */
  getXAxis: () => CartesianAxisConfig | undefined;
  /**
   * Get y-axis configuration by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getYAxis: (id?: string) => CartesianAxisConfig | undefined;
  /**
   * Get x-axis scale function.
   */
  getXScale: () => ChartScaleFunction | undefined;
  /**
   * Get y-axis scale function by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getYScale: (id?: string) => ChartScaleFunction | undefined;
  /**
   * Registers an axis.
   * Used by axis components to reserve space in the chart, preventing overlap with the drawing area.
   * @param id - The axis ID
   * @param position - The axis position ('top'/'bottom' for x-axis, 'left'/'right' for y-axis)
   * @param size - The size of the axis in pixels
   */
  registerAxis: (id: string, position: 'top' | 'bottom' | 'left' | 'right', size: number) => void;
  /**
   * Unregisters an axis.
   */
  unregisterAxis: (id: string) => void;
  /**
   * Gets the rectangle bounds of a requested axis.
   * Computes the bounds of the axis based on the chart's drawing area chart/axis config, and axis position.
   */
  getAxisBounds: (id: string) => Rect | undefined;
};

/**
 * Context value for Polar (Angular/Radial) coordinate charts.
 * Contains axis-specific methods and properties for polar coordinate systems.
 */
export type PolarChartContextValue = ChartContextValue & {
  /**
   * The series data for the chart.
   */
  series: PolarSeries[];
  /**
   * Returns the series which matches the seriesId or undefined.
   * @param seriesId - A series' id
   */
  getSeries: (seriesId?: string) => PolarSeries | undefined;
  /**
   * Returns the data for a series.
   * @param seriesId - A series' id
   * @returns data for series, if series exists
   */
  getSeriesData: (seriesId?: string) => number | Array<number | null> | undefined;
  /**
   * Outer radius of the polar chart in pixels.
   */
  outerRadius: number;
  /**
   * Returns the angular axis configuration by ID.
   * If no ID is provided, returns the default angular axis.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getAngularAxis: (id?: string) => AngularAxisConfig | undefined;
  /**
   * Returns the radial axis configuration by ID.
   * If no ID is provided, returns the default radial axis.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getRadialAxis: (id?: string) => RadialAxisConfig | undefined;
  /**
   * Get angular axis scale function by ID.
   * Maps data indices/values to angles in radians.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getAngularScale: (id?: string) => ChartScaleFunction | undefined;
  /**
   * Get radial axis scale function by ID.
   * Maps data values to pixel distances from center.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getRadialScale: (id?: string) => ChartScaleFunction | undefined;
};

export type ScrubberContextValue = {
  /**
   * Enables scrubbing interactions.
   * When true, allows scrubbing and makes scrubber components interactive.
   */
  enableScrubbing: boolean;
  /**
   * The current position of the scrubber.
   */
  scrubberPosition?: number;
  /**
   * Callback fired when the scrubber position changes.
   * Receives the dataIndex of the scrubber or undefined when not scrubbing.
   */
  onScrubberPositionChange: (index: number | undefined) => void;
};

export const ScrubberContext = createContext<ScrubberContextValue | undefined>(undefined);

export const useScrubberContext = (): ScrubberContextValue => {
  const context = useContext(ScrubberContext);
  if (!context) {
    throw new Error('useScrubberContext must be used within a Chart component');
  }
  return context;
};
