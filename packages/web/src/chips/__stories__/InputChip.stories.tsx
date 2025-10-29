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

const NoopFn = () => {};

export const Default = () => {
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
    <VStack gap={3}>
      <VStack gap={2}>
        <Text as="h2" display="block" font="display2">
          Default
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn} value="USD" />
          <InputChip onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />} value="USD" />
          <InputChip
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...regularMediaProps} />}
            value="USD"
          />
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Compact
        </Text>
        <HStack gap={2}>
          <InputChip compact onClick={NoopFn} value="USD" />
          <InputChip
            compact
            onClick={NoopFn}
            start={<RemoteImage {...compactMediaProps} />}
            value="USD"
          />
          <InputChip
            compact
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...compactMediaProps} />}
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
            start={<RemoteImage {...regularMediaProps} />}
            value="Lorem ipsum sit dolar"
          />
          <InputChip
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...regularMediaProps} />}
            value="Lorem ipsum sit dolar"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
