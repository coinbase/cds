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
import { usePreviousValues } from '@coinbase/cds-common/hooks/usePreviousValues';
import type { SharedAccessibilityProps, SharedProps, Weight } from '@coinbase/cds-common/types';
import { useProgressSize } from '@coinbase/cds-common/visualizations/useProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack } from '../layout';
import type { HintMotionBaseProps } from '../motion/types';

export type ProgressBaseProps = SharedProps &
  Pick<HintMotionBaseProps, 'disableAnimateOnMount'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Number between 0-1 representing the progress percentage */
    progress: number;
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
        progress,
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
      const height = useProgressSize(weight);

      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([disableAnimateOnMount ? progress : 0]);

      addPreviousPercent(progress);
      const previousPercent = getPreviousPercent() ?? 0;

      const animatedProgress = useRef(new Animated.Value(previousPercent));

      const [innerWidth, setInnerWidth] = useState<number>(-1);

      useEffect(() => {
        if (innerWidth > -1) {
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
      }, [progress, animatedProgress, innerWidth, onAnimationStart, onAnimationEnd]);

      const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setInnerWidth(event.nativeEvent.layout.width);
      }, []);

      const rootStyle = useMemo(() => {
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
            opacity: innerWidth > -1 ? 1 : 0,
            transform: [
              {
                translateX: animatedProgress.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: I18nManager.isRTL ? [innerWidth, 0] : [innerWidth * -1, 0],
                }),
              },
            ],
          },
          styles?.progress,
        ],
        [innerWidth, styles?.progress],
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
          style={rootStyle}
          testID={testID}
        >
          <Box
            animated
            alignItems="flex-start"
            borderRadius={200}
            dangerouslySetBackground={!disabled ? theme.color[color] : theme.color.bgLineHeavy}
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
