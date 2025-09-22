import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { Icon } from '../../icons/Icon';
import { HStack, VStack } from '../../layout';
import { RemoteImage, type RemoteImageProps } from '../../media';
import { Text } from '../../typography/Text';
import { Chip } from '../Chip';
import type { ChipBaseProps } from '../ChipProps';

export default {
  title: 'Components/Chips/Chip',
  component: Chip,
};

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const ChipExamples = ({
  label,
  ...props
}: { label?: string } & Omit<ChipBaseProps, 'children'>) => (
  <HStack gap={2}>
    <Chip {...props}>{label ?? <Text font="headline">Base</Text>}</Chip>
    <Chip {...props} start={<RemoteImage {...assetIconProps} />}>
      {label ?? <Text font="headline">Start</Text>}
    </Chip>
    <Chip
      {...props}
      end={<Icon color="fg" name="caretDown" size="s" />}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <Text font="headline">End & Start</Text>}
    </Chip>
    <Chip {...props} end={<Icon color="fg" name="filter" size="s" />}>
      Filter 2
    </Chip>
    <Chip
      {...props}
      end={<Icon color="fg" name="caretDown" size="s" />}
      onClick={() => {}}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <Text font="headline">Pressable</Text>}
    </Chip>
    <Chip
      {...props}
      accessibilityLabel="a11y label"
      end={<Icon color="fg" name="caretDown" size="s" />}
      onClick={() => {}}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <Text font="headline">Pressable with a11y label</Text>}
    </Chip>
    <Chip
      {...props}
      disabled
      end={<Icon color="fg" name="caretDown" size="s" />}
      onClick={() => {}}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <Text font="headline">Disabled</Text>}
    </Chip>
  </HStack>
);

export const Default = () => (
  <VStack gap={2}>
    <Text as="h3" display="block" font="headline">
      Default
    </Text>
    <ChipExamples />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Inverted
    </Text>
    <ChipExamples inverted />
    <Text as="h3" display="block" font="headline">
      Compact
    </Text>
    <ChipExamples compact />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Long text
    </Text>
    <ChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget" />
  </VStack>
);
