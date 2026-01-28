import { memo, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import { animated, useSpring } from '@react-spring/web';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import type { StepperLabelComponent } from './Stepper';

const AnimatedBox = animated(Box);

const displayStyle = {
  phone: 'none',
  tablet: 'flex',
  desktop: 'flex',
} as const;

export const DefaultStepperLabelHorizontal: StepperLabelComponent = memo(
  function DefaultStepperLabelHorizontal({
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
    activeColor = 'fg',
    descendentActiveColor = 'fg',
    visitedColor = 'fgMuted',
    completeColor = 'fgMuted',
    display = displayStyle,
    alignItems = 'center',
    width = '100%',
    font = 'caption',
    fontFamily = font,
    fontSize = font,
    fontWeight = font,
    lineHeight = font,
    textTransform,
    ...props
  }) {
    const isStepGroupActive = active || isDescendentActive;

    const [paginationRef, { width: paginationWidth }] = useMeasure();
    const paginationSpring = useSpring({
      opacity: isStepGroupActive && !complete && !visited ? 1 : 0,
    });
    const labelSpring = useSpring({
      left: isStepGroupActive && !complete && !visited ? paginationWidth : 0,
    });

    const flatStepIndex = flatStepIds.indexOf(step.id);

    const fontProps = useMemo(
      () => ({ font, fontFamily, fontSize, fontWeight, lineHeight, textTransform }),
      [font, fontFamily, fontSize, fontWeight, lineHeight, textTransform],
    );

    const paginationText = useMemo(
      () => (
        <Text color={defaultColor} paddingEnd={1} {...fontProps}>
          {flatStepIndex + 1}/{flatStepIds.length}
        </Text>
      ),
      [flatStepIndex, flatStepIds.length, defaultColor, fontProps],
    );

    const labelElement = useMemo(() => {
      if (!step.label) return null;
      return typeof step.label === 'string' ? (
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
          numberOfLines={1}
          {...fontProps}
        >
          {step.label}
        </Text>
      ) : (
        step.label
      );
    }, [
      step.label,
      complete,
      active,
      isDescendentActive,
      descendentActiveColor,
      visited,
      defaultColor,
      activeColor,
      visitedColor,
      completeColor,
      fontProps,
    ]);

    return (
      <HStack
        aria-hidden
        alignItems={alignItems}
        className={className}
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
        display={display}
        font={font}
        fontFamily={fontFamily}
        position="relative"
        style={style}
        width={width}
        {...props}
      >
        <AnimatedBox ref={paginationRef} paddingEnd={1} style={paginationSpring}>
          {paginationText}
        </AnimatedBox>
        <AnimatedBox
          maxWidth={`calc(100% - ${paginationWidth}px)`}
          position="absolute"
          style={labelSpring}
          width="100%"
        >
          {labelElement}
        </AnimatedBox>
      </HStack>
    );
  },
);
