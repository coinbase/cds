import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { RemoteImageProps } from '../../media';
import { RemoteImage } from '../../media';
import { InputChip } from '../InputChip';

const InputChipScreen = () => {
  const regularMediaProps: RemoteImageProps = {
    height: 24,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: 24,
  };

  const compactMediaProps: RemoteImageProps = {
    height: 16,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: 16,
  };

  return (
    <ExampleScreen>
      <Example title="Default">
        <InputChip onPress={NoopFn} value="USD" />
        <InputChip onPress={NoopFn} start={<RemoteImage {...regularMediaProps} />} value="USD" />
        <InputChip
          disabled
          onPress={NoopFn}
          start={<RemoteImage {...regularMediaProps} />}
          value="USD"
        />
      </Example>
      <Example title="Compact">
        <InputChip compact onPress={NoopFn} value="USD" />
        <InputChip
          compact
          onPress={NoopFn}
          start={<RemoteImage {...compactMediaProps} />}
          value="USD"
        />
        <InputChip
          compact
          disabled
          onPress={NoopFn}
          start={<RemoteImage {...compactMediaProps} />}
          value="USD"
        />
      </Example>
      <Example title="Long text">
        <InputChip onPress={NoopFn} value="Lorem ipsum sit dolar amit" />
        <InputChip
          onPress={NoopFn}
          start={<RemoteImage {...regularMediaProps} />}
          value="Lorem ipsum sit dolar amit"
        />
        <InputChip
          disabled
          onPress={NoopFn}
          start={<RemoteImage {...regularMediaProps} />}
          value="Lorem ipsum sit dolar amit"
        />
      </Example>
    </ExampleScreen>
  );
};

export default InputChipScreen;
