import { memo, useId, useMemo } from 'react';
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

import type { BarStackComponentProps } from './BarStack';

export type DefaultBarStackProps = BarStackComponentProps & {
  /**
   * Custom class name for the stack group.
   */
  className?: string;
  /**
   * Custom styles for the stack group.
   */
  style?: React.CSSProperties;
};

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultBarStack = memo<DefaultBarStackProps>(
  ({
    children,
    className,
    style,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    yOrigin,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea } = useCartesianChartContext();
    const clipPathId = useId();

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

    const clipPathData = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const initialClipPathData = useMemo(() => {
      if (!shouldAnimateEnter) return undefined;
      return getBarPath(x, yOrigin ?? y + height, width, 1, borderRadius, roundTop, roundBottom);
    }, [shouldAnimateEnter, x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const animatedClipPath = usePathTransition({
      currentPath: clipPathData,
      initialPath: initialClipPathData,
      transitions: { enter: enterTransition, update: updateTransition },
    });

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            <motion.path d={animatedClipPath} />
          </clipPath>
        </defs>
        <g className={className} clipPath={`url(#${clipPathId})`} style={style}>
          {children}
        </g>
      </>
    );
  },
);
