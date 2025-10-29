import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Box, type BoxBaseProps, type BoxProps } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

import { ScrubberProvider, type ScrubberProviderProps } from './scrubber/ScrubberProvider';
import { CartesianChartProvider } from './ChartProvider';
import {
  type AxisConfig,
  type AxisConfigProps,
  type CartesianChartContextValue,
  type ChartInset,
  type ChartScaleFunction,
  defaultAxisId,
  defaultChartInset,
  getAxisConfig,
  getAxisDomain,
  getAxisRange,
  getAxisScale,
  getChartInset,
  getStackedSeriesData as calculateStackedSeriesData,
  type Series,
  useTotalAxisPadding,
} from './utils';

const focusStylesCss = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

export type CartesianChartBaseProps = BoxBaseProps &
  Pick<ScrubberProviderProps, 'enableScrubbing' | 'onScrubberPositionChange'> & {
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
     * Configuration for x-axis.
     */
    xAxis?: Partial<Omit<AxisConfigProps, 'id'>>;
    /**
     * Configuration for y-axis(es). First defined axis becomes default.
     */
    yAxis?: Partial<Omit<AxisConfigProps, 'data'>> | Partial<Omit<AxisConfigProps, 'data'>>[];
    /**
     * Inset around the entire chart (outside the axes).
     */
    inset?: number | Partial<ChartInset>;
  };

export type CartesianChartProps = BoxProps<'svg'> & CartesianChartBaseProps;

export const CartesianChart = memo(
  forwardRef<SVGSVGElement, CartesianChartProps>(
    (
      {
        series,
        children,
        animate = true,
        xAxis: xAxisConfigInput,
        yAxis: yAxisConfigInput,
        inset: insetInput,
        enableScrubbing,
        onScrubberPositionChange,
        width = '100%',
        height = '100%',
        className,
        style,
        ...props
      },
      ref,
    ) => {
      const { observe, width: chartWidth, height: chartHeight } = useDimensions();
      const internalSvgRef = useRef<SVGSVGElement>(null);

      const userInset = useMemo(() => {
        return getChartInset(insetInput, defaultChartInset);
      }, [insetInput]);

      // Axis configs store the properties of each axis, such as id, scale type, domain limit, etc.
      // We only support 1 x axis but allow for multiple y axes.
      const xAxisConfig = useMemo(
        () => getAxisConfig('x', xAxisConfigInput)[0],
        [xAxisConfigInput],
      );
      const yAxisConfig = useMemo(() => getAxisConfig('y', yAxisConfigInput), [yAxisConfigInput]);

      const { renderedAxes, registerAxis, unregisterAxis, axisPadding } = useTotalAxisPadding();

      const chartRect: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const totalInset = {
          top: userInset.top + axisPadding.top,
          right: userInset.right + axisPadding.right,
          bottom: userInset.bottom + axisPadding.bottom,
          left: userInset.left + axisPadding.left,
        };

        const availableWidth = chartWidth - totalInset.left - totalInset.right;
        const availableHeight = chartHeight - totalInset.top - totalInset.bottom;

        return {
          x: totalInset.left,
          y: totalInset.top,
          width: availableWidth > 0 ? availableWidth : 0,
          height: availableHeight > 0 ? availableHeight : 0,
        };
      }, [chartHeight, chartWidth, userInset, axisPadding]);

      // Axes contain the config along with domain and range, which get calculated here.
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
      // Create both axes configs and scales together so we can store the actual scale domain
      const { yAxes, yScales } = useMemo(() => {
        const axes = new Map<string, AxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { yAxes: axes, yScales: scales };

        yAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data
          const relevantSeries =
            series?.filter((s) => (s.yAxisId ?? defaultAxisId) === axisId) ?? [];

          // Calculate domain and range
          const dataDomain = getAxisDomain(axisParam, relevantSeries, 'y');
          const range = getAxisRange(axisParam, chartRect, 'y');

          const axisConfig: AxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? 'nice',
          };

          // Create the scale
          const scale = getAxisScale({
            config: axisConfig,
            type: 'y',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
          });

          if (scale) {
            scales.set(axisId, scale);

            // Update axis config with actual scale domain (after .nice() or other adjustments)
            const scaleDomain = scale.domain();
            const actualDomain =
              Array.isArray(scaleDomain) && scaleDomain.length === 2
                ? { min: scaleDomain[0] as number, max: scaleDomain[1] as number }
                : axisConfig.domain;

            axes.set(axisId, {
              ...axisConfig,
              domain: actualDomain,
            });
          }
        });

        return { yAxes: axes, yScales: scales };
      }, [yAxisConfig, series, chartRect]);

      // Scales are the functions that convert data values to visual positions.
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

          const axesAtPosition = Array.from(renderedAxes.values())
            .filter((a) => a.position === axis.position)
            .sort((a, b) => a.id.localeCompare(b.id));

          const axisIndex = axesAtPosition.findIndex((a) => a.id === axisId);
          if (axisIndex === -1) return;

          // Calculate offset from previous axes at the same position
          const offsetFromPreviousAxes = axesAtPosition
            .slice(0, axisIndex)
            .reduce((sum, a) => sum + a.size, 0);

          if (axis.position === 'top') {
            // Position above the chart rect, accounting for user inset
            const startY = userInset.top + offsetFromPreviousAxes;
            return {
              x: chartRect.x,
              y: startY,
              width: chartRect.width,
              height: axis.size,
            };
          } else if (axis.position === 'bottom') {
            // Position below the chart rect, accounting for user inset
            const startY = chartRect.y + chartRect.height + offsetFromPreviousAxes;
            return {
              x: chartRect.x,
              y: startY,
              width: chartRect.width,
              height: axis.size,
            };
          } else if (axis.position === 'left') {
            // Position to the left of the chart rect, accounting for user inset
            const startX = userInset.left + offsetFromPreviousAxes;
            return {
              x: startX,
              y: chartRect.y,
              width: axis.size,
              height: chartRect.height,
            };
          } else {
            // right - position to the right of the chart rect, accounting for user inset
            const startX = chartRect.x + chartRect.width + offsetFromPreviousAxes;
            return {
              x: startX,
              y: chartRect.y,
              width: axis.size,
              height: chartRect.height,
            };
          }
        },
        [renderedAxes, chartRect, userInset],
      );

      const contextValue: CartesianChartContextValue = useMemo(
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
          aria-live="polite"
          as="svg"
          className={cx(enableScrubbing && focusStylesCss, className)}
          height={height}
          style={style}
          tabIndex={enableScrubbing ? 0 : undefined}
          width={width}
          {...props}
        >
          <CartesianChartProvider value={contextValue}>
            <ScrubberProvider
              enableScrubbing={!!enableScrubbing}
              onScrubberPositionChange={onScrubberPositionChange}
              svgRef={internalSvgRef}
            >
              {children}
            </ScrubberProvider>
          </CartesianChartProvider>
        </Box>
      );
    },
  ),
);
