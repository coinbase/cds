import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { type StyleProp, type View, type ViewStyle } from 'react-native';
import type { Rect } from '@coinbase/cds-common/types';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import type { BoxBaseProps, BoxProps } from '@coinbase/cds-mobile/layout';
import { Box } from '@coinbase/cds-mobile/layout';
import { Canvas, Skia, type SkTypefaceFontProvider } from '@shopify/react-native-skia';

import { convertToSerializableScale, type SerializableScale } from './utils/scale';
import { useChartContextBridge } from './ChartContextBridge';
import { PolarChartProvider } from './ChartProvider';
import {
  type AngularAxisConfig,
  type AngularAxisConfigProps,
  type ChartInset,
  type ChartScaleFunction,
  defaultAxisId,
  defaultChartInset,
  getAngularAxisConfig,
  getChartInset,
  getPolarAxisDomain,
  getPolarAxisRange,
  getPolarAxisScale,
  getRadialAxisConfig,
  type PolarChartContextValue,
  type PolarSeries,
  type RadialAxisConfig,
  type RadialAxisConfigProps,
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

export type PolarChartBaseProps = Omit<BoxBaseProps, 'fontFamily'> & {
  /**
   * Configuration object that defines the data to visualize.
   */
  series?: PolarSeries[];
  /**
   * Whether to animate the chart.
   * @default true
   */
  animate?: boolean;
  /**
   * Configuration for angular axis/axes (controls start/end angles).
   * Can be a single axis config or an array of axis configs for multiple angular ranges.
   * Default range: { min: 0, max: 360 } (full circle)
   *
   * @example
   * Single axis (default):
   * ```tsx
   * // Semicircle
   * <PolarChart angularAxis={{ range: { min: 0, max: 180 } }} />
   *
   * // Add padding between slices
   * <PolarChart angularAxis={{ paddingAngle: 2 }} />
   * ```
   *
   * @example
   * Multiple axes:
   * ```tsx
   * <PolarChart
   *   angularAxis={[
   *     { id: 'top', range: { min: 0, max: 180 } },
   *     { id: 'bottom', range: { min: 180, max: 360 } },
   *   ]}
   *   series={[
   *     { id: 'topData', data: [...], angularAxisId: 'top' },
   *     { id: 'bottomData', data: [...], angularAxisId: 'bottom' },
   *   ]}
   * />
   * ```
   */
  angularAxis?: Partial<AngularAxisConfigProps> | Partial<AngularAxisConfigProps>[];
  /**
   * Configuration for radial axis/axes (controls inner/outer radii).
   * Can be a single axis config or an array of axis configs for multiple radial ranges.
   * Default range: { min: 0, max: [radius in pixels] } (pie chart using full radius)
   *
   * @example
   * Single axis (default):
   * ```tsx
   * // Donut chart with 50% inner radius
   * <PolarChart radialAxis={{ range: ({ max }) => ({ min: max * 0.5, max }) }} />
   * ```
   *
   * @example
   * Multiple axes (nested rings):
   * ```tsx
   * <PolarChart
   *   radialAxis={[
   *     { id: 'inner', range: ({ max }) => ({ min: 0, max: max * 0.4 }) },
   *     { id: 'outer', range: ({ max }) => ({ min: max * 0.6, max }) },
   *   ]}
   *   series={[
   *     { id: 'innerData', data: [...], radialAxisId: 'inner' },
   *     { id: 'outerData', data: [...], radialAxisId: 'outer' },
   *   ]}
   * />
   * ```
   */
  radialAxis?: Partial<RadialAxisConfigProps> | Partial<RadialAxisConfigProps>[];
  /**
   * Inset around the entire chart (outside the drawing area).
   */
  inset?: number | Partial<ChartInset>;
};

export type PolarChartProps = PolarChartBaseProps &
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

/**
 * Base component for polar coordinate charts (pie, donut).
 * Provides context and layout for polar chart child components.
 */
export const PolarChart = memo(
  forwardRef<View, PolarChartProps>(
    (
      {
        series,
        children,
        animate = true,
        angularAxis,
        radialAxis,
        inset: insetInput,
        width = '100%',
        height = '100%',
        style,
        styles,
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

      const inset = useMemo(() => {
        return getChartInset(insetInput, defaultChartInset);
      }, [insetInput]);

      // Normalize axis configs (same pattern as CartesianChart)
      const angularAxisConfig = useMemo(() => getAngularAxisConfig(angularAxis), [angularAxis]);
      const radialAxisConfig = useMemo(() => getRadialAxisConfig(radialAxis), [radialAxis]);

      // Calculate drawing area - always square for polar charts
      const drawingArea: Rect = useMemo(() => {
        if (chartWidth <= 0 || chartHeight <= 0) return { x: 0, y: 0, width: 0, height: 0 };

        const availableWidth = chartWidth - inset.left - inset.right;
        const availableHeight = chartHeight - inset.top - inset.bottom;

        // Use the smaller dimension to create a square drawing area
        const size = Math.min(
          availableWidth > 0 ? availableWidth : 0,
          availableHeight > 0 ? availableHeight : 0,
        );

        // Center the square drawing area within the available space
        const offsetX = (availableWidth - size) / 2;
        const offsetY = (availableHeight - size) / 2;

        return {
          x: inset.left + offsetX,
          y: inset.top + offsetY,
          width: size,
          height: size,
        };
      }, [chartWidth, chartHeight, inset]);

      const outerRadius = Math.min(drawingArea.width, drawingArea.height) / 2;

      const getSeries = useCallback(
        (seriesId?: string) => series?.find((s) => s.id === seriesId),
        [series],
      );

      const getSeriesData = useCallback(
        (seriesId?: string) => series?.find((s) => s.id === seriesId)?.data,
        [series],
      );

      const { angularAxes, angularScales } = useMemo(() => {
        const axes = new Map<string, AngularAxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();

        if (drawingArea.width <= 0 || drawingArea.height <= 0)
          return { angularAxes: axes, angularScales: scales };

        angularAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          const relevantSeries =
            series?.filter((s) => (s.angularAxisId ?? defaultAxisId) === axisId) ?? [];

          const domain = getPolarAxisDomain(axisParam, relevantSeries, 'angular');
          const range = getPolarAxisRange(axisParam, 'angular', outerRadius);

          const axisConfig: AngularAxisConfig = {
            scaleType: axisParam.scaleType ?? 'linear',
            domain,
            range,
            paddingAngle: axisParam.paddingAngle,
          };

          const scale = getPolarAxisScale({
            config: axisConfig,
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
          });

          if (scale) {
            scales.set(axisId, scale);
            axes.set(axisId, axisConfig);
          }
        });

        return { angularAxes: axes, angularScales: scales };
      }, [angularAxisConfig, series, drawingArea, outerRadius]);

      const angularSerializableScales = useMemo(() => {
        const serializableScales = new Map<string, SerializableScale>();
        angularScales.forEach((scale, id) => {
          const serializableScale = convertToSerializableScale(scale);
          if (serializableScale) {
            serializableScales.set(id, serializableScale);
          }
        });
        return serializableScales;
      }, [angularScales]);

      const { radialAxes, radialScales } = useMemo(() => {
        const axes = new Map<string, RadialAxisConfig>();
        const scales = new Map<string, ChartScaleFunction>();

        if (drawingArea.width <= 0 || drawingArea.height <= 0 || outerRadius <= 0)
          return { radialAxes: axes, radialScales: scales };

        radialAxisConfig.forEach((axisParam) => {
          const axisId = axisParam.id ?? defaultAxisId;

          const relevantSeries =
            series?.filter((s) => (s.radialAxisId ?? defaultAxisId) === axisId) ?? [];

          const domain = getPolarAxisDomain(axisParam, relevantSeries, 'radial');
          const range = getPolarAxisRange(axisParam, 'radial', outerRadius);

          const axisConfig: RadialAxisConfig = {
            scaleType: axisParam.scaleType ?? 'linear',
            domain,
            range,
          };

          const scale = getPolarAxisScale({
            config: axisConfig,
            range: axisConfig.range,
            dataDomain: axisConfig.domain,
          });

          if (scale) {
            scales.set(axisId, scale);

            const scaleDomain = scale.domain();
            const actualDomain =
              Array.isArray(scaleDomain) && scaleDomain.length === 2
                ? { min: scaleDomain[0] as number, max: scaleDomain[1] as number }
                : axisConfig.domain;

            axes.set(axisId, { ...axisConfig, domain: actualDomain });
          }
        });

        return { radialAxes: axes, radialScales: scales };
      }, [radialAxisConfig, series, drawingArea, outerRadius]);

      const radialSerializableScales = useMemo(() => {
        const serializableScales = new Map<string, SerializableScale>();
        radialScales.forEach((scale, id) => {
          const serializableScale = convertToSerializableScale(scale);
          if (serializableScale) {
            serializableScales.set(id, serializableScale);
          }
        });
        return serializableScales;
      }, [radialScales]);

      const getAngularAxis = useCallback(
        (id?: string) => angularAxes.get(id ?? defaultAxisId),
        [angularAxes],
      );
      const getRadialAxis = useCallback(
        (id?: string) => radialAxes.get(id ?? defaultAxisId),
        [radialAxes],
      );
      const getAngularScale = useCallback(
        (id?: string) => angularScales.get(id ?? defaultAxisId),
        [angularScales],
      );
      const getRadialScale = useCallback(
        (id?: string) => radialScales.get(id ?? defaultAxisId),
        [radialScales],
      );
      const getAngularSerializableScale = useCallback(
        (id?: string) => angularSerializableScales.get(id ?? defaultAxisId),
        [angularSerializableScales],
      );
      const getRadialSerializableScale = useCallback(
        (id?: string) => radialSerializableScales.get(id ?? defaultAxisId),
        [radialSerializableScales],
      );

      const dataLength = useMemo(() => {
        if (!series || series.length === 0) return 0;
        const firstSeriesData = series[0].data;
        if (typeof firstSeriesData === 'number') return series.length;
        if (Array.isArray(firstSeriesData)) {
          return Math.max(...series.map((s) => (Array.isArray(s.data) ? s.data.length : 0)));
        }
        return 0;
      }, [series]);

      const fontProvider = useMemo(() => {
        if (fontProviderProp) return fontProviderProp;
        return Skia.TypefaceFontProvider.Make();
      }, [fontProviderProp]);

      const contextValue: PolarChartContextValue = useMemo(
        () => ({
          series: series ?? [],
          getSeries,
          getSeriesData,
          animate,
          width: chartWidth,
          height: chartHeight,
          fontFamilies,
          fontProvider,
          drawingArea,
          outerRadius,
          getAngularAxis,
          getRadialAxis,
          getAngularScale,
          getRadialScale,
          getAngularSerializableScale,
          getRadialSerializableScale,
          dataLength,
        }),
        [
          series,
          getSeries,
          getSeriesData,
          animate,
          chartWidth,
          chartHeight,
          fontFamilies,
          fontProvider,
          drawingArea,
          outerRadius,
          getAngularAxis,
          getRadialAxis,
          getAngularScale,
          getRadialScale,
          getAngularSerializableScale,
          getRadialSerializableScale,
          dataLength,
        ],
      );

      const rootStyles = useMemo(() => {
        return [style, styles?.root];
      }, [style, styles?.root]);

      return (
        <PolarChartProvider value={contextValue}>
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
        </PolarChartProvider>
      );
    },
  ),
);
