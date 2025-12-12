import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, type View } from 'react-native';
import Animated, {
  type EntryAnimationsValues,
  type ExitAnimationsValues,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated';

import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  digits,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
  type RollingNumberTransitionConfig,
} from './RollingNumber';

type TransitionConfigValue =
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig);

/**
 * Apply timing or spring animation based on a config.
 */
const applyTransition = (value: number, config?: TransitionConfigValue) => {
  'worklet';
  if (config?.type === 'timing') return withTiming(value, config);
  return withSpring(value, config);
};

/**
 * Creates a custom entering animation worklet for single variant.
 * Combines y translation with opacity fade-in.
 */
const createEnteringAnimation =
  (isGoingUp: boolean, transitionConfig?: RollingNumberTransitionConfig) =>
  (targetValues: EntryAnimationsValues) => {
    'worklet';
    const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;
    const opacityConfig = transitionConfig?.opacity ?? defaultTransitionConfig.opacity;

    // Enter from opposite direction: if going up, enter from bottom (positive y)
    const initialY = isGoingUp ? targetValues.targetHeight : -targetValues.targetHeight;

    return {
      initialValues: {
        opacity: 0,
        transform: [{ translateY: initialY }],
      },
      animations: {
        opacity: applyTransition(1, opacityConfig),
        transform: [{ translateY: applyTransition(0, yConfig) }],
      },
    };
  };

/**
 * Creates a custom exiting animation worklet for single variant.
 * Combines y translation with opacity fade-out.
 */
const createExitingAnimation =
  (isGoingUp: boolean, transitionConfig?: RollingNumberTransitionConfig) =>
  (values: ExitAnimationsValues) => {
    'worklet';
    const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;
    const opacityConfig = transitionConfig?.opacity ?? defaultTransitionConfig.opacity;

    // Exit in direction of change: if going up, exit upward (negative y)
    const targetY = isGoingUp ? -values.currentHeight : values.currentHeight;

    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateY: 0 }],
      },
      animations: {
        opacity: applyTransition(0, opacityConfig),
        transform: [{ translateY: applyTransition(targetY, yConfig) }],
      },
    };
  };

const AnimatedText = Animated.createAnimatedComponent(Text);

const baseStylesheet = StyleSheet.create({
  digitContainer: {
    alignItems: 'center',
    overflow: 'visible',
    justifyContent: 'center',
    position: 'relative',
  },
});

/**
 * Note that the DefaultRollingNumberDigit component implementation is different in web
 * and mobile due to different animation libraries and the performance issue in mobile.
 * This has nearly unnoticeable difference in animation effect.
 *  */
export const DefaultRollingNumberDigit: RollingNumberDigitComponent = memo(
  forwardRef<View, RollingNumberDigitProps>(
    (
      {
        value,
        digitHeight,
        initialValue = value,
        textProps,
        style,
        styles,
        transitionConfig,
        digitTransitionVariant = 'every',
        direction,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      const [currentValue, setCurrentValue] = useState(initialValue);

      const position = useSharedValue(initialValue * digitHeight * -1);
      const prevValue = useRef(initialValue);

      const isSingleVariant = useMemo(
        () => digitTransitionVariant === 'single',
        [digitTransitionVariant],
      );

      const isGoingUp = useMemo(() => direction === 'up', [direction]);

      // Single variant needs to re-render to give time for exit animation direction to be updated
      useEffect(() => {
        if (value !== currentValue) {
          setCurrentValue(value);
        }
      }, [value, currentValue]);

      // Every variant needs to update the position of the digit immediately
      useEffect(() => {
        if (prevValue.current === value) return;

        const newPosition = value * digitHeight * -1;
        const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;

        if (yConfig?.type === 'timing') {
          position.value = withTiming(newPosition, yConfig);
        } else {
          position.value = withSpring(newPosition, yConfig);
        }
        prevValue.current = value;
      }, [digitHeight, position, transitionConfig?.y, value]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
      }));

      const containerStyle = useMemo(
        () => [
          baseStylesheet.digitContainer,
          !isSingleVariant && animatedStyle,
          style,
          styles?.root,
        ],
        [animatedStyle, isSingleVariant, style, styles?.root],
      );

      const singleVariantEnterTransition = useMemo(
        () => createEnteringAnimation(isGoingUp, transitionConfig),
        [isGoingUp, transitionConfig],
      );

      const singleVariantExitTransition = useMemo(
        () => createExitingAnimation(isGoingUp, transitionConfig),
        [isGoingUp, transitionConfig],
      );

      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <Animated.View style={containerStyle}>
            {isSingleVariant ? (
              <AnimatedText
                key={currentValue}
                entering={singleVariantEnterTransition}
                exiting={singleVariantExitTransition}
                style={[styles?.text]}
                {...textProps}
              >
                {currentValue}
              </AnimatedText>
            ) : (
              digits.map((digit) => (
                <AnimatedText
                  key={digit}
                  style={[
                    {
                      position: digit === 0 ? 'relative' : 'absolute',
                      top: digit * digitHeight,
                    },
                    styles?.text,
                  ]}
                  {...textProps}
                >
                  {digit}
                </AnimatedText>
              ))
            )}
          </Animated.View>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
