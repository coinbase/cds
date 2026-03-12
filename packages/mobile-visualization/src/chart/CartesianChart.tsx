import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { type StyleProp, type View, type ViewStyle } from 'react-native';
import type { Rect } from '@coinbase/cds-common/types';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import type { BoxBaseProps, BoxProps } from '@coinbase/cds-mobile/layout';
import { Box } from '@coinbase/cds-mobile/layout';
import { Canvas, Skia, type SkTypefaceFontProvider } from '@shopify/react-native-skia';

import {
  ScrubberAccessibilityView,
  type ScrubberAccessibilityViewProps,
} from './scrubber/ScrubberAccessibilityView';
import { ScrubberProvider, type ScrubberProviderProps } from './scrubber/ScrubberProvider';
import { convertToSerializableScale, type SerializableScale } from './utils/scale';
import { useChartContextBridge } from './ChartContextBridge';
import { CartesianChartProvider } from './ChartProvider';
import { Legend } from './legend';
import {
  type AxisConfig,
  type CartesianAxisConfigProps,
  type CartesianChartContextValue,
  type CartesianChartLayout,
  type ChartInset,
  type ChartScaleFunction,
  defaultAxisId,
  defaultHorizontalLayoutChartInset,
  defaultVerticalLayoutChartInset,
  getAxisConfig,
  getAxisRange,
  getCartesianAxisDomain,
  getCartesianAxisScale,
  getChartInset,
  getStackedSeriesData as calculateStackedSeriesData,
  type LegendPosition,
  type Series,
  useTotalAxisPadding,
} from './utils';

type ChartCanvasProps = Pick<
  CartesianChartProps,
  'accessible' | 'accessibilityLabel' | 'accessibilityLiveRegion'
> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ChartCanvas = memo(
  ({
    children,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityLiveRegion = 'polite',
  }: ChartCanvasProps) => {
    const ContextBridge = useChartContextBridge();
    const isAccessible = accessible && accessibilityLabel !== null;

    return (
      <Canvas
        accessibilityLabel={isAccessible ? accessibilityLabel : undefined}
        accessibilityLiveRegion={isAccessible ? accessibilityLiveRegion : undefined}
        accessible={isAccessible}
        style={[{ width: '100%', height: '100%' }, style]}
      >
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
    series?: Array<Series>;
    /**
     * Chart layout - describes the direction bars/areas grow.
     * - 'vertical' (default): Bars grow vertically. X is category axis, Y is value axis.
     * - 'horizontal': Bars grow horizontally. Y is category axis, X is value axis.
     * @default 'vertical'
     */
    layout?: CartesianChartLayout;
    /**
     * Whether to animate the chart.
     * @default true
     */
    animate?: boolean;
    /**
     * Configuration for x-axis(es). Can be a single config or array of configs.
     *
     * @note Multiple x-axis configs are only supported when `layout="horizontal"`.
     */
    xAxis?: Partial<CartesianAxisConfigProps> | Partial<CartesianAxisConfigProps>[];
    /**
     * Configuration for y-axis(es). Can be a single config or array of configs.
     *
     * @note `layout="horizontal"` supports only one y-axis config.
     */
    yAxis?:
      | Partial<Omit<CartesianAxisConfigProps, 'data'>>
      | Partial<Omit<CartesianAxisConfigProps, 'data'>>[];
    /**
     * Inset around the entire chart (outside the axes).
     */
    inset?: number | Partial<ChartInset>;
    /**
     * Whether to show the legend or a custom legend element.
     * - `true` renders the default Legend component
     * - A React element renders that element as the legend
     * - `false` or omitted hides the legend
     */
    legend?: boolean | React.ReactNode;
    /**
     * Position of the legend relative to the chart.
     * @default 'bottom'
     */
    legendPosition?: LegendPosition;
    /**
     * Accessibility label for the legend group.
     * @default 'Legend'
     */
    legendAccessibilityLabel?: string;
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
     * Function that returns the accessibility label for each scrubber point.
     * Receives `dataIndex` for each scrubber point label.
     */
    getScrubberAccessibilityLabel?: ScrubberAccessibilityViewProps['accessibilityLabel'];
    /**
     * Number of data points to move between screen-reader samples.
     */
    scrubberAccessibilityLabelStep?: number;
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
        layout = 'vertical',
        animate = true,
        enableScrubbing,
        getScrubberAccessibilityLabel,
        scrubberAccessibilityLabelStep,
        xAxis: xAxisConfigProp,
        yAxis: yAxisConfigProp,
        inset,
        onScrubberPositionChange,
        legend,
        legendPosition = 'bottom',
        legendAccessibilityLabel,
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
        accessible = true,
        accessibilityLabel,
        accessibilityLiveRegion = 'polite',
        ...props
      },
      ref,
    ) => {
      const [containerLayout, onContainerLayout] = useLayout();

      const chartWidth = containerLayout.width;
      const chartHeight = containerLayout.height;

      const calculatedInset = useMemo(
        () =>
          getChartInset(
            inset,
            layout === 'horizontal'
              ? defaultHorizontalLayoutChartInset
              : defaultVerticalLayoutChartInset,
          ),
        [inset, layout],
      );

      const xAxisConfig = useMemo(() => getAxisConfig('x', xAxisConfigProp), [xAxisConfigProp]);
      const yAxisConfig = useMemo(() => getAxisConfig('y', yAxisConfigProp), [yAxisConfigProp]);

      // Horizontal layout supports multiple value axes on x, but only a single category axis on y.
      // Vertical layout keeps a single x-axis to preserve existing behavior.
      if (layout === 'horizontal' && yAxisConfig.length > 1) {
        throw new Error(
          'When layout="horizontal", only one y-axis is supported. See https://cds.coinbase.com/components/charts/CartesianChart.',
        );
      }

      if (layout !== 'horizontal' && xAxisConfig.length > 1) {
        throw new Error(
          'Multiple x-axes are only supported when layout="horizontal". See https://cds.coinbase.com/components/charts/CartesianChart.',
        );
      }

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

      const { xAxes, xScales } = useMemo(() => {
        const axes = new Map<string, AxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { xAxes: axes, xScales: scales };

        xAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data.
          const relevantSeries =
            xAxisConfig.length > 1
              ? (series?.filter((s) => (s.xAxisId ?? defaultAxisId) === axisId) ?? [])
              : (series ?? []);

          // Calculate domain and range.
          const dataDomain = getCartesianAxisDomain(axisParam, relevantSeries, 'x', layout);
          const range = getAxisRange(axisParam, chartRect, 'x');

          const axisConfig: AxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? (layout === 'horizontal' ? 'nice' : 'strict'),
          };

          // Create the scale.
          const scale = getCartesianAxisScale({
            config: axisConfig,
            type: 'x',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
            layout,
          });

          if (scale) {
            scales.set(axisId, scale);

            // Update axis config with actual scale domain (after .nice() or other adjustments).
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

        return { xAxes: axes, xScales: scales };
      }, [xAxisConfig, series, chartRect, layout]);

      // We need a set of serialized scales usable in UI thread.
      const xSerializableScales = useMemo(() => {
        const serializableScales = new Map<string, SerializableScale>();
        xScales.forEach((scale, id) => {
          const serializableScale = convertToSerializableScale(scale);
          if (serializableScale) {
            serializableScales.set(id, serializableScale);
          }
        });
        return serializableScales;
      }, [xScales]);

      const { yAxes, yScales } = useMemo(() => {
        const axes = new Map<string, AxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { yAxes: axes, yScales: scales };

        yAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data.
          const relevantSeries =
            yAxisConfig.length > 1
              ? (series?.filter((s) => (s.yAxisId ?? defaultAxisId) === axisId) ?? [])
              : (series ?? []);

          // Calculate domain and range.
          const dataDomain = getCartesianAxisDomain(axisParam, relevantSeries, 'y', layout);
          const range = getAxisRange(axisParam, chartRect, 'y');

          const axisConfig: AxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? (layout === 'horizontal' ? 'strict' : 'nice'),
          };

          // Create the scale.
          const scale = getCartesianAxisScale({
            config: axisConfig,
            type: 'y',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
            layout,
          });

          if (scale) {
            scales.set(axisId, scale);

            // Update axis config with actual scale domain (after .nice() or other adjustments).
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
      }, [yAxisConfig, series, chartRect, layout]);

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

      const getXAxis = useCallback((id?: string) => xAxes.get(id ?? defaultAxisId), [xAxes]);
      const getYAxis = useCallback((id?: string) => yAxes.get(id ?? defaultAxisId), [yAxes]);
      const getXScale = useCallback((id?: string) => xScales.get(id ?? defaultAxisId), [xScales]);
      const getYScale = useCallback((id?: string) => yScales.get(id ?? defaultAxisId), [yScales]);
      const getXSerializableScale = useCallback(
        (id?: string) => xSerializableScales.get(id ?? defaultAxisId),
        [xSerializableScales],
      );
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

      const categoryAxisIsX = useMemo(() => {
        return layout !== 'horizontal';
      }, [layout]);

      const categoryAxisConfig = useMemo(() => {
        return categoryAxisIsX
          ? (xAxisConfig[0] ?? yAxisConfig[0])
          : (yAxisConfig[0] ?? xAxisConfig[0]);
      }, [categoryAxisIsX, xAxisConfig, yAxisConfig]);

      const dataLength = useMemo(() => {
        // If category axis has categorical data, use that length.
        if (categoryAxisConfig.data && categoryAxisConfig.data.length > 0) {
          return categoryAxisConfig.data.length;
        }

        // Otherwise, find the longest series.
        if (!series || series.length === 0) return 0;
        return series.reduce((max, s) => {
          const seriesData = getStackedSeriesData(s.id);
          return Math.max(max, seriesData?.length ?? 0);
        }, 0);
      }, [categoryAxisConfig, series, getStackedSeriesData]);

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
          layout,
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
          layout,
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

      const legendElement = useMemo(() => {
        if (!legend) return;

        if (legend === true) {
          const isHorizontal = legendPosition === 'top' || legendPosition === 'bottom';
          const flexDirection = isHorizontal ? 'row' : 'column';

          return (
            <Legend accessibilityLabel={legendAccessibilityLabel} flexDirection={flexDirection} />
          );
        }

        return legend;
      }, [legend, legendAccessibilityLabel, legendPosition]);

      const rootBoxProps: BoxProps = useMemo(
        () => ({
          ref,
          height,
          style: rootStyles,
          width,
          ...props,
        }),
        [ref, height, rootStyles, width, props],
      );

      return (
        <CartesianChartProvider value={contextValue}>
          <ScrubberProvider
            allowOverflowGestures={allowOverflowGestures}
            enableScrubbing={enableScrubbing}
            onScrubberPositionChange={onScrubberPositionChange}
          >
            {legend ? (
              <Box
                flexDirection={
                  legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row'
                }
                {...rootBoxProps}
              >
                {(legendPosition === 'top' || legendPosition === 'left') && legendElement}
                <Box collapsable={collapsable} onLayout={onContainerLayout} style={{ flex: 1 }}>
                  <ChartCanvas
                    accessibilityLabel={accessibilityLabel}
                    accessibilityLiveRegion={accessibilityLiveRegion}
                    accessible={accessible}
                    style={styles?.chart}
                  >
                    {children}
                  </ChartCanvas>
                  <ScrubberAccessibilityView
                    accessibilityLabel={getScrubberAccessibilityLabel}
                    accessibilityStep={scrubberAccessibilityLabelStep}
                  />
                </Box>
                {(legendPosition === 'bottom' || legendPosition === 'right') && legendElement}
              </Box>
            ) : (
              <Box collapsable={collapsable} onLayout={onContainerLayout} {...rootBoxProps}>
                <ChartCanvas
                  accessibilityLabel={accessibilityLabel}
                  accessibilityLiveRegion={accessibilityLiveRegion}
                  accessible={accessible}
                  style={styles?.chart}
                >
                  {children}
                </ChartCanvas>
                <ScrubberAccessibilityView
                  accessibilityLabel={getScrubberAccessibilityLabel}
                  accessibilityStep={scrubberAccessibilityLabelStep}
                />
              </Box>
            )}
          </ScrubberProvider>
        </CartesianChartProvider>
      );
    },
  ),
);
