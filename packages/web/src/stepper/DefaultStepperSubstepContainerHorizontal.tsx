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
    className,
    style,
    children,
    ...props
  }) => {
    return (
      <HStack as="ol" className={className} gap={horizontalStepGap} style={style} {...props}>
        {children}
      </HStack>
    );
  },
);
