import React, { memo, useMemo, useRef } from 'react';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath, instantTransition } from '../utils';

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
    seriesId,
    transitions,
    transition,
    ...props
  }) => {
    const { animate } = useCartesianChartContext();
    const isInitialRender = useRef(true);

    const shouldAnimateEnter = animate && transitions?.enter !== null;

    const resolvedEnterTransition =
      !animate || transitions?.enter === null ? instantTransition : transitions?.enter;
    const resolvedUpdateTransition =
      !animate || transitions?.update === null
        ? instantTransition
        : (transitions?.update ?? transition);

    const initialPath = useMemo(() => {
      if (!shouldAnimateEnter) return undefined;
      // Need a minimum height to allow for animation
      const minHeight = 1;
      const initialY = (originY ?? 0) - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, !!roundTop, !!roundBottom);
    }, [shouldAnimateEnter, x, originY, width, borderRadius, roundTop, roundBottom]);

    // On initial render with enter enabled, use enter transition.
    // On subsequent renders, use update transition.
    const activeTransition =
      isInitialRender.current && shouldAnimateEnter
        ? (resolvedEnterTransition ?? resolvedUpdateTransition)
        : resolvedUpdateTransition;

    return (
      <motion.path
        {...props}
        animate={{ d }}
        fill={fill}
        fillOpacity={fillOpacity}
        initial={initialPath ? { d: initialPath } : false}
        onAnimationComplete={() => {
          isInitialRender.current = false;
        }}
        transition={activeTransition}
      />
    );
  },
);
