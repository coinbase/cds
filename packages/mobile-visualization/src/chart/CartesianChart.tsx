import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { type StyleProp, type View, type ViewStyle } from 'react-native';
import type { Rect } from '@coinbase/cds-common/types';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import type { BoxBaseProps, BoxProps } from '@coinbase/cds-mobile/layout';
import { Box } from '@coinbase/cds-mobile/layout';
import { Canvas, Skia, type SkTypefaceFontProvider } from '@shopify/react-native-skia';

import { ScrubberProvider, type ScrubberProviderProps } from './scrubber/ScrubberProvider';
import { convertToSerializableScale, type SerializableScale } from './utils/scale';
import { useChartContextBridge } from './ChartContextBridge';
import { CartesianChartProvider } from './ChartProvider';
import {
  type CartesianAxisConfig,
  type CartesianAxisConfigProps,
  type CartesianChartContextValue,
  type CartesianSeries,
  type ChartInset,
  type ChartScaleFunction,
  defaultAxisId,
  defaultChartInset,
  getAxisRange,
  getCartesianAxisConfig,
  getCartesianAxisDomain,
  getCartesianAxisScale,
  getCartesianStackedSeriesData as calculateStackedSeriesData,
  getChartInset,
  useTotalAxisPadding,
} from './utils';

const ChartCanvas = memo(
  ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
    const ContextBridge = useChartContextBridge();

    return (
      <Canvas style={[{ width: '100%', height: '100%' }, style]}>
        <ContextBridge>{children}</ContextBridge>
      </Canvas>
    );
  },
);

export type CartesianChartBaseProps = Omit<BoxBaseProps, 'fontFamily'> &
  Pick<ScrubberProviderProps, 'enableScrubbing' | 'onScrubberPositionChange'> & {
    /**
     * Configuration objects that define how to visualize the data.
     * Each series contains its own data array.
     */
    series?: Array<CartesianSeries>;
    /**
     * Whether to animate the chart.
     * @default true
     */
    animate?: boolean;
    /**
     * Configuration for x-axis.
     */
    xAxis?: Partial<Omit<CartesianAxisConfigProps, 'id'>>;
    /**
     * Configuration for y-axis(es). Can be a single config or array of configs.
     */
    yAxis?: Partial<CartesianAxisConfigProps> | Partial<CartesianAxisConfigProps>[];
    /**
     * Inset around the entire chart (outside the axes).
     */
    inset?: number | Partial<ChartInset>;
  };

export type CartesianChartProps = CartesianChartBaseProps &
  Pick<ScrubberProviderProps, 'allowOverflowGestures'> &
  Omit<BoxProps, 'fontFamily'> & {
    /**
     * Default font families to use within ChartText.
     * If not provided, will be the default for the system.
     * @example
     * ['Helvetica', 'sans-serif']
     */
    fontFamilies?: string[];
    /**
     * Skia font provider to allow for custom fonts.
     * If not provided, the only available fonts will be those defined by the system.
     */
    fontProvider?: SkTypefaceFontProvider;
    /**
     * Custom styles for the root element.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: StyleProp<ViewStyle>;
      /**
       * Custom styles for the chart canvas element.
       */
      chart?: StyleProp<ViewStyle>;
    };
  };

export const CartesianChart = memo(
  forwardRef<View, CartesianChartProps>(
    (
      {
        series,
        children,
        animate = true,
        enableScrubbing,
        xAxis: xAxisConfigProp,
        yAxis: yAxisConfigProp,
        inset,
        onScrubberPositionChange,
        width = '100%',
        height = '100%',
        style,
        styles,
        allowOverflowGestures,
        fontFamilies,
        fontProvider: fontProviderProp,
        // React Native will collapse views by default when only used
        // to group children, which interferes with gesture-handler
        // https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/gesture-detector/#:~:text=%7B%0A%20%20return%20%3C-,View,-collapsable%3D%7B
        collapsable = false,
        ...props
      },
      ref,
    ) => {
      const [containerLayout, onContainerLayout] = useLayout();

      const chartWidth = containerLayout.width;
      const chartHeight = containerLayout.height;

      const calculatedInset = useMemo(() => getChartInset(inset, defaultChartInset), [inset]);

      // there can only be one x axis but the helper function always returns an array
      const xAxisConfig = useMemo(
        () => getCartesianAxisConfig('x', xAxisConfigProp)[0],
        [xAxisConfigProp],
      );
      const yAxisConfig = useMemo(
        () => getCartesianAxisConfig('y', yAxisConfigProp),
        [yAxisConfigProp],
      );

      const { renderedAxes, registerAxis, unregisterAxis, axisPadding } = useTotalAxisPadding();

      const totalInset = useMemo(
        () => ({
          top: calculatedInset.top + axisPadding.top,
          right: calculatedInset.right + axisPadding.right,
          bottom: calculatedInset.bottom + axisPadding.bottom,
          left: calculatedInset.left + axisPadding.left,
        }),
        [calculatedInset, axisPadding],
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

      const { xAxis, xScale } = useMemo(() => {
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { xAxis: undefined, xScale: undefined };

        const domain = getCartesianAxisDomain(xAxisConfig, series ?? [], 'x');
        const range = getAxisRange(xAxisConfig, chartRect, 'x');

        const axisConfig: CartesianAxisConfig = {
          scaleType: xAxisConfig.scaleType,
          domain,
          range,
          data: xAxisConfig.data,
          categoryPadding: xAxisConfig.categoryPadding,
          domainLimit: xAxisConfig.domainLimit,
        };

        // Create the scale
        const scale = getCartesianAxisScale({
          config: axisConfig,
          type: 'x',
          range: axisConfig.range,
          dataDomain: axisConfig.domain,
        });

        if (!scale) return { xAxis: undefined, xScale: undefined };

        // Update axis config with actual scale domain (after .nice() or other adjustments)
        const scaleDomain = scale.domain();
        const actualDomain =
          Array.isArray(scaleDomain) && scaleDomain.length === 2
            ? { min: scaleDomain[0] as number, max: scaleDomain[1] as number }
            : axisConfig.domain;

        const finalAxisConfig = {
          ...axisConfig,
          domain: actualDomain,
        };

        return { xAxis: finalAxisConfig, xScale: scale };
      }, [xAxisConfig, series, chartRect]);

      const xSerializableScale = useMemo(() => {
        if (!xScale) return;
        return convertToSerializableScale(xScale);
      }, [xScale]);

      const { yAxes, yScales } = useMemo(() => {
        const axes = new Map<string, CartesianAxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { yAxes: axes, yScales: scales };

        yAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data
          const relevantSeries =
            series?.filter((s) => (s.yAxisId ?? defaultAxisId) === axisId) ?? [];

          // Calculate domain and range
          const dataDomain = getCartesianAxisDomain(axisParam, relevantSeries, 'y');
          const range = getAxisRange(axisParam, chartRect, 'y');

          const axisConfig: CartesianAxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit,
          };

          // Create the scale
          const scale = getCartesianAxisScale({
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

      // We need a set of serialized scales usable in UI thread
      const ySerializableScales = useMemo(() => {
        const serializableScales = new Map<string, SerializableScale>();
        yScales.forEach((scale, id) => {
          const serializableScale = convertToSerializableScale(scale);
          if (serializableScale) {
            serializableScales.set(id, serializableScale);
          }
        });
        return serializableScales;
      }, [yScales]);

      const getXAxis = useCallback(() => xAxis, [xAxis]);
      const getYAxis = useCallback((id?: string) => yAxes.get(id ?? defaultAxisId), [yAxes]);
      const getXScale = useCallback(() => xScale, [xScale]);
      const getYScale = useCallback((id?: string) => yScales.get(id ?? defaultAxisId), [yScales]);
      const getXSerializableScale = useCallback(() => xSerializableScale, [xSerializableScale]);
      const getYSerializableScale = useCallback(
        (id?: string) => ySerializableScales.get(id ?? defaultAxisId),
        [ySerializableScales],
      );
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

      const dataLength = useMemo(() => {
        // If xAxis has categorical data, use that length
        if (xAxisConfig.data && xAxisConfig.data.length > 0) {
          return xAxisConfig.data.length;
        }

        // Otherwise, find the longest series
        if (!series || series.length === 0) return 0;
        return series.reduce((max, s) => {
          const seriesData = getStackedSeriesData(s.id);
          return Math.max(max, seriesData?.length ?? 0);
        }, 0);
      }, [xAxisConfig.data, series, getStackedSeriesData]);

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
            const startY = calculatedInset.top + offsetFromPreviousAxes;
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
            const startX = calculatedInset.left + offsetFromPreviousAxes;
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
        [renderedAxes, chartRect, calculatedInset],
      );

      const fontProvider = useMemo(() => {
        if (fontProviderProp) return fontProviderProp;
        return Skia.TypefaceFontProvider.Make();
      }, [fontProviderProp]);

      const contextValue: CartesianChartContextValue = useMemo(
        () => ({
          series: series ?? [],
          getSeries,
          getSeriesData: getStackedSeriesData,
          animate,
          width: chartWidth,
          height: chartHeight,
          fontFamilies,
          fontProvider,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
          getXSerializableScale,
          getYSerializableScale,
          drawingArea: chartRect,
          dataLength,
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
          fontFamilies,
          fontProvider,
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
          getXSerializableScale,
          getYSerializableScale,
          chartRect,
          dataLength,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
        ],
      );

      const rootStyles = useMemo(() => {
        return [style, styles?.root];
      }, [style, styles?.root]);

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
              collapsable={collapsable}
              height={height}
              onLayout={onContainerLayout}
              style={rootStyles}
              width={width}
              {...props}
            >
              <ChartCanvas style={styles?.chart}>{children}</ChartCanvas>
            </Box>
          </ScrubberProvider>
        </CartesianChartProvider>
      );
    },
  ),
);
