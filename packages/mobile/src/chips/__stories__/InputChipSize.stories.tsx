import React from 'react';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { InputChip } from '../InputChip';

/**
 * One-off size density screen for InputChip (xs/s).
 * Do not fold this into InputChip.stories.tsx — keeps visual review of density isolated.
 */
const InputChipSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size s)">
        <InputChip onPress={NoopFn}>USD</InputChip>
      </Example>
      <Example title="Deprecated compact (legacy behavior, renders xs)">
        <InputChip compact onPress={NoopFn}>
          USD
        </InputChip>
      </Example>
      <Example title='size="xs"'>
        <InputChip onPress={NoopFn} size="xs">
          USD
        </InputChip>
      </Example>
      <Example title='size="s"'>
        <InputChip onPress={NoopFn} size="s">
          USD
        </InputChip>
      </Example>
      <Example title='compact + size="s" (size wins)'>
        <InputChip compact onPress={NoopFn} size="s">
          USD
        </InputChip>
      </Example>
    </ExampleScreen>
  );
};

export default InputChipSizeScreen;
