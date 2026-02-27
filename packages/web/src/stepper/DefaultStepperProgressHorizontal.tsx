import { memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';

import { Box } from '../layout/Box';

import { defaultProgressTimingConfig, type StepperProgressComponent } from './Stepper';

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
    progressTimingConfig,
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
    const transition = useMemo(
      () =>
        animate
          ? (progressTimingConfig ?? defaultProgressTimingConfig)
          : { type: 'tween' as const, duration: 0 },
      [animate, progressTimingConfig],
    );

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
          <motion.div
            animate={{ width: `${progress * 100}%` }}
            initial={{ width: disableAnimateOnMount ? `${progress * 100}%` : '0%' }}
            style={{
              backgroundColor: 'currentColor',
              height: '100%',
            }}
            transition={transition}
          />
        </Box>
      </Box>
    );
  },
);
