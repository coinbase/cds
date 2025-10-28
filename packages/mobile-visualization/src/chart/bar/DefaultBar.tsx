import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Path as SkiaPath } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import {
  defaultAnimationConfig,
  type PathAnimationConfig,
  usePathAnimation,
} from '../utils/animation';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps & {
  /**
   * Animation configuration for bar transitions.
   * Allows customization of animation type, timing, springs, delays, and chaining.
   *
   * @example
   * // Spring animation for bouncy bars
   * animationConfig={{ type: 'spring', config: { damping: 10 } }}
   *
   * @example
   * // Delayed timing animation
   * animationConfig={{
   *   type: 'delay',
   *   delayMs: 100,
   *   then: { type: 'timing', config: { duration: 500 } }
   * }}
   */
  animationConfig?: PathAnimationConfig;
  /**
   * Animation configuration specifically for the initial render.
   * If provided, this will be used for the first animation only.
   * Subsequent animations will use the regular animationConfig.
   *
   * @example
   * // Slow initial animation, faster updates
   * initialAnimationConfig={{ type: 'timing', config: { duration: 1000 } }}
   * animationConfig={{ type: 'timing', config: { duration: 300 } }}
   */
  initialAnimationConfig?: PathAnimationConfig;
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
    animationConfig = defaultAnimationConfig,
    initialAnimationConfig,
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

    const path = usePathAnimation({
      currentPath: targetPath,
      initialPath,
      animate,
      animationConfig,
      initialAnimationConfig,
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
