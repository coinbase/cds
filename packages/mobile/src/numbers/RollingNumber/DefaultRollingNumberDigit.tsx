import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
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
