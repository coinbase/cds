import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type ColorMap, getColorMapScale, processColorMap } from '../utils';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color at peak values (top/bottom of gradient).
     * @default fill or 'var(--color-fgPrimary)'
     */
    peakColor?: string;
    /**
     * The color at the baseline (0 or edge closest to 0).
     * @default peakColor or fill
     */
    baselineColor?: string;
    /**
     * Opacity at peak values.
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * Color mapping configuration.
     * When provided, overrides peakColor/baselineColor and creates a colorMap-based gradient.
     * When not provided, creates an automatic diverging gradient around the baseline.
     */
    colorMap?: ColorMap;
    /**
     * Series ID - used to retrieve colorMap from series if not provided directly.
     */
    seriesId?: string;
  };

/**
 * A customizable gradient area component which uses Path with SVG linearGradient.
 *
 * When no colorMap is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    peakColor,
    baselineColor,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    colorMap: colorMapProp,
    seriesId,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();

    // Get colorMap from series if seriesId is provided and colorMap is not
    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const seriesColorMap = targetSeries?.colorMap;

    // Get scales and drawing area
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();
    const drawingArea = context.drawingArea;

    // Calculate gradient configuration from colorMap or create default
    const gradientConfig = useMemo(() => {
      // Use explicit colorMap prop, or fall back to series colorMap, or create default
      let effectiveColorMap: ColorMap | undefined = colorMapProp ?? seriesColorMap;

      console.log('[GradientArea] Starting gradient config', {
        seriesId,
        hasColorMapProp: !!colorMapProp,
        hasSeriesColorMap: !!seriesColorMap,
        hasYScale: !!yScale,
        yDomain,
      });

      if (!effectiveColorMap && yScale && yDomain) {
        // Create default diverging gradient around baseline
        const [minValue, maxValue] = yDomain;

        let shouldDiverge = false;
        let baselineValue = 0;

        if (minValue >= 0) {
          // All positive: simple gradient from bottom
          baselineValue = minValue;
        } else if (maxValue <= 0) {
          // All negative: simple gradient from top
          baselineValue = maxValue;
        } else {
          // Crosses zero: use diverging gradient
          shouldDiverge = true;
          baselineValue = baseline ?? 0;
        }

        const effectivePeakColor = peakColor ?? fill;
        const effectiveBaselineColor = baselineColor ?? fill;

        // Create default gradient using colorMap
        if (shouldDiverge) {
          effectiveColorMap = {
            type: 'continuous',
            axis: 'y',
            colors: [
              { color: effectivePeakColor, opacity: peakOpacity },
              { color: effectiveBaselineColor, opacity: baselineOpacity },
              { color: effectivePeakColor, opacity: peakOpacity },
            ],
            stops: [minValue, baselineValue, maxValue],
          };
        } else {
          // Simple gradient from baseline to peak
          effectiveColorMap = {
            type: 'continuous',
            axis: 'y',
            colors: [
              { color: effectiveBaselineColor, opacity: baselineOpacity },
              { color: effectivePeakColor, opacity: peakOpacity },
            ],
          };
        }

        console.log('[GradientArea] Created default colorMap', {
          seriesId,
          shouldDiverge,
          baselineValue,
          effectiveColorMap,
        });
      }

      if (!effectiveColorMap) {
        console.warn('[GradientArea] No effective colorMap', { seriesId });
        return null;
      }

      console.log('[GradientArea] Processing colorMap', {
        seriesId,
        colorMap: effectiveColorMap,
        hasXScale: !!xScale,
        hasYScale: !!yScale,
      });

      const scale = getColorMapScale(effectiveColorMap, xScale, yScale);
      if (!scale) {
        console.warn('[GradientArea] ColorMap requires a valid numeric or categorical scale', {
          seriesId,
          colorMap: effectiveColorMap,
        });
        return null;
      }

      console.log('[GradientArea] ColorMap scale obtained', {
        seriesId,
        scaleDomain: scale.domain(),
        scaleRange: scale.range(),
      });

      const processed = processColorMap(effectiveColorMap, scale);
      if (!processed) {
        console.warn('[GradientArea] Failed to process colorMap', { seriesId });
        return null;
      }

      console.log('[GradientArea] ColorMap processed successfully', {
        seriesId,
        config: processed,
      });

      return processed;
    }, [
      colorMapProp,
      seriesColorMap,
      yScale,
      yDomain,
      baseline,
      peakColor,
      baselineColor,
      peakOpacity,
      baselineOpacity,
      fill,
      xScale,
      seriesId,
    ]);

    // Determine gradient direction - always vertical for areas
    const gradientDirection = 'vertical';

    if (!gradientConfig) {
      // Fallback to simple solid fill if no gradient config
      return <Path d={d} fill={fill} fillOpacity={fillOpacity} {...pathProps} />;
    }

    return (
      <>
        <defs>
          <Gradient
            config={gradientConfig}
            direction={gradientDirection}
            drawingArea={drawingArea}
            id={patternId}
          />
        </defs>
        <Path d={d} fill={`url(#${patternId})`} fillOpacity={fillOpacity} {...pathProps} />
      </>
    );
  },
);
