import React from 'react';
import { names } from '@coinbase/cds-icons/names';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { IconButton, type IconButtonBaseProps } from '../IconButton';

const iconName = 'arrowsHorizontal';
const accessibilityLabel = 'Horizontal arrows';

const variants = [
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary transparent',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="secondary" {...props} />
    ),
    title: 'Secondary',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="secondary" {...props} />
    ),
    title: 'Secondary transparent',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="foregroundMuted" {...props} />
    ),
    title: 'ForegroundMuted',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="foregroundMuted" {...props} />
    ),
    title: 'ForegroundMuted transparent',
  },
];

export const Default = () => (
  <VStack gap={6}>
    <VStack gap={2}>
      <Text font="title3">Basic Usage</Text>
      <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">States</Text>
      <HStack alignItems="center" gap={4}>
        <IconButton
          disabled
          accessibilityLabel={accessibilityLabel}
          name={iconName}
          variant="primary"
        />
        <Text font="body">Disabled primary</Text>
      </HStack>
      <HStack alignItems="center" gap={4}>
        <IconButton disabled accessibilityLabel={accessibilityLabel} name={iconName} />
        <Text font="body">Disabled secondary</Text>
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Without Compact Styles</Text>
      <IconButton accessibilityLabel={accessibilityLabel} compact={false} name={iconName} />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Icon Sizes</Text>
      <HStack alignItems="center" gap={4}>
        <IconButton accessibilityLabel="Extra small icon" iconSize="xs" name={iconName} />
        <IconButton accessibilityLabel="Small icon" iconSize="s" name={iconName} />
        <IconButton accessibilityLabel="Medium icon" iconSize="m" name={iconName} />
        <IconButton accessibilityLabel="Large icon" compact={false} iconSize="l" name={iconName} />
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Custom Style</Text>
      <IconButton
        accessibilityLabel={accessibilityLabel}
        compact={false}
        name={iconName}
        style={{ backgroundColor: 'red', transform: 'scale(0.5)' }}
      />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants</Text>
      {variants.map((variant, index) => (
        <HStack key={index} alignItems="center" gap={4}>
          {variant.component({ accessibilityLabel })}
          <Text font="body">{variant.title}</Text>
        </HStack>
      ))}
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants Loading</Text>
      {variants.map((variant, index) => (
        <HStack key={index} alignItems="center" gap={4}>
          {variant.component({ accessibilityLabel, loading: true })}
          <Text font="body">{variant.title}</Text>
        </HStack>
      ))}
    </VStack>
  </VStack>
);

const IconButtonSheet = ({ startIndex, endIndex }: { startIndex: number; endIndex: number }) => {
  return (
    <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
      {names.slice(startIndex, endIndex).map((name) => (
        <VStack key={name}>
          <HStack alignItems="center" gap={2}>
            <IconButton accessibilityLabel={name} name={name} variant="primary" />
            <IconButton accessibilityLabel={name} name={name} variant="secondary" />
            <IconButton accessibilityLabel={name} name={name} variant="foregroundMuted" />
          </HStack>
        </VStack>
      ))}
    </HStack>
  );
};

// single sheet is too large for Percy, need to split up in chunks of 160 to stay under resource limit
export const Sheet1 = () => <IconButtonSheet endIndex={160} startIndex={0} />;
export const Sheet2 = () => <IconButtonSheet endIndex={320} startIndex={160} />;
export const Sheet3 = () => <IconButtonSheet endIndex={480} startIndex={320} />;
export const Sheet4 = () => <IconButtonSheet endIndex={640} startIndex={480} />;

export default {
  title: 'Components/Buttons/IconButton',
  component: IconButton,
};
