import React, { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';
import { SegmentedTab, type SegmentedTabProps } from '../../tabs/SegmentedTab';
import { SegmentedTabs, type SegmentedTabsProps } from '../../tabs/SegmentedTabs';
import { type TabComponent, type TabsActiveIndicatorProps } from '../../tabs/Tabs';
import { tabsSpringConfig } from '../../tabs/Tabs';
import { Text, type TextBaseProps } from '../../typography/Text';

export const PeriodSelectorActiveIndicator = ({
  activeTabRect,
  background = 'bgPrimaryWash',
  position = 'absolute',
  borderRadius = 1000,
}: TabsActiveIndicatorProps) => {
  const theme = useTheme();
  const { width, height, x, y } = activeTabRect;

  const backgroundColorKey = background as keyof typeof theme.color;
  const targetColor = theme.color[backgroundColorKey] || background;

  const animatedValues = useSharedValue({ x, y, width, backgroundColor: targetColor });
  const isFirstRenderWithWidth = useRef(true);

  useEffect(() => {
    const nextAnimatedValues = { x, y, width, backgroundColor: targetColor };

    if (width <= 0) return;

    if (isFirstRenderWithWidth.current) {
      animatedValues.value = nextAnimatedValues;
      isFirstRenderWithWidth.current = false;
    } else {
      animatedValues.value = withSpring(nextAnimatedValues, tabsSpringConfig);
    }
  }, [animatedValues, targetColor, width, x, y]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: animatedValues.value.x }, { translateY: animatedValues.value.y }],
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
  ({
    ref,
    color = 'fgNegative',
    label = 'LIVE',
    font = 'label1',
    hideDot,
    style,
    ...props
  }: LiveTabLabelProps & {
    ref?: React.Ref<View>;
  }) => {
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
);

const PeriodSelectorTab: TabComponent = memo(
  ({
    ref,
    ...props
  }: SegmentedTabProps & {
    ref?: React.Ref<any>;
  }) => <SegmentedTab ref={ref} font="label1" {...props} />,
);

export type PeriodSelectorProps = SegmentedTabsProps;

/**
 * PeriodSelector is a specialized version of SegmentedTabs optimized for chart period selection.
 * It provides transparent background, primary wash active state, and full-width layout by default.
 */
export const PeriodSelector = memo(
  ({
    ref,
    background = 'transparent',
    activeBackground = 'bgPrimaryWash',
    activeColor = 'fgPrimary',
    width = '100%',
    justifyContent = 'space-between',
    TabComponent = PeriodSelectorTab,
    TabsActiveIndicatorComponent = PeriodSelectorActiveIndicator,
    ...props
  }: PeriodSelectorProps & {
    ref?: React.Ref<any>;
  }) => (
    <SegmentedTabs
      ref={ref}
      TabComponent={TabComponent}
      TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
      activeBackground={activeBackground}
      activeColor={activeColor}
      background={background}
      justifyContent={justifyContent}
      width={width}
      {...props}
    />
  ),
);
