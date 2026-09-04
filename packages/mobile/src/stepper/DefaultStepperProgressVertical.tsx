import { memo, useCallback, useEffect, useMemo } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { flattenSteps } from '@coinbase/cds-common/stepper/utils';

import { Box } from '../layout/Box';

import type { StepperProgressComponent, StepperValue } from './Stepper';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const DefaultStepperProgressVertical: StepperProgressComponent = memo(
  function DefaultStepperProgressVertical({
    step,
    parentStep,
    activeStepId,
    progress,
    depth,
    active,
    visited,
    flatStepIds,
    complete,
    isDescendentActive,
    style,
    activeStepLabelElement,
    progressTimingConfig,
    background = 'bgLine',
    defaultFill = 'bgLinePrimarySubtle',
    activeFill = 'bgLinePrimarySubtle',
    descendentActiveFill = 'bgLinePrimarySubtle',
    visitedFill = 'bgPrimary',
    completeFill = 'bgPrimary',
    minHeight = 16,
    width = 2,
    ...props
  }) {
    const isLastStep = flatStepIds[flatStepIds.length - 1] === step.id;

    // Count the total number of sub-steps in the current step's tree
    const countAllSubSteps = useCallback((steps: StepperValue[]): number => {
      const flatSteps = flattenSteps(steps);
      return flatSteps.length;
    }, []);

    // Find the position of a target step in the flattened substep tree (1-based index)
    const findSubStepPosition = useCallback(
      (steps: StepperValue[], targetId: string | null): number => {
        if (!targetId) return -1;
        const flatSteps = flattenSteps(steps);
        const stepIndex = flatSteps.findIndex((step) => step.id === targetId);
        return stepIndex + 1;
      },
      [],
    );

    // Fractional fill for steps with sub-steps. For all other cases, return 1
    // and let the cascade's `progress` prop control whether the bar is filled.
    const progressHeight = useMemo(() => {
      const totalSubSteps = countAllSubSteps(step.subSteps ?? []);

      if (active && totalSubSteps > 0 && !isDescendentActive) return 0;
      if (isDescendentActive && totalSubSteps > 0) {
        const activePosition = findSubStepPosition(step.subSteps ?? [], activeStepId);
        return activePosition / totalSubSteps;
      }

      return 1;
    }, [
      countAllSubSteps,
      step.subSteps,
      active,
      isDescendentActive,
      findSubStepPosition,
      activeStepId,
    ]);

    const containerHeight = useSharedValue(0);
    const targetHeight = progress * progressHeight;
    const animatedHeight = useSharedValue(targetHeight);

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerHeight.value = event.nativeEvent.layout.height;
      },
      [containerHeight],
    );

    useEffect(() => {
      animatedHeight.value = withTiming(targetHeight, progressTimingConfig);
    }, [targetHeight, progressTimingConfig, animatedHeight]);

    const animatedStyle = useAnimatedStyle(() => ({
      height: animatedHeight.value * containerHeight.value,
    }));

    if (depth > 0 || isLastStep) return null;

    return (
      <Box
        background={background}
        flexGrow={1}
        minHeight={minHeight}
        onLayout={handleLayout}
        position="relative"
        style={style}
        width={width}
        {...props}
      >
        <AnimatedBox
          background={
            complete
              ? completeFill
              : active
                ? activeFill
                : isDescendentActive
                  ? descendentActiveFill
                  : visited
                    ? visitedFill
                    : defaultFill
          }
          position="absolute"
          style={animatedStyle}
          width="100%"
        />
      </Box>
    );
  },
);
