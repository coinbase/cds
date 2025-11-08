import { memo } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type GradientDefinition } from '../utils/gradient';
import { type TransitionConfig } from '../utils/transition';

/**
 * Shared props for area component implementations.
 * Used by SolidArea, DottedArea, GradientArea, and other area variants.
 */
export type AreaComponentProps = {
  d: string;
  fill: string;
  fillOpacity?: number;
  clipRect?: Rect;
  stroke?: string;
  strokeWidth?: number;
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
  /**
   * Transition configuration for area animations.
   * Defines how the area transitions when data changes.
   *
   * @example
   * // Spring animation
   * transitionConfig={{ type: 'spring', damping: 10, stiffness: 100 }}
   *
   * @example
   * // Timing animation
   * transitionConfig={{ type: 'timing', duration: 500 }}
   */
  transitionConfig?: TransitionConfig;
};

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill (no automatic fade).
 */
export const SolidArea = memo<SolidAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    clipRect,
    gradient: gradientProp,
    yAxisId,
    animate,
    transitionConfig,
    gradient,
    ...props
  }) => {
    const theme = useTheme();

    return (
      <Path
        animate={animate}
        clipRect={clipRect}
        d={d}
        fill={fill ?? theme.color.fgPrimary}
        fillOpacity={fillOpacity}
        transitionConfigs={transitionConfig ? { update: transitionConfig } : undefined}
        {...props}
      >
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
