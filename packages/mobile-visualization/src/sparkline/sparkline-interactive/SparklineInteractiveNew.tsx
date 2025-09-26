import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { chartCompactHeight, chartHeight } from '@coinbase/cds-common/tokens/sparkline';
import type {
  ChartData,
  ChartFormatDate,
  ChartScrubParams,
  Placement,
} from '@coinbase/cds-common/types';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { defaultChartPadding } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { emptyArray, noop } from '@coinbase/cds-utils';

import { type ChartTextChildren, LineChart, type LineSeries, Scrubber, XAxis } from '../../chart';

import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';

export * from '@coinbase/cds-common/types/Chart';

export type SparklineInteractiveDefaultFallback = Pick<
  SparklineInteractiveBaseProps<string>,
  'fallbackType' | 'compact'
>;

const mobileLayoutBreakpoint = 650;
const axisSize = 52;
const chartPaddingTop = defaultChartPadding.top;

export type SparklineInteractiveBaseProps<Period extends string> = {
  /**
   * Chart data bucketed by Period. Period is a string key
   */
  data?: Record<Period, ChartData>;
  /**
   * A list of periods that the chart will use. label is what is shown in the bottom of the chart and the value is the key.
   */
  periods: { label: string; value: Period }[];
  /**
   * default period value that the chart will use
   */
  defaultPeriod: Period;
  /**
   * Callback when the user selects a new period.
   */
  onPeriodChanged?: (period: Period) => void;
  /**
   * Callback when the user starts scrubbing
   */
  onScrubStart?: () => void;
  /**
   * Callback when a user finishes scrubbing
   */
  onScrubEnd?: () => void;
  /**
   * Callback used when the user is scrubbing. This will be called for every data point change.
   */
  onScrub?: (params: ChartScrubParams<Period>) => void;
  /**
   * Disables the scrub user interaction from the chart
   */
  disableScrubbing?: boolean;
  /**
   * function used to format the date that is shown in the bottom of the chart as the user scrubs
   */
  formatDate: ChartFormatDate<Period>;
  /**
   * Color of the line*
   */
  strokeColor: string;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  lineType?: 'solid' | 'dotted' | 'gradient';
  /**
   * Fallback shown in the chart when data is not available. This is usually a loading state.
   */
  fallback?: React.ReactNode;
  /**
   * If you use the default fallback then this specifies if the fallback line is decreasing or increasing
   */
  fallbackType?: 'positive' | 'negative';
  /**
   * Show the chart in compact height
   */
  compact?: boolean;
  /**
   * Hides the period selector
   */
  hidePeriodSelector?: boolean;
  /**
   * Adds an area fill to the Sparkline
   *
   * @default true
   */
  fill?: boolean;
  /**
   * The type of area fill to add to the Sparkline
   * @default 'gradient'
   */
  fillType?: 'gradient' | 'solid' | 'dotted';
  /**
   Formats the date above the chart as you scrub. Omit this if you don't want to show the date as the user scrubs
   */
  formatHoverDate?: (date: Date, period: Period) => string;
  /**
   Formats the price above the chart as you scrub. Omit this if you don't want to show the price as the user scrubs
   */
  formatHoverPrice?: (price: number) => string;
  /**
   * Adds a header node above the chart. It will be placed next to the period selector on web.
   */
  headerNode?: React.ReactNode;
  /**
   * Optional gutter to add to the Period selector. This is useful if you choose to use the full screen width for the chart
   */
  timePeriodGutter?: ThemeVars.Space;
  /**
   * Optional placement prop that position the period selector component above or below the chart
   */
  periodSelectorPlacement?: Extract<Placement, 'above' | 'below'>;
  /** Scales the sparkline to show more or less variance. Use a number less than 1 for less variance and a number greater than 1 for more variance. If you use a number greater than 1 it may clip the boundaries of the sparkline. */
  yAxisScalingFactor?: number;
};

export type SparklineInteractiveProps<Period extends string> =
  SparklineInteractiveBaseProps<Period> & {
    /**
     * Custom style for the root element.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom style for the header node.
       */
      header?: StyleProp<ViewStyle>;
      /**
       * Custom style for the root element.
       */
      root?: StyleProp<ViewStyle>;
    };
    /** Test ID for the header */
    headerTestID?: string;
    /**
     * Children to render inside the chart.
     */
    children?: React.ReactNode;
  };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  headerNodeContainer: {
    flex: 1,
  },
  periodSelectorContainer: {
    flex: 0,
  },
  bottomPeriodSelectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomPeriodSelectorInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    width: '100%',
  },
});

export const SparklineInteractive = memo(
  <Period extends string>({
    data,
    periods,
    defaultPeriod,
    onPeriodChanged,
    strokeColor,
    lineType,
    onScrub = noop,
    onScrubStart = noop,
    onScrubEnd = noop,
    formatDate,
    fallback = null,
    hidePeriodSelector = false,
    disableScrubbing = false,
    fill = true,
    fillType,
    yAxisScalingFactor = 1.0,
    compact,
    formatHoverDate,
    formatHoverPrice,
    headerNode,
    fallbackType = 'positive',
    timePeriodGutter,
    periodSelectorPlacement = 'above',
    style,
    styles: customStyles,
    headerTestID,
    children,
  }: SparklineInteractiveProps<Period>) => {
    const theme = useTheme();
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
    const [containerWidth, setContainerWidth] = useState(0);

    // Animation values
    const scrubbingOpacity = useSharedValue(0);
    const periodSelectorOpacity = useSharedValue(1);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
    }, []);

    const { showHeaderPeriodSelector, showBottomPeriodSelector } = useMemo(
      () => ({
        showHeaderPeriodSelector: periodSelectorPlacement === 'above' && !hidePeriodSelector,
        showBottomPeriodSelector: periodSelectorPlacement === 'below' && !hidePeriodSelector,
      }),
      [periodSelectorPlacement, hidePeriodSelector],
    );

    const sparklineInteractiveHeight = useMemo(() => {
      const innerHeight = compact ? chartCompactHeight : chartHeight;
      return innerHeight + chartPaddingTop + axisSize;
    }, [compact]);

    const isMobileLayout = containerWidth > 0 && containerWidth < mobileLayoutBreakpoint;

    const color =
      strokeColor && strokeColor !== 'auto'
        ? strokeColor
        : getAccessibleColor({
            background: theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });

    const dataForPeriod = useMemo(() => {
      if (!data) {
        return emptyArray;
      }
      return data[selectedPeriod] ?? emptyArray;
    }, [data, selectedPeriod]);

    const [scrubberLabel, setScrubberLabel] = useState<ChartTextChildren | null>(null);
    const handleHighlightChange = useCallback(
      (index: number | null) => {
        if (index !== null && dataForPeriod[index]) {
          const point = dataForPeriod[index];

          if (!isScrubbing) {
            setIsScrubbing(true);
            scrubbingOpacity.value = withTiming(1, { duration: 200 });
            periodSelectorOpacity.value = withTiming(0, { duration: 200 });
            onScrubStart();
          }

          onScrub({
            period: selectedPeriod,
            point,
          });

          if (formatHoverDate && formatHoverPrice) {
            // In React Native, we need to handle this differently as we can't use tspan directly
            // We'll just concatenate the strings
            setScrubberLabel(
              `${formatHoverPrice(point.value)} ${formatHoverDate(point.date, selectedPeriod)}`,
            );
          } else if (formatHoverDate) {
            setScrubberLabel(formatHoverDate(point.date, selectedPeriod));
          } else if (formatHoverPrice) {
            setScrubberLabel(formatHoverPrice(point.value));
          }
        } else if (isScrubbing) {
          setIsScrubbing(false);
          scrubbingOpacity.value = withTiming(0, { duration: 200 });
          periodSelectorOpacity.value = withTiming(1, { duration: 200 });
          onScrubEnd();
        }
      },
      [
        dataForPeriod,
        isScrubbing,
        onScrub,
        selectedPeriod,
        onScrubStart,
        onScrubEnd,
        formatHoverDate,
        formatHoverPrice,
        scrubbingOpacity,
        periodSelectorOpacity,
      ],
    );

    // Extract values and dates once to avoid repeated mapping
    const { values, dates } = useMemo(() => {
      return {
        values: dataForPeriod.map((d) => d.value),
        dates: dataForPeriod.map((d) => d.date),
      };
    }, [dataForPeriod]);

    // Calculate y-axis bounds based on scaling factor
    const yAxisBounds = useMemo(() => {
      if (!values.length || yAxisScalingFactor === undefined) return undefined;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      const center = (min + max) / 2;

      // Apply scaling factor: < 1 expands range (less variance), > 1 shrinks range (more variance)
      const scaledRange = range / yAxisScalingFactor;

      return {
        min: center - scaledRange / 2,
        max: center + scaledRange / 2,
      };
    }, [values, yAxisScalingFactor]);

    const series = useMemo((): LineSeries[] => {
      // If we have custom y-axis bounds (from scaling), pass tuple data
      // so the area extends to the scaled minimum, not just the data minimum
      const seriesData =
        yAxisBounds && fill ? values.map((v) => [yAxisBounds.min, v] as [number, number]) : values;

      return [
        {
          id: 'main',
          data: seriesData,
          color,
          areaBaseline: yAxisBounds?.min,
        },
      ];
    }, [values, color, yAxisBounds, fill]);

    const formatAxisDate = useCallback(
      (index: number) => {
        if (!dates[index]) return '';
        return formatDate(dates[index], selectedPeriod);
      },
      [dates, formatDate, selectedPeriod],
    );

    const handlePeriodChange = useCallback(
      (period: Period) => {
        if (data && typeof data === 'object' && period !== selectedPeriod) {
          setSelectedPeriod(period);
          onPeriodChanged?.(period);
        }
      },
      [data, selectedPeriod, onPeriodChanged],
    );

    const periodSelector = (
      <SparklineInteractivePeriodSelector
        color={color}
        periods={periods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={handlePeriodChange}
      />
    );

    const rootStyles = useMemo(
      () => [styles.container, style, customStyles?.root],
      [style, customStyles?.root],
    );

    const headerStyles = useMemo(
      () => [
        styles.headerNodeContainer,
        !isMobileLayout && { paddingHorizontal: theme.space[gutter] },
        customStyles?.header,
      ],
      [isMobileLayout, theme.space, customStyles?.header],
    );

    // Animated styles for axis visibility
    const xAxisAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        scrubbingOpacity.value,
        [0, 1],
        showBottomPeriodSelector ? [0, 1] : [1, 1],
      ),
    }));

    const bottomPeriodSelectorAnimatedStyle = useAnimatedStyle(() => ({
      opacity: periodSelectorOpacity.value,
    }));

    const timePeriodGutterStyle = useMemo(() => {
      if (timePeriodGutter) {
        return {
          paddingHorizontal: theme.space[timePeriodGutter],
        };
      }
      return {};
    }, [theme.space, timePeriodGutter]);

    return (
      <View onLayout={handleLayout} style={rootStyles}>
        {isMobileLayout && showHeaderPeriodSelector && (
          <Box paddingBottom={2} width="100%">
            {periodSelector}
          </Box>
        )}
        {(!!headerNode || (!isMobileLayout && showHeaderPeriodSelector)) && (
          <View style={styles.headerContainer}>
            {headerNode ? (
              <Box style={headerStyles} testID={headerTestID}>
                {headerNode}
              </Box>
            ) : (
              <View style={{ flex: 1 }} />
            )}
            {!isMobileLayout && showHeaderPeriodSelector && (
              <View style={styles.periodSelectorContainer}>{periodSelector}</View>
            )}
          </View>
        )}
        <LineChart
          areaType={fillType}
          dataKey={selectedPeriod}
          enableScrubbing={!disableScrubbing}
          fallback={fallback}
          fallbackType={fallbackType}
          height={sparklineInteractiveHeight}
          onScrubberPosChange={handleHighlightChange}
          padding={{ left: 0, right: 0, top: chartPaddingTop, bottom: 0 }}
          series={series}
          showArea={fill}
          style={{
            // used when user is navigating with keyboard (not common on mobile but good to have)
            outlineColor: color,
          }}
          type={lineType}
          width="100%"
          xAxis={{
            domainLimit: 'strict',
          }}
          yAxis={{
            domain: yAxisBounds,
            domainLimit: 'strict',
          }}
        >
          <Animated.View style={xAxisAnimatedStyle}>
            <XAxis position="end" size={axisSize} tickLabelFormatter={formatAxisDate} />
          </Animated.View>
          {children}
          <Scrubber scrubberLabel={scrubberLabel} seriesIds={[]} />
        </LineChart>
        {showBottomPeriodSelector && (
          <Animated.View
            style={[styles.bottomPeriodSelectorContainer, bottomPeriodSelectorAnimatedStyle]}
          >
            <HStack style={[styles.bottomPeriodSelectorInner, timePeriodGutterStyle]}>
              {periodSelector}
            </HStack>
          </Animated.View>
        )}
      </View>
    );
  },
);
