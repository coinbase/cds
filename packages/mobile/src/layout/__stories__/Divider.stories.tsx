import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { HStack } from '../HStack';

const DividerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Horizontal & light">
        <Divider color="bgLine" direction="horizontal" />
      </Example>

      <Example title="Vertical & heavy">
        <HStack>
          <Box background="bgAlternate" height={100} width={100} />
          <Divider color="bgLineHeavy" direction="vertical" />
          <Box background="bgAlternate" height={100} width={100} />
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default DividerScreen;
