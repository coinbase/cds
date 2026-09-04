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
    className,
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
        className={className}
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
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
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
        style={style}
        {...props}
      />
    );
  },
);
