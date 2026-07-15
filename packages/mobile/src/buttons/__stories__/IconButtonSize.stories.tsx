import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { IconButton } from '../IconButton';

/**
 * One-off t-shirt size story for IconButton (xs/s/m/l).
 * Do not fold these into IconButton.stories.tsx — keeps visual review of sizing isolated.
 */
const IconButtonSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size s)">
        <IconButton name="gear" accessibilityLabel="Default" onPress={console.log} />
      </Example>
      <Example inline title="Deprecated compact (legacy behavior, renders as s)">
        <IconButton compact name="gear" accessibilityLabel="Compact" onPress={console.log} />
      </Example>
      <Example inline title='size="xs"'>
        <IconButton name="gear" accessibilityLabel="Extra small" size="xs" onPress={console.log} />
      </Example>
      <Example inline title='size="s"'>
        <IconButton name="gear" accessibilityLabel="Small" size="s" onPress={console.log} />
      </Example>
      <Example inline title='size="m"'>
        <IconButton name="gear" accessibilityLabel="Medium" size="m" onPress={console.log} />
      </Example>
      <Example inline title='size="l" (default)'>
        <IconButton name="gear" accessibilityLabel="Large" size="l" onPress={console.log} />
      </Example>
      <Example inline title='compact + size="m" (size wins, renders as m)'>
        <IconButton
          compact
          name="gear"
          accessibilityLabel="Compact + Medium"
          size="m"
          onPress={console.log}
        />
      </Example>
    </ExampleScreen>
  );
};

export default IconButtonSizeScreen;
