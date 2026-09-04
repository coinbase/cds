import { memo, useCallback, useMemo } from 'react';
import type { AccessibilityState, View } from 'react-native';

import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import type { StepperLabelProps } from './Stepper';

export const DefaultStepperLabelVertical = memo(function DefaultStepperLabelVertical({
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
  ...props
}: StepperLabelProps) {
  const flatStepIndex = flatStepIds.indexOf(step.id);

  const accessibilityLabel = useMemo(() => {
    const pagination = `${flatStepIndex + 1} of ${flatStepIds.length}`;
    const stepLabel = typeof step.label === 'string' ? step.label : null;
    const baseLabel = step.accessibilityLabel ?? stepLabel ?? `Step ${flatStepIndex + 1}`;
    return `${baseLabel}${
      visited || complete ? ` (${completedStepAccessibilityLabel})` : ''
    } ${pagination}`;
  }, [
    step.accessibilityLabel,
    step.label,
    flatStepIndex,
    visited,
    complete,
    flatStepIds.length,
    completedStepAccessibilityLabel,
  ]);

  const accessibilityState: AccessibilityState = useMemo(
    () => ({
      selected: active,
    }),
    [active],
  );

  const registerActiveStepLabel = useCallback(
    (node: View | null) => {
      if (!active) return;
      if (node) setActiveStepLabelElement(node);
    },
    [active, setActiveStepLabelElement],
  );

  return (
    <Box
      ref={registerActiveStepLabel}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      paddingBottom={paddingBottom}
      style={style}
      {...props}
    >
      {!!step.label && typeof step.label === 'string' ? (
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
          numberOfLines={1}
        >
          {step.label}
        </Text>
      ) : (
        step.label
      )}
    </Box>
  );
});
