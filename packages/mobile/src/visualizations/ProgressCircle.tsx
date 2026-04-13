import React, { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { Animated, type StyleProp, StyleSheet, type View, type ViewStyle } from 'react-native';
import type { CircleProps } from 'react-native-svg';
import { Circle, G, Svg } from 'react-native-svg';
import type { SharedProps, ThemeVars } from '@coinbase/cds-common';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { getCircumference, getRadius } from '@coinbase/cds-common/utils/circle';
import { getProgressCircleParams } from '@coinbase/cds-common/visualizations/getProgressCircleParams';
import { getProgressSize } from '@coinbase/cds-common/visualizations/getProgressSize';
import { isTest } from '@coinbase/cds-utils';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout';

import { DefaultProgressCircleContent } from './DefaultProgressCircleContent';
import type { ProgressBaseProps } from './ProgressBar';
import {
  VisualizationContainer,
  type VisualizationContainerDimension,
} from './VisualizationContainer';

type CircleType = React.ComponentClass<CircleProps & SharedProps>;
const AnimatedCircle = Animated.createAnimatedComponent(Circle as CircleType);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export type ProgressCircleBaseProps = ProgressBaseProps & {
  /**
   * Toggle used to hide the content node rendered inside the circle.
   */
  hideContent?: boolean;
  /**
   * @deprecated Use hideContent instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v8
   * Toggle used to hide the text rendered inside the circle.
   */
  hideText?: boolean;
  /**
   * Optional size in px for the visualization.
   * This is useful if the visualization is used in an HStack.
   * If this is omitted the visualization will fill the parent width or height.
   * Since it's a circular visualization it will fill the smaller of the parent width or height
   */
  size?: number;
  /**
   * Optional component to override the default content rendered inside the circle.
   */
  contentNode?: React.ReactNode;
  /**
   * Toggle used to show an indeterminate progress circle.
   */
  indeterminate?: boolean;
};

export type ProgressCircleProps = ProgressCircleBaseProps & {
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the ProgressCircle component */
  styles?: {
    /** Root element */
    root?: StyleProp<ViewStyle>;
    /** SVG container element */
    svgContainer?: StyleProp<ViewStyle>;
    /** SVG element */
    svg?: StyleProp<ViewStyle>;
    /** Text container element */
    textContainer?: StyleProp<ViewStyle>;
    /** Foreground progress circle element */
    progress?: Partial<CircleProps>;
    /** Background circle element */
    circle?: Partial<CircleProps>;
  };
};

export type ProgressCircleContentProps = Pick<
  ProgressCircleBaseProps,
  'progress' | 'disableAnimateOnMount' | 'disabled'
> &
  BoxProps & {
    /**
     * Custom text color.
     * @default fgMuted
     */
    color?: ThemeVars.Color;
  };

type ProgressInnerCircleProps = Pick<
  ProgressCircleBaseProps,
  'progress' | 'onAnimationEnd' | 'onAnimationStart' | 'disableAnimateOnMount' | 'indeterminate'
> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'color'>> & {
    visuallyDisabled?: boolean;
    style?: Partial<CircleProps>;
    strokeWidth: number;
  };

const ProgressCircleInner = memo(
  ({
    size,
    progress = 0,
    color,
    strokeWidth,
    visuallyDisabled,
    style,
    onAnimationEnd,
    onAnimationStart,
    disableAnimateOnMount,
  }: ProgressInnerCircleProps) => {
    const theme = useTheme();
    const circleRef = useRef<React.Component<CircleProps>>(null);

    const circumference = getCircumference(getRadius(size, strokeWidth));
    const initialOffset = disableAnimateOnMount
      ? circumference - circumference * progress
      : circumference;
    const animatedStrokeDashOffset = useRef(new Animated.Value(initialOffset));

    useEffect(() => {
      const strokeDashoffset = circumference - circumference * progress;

      onAnimationStart?.();

      Animated.timing(
        animatedStrokeDashOffset.current,
        convertMotionConfig({
          toValue: strokeDashoffset,
          ...animateProgressBaseSpec,
          useNativeDriver: true,
        }),
      ).start(({ finished }) => {
        if (finished) onAnimationEnd?.();
      });
    }, [circumference, progress, animatedStrokeDashOffset, onAnimationStart, onAnimationEnd]);

    return (
      <AnimatedCircle
        ref={!isTest() ? circleRef : undefined}
        strokeDasharray={circumference}
        strokeDashoffset={animatedStrokeDashOffset.current}
        strokeLinecap={progress > 0 ? 'round' : 'butt'}
        testID="cds-progress-circle-inner"
        {...getProgressCircleParams({
          size,
          strokeWidth,
          stroke: !visuallyDisabled ? theme.color[color] : theme.color.bgLineHeavy,
        })}
        {...(style || {})}
      />
    );
  },
);

export const ProgressCircle = memo(
  forwardRef((_props: ProgressCircleProps, forwardedRef: React.ForwardedRef<View>) => {
    const mergedProps = useComponentConfig('ProgressCircle', _props);
    const {
      indeterminate,
      weight = 'normal',
      progress = indeterminate ? 0.75 : 0,
      // Default is empty string due to iOS VoiceOver repeating percentage multiple times when
      // a11y label isn't specified
      accessibilityLabel = indeterminate ? 'Loading' : '',
      color = indeterminate ? 'fgMuted' : 'bgPrimary',
      disabled,
      disableAnimateOnMount = indeterminate ? true : false,
      testID,
      hideContent,
      hideText,
      size,
      contentNode,
      style,
      styles,
      onAnimationEnd,
      onAnimationStart,
    } = mergedProps;
    const theme = useTheme();
    const strokeWidth = getProgressSize(weight);

    const visSize = size ?? '100%';

    const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    const textContainerStyle = useMemo(
      () => [{ padding: strokeWidth }, styles?.textContainer],
      [strokeWidth, styles?.textContainer],
    );

    const animatedRotate = useRef(new Animated.Value(0));

    useEffect(() => {
      if (!indeterminate) return;
      // if indeterminate, animate the rotation of the svg
      const animation = Animated.loop(
        Animated.timing(
          animatedRotate.current,
          convertMotionConfig({
            toValue: 1,
            duration: 'slow4',
            easing: 'linear',
            fromValue: 0,
          }),
        ),
      );
      animation.start();
      return () => animation.stop();
    }, [indeterminate]);

    return (
      <VisualizationContainer height={visSize} width={visSize}>
        {({ width, height, circleSize }: VisualizationContainerDimension) => {
          return (
            <Box
              ref={forwardedRef}
              accessible
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="progressbar"
              accessibilityValue={
                indeterminate
                  ? undefined
                  : {
                      min: 0,
                      max: 100,
                      now: Math.round(progress * 100),
                    }
              }
              alignItems="center"
              height={height}
              justifyContent="center"
              style={rootStyle}
              testID={testID}
              width={width}
            >
              <AnimatedSvg
                key={circleSize}
                height={circleSize}
                style={[
                  styles?.svg,
                  styleSheet.svg,
                  {
                    transform: [
                      {
                        rotate: animatedRotate.current.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}
                viewBox={`0 0 ${circleSize} ${circleSize}`}
                width={circleSize}
              >
                <G origin={`${circleSize / 2}, ${circleSize / 2}`} rotation={-90}>
                  <Circle
                    {...getProgressCircleParams({
                      size: circleSize,
                      strokeWidth,
                      stroke: theme.color.bgLine,
                    })}
                    {...(styles?.circle || {})}
                  />
                  <ProgressCircleInner
                    color={color}
                    disableAnimateOnMount={disableAnimateOnMount}
                    indeterminate={indeterminate}
                    onAnimationEnd={onAnimationEnd}
                    onAnimationStart={onAnimationStart}
                    progress={progress}
                    size={circleSize}
                    strokeWidth={strokeWidth}
                    style={styles?.progress}
                    visuallyDisabled={disabled}
                  />
                </G>
              </AnimatedSvg>
              {!hideText && !hideContent && (
                <Box height="100%" position="absolute" style={textContainerStyle} width="100%">
                  {/* We clip the content node to the circle to prevent the node from overflowing over the circle */}
                  <Box
                    alignItems="center"
                    borderRadius={1000}
                    height="100%"
                    justifyContent="center"
                    overflow="hidden"
                    width="100%"
                  >
                    {contentNode ??
                      (!indeterminate && (
                        <DefaultProgressCircleContent
                          disableAnimateOnMount={disableAnimateOnMount}
                          disabled={disabled}
                          progress={progress}
                        />
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
          );
        }}
      </VisualizationContainer>
    );
  }),
);

const styleSheet = StyleSheet.create({
  svg: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
