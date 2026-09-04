import React, { useCallback, useState } from 'react';
import random from 'lodash/random';

import { Button } from '../../buttons';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { AnimatedCaret } from '../AnimatedCaret';

export default {
  component: AnimatedCaret,
  title: 'Components/Motion/AnimatedCaret',
};

export const BasicAnimatedCaret = () => {
  const [rotate, setRotate] = useState(180);

  const handleRotate = useCallback(() => setRotate(random(0, 360)), []);

  return (
    <VStack>
      <Button onClick={handleRotate}>Rotate</Button>
      <Text as="p" display="block" font="body">
        Rotate: {rotate} &#730;
      </Text>
      <AnimatedCaret rotate={rotate} size="l" />
    </VStack>
  );
};
