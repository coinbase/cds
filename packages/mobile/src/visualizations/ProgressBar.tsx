import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  type LayoutChangeEvent,
  type StyleProp,
  type View,
  type ViewStyle,
} from 'react-native';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps, SharedProps, Weight } from '@coinbase/cds-common/types';
import { getProgressSize } from '@coinbase/cds-common/visualizations/getProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack } from '../layout';
import type { HintMotionBaseProps } from '../motion/types';

export type ProgressBaseProps = SharedProps &
  Pick<HintMotionBaseProps, 'disableAnimateOnMount'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Number between 0-1 representing the progress percentage */
    progress?: number;
    /** Toggle used to change thickness of progress visualization
     * @default normal
     * */
    weight?: Weight;
    /**
     * Toggle used to show a disabled progress visualization
     */
    disabled?: boolean;
    /**
     * Custom progress color.
     * @default primary
     */
    color?: ThemeVars.Color;
    /**
     * Callback fired when the progress animation ends.
     */
    onAnimationEnd?: () => void;
    /**
     * Callback fired when the progress animation starts.
     */
    onAnimationStart?: () => void;
  };

export type ProgressBarProps = ProgressBaseProps & {
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the ProgressBar component */
  styles?: {
    /** Root element */
    root?: StyleProp<ViewStyle>;
    /** Progress fill element */
    progress?: StyleProp<ViewStyle>;
  };
};

export const ProgressBar = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress = 0,
        color = 'bgPrimary',
        disabled,
        disableAnimateOnMount,
        testID,
        accessibilityLabel,
        style,
        styles,
        onAnimationEnd,
        onAnimationStart,
      }: ProgressBarProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const height = getProgressSize(weight);

      const animatedProgress = useRef(new Animated.Value(disableAnimateOnMount ? progress : 0));

      const [trackWidth, setTrackWidth] = useState<number>(-1);
      useEffect(() => {
        if (trackWidth > -1) {
          onAnimationStart?.();

          Animated.timing(
            animatedProgress.current,
            convertMotionConfig({
              toValue: progress,
              ...animateProgressBaseSpec,
              useNativeDriver: true,
            }),
          )?.start(({ finished }) => {
            if (finished) onAnimationEnd?.();
          });
        }
      }, [progress, trackWidth, onAnimationEnd, onAnimationStart]);

      const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setTrackWidth(event.nativeEvent.layout.width);
      }, []);

      const trackStyle = useMemo(() => {
        const justifyContent = I18nManager.isRTL ? ('flex-end' as const) : ('flex-start' as const);
        return [
          {
            borderRadius: 200,
            backgroundColor: theme.color.bgLine,
            height,
            overflow: 'hidden' as const,
            alignItems: 'center' as const,
            justifyContent,
          },
          style,
          styles?.root,
        ];
      }, [style, styles?.root, theme.color.bgLine, height]);

      const progressStyle = useMemo(
        () => [
          {
            opacity: trackWidth > -1 ? 1 : 0,
            transform: [
              {
                translateX: animatedProgress.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: I18nManager.isRTL ? [trackWidth, 0] : [-trackWidth, 0],
                }),
              },
            ],
          },
          styles?.progress,
        ],
        [trackWidth, styles?.progress],
      );

      return (
        <HStack
          ref={forwardedRef}
          accessible
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
          alignItems="center"
          flexGrow={1}
          flexShrink={0}
          onLayout={handleLayout}
          style={trackStyle}
          testID={testID}
        >
          <Box
            animated
            alignItems="flex-start"
            background={!disabled ? color : 'bgLineHeavy'}
            borderRadius={200}
            flexGrow={0}
            flexShrink={0}
            height="100%"
            justifyContent="center"
            style={progressStyle}
            testID="cds-progress-bar"
            width="100%"
          />
        </HStack>
      );
    },
  ),
);
