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
    className,
    style,
    children,
    ...props
  }) => {
    return (
      <VStack as="ol" className={className} style={style} {...props}>
        {children}
      </VStack>
    );
  },
);
