import { memo, useId, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type ColorMap, getColorMapScale, processColorMap } from '../utils';

import type { LineComponentProps } from './Line';

export type GradientLineProps = SharedProps &
  Omit<PathProps, 'stroke' | 'strokeOpacity' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth'> & {
    /**
     * The color of the line.
     * @default 'var(--color-bgLine)'
     */
    stroke?: string;
    /**
     * Opacity of the line.
     * @default 1
     */
    strokeOpacity?: number;
    /**
     * The color of the start of the gradient.
     * @default stroke or 'var(--color-bgLine)'
     */
    startColor?: string;
    /**
     * The color of the end of the gradient.
     * @default stroke or 'var(--color-bgLine)'
     */
    endColor?: string;
    /**
     * Opacity of the start color.
     * @default strokeOpacity
     */
    startOpacity?: number;
    /**
     * Opacity of the end color.
     * @default strokeOpacity
     */
    endOpacity?: number;
    /**
     * Color mapping configuration.
     * When provided, creates gradient or threshold-based coloring.
     * Takes precedence over startColor/endColor props.
     */
    colorMap?: ColorMap;
    /**
     * Series ID to get the colorMap from if not provided directly.
     * Used to retrieve the colorMap scale from context.
     */
    seriesId?: string;
    /**
     * Y-axis ID to use for calculating color positions.
     * Only needed when using colorMap with multiple y-axes.
     */
    yAxisId?: string;
  };

/**
 * A gradient line component which uses path element with SVG linearGradient.
 */
export const GradientLine = memo<GradientLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-bgLine)',
    startColor,
    endColor,
    strokeOpacity = 1,
    startOpacity = strokeOpacity,
    endOpacity = strokeOpacity,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = 2,
    colorMap,
    seriesId,
    yAxisId,
    ...props
  }) => {
    const gradientId = useId();
    const context = useCartesianChartContext();

    // Get colorMap from series if seriesId is provided and colorMap is not
    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const effectiveColorMap = colorMap ?? targetSeries?.colorMap;
    const effectiveYAxisId = yAxisId ?? targetSeries?.yAxisId;

    // Get scales and drawing area for colorMap processing
    const xScale = context.getXScale();
    const yScale = context.getYScale(effectiveYAxisId);
    const drawingArea = context.drawingArea;

    // Calculate gradient configuration from colorMap
    const gradientConfig = useMemo(() => {
      if (!effectiveColorMap) {
        return null;
      }

      console.log('[GradientLine] Processing colorMap', {
        seriesId,
        colorMap: effectiveColorMap,
        hasXScale: !!xScale,
        hasYScale: !!yScale,
        xScaleDomain: xScale?.domain(),
        yScaleDomain: yScale?.domain(),
      });

      const scale = getColorMapScale(effectiveColorMap, xScale, yScale);
      if (!scale) {
        console.warn('[GradientLine] ColorMap requires a valid numeric or categorical scale', {
          seriesId,
          colorMap: effectiveColorMap,
          hasXScale: !!xScale,
          hasYScale: !!yScale,
        });
        return null;
      }

      console.log('[GradientLine] ColorMap scale obtained', {
        seriesId,
        scaleDomain: scale.domain(),
        scaleRange: scale.range(),
      });

      const processed = processColorMap(effectiveColorMap, scale);
      if (!processed) {
        console.warn('[GradientLine] Failed to process colorMap', { seriesId });
        return null;
      }

      console.log('[GradientLine] ColorMap processed successfully', {
        seriesId,
        config: processed,
      });

      return processed;
    }, [effectiveColorMap, xScale, yScale, seriesId]);

    // Determine gradient direction based on colorMap axis
    const gradientDirection = effectiveColorMap?.axis === 'x' ? 'horizontal' : 'vertical';

    return (
      <>
        <defs>
          {gradientConfig ? (
            <Gradient
              config={gradientConfig}
              direction={gradientDirection}
              drawingArea={drawingArea}
              id={gradientId}
            />
          ) : (
            <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={startColor ?? stroke} stopOpacity={startOpacity} />
              <stop offset="100%" stopColor={endColor ?? stroke} stopOpacity={endOpacity} />
            </linearGradient>
          )}
        </defs>
        <Path
          clipOffset={strokeWidth}
          fill={fill}
          stroke={`url(#${gradientId})`}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          {...props}
        />
      </>
    );
  },
);
