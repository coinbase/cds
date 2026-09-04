import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { Text } from '../../typography/Text';
import { Button, type ButtonProps } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

const buttonStories: Omit<ButtonProps, 'children'>[] = [
  { variant: 'secondary' },
  { variant: 'tertiary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { variant: 'inverse' },
  { variant: 'secondary', transparent: true },
  { variant: 'positive', transparent: true },
  { variant: 'negative', transparent: true },
  { variant: 'inverse', transparent: true },
  { block: true },
  { size: 's', block: true },
  { transparent: true },
  { disabled: true },
  { loading: true },
  { loading: true, size: 's' },
  { loading: true, transparent: true },
  { loading: true, transparent: true, size: 's' },
  { loading: true, variant: 'secondary' },
  { loading: true, variant: 'secondary', size: 's' },
  { loading: true, variant: 'positive' },
  { loading: true, variant: 'positive', size: 's' },
  { loading: true, variant: 'negative' },
  { loading: true, variant: 'negative', size: 's' },
  { startIcon: 'backArrow' },
  { endIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', size: 's', endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', size: 's', endIcon: 'forwardArrow' },
  { flush: 'start', endIcon: 'forwardArrow' },
  { flush: 'end', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', size: 's' },
  { startIcon: 'backArrow', size: 's' },
  { endIcon: 'forwardArrow', size: 's' },
];

const ButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Complex example">
        <Button endIcon="caretDown" size="s" variant="secondary">
          <HStack alignItems="center" justifyContent="center" paddingTop={0}>
            <RemoteImage height={16} resizeMode="cover" shape="circle" width={16} />
            <Text color="fgMuted" font="label2" paddingStart={1} testID="DexInputNetwork">
              Ethereum
            </Text>
          </HStack>
        </Button>
      </Example>
      {buttonStories.map((props, index) => {
        return (
          <Example inline>
            <Button key={index} {...props}>
              I am a button
            </Button>
          </Example>
        );
      })}
      <Example title="Long text content">
        <Button>
          Some really really really long button text that should get truncated after wrapping two
          lines
        </Button>
      </Example>
      <Example title="Typography props">
        <VStack alignItems="flex-start" gap={2}>
          <Button>I am a headline button</Button>
          <Button font="body">I am a body button</Button>
          <Button font="title3">I am a title3 button</Button>
          <Button fontSize="title3" fontWeight="body">
            I have custom fontSize & fontWeight
          </Button>
        </VStack>
      </Example>

      <Example title="Custom endIcon on Button">
        <VStack gap={2}>
          <ButtonGroup accessibilityLabel="Group">
            <Button end={<Icon color="fg" name="caretRight" size="s" />}>
              <Text font="label1">Test</Text>
            </Button>
            <Button end={<Icon active color="fg" name="add" size="s" />} variant="secondary">
              <Text font="label1">Test</Text>
            </Button>
            <Button end={<Icon active color="fg" name="airdrop" size="s" />} variant="secondary">
              <Text font="label1">Test</Text>
            </Button>
          </ButtonGroup>
        </VStack>
      </Example>
      <Example title="Custom wrapperStyles for Wallet">
        <Button
          transparent
          wrapperStyles={{
            base: { backgroundColor: 'green' },
          }}
        >
          Hello world
        </Button>
      </Example>
      <Example inline title="Small">
        <HStack gap={2}>
          <Button height={32} paddingY={0}>
            I am a button
          </Button>
          <Button loading height={32} paddingY={0}>
            I am a button
          </Button>
        </HStack>
        <HStack gap={2}>
          <Button height={24} paddingY={0} progressCircleSize={16} size="s">
            I am a button
          </Button>
          <Button loading height={24} paddingY={0} progressCircleSize={16} size="s">
            I am a button
          </Button>
        </HStack>
      </Example>
      <Example title="Sizes">
        <VStack alignItems="flex-start" gap={2}>
          <Button size="xs">Extra small (xs)</Button>
          <Button size="s">Small (s)</Button>
          <Button size="m">Medium (m)</Button>
          <Button size="l">Large (l)</Button>
        </VStack>
      </Example>
      <Example title="Deprecated compact (use size='s')">
        <VStack alignItems="flex-start" gap={2}>
          <Button compact>Compact (deprecated)</Button>
          <Button size="s">Equivalent size=&quot;s&quot;</Button>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonScreen;
