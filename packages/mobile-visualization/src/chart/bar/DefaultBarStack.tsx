import { memo, useEffect, useMemo, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Group, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import {
  type BarTransition,
  defaultBarEnterOpacityTransition,
  defaultBarEnterTransition,
  getNormalizedStagger,
  getStackInitialClipRect,
  withStaggerDelayTransition,
} from '../utils/bar';
import {
  buildTransition,
  defaultTransition,
  getTransition,
  usePathTransition,
} from '../utils/transition';

import type { BarStackComponentProps } from './BarStack';

export type DefaultBarStackProps = BarStackComponentProps;

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultBarStack = memo<DefaultBarStackProps>(
  ({
    children,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    origin,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout, getXScale } = useCartesianChartContext();
    const isReady = !!getXScale();

    const normalizedStagger = useMemo(
      () => getNormalizedStagger(layout, x, y, drawingArea),
      [layout, x, y, drawingArea],
    );

    const enterTransition = useMemo(
      () =>
        getTransition(transitions?.enter, animate, defaultBarEnterTransition) as BarTransition | null,
      [transitions?.enter, animate],
    );
    const enterTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterTransition, normalizedStagger),
      [enterTransition, normalizedStagger],
    );
    const enterOpacityTransition = useMemo(() => {
      if (transitions?.enterOpacity === undefined && enterTransition === null) return null;

      const resolved: BarTransition | null = getTransition(
        transitions?.enterOpacity,
        animate,
        defaultBarEnterOpacityTransition,
      );

      if (!resolved) return null;

      return {
        ...resolved,
        delay: resolved.delay ?? enterTransition?.delay,
        staggerDelay: resolved.staggerDelay ?? enterTransition?.staggerDelay,
      };
    }, [transitions?.enterOpacity, animate, enterTransition]);
    const enterOpacityTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterOpacityTransition, normalizedStagger),
      [enterOpacityTransition, normalizedStagger],
    );
    const updateTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(
            transitions?.update !== undefined ? transitions.update : transition,
            animate,
            defaultTransition,
          ),
          normalizedStagger,
        ),
      [animate, transitions?.update, transition, normalizedStagger],
    );

    // Generate target clip path (full bar)
    const targetPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom, layout);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, layout]);

    // Initial clip path for entry animation (bar at baseline with minimal height)
    const initialPath = useMemo(() => {
      if (!animate) return;

      const initialClipRect = getStackInitialClipRect({ x, y, width, height }, layout, origin);

      return getBarPath(
        initialClipRect.x,
        initialClipRect.y,
        initialClipRect.width,
        initialClipRect.height,
        borderRadius,
        roundTop,
        roundBottom,
        layout,
      );
    }, [animate, layout, x, y, height, width, borderRadius, roundTop, roundBottom, origin]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
      transitions: { enter: enterTransitionWithStagger, update: updateTransition },
    });

    const staticClipPath = useMemo(
      () => Skia.Path.MakeFromSVGString(targetPath) ?? Skia.Path.Make(),
      [targetPath],
    );

    const clipPath = animate ? animatedClipPath : staticClipPath;

    const animateEnterOpacity = Boolean(enterOpacityTransitionWithStagger);
    const enterOpacity = useSharedValue(animateEnterOpacity ? 0 : 1);
    const hasAnimatedEnterOpacity = useRef(false);

    useEffect(() => {
      if (hasAnimatedEnterOpacity.current) {
        return;
      }

      if (!animateEnterOpacity) {
        hasAnimatedEnterOpacity.current = true;
        enterOpacity.value = 1;
        return;
      }

      if (!isReady) {
        return;
      }

      const opacityTransition = enterOpacityTransitionWithStagger;
      if (opacityTransition === undefined || opacityTransition === null) {
        enterOpacity.value = 1;
        hasAnimatedEnterOpacity.current = true;
        return;
      }

      hasAnimatedEnterOpacity.current = true;
      enterOpacity.value = buildTransition(1, opacityTransition);
    }, [animateEnterOpacity, isReady, enterOpacityTransitionWithStagger, enterOpacity]);

    return (
      <Group clip={clipPath} opacity={animateEnterOpacity ? enterOpacity : undefined}>
        {children}
      </Group>
    );
  },
);
