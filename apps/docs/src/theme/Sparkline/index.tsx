import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { SparklinePeriod } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import type { ChartData, ChartDataPoint, ChartScrubParams } from '@cbhq/cds-common/types';
import {
  SparklineInteractive,
  type SparklineInteractiveBaseProps,
} from '@cbhq/cds-web-visualization/sparkline/sparkline-interactive/SparklineInteractive';
import {
  SparklineInteractiveHeader,
  type SparklineInteractiveHeaderRef,
  type SparklineInteractiveSubHead,
} from '@cbhq/cds-web-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader';

type SparklineInteractivePriceProps = Omit<
  SparklineInteractiveBaseProps<SparklinePeriod>,
  'periods' | 'defaultPeriod' | 'formatMinMaxLabel' | 'formatDate'
> &
  Partial<Pick<SparklineInteractiveBaseProps<SparklinePeriod>, 'defaultPeriod'>> & {
    hideHoverDate?: boolean;
    trailing?: React.ReactNode;
    gutter?: ThemeVars.Space;
    disableHorizontalPadding?: boolean;
    timePeriodGutter?: ThemeVars.Space;
    labelNode?: React.ReactNode;
    allowOverflowGestures?: boolean;
  };

const DEFAULT_PERIOD = 'day';
const DATE_TIME_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
} as const;

const periods = [
  {
    label: '1H',
    value: 'hour' as const,
  },
  {
    label: '1D',
    value: 'day' as const,
  },
  {
    label: '1W',
    value: 'week' as const,
  },
  {
    label: '1M',
    value: 'month' as const,
  },
  {
    label: '1Y',
    value: 'year' as const,
  },
  {
    label: 'All',
    value: 'all' as const,
  },
];

function numToLocaleString(num: number) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
}

const getFormattingConfigForPeriod = (period: SparklinePeriod) => {
  switch (period) {
    case 'hour':
    case 'day':
      return {
        hour: 'numeric',
        minute: 'numeric',
      } as const;

    case 'week':
    case 'month':
      return {
        month: 'numeric',
        day: 'numeric',
      } as const;

    case 'year':
    case 'all':
      return {
        month: 'numeric',
        year: 'numeric',
      } as const;
  }
};

const getDateHoverOptions = (period: SparklinePeriod) => {
  switch (period) {
    case 'hour':
    case 'day':
    case 'week':
    case 'month':
      return {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      } as const;
    default:
      return {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      } as const;
  }
};

export function generateSubHead(
  point: ChartDataPoint,
  period: SparklinePeriod,
  sparklineInteractiveData: Record<SparklinePeriod, ChartData>,
): SparklineInteractiveSubHead {
  const data = sparklineInteractiveData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  const subHead: SparklineInteractiveSubHead = {
    percent: `${numToLocaleString(
      Math.abs((point.value - firstPoint.value) / firstPoint.value) * 100,
    )}%`,
    sign: increase ? 'upwardTrend' : 'downwardTrend',
    variant: increase ? 'positive' : 'negative',
    accessibilityLabel: `on ${new Intl.DateTimeFormat('en-US', DATE_TIME_OPTIONS).format(
      point?.date,
    )}, ${increase ? 'up' : 'down'}`,
    priceChange: `$${numToLocaleString(Math.abs(point.value - firstPoint.value))}`,
  };

  return subHead;
}

export const SparklineInteractivePrice = memo(
  ({ defaultPeriod, hideHoverDate, ...props }: SparklineInteractivePriceProps) => {
    const timezoneObj = useMemo(() => {
      return { timeZone: 'America/New_York' };
    }, []);

    const formatDateWithConfig = useCallback(
      (value: Date, period: string) => {
        const config = getFormattingConfigForPeriod(period as SparklinePeriod);

        return value.toLocaleString('en-US', {
          ...timezoneObj,
          ...config,
        });
      },
      [timezoneObj],
    );

    const formatHoverDate = useCallback(
      (date: Date, period: string) => {
        return date.toLocaleString('en-US', {
          ...timezoneObj,
          ...getDateHoverOptions(period as SparklinePeriod),
        });
      },
      [timezoneObj],
    );

    return (
      <SparklineInteractive
        {...props}
        defaultPeriod={defaultPeriod ?? DEFAULT_PERIOD}
        formatDate={formatDateWithConfig}
        formatHoverDate={!hideHoverDate ? formatHoverDate : undefined}
        periods={periods}
      />
    );
  },
);

export const SparklineInteractivePriceWithHeader = memo((props: SparklineInteractivePriceProps) => {
  const { data: sparklineData, trailing, labelNode, compact } = props;
  const sparklineInteractiveData = sparklineData as Record<SparklinePeriod, ChartData>;
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(
    props.defaultPeriod ?? DEFAULT_PERIOD,
  );
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];

  const handleScrub = useCallback(
    ({ point, period }: ChartScrubParams<SparklinePeriod>) => {
      headerRef.current?.update({
        title: `$${point.value.toLocaleString('en-US')}`,
        subHead: generateSubHead(point, period, sparklineInteractiveData),
      });
    },
    [sparklineInteractiveData],
  );

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: `$${numToLocaleString(lastPoint.value)}`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
  }, [currentPeriod, sparklineInteractiveData, lastPoint]);

  const handleOnPeriodChanged = useCallback(
    (period: SparklinePeriod) => {
      setCurrentPeriod(period);

      const newData = sparklineInteractiveData[period];
      const newLastPoint = newData[newData.length - 1];

      headerRef.current?.update({
        title: `$${numToLocaleString(newLastPoint.value)}`,
        subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
      });
    },
    [sparklineInteractiveData],
  );

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      compact={compact}
      defaultLabel={labelNode ? 'CustomHeader' : 'Bitcoin Price'}
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
      labelNode={labelNode}
    />
  );

  return (
    <SparklineInteractivePrice
      {...props}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      trailing={trailing}
    />
  );
});
