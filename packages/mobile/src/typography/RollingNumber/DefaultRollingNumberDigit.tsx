import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, type View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Text } from '../Text';

import { buildAnimation } from './buildAnimation';
import {
  DEFAULT_TRANSITION,
  digits,
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
 * Consider align the implementations in the future.
 *  */
export const DefaultRollingNumberDigit: RollingNumberDigitComponent = memo(
  forwardRef<View, RollingNumberDigitProps>(
    (
      {
        value,
        invisibleDigitMeasurements,
        initialValue = value,
        textProps,
        style,
        styles,
        transitionConfig,
        ...props
      },
      ref,
    ) => {
      const measurement = invisibleDigitMeasurements[value];
      const position = useSharedValue(initialValue * measurement.height * -1);
      const prevValue = useRef(initialValue);

      useEffect(() => {
        if (prevValue.current === value) return;
        position.value = buildAnimation({
          toValue: value * measurement.height * -1,
          transition: transitionConfig?.y ?? DEFAULT_TRANSITION.y,
        });
        prevValue.current = value;
      }, [measurement.height, position, transitionConfig?.y, value]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
      }));

      const containerStyle = useMemo(
        () => [baseStylesheet.digitContainer, animatedStyle, style, styles?.root],
        [animatedStyle, style, styles?.root],
      );

      return (
        <Animated.View ref={ref} style={containerStyle} {...props}>
          {digits.map((digit) => (
            <AnimatedText
              key={digit}
              style={[
                {
                  position: digit === 0 ? 'relative' : 'absolute',
                  top: digit * measurement.height,
                },
                styles?.text,
              ]}
              {...textProps}
            >
              {digit}
            </AnimatedText>
          ))}
        </Animated.View>
      );
    },
  ),
);
