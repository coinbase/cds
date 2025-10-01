import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ChartDataPoint, ChartScrubParams } from '@coinbase/cds-common';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

import {
  SparklineInteractiveHeader,
  type SparklineInteractiveHeaderRef,
  type SparklineInteractiveSubHead,
} from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineInteractive } from '../SparklineInteractive';

export default {
  component: SparklineInteractive,
  title: 'Components/SparklineInteractive',
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

const strokeColor = '#F7931A';
const rgbaStrokeColor = 'rgba(123, 1, 1, 5)';
const rgbStrokeColor = 'rgb(123, 1, 121)';
const autoStrokeColor = 'auto';

const SparklineInteractiveWrapper = (props: any) => {
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

  return (
    <SparklineInteractive
      defaultPeriod={props.defaultPeriod ?? DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={!props.hideHoverDate ? formatHoverDate : undefined}
      periods={periods}
      {...props}
    />
  );
};

export const Default = () => (
  <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>
);
Default.bind({});
Default.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Compact = () => (
  <SparklineInteractiveWrapper compact data={sparklineInteractiveData} strokeColor={strokeColor} />
);

Compact.bind({});
Compact.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Contained = () => (
  <React.StrictMode>
    <VStack borderColor="bgNegative" borderWidth={100}>
      <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
    </VStack>
  </React.StrictMode>
);

Contained.bind({});
Contained.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const DisableScrubbing = () => (
  <SparklineInteractiveWrapper
    disableScrubbing
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

DisableScrubbing.bind({});
DisableScrubbing.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HidePeriodSelector = () => (
  <SparklineInteractiveWrapper
    hidePeriodSelector
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

HidePeriodSelector.bind({});
HidePeriodSelector.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const yAxisScaling = () => (
  <SparklineInteractiveWrapper
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
    yAxisScalingFactor={0.1}
  />
);

yAxisScaling.bind({});
yAxisScaling.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const AutoStrokeColor = () => (
  <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={autoStrokeColor} />
  </React.StrictMode>
);

AutoStrokeColor.bind({});
AutoStrokeColor.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomRGBStrokeColor = () => (
  <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={rgbStrokeColor} />
  </React.StrictMode>
);

CustomRGBStrokeColor.bind({});
CustomRGBStrokeColor.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const CustomRGBAStrokeColor = () => (
  <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={rgbaStrokeColor} />
  </React.StrictMode>
);

CustomRGBAStrokeColor.bind({});
CustomRGBAStrokeColor.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FillDisabled = () => (
  <React.StrictMode>
    <SparklineInteractiveWrapper
      data={sparklineInteractiveData}
      fill={false}
      strokeColor={strokeColor}
    />
  </React.StrictMode>
);
FillDisabled.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackPositive = () => <SparklineInteractiveWrapper strokeColor={strokeColor} />;

FallbackPositive.bind({});
FallbackPositive.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackNegative = () => (
  <SparklineInteractiveWrapper fallbackType="negative" strokeColor={strokeColor} />
);

FallbackNegative.bind({});
FallbackNegative.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const FallbackCompact = () => (
  <SparklineInteractiveWrapper compact strokeColor={strokeColor} />
);

FallbackCompact.bind({});
FallbackCompact.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

const formatHoverPrice = (price: number) => {
  return `$${price.toLocaleString('en-US')}`;
};

export const HoverPrice = () => {
  return (
    <SparklineInteractiveWrapper
      fill
      data={sparklineInteractiveData}
      formatHoverPrice={formatHoverPrice}
      strokeColor={strokeColor}
    />
  );
};

HoverPrice.bind({});
HoverPrice.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const NoHoverDate = () => (
  <SparklineInteractiveWrapper
    fill
    hideHoverDate
    data={sparklineInteractiveData}
    strokeColor={strokeColor}
  />
);

NoHoverDate.bind({});
NoHoverDate.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithHeaderNode = () => {
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
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
      title: `$${point.value.toLocaleString('en-US')}`,
      subHead: generateSubHead(point, period, sparklineInteractiveData),
    });
  }, []);

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: `$${numToLocaleString(lastPoint.value)}`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
  }, [currentPeriod, lastPoint]);

  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);
    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];

    headerRef.current?.update({
      title: `$${numToLocaleString(newLastPoint.value)}`,
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
    });
  }, []);

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      defaultLabel="Bitcoin Price"
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
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

WithHeaderNode.bind({});
WithHeaderNode.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const TimePeriodGutter = () => {
  return (
    <SparklineInteractiveWrapper
      data={sparklineInteractiveData}
      strokeColor={strokeColor}
      timePeriodGutter={3}
    />
  );
};

TimePeriodGutter.bind({});
TimePeriodGutter.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HoverData = () => {
  return (
    <SparklineInteractiveWrapper
      data={sparklineInteractiveData}
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};

HoverData.bind({});
HoverData.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const HoverDataWithFill = () => {
  return (
    <SparklineInteractiveWrapper
      fill
      data={sparklineInteractiveData}
      hoverData={sparklineInteractiveHoverData}
      strokeColor={strokeColor}
    />
  );
};

HoverDataWithFill.bind({});
HoverDataWithFill.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const BottomPeriodSelector = () => {
  return (
    <SparklineInteractiveWrapper
      data={sparklineInteractiveData}
      periodSelectorPlacement="below"
      strokeColor={strokeColor}
    />
  );
};

BottomPeriodSelector.bind({});
BottomPeriodSelector.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const VStackedSparkline = () => {
  return (
    <VStack width="100%">
      <Box width="100%">
        <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
      </Box>
      <Box background="bgSecondary" height={20} paddingTop={8} width="100%">
        This is an element below the sparkline
      </Box>
    </VStack>
  );
};

VStackedSparkline.bind({});
VStackedSparkline.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const NoDataInSelectedPeriod = () => {
  return (
    <React.StrictMode>
      <SparklineInteractiveWrapper
        data={{ ...sparklineInteractiveData, hour: [] }}
        strokeColor={strokeColor}
      />
    </React.StrictMode>
  );
};
NoDataInSelectedPeriod.bind({});
NoDataInSelectedPeriod.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

const customPaddingCss = css`
  padding: var(--space-2);
`;

export const WithCustomStyles = () => {
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
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
      title: `$${point.value.toLocaleString('en-US')}`,
      subHead: generateSubHead(point, period, sparklineInteractiveData),
    });
  }, []);

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: `$${numToLocaleString(lastPoint.value)}`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
  }, [currentPeriod, lastPoint]);

  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);
    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];

    headerRef.current?.update({
      title: `$${numToLocaleString(newLastPoint.value)}`,
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
    });
  }, []);

  const header = (
    <SparklineInteractiveHeader
      ref={headerRef}
      defaultLabel="Bitcoin Price"
      defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
      defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
    />
  );

  return (
    <SparklineInteractive
      classNames={{
        root: customPaddingCss,
      }}
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
      styles={{
        header: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    />
  );
};

WithCustomStyles.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
