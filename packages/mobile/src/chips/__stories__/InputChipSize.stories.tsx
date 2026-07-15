import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { InputChip } from '../InputChip';

const NoopFn = () => {};

/**
 * One-off t-shirt size stories for InputChip (xs/s).
 * Do not fold these into InputChip.stories.tsx — keeps visual review of sizing isolated.
 */
const InputChipSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size s)">
        <InputChip onPress={NoopFn}>USD</InputChip>
      </Example>
      <Example inline title="Deprecated compact (renders as size xs)">
        <InputChip compact onPress={NoopFn}>
          USD
        </InputChip>
      </Example>
      <Example inline title='size="xs"'>
        <InputChip onPress={NoopFn} size="xs">
          USD
        </InputChip>
      </Example>
      <Example inline title='size="s"'>
        <InputChip onPress={NoopFn} size="s">
          USD
        </InputChip>
      </Example>
      <Example inline title='compact + size="s" (size wins)'>
        <InputChip compact onPress={NoopFn} size="s">
          USD
        </InputChip>
      </Example>
    </ExampleScreen>
  );
};

export default InputChipSizeScreen;
