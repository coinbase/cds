import React, { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { Animated, type StyleProp, type View, type ViewStyle } from 'react-native';
import type { CircleProps } from 'react-native-svg';
import { Circle, G, Svg } from 'react-native-svg';
import type { SharedProps, ThemeVars } from '@coinbase/cds-common';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { getCircumference, getRadius } from '@coinbase/cds-common/utils/circle';
import { getProgressCircleParams } from '@coinbase/cds-common/visualizations/getProgressCircleParams';
import { useProgressSize } from '@coinbase/cds-common/visualizations/useProgressSize';
import { isTest } from '@coinbase/cds-utils';

import { convertMotionConfig } from '../animation/convertMotionConfig';
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

export type ProgressCircleBaseProps = ProgressBaseProps & {
  /**
   * Toggle used to hide the content node rendered inside the circle.
   */
  hideContent?: boolean;
  /**
   * @deprecated Use hideContent instead
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
};

export type ProgressCircleProps = ProgressCircleBaseProps & {
  /**
   * Custom styles for the progress circle root.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the progress circle.
   */
  styles?: {
    /**
     * Custom styles for the progress circle root.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the progress circle svg container.
     */
    svgContainer?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the progress circle svg.
     */
    svg?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the text container.
     */
    textContainer?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the progress circle inner.
     */
    progress?: Partial<CircleProps>;
    /**
     * Custom styles for the progress circle inner.
     */
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
  'progress' | 'onAnimationEnd' | 'onAnimationStart' | 'disableAnimateOnMount'
> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'weight' | 'color'>> & {
    visuallyDisabled?: boolean;
    style?: Partial<CircleProps>;
  };

const ProgressCircleInner = memo(
  ({
    size,
    progress,
    color,
    weight,
    visuallyDisabled,
    style,
    onAnimationEnd,
    onAnimationStart,
    disableAnimateOnMount,
  }: ProgressInnerCircleProps) => {
    const strokeWidth = useProgressSize(weight);
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
        ref={!isTest() ? circleRef : undefined} // This is required because Circle is mocked in the unit test to support testID. The mock does not support refs
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
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        // Default is empty string due to iOS VoiceOver repeating percentage multiple times when
        // a11y label isn't specified
        accessibilityLabel = '',
        color = 'bgPrimary',
        disabled,
        disableAnimateOnMount,
        testID,
        hideContent,
        hideText,
        size,
        contentNode,
        style,
        styles,
        onAnimationEnd,
        onAnimationStart,
      }: ProgressCircleProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const strokeWidth = useProgressSize(weight);

      const visSize = size ?? '100%';

      const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

      const textContainerStyle = useMemo(
        () => [{ padding: strokeWidth }, styles?.textContainer],
        [strokeWidth, styles?.textContainer],
      );

      return (
        <VisualizationContainer height={visSize} width={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              ref={forwardedRef}
              accessible
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="progressbar"
              accessibilityValue={{
                min: 0,
                max: 100,
                now: Math.round(progress * 100),
              }}
              alignItems="center"
              height={height}
              justifyContent="center"
              style={rootStyle}
              testID={testID}
              width={width}
            >
              <Box
                flexGrow={0}
                flexShrink={0}
                height={circleSize}
                style={styles?.svgContainer}
                width={circleSize}
              >
                <Svg
                  key={circleSize}
                  height={circleSize}
                  style={styles?.svg}
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
                      onAnimationEnd={onAnimationEnd}
                      onAnimationStart={onAnimationStart}
                      progress={progress}
                      size={circleSize}
                      style={styles?.progress}
                      visuallyDisabled={disabled}
                      weight={weight}
                    />
                  </G>
                </Svg>
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
                      {contentNode ?? (
                        <DefaultProgressCircleContent
                          disableAnimateOnMount={disableAnimateOnMount}
                          disabled={disabled}
                          progress={progress}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
