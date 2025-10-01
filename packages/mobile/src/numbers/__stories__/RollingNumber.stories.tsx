import React, { useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons/Icon';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations/ProgressBar';
import { RollingNumber } from '../RollingNumber';
import { DefaultRollingNumberAffixSection } from '../RollingNumber/DefaultRollingNumberAffixSection';

const fonts = [
  'display1',
  'display2',
  'display3',
  'title1',
  'title2',
  'title3',
  'title4',
  'headline',
  'body',
  'label1',
  'label2',
  'caption',
  'legal',
] as const;

const useTestValues = () => {
  const values = [98345.67, 91345.67, 123450.123, 1234512.88];
  const prefixes = ['+', '-', ''];
  const suffixes = [' BTC', ' ETH', ''];
  const iconPrefixes = [
    <Icon key="arrowUp" name="arrowUp" size="l" />,
    <Icon key="arrowDown" name="arrowDown" size="l" />,
    <Icon key="arrowDown" name="arrowDown" size="l" />,
  ];
  const iconSuffixes = [
    <Icon key="arrowDown" name="arrowDown" size="l" />,
    <Icon key="arrowUp" name="arrowUp" size="l" />,
    null,
  ];
  const [valIdx, setValIdx] = useState(0);
  const onNext = () => {
    setValIdx((valIdx + 1) % values.length);
  };
  return {
    value: values[valIdx],
    prefix: prefixes[valIdx],
    suffix: suffixes[valIdx],
    iconPrefix: iconPrefixes[valIdx],
    iconSuffix: iconSuffixes[valIdx],
    onNext,
  };
};

export const Examples = () => {
  // Deterministic sequence of values and their corresponding differences
  const values = [12345.67, 12425.32, 12391.02, 12550.87, 12345.67];
  const differences = [0, 79.65, -34.3, 159.85, -205.2];
  const [idx, setIdx] = useState(0);
  const price = values[idx];
  const difference = differences[idx];
  const onNext = () => setIdx((i) => (i + 1) % values.length);

  const trendColor = difference >= 0 ? 'fgPositive' : 'fgNegative';
  const theme = useTheme();
  return (
    <VStack gap={2}>
      <Text font="label1">Basic example</Text>
      <RollingNumber
        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        value={price}
      />
      <Text font="label1">Portfolio Balance</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        accessibilityLabelPrefix={difference > 0 ? 'up ' : difference < 0 ? 'down ' : ''}
        color={trendColor}
        font="body"
        format={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        prefix={
          difference >= 0 ? (
            <Icon color={trendColor} name="diagonalUpArrow" size="xs" />
          ) : (
            <Icon color={trendColor} name="diagonalDownArrow" size="xs" />
          )
        }
        styles={{
          prefix: {
            paddingRight: theme.space[1],
          },
        }}
        suffix={`(${((Math.abs(difference) / price) * 100).toFixed(2)}%)`}
        value={Math.abs(difference)}
      />
      <Text font="label1">BTC Conversion</Text>
      <HStack alignItems="center" gap={1}>
        <Icon color="fgPrimary" name="arrowsVertical" size="xs" testID="swap-icon" />
        <RollingNumber
          color="fgPrimary"
          fontFamily="body"
          fontSize="body"
          fontWeight="body"
          format={{ minimumFractionDigits: 8, maximumFractionDigits: 8 }}
          value={price / 150_000}
        />
      </HStack>
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const FontCustomization = () => {
  const [price, setPrice] = React.useState<number>(9876.54);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 100) * 100) / 100));

  return (
    <VStack gap={2}>
      <Text font="label1">Font sizes, weights, and line heights</Text>
      <RollingNumber
        fontSize="display3"
        fontWeight="title3"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        fontSize="title3"
        fontWeight="headline"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        fontSize="body"
        fontWeight="body"
        format={{ style: 'currency', currency: 'USD' }}
        lineHeight="display3"
        value={price}
      />
      <Text font="label1">mono</Text>
      <RollingNumber
        mono
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      {/**
       * Different from web version, we currently only support tabular numbers (you cannot set
       * tabularNumbers to false). Becuase of RN onLayout measurements issues, rendering and
       * animating of non-tabular numbers are bad in mobile.
       */}
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const Format = () => {
  const values = [98345.67, 91345.67, 123450.123, 1234512.88];
  const [idx, setIdx] = React.useState(0);
  const onNext = () => setIdx((idx + 1) % values.length);
  const value = values[idx];
  const format = {
    style: 'currency' as const,
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
    notation: 'compact' as const,
  };
  return (
    <VStack gap={2}>
      <Text font="label1">Compact number with currency sign</Text>
      <RollingNumber font="display3" format={format} value={value} />
      <Text font="label1">Number without grouping</Text>
      <RollingNumber font="display3" format={{ useGrouping: false }} value={value} />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};
export const PrefixAndSuffix = () => {
  const { value, prefix, suffix, iconPrefix, iconSuffix, onNext } = useTestValues();
  const format = {
    style: 'currency' as const,
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  };

  const theme = useTheme();
  return (
    <VStack gap={2}>
      <Text font="label1">Simple text prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        format={format}
        prefix="+"
        suffix=" BTC"
        value={value}
      />
      <Text font="label1">Dynamic prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        format={format}
        prefix={prefix}
        suffix={suffix}
        value={value}
      />
      <Text font="label1">ReactNode prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        format={format}
        prefix={iconPrefix}
        suffix={iconSuffix}
        value={value}
      />
      <Text font="label1">Suffix wraps to second line</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={format}
        styles={{
          fraction: {
            paddingRight: theme.space[2],
          },
        }}
        suffix="BTC"
        value={value}
      />
      <Text font="label1">Suffix no wrapping</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={format}
        styles={{
          visibleContent: {
            flexWrap: 'nowrap',
          },
          fraction: {
            paddingRight: theme.space[2],
          },
        }}
        suffix="BTC"
        value={value}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

export const ColorAndTransition = () => {
  const [price, setPrice] = React.useState<number>(555.55);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 50) * 100) / 100));
  return (
    <VStack gap={2}>
      <Text font="label1">Color pulse and custom transition</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          color: {
            type: 'timing',
            duration: durations.moderate3,
            easing: Easing.inOut(Easing.quad),
          },
          y: {
            type: 'timing',
            duration: durations.moderate3,
            easing: Easing.in(Easing.quad),
          },
        }}
        value={price}
      />

      <RollingNumber
        colorPulseOnUpdate
        color="accentBoldBlue"
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          color: {
            type: 'timing',
            duration: durations.slow4,
            easing: Easing.inOut(Easing.quad),
          },
          y: {
            type: 'timing',
            duration: durations.slow4,
            easing: Easing.in(Easing.quad),
          },
        }}
        value={price}
      />

      <Text font="label1">Customize positive and negative change colors</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        negativePulseColor="bgWarning"
        positivePulseColor="fgPrimary"
        value={price}
      />

      <Text font="label1">Fast digits, slow color</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'EUR' }}
        transition={{
          y: {
            type: 'timing',
            duration: durations.fast1,
            easing: Easing.bezier(...curves.enterFunctional),
          },
          color: {
            type: 'timing',
            duration: 5000,
            easing: Easing.bezier(...curves.global),
          },
        }}
        value={price}
      />

      <Text font="label1">Springy digits</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: { type: 'spring', stiffness: 1000, damping: 24, mass: 3, overshootClamping: false },
        }}
        value={price}
      />

      <Text font="label1">Custom easings</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: {
            type: 'timing',
            duration: durations.moderate2,
            easing: Easing.bezier(...curves.enterExpressive),
          },
          color: {
            type: 'timing',
            duration: durations.slow1,
            easing: Easing.bezier(...curves.exitFunctional),
          },
        }}
        value={price}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const StyleOverrides = () => {
  const [price, setPrice] = React.useState<number>(12345.67);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 200) * 100) / 100));
  const theme = useTheme();

  return (
    <VStack gap={2}>
      <Text font="label1">Style overrides per section</Text>
      <Text font="body">
        Note: currently we do not support overriding the text styles (color, font, etc.) for
        inidividual number sections in mobile. Text props are applied globally.
      </Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        format={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          notation: 'compact',
        }}
        prefix="-"
        styles={{
          root: {
            borderStyle: 'dashed',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: theme.color.bgSecondaryWash,
            alignSelf: 'flex-start',
          },
          fraction: {
            opacity: 0.2,
            gap: 10,
          },
          suffix: {
            marginLeft: 10,
            backgroundColor: theme.color.accentBoldYellow,
            borderRadius: 8,
            padding: 4,
          },
        }}
        suffix="BTC"
        value={price}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const Subscript = () => {
  const values = [
    0.0000000001, 0.00009, 0.000012, 0.0000001, 0.000000001, 0.000000000000000000000011,
  ];
  const [idx, setIdx] = React.useState(0);
  const onNext = () => setIdx((idx + 1) % values.length);
  const value = values[idx];
  const format = { minimumFractionDigits: 2, maximumFractionDigits: 25 } as const;
  return (
    <VStack gap={1}>
      <Text font="label1">Subscript for small decimals</Text>
      <Text font="label2">Default:</Text>
      <RollingNumber font="display3" format={format} value={value} />
      <Text font="label2">With subscript:</Text>
      {fonts.map((fontKey) => (
        <RollingNumber
          key={fontKey}
          enableSubscriptNotation
          font={fontKey as any}
          format={format}
          value={value}
        />
      ))}
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

export const UserProvidedFormattedValue = () => {
  const btcPrices = [
    { value: 98_765.43, formattedValue: '¥98,765.43 BTC' },
    { value: 931.42, formattedValue: '$931.42 BTC' },
    { value: 100_890.56, formattedValue: '¥100,890.56 BTC' },
    { value: 149_432.12, formattedValue: '¥149,432.12 BTC' },
    { value: 150_321.23, formattedValue: '¥150,321.23 BTC' },
  ];
  const subscripts = [
    { value: 0.0000000001, formattedValue: '€0,0₉1', accessibilityLabel: '€0.0000000001' },
    { value: 0.00009, formattedValue: '€0,0₄9', accessibilityLabel: '€0.00009' },
    { value: 0.000012, formattedValue: '€0,0₄12', accessibilityLabel: '€0.000012' },
    { value: 0.0000001, formattedValue: '€0,0₆1', accessibilityLabel: '€0.0000001' },
    {
      value: 0.000000000000000000000011,
      formattedValue: '€0,0₂₂11',
      accessibilityLabel: '€0.000000000000000000000011',
    },
  ];
  const [idx, setIdx] = React.useState(0);
  const onNext = () => setIdx((idx + 1) % 5);

  return (
    <VStack gap={1}>
      <Text font="label1">User provided formatted value</Text>
      <Text font="label2">BTC prices</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display3"
        formattedValue={btcPrices[idx].formattedValue}
        prefix={<Icon name="crypto" size="l" />}
        value={btcPrices[idx].value}
      />

      <Text font="label2">Subscripts with comma as decimal separator</Text>
      <RollingNumber
        colorPulseOnUpdate
        accessibilityLabel={subscripts[idx].accessibilityLabel}
        font="display3"
        formattedValue={subscripts[idx].formattedValue}
        value={subscripts[idx].value}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const CounterExample = () => {
  const [count, setCount] = React.useState(0);
  const onInc = () => setCount((c) => c + 1);
  const onDec = () => setCount((c) => Math.max(0, c - 1));
  return (
    <VStack gap={1}>
      <Text font="label1">Counter</Text>
      <HStack alignItems="center" gap={2}>
        <IconButton accessibilityLabel="decrement" name="minus" onPress={onDec} />
        <RollingNumber
          colorPulseOnUpdate
          font="display1"
          format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
          value={count}
        />
        <IconButton accessibilityLabel="increment" name="add" onPress={onInc} />
      </HStack>
    </VStack>
  );
};

const CountDownExample = () => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const totalSeconds = 5 * 60;
  const [seconds, setSeconds] = React.useState(totalSeconds);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${pad(minutes)}:${pad(secs)}`;

  const onReset = () => setSeconds(totalSeconds);
  const progress = Math.max(0, Math.min(1, (totalSeconds - seconds) / totalSeconds));

  return (
    <VStack gap={1}>
      <Text font="label1">Countdown clock</Text>
      <RollingNumber
        accessibilityLiveRegion="none"
        font="display3"
        formattedValue={formatted}
        value={seconds}
      />
      <HStack gap={2}>
        <Button onPress={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</Button>
        <Button onPress={onReset}>Reset</Button>
      </HStack>

      <Text font="label1">Countdown with progress</Text>
      <VStack gap={1}>
        <ProgressBar progress={progress} />
        <RollingNumber
          accessibilityLiveRegion="none"
          font="body"
          format={{ style: 'percent', maximumFractionDigits: 0 }}
          prefix="Elapsed: "
          value={progress}
        />
      </VStack>
    </VStack>
  );
};

const SubscriptionPriceExample = () => {
  const [yearly, setYearly] = React.useState(false);
  const price = yearly ? 199 : 19;
  const suffix = yearly ? '/yr' : '/mo';
  const theme = useTheme();
  return (
    <VStack gap={1}>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberAffixSectionComponent={(props) => (
          <DefaultRollingNumberAffixSection {...props} textProps={{ font: 'title1' }} />
        )}
        accessibilityLabel={`$${price} ${suffix === '/yr' ? 'yearly' : 'monthly'}`}
        font="display1"
        format={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
        styles={{
          suffix: {
            alignItems: 'flex-end',
            paddingBottom: theme.space[1],
            opacity: 0.5,
          },
        }}
        suffix={suffix}
        transition={{
          y: { type: 'spring', stiffness: 80, damping: 24, mass: 3 },
        }}
        value={price}
      />
      <HStack gap={2}>
        <Button onPress={() => setYearly((v) => !v)}>
          {yearly ? 'Switch to monthly' : 'Switch to yearly'}
        </Button>
      </HStack>
    </VStack>
  );
};

const StatisticsExample = () => {
  const [views, setViews] = useState(1234567);
  const [likes, setLikes] = useState(89432);
  const [shares, setShares] = useState(12789);
  const [downloads, setDownloads] = useState(567890);

  const simulateActivity = () => {
    setViews((v) => v + Math.floor(Math.random() * 1000));
    setLikes((l) => l + Math.floor(Math.random() * 200));
    setShares((s) => s + Math.floor(Math.random() * 100));
    setDownloads((d) => d + Math.floor(Math.random() * 500));
  };

  const theme = useTheme();

  return (
    <VStack gap={2}>
      <Text font="label1">Social Media Statistics</Text>
      <HStack gap={2}>
        <VStack alignItems="center" gap={0.5}>
          <RollingNumber
            colorPulseOnUpdate
            font="title1"
            format={{ notation: 'compact', maximumFractionDigits: 1, minimumFractionDigits: 1 }}
            positivePulseColor="accentBoldBlue"
            value={views}
          />
          <Text color="fgMuted" font="caption">
            Views
          </Text>
        </VStack>
        <VStack alignItems="center" gap={0.5}>
          <RollingNumber
            colorPulseOnUpdate
            font="title1"
            format={{ notation: 'compact', maximumFractionDigits: 1, minimumFractionDigits: 1 }}
            positivePulseColor="accentBoldRed"
            prefix={<Icon color="accentBoldRed" name="heart" />}
            styles={{ prefix: { paddingRight: theme.space[0.5] } }}
            value={likes}
          />
          <Text color="fgMuted" font="caption">
            Likes
          </Text>
        </VStack>
        <VStack alignItems="center" gap={0.5}>
          <RollingNumber
            colorPulseOnUpdate
            font="title1"
            format={{ notation: 'compact', maximumFractionDigits: 1, minimumFractionDigits: 1 }}
            positivePulseColor="accentBoldGreen"
            value={shares}
          />
          <Text color="fgMuted" font="caption">
            Shares
          </Text>
        </VStack>
        <VStack alignItems="center" gap={0.5}>
          <RollingNumber
            colorPulseOnUpdate
            font="title1"
            format={{ notation: 'compact', maximumFractionDigits: 1, minimumFractionDigits: 1 }}
            positivePulseColor="accentBoldPurple"
            value={downloads}
          />
          <Text color="fgMuted" font="caption">
            Downloads
          </Text>
        </VStack>
      </HStack>
      <Button onPress={simulateActivity}>Simulate Activity</Button>
    </VStack>
  );
};

const LiveBiddingExample = () => {
  const [currentBid, setCurrentBid] = useState(45000);
  const [bidCount, setBidCount] = useState(23);
  const [timeLeft, setTimeLeft] = useState(180);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const placeBid = (increment: number) => {
    setCurrentBid((b) => b + increment);
    setBidCount((c) => c + 1);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <VStack gap={2}>
      <Text font="label1">Live Auction</Text>
      <VStack gap={1}>
        <Text color="fgMuted" font="caption">
          Current Bid
        </Text>
        <RollingNumber
          colorPulseOnUpdate
          font="display2"
          format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 0 }}
          positivePulseColor="accentBoldRed"
          transition={{
            y: { type: 'spring', stiffness: 200, damping: 20 },
          }}
          value={currentBid}
        />
        <HStack gap={1}>
          <RollingNumber
            accessibilityLiveRegion="none"
            font="body"
            format={{ minimumFractionDigits: 0 }}
            value={bidCount}
          />
          <Text font="body">bids placed</Text>
          <Text color="fgMuted" font="body">
            •
          </Text>
          <RollingNumber
            accessibilityLiveRegion="none"
            color={timeLeft < 30 ? 'fgNegative' : 'fg'}
            font="body"
            formattedValue={`${minutes}:${String(seconds).padStart(2, '0')}`}
            value={timeLeft}
          />
          <Text font="body">remaining</Text>
        </HStack>
      </VStack>
      <HStack gap={1}>
        <Button onPress={() => placeBid(100)}>+$100</Button>
        <Button onPress={() => placeBid(500)}>+$500</Button>
        <Button onPress={() => placeBid(1000)}>+$1000</Button>
      </HStack>
    </VStack>
  );
};

const FunExamples = () => {
  return (
    <VStack gap={2}>
      <CounterExample />
      <CountDownExample />
      <SubscriptionPriceExample />
      <StatisticsExample />
      <LiveBiddingExample />
    </VStack>
  );
};

const Accessibility = () => {
  return (
    <VStack gap={2}>
      <Text font="label1">Override screen reader label (compact notation)</Text>
      <RollingNumber
        accessibilityLabel="1,230 followers"
        font="display3"
        formattedValue="1.23K"
        suffix=" followers"
        value={1230}
      />

      <Text font="label1">Prefix/Suffix for screen readers (basis points)</Text>
      <RollingNumber
        accessibilityLabelPrefix="down "
        accessibilityLabelSuffix=" likes"
        font="body"
        prefix={<Icon name="arrowDown" size="s" />}
        suffix={<Icon name="heart" size="s" />}
        value={25}
      />
    </VStack>
  );
};

const RollingNumberScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Examples">
        <Examples />
      </Example>
      <Example title="Font customization">
        <FontCustomization />
      </Example>
      <Example title="Color and Transition">
        <ColorAndTransition />
      </Example>
      <Example title="Format">
        <Format />
      </Example>
      <Example title="Prefix and Suffix">
        <PrefixAndSuffix />
      </Example>
      <Example title="Style Overrides">
        <StyleOverrides />
      </Example>
      <Example title="Subscript">
        <Subscript />
      </Example>
      <Example title="User Provided Formatted Value">
        <UserProvidedFormattedValue />
      </Example>
      <Example title="Accessibility (labels & prefix/suffix)">
        <Accessibility />
      </Example>
      <Example title="Fun">
        <FunExamples />
      </Example>
    </ExampleScreen>
  );
};
export default RollingNumberScreen;
