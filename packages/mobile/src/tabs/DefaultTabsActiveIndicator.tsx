import { memo, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Box } from '../layout';

import { type TabsActiveIndicatorProps, tabsSpringConfig } from './Tabs';

/**
 * Default underline-style indicator for mobile `Tabs`. Pass as
 * `TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}` with `TabComponent={DefaultTab}`.
 */
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const DefaultTabsActiveIndicator = memo(
  ({
    activeTabRect,
    background = 'bgPrimary',
    style,
    testID,
    ...props
  }: TabsActiveIndicatorProps) => {
    const { width, x } = activeTabRect;
    const rect = useSharedValue({ width, x });

    useEffect(() => {
      if (!width) return;
      rect.value = withSpring({ x, width }, tabsSpringConfig);
    }, [rect, width, x]);

    const animatedBoxStyle = useAnimatedStyle(
      () => ({
        transform: [{ translateX: rect.value.x }],
        width: rect.value.width,
      }),
      [],
    );

    if (!width) return null;

    return (
      <AnimatedBox
        animated
        background={background}
        bottom={0}
        height={2}
        left={0}
        pointerEvents="none"
        position="absolute"
        style={[animatedBoxStyle, style]}
        testID={testID}
        zIndex={0}
        {...props}
      />
    );
  },
);

DefaultTabsActiveIndicator.displayName = 'DefaultTabsActiveIndicator';
