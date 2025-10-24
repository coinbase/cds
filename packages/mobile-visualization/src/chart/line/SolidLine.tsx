import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { getGradientScale, type Gradient, processGradient } from '../utils/gradient';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> & {
    fill?: string;
    strokeWidth?: number;
    /**
     * Gradient configuration.
     * When provided, creates gradient or threshold-based coloring.
     */
    gradient?: Gradient;
    /**
     * Series ID - used to retrieve gradient scale from context.
     */
    seriesId?: string;
    /**
     * ID of the y-axis to use.
     */
    yAxisId?: string;
  };

/**
 * A customizable solid line component.
 * Supports gradient for gradient effects.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    gradient,
    seriesId,
    yAxisId,
    ...props
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Process gradient to get gradient configuration
    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return null;

      const scale = getGradientScale(gradient, xScale, yScale);
      if (!scale) return null;

      const processed = processGradient(gradient, scale);
      if (!processed) return null;

      const axisType = gradient.axis ?? 'y';
      const range = scale.range();

      // Determine gradient direction based on axis
      // For y-axis, we need to flip the gradient direction because y-scales are inverted
      // (higher data values have smaller pixel values, appearing at the top)
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[0]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[1]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors: processed.colors,
        positions: processed.positions,
      };
    }, [gradient, xScale, yScale]);

    const effectiveStroke = stroke ?? theme.color.fgPrimary;

    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={effectiveStroke}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      >
        {gradientConfig && (
          <LinearGradient
            colors={gradientConfig.colors}
            end={gradientConfig.end}
            positions={gradientConfig.positions ?? undefined}
            start={gradientConfig.start}
          />
        )}
      </Path>
    );
  },
);
