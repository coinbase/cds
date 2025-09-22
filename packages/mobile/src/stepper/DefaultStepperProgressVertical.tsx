import { memo, useCallback, useMemo } from 'react';
import { useHasMounted } from '@cbhq/cds-common/hooks/useHasMounted';
import { flattenSteps } from '@cbhq/cds-common/stepper/utils';
import { animated, to, useSpring } from '@react-spring/native';

import { Box } from '../layout/Box';

import type { StepperProgressComponent, StepperValue } from './Stepper';

const AnimatedBox = animated(Box);

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
    progressSpringConfig,
    animate = true,
    disableAnimateOnMount,
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
    const hasMounted = useHasMounted();
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

    const progressHeight = useMemo(() => {
      const totalSubSteps = countAllSubSteps(step.subSteps ?? []);

      if (complete) return 1;
      if (active && totalSubSteps === 0) return 1;
      if (active && !isDescendentActive) return 0;
      if (isDescendentActive) {
        const activePosition = findSubStepPosition(step.subSteps ?? [], activeStepId);
        return activePosition / totalSubSteps;
      }
      if (visited) return 1;

      return 0;
    }, [
      countAllSubSteps,
      step.subSteps,
      complete,
      active,
      isDescendentActive,
      visited,
      findSubStepPosition,
      activeStepId,
    ]);

    const fillHeightSpring = useSpring({
      height: progressHeight,
      immediate: !animate || (disableAnimateOnMount && !hasMounted),
      config: progressSpringConfig,
    });

    if (depth > 0 || isLastStep) return null;

    return (
      <Box
        background={background}
        flexGrow={1}
        minHeight={minHeight}
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
          height={to([progress, fillHeightSpring.height], (p, h) => `${p * h * 100}%`)}
          position="absolute"
          width="100%"
        />
      </Box>
    );
  },
);
