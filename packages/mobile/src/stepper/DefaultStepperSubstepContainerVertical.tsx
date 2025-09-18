import { memo } from 'react';

import { VStack } from '../layout';

import type { StepperSubstepContainerComponent } from './Stepper';

export const DefaultStepperSubstepContainerVertical: StepperSubstepContainerComponent = memo(
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
      <VStack style={style} {...props}>
        {children}
      </VStack>
    );
  },
);
