import React, { memo, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { useDateLookup } from '@cbhq/cds-common/visualizations/useDateLookup';
import { useLayout } from '@cbhq/cds-mobile/hooks/useLayout';
import { useTheme } from '@cbhq/cds-mobile/hooks/useTheme';
import { TextLabel2 } from '@cbhq/cds-mobile/typography';
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
    <TextLabel2
      align="center"
      color="fgMuted"
      onLayout={onLayout}
      paddingTop={3}
      style={styles.label}
    >
      {getFormattedDate(x)}
    </TextLabel2>
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
