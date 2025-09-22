import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { defaultRect } from '@cbhq/cds-common/types/Rect';
import { animated, to, useSpring } from '@react-spring/web';

import { useHasMounted } from '../hooks/useHasMounted';
import { Box } from '../layout/Box';

import type { StepperProgressComponent } from './Stepper';

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
    progressSpringConfig,
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
    const [renderTick, setRenderTick] = useState(0);

    const isStepGroupActive = active || isDescendentActive;

    const isLastStep = flatStepIds[flatStepIds.length - 1] === step.id;

    useEffect(() => {
      if (!containerRef.current) return;
      const observer = new window.ResizeObserver((entries) => {
        setRenderTick((prev) => prev + 1);
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    const getFillHeight = useCallback(() => {
      const hasSubSteps = Boolean(step.subSteps?.length);
      const containerRect = containerRef.current?.getBoundingClientRect() ?? defaultRect;

      // Complete progress fill
      if (complete || (visited && !isStepGroupActive) || (!hasSubSteps && active))
        return containerRect.height;
      // Partial progress fill
      if (hasSubSteps && isDescendentActive) {
        const activeStepLabelRect = activeStepLabelElement?.getBoundingClientRect() ?? defaultRect;
        const lastSubstep = step.subSteps?.[step.subSteps.length - 1];
        const isLastSubstepActive = activeStepId === lastSubstep?.id;
        const activeStepLabelBottom = activeStepLabelRect.y + activeStepLabelRect.height;
        const halfLabelHeight = isLastSubstepActive ? 0 : 0.5 * activeStepLabelRect.height;
        return activeStepLabelBottom - containerRect.y - halfLabelHeight;
      }
      return 0;
      // renderTick is used to force a new height calculation when it changes by the observer
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      step.subSteps,
      complete,
      visited,
      isStepGroupActive,
      active,
      renderTick,
      isDescendentActive,
      activeStepLabelElement,
      activeStepId,
    ]);

    const [{ fillHeight }] = useSpring(
      () => ({
        fillHeight: getFillHeight(),
        config: progressSpringConfig,
        immediate: !animate || (disableAnimateOnMount && !hasMounted),
      }),
      [getFillHeight, animate, disableAnimateOnMount, hasMounted],
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
          <animated.div
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: 'currentColor',
              height: to([progress, fillHeight], (p, f) => `${p * f}px`),
            }}
          />
        </Box>
      </Box>
    );
  },
);
