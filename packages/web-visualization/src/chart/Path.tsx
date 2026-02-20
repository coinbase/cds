import { memo, useId, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition } from 'framer-motion';

import { defaultPathEnterTransition } from './utils/path';
import { defaultTransition, getTransition, usePathTransition } from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';

/**
 * Duration in seconds for path enter transition.
 * @deprecated Use `transitions.enter` on the Path component instead.
 */
export const pathEnterTransitionDuration = 0.5;

export type PathBaseProps = SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
  /**
   * Initial path for enter animation.
   * When provided, the first animation will go from initialPath to d.
   * If not provided, defaults to d (no path enter animation).
   */
  initialPath?: string;
  /**
   * Fill color for the path.
   */
  fill?: string;
  /**
   * Opacity for the path fill.
   */
  fillOpacity?: number;
};

export type PathProps = PathBaseProps &
  Omit<
    SVGProps<SVGPathElement>,
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onAnimationStartCapture'
    | 'onAnimationEndCapture'
    | 'onAnimationIterationCapture'
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragStart'
    | 'onDragCapture'
    | 'onDragEndCapture'
    | 'onDragStartCapture'
  > & {
    /**
     * Transition configuration for enter and update animations.
     * @note Disable an animation by passing in null.
     *
     * @default transitions = {{
     *   enter: { type: 'tween', duration: 0.5 },
     *   update: { type: 'spring', stiffness: 900, damping: 120, mass: 4 }
     * }}
     *
     * @example
     * // Custom enter and update transitions
     * transitions={{ enter: { type: 'tween', duration: 0.3 }, update: { type: 'spring', damping: 20 } }}
     *
     * @example
     * // Disable enter animation
     * transitions={{ enter: null }}
     */
    transitions?: {
      /**
       * Transition for the initial enter/reveal animation.
       * Set to `null` to disable.
       */
      enter?: Transition | null;
      /**
       * Transition for subsequent data update animations.
       * Set to `null` to disable.
       */
      update?: Transition | null;
    };
    /**
     * Transition for updates.
     * @deprecated Use `transitions.update` instead.
     */
    transition?: Transition;
    /**
     * Offset added to the clip rect boundaries.
     */
    clipOffset?: number;
    /**
     * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
     * Pass null to disable clipping.
     * @default drawingArea of chart + clipOffset
     */
    clipRect?: Rect | null;
  };

const AnimatedPath = memo<
  Omit<PathProps, 'animate' | 'clipRect' | 'clipOffset' | 'transitions' | 'transition'> & {
    transitions?: { enter?: Transition; update?: Transition };
  }
>(({ d = '', initialPath, transitions, ...pathProps }) => {
  const interpolatedPath = usePathTransition({
    currentPath: d,
    initialPath,
    transitions,
  });

  return <motion.path d={interpolatedPath} {...pathProps} />;
});

export const Path = memo<PathProps>(
  ({
    animate: animateProp,
    clipRect,
    clipOffset = 0,
    d = '',
    transitions,
    transition,
    ...pathProps
  }) => {
    const clipPathId = useId();
    const context = useCartesianChartContext();
    const rect = clipRect !== undefined ? clipRect : context.drawingArea;
    const animate = animateProp ?? context.animate;

    const enterTransition = useMemo(
      () => getTransition(transitions?.enter, animate, defaultPathEnterTransition),
      [animate, transitions?.enter],
    );

    const updateTransition = useMemo(
      () =>
        getTransition(
          transitions?.update !== undefined ? transitions.update : transition,
          animate,
          defaultTransition,
        ),
      [animate, transitions?.update, transition],
    );

    // The clip offset provides extra padding to prevent path from being cut off
    // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
    const totalOffset = clipOffset * 2; // Applied on both sides

    const clipPathAnimation = useMemo(() => {
      if (rect === null) return;
      return {
        hidden: { width: 0 },
        visible: {
          width: rect.width + totalOffset,
          transition: enterTransition,
        },
      };
    }, [rect, totalOffset, enterTransition]);

    const clipPath = useMemo(
      () => (rect !== null ? `url(#${clipPathId})` : undefined),
      [rect, clipPathId],
    );

    return (
      <>
        {rect !== null && (
          <defs>
            <clipPath id={clipPathId}>
              <motion.rect
                animate="visible"
                height={rect.height + totalOffset}
                initial="hidden"
                variants={clipPathAnimation}
                x={rect.x - clipOffset}
                y={rect.y - clipOffset}
              />
            </clipPath>
          </defs>
        )}
        <AnimatedPath
          clipPath={clipPath}
          d={d}
          transitions={{ enter: enterTransition, update: updateTransition }}
          {...pathProps}
        />
      </>
    );
  },
);
