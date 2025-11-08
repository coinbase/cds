import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import type { AnimatedProp } from '@shopify/react-native-skia';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type GradientDefinition } from '../utils/gradient';
import { type TransitionConfig } from '../utils/transition';

/**
 * Shared props for line component implementations.
 * Used by SolidLine, DottedLine, and other line variants.
 */
export type LineComponentProps = {
  d: AnimatedProp<string>;
  stroke: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  testID?: string;
  clipPath?: string;
  /**
   * ID of the y-axis to use.
   * Required for components that need to map data values to pixel positions.
   */
  yAxisId?: string;
  /**
   * Color mapping configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
  /**
   * Transition configuration for line animations.
   * Defines how the line transitions when data changes.
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

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth' | 'd'> &
  LineComponentProps & {
    fill?: string;
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
    yAxisId,
    d,
    animate,
    transitionConfig,
    ...props
  }) => {
    const theme = useTheme();

    return (
      <Path
        animate={animate}
        clipOffset={strokeWidth}
        d={d}
        fill={fill}
        stroke={stroke ?? theme.color.fgPrimary}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        transitionConfigs={transitionConfig ? { update: transitionConfig } : undefined}
        {...props}
      >
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
