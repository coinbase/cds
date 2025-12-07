import { forwardRef, memo, useLayoutEffect, useMemo, useRef } from 'react';
import { StyleSheet, type View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  digits,
  type DigitTransitionVariant,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
} from './RollingNumber';

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
        digitTransitionVariant = 'every' as DigitTransitionVariant,
        direction,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        ...props
      },
      ref,
    ) => {
      const isSingleVariant = digitTransitionVariant === 'single';
      const position = useSharedValue(isSingleVariant ? 0 : initialValue * digitHeight * -1);
      const prevValue = useRef(initialValue);

      // Opacity for single variant crossfade
      const prevOpacity = useSharedValue(0);
      const currentOpacity = useSharedValue(1);

      useLayoutEffect(() => {
        // Capture previous value before updating ref
        const prevVal = prevValue.current;
        // Always update prevValue to current, even if no animation needed
        prevValue.current = value;

        // Skip animation if value hasn't changed
        if (prevVal === value) return;

        if (isSingleVariant && direction) {
          // Single variant: animate 1 height with opacity crossfade
          const startPosition = direction === 'up' ? digitHeight : -digitHeight;
          const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;

          // Use withSequence to ensure start position is set before animating
          if (transitionConfig?.y?.type === 'spring') {
            position.value = withSequence(
              withTiming(startPosition, { duration: 0 }),
              withSpring(0, transitionConfig?.y),
            );
          } else {
            position.value = withSequence(
              withTiming(startPosition, { duration: 0 }),
              withTiming(0, yConfig),
            );
          }
          // Crossfade: prev 1→0, current 0→1
          prevOpacity.value = withSequence(withTiming(1, { duration: 0 }), withTiming(0, yConfig));
          currentOpacity.value = withSequence(
            withTiming(0, { duration: 0 }),
            withTiming(1, yConfig),
          );
        } else {
          // Every variant: animate through all intermediate digits
          const newPosition = value * digitHeight * -1;
          if (transitionConfig?.y?.type === 'spring') {
            position.value = withSpring(newPosition, transitionConfig?.y);
          } else {
            position.value = withTiming(
              newPosition,
              transitionConfig?.y ?? defaultTransitionConfig.y,
            );
          }
        }
      }, [
        digitHeight,
        position,
        prevOpacity,
        currentOpacity,
        transitionConfig?.y,
        value,
        isSingleVariant,
        direction,
      ]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
      }));

      const prevOpacityStyle = useAnimatedStyle(() => ({ opacity: prevOpacity.value }));
      const currentOpacityStyle = useAnimatedStyle(() => ({ opacity: currentOpacity.value }));

      const containerStyle = useMemo(
        () => [baseStylesheet.digitContainer, animatedStyle, style, styles?.root],
        [animatedStyle, style, styles?.root],
      );

      // For single variant: only show prev digit in direction of travel
      const isGoingUp = direction === 'up';
      const isGoingDown = direction === 'down';

      if (isSingleVariant) {
        return (
          <RollingNumberMaskComponent ref={ref} {...props}>
            <Animated.View style={containerStyle}>
              {/* Previous digit above (when going up) */}
              {isGoingUp && (
                <Animated.View style={[{ position: 'absolute', bottom: '100%' }, prevOpacityStyle]}>
                  <AnimatedText style={styles?.text} {...textProps}>
                    {prevValue.current}
                  </AnimatedText>
                </Animated.View>
              )}
              {/* Current digit with opacity crossfade */}
              <Animated.View style={currentOpacityStyle}>
                <AnimatedText style={styles?.text} {...textProps}>
                  {value}
                </AnimatedText>
              </Animated.View>
              {/* Previous digit below (when going down) */}
              {isGoingDown && (
                <Animated.View style={[{ position: 'absolute', top: '100%' }, prevOpacityStyle]}>
                  <AnimatedText style={styles?.text} {...textProps}>
                    {prevValue.current}
                  </AnimatedText>
                </Animated.View>
              )}
            </Animated.View>
          </RollingNumberMaskComponent>
        );
      }

      // Every variant: render all 10 digits (original implementation)
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
