import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { animateRotateConfig } from '@coinbase/cds-common/motion/animatedCaret';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Icon, type IconProps } from '../icons/Icon';
import { HStack } from '../layout/HStack';

export type AnimatedCaretBaseProps = SharedProps & {
  rotate: number;
};

export type AnimatedCaretProps = AnimatedCaretBaseProps & Partial<Omit<IconProps, 'name'>>;

export const useAnimatedCaretAnimation = (rotate: number) => {
  const [rotateValue] = useState(() => new Animated.Value(rotate));
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    Animated.timing(
      rotateValue,
      convertMotionConfig({ ...animateRotateConfig, toValue: rotate }),
    ).start();
  }, [rotate, rotateValue]);

  const interpolatedRotateValue = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return useMemo(
    () => ({
      animatedStyles: { transform: [{ rotate: interpolatedRotateValue }] },
    }),
    [interpolatedRotateValue],
  );
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'fgMuted',
  style,
  ...props
}: AnimatedCaretProps) {
  const { animatedStyles } = useAnimatedCaretAnimation(rotate);

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
