import { createContext, useContext } from 'react';

import type { Rect } from '../../types';

import type { AxisConfig } from './axis';
import type { Series } from './chart';
import type { ChartScaleFunction } from './scale';

export type ChartContextValue = {
  /**
   * The series data for the chart.
   */
  series: Series[];
  /**
   * Returns the series which matches the seriesId or undefined.
   * @param seriesId - A series' id
   */
  getSeries: (seriesId?: string) => Series | undefined;
  /**
   * Returns the data for a series
   * @param seriesId - A series' id
   * @returns data for series, if series exists
   */
  getSeriesData: (seriesId?: string) => Array<[number, number] | null> | undefined;
  /**
   * Whether to animate the chart.
   */
  animate: boolean;
  /**
   * Width of the chart SVG.
   */
  width: number;
  /**
   * Height of the chart SVG.
   */
  height: number;
  /**
   * Get x-axis configuration by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getXAxis: (id?: string) => AxisConfig | undefined;
  /**
   * Get y-axis configuration by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getYAxis: (id?: string) => AxisConfig | undefined;
  /**
   * Get x-axis scale function by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getXScale: (id?: string) => ChartScaleFunction | undefined;
  /**
   * Get y-axis scale function by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getYScale: (id?: string) => ChartScaleFunction | undefined;
};

export const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export const useChartContext = (): ChartContextValue => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a Chart component');
  }
  return context;
};

export type RegisteredAxis = {
  id: string;
  type: 'x' | 'y';
  position: 'start' | 'end';
  size: number;
};

export type ChartDrawingAreaContextValue = {
  /**
   * Drawing area of the chart.
   */
  drawingArea: Rect;
  /**
   * Register an axis. Used by axis components to register space to prevent overlap with drawing area.
   */
  registerAxis: (id: string, type: 'x' | 'y', position: 'start' | 'end', size: number) => void;
  /**
   * Unregister an axis.
   */
  unregisterAxis: (id: string) => void;
  /**
   * Get the bounds of an axis.
   */
  getAxisBounds: (id: string) => Rect | undefined;
};

export const ChartDrawingAreaContext = createContext<ChartDrawingAreaContextValue | undefined>(
  undefined,
);

export const useChartDrawingAreaContext = (): ChartDrawingAreaContextValue => {
  const context = useContext(ChartDrawingAreaContext);
  if (!context) {
    throw new Error('useChartDrawingAreaContext must be used within a Chart component');
  }
  return context;
};

// Chart highlighting context
export type ScrubberContextValue = {
  /** Whether scrubbing is enabled on the parent Chart component */
  scrubbingEnabled: boolean;
  /** The currently highlighted data index, or undefined if nothing is highlighted */
  highlightedIndex?: number;
  /** Update the highlighted data index */
  updateHighlightedIndex: (index: number | undefined) => void;
};

export const ScrubberContext = createContext<ScrubberContextValue | undefined>(undefined);

export const useScrubberContext = (): ScrubberContextValue => {
  const context = useContext(ScrubberContext);
  if (!context) {
    throw new Error('useScrubberContext must be used within a Chart component');
  }
  return context;
};
