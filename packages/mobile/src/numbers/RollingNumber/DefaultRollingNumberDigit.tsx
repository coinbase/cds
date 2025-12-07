import { forwardRef, memo, useLayoutEffect, useMemo, useRef } from 'react';
import { StyleSheet, type View } from 'react-native';
import Animated, {
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
      const prevValue = useRef(initialValue);
      const isSingleVariant = digitTransitionVariant === 'single';
      const prevDigit = prevValue.current;
      const position = useSharedValue(isSingleVariant ? 0 : initialValue * digitHeight * -1);

      // Opacity for single variant crossfade
      const prevOpacity = useSharedValue(0);
      const currentOpacity = useSharedValue(1);

      const derivedDirection =
        direction ?? (value > prevDigit ? 'up' : value < prevDigit ? 'down' : undefined);
      const isGoingUp = derivedDirection === 'up';

      useLayoutEffect(() => {
        // Capture previous value before updating ref
        const prevVal = prevValue.current;

        // Skip animation if value hasn't changed
        if (prevVal === value) return;

        if (isSingleVariant && derivedDirection) {
          // Single variant: animate 1 height with opacity crossfade
          const startPosition = derivedDirection === 'up' ? digitHeight : -digitHeight;
          const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;

          // Initialize start pose before animating to avoid flashing the new digit
          position.value = startPosition;
          position.value =
            transitionConfig?.y?.type === 'spring'
              ? withSpring(0, transitionConfig?.y)
              : withTiming(0, yConfig);
          prevOpacity.value = 1;
          prevOpacity.value = withTiming(0, yConfig);
          currentOpacity.value = 0;
          currentOpacity.value = withTiming(1, yConfig);
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

        // Update prevValue only after scheduling animations so render uses the prior digit
        prevValue.current = value;
      }, [
        digitHeight,
        position,
        prevOpacity,
        currentOpacity,
        transitionConfig?.y,
        value,
        isSingleVariant,
        derivedDirection,
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

      const digitsForVariant = useMemo(
        () => (isSingleVariant && derivedDirection ? [prevDigit, value] : digits),
        [derivedDirection, isSingleVariant, prevDigit, value],
      );

      const digitEntries = useMemo(
        () =>
          digitsForVariant.map((digit, index) => {
            if (isSingleVariant && derivedDirection) {
              const isPrevDigit = index === 0;
              const positionStyle = {
                position: isPrevDigit ? 'absolute' : 'relative',
                top: isPrevDigit ? (isGoingUp ? -digitHeight : digitHeight) : 0,
              } as const;

              return {
                key: `${index}-${digit}`,
                digit,
                positionStyle,
                animatedStyle: isPrevDigit ? prevOpacityStyle : currentOpacityStyle,
              };
            }

            return {
              key: digit.toString(),
              digit,
              positionStyle: {
                position: digit === 0 ? 'relative' : 'absolute',
                top: digit * digitHeight,
              } as const,
              animatedStyle: undefined,
            };
          }),
        [
          currentOpacityStyle,
          derivedDirection,
          digitHeight,
          digitsForVariant,
          isGoingUp,
          isSingleVariant,
          prevOpacityStyle,
        ],
      );

      return (
        <RollingNumberMaskComponent ref={ref} {...props}>
          <Animated.View style={containerStyle}>
            {digitEntries.map(({ key, digit, positionStyle, animatedStyle }) => (
              <AnimatedText
                key={key}
                style={[positionStyle, styles?.text, animatedStyle]}
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
