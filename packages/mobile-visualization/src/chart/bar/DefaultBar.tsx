import { memo, useEffect, useMemo } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Path as SkiaPath } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import { useD3PathInterpolation } from '../utils/animation';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps;

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
  }) => {
    const { animate } = useCartesianChartContext();
    const theme = useTheme();

    const progress = useSharedValue(0);

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

    useEffect(() => {
      if (animate) {
        progress.value = withTiming(1, { duration: 1000 });
      } else {
        progress.value = 1;
      }
    }, [progress, animate]);

    const path = useD3PathInterpolation(progress, initialPath || targetPath, targetPath);

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
