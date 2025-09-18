import React from 'react';

import { Button, IconButton } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';

// this includes everything except SparklineInteractive has a filled area in Frontier, however that component has been decomped to its own package
const FrontierExampleScreen = () => (
  <ExampleScreen>
    <Example title="Frontier Changes">
      <VStack gap={3} paddingX={2} paddingY={3}>
        <Text font="headline" paddingBottom={3}>
          The following components are intended to be used purely for visual regression testing when
          Frontier is enabled as the default treatment for CDS libraries.
        </Text>
        <VStack background="bg" borderRadius={400} elevation={1} gap={2} padding={2}>
          <Text paddingBottom={3}>
            Secondary palette is unchanged when the parent has an elevation of 1
          </Text>
          <Button variant="secondary">Secondary button</Button>
        </VStack>
        <VStack background="bg" borderRadius={400} elevation={2} gap={2} padding={2}>
          <Text paddingBottom={3}>
            Secondary palette is unchanged when the parent has an elevation of 2
          </Text>
          <Button variant="secondary">Secondary button</Button>
        </VStack>
        <VStack bordered background="bg" borderRadius={400} gap={2} padding={2}>
          <Text paddingBottom={3}>
            Secondary buttons have a filled grey background and no border.
          </Text>
          <Button variant="secondary">Secondary button</Button>
          <Button transparent variant="secondary">
            Secondary button transparent
          </Button>
          <IconButton active name="add" variant="secondary" />
          <IconButton active transparent name="add" variant="secondary" />
        </VStack>
        <VStack bordered borderRadius={400} padding={2}>
          <Text font="body" paddingBottom={3}>
            Display 2 font size and line height are larger.
          </Text>
          <Text font="display2">Display 2</Text>
        </VStack>
        <VStack bordered borderRadius={400} padding={2}>
          <Text font="body" paddingBottom={3}>
            Primary blue is lighter in dark mode
          </Text>
          <Button variant="primary">Primary</Button>
        </VStack>
      </VStack>
    </Example>
  </ExampleScreen>
);

export default FrontierExampleScreen;
