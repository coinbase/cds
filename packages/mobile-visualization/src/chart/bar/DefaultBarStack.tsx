import { memo, useEffect, useMemo } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import { useD3PathInterpolation } from '../utils/animation';

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
    yOrigin,
  }) => {
    const { animate } = useCartesianChartContext();

    const progress = useSharedValue(0);

    // Generate target clip path (full bar)
    const targetPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    // Initial clip path for entry animation (bar at baseline with minimal height)
    const initialPath = useMemo(() => {
      const baselineY = yOrigin ?? y + height;
      return getBarPath(x, baselineY, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    useEffect(() => {
      if (animate) {
        progress.value = withTiming(1, { duration: 1000 });
      } else {
        progress.value = 1;
      }
    }, [progress, animate]);

    const clipPath = useD3PathInterpolation(progress, initialPath || targetPath, targetPath);

    return <Group clip={clipPath}>{children}</Group>;
  },
);
