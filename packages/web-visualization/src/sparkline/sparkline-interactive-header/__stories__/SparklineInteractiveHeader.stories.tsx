import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ChartDataPoint, ChartScrubParams } from '@coinbase/cds-common';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { Icon } from '@coinbase/cds-web/icons';
import { HStack } from '@coinbase/cds-web/layout';
import { TextTitle3 } from '@coinbase/cds-web/typography';

import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import {
  SparklineInteractiveHeader,
  type SparklineInteractiveHeaderRef,
  type SparklineInteractiveSubHead,
} from '../SparklineInteractiveHeader';

export default {
  component: SparklineInteractiveHeader,
  title: 'Components/SparklineInteractiveHeader',
};

type SparklinePeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
const DEFAULT_PERIOD = 'day';

const periods = [
  { label: '1H', value: 'hour' as const },
  { label: '1D', value: 'day' as const },
  { label: '1W', value: 'week' as const },
  { label: '1M', value: 'month' as const },
  { label: '1Y', value: 'year' as const },
  { label: 'All', value: 'all' as const },
];

const periodsAlt = [
  { label: '1 Std.', value: 'hour' as const },
  { label: '1 Tag', value: 'day' as const },
  { label: '1 Wo.', value: 'week' as const },
  { label: '1 Mon.', value: 'month' as const },
  { label: '1 Jahr', value: 'year' as const },
  { label: 'All', value: 'all' as const },
];

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
    default:
      return {
        month: 'numeric',
        day: 'numeric',
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

function numToLocaleString(num: number) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
}

function generateSubHead(
  point: ChartDataPoint,
  period: SparklinePeriod,
  sparklineInteractiveData: Record<SparklinePeriod, ChartDataPoint[]>,
): SparklineInteractiveSubHead {
  const data = sparklineInteractiveData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  return {
    percent: `${numToLocaleString(
      Math.abs((point.value - firstPoint.value) / firstPoint.value) * 100,
    )}%`,
    sign: increase ? 'upwardTrend' : 'downwardTrend',
    variant: increase ? 'positive' : 'negative',
    accessibilityLabel: `on ${new Intl.DateTimeFormat('en-US').format(point?.date)}, ${
      increase ? 'up' : 'down'
    }`,
    priceChange: `$${numToLocaleString(Math.abs(point.value - firstPoint.value))}`,
  };
}

const HeaderLabel = () => {
  return (
    <HStack alignItems="center" gap={1} paddingBottom={0}>
      <Icon active name="wallet" size="s" />
      <TextTitle3 as="span">CustomHeader</TextTitle3>
    </HStack>
  );
};

type SparklineInteractiveWithHeaderProps = {
  data: Record<SparklinePeriod, ChartDataPoint[]>;
  labelNode?: React.ReactNode;
  compact?: boolean;
  periodSelectorPlacement?: 'above' | 'below';
  alternatePeriods?: boolean;
  strokeColor?: string;
};

const SparklineInteractiveWithHeader = ({
  data,
  labelNode,
  compact,
  periodSelectorPlacement,
  alternatePeriods,
  strokeColor = '#F7931A',
}: SparklineInteractiveWithHeaderProps) => {
  const timezoneObj = useMemo(() => ({ timeZone: 'America/New_York' }), []);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const sparklineData = data;
  const periodValues = alternatePeriods ? periodsAlt : periods;
  const chartData = sparklineData[currentPeriod];
  const lastPoint = chartData[chartData.length - 1];

  const formatDateWithConfig = useCallback(
    (value: Date, period: SparklinePeriod) => {
      const config = getFormattingConfigForPeriod(period);
      return value.toLocaleString('en-US', {
        ...timezoneObj,
        ...config,
      });
    },
    [timezoneObj],
  );

  const formatHoverDate = useCallback(
    (date: Date, period: SparklinePeriod) => {
      return date.toLocaleString('en-US', {
        ...timezoneObj,
        ...getDateHoverOptions(period),
      });
    },
    [timezoneObj],
  );

  const handleScrub = useCallback(
    ({ point, period }: ChartScrubParams<SparklinePeriod>) => {
      headerRef.current?.update({
        title: `$${point.value.toLocaleString('en-US')}`,
        subHead: generateSubHead(point, period, sparklineData),
      });
    },
    [sparklineData],
  );

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: `$${numToLocaleString(lastPoint.value)}`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineData),
    });
  }, [currentPeriod, lastPoint, sparklineData]);

  const handleOnPeriodChanged = useCallback(
    (period: SparklinePeriod) => {
      setCurrentPeriod(period);
      const newData = sparklineData[period];
      const newLastPoint = newData[newData.length - 1];

      headerRef.current?.update({
        title: `$${numToLocaleString(newLastPoint.value)}`,
        subHead: generateSubHead(newLastPoint, period, sparklineData),
      });
    },
    [sparklineData],
  );

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      compact={compact}
      defaultLabel={labelNode ? 'CustomHeader' : 'Bitcoin Price'}
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineData)}
      defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
      labelNode={labelNode}
    />
  );

  return (
    <SparklineInteractive
      compact={compact}
      data={data}
      defaultPeriod={DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={formatHoverDate}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      periodSelectorPlacement={periodSelectorPlacement}
      periods={periodValues}
      strokeColor={strokeColor}
    />
  );
};

export const Default = () => {
  return <SparklineInteractiveWithHeader data={sparklineInteractiveData} />;
};

Default.bind({});
Default.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomLabel = () => {
  return (
    <SparklineInteractiveWithHeader data={sparklineInteractiveData} labelNode={<HeaderLabel />} />
  );
};

CustomLabel.bind({});
CustomLabel.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Compact = () => {
  return <SparklineInteractiveWithHeader compact data={sparklineInteractiveData} />;
};

Compact.bind({});
Compact.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveWithHeader
      compact
      data={sparklineInteractiveData}
      periodSelectorPlacement="below"
    />
  );
};

BottomPeriodSelector.parameters = { percy: { enableJavaScript: true } };

export const AlternatePeriods = () => {
  return <SparklineInteractiveWithHeader alternatePeriods data={sparklineInteractiveData} />;
};

AlternatePeriods.bind({});
AlternatePeriods.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomTitle = () => {
  const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>('day');
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
  const titleRef = useRef<HTMLSpanElement>(null);
  const timezoneObj = useMemo(() => ({ timeZone: 'America/New_York' }), []);

  const formatDateWithConfig = useCallback(
    (value: Date, period: SparklinePeriod) => {
      const config = getFormattingConfigForPeriod(period);
      return value.toLocaleString('en-US', {
        ...timezoneObj,
        ...config,
      });
    },
    [timezoneObj],
  );

  const formatHoverDate = useCallback(
    (date: Date, period: SparklinePeriod) => {
      return date.toLocaleString('en-US', {
        ...timezoneObj,
        ...getDateHoverOptions(period),
      });
    },
    [timezoneObj],
  );

  const handleScrub = useCallback(({ point, period }: ChartScrubParams<SparklinePeriod>) => {
    headerRef.current?.update({
      subHead: generateSubHead(point, period, sparklineInteractiveData),
    });
    if (titleRef.current) {
      titleRef.current.innerText = `$${point.value.toLocaleString('en-US')}`;
    }
  }, []);

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
    if (titleRef.current) {
      titleRef.current.innerText = `$${numToLocaleString(lastPoint.value)}`;
    }
  }, [currentPeriod, lastPoint]);

  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);

    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];

    headerRef.current?.update({
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
    });

    if (titleRef.current) {
      titleRef.current.innerText = `$${numToLocaleString(newLastPoint.value)}`;
    }
  }, []);

  const RenderedDefaultTitle = (
    <TextTitle3 as="div" color="fgPrimary">
      <span ref={titleRef}>${numToLocaleString(lastPoint.value)}</span>
    </TextTitle3>
  );

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      defaultLabel="Bitcoin Price"
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      defaultTitle={RenderedDefaultTitle}
    />
  );

  return (
    <SparklineInteractive
      data={sparklineInteractiveData}
      defaultPeriod={DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={formatHoverDate}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      periods={periods}
      strokeColor="#F7931A"
    />
  );
};
