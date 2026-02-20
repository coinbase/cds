import React, { memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import {
  defaultBarEnterTransition,
  defaultTransition,
  getBarPath,
  getTransition,
  withStaggerDelayTransition,
} from '../utils';
import { usePathTransition } from '../utils/transition';

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
    const { animate, drawingArea } = useCartesianChartContext();

    // Compute normalized x position for stagger delay calculation
    const normalizedX = drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0;

    const shouldAnimateEnter = animate && transitions?.enter !== null;

    const enterTransition = withStaggerDelayTransition(
      getTransition(transitions?.enter, animate, defaultBarEnterTransition),
      normalizedX,
    );
    const updateTransition = withStaggerDelayTransition(
      getTransition(
        transitions?.update !== undefined ? transitions.update : transition,
        animate,
        defaultTransition,
      ),
      normalizedX,
    );

    const initialPath = useMemo(() => {
      if (!shouldAnimateEnter) return undefined;
      const minHeight = 1;
      const initialY = (originY ?? 0) - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, !!roundTop, !!roundBottom);
    }, [shouldAnimateEnter, x, originY, width, borderRadius, roundTop, roundBottom]);

    const animatedPath = usePathTransition({
      currentPath: d ?? '',
      initialPath,
      transitions: { enter: enterTransition, update: updateTransition },
    });

    return <motion.path {...props} d={animatedPath} fill={fill} fillOpacity={fillOpacity} />;
  },
);
