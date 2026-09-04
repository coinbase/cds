import { memo, useCallback, useMemo } from 'react';

import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import type { StepperLabelComponent } from './Stepper';

export const DefaultStepperLabelVertical: StepperLabelComponent = memo(
  function DefaultStepperLabelVertical({
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
    completedStepAccessibilityLabel,
    setActiveStepLabelElement,
    defaultColor = 'fgMuted',
    activeColor = 'fgPrimary',
    descendentActiveColor = 'fgPrimary',
    visitedColor = 'fgMuted',
    completeColor = 'fgMuted',
    paddingBottom = 3,
    font = depth === 0 ? 'label1' : 'label2',
    fontFamily = font,
    fontSize = font,
    fontWeight = font,
    lineHeight = font,
    textTransform,
    ...props
  }) {
    const labelElement = useMemo(
      () =>
        typeof step.label === 'string' ? (
          <Text
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
            font={font}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            numberOfLines={1}
            textTransform={textTransform}
          >
            {step.label}
          </Text>
        ) : (
          step.label
        ),
      [
        active,
        visited,
        completeColor,
        activeColor,
        isDescendentActive,
        descendentActiveColor,
        complete,
        visitedColor,
        defaultColor,
        font,
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        textTransform,
        step.label,
      ],
    );

    const registerActiveStepLabel = useCallback(
      (node: HTMLElement | null) => {
        if (!active) return;
        if (node) setActiveStepLabelElement(node);
      },
      [active, setActiveStepLabelElement],
    );

    return (
      <Box
        ref={registerActiveStepLabel}
        aria-hidden
        className={className}
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
        font={font}
        fontFamily={fontFamily}
        paddingBottom={paddingBottom}
        style={style}
        {...props}
      >
        {!!step.label && labelElement}
      </Box>
    );
  },
);
