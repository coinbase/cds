import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { type Gradient, processGradient } from '../utils/gradient';

export type GradientLineProps = SharedProps &
  Omit<PathProps, 'stroke' | 'strokeOpacity' | 'strokeWidth'> & {
    /**
     * The color of the line.
     * @default theme.color.bgLine
     */
    stroke?: string;
    /**
     * Opacity of the line.
     * @default 1
     */
    strokeOpacity?: number;
    /**
     * Path stroke width
     * @default 2
     */
    strokeWidth?: number;
    /**
     * Color gradient configuration.
     * Supports smooth gradient transitions.
     * @example
     * gradient={{
     *   stops: [
     *     { offset: 0, color: 'red' },
     *     { offset: 0, color: 'green' }
     *   ]
     * }}
     */
    gradient?: Gradient;
    /**
     * Series ID to get the gradient from if not provided directly.
     * Used to retrieve the gradient scale from context.
     */
    seriesId?: string;
    /**
     * Y-axis ID to use for calculating color positions.
     * Only needed when using gradient with multiple y-axes.
     */
    yAxisId?: string;
    /**
     * Color for the outline/border around the gradient line.
     * When provided, renders a wider path underneath for the outline effect.
     * @example 'white' or '#ffffff'
     */
    outlineColor?: string;
    /**
     * Width of the outline/border.
     * Only used when outlineColor is provided.
     * @default 1
     */
    outlineWidth?: number;
  };

/**
 * A gradient line component which uses path element with Skia linear gradient shader.
 */
export const GradientLine = memo<GradientLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeOpacity = 1,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = 2,
    animate,
    gradient,
    seriesId,
    yAxisId,
    outlineColor,
    outlineWidth = 1,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const shouldAnimate = animate ?? context.animate;

    // Get scales from context
    const { height: chartHeight, getSeries } = context;

    // Get gradient from series if seriesId is provided and gradient is not
    const targetSeries = seriesId ? getSeries(seriesId) : undefined;
    const effectiveGradient = gradient ?? targetSeries?.gradient;
    const effectiveYAxisId = yAxisId ?? targetSeries?.yAxisId;

    const gradientScale = seriesId ? context.getSeriesGradientScale(seriesId) : undefined;
    const yScale = context.getYScale(effectiveYAxisId);

    // Calculate gradient configuration
    const gradientConfig = useMemo(() => {
      // Don't create gradient if chart hasn't been sized yet
      if (!chartHeight || chartHeight === 0) {
        return null;
      }

      if (!effectiveGradient) {
        console.warn('GradientLine requires a gradient prop or seriesId with gradient');
        return null;
      }

      const scale = gradientScale;
      if (!scale) {
        console.warn('Gradient requires a valid numeric scale');
        return null;
      }

      const processed = processGradient(effectiveGradient, scale);
      if (!processed) {
        return null;
      }

      const axisType = effectiveGradient.axis ?? 'y';
      const range = scale.range();

      // Determine gradient direction based on axis
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[1]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[0]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors: processed.colors,
        positions: processed.positions,
      };
    }, [chartHeight, effectiveGradient, gradientScale]);

    // Don't render if gradient couldn't be created (chart not ready yet)
    if (!gradientConfig) {
      return null;
    }

    const totalOutlineWidth = outlineColor ? outlineWidth * 2 : 0;

    return (
      <>
        {/* Render outline path first (if outlineColor is provided) */}
        {outlineColor && (
          <Path
            animate={false}
            clipOffset={strokeWidth + totalOutlineWidth}
            d={props.d}
            fill="none"
            stroke={outlineColor}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth + totalOutlineWidth}
          />
        )}
        {/* Render gradient path on top */}
        <Path
          animate={false}
          clipOffset={strokeWidth}
          fill={fill}
          stroke={stroke ?? theme.color.bgLine}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          {...props}
        >
          <LinearGradient
            colors={gradientConfig.colors}
            end={gradientConfig.end}
            positions={gradientConfig.positions ?? undefined}
            start={gradientConfig.start}
          />
        </Path>
      </>
    );
  },
);
