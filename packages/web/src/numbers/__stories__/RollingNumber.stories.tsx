import React, { useEffect, useState } from 'react';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';

import { IconButton } from '../../buttons';
import { Button } from '../../buttons/Button';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations/ProgressBar';
import { RollingNumber } from '../RollingNumber/RollingNumber';

export default {
  title: 'Components/RollingNumber',
  component: RollingNumber,
};

export const Examples = () => {
  const [price, setPrice] = useState<number>(12345.67);
  const [difference, setDifference] = useState<number>(0);
  const onNext = () =>
    setPrice((p) => {
      const delta = (Math.random() - 0.5) * 200; // +/- 100
      const next = Math.max(0, p + delta);
      const newPrice = Math.round(next * 100) / 100;
      setDifference(newPrice - p);
      return newPrice;
    });

  const trendColor = difference >= 0 ? 'fgPositive' : 'fgNegative';

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
      <HStack alignItems="center">
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
              paddingRight: 'var(--space-1)',
            },
          }}
          suffix={`(${((Math.abs(difference) / price) * 100).toFixed(2)}%)`}
          value={Math.abs(difference)}
        />
      </HStack>
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
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

export const FontCustomization = () => {
  const [price, setPrice] = useState<number>(9876.54);
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
      <Text font="label1">Responsive font (phone, tablet, desktop)</Text>
      <RollingNumber
        font={{ phone: 'body', tablet: 'title3', desktop: 'display3' }}
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <Text font="label1">Tabular numbers vs non-tabular numbers</Text>
      <RollingNumber
        font="display3"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        font="display3"
        format={{ style: 'currency', currency: 'USD' }}
        tabularNumbers={false}
        value={price}
      />
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

export const ColorAndTransition = () => {
  const [price, setPrice] = useState<number>(555.55);
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
          color: { duration: durations.moderate3 / 1000, ease: 'easeInOut' },
          y: { duration: durations.moderate3 / 1000, ease: 'easeIn' },
        }}
        value={price}
      />
      <RollingNumber
        colorPulseOnUpdate
        color="accentBoldBlue"
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          color: { duration: durations.slow4 / 1000, ease: 'easeInOut' },
          y: { duration: durations.slow4 / 1000, ease: 'easeIn' },
        }}
        value={price}
      />

      <Text font="label1">Customize positive and negative change colors</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        negativePulseColor="bgWarning"
        positivePulseColor="fgPrimary"
        value={price}
      />
      <Text font="label1">Fast digits, slow color</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: { duration: durations.fast1 / 1000, ease: curves.enterFunctional },
          color: { duration: 5, ease: curves.global },
        }}
        value={price}
      />
      <Text font="label1">Springy digits</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: {
            type: 'spring',
            stiffness: 1000,
            damping: 24,
            mass: 3,
          },
        }}
        value={price}
      />
      <Text font="label1">Custom easings</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: { duration: durations.moderate2 / 1000, ease: curves.enterExpressive },
          color: { duration: durations.slow1 / 1000, ease: curves.exitFunctional },
        }}
        value={price}
      />
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

export const Polymorphism = () => {
  return (
    <VStack gap={2}>
      <Text font="label1">Polymorphism</Text>
      <RollingNumber as="h1" format={{ style: 'currency', currency: 'USD' }} value={12345.67} />
      <RollingNumber as="p" format={{ style: 'currency', currency: 'USD' }} value={12345.67} />
    </VStack>
  );
};

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

export const Format = () => {
  const { value, onNext } = useTestValues();
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
      <RollingNumber font="display1" format={format} value={value} />
      <Text font="label1">Number without grouping</Text>
      <RollingNumber font="display1" format={{ useGrouping: false }} value={value} />
      <Button onClick={onNext}>Next</Button>
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

  return (
    <VStack gap={2}>
      <Text font="label1">Simple text prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={format}
        prefix="+"
        suffix=" BTC"
        value={value}
      />
      <Text font="label1">Dynamic prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={format}
        prefix={prefix}
        suffix={suffix}
        value={value}
      />
      <Text font="label1">ReactNode prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={format}
        prefix={iconPrefix}
        suffix={iconSuffix}
        value={value}
      />
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

export const StyleOverrides = () => {
  const [price, setPrice] = useState<number>(12345.67);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 200) * 100) / 100));
  return (
    <VStack gap={2}>
      <Text font="label1">Style overrides per section</Text>
      <RollingNumber
        colorPulseOnUpdate
        font="display1"
        format={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          notation: 'compact',
        }}
        prefix="-"
        styles={{
          root: {
            border: '1px dashed var(--color-bgLine)',
            padding: '4px 8px',
            borderRadius: 8,
            background: 'var(--color-bgSecondaryWash)',
          },
          i18nPrefix: { color: 'var(--color-accentBoldBlue)' },
          prefix: { color: 'rgb(var(--purple50))' },
          integer: { letterSpacing: '-1px' },
          fraction: { opacity: 0.2, letterSpacing: '10px' },
          i18nSuffix: { color: 'var(--color-accentBoldRed)' },
          suffix: { color: 'var(--color-accentBoldYellow)', marginLeft: 10 },
        }}
        suffix="BTC"
        value={price}
      />
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

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

export const Subscript = () => {
  const values = [
    0.0000000001, 0.00009, 0.000012, 0.0000001, 0.000000001, 0.000000000000000000000011,
  ];
  const [idx, setIdx] = useState(0);
  const onNext = () => setIdx((idx + 1) % values.length);
  const value = values[idx];
  const format = { minimumFractionDigits: 2, maximumFractionDigits: 25 };

  return (
    <VStack gap={1}>
      <Text font="label1">Subscript for small decimals</Text>
      <Text as="span" font="label2">
        Default:
      </Text>
      <RollingNumber font="display3" format={format} value={value} />

      <Text as="span" font="label2">
        With subscript:
      </Text>
      {fonts.map((fontKey) => (
        <RollingNumber
          key={fontKey}
          enableSubscriptNotation
          font={fontKey}
          format={format}
          value={value}
        />
      ))}
      <Button onClick={onNext}>Next</Button>
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
  const [idx, setIdx] = useState(0);
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
      <Button onClick={onNext}>Next</Button>
    </VStack>
  );
};

export const Accessibility = () => {
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

export const SingleTransition = () => {
  const [price, setPrice] = useState<number>(12345.67);
  const onUp = () => setPrice((p) => Math.round((p + Math.random() * 100) * 100) / 100);
  const onDown = () =>
    setPrice((p) => Math.max(0, Math.round((p - Math.random() * 100) * 100) / 100));

  return (
    <VStack gap={3}>
      <RollingNumber
        colorPulseOnUpdate
        digitTransitionVariant="single"
        font="display1"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <HStack gap={2}>
        <Button onClick={onUp}>Increase</Button>
        <Button onClick={onDown}>Decrease</Button>
      </HStack>
      <HStack gap={4}>
        <VStack gap={1}>
          <Text color="fgMuted" font="caption">
            Every (default)
          </Text>
          <RollingNumber
            colorPulseOnUpdate
            font="title1"
            format={{ style: 'currency', currency: 'USD' }}
            value={price}
          />
        </VStack>
        <VStack gap={1}>
          <Text color="fgMuted" font="caption">
            Single
          </Text>
          <RollingNumber
            colorPulseOnUpdate
            digitTransitionVariant="single"
            font="title1"
            format={{ style: 'currency', currency: 'USD' }}
            value={price}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

export const Fun = () => {
  // Counter
  const [count, setCount] = useState(0);

  // Countdown
  const pad = (n: number) => String(n).padStart(2, '0');
  const totalSeconds = 5 * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${pad(minutes)}:${pad(secs)}`;
  const onReset = () => setSeconds(totalSeconds);
  const progress = Math.max(0, Math.min(1, (totalSeconds - seconds) / totalSeconds));

  // Subscription price
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 199 : 19;
  const suffix = yearly ? '/yr' : '/mo';

  // Statistics
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

  // Live bidding
  const [currentBid, setCurrentBid] = useState(45000);
  const [bidCount, setBidCount] = useState(23);
  const [timeLeft, setTimeLeft] = useState(180);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  const placeBid = (inc: number) => {
    setCurrentBid((b) => b + inc);
    setBidCount((c) => c + 1);
  };
  const lbMinutes = Math.floor(timeLeft / 60);
  const lbSeconds = timeLeft % 60;

  return (
    <VStack gap={3}>
      {/* Counter */}
      <VStack gap={1}>
        <Text font="label1">Counter</Text>
        <HStack alignItems="center" gap={2}>
          <IconButton name="minus" onClick={() => setCount((c) => Math.max(0, c - 1))} />
          <RollingNumber
            colorPulseOnUpdate
            font="display1"
            format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
            value={count}
          />
          <IconButton name="add" onClick={() => setCount((c) => c + 1)} />
        </HStack>
      </VStack>

      {/* Countdown */}
      <VStack gap={1}>
        <Text font="label1">Countdown clock</Text>
        <RollingNumber ariaLive="off" font="display3" formattedValue={formatted} value={seconds} />
        <HStack gap={2}>
          <Button onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</Button>
          <Button onClick={onReset}>Reset</Button>
        </HStack>
        <Text font="label1">Countdown with percent</Text>
        <VStack gap={1}>
          <ProgressBar progress={progress} />
          <RollingNumber
            ariaLive="off"
            font="body"
            format={{ style: 'percent', maximumFractionDigits: 0 }}
            prefix="Elapsed: "
            value={progress}
          />
        </VStack>
      </VStack>

      {/* Subscription */}
      <VStack gap={1}>
        <RollingNumber
          colorPulseOnUpdate
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
              position: 'relative',
              top: 'var(--space-1_5)',
              color: 'var(--color-fgMuted)',
              fontSize: 'var(--fontSize-title1)',
            },
          }}
          suffix={suffix}
          transition={{ y: { type: 'spring', stiffness: 80, damping: 24, mass: 3 } }}
          value={price}
        />
        <HStack gap={2}>
          <Button onClick={() => setYearly((v) => !v)}>
            {yearly ? 'Switch to monthly' : 'Switch to yearly'}
          </Button>
        </HStack>
      </VStack>

      {/* Statistics */}
      <VStack gap={2}>
        <Text font="label1">Social Media Statistics</Text>
        <HStack gap={4}>
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
              styles={{ prefix: { paddingRight: 'var(--space-0_5)' } }}
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
        <Button onClick={simulateActivity}>Simulate Activity</Button>
      </VStack>

      {/* Live bidding */}
      <VStack gap={1}>
        <Text color="fgMuted" font="caption">
          Current Bid
        </Text>
        <RollingNumber
          colorPulseOnUpdate
          font="display2"
          format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 0 }}
          positivePulseColor="accentBoldRed"
          transition={{ y: { type: 'spring', stiffness: 200, damping: 20 } }}
          value={currentBid}
        />
        <HStack gap={1}>
          <RollingNumber
            ariaLive="off"
            font="body"
            format={{ minimumFractionDigits: 0 }}
            value={bidCount}
          />
          <Text font="body">bids placed</Text>
          <Text color="fgMuted" font="body">
            •
          </Text>
          <RollingNumber
            ariaLive="off"
            color={timeLeft < 30 ? 'fgNegative' : 'fg'}
            font="body"
            formattedValue={`${lbMinutes}:${String(lbSeconds).padStart(2, '0')}`}
            value={timeLeft}
          />
          <Text font="body">remaining</Text>
        </HStack>
        <HStack gap={1}>
          <Button onClick={() => placeBid(100)}>+$100</Button>
          <Button onClick={() => placeBid(500)}>+$500</Button>
          <Button onClick={() => placeBid(1000)}>+$1000</Button>
        </HStack>
      </VStack>
    </VStack>
  );
};
