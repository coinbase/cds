import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Box } from '../Box';
import { HStack } from '../HStack';
import { Spacer } from '../Spacer';
import { VStack } from '../VStack';

const SpacerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Vertical space">
        <Box
          alignItems="center"
          background="bgAlternate"
          height={100}
          justifyContent="center"
          width="100%"
        >
          <Text font="body">Top Content</Text>
        </Box>
        <Spacer vertical={3} />
        <Box
          alignItems="center"
          background="bgAlternate"
          height={100}
          justifyContent="center"
          width="100%"
        >
          <Text font="body">Bottom Content</Text>
        </Box>
      </Example>

      <Example title="Horizontal space">
        <HStack>
          <Box
            alignItems="center"
            background="bgAlternate"
            height={30}
            justifyContent="center"
            width={150}
          >
            <Text font="body">Left Content</Text>
          </Box>
          <Spacer horizontal={3} />
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <Text font="body">Right Content</Text>
          </Box>
        </HStack>
      </Example>

      <Example title="Fluid space">
        <VStack background="bgPrimaryWash" height={150}>
          <Box bordered alignItems="center" height={50} justifyContent="center" width="100%">
            <Text font="body">Top Content</Text>
          </Box>
          <Spacer />
          <Box bordered alignItems="center" height={50} justifyContent="center" width="100%">
            <Text font="body">Bottom Content</Text>
          </Box>
        </VStack>

        <HStack>
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <Text font="body">Left Content</Text>
          </Box>
          <Spacer />
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <Text font="body">Right Content</Text>
          </Box>
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default SpacerScreen;
