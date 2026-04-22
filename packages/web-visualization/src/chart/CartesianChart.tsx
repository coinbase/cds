import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Box, type BoxBaseProps, type BoxProps } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

import { ScrubberProvider, type ScrubberProviderProps } from './scrubber/ScrubberProvider';
import { CartesianChartProvider } from './ChartProvider';
import { Legend } from './legend';
import {
  type CartesianAxisConfig,
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
     * @note Multiple y-axis configs are only supported when `layout="vertical"`.
     */
    yAxis?: Partial<CartesianAxisConfigProps> | Partial<CartesianAxisConfigProps>[];
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

export type CartesianChartProps = Omit<BoxProps<'div'>, 'title'> &
  CartesianChartBaseProps & {
    /**
     * Custom class name for the root element.
     */
    className?: string;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the chart SVG element.
       */
      chart?: string;
    };
    /**
     * Custom styles for the root element.
     */
    style?: React.CSSProperties;
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the chart SVG element.
       */
      chart?: React.CSSProperties;
    };
  };

export const CartesianChart = memo(
  forwardRef<SVGSVGElement, CartesianChartProps>(
    (
      {
        series,
        children,
        layout = 'vertical',
        animate = true,
        xAxis: xAxisConfigProp,
        yAxis: yAxisConfigProp,
        inset,
        enableScrubbing,
        onScrubberPositionChange,
        legend,
        legendPosition = 'bottom',
        legendAccessibilityLabel,
        width = '100%',
        height = '100%',
        className,
        classNames,
        style,
        styles,
        accessibilityLabel,
        ...props
      },
      ref,
    ) => {
      const { observe, width: chartWidth, height: chartHeight } = useDimensions();
      const svgRef = useRef<SVGSVGElement | null>(null);

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

      // Axis configs store the properties of each axis, such as id, scale type, domain limit, etc.
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

      const chartRect: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const totalInset = {
          top: calculatedInset.top + axisPadding.top,
          right: calculatedInset.right + axisPadding.right,
          bottom: calculatedInset.bottom + axisPadding.bottom,
          left: calculatedInset.left + axisPadding.left,
        };

        const availableWidth = chartWidth - totalInset.left - totalInset.right;
        const availableHeight = chartHeight - totalInset.top - totalInset.bottom;

        return {
          x: totalInset.left,
          y: totalInset.top,
          width: availableWidth > 0 ? availableWidth : 0,
          height: availableHeight > 0 ? availableHeight : 0,
        };
      }, [chartHeight, chartWidth, calculatedInset, axisPadding]);

      const { xAxes, xScales } = useMemo(() => {
        const axes = new Map<string, CartesianAxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { xAxes: axes, xScales: scales };

        xAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data
          const relevantSeries =
            xAxisConfig.length > 1
              ? (series?.filter((s) => (s.xAxisId ?? defaultAxisId) === axisId) ?? [])
              : (series ?? []);

          // Calculate domain and range
          const dataDomain = getCartesianAxisDomain(axisParam, relevantSeries, 'x', layout);
          const range = getAxisRange(axisParam, chartRect, 'x');

          const axisConfig: CartesianAxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? (layout === 'horizontal' ? 'nice' : 'strict'),
            baseline: axisParam.baseline,
          };

          // Create the scale
          const scale = getCartesianAxisScale({
            config: axisConfig,
            type: 'x',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
            layout,
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

        return { xAxes: axes, xScales: scales };
      }, [xAxisConfig, series, chartRect, layout]);

      const { yAxes, yScales } = useMemo(() => {
        const axes = new Map<string, CartesianAxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();
        if (!chartRect || chartRect.width <= 0 || chartRect.height <= 0)
          return { yAxes: axes, yScales: scales };

        yAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          // Get relevant series data
          const relevantSeries =
            yAxisConfig.length > 1
              ? (series?.filter((s) => (s.yAxisId ?? defaultAxisId) === axisId) ?? [])
              : (series ?? []);

          // Calculate domain and range
          const dataDomain = getCartesianAxisDomain(axisParam, relevantSeries, 'y', layout);
          const range = getAxisRange(axisParam, chartRect, 'y');

          const axisConfig: CartesianAxisConfig = {
            scaleType: axisParam.scaleType,
            domain: dataDomain,
            range,
            data: axisParam.data,
            categoryPadding: axisParam.categoryPadding,
            domainLimit: axisParam.domainLimit ?? (layout === 'horizontal' ? 'strict' : 'nice'),
            baseline: axisParam.baseline,
          };

          // Create the scale
          const scale = getCartesianAxisScale({
            config: axisConfig,
            type: 'y',
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
            layout,
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
      }, [yAxisConfig, series, chartRect, layout]);

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
        return calculateStackedSeriesData(series, layout, xAxisConfig, yAxisConfig);
      }, [series, layout, xAxisConfig, yAxisConfig]);

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
        // If category axis has categorical data, use that length
        if (categoryAxisConfig.data && categoryAxisConfig.data.length > 0) {
          return categoryAxisConfig.data.length;
        }

        // Otherwise, find the longest series
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

      const contextValue: CartesianChartContextValue = useMemo(
        () => ({
          layout,
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
          getXAxis,
          getYAxis,
          getXScale,
          getYScale,
          chartRect,
          dataLength,
          registerAxis,
          unregisterAxis,
          getAxisBounds,
        ],
      );

      const rootClassNames = useMemo(
        () => cx(className, classNames?.root),
        [className, classNames],
      );
      const rootStyles = useMemo(() => ({ ...style, ...styles?.root }), [style, styles?.root]);

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

      const rootBoxProps: BoxProps<'div'> = useMemo(
        () => ({
          className: rootClassNames,
          height,
          style: rootStyles,
          width,
          ...props,
        }),
        [rootClassNames, height, rootStyles, width, props],
      );

      const chartContent = (
        <Box
          ref={(node) => {
            observe(node as unknown as HTMLElement);
          }}
          height={legend ? undefined : height}
          style={{ flex: 1, minHeight: 0, minWidth: 0 }}
          width={legend ? undefined : width}
        >
          <Box
            ref={(node) => {
              const svgElement = node as unknown as SVGSVGElement;
              svgRef.current = svgElement;
              // Forward the ref to the user
              if (ref) {
                if (typeof ref === 'function') {
                  ref(svgElement);
                } else {
                  (ref as React.MutableRefObject<SVGSVGElement | null>).current = svgElement;
                }
              }
            }}
            accessibilityLabel={accessibilityLabel}
            aria-live="polite"
            as="svg"
            className={cx(enableScrubbing && focusStylesCss, classNames?.chart)}
            height="100%"
            style={styles?.chart}
            tabIndex={enableScrubbing ? 0 : undefined}
            width="100%"
          >
            {children}
          </Box>
        </Box>
      );

      return (
        <CartesianChartProvider value={contextValue}>
          <ScrubberProvider
            enableScrubbing={!!enableScrubbing}
            onScrubberPositionChange={onScrubberPositionChange}
            svgRef={svgRef}
          >
            {legend ? (
              <Box
                {...rootBoxProps}
                flexDirection={
                  legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row'
                }
              >
                {(legendPosition === 'top' || legendPosition === 'left') && legendElement}
                {chartContent}
                {(legendPosition === 'bottom' || legendPosition === 'right') && legendElement}
              </Box>
            ) : (
              <Box {...rootBoxProps}>{chartContent}</Box>
            )}
          </ScrubberProvider>
        </CartesianChartProvider>
      );
    },
  ),
);
