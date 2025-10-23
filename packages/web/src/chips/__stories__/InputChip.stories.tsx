import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { HStack, VStack } from '../../layout';
import { RemoteImage, type RemoteImageProps } from '../../media';
import { Text } from '../../typography/Text';
import { InputChip } from '../InputChip';

export default {
  title: 'Components/Chips/InputChip',
  component: InputChip,
};

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const NoopFn = () => {};

export const Default = () => {
  return (
    <VStack gap={3}>
      <VStack gap={2}>
        <Text as="h2" display="block" font="display2">
          Default
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn} value="USD" />
          <InputChip onClick={NoopFn} start={<RemoteImage {...assetIconProps} />} value="USD" />
          <InputChip
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="USD"
          />
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Long text
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn} value="Lorem ipsum sit dolar" />
          <InputChip
            onClick={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="Lorem ipsum sit dolar"
          />
          <InputChip
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="Lorem ipsum sit dolar"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
