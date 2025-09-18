import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { Icon } from '../Icon';
import { TextIcon } from '../TextIcon';

import { IconSheet } from './IconSheet';

const animateInConfig = convertMotionConfig({
  easing: 'enterFunctional',
  duration: 'moderate1',
  toValue: 1,
  useNativeDriver: false,
});
const animateOutConfig = convertMotionConfig({
  easing: 'exitFunctional',
  duration: 'moderate1',
  toValue: 1,
  useNativeDriver: false,
});

export const useAnimation = (): [
  Animated.Value,
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const animationRef = useRef(new Animated.Value(0));
  return useMemo(() => {
    const animateIn = Animated.timing(animationRef.current, animateInConfig);
    const animateOut = Animated.timing(animationRef.current, animateOutConfig);
    return [animationRef.current, animateIn, animateOut];
  }, []);
};

const IconScreen = () => {
  const theme = useTheme();
  const [isToggled, setIsToggled] = useState(false);
  const animationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationRef, isToggled ? animateInConfig : animateOutConfig).start();
  }, [isToggled, animationRef]);

  const toggle = useCallback(() => setIsToggled((prevIsToggled) => !prevIsToggled), []);

  const animatedIcon = (
    <Icon
      active
      animated
      dangerouslySetColor={animationRef.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.color.bgLine, theme.color.fgPrimary],
      })}
      name="star"
      size="l"
    />
  );

  return (
    <ExampleScreen>
      <Example title="Nesting TextIcons">
        <VStack gap={1}>
          <Text font="body">
            <TextIcon active name="dot" size="xs" />
            <Text font="body">This is some text</Text>
          </Text>
          <Text font="body">
            <TextIcon active name="dot" size="xs" />
            <Text font="body">
              This is soooooooooooooome reallllllllllllllllly loooooooonnngggggg text
            </Text>
          </Text>
        </VStack>
      </Example>
      <Example title="Animated Icon">
        <Pressable
          noScaleOnPress
          accessibilityHint="hit star to rate the product"
          accessibilityLabel="rating a product"
          background="transparent"
          onPress={toggle}
        >
          <HStack gap={1}>
            {animatedIcon}
            {animatedIcon}
            {animatedIcon}
            {animatedIcon}
          </HStack>
        </Pressable>
      </Example>
      <Example title="Icon Sheet">
        <IconSheet />
      </Example>
    </ExampleScreen>
  );
};

export default IconScreen;
