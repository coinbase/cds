import { memo, useId, useMemo, useRef } from 'react';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath, instantTransition } from '../utils';

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
    const { animate } = useCartesianChartContext();
    const clipPathId = useId();
    const isInitialRender = useRef(true);

    const shouldAnimateEnter = animate && transitions?.enter !== null;

    const resolvedEnterTransition =
      !animate || transitions?.enter === null ? instantTransition : transitions?.enter;
    const resolvedUpdateTransition =
      !animate || transitions?.update === null
        ? instantTransition
        : (transitions?.update ?? transition);

    const clipPathData = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const initialClipPathData = useMemo(() => {
      if (!shouldAnimateEnter) return undefined;
      return getBarPath(x, yOrigin ?? y + height, width, 1, borderRadius, roundTop, roundBottom);
    }, [shouldAnimateEnter, x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const activeTransition =
      isInitialRender.current && shouldAnimateEnter
        ? (resolvedEnterTransition ?? resolvedUpdateTransition)
        : resolvedUpdateTransition;

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            <motion.path
              animate={{ d: clipPathData }}
              initial={initialClipPathData ? { d: initialClipPathData } : false}
              onAnimationComplete={() => {
                isInitialRender.current = false;
              }}
              transition={activeTransition}
            />
          </clipPath>
        </defs>
        <g className={className} clipPath={`url(#${clipPathId})`} style={style}>
          {children}
        </g>
      </>
    );
  },
);
