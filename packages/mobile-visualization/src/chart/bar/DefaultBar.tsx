import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Path as SkiaPath } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import { defaultTransition, type TransitionConfig, usePathTransition } from '../utils/transition';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps & {
  /**
   * Transition configuration for bar transitions.
   * Allows customization of animation type, timing, and springs.
   *
   * @example
   * // Spring animation for bouncy bars
   * transitionConfig={{ type: 'spring', damping: 10, stiffness: 100 }}
   *
   * @example
   * // Timing animation
   * transitionConfig={{ type: 'timing', duration: 500 }}
   */
  transitionConfig?: TransitionConfig;
  /**
   * Transition configuration specifically for the initial render.
   * If provided, this will be used for the first animation only.
   * Subsequent animations will use the regular transitionConfig.
   *
   * @example
   * // Slow initial animation, faster updates
   * initialTransitionConfig={{ type: 'timing', duration: 1000 }}
   * transitionConfig={{ type: 'timing', duration: 300 }}
   */
  initialTransitionConfig?: TransitionConfig;
};

/**
 * Default bar component that renders a solid bar with animation support.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    x,
    y,
    width,
    height,
    borderRadius,
    roundTop,
    roundBottom,
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    originY,
    transitionConfig = defaultTransition,
    initialTransitionConfig,
  }) => {
    const { animate } = useCartesianChartContext();
    const theme = useTheme();

    const defaultFill = fill || theme.color.fgPrimary;

    const targetPath = useMemo(() => {
      const effectiveBorderRadius = borderRadius ?? 0;
      const effectiveRoundTop = roundTop ?? true;
      const effectiveRoundBottom = roundBottom ?? true;

      return (
        d ||
        getBarPath(
          x,
          y,
          width,
          height,
          effectiveBorderRadius,
          effectiveRoundTop,
          effectiveRoundBottom,
        )
      );
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, d]);

    const initialPath = useMemo(() => {
      const effectiveBorderRadius = borderRadius ?? 0;
      const effectiveRoundTop = roundTop ?? true;
      const effectiveRoundBottom = roundBottom ?? true;
      const baselineY = originY ?? y + height;

      return getBarPath(
        x,
        baselineY,
        width,
        1,
        effectiveBorderRadius,
        effectiveRoundTop,
        effectiveRoundBottom,
      );
    }, [x, originY, y, height, width, borderRadius, roundTop, roundBottom]);

    const path = usePathTransition({
      currentPath: targetPath,
      initialPath,
      animate,
      transitionConfig,
      initialTransitionConfig,
    });

    return (
      <SkiaPath
        color={defaultFill}
        opacity={fillOpacity}
        path={path}
        strokeWidth={strokeWidth}
        style={stroke ? 'stroke' : 'fill'}
      />
    );
  },
);
