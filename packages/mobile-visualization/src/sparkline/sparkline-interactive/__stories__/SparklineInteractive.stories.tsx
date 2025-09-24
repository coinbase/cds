import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  sparklineInteractiveData,
  type SparklinePeriod,
  strokeColor,
} from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import type { ChartData, ChartDataPoint, ChartScrubParams } from '@coinbase/cds-common/types';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box } from '@coinbase/cds-mobile/layout';
import { TextTitle3 } from '@coinbase/cds-mobile/typography/TextTitle3';

import {
  SparklineInteractiveHeader,
  type SparklineInteractiveHeaderRef,
  type SparklineInteractiveSubHead,
} from '../../sparkline-interactive-header/SparklineInteractiveHeader';
import {
  SparklineInteractive,
  type SparklineInteractiveBaseProps,
  type SparklineInteractiveProps,
} from '../SparklineInteractive';

const DEFAULT_PERIOD = 'day';

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

type SparklineInteractivePriceProps = Omit<
  SparklineInteractiveProps<SparklinePeriod>,
  'periods' | 'defaultPeriod' | 'formatMinMaxLabel' | 'formatDate'
> &
  Partial<Pick<SparklineInteractiveProps<SparklinePeriod>, 'defaultPeriod'>> & {
    hideHoverDate?: boolean;
    hideMinMaxLabel?: boolean;
    trailing?: React.ReactNode;
    gutter?: ThemeVars.Space;
    disableHorizontalPadding?: boolean;
    timePeriodGutter?: ThemeVars.Space;
    labelNode?: React.ReactNode;
    allowOverflowGestures?: boolean;
  };

const SparklineInteractiveBuild = memo((props: SparklineInteractivePriceProps) => {
  const formatDateWithConfig = useCallback((value: Date, period: SparklinePeriod) => {
    const config = getFormattingConfigForPeriod(period);

    return value.toLocaleString('en-US', {
      ...config,
    });
  }, []);

  const formatHoverDate = useCallback((date: Date, period: SparklinePeriod) => {
    return date.toLocaleString('en-US', {
      ...getDateHoverOptions(period),
    });
  }, []);

  const formatMinMaxLabel = useCallback((amount: number | string) => {
    return `$${numToLocaleString(parseInt(amount as string, 10))}`;
  }, []);

  return (
    <SparklineInteractive
      disableScrubbing={!__DEV__}
      {...props}
      defaultPeriod={props.defaultPeriod ?? DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={!props.hideHoverDate ? formatHoverDate : undefined}
      formatMinMaxLabel={formatMinMaxLabel}
      periods={periods}
    />
  );
});

const generateSubHead = (
  point: ChartDataPoint,
  period: SparklinePeriod,
  sparklineInteractiveData: Record<SparklinePeriod, ChartData>,
): SparklineInteractiveSubHead => {
  const data = sparklineInteractiveData[period];
  const firstPoint = data[0];

  const increase = point.value > firstPoint.value;
  return {
    percent: `${numToLocaleString(
      Math.abs((point.value - firstPoint.value) / firstPoint.value) * 100,
    )}%`,
    sign: increase ? 'upwardTrend' : 'downwardTrend',
    variant: increase ? 'positive' : 'negative',
    accessibilityLabel: `${increase ? 'up' : 'down'}`,
    priceChange: `$${numToLocaleString(Math.abs(point.value - firstPoint.value))}`,
  };
};

const SparklineInteractiveWithHeaderBuild = memo((props: SparklineInteractivePriceProps) => {
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
    [sparklineInteractiveData, headerRef],
  );

  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: `$${numToLocaleString(lastPoint.value)}`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
  }, [currentPeriod, sparklineInteractiveData, lastPoint, headerRef]);

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
    [sparklineInteractiveData, headerRef],
  );

  const header = useMemo(
    () => (
      <SparklineInteractiveHeader
        ref={headerRef}
        compact={compact}
        defaultLabel={labelNode ? 'CustomHeader' : 'Bitcoin Price'}
        defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)}
        defaultTitle={`$${numToLocaleString(lastPoint.value)}`}
        labelNode={labelNode}
        trailing={trailing}
      />
    ),
    [compact, labelNode, lastPoint, currentPeriod, sparklineInteractiveData, trailing],
  );

  return (
    <SparklineInteractiveBuild
      {...props}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
    />
  );
});

const rgbaStrokeColor = 'rgba(123, 1, 1, 5)';
const rgbStrokeColor = 'rgb(123, 1, 121)';
const autoStrokeColor = 'auto';

const SparklineInteractiveScreen = () => {
  return (
    <ExampleScreen>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Default
          </TextTitle3>
          <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Compact
          </TextTitle3>
          <SparklineInteractiveBuild
            compact
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Disable Scrubbing
          </TextTitle3>
          <SparklineInteractiveBuild
            disableScrubbing
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Hide period selector
          </TextTitle3>
          <SparklineInteractiveBuild
            hidePeriodSelector
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Hide min/max label
          </TextTitle3>
          <SparklineInteractiveBuild
            hideMinMaxLabel
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Default period All
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            defaultPeriod="all"
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Fill Disabled
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            fill={false}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Y axis scaling
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
            yAxisScalingFactor={0.1}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Fallback
          </TextTitle3>
          <SparklineInteractiveBuild strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Fallback Negative
          </TextTitle3>
          <SparklineInteractiveBuild fallbackType="negative" strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Fallback Compact
          </TextTitle3>
          <SparklineInteractiveBuild compact strokeColor={strokeColor} />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            No Hover Date
          </TextTitle3>
          <SparklineInteractiveBuild
            hideHoverDate
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            With Header Node
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            No padding
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            gutter={0}
            strokeColor="#F7931A"
            timePeriodGutter={3}
          />
        </Box>
      </Example>
      <Example padding={4}>
        <Box>
          <TextTitle3 paddingY={3}>In Container With 4 padding</TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            disableHorizontalPadding
            data={sparklineInteractiveData}
            gutter={4}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Custom screen padding 6
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            gutter={6}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Auto Stoke Color
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={autoStrokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Custom RGB Stoke Color
          </TextTitle3>
          <SparklineInteractiveBuild data={sparklineInteractiveData} strokeColor={rgbStrokeColor} />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Custom RGBA Stoke Color
          </TextTitle3>
          <SparklineInteractiveBuild
            data={sparklineInteractiveData}
            strokeColor={rgbaStrokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            No Data In SelectedPeriod
          </TextTitle3>
          <SparklineInteractiveBuild
            data={{ ...sparklineInteractiveData, hour: [] }}
            strokeColor={rgbaStrokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Enable Interaction When Outside
          </TextTitle3>
          <SparklineInteractiveBuild
            allowOverflowGestures
            data={sparklineInteractiveData}
            strokeColor={strokeColor}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <TextTitle3 paddingX={3} paddingY={3}>
            Custom Node Header Styles
          </TextTitle3>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            styles={{
              header: {
                paddingBottom: 0,
              },
            }}
          />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveScreen;
