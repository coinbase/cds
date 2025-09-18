import { memo, useMemo } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import type { StepperHeaderComponent } from './Stepper';

const AnimatedHStack = animated(HStack);

const displayStyle = {
  phone: 'flex',
  tablet: 'none',
  desktop: 'none',
} as const;

export const DefaultStepperHeaderHorizontal: StepperHeaderComponent = memo(
  function DefaultStepperHeaderHorizontal({
    activeStep,
    complete,
    flatStepIds,
    className,
    style,
    display = displayStyle,
    width = '100%',
    paddingBottom = 1.5,
    font = 'caption',
    fontFamily = font,
    fontSize = font,
    fontWeight = font,
    lineHeight = font,
    textTransform,
    ...props
  }) {
    const spring = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
    });

    const styles = useMemo(() => ({ ...style, ...spring }), [style, spring]);
    const flatStepIndex = activeStep ? flatStepIds.indexOf(activeStep.id) : -1;
    const emptyText = <>&nbsp;</>;

    return (
      <AnimatedHStack
        aria-hidden
        className={className}
        display={display}
        font={font}
        fontFamily={fontFamily}
        paddingBottom={paddingBottom}
        position="relative"
        style={styles}
        width={width}
        {...props}
      >
        <Text
          alignItems="center"
          display="flex"
          font={font}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          textTransform={textTransform}
        >
          {!activeStep || complete ? (
            emptyText
          ) : (
            <HStack gap={1}>
              <Text aria-hidden color="fgMuted" paddingEnd={1}>
                {flatStepIndex + 1}/{flatStepIds.length}
              </Text>
              {activeStep.label && typeof activeStep.label === 'string' ? (
                <Text aria-hidden numberOfLines={1}>
                  {activeStep.label}
                </Text>
              ) : (
                activeStep.label
              )}
            </HStack>
          )}
        </Text>
      </AnimatedHStack>
    );
  },
);
