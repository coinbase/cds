import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { animateRotateConfig } from '@coinbase/cds-common/motion/animatedCaret';
import type { SharedProps } from '@coinbase/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Icon, type IconProps } from '../icons';
import { HStack } from '../layout/HStack';

export type AnimatedCaretBaseProps = SharedProps & {
  rotate: number;
};

export type AnimatedCaretProps = AnimatedCaretBaseProps & Partial<Omit<IconProps, 'name'>>;

export const useAnimatedCaretAnimation = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const animate = useCallback(
    (rotate: number) => {
      Animated.timing(
        rotateValue,
        convertMotionConfig({ ...animateRotateConfig, toValue: rotate }),
      ).start();
    },
    [rotateValue],
  );

  const interpolatedRotateValue = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return useMemo(
    () => ({
      animatedStyles: { transform: [{ rotate: interpolatedRotateValue }] },
      animate,
    }),
    [interpolatedRotateValue, animate],
  );
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'fgMuted',
  style,
  ...props
}: AnimatedCaretProps) {
  const { animatedStyles, animate } = useAnimatedCaretAnimation();
  const previousRotate = usePreviousValue(rotate);

  useEffect(() => {
    if (rotate !== previousRotate) animate(rotate);
  }, [rotate, previousRotate, animate]);

  return (
    // HStack to limit rotate boundary
    <HStack>
      <Icon
        animated
        color={color}
        name="caretUp"
        size={size}
        style={[style, animatedStyles]}
        {...props}
      />
    </HStack>
  );
});
