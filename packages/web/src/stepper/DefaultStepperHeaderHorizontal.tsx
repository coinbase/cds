import { memo } from 'react';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import { m as motion } from 'framer-motion';

import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import type { StepperHeaderComponent } from './Stepper';

const MotionHStack = motion(HStack);

const displayStyle = {
  phone: 'flex',
  tablet: 'none',
  desktop: 'none',
} as const;

const headerTransition = {
  type: 'tween' as const,
  duration: durations.slow2 / 1000,
  ease: curves.global,
};

export const DefaultStepperHeaderHorizontal: StepperHeaderComponent = memo(
  function DefaultStepperHeaderHorizontal({
    activeStep,
    complete,
    flatStepIds,
    className,
    style,
    display = displayStyle,
    disableAnimateOnMount,
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
    const flatStepIndex = activeStep ? flatStepIds.indexOf(activeStep.id) : -1;
    const emptyText = <>&nbsp;</>;

    return (
      <MotionHStack
        aria-hidden
        animate={{ opacity: 1 }}
        className={className}
        display={display}
        font={font}
        fontFamily={fontFamily}
        initial={{ opacity: disableAnimateOnMount ? 1 : 0 }}
        paddingBottom={paddingBottom}
        position="relative"
        style={style}
        transition={headerTransition}
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
      </MotionHStack>
    );
  },
);
