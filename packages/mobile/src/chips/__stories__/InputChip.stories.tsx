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
        <InputChip onPress={NoopFn}>USD</InputChip>
        <InputChip onPress={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
          USD
        </InputChip>
        <InputChip disabled onPress={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
          USD
        </InputChip>
      </Example>
      <Example title="Compact">
        <InputChip compact onPress={NoopFn}>
          USD
        </InputChip>
        <InputChip compact onPress={NoopFn} start={<RemoteImage {...compactMediaProps} />}>
          USD
        </InputChip>
        <InputChip compact disabled onPress={NoopFn} start={<RemoteImage {...compactMediaProps} />}>
          USD
        </InputChip>
      </Example>
      <Example title="Long text">
        <InputChip onPress={NoopFn}>Lorem ipsum sit dolar amit</InputChip>
        <InputChip onPress={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
          Lorem ipsum sit dolar amit
        </InputChip>
        <InputChip disabled onPress={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
          Lorem ipsum sit dolar amit
        </InputChip>
      </Example>
    </ExampleScreen>
  );
};

export default InputChipScreen;
