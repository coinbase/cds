import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useValueChanges } from '@coinbase/cds-common/hooks/useValueChanges';
import * as interpolate from 'd3-interpolate-path';

import { Sparkline, type SparklineFillType } from '../Sparkline';
import { SparklineArea } from '../SparklineArea';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export type SparklineInteractiveAnimatedPathProps = {
  d: string;
  color: string;
  area?: string;
  selectedPeriod: string;
  fillType?: SparklineFillType;
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
    fillType = 'gradient',
    yAxisScalingFactor,
    initialPath,
    initialArea,
  }: SparklineInteractiveAnimatedPathProps) => {
    const { isFallbackVisible, hideFallback, animateMinMaxIn, compact } =
      useSparklineInteractiveContext();
    const [animatedPathD, setAnimatedPathD] = useState(initialPath ?? d);
    const [animatedAreaD, setAnimatedAreaD] = useState(initialArea ?? area ?? '');

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
      () => interpolate.interpolatePath((previousPath ?? initialPath) as string, newPath),
      [previousPath, initialPath, newPath],
    );

    const areaInterpolator = useMemo(
      () => interpolate.interpolatePath((previousArea ?? initialArea) as string, newArea),
      [previousArea, initialArea, newArea],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        setAnimatedPathD(pathInterpolator(val));
        setAnimatedAreaD(areaInterpolator(val));
      },
      [areaInterpolator, pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      setAnimatedPathD(pathInterpolator(1));
      setAnimatedAreaD(areaInterpolator(1));
      animateMinMaxIn.start();
    }, [animateMinMaxIn, areaInterpolator, pathInterpolator]);

    const playAnimation = useInterruptiblePathAnimation({
      animationListener,
      onInterrupt: updatePathWithoutAnimation,
    });

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
      hideFallback,
      shouldUpdatePath,
      shouldUpdateArea,
      skipAnimation,
      updatePathWithoutAnimation,
      playAnimation,
      isFallbackVisible,
      addPreviousPath,
      addPreviousArea,
      newArea,
      newPath,
    ]);

    const { chartWidth, chartHeight } = useSparklineInteractiveConstants({ compact });

    return (
      <Sparkline
        color={color}
        fillType={fillType}
        height={chartHeight}
        path={animatedPathD}
        strokeType="solid"
        width={chartWidth}
        yAxisScalingFactor={yAxisScalingFactor}
      >
        {!!area && <SparklineArea area={animatedAreaD} />}
      </Sparkline>
    );
  },
);
