import { memo } from 'react';

import { Icon } from '../icons/Icon';

import type { StepperIconComponent } from './Stepper';

export const DefaultStepperIconVertical: StepperIconComponent = memo(
  function DefaultStepperIconVertical({
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
    defaultName = 'outline',
    activeName = 'outline',
    descendentActiveName = 'outline',
    visitedName = 'circleCheckmark',
    completeName = 'circleCheckmark',
    size = 's',
    defaultColor = 'bgLine',
    activeColor = 'bgLinePrimarySubtle',
    descendentActiveColor = 'bgLinePrimarySubtle',
    visitedColor = 'bgPrimary',
    completeColor = 'bgPrimary',
    ...props
  }) {
    if (depth > 0) return null;

    return (
      <Icon
        active
        color={
          complete
            ? completeColor
            : active
              ? activeColor
              : isDescendentActive
                ? descendentActiveColor
                : visited
                  ? visitedColor
                  : defaultColor
        }
        name={
          complete
            ? completeName
            : active
              ? activeName
              : isDescendentActive
                ? descendentActiveName
                : visited
                  ? visitedName
                  : defaultName
        }
        size={size}
        {...props}
      />
    );
  },
);
