import React, { memo, useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { periodLabelMap } from '@coinbase/cds-common/tokens/sparkline';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';

import { useHorizontallyScrollingPressables } from '../../../hooks/useHorizontallyScrollingPressables';
import { useTheme } from '../../../hooks/useTheme';
import { Box } from '../../../layout/Box';
import { HStack } from '../../../layout/HStack';
import { OverflowGradient } from '../../../layout/OverflowGradient';
import { Pressable } from '../../../system/Pressable';
import { Text } from '../../../typography';
import { Haptics } from '../../../utils/haptics';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

export type SparklineInteractivePeriodSelectorProps<Period extends string> = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  periods: { label: string; value: Period }[];
  color: string;
};

export type SparklineInteractivePeriodProps<Period extends string> = {
  period: { label: string; value: Period };
  selectedPeriod: Period;
  setSelectedPeriod: SparklineInteractivePeriodSelectorProps<Period>['setSelectedPeriod'];
  color: string;
};

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  getLayoutHandler,
  color,
}: SparklineInteractivePeriodProps<Period> & {
  getLayoutHandler: (id: string) => ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
}) {
  const isSelected = period.value === selectedPeriod;
  const periodLabel = periodLabelMap[period.label] ?? period.label;
  const periodHint = useMemo(
    () =>
      isSelected
        ? `Currently showing data for the ${periodLabel} timeframe`
        : `Show data for the ${periodLabel} timeframe`,
    [isSelected, periodLabel],
  );

  const handleOnPress = useCallback(() => {
    void Haptics.lightImpact();
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);
  const theme = useTheme();

  const textStyle = useMemo(
    () => ({
      color: isSelected ? color : theme.color.fgMuted,
    }),
    [color, isSelected, theme.color.fgMuted],
  );

  const accessibilityState = useMemo(
    () => ({
      selected: isSelected,
    }),
    [isSelected],
  );

  return (
    <Box
      key={period.value}
      alignItems="center"
      justifyContent="center"
      onLayout={getLayoutHandler(period.value)}
      paddingY={2}
    >
      <Pressable
        accessibilityHint={periodHint}
        accessibilityLabel={periodLabel}
        accessibilityState={accessibilityState}
        background={isSelected ? 'bgPrimaryWash' : 'bg'}
        borderColor="transparent"
        borderRadius={1000}
        onPress={handleOnPress}
      >
        <Text font="label1" paddingX={2} paddingY={1} style={textStyle}>
          {period.label}
        </Text>
      </Pressable>
    </Box>
  );
}

const periodSelectorStyles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  hStackContainer: {
    flex: 1,
  },
});

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;

export const SparklineInteractivePeriodSelector = <Period extends string>({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  color,
}: SparklineInteractivePeriodSelectorProps<Period>) => {
  const theme = useTheme();
  const accessibleForeground =
    color !== 'auto'
      ? color
      : getAccessibleColor({
          background: theme.color.bg,
          foreground: 'auto',
        });
  const { markerOpacity } = useSparklineInteractiveContext();
  const {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
    getPressableLayoutHandler,
  } = useHorizontallyScrollingPressables(selectedPeriod);

  const opacity = markerOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Box animated background="bg" opacity={opacity}>
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={periodSelectorStyles.scrollViewContainer}
        onContentSizeChange={handleScrollContentSizeChange}
        onLayout={handleScrollContainerLayout}
        onScroll={handleScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
      >
        <HStack
          justifyContent="space-between"
          padding={0}
          style={periodSelectorStyles.hStackContainer}
        >
          {periods.map((period) => (
            <SparklineInteractivePeriod
              key={period.value}
              color={accessibleForeground}
              getLayoutHandler={getPressableLayoutHandler}
              period={period}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          ))}
        </HStack>
      </ScrollView>
      {isScrollContentOverflowing && isScrollContentOffscreenRight && <OverflowGradient />}
    </Box>
  );
};
