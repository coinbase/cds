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
  type SingleDirection,
} from './digitTypes';

const AnimatedText = Animated.createAnimatedComponent(Text);

const baseStylesheet = StyleSheet.create({
  digitContainer: {
    alignItems: 'center',
    overflow: 'visible',
    justifyContent: 'center',
    position: 'relative',
  },
  // Styles for single variant
  singleContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  singleGhost: {
    opacity: 0,
  },
  singleDigit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/** Spring configuration for single transition variant. */
const singleTransitionSpringConfig = {
  stiffness: 280,
  damping: 18,
  mass: 0.3,
} as const;

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
        digitTransitionVariant = 'every',
        direction,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      // Single variant implementation
      if (digitTransitionVariant === 'single') {
        return (
          <SingleDigit
            ref={ref}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            digitHeight={digitHeight}
            direction={direction}
            initialValue={initialValue}
            style={style}
            styles={styles}
            textProps={textProps}
            value={value}
            {...props}
          />
        );
      }

      // Every variant implementation (original behavior)
      return (
        <EveryDigit
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
 * Internal component for the single variant.
 */
const SingleDigit = memo(
  forwardRef<View, Omit<RollingNumberDigitProps, 'digitTransitionVariant' | 'transitionConfig'>>(
    (
      {
        value,
        digitHeight,
        initialValue = value,
        textProps,
        style,
        styles,
        direction,
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
      const directionShared = useSharedValue<SingleDirection | undefined>(direction);
      const heightShared = useSharedValue(digitHeight);

      // Update shared values synchronously during render
      currentValue.value = value;
      directionShared.value = direction;
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
          const dir = directionShared.value;
          const initialMult = dir === 'up' ? 1 : -1;
          const exitMult = dir === 'up' ? -1 : 1;
          const height = heightShared.value;

          // Spring config
          const springConfig = {
            ...singleTransitionSpringConfig,
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
        () => [baseStylesheet.singleContainer, { height: digitHeight }, style, styles?.root],
        [digitHeight, style, styles?.root],
      );

      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <Animated.View style={containerStyle}>
            {/* Ghost element for layout */}
            <AnimatedText style={[baseStylesheet.singleGhost, styles?.text]} {...textProps}>
              {value}
            </AnimatedText>
            {/* Previous digit (exiting) */}
            <Animated.View style={[baseStylesheet.singleDigit, prevAnimatedStyle]}>
              <AnimatedText style={styles?.text} {...textProps}>
                {displayedPrevDigit}
              </AnimatedText>
            </Animated.View>
            {/* Current digit (entering) */}
            <Animated.View style={[baseStylesheet.singleDigit, currentAnimatedStyle]}>
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
 * Internal component for the every variant to avoid hooks in conditional branches.
 */
const EveryDigit = memo(
  forwardRef<View, Omit<RollingNumberDigitProps, 'digitTransitionVariant' | 'direction'>>(
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
