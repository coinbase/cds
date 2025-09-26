import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import {
  type AxisConfig,
  type AxisConfigProps,
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
  type Series,
  useTotalAxisPadding,
} from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Box, type BoxBaseProps, type BoxProps } from '@coinbase/cds-web/layout';

import { ScrubberProvider } from './scrubber/ScrubberProvider';
import { ChartProvider } from './ChartProvider';

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
      const internalSvgRef = useRef<SVGSVGElement>(null);

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

      const { renderedAxes, registerAxis, unregisterAxis, axisPadding } = useTotalAxisPadding();

      const chartRect: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const totalPadding = {
          top: userPadding.top + axisPadding.top,
          right: userPadding.right + axisPadding.right,
          bottom: userPadding.bottom + axisPadding.bottom,
          left: userPadding.left + axisPadding.left,
        };

        const availableWidth = chartWidth - totalPadding.left - totalPadding.right;
        const availableHeight = chartHeight - totalPadding.top - totalPadding.bottom;

        return {
          x: totalPadding.left,
          y: totalPadding.top,
          width: availableWidth > 0 ? availableWidth : 0,
          height: availableHeight > 0 ? availableHeight : 0,
        };
      }, [chartHeight, chartWidth, userPadding, axisPadding]);

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

      const getXAxis = useCallback(() => xAxis, [xAxis]);
      const getYAxis = useCallback((id?: string) => yAxes.get(id ?? defaultAxisId), [yAxes]);
      const getXScale = useCallback(() => xScale, [xScale]);
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

      const contextValue: ChartContextValue<SVGSVGElement> = useMemo(
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
          svgRef: internalSvgRef,
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

      return (
        <Box
          ref={(node) => {
            // Handle the observe ref, internal ref, and forwarded ref
            observe(node as unknown as HTMLElement);
            if (internalSvgRef.current !== node) {
              (internalSvgRef as React.MutableRefObject<SVGSVGElement | null>).current =
                node as unknown as SVGSVGElement;
            }
            if (ref) {
              if (typeof ref === 'function') {
                ref(node as unknown as SVGSVGElement);
              } else {
                ref.current = node as unknown as SVGSVGElement;
              }
            }
          }}
          as="svg"
          className={cx(className)}
          height={height}
          width={width}
          {...props}
        >
          <ChartProvider value={contextValue}>
            <ScrubberProvider
              enableScrubbing={enableScrubbing}
              onScrubberPosChange={onScrubberPosChange}
              svgRef={internalSvgRef}
            >
              {children}
            </ScrubberProvider>
          </ChartProvider>
        </Box>
      );
    },
  ),
);
