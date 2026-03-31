import React from 'react';

import { customComponentConfig } from '../../__stories__/componentConfigStickerSheet/customComponentConfig';
import { customTheme } from '../../__stories__/componentConfigStickerSheet/customTheme';
import { StickerSheet } from '../../__stories__/componentConfigStickerSheet/StickerSheet';
import { Button } from '../../buttons';
import type { ComponentConfig } from '../../core/componentConfig';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ComponentConfigProvider } from '../ComponentConfigProvider';
import { ThemeProvider } from '../ThemeProvider';

export default {
  title: 'Components/ComponentConfigProvider',
};

const Example = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={2}>
    <Text as="h2" display="block" font="title3">
      {title}
    </Text>
    {children}
  </VStack>
);

const staticConfig: ComponentConfig = {
  Button: { variant: 'secondary', compact: true },
};

const functionalConfig: ComponentConfig = {
  Button: (props) => ({
    borderRadius: props.compact ? 200 : 900,
    variant: props.loading ? 'secondary' : 'primary',
  }),
};

const outerConfig: ComponentConfig = {
  Button: { variant: 'secondary', compact: true },
};

const innerConfig: ComponentConfig = {
  Button: { variant: 'positive' },
};

export const All = () => (
  <VStack gap={4}>
    <ComponentConfigProvider value={staticConfig}>
      <Example title="Static Config">
        <HStack flexWrap="wrap" gap={2}>
          <Button>Config default</Button>
          <Button variant="primary">Local override</Button>
          <Button compact={false}>Local non-compact</Button>
        </HStack>
      </Example>
    </ComponentConfigProvider>

    <ComponentConfigProvider value={functionalConfig}>
      <Example title="Functional Config">
        <HStack flexWrap="wrap" gap={2}>
          <Button compact>Compact (pill)</Button>
          <Button loading>Loading (secondary)</Button>
          <Button>Regular (primary)</Button>
        </HStack>
      </Example>
    </ComponentConfigProvider>

    <ComponentConfigProvider value={outerConfig}>
      <Example title="Nested Providers">
        <HStack gap={2}>
          <Button>Outer scope button (secondary + compact)</Button>
        </HStack>

        <ComponentConfigProvider value={innerConfig}>
          <VStack
            gap={2}
            padding={3}
            style={{ border: '2px dashed var(--color-bgPositive)', borderRadius: 12 }}
          >
            <Button>Inner scope button (positive, not compact)</Button>
          </VStack>
        </ComponentConfigProvider>
      </Example>
    </ComponentConfigProvider>
  </VStack>
);

export const Default = () => <StickerSheet />;
Default.parameters = {
  a11y: {
    context: {
      include: ['body'],
      exclude: ['.no-a11y-checks'],
    },
  },
};

export const Custom = () => (
  <ThemeProvider activeColorScheme="dark" theme={customTheme}>
    <ComponentConfigProvider value={customComponentConfig}>
      <StickerSheet />
    </ComponentConfigProvider>
  </ThemeProvider>
);

Custom.parameters = { a11y: { disable: true } };
