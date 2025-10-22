import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { type ColorMap, getColorMapScale, processColorMap } from '../utils/colorMap';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> & {
    fill?: string;
    strokeWidth?: number;
    /**
     * Color mapping configuration.
     * When provided, creates gradient or threshold-based coloring.
     */
    colorMap?: ColorMap;
    /**
     * Series ID - used to retrieve colorMap scale from context.
     */
    seriesId?: string;
    /**
     * ID of the y-axis to use.
     */
    yAxisId?: string;
  };

/**
 * A customizable dotted line component.
 * Supports colorMap for gradient effects on the dots.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    colorMap,
    seriesId,
    yAxisId,
    ...props
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Process colorMap to get gradient configuration
    const gradientConfig = useMemo(() => {
      if (!colorMap || !xScale || !yScale) return null;

      const scale = getColorMapScale(colorMap, xScale, yScale);
      if (!scale) return null;

      const processed = processColorMap(colorMap, scale);
      if (!processed) return null;

      const axisType = colorMap.axis ?? 'y';
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
    }, [colorMap, xScale, yScale]);

    const effectiveStroke = stroke ?? theme.color.bgLine;

    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={gradientConfig ? undefined : effectiveStroke}
        strokeDasharray={strokeDasharray}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        vectorEffect={vectorEffect}
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
