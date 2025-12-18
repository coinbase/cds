import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, type View } from 'react-native';
import Animated, {
  type EntryAnimationsValues,
  type ExitAnimationsValues,
  LayoutAnimationConfig,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { Transition } from '../../motion/types';
import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  digits,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
  type RollingNumberTransitionConfig,
} from './RollingNumber';

/**
 * Apply timing or spring animation based on a config.
 */
const applyTransition = (value: number, config?: Transition) => {
  'worklet';
  if (config?.type === 'timing') return withTiming(value, config);
  return withSpring(value, config);
};

/**
 * Creates a custom transition animation worklet for single variant.
 * Combines y translation with opacity fade.
 * @param isEntering - true for entering animation, false for exiting
 * @param isGoingUp - direction of the number change
 * @param transitionConfig - animation timing/spring configuration
 */
const createTransitionAnimation =
  (isEntering: boolean, isGoingUp: boolean, transitionConfig?: RollingNumberTransitionConfig) =>
  (values: EntryAnimationsValues | ExitAnimationsValues) => {
    'worklet';
    const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;
    const opacityConfig = transitionConfig?.opacity ?? defaultTransitionConfig.opacity;

    const height = isEntering
      ? (values as EntryAnimationsValues).targetHeight
      : (values as ExitAnimationsValues).currentHeight;

    // Entering: come from opposite direction (going up = enter from bottom = positive Y)
    // Exiting: go in direction of change (going up = exit upward = negative Y)
    const yOffset = isGoingUp ? (isEntering ? height : -height) : isEntering ? -height : height;

    const initialY = isEntering ? yOffset : 0;
    const targetY = isEntering ? 0 : yOffset;
    const initialOpacity = isEntering ? 0 : 1;
    const targetOpacity = isEntering ? 1 : 0;

    return {
      initialValues: {
        opacity: initialOpacity,
        transform: [{ translateY: initialY }],
      },
      animations: {
        opacity: applyTransition(targetOpacity, opacityConfig),
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
 * Default digit component for RollingNumber on mobile.
 *
 * The mobile implementation differs from web due to platform-specific animation libraries:
 * - Mobile uses react-native-reanimated with shared values and worklets
 * - Web uses framer-motion with imperative `animate` calls
 *
 * For the "every" variant, mobile renders all 10 digits (0-9) stacked with absolute
 * positioning and animates the container's translateY. Web renders only the necessary
 * digits above/below the current value.
 *
 * For the "single" variant, mobile uses reanimated's `entering`/`exiting` props with
 * custom animation worklets. Web uses imperative opacity crossfades on DOM sections.
 */
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
      const [singleVariantCurrentValue, setCurrentValue] = useState(initialValue);

      const position = useSharedValue(initialValue * digitHeight * -1);
      const prevValue = useRef(initialValue);

      const isSingleVariant = useMemo(
        () => digitTransitionVariant === 'single',
        [digitTransitionVariant],
      );

      const isGoingUp = useMemo(() => direction === 'up', [direction]);

      // Single variant needs to re-render to give time for exit animation direction to be updated
      useEffect(() => {
        if (value !== singleVariantCurrentValue) {
          setCurrentValue(value);
        }
      }, [value, singleVariantCurrentValue]);

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
        () => createTransitionAnimation(true, isGoingUp, transitionConfig),
        [isGoingUp, transitionConfig],
      );

      const singleVariantExitTransition = useMemo(
        () => createTransitionAnimation(false, isGoingUp, transitionConfig),
        [isGoingUp, transitionConfig],
      );

      // LayoutAnimationConfig disables mount/unmount animations on the digit container itself
      // (e.g. when digits are added/removed going from $1,000 to $10,000 or vice versa).
      // AnimatedText entering/exiting props handle value change animations separately.
      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <LayoutAnimationConfig skipEntering skipExiting>
            <Animated.View style={containerStyle}>
              {isSingleVariant ? (
                <AnimatedText
                  key={singleVariantCurrentValue}
                  entering={singleVariantEnterTransition}
                  exiting={singleVariantExitTransition}
                  style={[styles?.text]}
                  {...textProps}
                >
                  {singleVariantCurrentValue}
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
          </LayoutAnimationConfig>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
