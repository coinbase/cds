import { memo } from 'react';

import { HStack } from '../layout';

import type { StepperSubstepContainerComponent } from './Stepper';
import { horizontalStepGap } from './Stepper';

export const DefaultStepperSubstepContainerHorizontal: StepperSubstepContainerComponent = memo(
  ({
    step,
    parentStep,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    complete,
    isDescendentActive,
    style,
    children,
    ...props
  }) => {
    return (
      <HStack gap={horizontalStepGap} style={style} {...props}>
        {children}
      </HStack>
    );
  },
);
