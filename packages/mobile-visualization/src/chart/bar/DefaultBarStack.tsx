import { memo, useMemo } from 'react';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import { usePathTransition } from '../utils/transition';

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
    transition,
  }) => {
    const { animate } = useCartesianChartContext();

    // Generate target clip path (full bar)
    const targetPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    // Initial clip path for entry animation (bar at baseline with minimal height)
    const initialPath = useMemo(() => {
      const baselineY = yOrigin ?? y + height;
      return getBarPath(x, baselineY, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
      transition,
    });

    const clipPath = animate ? animatedClipPath : targetPath;

    return <Group clip={clipPath}>{children}</Group>;
  },
);
