import React from 'react';
import * as animations from '@coinbase/cds-lottie-files';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { Lottie } from '../Lottie';

const LottieScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Box padding={1}>
          {Object.entries(animations).map(([name, source]) => (
            <Box key={name} width={200}>
              <Text font="body">{name}</Text>
              <Lottie autoplay loop height={200} source={source} width={200} />
            </Box>
          ))}
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default LottieScreen;
