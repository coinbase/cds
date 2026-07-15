import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Chip } from '../Chip';

const NoopFn = () => {};

/**
 * One-off t-shirt size stories for the base Chip (xs/s).
 * Do not fold these into Chip.stories.tsx — keeps visual review of sizing isolated.
 */
const ChipSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size s)">
        <Chip onPress={NoopFn}>USD</Chip>
      </Example>
      <Example inline title="Deprecated compact (renders as size xs)">
        <Chip compact onPress={NoopFn}>
          USD
        </Chip>
      </Example>
      <Example inline title='size="xs"'>
        <Chip onPress={NoopFn} size="xs">
          USD
        </Chip>
      </Example>
      <Example inline title='size="s"'>
        <Chip onPress={NoopFn} size="s">
          USD
        </Chip>
      </Example>
      <Example inline title='compact + size="s" (size wins)'>
        <Chip compact onPress={NoopFn} size="s">
          USD
        </Chip>
      </Example>
    </ExampleScreen>
  );
};

export default ChipSizeScreen;
