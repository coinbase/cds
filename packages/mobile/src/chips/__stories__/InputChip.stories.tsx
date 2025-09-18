import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { RemoteImageProps } from '../../media';
import { RemoteImage } from '../../media';
import { InputChip } from '../InputChip';

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const InputChipScreen = () => (
  <ExampleScreen>
    <Example title="Default">
      <InputChip onPress={NoopFn} value="USD" />
      <InputChip onPress={NoopFn} start={<RemoteImage {...assetIconProps} />} value="USD" />
      <InputChip
        disabled
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
        value="USD"
      />
    </Example>
    <Example title="Long text">
      <InputChip onPress={NoopFn} value="Lorem ipsum sit dolar amit" />
      <InputChip
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
        value="Lorem ipsum sit dolar amit"
      />
      <InputChip
        disabled
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
        value="Lorem ipsum sit dolar amit"
      />
    </Example>
  </ExampleScreen>
);

export default InputChipScreen;
