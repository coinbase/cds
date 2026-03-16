import React, { useState } from 'react';

import { Button } from '../../buttons';
import type { ComponentConfig } from '../../core/componentConfig';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ComponentConfigProvider } from '../ComponentConfigProvider';

export default {
  title: 'Components/ComponentConfigProvider',
};

const staticConfig: ComponentConfig = {
  Button: { variant: 'secondary', compact: true },
};

export const StaticConfig = () => (
  <ComponentConfigProvider value={staticConfig}>
    <VStack gap={4} padding={4}>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title2">
          Static Config
        </Text>
        <Text as="p" color="fgMuted" display="block" font="body">
          Button defaults come from a static object on the provider.
        </Text>
      </VStack>

      <HStack flexWrap="wrap" gap={2}>
        <Button>Config default</Button>
        <Button variant="primary">Local override</Button>
        <Button compact={false}>Local non-compact</Button>
      </HStack>
    </VStack>
  </ComponentConfigProvider>
);

const functionalConfig: ComponentConfig = {
  Button: (props) => ({
    borderRadius: props.compact ? 200 : 900,
    variant: props.loading ? 'secondary' : 'primary',
  }),
};

export const FunctionalConfig = () => (
  <ComponentConfigProvider value={functionalConfig}>
    <VStack gap={4} padding={4}>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title2">
          Functional Config
        </Text>
        <Text as="p" color="fgMuted" display="block" font="body">
          Button config can be resolved from local Button props.
        </Text>
      </VStack>

      <HStack flexWrap="wrap" gap={2}>
        <Button compact>Compact (pill)</Button>
        <Button loading>Loading (secondary)</Button>
        <Button>Regular (primary)</Button>
      </HStack>
    </VStack>
  </ComponentConfigProvider>
);

const outerConfig: ComponentConfig = {
  Button: { variant: 'secondary' },
};

const innerConfig: ComponentConfig = {
  Button: { variant: 'positive', compact: true },
};

export const NestedProviders = () => (
  <ComponentConfigProvider value={outerConfig}>
    <VStack gap={4} padding={4}>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title2">
          Nested Providers
        </Text>
        <Text as="p" color="fgMuted" display="block" font="body">
          Inner providers use isolated config scope.
        </Text>
      </VStack>

      <HStack gap={2}>
        <Button>Outer scope button</Button>
      </HStack>

      <ComponentConfigProvider value={innerConfig}>
        <VStack
          gap={2}
          padding={3}
          style={{ border: '2px dashed var(--color-bgPositive)', borderRadius: 12 }}
        >
          <Button>Inner scope button</Button>
        </VStack>
      </ComponentConfigProvider>
    </VStack>
  </ComponentConfigProvider>
);

export const MergeClassNameAndStyle = () => {
  const [mergeEnabled, setMergeEnabled] = useState(false);
  const config: ComponentConfig = {
    Button: {
      className: 'storybook-theme-button',
      borderRadius: 200,
    },
  };

  return (
    <VStack gap={4} padding={4}>
      <Button onClick={() => setMergeEnabled((value) => !value)} variant="secondary">
        Toggle mergeClassNameAndStyle ({mergeEnabled ? 'on' : 'off'})
      </Button>

      <ComponentConfigProvider mergeClassNameAndStyle={mergeEnabled} value={config}>
        <HStack gap={2}>
          <Button className="storybook-local-button">Local className</Button>
          <Button>Provider defaults only</Button>
        </HStack>
      </ComponentConfigProvider>
    </VStack>
  );
};
