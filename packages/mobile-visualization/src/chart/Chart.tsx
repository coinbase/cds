import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, type View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Svg } from 'react-native-svg';
import type { Rect } from '@coinbase/cds-common/types';
import {
  type AxisConfig,
  type AxisConfigProps,
  ChartContext,
  type ChartContextValue,
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
  ScrubberContext,
  type ScrubberContextValue,
  type Series,
  useTotalAxisPadding,
} from '@coinbase/cds-common/visualizations/charts';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { Box } from '@coinbase/cds-mobile/layout';
import { debounce } from '@coinbase/cds-mobile/utils/debounce';

import { ChartPanGestureHandler } from './ChartPanGestureHandler';

export type ChartBaseProps = {
  /**
   * Configuration objects that define how to visualize the data.
   * Each series contains its own data array.
   */
  series?: Array<Series>;
  /**
   * Chart content (axes, lines, etc.)
   */
  children?: React.ReactNode;
  /**
   * Whether to animate the chart.
   * @default true
   */
  animate?: boolean;
  /**
   * Enables scrubbing interactions (pan gestures for highlighting).
   * When true, allows highlighting and makes scrubber components interactive.
   */
  enableScrubbing?: boolean;
  /**
   * Configuration for x-axis.
   */
  xAxis?: Partial<Omit<AxisConfigProps, 'id'>>;
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
  /**
   * Chart width. If not provided, will use the container's measured width.
   */
  width?: number | string;
  /**
   * Chart height. If not provided, will use the container's measured height.
   */
  height?: number | string;
  /**
   * Additional styles for the chart container.
   */
  style?: ViewStyle;
};

export type ChartProps = ChartBaseProps;

export const Chart = memo(
  forwardRef<View, ChartProps>(
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
        style,
        ...props
      },
      ref,
    ) => {
      const [containerLayout, onContainerLayout] = useLayout();

      const chartWidth = typeof width === 'number' ? width : containerLayout.width;
      const chartHeight = typeof height === 'number' ? height : containerLayout.height;

      const userPadding = useMemo(
        () => getPadding(paddingInput, defaultChartPadding),
        [paddingInput],
      );

      // there can only be one x axis but the helper function always returns an array
      const xAxisConfig = useMemo(
        () => getAxisConfig('x', xAxisConfigInput)[0],
        [xAxisConfigInput],
      );
      const yAxisConfig = useMemo(() => getAxisConfig('y', yAxisConfigInput), [yAxisConfigInput]);

      const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(undefined);
      const { renderedAxes, registerAxis, unregisterAxis, axisPadding } = useTotalAxisPadding();

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

      const xAxis = useMemo(() => {
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0) return undefined;

        const domain = getAxisDomain(xAxisConfig, series ?? [], 'x');
        const range = getAxisRange(xAxisConfig, chartRect, 'x');

        const axisConfig: AxisConfig = {
          scaleType: xAxisConfig.scaleType,
          domain,
          range,
          data: xAxisConfig.data,
          categoryPadding: xAxisConfig.categoryPadding,
          domainLimit: xAxisConfig.domainLimit,
        };

        return axisConfig;
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

      const xScale = useMemo(() => {
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0 || xAxis === undefined)
          return undefined;

        return getAxisScale({
          config: xAxis,
          type: 'x',
          range: xAxis.range,
          dataDomain: xAxis.domain,
        });
      }, [chartRect, xAxis]);

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

      const getDataIndexFromX = useCallback(
        (mouseX: number): number => {
          if (!xScale || !xAxis) return 0;

          if (isCategoricalScale(xScale)) {
            // todo: see where else we can simply rely on scale domain values
            const categories = xScale.domain?.() ?? xAxis.data ?? [];
            const bandwidth = xScale.bandwidth?.() ?? 0;
            let closestIndex = 0;
            let closestDistance = Infinity;
            for (let i = 0; i < categories.length; i++) {
              const xPos = xScale(i);
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
            const axisData = xAxis.data;
            if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
              // We have numeric axis data - find the closest data point
              const numericData = axisData as number[];
              let closestIndex = 0;
              let closestDistance = Infinity;

              for (let i = 0; i < numericData.length; i++) {
                const xValue = numericData[i];
                const xPos = xScale(xValue);
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
              const xValue = xScale.invert(mouseX);
              const dataIndex = Math.round(xValue);
              const domain = xAxis.domain;
              return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
            }
          }
        },
        [xScale, xAxis],
      );

      const handlePositionUpdate = useCallback(
        (x: number) => {
          if (!enableScrubbing || !series || series.length === 0) return;

          const dataIndex = getDataIndexFromX(x);
          if (dataIndex !== highlightedIndex) {
            setHighlightedIndex(dataIndex);
            onScrubberPosChange?.(dataIndex);
          }
        },
        [enableScrubbing, series, getDataIndexFromX, highlightedIndex, onScrubberPosChange],
      );

      const handleInteractionEnd = useCallback(() => {
        if (!enableScrubbing) return;
        setHighlightedIndex(undefined);
        onScrubberPosChange?.(null);
      }, [enableScrubbing, onScrubberPosChange]);

      const scrubberContextValue: ScrubberContextValue = useMemo(
        () => ({
          scrubbingEnabled: enableScrubbing,
          highlightedIndex,
          updateHighlightedIndex: setHighlightedIndex,
        }),
        [enableScrubbing, highlightedIndex],
      );

      const getXAxis = useCallback(() => xAxis, [xAxis]);
      const getYAxis = useCallback((id?: string) => yAxes.get(id ?? defaultAxisId), [yAxes]);
      const getXScale = useCallback(() => xScale, [xScale]);
      const getYScale = useCallback((id?: string) => yScales.get(id ?? defaultAxisId), [yScales]);
      const getSeries = useCallback(
        (seriesId?: string) => series?.find((s) => s.id === seriesId),
        [series],
      );

      // Compute stacked data for series with stack properties
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
          drawingArea: chartRect,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
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
          chartRect,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
        ],
      );

      const containerStyles = useMemo(() => {
        const dynamicStyles: any = {};
        if (typeof width === 'string') {
          dynamicStyles.width = width;
        }
        if (typeof height === 'string') {
          dynamicStyles.height = height;
        }

        return [style, dynamicStyles];
      }, [style, width, height]);

      const chartContent = (
        <Box ref={ref} onLayout={onContainerLayout} style={containerStyles} {...props}>
          {chartWidth > 0 && chartHeight > 0 && (
            <Svg height={chartHeight} width={chartWidth}>
              {children}
            </Svg>
          )}
        </Box>
      );

      return (
        <ChartContext.Provider value={contextValue}>
          <ScrubberContext.Provider value={scrubberContextValue}>
            {enableScrubbing ? (
              <ChartPanGestureHandler
                allowOverflowGestures
                onScrub={handlePositionUpdate}
                onScrubEnd={handleInteractionEnd}
              >
                {chartContent}
              </ChartPanGestureHandler>
            ) : (
              chartContent
            )}
          </ScrubberContext.Provider>
        </ChartContext.Provider>
      );
    },
  ),
);
