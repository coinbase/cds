import { memo, useEffect, useMemo } from 'react';
import { animated, useSpring } from '@react-spring/native';

import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import type { StepperHeaderComponent } from './Stepper';

const AnimatedHStack = animated(HStack);

export const DefaultStepperHeaderHorizontal: StepperHeaderComponent = memo(
  function DefaultStepperHeaderHorizontal({
    activeStep,
    complete,
    flatStepIds,
    style,
    paddingBottom = 1.5,
    width = '100%',
    font = 'caption',
    fontFamily = font,
    ...props
  }) {
    const [spring, springApi] = useSpring(
      {
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
      },
      [],
    );

    // TO DO: resetting the spring doesn't work like it does in react-spring on web
    // need to look into this deeper and understand why there is a difference in behavior
    useEffect(() => {
      springApi.start({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
      });
    }, [springApi, activeStep]);

    const styles = useMemo(() => [style, spring] as any, [style, spring]);
    const flatStepIndex = activeStep ? flatStepIds.indexOf(activeStep.id) : -1;
    const emptyText = ' '; // Simple space for React Native

    return (
      <AnimatedHStack
        paddingBottom={paddingBottom}
        position="relative"
        style={styles}
        width={width}
        {...props}
      >
        <Text alignItems="center" display="flex" font="caption" fontFamily={fontFamily}>
          {!activeStep || complete ? (
            emptyText
          ) : (
            <HStack gap={1}>
              <Text
                accessibilityElementsHidden
                color="fgMuted"
                font={font}
                fontFamily={fontFamily}
                paddingEnd={1}
              >
                {flatStepIndex + 1}/{flatStepIds.length}
              </Text>
              {activeStep.label && typeof activeStep.label === 'string' ? (
                <Text font={font} fontFamily={fontFamily} numberOfLines={1}>
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
