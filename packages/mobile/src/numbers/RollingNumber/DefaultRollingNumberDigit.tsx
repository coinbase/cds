import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, StyleSheet, type View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  digits,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
  slideTransitionSpringConfig,
  type ValueChangeDirection,
} from './digitTypes';

const AnimatedText = Animated.createAnimatedComponent(Text);

const baseStylesheet = StyleSheet.create({
  digitContainer: {
    alignItems: 'center',
    overflow: 'visible',
    justifyContent: 'center',
    position: 'relative',
  },
  // Styles for slide variant
  slideContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  slideGhost: {
    opacity: 0,
  },
  slideDigit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Get the initial and exit Y positions for slide animation based on direction.
 * Roll Up: New digits enter from bottom (100%), old exit to top (-100%)
 * Roll Down: New digits enter from top (-100%), old exit to bottom (100%)
 */
const getSlideYMultiplier = (direction: ValueChangeDirection) => {
  if (direction === 'up') {
    return { initial: 1, exit: -1 }; // Enter from bottom, exit to top
  }
  // direction === 'down' or 'none'
  return { initial: -1, exit: 1 }; // Enter from top, exit to bottom
};

/**
 * Note that the DefaultRollingNumberDigit component implementation is different in web
 * and mobile due to different animation libraries and the performance issue in mobile.
 * This has nearly unnoticeable difference in animation effect.
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
        digitTransitionVariant = 'roll',
        valueChangeDirection = 'none',
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      // Slide variant implementation
      if (digitTransitionVariant === 'slide') {
        return (
          <SlideDigit
            ref={ref}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            digitHeight={digitHeight}
            initialValue={initialValue}
            style={style}
            styles={styles}
            textProps={textProps}
            value={value}
            valueChangeDirection={valueChangeDirection}
            {...props}
          />
        );
      }

      // Roll variant implementation (original behavior)
      return (
        <RollDigit
          ref={ref}
          RollingNumberMaskComponent={RollingNumberMaskComponent}
          digitHeight={digitHeight}
          initialValue={initialValue}
          style={style}
          styles={styles}
          textProps={textProps}
          transitionConfig={transitionConfig}
          value={value}
          {...props}
        />
      );
    },
  ),
);

/**
 * Internal component for the slide variant.
 */
const SlideDigit = memo(
  forwardRef<View, Omit<RollingNumberDigitProps, 'digitTransitionVariant' | 'transitionConfig'>>(
    (
      {
        value,
        digitHeight,
        initialValue = value,
        textProps,
        style,
        styles,
        valueChangeDirection = 'none',
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      const isReducedMotion = useSharedValue(false);

      // React state for the displayed previous digit (for rendering)
      const [displayedPrevDigit, setDisplayedPrevDigit] = useState(initialValue);

      // Callback to update displayed prev digit from worklet
      const updateDisplayedPrevDigit = useCallback((digit: number) => {
        setDisplayedPrevDigit(digit);
      }, []);

      // Check for reduced motion preference
      useEffect(() => {
        const checkReducedMotion = async () => {
          const reduced = await AccessibilityInfo.isReduceMotionEnabled();
          isReducedMotion.value = reduced;
        };
        void checkReducedMotion();

        const subscription = AccessibilityInfo.addEventListener(
          'reduceMotionChanged',
          (reduced) => {
            isReducedMotion.value = reduced;
          },
        );

        return () => subscription.remove();
      }, [isReducedMotion]);

      // Track values and direction in shared values for worklet access
      const currentValue = useSharedValue(value);
      const directionShared = useSharedValue<ValueChangeDirection>(valueChangeDirection);
      const heightShared = useSharedValue(digitHeight);

      // Update shared values synchronously during render
      currentValue.value = value;
      directionShared.value = valueChangeDirection;
      heightShared.value = digitHeight;

      // Animation values for current digit
      const currentOpacity = useSharedValue(1);
      const currentY = useSharedValue(0);

      // Animation values for previous digit (exiting)
      const prevOpacity = useSharedValue(0);
      const prevY = useSharedValue(0);

      // Use animated reaction to trigger animations when value changes
      useAnimatedReaction(
        () => currentValue.value,
        (newValue, oldValue) => {
          'worklet';
          if (oldValue === null || oldValue === newValue) return;

          // Store the old value for display (via runOnJS)
          runOnJS(updateDisplayedPrevDigit)(oldValue);

          // Get direction multipliers
          const direction = directionShared.value;
          const initialMult = direction === 'up' ? 1 : -1;
          const exitMult = direction === 'up' ? -1 : 1;
          const height = heightShared.value;

          // Spring config
          const springConfig = {
            ...slideTransitionSpringConfig,
          };

          // Reset and start exit animation for previous digit
          prevOpacity.value = 1;
          prevY.value = 0;

          if (isReducedMotion.value) {
            // Reduced motion: just crossfade
            prevOpacity.value = withTiming(0, { duration: 200 });
            currentOpacity.value = 0;
            currentOpacity.value = withTiming(1, { duration: 200 });
          } else {
            // Full animation with spring
            prevOpacity.value = withTiming(0, { duration: 150 });
            prevY.value = withSpring(exitMult * height, springConfig);

            // Start entering animation for current digit
            currentOpacity.value = 0;
            currentY.value = initialMult * height;
            currentOpacity.value = withTiming(1, { duration: 150 });
            currentY.value = withSpring(0, springConfig);
          }
        },
        [currentValue, updateDisplayedPrevDigit],
      );

      const currentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: currentOpacity.value,
        transform: [{ translateY: currentY.value }],
      }));

      const prevAnimatedStyle = useAnimatedStyle(() => ({
        opacity: prevOpacity.value,
        transform: [{ translateY: prevY.value }],
      }));

      const containerStyle = useMemo(
        () => [baseStylesheet.slideContainer, { height: digitHeight }, style, styles?.root],
        [digitHeight, style, styles?.root],
      );

      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <Animated.View style={containerStyle}>
            {/* Ghost element for layout */}
            <AnimatedText style={[baseStylesheet.slideGhost, styles?.text]} {...textProps}>
              {value}
            </AnimatedText>
            {/* Previous digit (exiting) */}
            <Animated.View style={[baseStylesheet.slideDigit, prevAnimatedStyle]}>
              <AnimatedText style={styles?.text} {...textProps}>
                {displayedPrevDigit}
              </AnimatedText>
            </Animated.View>
            {/* Current digit (entering) */}
            <Animated.View style={[baseStylesheet.slideDigit, currentAnimatedStyle]}>
              <AnimatedText style={styles?.text} {...textProps}>
                {value}
              </AnimatedText>
            </Animated.View>
          </Animated.View>
        </RollingNumberMaskComponent>
      );
    },
  ),
);

/**
 * Internal component for the roll variant to avoid hooks in conditional branches.
 */
const RollDigit = memo(
  forwardRef<
    View,
    Omit<RollingNumberDigitProps, 'digitTransitionVariant' | 'valueChangeDirection'>
  >(
    (
      {
        value,
        digitHeight,
        initialValue = value,
        textProps,
        style,
        styles,
        transitionConfig,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      const position = useSharedValue(initialValue * digitHeight * -1);
      const prevValue = useRef(initialValue);

      useEffect(() => {
        if (prevValue.current === value) return;
        const newPosition = value * digitHeight * -1;
        if (transitionConfig?.y?.type === 'spring') {
          position.value = withSpring(newPosition, transitionConfig?.y);
        } else {
          position.value = withTiming(
            newPosition,
            transitionConfig?.y ?? defaultTransitionConfig.y,
          );
        }
        prevValue.current = value;
      }, [digitHeight, position, transitionConfig?.y, value]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
      }));

      const containerStyle = useMemo(
        () => [baseStylesheet.digitContainer, animatedStyle, style, styles?.root],
        [animatedStyle, style, styles?.root],
      );

      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <Animated.View style={containerStyle}>
            {digits.map((digit) => (
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
            ))}
          </Animated.View>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
