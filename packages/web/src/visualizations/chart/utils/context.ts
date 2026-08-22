import { createContext, useContext } from 'react';
import type { Rect } from '@coinbase/cds-common/types/Rect';

import type { CartesianAxisConfig } from './axis';
import type { Series } from './chart';
import type { HighlightedItem, HighlightScope } from './highlight';
import type { ChartScaleFunction } from './scale';

/**
 * Chart layout for Cartesian charts.
 * Describes the direction bars/areas grow.
 * - 'vertical': Bars grow vertically (up/down). X is category axis, Y is value axis.
 * - 'horizontal': Bars grow horizontally (left/right). Y is category axis, X is value axis.
 */
export type CartesianChartLayout = 'horizontal' | 'vertical';

export type ChartType = 'cartesian';

export type ChartContextValue = {
  /**
   * Whether to animate the chart.
   */
  animate: boolean;
  /**
   * The chart type.
   */
  type: ChartType;
  /**
   * The series data for the chart.
   */
  series: Series[];
  /**
   * Width of the chart SVG.
   */
  width: number;
  /**
   * Height of the chart SVG.
   */
  height: number;
  /**
   * Drawing area of the chart.
   */
  drawingArea: Rect;
  /**
   * Length of the data domain.
   * This is equal to the length of xAxis.data or the longest series data length
   * This equals the number of possible scrubber positions
   */
  dataLength: number;
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
};

/**
 * Context value for Cartesian (X/Y) coordinate charts.
 * Contains axis-specific methods and properties for rectangular coordinate systems.
 */
export type CartesianChartContextValue = ChartContextValue & {
  /**
   * Chart layout - describes the direction bars/areas grow.
   * @default 'vertical'
   */
  layout: CartesianChartLayout;
  /**
   * Get x-axis configuration by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getXAxis: (id?: string) => CartesianAxisConfig | undefined;
  /**
   * Get y-axis configuration by ID.
   * @param id - The axis ID. Defaults to defaultAxisId.
   */
  getYAxis: (id?: string) => CartesianAxisConfig | undefined;
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
 * Context value for scrubber interaction state and position.
 *
 * @deprecated Use `useHighlightContext` and `HighlightContext`, and enable chart interaction with `enableHighlighting` instead of `enableScrubbing`. This will be removed in a future major release.
 * @deprecationExpectedRemoval v4
 */
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

/**
 * @deprecated Use `HighlightContext` instead. Prefer `useHighlightContext` and `enableHighlighting` over this context and `enableScrubbing`. This will be removed in a future major release.
 * @deprecationExpectedRemoval v4
 */
export const ScrubberContext = createContext<ScrubberContextValue | undefined>(undefined);

/**
 * @deprecated Use `useHighlightContext` instead. Prefer `enableHighlighting` over `enableScrubbing` on charts. This will be removed in a future major release.
 * @deprecationExpectedRemoval v4
 */
export const useScrubberContext = (): ScrubberContextValue => {
  const context = useContext(ScrubberContext);
  if (!context) {
    throw new Error('useScrubberContext must be used within a Chart component');
  }
  return context;
};

/**
 * Context value for chart highlight state.
 */
export type HighlightContextValue = {
  /**
   * Whether highlighting is enabled.
   */
  enabled: boolean;
  /**
   * The highlight scope configuration.
   */
  scope: HighlightScope;
  /**
   * The currently highlighted items.
   */
  highlight: HighlightedItem[];
  /**
   * Set the highlighted items.
   */
  setHighlight: (items: HighlightedItem[]) => void;
  /**
   * Update a highlighted item for a specific pointer.
   */
  updatePointerHighlight: (pointerId: number, item: HighlightedItem) => void;
  /**
   * Remove a specific pointer's entry from highlight state.
   */
  removePointer: (pointerId: number) => void;
};

export const HighlightContext = createContext<HighlightContextValue | undefined>(undefined);

/**
 * Hook to access the highlight context.
 * @throws Error if used outside of a HighlightProvider
 */
export const useHighlightContext = (): HighlightContextValue => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlightContext must be used within a HighlightProvider');
  }
  return context;
};
