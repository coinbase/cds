import { memo, useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue, withTiming } from 'react-native-reanimated';
import { ClipPath, Defs, G, Path } from 'react-native-svg';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';

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
    const pathRef = useRef<Path | null>(null);
    const { animate } = useCartesianChartContext();
    const clipPathId = useId();

    const animationProgress = useSharedValue(0);

    const targetClipPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const previousClipPath = usePreviousValue(targetClipPath);

    const initialClipPath = useMemo(() => {
      return getBarPath(x, yOrigin ?? y + height, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const fromClipPath = useMemo(() => {
      if (!animate) return targetClipPath;
      return previousClipPath || initialClipPath;
    }, [animate, previousClipPath, initialClipPath, targetClipPath]);

    const clipPathInterpolator = useMemo(
      () => interpolate.interpolatePath(fromClipPath, targetClipPath),
      [fromClipPath, targetClipPath],
    );

    const updateClipPath = useCallback(
      (progress: number) => {
        const val = Number(progress.toFixed(4));
        pathRef.current?.setNativeProps({
          d: clipPathInterpolator(val),
        });
      },
      [clipPathInterpolator],
    );

    useAnimatedReaction(
      () => animationProgress.value,
      (progress) => {
        'worklet';
        runOnJS(updateClipPath)(progress);
      },
      [updateClipPath],
    );

    useEffect(() => {
      if (!pathRef.current) return;

      if (!animate) {
        pathRef.current.setNativeProps({
          d: targetClipPath,
        });
        animationProgress.value = 1;
        return;
      }

      animationProgress.value = 0;
      animationProgress.value = withTiming(1, {
        duration: 300,
      });
    }, [animate, animationProgress, targetClipPath, initialClipPath]);

    return (
      <>
        <Defs>
          <ClipPath id={clipPathId}>
            <Path ref={pathRef} d={fromClipPath} />
          </ClipPath>
        </Defs>
        <G clipPath={`url(#${clipPathId})`}>{children}</G>
      </>
    );
  },
);
