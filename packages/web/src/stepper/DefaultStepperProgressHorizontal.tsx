import { memo } from 'react';
import { animated } from '@react-spring/web';

import { Box } from '../layout/Box';

import type { StepperProgressComponent } from './Stepper';

export const DefaultStepperProgressHorizontal: StepperProgressComponent = memo(
  function DefaultStepperProgressHorizontal({
    step,
    parentStep,
    progress,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    complete,
    isDescendentActive,
    progressSpringConfig,
    activeStepLabelElement,
    animate,
    disableAnimateOnMount,
    className,
    style,
    background = 'bgLine',
    defaultFill = 'bgPrimary',
    activeFill = 'bgPrimary',
    descendentActiveFill = 'bgPrimary',
    visitedFill = 'bgLinePrimarySubtle',
    completeFill = 'bgLinePrimarySubtle',
    width = '100%',
    borderRadius = 200,
    height = 4,
    ...props
  }) {
    return (
      <Box
        background={background}
        borderRadius={borderRadius}
        className={className}
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
        height={height}
        style={style}
        width={width}
        {...props}
      >
        <Box
          borderRadius={borderRadius}
          color={
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
          height="100%"
          overflow="hidden"
          width="100%"
        >
          <animated.div
            style={{
              backgroundColor: 'currentColor',
              width: progress.to((p) => `${p * 100}%`),
            }}
          />
        </Box>
      </Box>
    );
  },
);
