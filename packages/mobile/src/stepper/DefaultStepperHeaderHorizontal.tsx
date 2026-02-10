import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { durations } from '@coinbase/cds-common/motion/tokens';

import { HStack } from '../layout/HStack';
import { mobileCurves } from '../motion/convertMotionConfig';
import { Text } from '../typography/Text';

import type { StepperHeaderComponent } from './Stepper';

const AnimatedHStack = Animated.createAnimatedComponent(HStack);

export const DefaultStepperHeaderHorizontal: StepperHeaderComponent = memo(
  function DefaultStepperHeaderHorizontal({
    activeStep,
    complete,
    disableAnimateOnMount,
    flatStepIds,
    style,
    paddingBottom = 1.5,
    width = '100%',
    font = 'caption',
    fontFamily = font,
    ...props
  }) {
    const opacity = useSharedValue(disableAnimateOnMount ? 1 : 0);
    const disableAnimateOnMountRef = useRef(disableAnimateOnMount);
    const isInitialRender = useRef(true);

    const [displayedStep, setDisplayedStep] = useState(activeStep);
    const [displayedComplete, setDisplayedComplete] = useState(complete);

    useEffect(() => {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        setDisplayedStep(activeStep);
        setDisplayedComplete(complete);
        if (disableAnimateOnMountRef.current) return;
        opacity.value = withTiming(1, { duration: durations.fast1, easing: mobileCurves.linear });
        return;
      }

      // Fade out with old text, then swap text and fade in
      opacity.value = withTiming(0, { duration: durations.fast1, easing: mobileCurves.linear });

      const timeout = setTimeout(() => {
        setDisplayedStep(activeStep);
        setDisplayedComplete(complete);
        opacity.value = withTiming(1, { duration: durations.fast1, easing: mobileCurves.linear });
      }, durations.fast1 + durations.fast1);

      return () => clearTimeout(timeout);
    }, [activeStep, complete, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const styles = useMemo(() => [style, animatedStyle], [style, animatedStyle]);
    const flatStepIndex = displayedStep ? flatStepIds.indexOf(displayedStep.id) : -1;
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
          {!displayedStep || displayedComplete ? (
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
              {displayedStep.label && typeof displayedStep.label === 'string' ? (
                <Text font={font} fontFamily={fontFamily} numberOfLines={1}>
                  {displayedStep.label}
                </Text>
              ) : (
                displayedStep.label
              )}
            </HStack>
          )}
        </Text>
      </AnimatedHStack>
    );
  },
);
