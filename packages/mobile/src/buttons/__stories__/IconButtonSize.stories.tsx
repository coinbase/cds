import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { IconButton } from '../IconButton';

/**
 * One-off t-shirt size stories for IconButton (xs/s/m/l).
 * Do not fold these into IconButton.stories.tsx — keeps visual review of sizing isolated.
 */
const IconButtonSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example
        inline
        title="Default (no size prop; compact defaults to true, so resolves to size s)"
      >
        <IconButton name="gear" accessibilityLabel="Default" onPress={console.log} />
      </Example>
      <Example inline title="Deprecated compact (renders as size s)">
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
      <Example inline title='size="l"'>
        <IconButton name="gear" accessibilityLabel="Large" size="l" onPress={console.log} />
      </Example>
      <Example inline title='compact + size="m" (size wins)'>
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
