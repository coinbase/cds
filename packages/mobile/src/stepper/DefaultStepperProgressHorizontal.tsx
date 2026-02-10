import { memo, useCallback, useEffect } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Box } from '../layout/Box';

import type { StepperProgressComponent } from './Stepper';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const DefaultStepperProgressHorizontal: StepperProgressComponent = memo(
  function DefaultStepperProgressHorizontal({
    step,
    parentStep,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    progress,
    complete,
    isDescendentActive,
    progressTimingConfig,
    animate,
    disableAnimateOnMount,
    style,
    background = 'bgLine',
    defaultFill = 'bgPrimary',
    activeFill = 'bgPrimary',
    descendentActiveFill = 'bgPrimary',
    visitedFill = 'bgLinePrimarySubtle',
    completeFill = 'bgLinePrimarySubtle',
    borderRadius = 200,
    height = 4,
    ...props
  }) {
    const containerWidth = useSharedValue(0);
    const animatedProgress = useSharedValue(progress);

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerWidth.value = event.nativeEvent.layout.width;
      },
      [containerWidth],
    );

    useEffect(() => {
      animatedProgress.value = withTiming(progress, progressTimingConfig);
    }, [progress, progressTimingConfig, animatedProgress]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: animatedProgress.value * containerWidth.value,
    }));

    return (
      <Box
        accessibilityElementsHidden
        background={background}
        borderRadius={borderRadius}
        flexGrow={1}
        height={height}
        onLayout={handleLayout}
        style={style}
        {...props}
      >
        <AnimatedBox
          background={
            complete
              ? completeFill
              : active
                ? activeFill
                : isDescendentActive
                  ? descendentActiveFill
                  : visited
                    ? visitedFill
                    : defaultFill
          }
          borderRadius={borderRadius}
          height="100%"
          style={animatedStyle}
        />
      </Box>
    );
  },
);
