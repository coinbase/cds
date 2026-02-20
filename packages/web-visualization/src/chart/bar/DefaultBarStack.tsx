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

    const normalizedX = useMemo(
      () => (drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0),
      [x, drawingArea.x, drawingArea.width],
    );

    const enterTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(transitions?.enter, animate, defaultBarEnterTransition),
          normalizedX,
        ),
      [animate, transitions?.enter, normalizedX],
    );
    const updateTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(
            transitions?.update !== undefined ? transitions.update : transition,
            animate,
            defaultTransition,
          ),
          normalizedX,
        ),
      [animate, transitions?.update, transition, normalizedX],
    );

    const targetPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const initialPath = useMemo(() => {
      const baselineY = yOrigin ?? y + height;
      return getBarPath(x, baselineY, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
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
