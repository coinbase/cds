import React, { memo, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useDateLookup } from '@coinbase/cds-common/visualizations/useDateLookup';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Text } from '@coinbase/cds-mobile/typography';
import times from 'lodash/times';

import type { ChartFormatDate, ChartGetMarker } from './SparklineInteractive';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const numberOfLabels = 5;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  label: {
    width: `${100 / numberOfLabels}%`,
  },
});

const SparklineInteractiveMarkerDate: React.FunctionComponent<
  React.PropsWithChildren<{
    getFormattedDate: (xPosition: number) => string;
  }>
> = memo(({ getFormattedDate }) => {
  const [label, onLayout] = useLayout();
  const x = useMemo(() => {
    return label.x + label.width / 2;
  }, [label.width, label.x]);

  return (
    <Text
      align="center"
      color="fgMuted"
      font="label2"
      onLayout={onLayout}
      paddingTop={3}
      style={styles.label}
    >
      {getFormattedDate(x)}
    </Text>
  );
});

export type SparklineInteractiveMarkerDatesProps<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
  timePeriodGutter?: ThemeVars.Space;
};

function SparklineInteractiveMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
  timePeriodGutter,
}: SparklineInteractiveMarkerDatesProps<Period>) {
  const { markerOpacity } = useSparklineInteractiveContext();
  const theme = useTheme();
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  const paddingHorizontalStyle = useMemo(() => {
    const localStyle: ViewStyle = {};
    if (timePeriodGutter) {
      localStyle.paddingHorizontal = theme.space[timePeriodGutter];
    }

    return localStyle;
  }, [theme.space, timePeriodGutter]);

  const rootStyle = useMemo(() => {
    return {
      ...styles.wrapper,
      opacity: markerOpacity,
      backgroundColor: theme.color.bg,
      ...paddingHorizontalStyle,
    };
  }, [markerOpacity, paddingHorizontalStyle, theme.color.bg]);

  return (
    <Animated.View pointerEvents="none" style={rootStyle}>
      {times(numberOfLabels).map((_, i) => {
        return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
      })}
    </Animated.View>
  );
}

export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;
