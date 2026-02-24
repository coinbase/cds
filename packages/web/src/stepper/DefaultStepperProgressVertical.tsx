import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { defaultRect } from '@coinbase/cds-common/types/Rect';
import { m as motion } from 'framer-motion';

import { useHasMounted } from '../hooks/useHasMounted';
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
    const hasMounted = useHasMounted();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [resizeDependency, setResizeDependency] = useState(0);

    const isStepGroupActive = active || isDescendentActive;

    const isLastStep = flatStepIds[flatStepIds.length - 1] === step.id;

    useEffect(() => {
      if (!containerRef.current) return;
      const observer = new window.ResizeObserver(() => {
        setResizeDependency((prev) => prev + 1);
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    const fillHeight = useMemo(() => {
      void resizeDependency;
      const hasSubSteps = Boolean(step.subSteps?.length);
      const containerRect = containerRef.current?.getBoundingClientRect() ?? defaultRect;

      if (complete || (visited && !isStepGroupActive) || (!hasSubSteps && active))
        return containerRect.height;
      if (hasSubSteps && isDescendentActive) {
        const activeStepLabelRect = activeStepLabelElement?.getBoundingClientRect() ?? defaultRect;
        const lastSubstep = step.subSteps?.[step.subSteps.length - 1];
        const isLastSubstepActive = activeStepId === lastSubstep?.id;
        const activeStepLabelBottom = activeStepLabelRect.y + activeStepLabelRect.height;
        const halfLabelHeight = isLastSubstepActive ? 0 : 0.5 * activeStepLabelRect.height;
        return activeStepLabelBottom - containerRect.y - halfLabelHeight;
      }
      return 0;
    }, [
      step.subSteps,
      complete,
      visited,
      isStepGroupActive,
      active,
      isDescendentActive,
      activeStepLabelElement,
      activeStepId,
      resizeDependency,
    ]);

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
          {disableAnimateOnMount && !hasMounted ? (
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
