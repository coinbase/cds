import React, { useCallback, useState } from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { Meta, StoryObj } from '@storybook/react';
import sample from 'lodash/sample';

import { Button } from '../../buttons/Button';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { TabLabel, type TabLabelBaseProps } from '../TabLabel';

const meta: Meta = {
  title: 'Components/Tabs/TabLabel',
  component: TabLabel,
};

export default meta;
type Story = StoryObj;

type ExampleProps = {
  variant: TabLabelBaseProps['variant'];
  colorScheme: ColorScheme;
};

const Example = ({ variant, colorScheme }: ExampleProps) => {
  const [count, setCount] = useState(1);

  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);

  return (
    <ThemeProvider activeColorScheme={colorScheme} theme={defaultTheme}>
      <VStack background="bg" gap={2} padding={4}>
        <Button block onClick={updateCount}>
          Randomize count: {variant} ({colorScheme})
        </Button>
        <HStack gap={2}>
          <TabLabel active count={count} variant={variant}>
            All
          </TabLabel>
          <TabLabel variant={variant}>Tradable</TabLabel>
          <TabLabel variant={variant}>Watchlist</TabLabel>
          <TabLabel variant={variant}>Trending</TabLabel>
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

const DefaultRender = () => {
  return (
    <>
      <Example colorScheme="light" variant="primary" />
      <Example colorScheme="light" variant="secondary" />
      <Example colorScheme="dark" variant="primary" />
      <Example colorScheme="dark" variant="secondary" />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultRender />,
};
