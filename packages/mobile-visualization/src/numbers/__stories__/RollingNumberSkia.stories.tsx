import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@coinbase/cds-mobile/buttons/Button';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Icon } from '@coinbase/cds-mobile/icons/Icon';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { RollingNumber } from '@coinbase/cds-mobile/numbers/RollingNumber';
import { Text } from '@coinbase/cds-mobile/typography';

import { SkiaRollingNumberValueSection } from '../RollingNumber/SkiaRollingNumberValueSection';

type PlaybackState = 'paused' | 'playing' | 'fast';

const PlaybackButton = ({ onNext }: { onNext: () => void }) => {
  const [state, setState] = useState<PlaybackState>('paused');

  useEffect(() => {
    if (state === 'paused') return;

    const interval = state === 'playing' ? 1000 : 500;
    const id = setInterval(onNext, interval);
    return () => clearInterval(id);
  }, [state, onNext]);

  const handlePress = useCallback(() => {
    setState((prev) => {
      if (prev === 'paused') return 'playing';
      if (prev === 'playing') return 'fast';
      return 'paused';
    });
  }, []);

  const iconName = state === 'paused' ? 'play' : state === 'playing' ? 'forwardArrow' : 'pause';

  return <IconButton name={iconName} onPress={handlePress} variant="secondary" />;
};

const BasicExample = () => {
  const [price, setPrice] = useState(12345.67);
  const onNext = useCallback(() => {
    setPrice(Math.random() * 180000);
  }, []);

  return (
    <VStack gap={2}>
      <Text font="label1">Basic currency format with color pulse</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display3"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <HStack gap={1}>
        <Button onPress={onNext}>Next</Button>
        <PlaybackButton onNext={onNext} />
      </HStack>
    </VStack>
  );
};

const FontCustomization = () => {
  const [price, setPrice] = useState(9876.54);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 100) * 100) / 100));

  return (
    <VStack gap={2}>
      <Text font="label1">Font sizes and weights</Text>
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display1"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display3"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="body"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="caption"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const NumberFormats = () => {
  const values = [98345.67, 91345.67, 123450.123, 1234512.88];
  const [idx, setIdx] = useState(0);
  const onNext = () => setIdx((idx + 1) % values.length);
  const value = values[idx];

  return (
    <VStack gap={2}>
      <Text font="label1">Compact notation with currency</Text>
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display3"
        format={{
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        value={value}
      />
      <Text font="label1">Percentage</Text>
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        value={value / 1000000}
      />
      <Text font="label1">No grouping</Text>
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ useGrouping: false }}
        value={value}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const PrefixAndSuffix = () => {
  const [price, setPrice] = useState(12345.67);
  const onNext = useCallback(() => {
    setPrice(Math.random() * 50000);
  }, []);
  const theme = useTheme();

  return (
    <VStack gap={2}>
      <Text font="label1">Text prefix and suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        prefix="+"
        suffix=" USD"
        value={price}
      />
      <Text font="label1">Icon prefix</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        prefix={<Icon name="arrowUp" size="s" />}
        styles={{ prefix: { paddingRight: theme.space[1] } }}
        value={price}
      />
      <Text font="label1">Icon suffix</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
        styles={{ suffix: { paddingLeft: theme.space[1] } }}
        suffix={<Icon name="heart" size="s" />}
        value={price}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const SpringTransition = () => {
  const [price, setPrice] = useState(555.55);
  const onNext = () =>
    setPrice((p) => Math.max(0, Math.round((p + (Math.random() - 0.5) * 50) * 100) / 100));

  return (
    <VStack gap={2}>
      <Text font="label1">Default spring</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        value={price}
      />
      <Text font="label1">Bouncy spring</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'USD' }}
        transition={{
          y: { type: 'spring', stiffness: 1000, damping: 24, mass: 3, overshootClamping: false },
        }}
        value={price}
      />
      <Text font="label1">Slow timing</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="title1"
        format={{ style: 'currency', currency: 'EUR' }}
        transition={{
          y: { type: 'timing', duration: 800 },
        }}
        value={price}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const FormattedValue = () => {
  const btcPrices = [
    { value: 98765.43, formattedValue: '$98,765.43 BTC' },
    { value: 931.42, formattedValue: '$931.42 BTC' },
    { value: 100890.56, formattedValue: '$100,890.56 BTC' },
    { value: 149432.12, formattedValue: '$149,432.12 BTC' },
  ];
  const [idx, setIdx] = useState(0);
  const onNext = () => setIdx((idx + 1) % btcPrices.length);

  return (
    <VStack gap={2}>
      <Text font="label1">User-provided formatted value</Text>
      <RollingNumber
        colorPulseOnUpdate
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display3"
        formattedValue={btcPrices[idx].formattedValue}
        value={btcPrices[idx].value}
      />
      <Text font="label1">Countdown clock format</Text>
      <RollingNumber
        RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
        font="display3"
        formattedValue="04:32"
        value={272}
      />
      <Button onPress={onNext}>Next</Button>
    </VStack>
  );
};

const ComparisonWithDefault = () => {
  const [price, setPrice] = useState(12345.67);
  const onNext = useCallback(() => {
    setPrice(Math.random() * 50000);
  }, []);

  return (
    <VStack gap={2}>
      <Text font="label1">Side-by-side: Default vs Skia</Text>
      <HStack gap={4}>
        <VStack gap={1}>
          <Text color="fgMuted" font="caption">
            Default Renderer
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
            Skia Renderer
          </Text>
          <RollingNumber
            colorPulseOnUpdate
            RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
            font="title1"
            format={{ style: 'currency', currency: 'USD' }}
            value={price}
          />
        </VStack>
      </HStack>
      <Text color="fgMuted" font="caption">
        Note: Skia uses discrete color pulse (instant switch) vs default smooth interpolation
      </Text>
      <HStack gap={1}>
        <Button onPress={onNext}>Next</Button>
        <PlaybackButton onNext={onNext} />
      </HStack>
    </VStack>
  );
};

const SkiaRollingNumberScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <BasicExample />
      </Example>
      <Example title="Font Customization">
        <FontCustomization />
      </Example>
      <Example title="Number Formats">
        <NumberFormats />
      </Example>
      <Example title="Prefix and Suffix">
        <PrefixAndSuffix />
      </Example>
      <Example title="Spring Transition">
        <SpringTransition />
      </Example>
      <Example title="Formatted Value">
        <FormattedValue />
      </Example>
      <Example title="Comparison with Default">
        <ComparisonWithDefault />
      </Example>
    </ExampleScreen>
  );
};

export default SkiaRollingNumberScreen;
