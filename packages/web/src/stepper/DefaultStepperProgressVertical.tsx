import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultRect } from '@coinbase/cds-common/types/Rect';
import { m as motion } from 'framer-motion';

import { Box } from '../layout/Box';

import { defaultProgressTimingConfig, type StepperProgressComponent } from './Stepper';

export const DefaultStepperProgressVertical: StepperProgressComponent = memo(
  function DefaultStepperProgressVertical({
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
    activeStepLabelElement,
    progressTimingConfig = defaultProgressTimingConfig,
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
    progress,
    ...props
  }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [fillHeight, setFillHeight] = useState(0);
    const [hasReceivedFillHeight, setHasReceivedFillHeight] = useState(false);

    const isStepGroupActive = active || isDescendentActive;

    const isLastStep = flatStepIds[flatStepIds.length - 1] === step.id;

    const recalculateFillHeight = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;
      const hasSubSteps = Boolean(step.subSteps?.length);
      const containerRect = container.getBoundingClientRect();

      let height: number;
      if (complete || (visited && !isStepGroupActive) || (!hasSubSteps && active)) {
        height = containerRect.height;
      } else if (hasSubSteps && isDescendentActive) {
        const activeStepLabelRect = activeStepLabelElement?.getBoundingClientRect() ?? defaultRect;
        const lastSubstep = step.subSteps?.[step.subSteps.length - 1];
        const isLastSubstepActive = activeStepId === lastSubstep?.id;
        const activeStepLabelBottom = activeStepLabelRect.y + activeStepLabelRect.height;
        const halfLabelHeight = isLastSubstepActive ? 0 : 0.5 * activeStepLabelRect.height;
        height = activeStepLabelBottom - containerRect.y - halfLabelHeight;
      } else {
        height = 0;
      }
      setFillHeight(height);
      if (height) setHasReceivedFillHeight(true);
    }, [
      step.subSteps,
      complete,
      visited,
      isStepGroupActive,
      active,
      isDescendentActive,
      activeStepLabelElement,
      activeStepId,
    ]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const observer = new window.ResizeObserver(recalculateFillHeight);
      observer.observe(container);
      return () => observer.disconnect();
    }, [recalculateFillHeight]);

    const animatedHeight = progress * fillHeight;
    const transition = useMemo(
      () => (animate ? progressTimingConfig : { type: 'tween' as const, duration: 0 }),
      [animate, progressTimingConfig],
    );

    if (depth > 0 || isLastStep) return null;

    return (
      <Box
        ref={containerRef}
        background={background}
        className={className}
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
        flexGrow={1}
        minHeight={minHeight}
        position="relative"
        style={style}
        width={width}
        {...props}
      >
        <Box
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
        >
          {disableAnimateOnMount && !hasReceivedFillHeight ? (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: animatedHeight,
                backgroundColor: 'currentColor',
              }}
            />
          ) : (
            <motion.div
              animate={{ height: animatedHeight }}
              initial={{ height: disableAnimateOnMount ? animatedHeight : 0 }}
              style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: 'currentColor',
              }}
              transition={transition}
            />
          )}
        </Box>
      </Box>
    );
  },
);
