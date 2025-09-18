import { memo } from 'react';
import { animated, to } from '@react-spring/native';

import { Box } from '../layout/Box';

import type { StepperProgressComponent } from './Stepper';

const AnimatedBox = animated(Box);

export const DefaultStepperProgressHorizontal: StepperProgressComponent = memo(
  function DefaultStepperProgressHorizontal({
    step,
    parentStep,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    progress,
    complete,
    isDescendentActive,
    progressSpringConfig,
    animate,
    disableAnimateOnMount,
    style,
    background = 'bgLine',
    defaultFill = 'bgPrimary',
    activeFill = 'bgPrimary',
    descendentActiveFill = 'bgPrimary',
    visitedFill = 'bgLinePrimarySubtle',
    completeFill = 'bgLinePrimarySubtle',
    borderRadius = 200,
    height = 4,
    ...props
  }) {
    return (
      <Box
        accessibilityElementsHidden
        background={background}
        borderRadius={borderRadius}
        flexGrow={1}
        height={height}
        style={style}
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
          borderRadius={borderRadius}
          height="100%"
          width={to([progress], (width) => `${width * 100}%`)}
        />
      </Box>
    );
  },
);
