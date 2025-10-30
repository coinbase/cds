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
          <InputChip onClick={NoopFn}>USD</InputChip>
          <InputChip onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            USD
          </InputChip>
          <InputChip disabled onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            USD
          </InputChip>
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Compact
        </Text>
        <HStack gap={2}>
          <InputChip compact onClick={NoopFn}>
            USD
          </InputChip>
          <InputChip compact onClick={NoopFn} start={<RemoteImage {...compactMediaProps} />}>
            USD
          </InputChip>
          <InputChip
            compact
            disabled
            onClick={NoopFn}
            start={<RemoteImage {...compactMediaProps} />}
          >
            USD
          </InputChip>
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Long text
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn}>Lorem ipsum sit dolar</InputChip>
          <InputChip onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            Lorem ipsum sit dolar
          </InputChip>
          <InputChip disabled onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            Lorem ipsum sit dolar
          </InputChip>
        </HStack>
      </VStack>
    </VStack>
  );
};
