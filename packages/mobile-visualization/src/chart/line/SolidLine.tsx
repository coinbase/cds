import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, Path as SkiaPath } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type PathProps } from '../Path';
import { getGradientConfig, type Gradient } from '../utils/gradient';
import { defaultTransition, type TransitionConfig, usePathTransition } from '../utils/transition';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth' | 'd'> & {
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
    d?: string;
    /**
     * Whether to animate the line.
     * Overrides the animate value from the chart context.
     */
    animate?: boolean;
    /**
     * Animation configuration for path transitions.
     * Allows customization of animation type, timing, and springs.
     *
     * @example
     * // Simple spring animation
     * transitionConfig={{ type: 'spring', damping: 10, stiffness: 100 }}
     *
     * @example
     * // Timing animation
     * transitionConfig={{ type: 'timing', duration: 500 }}
     */
    transitionConfig?: TransitionConfig;
  };

/**
 * A customizable solid line component.
 * Supports gradient for gradient effects and smooth data transitions via AnimatedPath.
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
    d,
    animate: animateProp,
    transitionConfig = defaultTransition,
    ...props
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    const currentPath = d ?? '';

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale);
    }, [gradient, xScale, yScale]);

    const path = usePathTransition({
      currentPath,
      animate: shouldAnimate,
      transitionConfig,
    });

    return (
      <SkiaPath
        color={stroke ?? theme.color.fgPrimary}
        opacity={strokeOpacity}
        path={path}
        strokeCap={strokeLinecap}
        strokeJoin={strokeLinejoin}
        strokeWidth={strokeWidth}
        style="stroke"
      >
        {gradientConfig && (
          <LinearGradient
            colors={gradientConfig.colors}
            end={gradientConfig.end}
            positions={gradientConfig.positions ?? undefined}
            start={gradientConfig.start}
          />
        )}
      </SkiaPath>
    );
  },
);
