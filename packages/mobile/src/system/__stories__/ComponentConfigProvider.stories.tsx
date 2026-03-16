import React, { useState } from 'react';

import { Button } from '../../buttons';
import type { ComponentConfig } from '../../core/componentConfig';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ComponentConfigProvider } from '../ComponentConfigProvider';

const StaticConfigExample = () => {
  const config: ComponentConfig = {
    Button: { variant: 'secondary', compact: true },
  };

  return (
    <ComponentConfigProvider value={config}>
      <VStack gap={2}>
        <Text font="body">Buttons inherit config defaults</Text>
        <HStack gap={2}>
          <Button>Default</Button>
          <Button variant="primary">Local override</Button>
        </HStack>
      </VStack>
    </ComponentConfigProvider>
  );
};

const FunctionalConfigExample = () => {
  const config: ComponentConfig = {
    Button: (props) => ({
      borderRadius: props.compact ? 200 : 900,
      variant: props.loading ? 'secondary' : 'primary',
    }),
  };

  return (
    <ComponentConfigProvider value={config}>
      <VStack gap={2}>
        <Text font="body">Button config is resolved from local props</Text>
        <HStack gap={2}>
          <Button compact>Compact</Button>
          <Button loading>Loading</Button>
          <Button>Regular</Button>
        </HStack>
      </VStack>
    </ComponentConfigProvider>
  );
};

const NestedProvidersExample = () => {
  const outerConfig: ComponentConfig = {
    Button: { variant: 'secondary' },
  };
  const innerConfig: ComponentConfig = {
    Button: { variant: 'positive', compact: true },
  };

  return (
    <ComponentConfigProvider value={outerConfig}>
      <VStack gap={2}>
        <Text font="body">Outer provider defaults</Text>
        <HStack gap={2}>
          <Button>Outer Button</Button>
        </HStack>

        <ComponentConfigProvider value={innerConfig}>
          <VStack gap={2} padding={2} style={{ borderWidth: 1, borderRadius: 8 }}>
            <Text font="body">Inner provider overrides Button</Text>
            <HStack gap={2}>
              <Button>Inner Button</Button>
            </HStack>
          </VStack>
        </ComponentConfigProvider>
      </VStack>
    </ComponentConfigProvider>
  );
};

const MergeStylePropsExample = () => {
  const [mergeEnabled, setMergeEnabled] = useState(false);
  const config: ComponentConfig = {
    Button: {
      style: { borderColor: 'green', borderWidth: 1 },
    },
  };

  return (
    <VStack gap={2}>
      <HStack gap={2}>
        <Button onPress={() => setMergeEnabled((value) => !value)} variant="secondary">
          Toggle mergeStyleProps ({mergeEnabled ? 'on' : 'off'})
        </Button>
      </HStack>
      <ComponentConfigProvider mergeStyleProps={mergeEnabled} value={config}>
        <HStack gap={2}>
          <Button style={{ borderColor: 'red' }}>Style override</Button>
          <Button>Theme only</Button>
        </HStack>
      </ComponentConfigProvider>
    </VStack>
  );
};

const ComponentConfigProviderStory = () => {
  return (
    <ExampleScreen>
      <Example title="Static Config">
        <StaticConfigExample />
      </Example>
      <Example title="Functional Config">
        <FunctionalConfigExample />
      </Example>
      <Example title="Nested Providers">
        <NestedProvidersExample />
      </Example>
      <Example title="mergeStyleProps">
        <MergeStylePropsExample />
      </Example>
    </ExampleScreen>
  );
};

export default ComponentConfigProviderStory;
