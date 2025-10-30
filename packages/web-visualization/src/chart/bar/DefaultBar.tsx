import React, { memo, useMemo } from 'react';
import { useHasMounted } from '@coinbase/cds-common/hooks/useHasMounted';
import { m as motion, type Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { defaultTransition, getBarPath } from '../utils';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps & {
  /**
   * Custom class name for the bar.
   */
  className?: string;
  /**
   * Custom styles for the bar.
   */
  style?: React.CSSProperties;
  /**
   * Transition configurations for different animation phases.
   * Allows separate control over enter and update animations.
   *
   * @example
   * // Slow enter, fast update
   * transitionConfigs={{
   *   enter: { type: 'spring', duration: 1.5 },
   *   update: { type: 'tween', duration: 0.3 }
   * }}
   *
   * @example
   * // Bouncy enter only
   * transitionConfigs={{
   *   enter: { type: 'spring', damping: 10, stiffness: 100 }
   * }}
   */
  transitionConfigs?: {
    /**
     * Transition used when the bar first enters/mounts.
     */
    enter?: Transition;
    /**
     * Transition used when the bar's properties update.
     */
    update?: Transition;
  };
};

/**
 * Default bar component that renders a solid bar with animation.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    x,
    width,
    borderRadius = 4,
    roundTop,
    roundBottom,
    originY,
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    dataX,
    dataY,
    transitionConfigs,
    ...props
  }) => {
    const hasMounted = useHasMounted();
    const { animate } = useCartesianChartContext();

    const initialPath = useMemo(() => {
      if (!animate) return undefined;
      // Need a minimum height to allow for animation
      const minHeight = 1;
      const initialY = (originY ?? 0) - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, !!roundTop, !!roundBottom);
    }, [animate, x, originY, width, borderRadius, roundTop, roundBottom]);

    const transition = useMemo(() => {
      if (!hasMounted && transitionConfigs?.enter) return transitionConfigs.enter;
      return transitionConfigs?.update ?? defaultTransition;
    }, [hasMounted, transitionConfigs]);

    if (animate && initialPath) {
      return (
        <motion.path
          {...props}
          animate={{ d }}
          fill={fill}
          fillOpacity={fillOpacity}
          initial={{ d: initialPath }}
          transition={transition}
        />
      );
    }

    return <path {...props} d={d} fill={fill} fillOpacity={fillOpacity} />;
  },
);
