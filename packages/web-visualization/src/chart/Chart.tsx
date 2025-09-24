import React, {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import {
  type AxisConfig,
  type AxisConfigProps,
  ChartContext,
  type ChartContextValue,
  ChartDrawingAreaContext,
  type ChartDrawingAreaContextValue,
  type ChartPadding,
  type ChartScaleFunction,
  defaultAxisId,
  defaultChartPadding,
  getAxisConfig,
  getAxisDomain,
  getAxisRange,
  getAxisScale,
  getPadding,
  getStackedSeriesData as calculateStackedSeriesData,
  isCategoricalScale,
  type RegisteredAxis,
  type Series,
} from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Box, type BoxBaseProps, type BoxProps } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

const focusStylesCss = css`
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

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

export type ChartBaseProps = BoxBaseProps & {
  /**
   * Configuration objects that define how to visualize the data.
   * Each series contains its own data array.
   */
  series?: Array<Series>;
  /**
   * Whether to animate the chart.
   * @default true
   */
  animate?: boolean;
  /**
   * Enables scrubbing interactions (mouse and keyboard highlighting).
   * When true, allows highlighting and makes scrubber components interactive.
   * @default false
   */
  enableScrubbing?: boolean;
  /**
   * Configuration for x-axis(es). Can be a single config or array of configs.
   * If array, first axis becomes default if no id is specified.
   */
  xAxis?: Partial<AxisConfigProps> | Partial<AxisConfigProps>[];
  /**
   * Configuration for y-axis(es). Can be a single config or array of configs.
   * If array, first axis becomes default if no id is specified.
   */
  yAxis?: Partial<AxisConfigProps> | Partial<AxisConfigProps>[];
  /**
   * Padding around the entire chart (outside the axes).
   * This creates space outside of axes rather than between axes and the drawing area.
   */
  padding?: number | Partial<ChartPadding>;
  /**
   * Callback fired when the highlighted item changes.
   * Receives the dataIndex of the highlighted item or null when no item is highlighted.
   */
  onScrubberPosChange?: (dataIndex: number | null) => void;
};

export type ChartProps = Omit<BoxProps<'svg'>, 'padding'> & ChartBaseProps;

export const Chart = memo(
  forwardRef<SVGSVGElement, ChartProps>(
    (
      {
        series,
        animate = true,
        enableScrubbing = false,
        xAxis: xAxisConfigInput,
        yAxis: yAxisConfigInput,
        padding: paddingInput,
        onScrubberPosChange,
        children,
        width = '100%',
        height = '100%',
        className,
        ...props
      },
      ref,
    ) => {
      const { observe, width: chartWidth, height: chartHeight } = useDimensions();

      const userPadding = useMemo(
        () => getPadding(paddingInput, defaultChartPadding),
        [paddingInput],
      );

      const xAxisConfig = useMemo(() => getAxisConfig('x', xAxisConfigInput), [xAxisConfigInput]);
      const yAxisConfig = useMemo(() => getAxisConfig('y', yAxisConfigInput), [yAxisConfigInput]);

      const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(undefined);
      const [renderedAxes, setRenderedAxes] = useState<Map<string, RegisteredAxis>>(new Map());

      const axisPadding = useMemo(() => {
        const padding = { top: 0, right: 0, bottom: 0, left: 0 };

        renderedAxes.forEach((axis) => {
          if (axis.type === 'x') {
            if (axis.position === 'start') {
              padding.top += axis.size;
            } else if (axis.position === 'end') {
              padding.bottom += axis.size;
            }
          } else if (axis.type === 'y') {
            if (axis.position === 'start') {
              padding.left += axis.size;
            } else if (axis.position === 'end') {
              padding.right += axis.size;
            }
          }
        });

        return padding;
      }, [renderedAxes]);

      const totalPadding = useMemo(
        () => ({
          top: userPadding.top + axisPadding.top,
          right: userPadding.right + axisPadding.right,
          bottom: userPadding.bottom + axisPadding.bottom,
          left: userPadding.left + axisPadding.left,
        }),
        [userPadding, axisPadding],
      );

      const chartRect: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const availableWidth = chartWidth - totalPadding.left - totalPadding.right;
        const availableHeight = chartHeight - totalPadding.top - totalPadding.bottom;

        return {
          x: totalPadding.left,
          y: totalPadding.top,
          width: availableWidth > 0 ? availableWidth : 0,
          height: availableHeight > 0 ? availableHeight : 0,
        };
      }, [chartHeight, chartWidth, totalPadding]);

      const xAxes = useMemo(() => {
        const axes = new Map<string, AxisConfig>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0) return axes;

        xAxisConfig.forEach((axisParam) => {
          const relevantSeries =
            series?.filter((s) => (s.xAxisId ?? defaultAxisId) === axisParam.id) ?? [];

          const domain = getAxisDomain(axisParam, relevantSeries, 'x');
          const range = getAxisRange(axisParam, chartRect, 'x');

          const axisConfig: AxisConfig = {
            scaleType: axisParam.scaleType,
            domain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit,
          };
          axes.set(axisParam.id, axisConfig);
        });

        return axes;
      }, [xAxisConfig, series, chartRect]);

      // todo: do we need to worry about axis being set but scale being undefined?
      const yAxes = useMemo(() => {
        const axes = new Map<string, AxisConfig>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0) return axes;

        yAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data
          const relevantSeries =
            series?.filter((s) => (s.yAxisId ?? defaultAxisId) === axisId) ?? [];

          // Calculate domain and range in one pass
          const domain = getAxisDomain(axisParam, relevantSeries, 'y');
          const range = getAxisRange(axisParam, chartRect, 'y');

          axes.set(axisId, {
            scaleType: axisParam.scaleType,
            domain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? 'nice',
          });
        });

        return axes;
      }, [yAxisConfig, series, chartRect]);

      const xScales = useMemo(() => {
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0) return scales;

        xAxes.forEach((axisConfig, axisId) => {
          const scale = getAxisScale({
            config: axisConfig,
            type: 'x',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
          });

          if (scale) {
            scales.set(axisId, scale);
          }
        });

        return scales;
      }, [chartRect, xAxes]);

      const yScales = useMemo(() => {
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0) return scales;

        yAxes.forEach((axisConfig, axisId) => {
          const scale = getAxisScale({
            config: axisConfig,
            type: 'y',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
          });

          if (scale) {
            scales.set(axisId, scale);
          }
        });

        return scales;
      }, [chartRect, yAxes]);

      /*
      A helper function that finds the nearest dataX to the pixel coordinates from hover interaction.
      todo: handle multiple scales
      todo: can we simplify this a lot to rely on numbers only?
    */
      const getDataIndexFromX = useCallback(
        (mouseX: number): number => {
          const defaultXScale = xScales.get(defaultAxisId);
          const defaultXAxis = xAxes.get(defaultAxisId);

          if (!defaultXScale || !defaultXAxis) return 0;

          if (isCategoricalScale(defaultXScale)) {
            // todo: see where else we can simply rely on scale domain values
            const categories = defaultXScale.domain?.() ?? defaultXAxis.data ?? [];
            const bandwidth = defaultXScale.bandwidth?.() ?? 0;
            let closestIndex = 0;
            let closestDistance = Infinity;
            for (let i = 0; i < categories.length; i++) {
              const xPos = defaultXScale(i);
              if (xPos !== undefined) {
                const distance = Math.abs(mouseX - (xPos + bandwidth / 2));
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestIndex = i;
                }
              }
            }
            return closestIndex;
          } else {
            // For numeric scales with axis data, find the nearest data point
            const axisData = defaultXAxis.data;
            if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
              // We have numeric axis data - find the closest data point
              const numericData = axisData as number[];
              let closestIndex = 0;
              let closestDistance = Infinity;

              for (let i = 0; i < numericData.length; i++) {
                const xValue = numericData[i];
                const xPos = defaultXScale(xValue);
                if (xPos !== undefined) {
                  const distance = Math.abs(mouseX - xPos);
                  if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                  }
                }
              }
              return closestIndex;
            } else {
              const xValue = defaultXScale.invert(mouseX);
              const dataIndex = Math.round(xValue);
              const domain = defaultXAxis.domain;
              return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
            }
          }
        },
        [xScales, xAxes],
      );

      const handleMouseMove = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!enableScrubbing || !series || series.length === 0 || xScales.size === 0) return;

          const rect = event.currentTarget.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;

          const dataIndex = getDataIndexFromX(mouseX);

          if (dataIndex !== highlightedIndex) {
            setHighlightedIndex(dataIndex);
            onScrubberPosChange?.(dataIndex);
          }
        },
        [
          enableScrubbing,
          series,
          xScales,
          getDataIndexFromX,
          highlightedIndex,
          onScrubberPosChange,
        ],
      );

      const handleMouseLeave = useCallback(() => {
        if (!enableScrubbing) return;
        setHighlightedIndex(undefined);
        onScrubberPosChange?.(null);
      }, [enableScrubbing, onScrubberPosChange]);

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<SVGSVGElement>) => {
          if (!enableScrubbing) return;

          const defaultXScale = xScales.get(defaultAxisId);
          const defaultXAxis = xAxes.get(defaultAxisId);

          if (!defaultXScale || !defaultXAxis) return;

          const isBand = isCategoricalScale(defaultXScale as any);
          const categories = isBand
            ? (defaultXScale.domain?.() ?? (defaultXAxis.data as string[] | undefined))
            : (defaultXAxis.data as string[] | undefined);
          const domain = defaultXAxis.domain;
          const minIndex = isBand ? 0 : (domain.min ?? 0);
          const maxIndex = isBand ? (categories?.length ?? 1) - 1 : (domain.max ?? 0);
          const currentIndex = highlightedIndex ?? minIndex;
          const dataRange = maxIndex - minIndex;

          // Multi-step jump when shift is held (10% of data range, minimum 1, maximum 10)
          const multiSkip = event.shiftKey;
          const stepSize = multiSkip ? Math.min(10, Math.max(1, Math.floor(dataRange * 0.1))) : 1;

          let newIndex: number | undefined;

          switch (event.key) {
            case 'ArrowLeft':
              event.preventDefault();
              newIndex = Math.max(minIndex, currentIndex - stepSize);
              break;
            case 'ArrowRight':
              event.preventDefault();
              newIndex = Math.min(maxIndex, currentIndex + stepSize);
              break;
            case 'Home':
              event.preventDefault();
              newIndex = minIndex;
              break;
            case 'End':
              event.preventDefault();
              newIndex = maxIndex;
              break;
            case 'Escape':
              event.preventDefault();
              newIndex = undefined; // Clear highlighting
              break;
            default:
              return; // Don't handle other keys
          }

          if (newIndex !== highlightedIndex) {
            setHighlightedIndex(newIndex);
            onScrubberPosChange?.(newIndex ?? null);
          }
        },
        [enableScrubbing, xScales, xAxes, highlightedIndex, onScrubberPosChange],
      );

      const scrubberContextValue: ScrubberContextValue = useMemo(
        () => ({
          scrubbingEnabled: enableScrubbing,
          highlightedIndex,
          updateHighlightedIndex: setHighlightedIndex,
        }),
        [enableScrubbing, highlightedIndex],
      );

      const getXAxis = useCallback((id?: string) => xAxes.get(id ?? defaultAxisId), [xAxes]);
      const getYAxis = useCallback((id?: string) => yAxes.get(id ?? defaultAxisId), [yAxes]);
      const getXScale = useCallback((id?: string) => xScales.get(id ?? defaultAxisId), [xScales]);
      const getYScale = useCallback((id?: string) => yScales.get(id ?? defaultAxisId), [yScales]);
      const getSeries = useCallback(
        (seriesId?: string) => series?.find((s) => s.id === seriesId),
        [series],
      );

      const stackedDataMap = useMemo(() => {
        if (!series) return new Map<string, Array<[number, number] | null>>();
        return calculateStackedSeriesData(series);
      }, [series]);

      const getStackedSeriesData = useCallback(
        (seriesId?: string) => {
          if (!seriesId) return undefined;
          return stackedDataMap.get(seriesId);
        },
        [stackedDataMap],
      );

      const contextValue: ChartContextValue = useMemo(
        () => ({
          series: series ?? [],
          getSeries,
          getSeriesData: getStackedSeriesData,
          animate,
          width: chartWidth,
          height: chartHeight,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
        }),
        [
          series,
          getSeries,
          getStackedSeriesData,
          animate,
          chartWidth,
          chartHeight,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
        ],
      );

      const registerAxis = useCallback(
        (id: string, type: 'x' | 'y', position: 'start' | 'end', size: number) => {
          setRenderedAxes((prev) => {
            const newMap = new Map(prev);
            newMap.set(id, {
              id,
              type,
              position,
              size,
            });
            return newMap;
          });
        },
        [],
      );

      const unregisterAxis = useCallback((id: string) => {
        setRenderedAxes((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
      }, []);

      const getAxisBounds = useCallback(
        (axisId: string): Rect | undefined => {
          const axis = renderedAxes.get(axisId);
          if (!axis || !chartRect) return;

          // todo: should we keep some sort of ordering here for axes?
          const axesAtPosition = Array.from(renderedAxes.values())
            .filter((a) => a.type === axis.type && a.position === axis.position)
            .sort((a, b) => a.id.localeCompare(b.id));

          const axisIndex = axesAtPosition.findIndex((a) => a.id === axisId);
          if (axisIndex === -1) return;

          // Calculate offset from previous axes at the same position
          const offsetFromPreviousAxes = axesAtPosition
            .slice(0, axisIndex)
            .reduce((sum, a) => sum + a.size, 0);

          if (axis.type === 'x') {
            if (axis.position === 'start') {
              // Position above the chart rect, accounting for user padding
              const startY = userPadding.top + offsetFromPreviousAxes;
              return {
                x: chartRect.x,
                y: startY,
                width: chartRect.width,
                height: axis.size,
              };
            } else {
              // end - position below the chart rect, accounting for user padding
              const startY = chartRect.y + chartRect.height + offsetFromPreviousAxes;
              return {
                x: chartRect.x,
                y: startY,
                width: chartRect.width,
                height: axis.size,
              };
            }
          } else {
            // y axis
            if (axis.position === 'start') {
              // Position to the left of the chart rect, accounting for user padding
              const startX = userPadding.left + offsetFromPreviousAxes;
              return {
                x: startX,
                y: chartRect.y,
                width: axis.size,
                height: chartRect.height,
              };
            } else {
              // right - position to the right of the chart rect, accounting for user padding
              const startX = chartRect.x + chartRect.width + offsetFromPreviousAxes;
              return {
                x: startX,
                y: chartRect.y,
                width: axis.size,
                height: chartRect.height,
              };
            }
          }
        },
        [renderedAxes, chartRect, userPadding],
      );

      const chartDrawingAreaContextValue: ChartDrawingAreaContextValue = useMemo(
        () => ({
          drawingArea: chartRect,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
        }),
        [chartRect, registerAxis, unregisterAxis, getAxisBounds],
      );

      return (
        <ChartDrawingAreaContext.Provider value={chartDrawingAreaContextValue}>
          <ChartContext.Provider value={contextValue}>
            <ScrubberContext.Provider value={scrubberContextValue}>
              <Box
                ref={(node) => {
                  // Handle both the internal observe ref and the forwarded ref
                  observe(node as unknown as HTMLElement);
                  if (ref) {
                    if (typeof ref === 'function') {
                      ref(node as unknown as SVGSVGElement);
                    } else {
                      ref.current = node as unknown as SVGSVGElement;
                    }
                  }
                }}
                as="svg"
                className={cx(enableScrubbing ? focusStylesCss : undefined, className)}
                height={height}
                onKeyDown={enableScrubbing ? handleKeyDown : undefined}
                onMouseLeave={enableScrubbing ? handleMouseLeave : undefined}
                onMouseMove={enableScrubbing ? handleMouseMove : undefined}
                tabIndex={enableScrubbing ? 0 : undefined}
                width={width}
                {...props}
              >
                {children}
              </Box>
            </ScrubberContext.Provider>
          </ChartContext.Provider>
        </ChartDrawingAreaContext.Provider>
      );
    },
  ),
);
