import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  sparklineInteractiveData,
  type SparklinePeriod,
} from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import type { ChartData, ChartDataPoint, ChartScrubParams } from '@coinbase/cds-common/types';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Icon } from '@coinbase/cds-mobile/icons';
import { Box, HStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';

import {
  SparklineInteractive,
  type SparklineInteractiveBaseProps,
} from '../../sparkline-interactive/SparklineInteractive';
import {
  SparklineInteractiveHeader,
  type SparklineInteractiveHeaderRef,
  type SparklineInteractiveSubHead,
} from '../SparklineInteractiveHeader';
import { useSparklineInteractiveHeaderStyles } from '../useSparklineInteractiveHeaderStyles';

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

const subsetOfPeriods = [
  { label: '1D', value: 'day' as const },
  { label: '1M', value: 'month' as const },
  { label: '1Y', value: 'year' as const },
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

type SparklineInteractivePriceProps = Omit<
  SparklineInteractiveBaseProps<SparklinePeriod>,
  'periods' | 'defaultPeriod' | 'formatMinMaxLabel' | 'formatDate'
> &
  Partial<Pick<SparklineInteractiveBaseProps<SparklinePeriod>, 'defaultPeriod'>> & {
    hideHoverDate?: boolean;
    hideMinMaxLabel?: boolean;
    trailing?: React.ReactNode;
    gutter?: ThemeVars.Space;
    disableHorizontalPadding?: boolean;
    timePeriodGutter?: ThemeVars.Space;
    labelNode?: React.ReactNode;
    allowOverflowGestures?: boolean;
  };

const SparklineInteractiveBuild = React.memo((props: SparklineInteractivePriceProps) => {
  const formatDateWithConfig = useCallback((value: Date, period: string) => {
    const config = getFormattingConfigForPeriod(period as SparklinePeriod);
    return value.toLocaleString('en-US', {
      ...config,
    });
  }, []);

  const formatHoverDate = useCallback((date: Date, period: string) => {
    return date.toLocaleString('en-US', {
      ...getDateHoverOptions(period as SparklinePeriod),
    });
  }, []);

  const formatMinMaxLabel = useCallback((amount: number | string) => {
    return `$${numToLocaleString(parseInt(amount as string, 10))}`;
  }, []);

  return (
    <SparklineInteractive
      disableScrubbing={!__DEV__}
      {...props}
      defaultPeriod={props.defaultPeriod || DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={!props.hideHoverDate ? formatHoverDate : undefined}
      formatMinMaxLabel={formatMinMaxLabel}
      periods={periods}
      strokeColor={props.strokeColor}
    />
  );
});

function handlePress() {
  // do nothing
}

const HeaderLabel = () => {
  return (
    <HStack alignItems="center" gap={1} paddingBottom={0}>
      <Icon active name="wallet" size="s" />
      <Text font="title3">CustomHeader</Text>
    </HStack>
  );
};

const SparklineInteractiveWithHeaderBuild = React.memo((props: SparklineInteractivePriceProps) => {
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
      trailing={trailing}
    />
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

const SparklineInteractiveWithAltHeader = React.memo((props: SparklineInteractivePriceProps) => {
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
      trailing={trailing}
    />
  );

  const formatDateWithConfig = useCallback((value: Date, period: string) => {
    const config = getFormattingConfigForPeriod(period as SparklinePeriod);
    return value.toLocaleString('en-US', {
      ...config,
    });
  }, []);

  const formatHoverDate = useCallback((date: Date, period: string) => {
    return date.toLocaleString('en-US', {
      ...getDateHoverOptions(period as SparklinePeriod),
    });
  }, []);

  const formatMinMaxLabel = useCallback((amount: number | string) => {
    return `$${numToLocaleString(parseInt(amount as string, 10))}`;
  }, []);

  return (
    <SparklineInteractive
      disableScrubbing={!__DEV__}
      {...props}
      defaultPeriod={props.defaultPeriod || DEFAULT_PERIOD}
      formatDate={formatDateWithConfig}
      formatHoverDate={!props.hideHoverDate ? formatHoverDate : undefined}
      formatMinMaxLabel={formatMinMaxLabel}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      periods={periodsAlt}
      strokeColor={props.strokeColor}
    />
  );
});

const SparklineInteractiveWithSmallerPeriodSet = React.memo(
  (props: SparklineInteractivePriceProps) => {
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
        trailing={trailing}
      />
    );

    const formatDateWithConfig = useCallback((value: Date, period: string) => {
      const config = getFormattingConfigForPeriod(period as SparklinePeriod);
      return value.toLocaleString('en-US', {
        ...config,
      });
    }, []);

    const formatHoverDate = useCallback((date: Date, period: string) => {
      return date.toLocaleString('en-US', {
        ...getDateHoverOptions(period as SparklinePeriod),
      });
    }, []);

    const formatMinMaxLabel = useCallback((amount: number | string) => {
      return `$${numToLocaleString(parseInt(amount as string, 10))}`;
    }, []);

    return (
      <SparklineInteractive
        disableScrubbing={!__DEV__}
        {...props}
        defaultPeriod={props.defaultPeriod || DEFAULT_PERIOD}
        formatDate={formatDateWithConfig}
        formatHoverDate={!props.hideHoverDate ? formatHoverDate : undefined}
        formatMinMaxLabel={formatMinMaxLabel}
        headerNode={header}
        onPeriodChanged={handleOnPeriodChanged}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        periods={subsetOfPeriods}
        strokeColor={props.strokeColor}
      />
    );
  },
);

export const SparklineInteractiveHeaderWithCustomTitle = () => {
  const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>('day');
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
  const titleRef = useRef<TextInput>(null);
  const styles = useSparklineInteractiveHeaderStyles();

  const handleScrub = useCallback(
    ({ point, period }: ChartScrubParams<SparklinePeriod>) => {
      const newTitle = `$${point.value.toLocaleString('en-US')}`;
      headerRef.current?.update({
        subHead: generateSubHead(point, period, sparklineInteractiveData),
      });
      titleRef.current?.setNativeProps({
        text: newTitle,
        style: [styles.title(newTitle), { color: 'green' }],
      });
    },
    [styles],
  );

  const handleScrubEnd = useCallback(() => {
    const newTitle = `$${numToLocaleString(lastPoint.value)}`;
    headerRef.current?.update({
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData),
    });
    titleRef.current?.setNativeProps({
      text: newTitle,
      style: [styles.title(newTitle), { color: 'green' }],
    });
  }, [currentPeriod, lastPoint, styles]);

  const handleOnPeriodChanged = useCallback(
    (period: SparklinePeriod) => {
      setCurrentPeriod(period);

      const newData = sparklineInteractiveData[period];
      const newLastPoint = newData[newData.length - 1];
      const newTitle = `$${numToLocaleString(newLastPoint.value)}`;

      headerRef.current?.update({
        subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData),
      });
      titleRef.current?.setNativeProps({
        text: newTitle,
        style: [styles.title(newTitle), { color: 'green' }],
      });
    },
    [styles],
  );

  const defaultTitleStyle = useMemo(
    () => [styles.title(`$${numToLocaleString(lastPoint.value)}`), { color: 'green' }],
    [lastPoint.value, styles],
  );

  const RenderedDefaultTitle = (
    <TextInput
      ref={titleRef}
      defaultValue={`$${numToLocaleString(lastPoint.value)}`}
      editable={false}
      pointerEvents="none"
      style={defaultTitleStyle}
      testID="SparklineInteractiveHeaderTitle"
    />
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
    <SparklineInteractiveBuild
      data={sparklineInteractiveData}
      headerNode={header}
      onPeriodChanged={handleOnPeriodChanged}
      onScrub={handleScrub}
      onScrubEnd={handleScrubEnd}
      strokeColor="#F7931A"
    />
  );
};

const SparklineInteractiveHeaderScreen = () => {
  const trailing = useMemo(() => {
    return (
      <HStack gap={1}>
        <IconButton active feedback="heavy" name="star" onPress={handlePress} variant="secondary" />
        <IconButton feedback="heavy" name="share" onPress={handlePress} variant="secondary" />
      </HStack>
    );
  }, []);

  return (
    <ExampleScreen>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Example
          </Text>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Trailing
          </Text>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
            trailing={trailing}
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Custom Label
          </Text>
          <SparklineInteractiveWithHeaderBuild
            data={sparklineInteractiveData}
            labelNode={<HeaderLabel />}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Example with AltHeader
          </Text>
          <SparklineInteractiveWithAltHeader
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Example with Smaller Period Set
          </Text>
          <SparklineInteractiveWithSmallerPeriodSet
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Example with No Period Set
          </Text>
          <SparklineInteractiveWithHeaderBuild
            hidePeriodSelector
            data={sparklineInteractiveData}
            strokeColor="#F7931A"
          />
        </Box>
      </Example>
      <Example padding={0}>
        <Box>
          <Text font="title3" paddingX={3} paddingY={3}>
            SparklineInteractive Header Custom Title
          </Text>
          <SparklineInteractiveHeaderWithCustomTitle />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default SparklineInteractiveHeaderScreen;
