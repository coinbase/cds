import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import {
  SegmentedTabs,
  type SegmentedTabsProps,
  type TabComponent,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { tabsSpringConfig } from '@coinbase/cds-mobile/tabs/Tabs';
import { Text, type TextBaseProps } from '@coinbase/cds-mobile/typography';

// Animated active indicator to support smooth transition of background color
export const PeriodSelectorActiveIndicator = ({
  activeTabRect,
  background = 'bgPrimaryWash',
  position = 'absolute',
  borderRadius = 1000,
}: TabsActiveIndicatorProps) => {
  const theme = useTheme();
  const { width, height, x } = activeTabRect;

  // Get the target background color
  const backgroundColorKey = background as keyof typeof theme.color;
  const targetColor = theme.color[backgroundColorKey] || background;

  // Track previous values for first render detection
  const previousActiveTabRect = React.useRef(activeTabRect);
  const previousColor = React.useRef(targetColor);

  // Combined animated value for position, size, and color
  const newAnimatedValues = { x, width, backgroundColor: targetColor };
  const animatedValues = useSharedValue(newAnimatedValues);

  const isFirstRenderWithWidth =
    previousActiveTabRect.current.width === 0 && activeTabRect.width > 0;

  if (previousActiveTabRect.current !== activeTabRect || previousColor.current !== targetColor) {
    previousActiveTabRect.current = activeTabRect;
    previousColor.current = targetColor;
    animatedValues.value = isFirstRenderWithWidth
      ? newAnimatedValues
      : withSpring(newAnimatedValues, tabsSpringConfig);
  }

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: animatedValues.value.x }],
      width: animatedValues.value.width,
      backgroundColor: animatedValues.value.backgroundColor,
    }),
    [animatedValues],
  );

  if (!width) return;

  return (
    <Animated.View
      style={[
        {
          position: position as ViewStyle['position'],
          height,
          borderRadius,
        },
        animatedStyles,
      ]}
      testID="period-selector-active-indicator"
    />
  );
};

export type LiveTabLabelBaseProps = TextBaseProps & {
  /**
   * The label to display.
   * @default 'LIVE'
   */
  label?: string;
  /**
   * Whether to hide the dot.
   */
  hideDot?: boolean;
  /**
   * Style prop for customization
   */
  style?: any;
};

export type LiveTabLabelProps = LiveTabLabelBaseProps;

const styles = StyleSheet.create({
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const LiveTabLabel = memo(
  forwardRef<View, LiveTabLabelProps>(
    ({ color = 'fgNegative', label = 'LIVE', font = 'label1', hideDot, style, ...props }, ref) => {
      const theme = useTheme();

      const colorKey = color as keyof typeof theme.color;
      const textColor = theme.color[colorKey] || color;

      const dotStyle = useMemo(
        () => ({
          width: theme.space[1],
          height: theme.space[1],
          borderRadius: 1000,
          marginRight: theme.space[0.75],
          backgroundColor: textColor,
        }),
        [theme.space, textColor],
      );

      return (
        <View ref={ref} style={[styles.liveContainer, style]}>
          {!hideDot && <View style={dotStyle} />}
          <Text color={color} font={font} {...props}>
            {label}
          </Text>
        </View>
      );
    },
  ),
);

// Custom tab component with primary color for active state
const PeriodSelectorTab: TabComponent = memo(
  forwardRef((props: SegmentedTabProps, ref: React.ForwardedRef<any>) => (
    <SegmentedTab ref={ref} activeColor="fgPrimary" font="label1" {...props} />
  )),
);

export type PeriodSelectorProps = SegmentedTabsProps;

/**
 * PeriodSelector is a specialized version of SegmentedTabs optimized for chart period selection.
 * It provides transparent background, primary wash active state, and full-width layout by default.
 */
export const PeriodSelector = memo(
  forwardRef(
    (
      {
        background = 'transparent',
        activeBackground = 'bgPrimaryWash',
        width = '100%',
        justifyContent = 'space-between',
        TabComponent = PeriodSelectorTab,
        TabsActiveIndicatorComponent = PeriodSelectorActiveIndicator,
        ...props
      }: PeriodSelectorProps,
      ref: React.ForwardedRef<any>,
    ) => (
      <SegmentedTabs
        ref={ref}
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        activeBackground={activeBackground}
        background={background}
        justifyContent={justifyContent}
        width={width}
        {...props}
      />
    ),
  ),
);
