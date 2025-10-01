import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { chartCompactHeight, chartHeight } from '@coinbase/cds-common/tokens/sparkline';
import type {
  ChartData,
  ChartFormatDate,
  ChartScrubParams,
  ChartTimeseries,
  Placement,
} from '@coinbase/cds-common/types';
import { debounce } from '@coinbase/cds-common/utils/debounce';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { useSparklineCoordinates } from '@coinbase/cds-common/visualizations/useSparklineCoordinates';
import { chartFallbackNegative, chartFallbackPositive } from '@coinbase/cds-lottie-files';
import { emptyArray, isStorybook, noop } from '@coinbase/cds-utils';
import { cx, useTheme } from '@coinbase/cds-web';
import { Lottie } from '@coinbase/cds-web/animation';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Box } from '@coinbase/cds-web/layout/Box';
import { getBrowserGlobals } from '@coinbase/cds-web/utils/browser';
import {
  VisualizationContainer,
  type VisualizationContainerDimension,
} from '@coinbase/cds-web/visualizations/VisualizationContainer';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

import { InnerSparklineInteractiveProvider } from './InnerSparklineInteractiveProvider';
import { SparklineInteractiveHoverDate } from './SparklineInteractiveHoverDate';
import { SparklineInteractiveHoverPrice } from './SparklineInteractiveHoverPrice';
import { SparklineInteractiveLineVertical } from './SparklineInteractiveLineVertical';
import { SparklineInteractiveMarkerDates } from './SparklineInteractiveMarkerDates';
import { SparklineInteractivePaths } from './SparklineInteractivePaths';
import { SparklineInteractivePeriodSelector } from './SparklineInteractivePeriodSelector';
import {
  SparklineInteractiveProvider,
  useSparklineInteractiveContext,
} from './SparklineInteractiveProvider';
import { SparklineInteractiveScrubHandler } from './SparklineInteractiveScrubHandler';
import { SparklineInteractiveScrubProvider } from './SparklineInteractiveScrubProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export * from '@coinbase/cds-common/types/Chart';

export type SparklineInteractiveDefaultFallback = Pick<
  SparklineInteractiveBaseProps<string>,
  'fallbackType' | 'compact'
>;

const DefaultFallback = memo(({ fallbackType }: SparklineInteractiveDefaultFallback) => {
  // don't show lottie animation in story book
  const skipLottie = isStorybook();

  const source = fallbackType === 'negative' ? chartFallbackNegative : chartFallbackPositive;
  return !skipLottie && <Lottie autoplay loop height="100%" source={source} width="100%" />;
});

const mobileLayoutBreakpoint = 650;

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

export type SparklineInteractiveProps<Period extends string> =
  SparklineInteractiveBaseProps<Period> & {
    /**
     * Custom class name for the root element.
     */
    className?: string;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the header node.
       */
      header?: string;
      /**
       * Custom class name for the root element.
       */
      root?: string;
    };
    /**
     * Custom styles for the root element.
     */
    style?: React.CSSProperties;
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom style for the header node.
       */
      header?: React.CSSProperties;
      /**
       * Custom style for the root element.
       */
      root?: React.CSSProperties;
    };
    /** Test ID for the header */
    headerTestID?: string;
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
  formatDate,
  fallback = null,
  hidePeriodSelector = false,
  disableScrubbing = false,
  fill = true,
  yAxisScalingFactor = 1.0,
  compact,
  formatHoverDate,
  formatHoverPrice,
  headerNode,
  fallbackType = 'positive',
  timePeriodGutter,
  hoverData,
  periodSelectorPlacement = 'above',
  className,
  classNames,
  style,
  styles,
  headerTestID,
}: SparklineInteractiveProps<Period>) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isMarkerDateVisible, setIsMarkerDateVisible] = useState(false);
  const innerSparklineInteractiveHeight = compact ? chartCompactHeight : chartHeight;
  const { isFallbackVisible, showFallback } = useSparklineInteractiveContext();
  const { observe: containerRef, width: containerWidth } = useDimensions();

  const isMobileLayout = containerWidth > 0 && containerWidth < mobileLayoutBreakpoint;
  const showHeaderPeriodSelector = periodSelectorPlacement === 'above' && !hidePeriodSelector;
  const showBottomMarkerDates = useMemo(
    () =>
      periodSelectorPlacement === 'above' ||
      (periodSelectorPlacement === 'below' && hidePeriodSelector) ||
      isMarkerDateVisible,
    [isMarkerDateVisible, periodSelectorPlacement, hidePeriodSelector],
  );

  const color = strokeColor;
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const theme = useTheme();
  const lineVerticalColor = useMemo(() => {
    const lineColor =
      color !== 'auto'
        ? color
        : getAccessibleColor({
            background: theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });
    return hoverData ? 'var(--color-bgLineHeavy)' : lineColor;
  }, [hoverData, color, theme.color.bg]);

  const dataForPeriod = useMemo(() => {
    if (!data) {
      return emptyArray;
    }
    return data[selectedPeriod] ?? emptyArray;
  }, [data, selectedPeriod]);

  const handleScrubStart = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(true);
    }

    setIsMarkerDateVisible(true);
    onScrubStart?.();
  }, [hoverData, onScrubStart]);

  const handleScrubEnd = useCallback(() => {
    if (hoverData) {
      setIsScrubbing(false);
    }

    setIsMarkerDateVisible(false);
    onScrubEnd?.();
  }, [hoverData, onScrubEnd]);

  // If dataForPeriod is empty we know that we are either loading
  // or backend returned bad data and we should show fallback UI.
  const hasData = dataForPeriod.length > 0;
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
        // AnimatedSparklineInteractivePath to animate those components back in -
        // and AnimatedSparklineInteractivePath will not trigger an animation
        // if it's chartData is the same between re-renders
        if (!isEqual(data[period], data[selectedPeriod])) {
          // minMaxOpacity.setValue(0);
        }
        setSelectedPeriod(period);
        onPeriodChanged?.(period);
      }
    },
    [data, selectedPeriod, onPeriodChanged /* , minMaxOpacity */],
  );

  const { chartWidth } = useSparklineInteractiveConstants();

  const { path, area, getMarker } = useSparklineCoordinates({
    data: dataForPeriod,
    width: chartWidth,
    height: innerSparklineInteractiveHeight,
    yAxisScalingFactor,
  });

  let header;
  if (headerNode) {
    header = (
      <Box
        className={classNames?.header}
        flexGrow={1}
        paddingX={!isMobileLayout ? gutter : 0}
        style={styles?.header}
        testID={headerTestID}
      >
        {headerNode}
      </Box>
    );
  }

  const periodSelector = (
    <SparklineInteractivePeriodSelector
      color={color}
      periods={periods}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={updatePeriod}
    />
  );

  const rootStyles = useMemo(
    () => ({
      width: '100%',
      ...style,
      ...styles?.root,
    }),
    [style, styles?.root],
  );

  return (
    <div ref={containerRef} className={cx(className, classNames?.root)} style={rootStyles}>
      {isMobileLayout && showHeaderPeriodSelector && (
        <Box paddingBottom={2} width="100%">
          {periodSelector}
        </Box>
      )}
      {(!!headerNode || (!isMobileLayout && showHeaderPeriodSelector)) && (
        <Box alignItems="center" justifyContent="space-between" paddingBottom={2}>
          {header ?? <div />}
          {!isMobileLayout && showHeaderPeriodSelector && <Box flexGrow={0}>{periodSelector}</Box>}
        </Box>
      )}
      <SparklineInteractiveScrubProvider>
        <VStack paddingBottom={(formatHoverDate || formatHoverPrice) && 1}>
          {!!formatHoverDate && <SparklineInteractiveHoverDate />}
          {!!formatHoverPrice && <SparklineInteractiveHoverPrice />}
        </VStack>
        <VisualizationContainer height={innerSparklineInteractiveHeight} width="100%">
          {({ width, height }: VisualizationContainerDimension) => (
            <InnerSparklineInteractiveProvider height={height} width={width}>
              <SparklineInteractiveScrubHandler
                disabled={disableScrubbing}
                formatHoverDate={formatHoverDate}
                formatHoverPrice={formatHoverPrice}
                getMarker={getMarker}
                onScrub={onScrub}
                onScrubEnd={handleScrubEnd}
                onScrubStart={handleScrubStart}
                selectedPeriod={selectedPeriod}
              >
                <Box height={height} position="relative" width={width}>
                  {!!isFallbackVisible && (
                    <Box height="100%" justifyContent="center" position="absolute" width="100%">
                      {fallback ?? <DefaultFallback fallbackType={fallbackType} />}
                    </Box>
                  )}
                  <Box height="100%" width="100%">
                    {!!hasData && !!path && (
                      <>
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
                        <SparklineInteractiveLineVertical color={lineVerticalColor} />
                      </>
                    )}
                  </Box>
                </Box>
              </SparklineInteractiveScrubHandler>
            </InnerSparklineInteractiveProvider>
          )}
        </VisualizationContainer>
      </SparklineInteractiveScrubProvider>
      <HStack alignItems="flex-end" minHeight={50} width="100%">
        {showBottomMarkerDates && (
          <SparklineInteractiveMarkerDates
            formatDate={formatDate}
            getMarker={getMarker}
            selectedPeriod={selectedPeriod}
            timePeriodGutter={timePeriodGutter}
          />
        )}
        {periodSelectorPlacement === 'below' &&
          !isMarkerDateVisible &&
          !hidePeriodSelector &&
          periodSelector}
      </HStack>
    </div>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractiveContent = memo(
  SparklineInteractiveContentWithGeneric,
) as typeof SparklineInteractiveContentWithGeneric;

function SparklineInteractiveWithGeneric<Period extends string>({
  compact,
  ...props
}: SparklineInteractiveProps<Period>) {
  const [resizeKey, setResizeKey] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeHandler = useCallback(
    debounce(() => {
      // no resizing on percy
      if (!isStorybook()) {
        setResizeKey((prev) => prev + 1);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    getBrowserGlobals()?.window?.addEventListener('resize', resizeHandler);
    return () => {
      getBrowserGlobals()?.window?.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <SparklineInteractiveProvider key={resizeKey} compact={compact}>
      <SparklineInteractiveContent compact={compact} {...props} />
    </SparklineInteractiveProvider>
  );
}

// typescript doesn't understand the memo with the generic so it gets casted to a base react component
export const SparklineInteractive = memo(
  SparklineInteractiveWithGeneric,
) as typeof SparklineInteractiveWithGeneric;
