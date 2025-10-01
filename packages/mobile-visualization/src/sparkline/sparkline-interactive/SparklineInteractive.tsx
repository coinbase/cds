import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { Placement } from '@coinbase/cds-common/types';
import type {
  ChartData,
  ChartDataPoint,
  ChartFormatAmount,
  ChartFormatDate,
  ChartGetMarker,
  ChartScrubParams,
  ChartTimeseries,
} from '@coinbase/cds-common/types/Chart';
import { minMax } from '@coinbase/cds-common/utils/chart';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { useSparklineCoordinates } from '@coinbase/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackNegative, chartFallbackPositive } from '@coinbase/cds-lottie-files';
import { Lottie } from '@coinbase/cds-mobile/animation';
import { useScreenReaderStatus } from '@coinbase/cds-mobile/hooks/useScreenReaderStatus';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout';
import { emptyArray, noop } from '@coinbase/cds-utils';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

import { SparklineAccessibleView } from './SparklineAccessibleView';
import { SparklineInteractiveHoverDate } from './SparklineInteractiveHoverDate';
import { SparklineInteractiveLineVertical } from './SparklineInteractiveLineVertical';
import { SparklineInteractiveMarkerDates } from './SparklineInteractiveMarkerDates';
import { SparklineInteractiveMinMax } from './SparklineInteractiveMinMax';
import { SparklineInteractivePanGestureHandler } from './SparklineInteractivePanGestureHandler';
import { SparklineInteractivePaths } from './SparklineInteractivePaths';
import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';
import {
  SparklineInteractiveProvider,
  useSparklineInteractiveContext,
} from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export * from '@coinbase/cds-common/types/Chart';

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
   *
   * @default false
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
   * Fallback shown in the chart when data is not available. This is usually a loading state.
   */
  fallback?: React.ReactNode;
  /**
   * If you use the default fallback then this specifies if the fallback line is decreasing or increasing
   */
  fallbackType?: 'positive' | 'negative';
  /**
   * Show the chart in compact height
   *
   * @default false
   */
  compact?: boolean;
  /**
   * Hides the period selector at the bottom of the chart
   *
   * @default false
   */
  hidePeriodSelector?: boolean;
  /**
   * Adds an area fill to the Sparkline
   *
   * @default true
   */
  fill?: boolean;
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
   *  Optional data to show on hover/scrub instead of the original sparkline. This allows multiple timeseries lines.
   *
   *  Period => timeseries list
   */
  hoverData?: Record<Period, ChartTimeseries[]>;
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

export type SparklineInteractiveDefaultFallback = Pick<
  SparklineInteractiveBaseProps<string>,
  'fallbackType' | 'compact'
>;

const DefaultFallback = memo(({ fallbackType }: SparklineInteractiveDefaultFallback) => {
  const source = fallbackType === 'negative' ? chartFallbackNegative : chartFallbackPositive;
  return (
    <Box alignItems="center" justifyContent="center">
      <Lottie autoplay loop height="100%" source={source} />
    </Box>
  );
});

function defaultFormatMinMaxLabel(value: string | number) {
  return `${value}`;
}

type BelowChartProps<Period extends string> = {
  color: string;
  formatDate: ChartFormatDate<Period>;
  getMarker: ChartGetMarker;
  periods: { label: string; value: Period }[];
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  timePeriodGutter?: ThemeVars.Space;
};

function BelowChartWithGeneric<Period extends string>({
  color,
  formatDate,
  getMarker,
  periods,
  selectedPeriod,
  setSelectedPeriod,
  timePeriodGutter,
}: BelowChartProps<Period>) {
  const theme = useTheme();

  const style = useMemo(() => {
    if (timePeriodGutter) {
      return {
        paddingHorizontal: theme.space[timePeriodGutter],
      };
    }
    return {};
  }, [theme.space, timePeriodGutter]);

  return (
    <View style={style}>
      <SparklineInteractiveMarkerDates
        formatDate={formatDate}
        getMarker={getMarker}
        selectedPeriod={selectedPeriod}
        timePeriodGutter={timePeriodGutter}
      />
      <SparklineInteractivePeriodSelector
        color={color}
        periods={periods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </View>
  );
}

const BelowChart = memo(BelowChartWithGeneric) as typeof BelowChartWithGeneric;

export type SparklineInteractiveHoverDateRefProps<Period extends string> = {
  update: (params: ChartScrubParams<Period>) => void;
};

function SparklineInteractiveContentWithGeneric<Period extends string>({
  data,
  periods,
  defaultPeriod,
  onPeriodChanged,
  strokeColor,
  onScrub = noop,
  onScrubStart = noop,
  onScrubEnd = noop,
  formatMinMaxLabel = defaultFormatMinMaxLabel,
  formatDate,
  fallback = null,
  hideMinMaxLabel = false,
  hidePeriodSelector = false,
  disableScrubbing = false,
  fill = true,
  yAxisScalingFactor = 1.0,
  formatHoverDate,
  headerNode,
  fallbackType = 'positive',
  disableHorizontalPadding = false,
  hoverData,
  timePeriodGutter,
  allowOverflowGestures,
  style,
  styles,
  headerTestID,
}: SparklineInteractiveProps<Period>) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const { isFallbackVisible, showFallback, chartOpacity, minMaxOpacity, compact } =
    useSparklineInteractiveContext();
  const color = strokeColor;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const chartHoverTextInputRef = useRef<SparklineInteractiveHoverDateRefProps<Period> | null>(null);
  const theme = useTheme();
  const isScreenReaderEnabled = useScreenReaderStatus();

  const lineVerticalColor = useMemo(() => {
    const lineColor =
      color !== 'auto'
        ? color
        : getAccessibleColor({
            background: theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });
    return hoverData ? theme.color.bgLineHeavy : lineColor;
  }, [hoverData, color, theme.color.bg, theme.color.bgLineHeavy]);

  const dataForPeriod = useMemo(() => {
    if (!data) {
      return emptyArray;
    }
    return data[selectedPeriod] ?? emptyArray;
  }, [data, selectedPeriod]);

  // If dataForPeriod is empty we know that we are either loading
  // or backend returned bad data and we should show fallback UI.
  const hasData = dataForPeriod.length > 0;
  const [min, max] = useMemo(() => {
    return minMax<ChartDataPoint>(dataForPeriod, (d: ChartDataPoint) => d.value);
  }, [dataForPeriod]);

  const chartOpacityStyle = useMemo(() => {
    return { opacity: chartOpacity };
  }, [chartOpacity]);

  useEffect(() => {
    // If there is no data for selected period show fallback loader
    if (isObject(data) && !data[selectedPeriod]?.length && !isFallbackVisible) {
      showFallback();
    }
  }, [data, isFallbackVisible, selectedPeriod, showFallback]);

  const updatePeriod = useCallback(
    (period: Period) => {
      if (isObject(data) && period !== selectedPeriod) {
        // This can sometimes happen for newer assets which
        // will have their 'all' chart data be the same as
        // their 'year' chart data. In those cases we don't
        // want to animate out the min/max since we rely on
        // AnimatedChartPath to animate those components back in -
        // and AnimatedChartPath will not trigger an animation
        // if it's chartData is the same between re-renders
        if (!isEqual(data[period], data[selectedPeriod])) {
          minMaxOpacity.setValue(0);
        }
        setSelectedPeriod(period);
        onPeriodChanged?.(period);
      }
    },
    [data, selectedPeriod, onPeriodChanged, minMaxOpacity],
  );

  const { chartHorizontalGutter, chartDimensionStyles, chartWidth, chartHeight } =
    useSparklineInteractiveConstants({ compact });

  const { xFunction, path, area, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: chartHeight,
    yAxisScalingFactor,
  });

  const handleScrub = useCallback(
    (params: ChartScrubParams<Period>) => {
      chartHoverTextInputRef.current?.update(params);
      onScrub?.(params);
    },
    [onScrub],
  );

  const handleScrubStart = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(true);
    }

    onScrubStart?.();
  }, [hoverData, onScrubStart]);

  const handleScrubEnd = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(false);
    }

    onScrubEnd?.();
  }, [hoverData, onScrubEnd]);

  let header;
  if (headerNode) {
    header = (
      <Box paddingBottom={2} style={styles?.header} testID={headerTestID}>
        {headerNode}
      </Box>
    );
  }

  const rootStyles = useMemo(() => {
    return [
      !disableHorizontalPadding && {
        paddingHorizontal: chartHorizontalGutter,
      },
      style,
      styles?.root,
    ];
  }, [style, styles?.root, chartHorizontalGutter, disableHorizontalPadding]);

  return (
    <Animated.View style={rootStyles}>
      {header}
      <SparklineInteractivePanGestureHandler
        allowOverflowGestures={allowOverflowGestures}
        disabled={disableScrubbing}
        getMarker={getMarker}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        onScrubStart={handleScrubStart}
        selectedPeriod={selectedPeriod}
      >
        {!!formatHoverDate && (
          <SparklineInteractiveHoverDate
            ref={chartHoverTextInputRef}
            formatHoverDate={formatHoverDate}
            shouldTakeUpHeight={hideMinMaxLabel}
          />
        )}
        {!hideMinMaxLabel && (
          <SparklineInteractiveMinMax
            dataPoint={max}
            formatMinMaxLabel={formatMinMaxLabel}
            xFunction={xFunction}
          />
        )}
        <View style={chartDimensionStyles}>
          {isScreenReaderEnabled && (
            <SparklineAccessibleView data={data} selectedPeriod={selectedPeriod} />
          )}
          {!!isFallbackVisible && (
            <View style={StyleSheet.absoluteFill}>
              {fallback ?? <DefaultFallback fallbackType={fallbackType} />}
            </View>
          )}
          <Animated.View style={chartOpacityStyle}>
            {!!hasData && !!path && (
              <>
                <SparklineInteractiveLineVertical
                  color={lineVerticalColor}
                  showHoverDate={!!formatHoverDate}
                />
                <SparklineInteractivePaths
                  area={area}
                  compact={compact}
                  fill={fill}
                  hoverData={hoverData}
                  path={path}
                  selectedPeriod={selectedPeriod}
                  showHoverData={isScrubbing}
                  strokeColor={color}
                  yAxisScalingFactor={yAxisScalingFactor}
                />
              </>
            )}
          </Animated.View>
        </View>
        {!hideMinMaxLabel && (
          <SparklineInteractiveMinMax
            dataPoint={min}
            formatMinMaxLabel={formatMinMaxLabel}
            xFunction={xFunction}
          />
        )}
      </SparklineInteractivePanGestureHandler>
      {!hidePeriodSelector && (
        <BelowChart
          color={color}
          formatDate={formatDate}
          getMarker={getMarker}
          periods={periods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={updatePeriod}
          timePeriodGutter={timePeriodGutter}
        />
      )}
    </Animated.View>
  );
}

const SparklineInteractiveContent = memo(
  SparklineInteractiveContentWithGeneric,
) as typeof SparklineInteractiveContentWithGeneric;

export type SparklineInteractiveProps<Period extends string> =
  SparklineInteractiveBaseProps<Period> & {
    /**
     * Hides the min and max label
     *
     * @default false
     */
    hideMinMaxLabel?: boolean;

    /**
     * function used to format the amount of money used in the minMaxLabel
     */
    formatMinMaxLabel?: ChartFormatAmount;

    /**
     * The amount of padding to apply to the left and right of the chart. The chart width is calculated by (screen width - 2* gutter).
     *
     * @default 3
     */
    gutter?: ThemeVars.Space;

    /**
     * The chart applies horizontal padding by default which is specified by the gutter.
     * If the chart is placed in a container with padding then you can disable horizontal padding and set the gutter
     * to match the container padding.
     *
     */
    disableHorizontalPadding?: boolean;
    /**
     * Allows continuous gestures on the Sparkline chart to continue outside the bounds of the chart element.
     */
    allowOverflowGestures?: boolean;
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
  };

function SparklineInteractiveWithGeneric<Period extends string>({
  compact,
  gutter,
  ...props
}: SparklineInteractiveProps<Period>) {
  return (
    <SparklineInteractiveProvider compact={compact} gutter={gutter}>
      <SparklineInteractiveContent {...props} />
    </SparklineInteractiveProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractive = memo(
  SparklineInteractiveWithGeneric,
) as typeof SparklineInteractiveWithGeneric;
