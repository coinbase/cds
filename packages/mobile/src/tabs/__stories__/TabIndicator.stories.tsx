import React, { useCallback, useState } from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { TabIndicator } from '../TabIndicator';

const getRandomNumber = () => Math.random() * 100 + 100;
const TabIndicatorScreen = () => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);

  const handlePress = useCallback(() => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  }, []);

  return (
    <ExampleScreen>
      <Example overflow="visible" padding={gutter} title="Tab Indicator">
        <VStack gap={2}>
          <Button onPress={handlePress}>Randomize</Button>
          <TabIndicator width={width} x={x} />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabIndicatorScreen;
