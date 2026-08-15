/**
 * Controls what aspects of the data can be highlighted.
 */
export type HighlightScope = {
  /**
   * Whether highlighting tracks data index.
   * @default true
   */
  dataIndex?: boolean;
  /**
   * Whether highlighting tracks specific series.
   */
  series?: boolean;
};

/**
 * Default highlight scope for cartesian charts.
 * Highlights by data index, not by series.
 */
export const defaultCartesianChartHighlightScope: HighlightScope = {
  dataIndex: true,
  series: false,
};

/**
 * Represents a single highlighted item during interaction.
 * - `null` values mean the user is interacting but not over a specific item/series
 */
export type HighlightedItem = {
  /**
   * The data index being highlighted.
   * `null` when interacting but not over a data point.
   * `undefined` when data index is not enabled in scope.
   */
  dataIndex?: number | null;
  /**
   * The series ID being highlighted.
   * `null` when series scope is disabled or not over a specific series.
   * `undefined` when series is not enabled in scope.
   */
  seriesId?: string | null;
};
