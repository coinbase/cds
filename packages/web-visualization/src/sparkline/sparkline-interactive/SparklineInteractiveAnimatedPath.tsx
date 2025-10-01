import 'd3-transition'; // Important! do not remove this, it sets up the linkage so you can use select().transition()

import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { animatedPathConfig } from '@coinbase/cds-common/animation/sparkline';
import { useValueChanges } from '@coinbase/cds-common/hooks/useValueChanges';
import { interpolatePath } from 'd3-interpolate-path';
import { select } from 'd3-selection';

import { SparklineArea } from '../SparklineArea';
import { SparklineGradient } from '../SparklineGradient';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

const { duration, easing } = animatedPathConfig;

export type SparklineInteractiveAnimatedPathProps = {
  d: string;
  color: string;
  area?: string;
  selectedPeriod: string;
  yAxisScalingFactor?: number;
  initialPath?: string;
  initialArea?: string;
};

export const SparklineInteractiveAnimatedPath = memo(
  ({
    d = '',
    color,
    selectedPeriod,
    area,
    yAxisScalingFactor,
    initialPath,
    initialArea,
  }: SparklineInteractiveAnimatedPathProps) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const areaRef = useRef<SVGPathElement | null>(null);
    const { chartWidth, chartHeight } = useSparklineInteractiveConstants();
    const { isFallbackVisible, hideFallback } = useSparklineInteractiveContext();

    // Only tween animation on period changes
    const { hasNotChanged: skipAnimation, addPreviousValue: addPreviousPeriod } =
      useValueChanges(selectedPeriod);

    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
      addPreviousValue: addPreviousPath,
    } = useValueChanges(d);

    const {
      previousValue: previousArea,
      newValue: newArea,
      hasChanged: shouldUpdateArea,
      addPreviousValue: addPreviousArea,
    } = useValueChanges(area ?? '');

    const pathInterpolator = useMemo(
      () => interpolatePath((previousPath ?? initialPath) as string, newPath),
      [previousPath, initialPath, newPath],
    );

    const areaInterpolator = useMemo(
      () => interpolatePath((previousArea ?? initialArea) as string, newArea),
      [previousArea, initialArea, newArea],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      select(pathRef.current).attr('d', pathInterpolator(1));
      select(areaRef.current).attr('d', areaInterpolator(1));
    }, [areaInterpolator, pathInterpolator]);

    const playAnimation = useCallback(() => {
      select(pathRef.current)
        .transition()
        .duration(duration)
        .ease(easing)
        .attrTween('d', function tween() {
          const previous = select(this).attr('d');

          const current = d;
          return interpolatePath(previous ?? initialPath, current);
        });

      if (area) {
        select(areaRef.current)
          .transition()
          .duration(duration)
          .ease(easing)
          .attrTween('d', function tween() {
            const previous = select(this).attr('d');
            const current = area;
            return interpolatePath(previous ?? initialArea, current);
          });
      }
    }, [area, d, initialArea, initialPath]);

    useEffect(() => {
      addPreviousPeriod(selectedPeriod);
    }, [addPreviousPeriod, selectedPeriod]);

    useEffect(() => {
      // only update these values when they are used
      addPreviousArea(newArea);
      addPreviousPath(newPath);

      if (shouldUpdatePath) {
        if (isFallbackVisible) {
          hideFallback();
          updatePathWithoutAnimation();
        } else if (skipAnimation) {
          updatePathWithoutAnimation();
        } else {
          playAnimation();
        }
      } else if (shouldUpdateArea) {
        updatePathWithoutAnimation();
      }
    }, [
      addPreviousArea,
      addPreviousPath,
      hideFallback,
      isFallbackVisible,
      newArea,
      newPath,
      playAnimation,
      shouldUpdateArea,
      shouldUpdatePath,
      skipAnimation,
      updatePathWithoutAnimation,
    ]);

    return (
      <SparklineGradient
        ref={pathRef}
        color={color}
        height={chartHeight}
        width={chartWidth}
        yAxisScalingFactor={yAxisScalingFactor}
      >
        {!!area && <SparklineArea ref={areaRef} />}
      </SparklineGradient>
    );
  },
);
