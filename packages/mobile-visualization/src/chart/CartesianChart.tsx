import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { type View } from 'react-native';
import type { Rect } from '@coinbase/cds-common/types';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import type { BoxBaseProps, BoxProps } from '@coinbase/cds-mobile/layout';
import { Box } from '@coinbase/cds-mobile/layout';
import { Skia } from '@shopify/react-native-skia';

import { ScrubberProvider, type ScrubberProviderProps } from './scrubber/ScrubberProvider';
import { getGradientScale } from './utils/gradient';
import { ChartCanvas } from './ChartCanvas';
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
     * Configuration for y-axis(es). Can be a single config or array of configs.
     * If array, first axis becomes default if no id is specified.
     */
    yAxis?: Partial<AxisConfigProps> | Partial<AxisConfigProps>[];
    /**
     * Inset around the entire chart (outside the axes).
     */
    inset?: number | Partial<ChartInset>;
  };

export type CartesianChartProps = CartesianChartBaseProps &
  Pick<ScrubberProviderProps, 'allowOverflowGestures'> &
  BoxProps & {
    /**
     * Chart width. If not provided, will use the container's measured width.
     */
    width?: number | string;
    /**
     * Chart height. If not provided, will use the container's measured height.
     */
    height?: number | string;
  };

export const CartesianChart = memo(
  forwardRef<View, CartesianChartProps>(
    (
      {
        series,
        animate = true,
        enableScrubbing,
        xAxis: xAxisConfigInput,
        yAxis: yAxisConfigInput,
        inset: insetInput,
        onScrubberPositionChange,
        children,
        width = '100%',
        height = '100%',
        style,
        allowOverflowGestures,
        ...props
      },
      ref,
    ) => {
      const [containerLayout, onContainerLayout] = useLayout();

      // Use Skia's default TypefaceFontProvider for paragraph rendering
      // This provides access to system fonts (Helvetica, Arial, etc.) without custom font loading
      const fontMgr = useMemo(() => {
        const fontProvider = Skia.TypefaceFontProvider.Make();
        // Register system fonts if available, otherwise Skia will use defaults
        return fontProvider;
      }, []);

      const chartWidth = typeof width === 'number' ? width : containerLayout.width;
      const chartHeight = typeof height === 'number' ? height : containerLayout.height;

      const userInset = useMemo(() => {
        return getChartInset(insetInput, defaultChartInset);
      }, [insetInput]);

      // there can only be one x axis but the helper function always returns an array
      const xAxisConfig = useMemo(
        () => getAxisConfig('x', xAxisConfigInput)[0],
        [xAxisConfigInput],
      );
      const yAxisConfig = useMemo(() => getAxisConfig('y', yAxisConfigInput), [yAxisConfigInput]);

      const { renderedAxes, registerAxis, unregisterAxis, axisPadding } = useTotalAxisPadding();

      const totalInset = useMemo(
        () => ({
          top: userInset.top + axisPadding.top,
          right: userInset.right + axisPadding.right,
          bottom: userInset.bottom + axisPadding.bottom,
          left: userInset.left + axisPadding.left,
        }),
        [userInset, axisPadding],
      );

      const chartRect: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const availableWidth = chartWidth - totalInset.left - totalInset.right;
        const availableHeight = chartHeight - totalInset.top - totalInset.bottom;

        return {
          x: totalInset.left,
          y: totalInset.top,
          width: availableWidth > 0 ? availableWidth : 0,
          height: availableHeight > 0 ? availableHeight : 0,
        };
      }, [chartHeight, chartWidth, totalInset]);

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

      const getSeriesGradientScale = useCallback(
        (seriesId: string) => {
          const targetSeries = series?.find((s) => s.id === seriesId);
          if (!targetSeries?.gradient) return undefined;

          const yScale = yScales.get(targetSeries.yAxisId ?? defaultAxisId);

          return getGradientScale(targetSeries.gradient, xScale, yScale);
        },
        [series, xScale, yScales],
      );

      const contextValue: CartesianChartContextValue = useMemo(
        () => ({
          series: series ?? [],
          getSeries,
          getSeriesData: getStackedSeriesData,
          animate,
          width: chartWidth,
          height: chartHeight,
          fontMgr,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
          drawingArea: chartRect,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
          getSeriesGradientScale,
        }),
        [
          series,
          getSeries,
          getStackedSeriesData,
          animate,
          chartWidth,
          chartHeight,
          fontMgr,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
          chartRect,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
          getSeriesGradientScale,
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

      return (
        <CartesianChartProvider value={contextValue}>
          <ScrubberProvider
            allowOverflowGestures={allowOverflowGestures}
            enableScrubbing={enableScrubbing}
            onScrubberPositionChange={onScrubberPositionChange}
          >
            <Box
              ref={ref}
              accessibilityLiveRegion="polite"
              accessibilityRole="image"
              onLayout={onContainerLayout}
              style={containerStyles}
              {...props}
            >
              <ChartCanvas height={chartHeight} width={chartWidth}>
                {children}
              </ChartCanvas>
            </Box>
          </ScrubberProvider>
        </CartesianChartProvider>
      );
    },
  ),
);
