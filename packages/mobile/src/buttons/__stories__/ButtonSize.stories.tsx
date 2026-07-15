import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Button } from '../Button';

/**
 * One-off t-shirt size story for Button (xs/s/m/l).
 * Do not fold these into Button.stories.tsx — keeps visual review of sizing isolated.
 */
const ButtonSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size l)">
        <Button onPress={console.log}>Default</Button>
      </Example>
      <Example inline title="Deprecated compact (legacy behavior, renders as s)">
        <Button compact onPress={console.log}>
          Compact
        </Button>
      </Example>
      <Example inline title='size="xs"'>
        <Button onPress={console.log} size="xs">
          Extra small
        </Button>
      </Example>
      <Example inline title='size="s"'>
        <Button onPress={console.log} size="s">
          Small
        </Button>
      </Example>
      <Example inline title='size="m"'>
        <Button onPress={console.log} size="m">
          Medium
        </Button>
      </Example>
      <Example inline title='size="l"'>
        <Button onPress={console.log} size="l">
          Large
        </Button>
      </Example>
      <Example inline title='compact + size="m" (size wins, renders as m)'>
        <Button compact onPress={console.log} size="m">
          Compact + Medium
        </Button>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonSizeScreen;
