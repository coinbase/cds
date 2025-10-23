import { useRef } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { Icon } from '../../icons/Icon';
import { Box, VStack } from '../../layout';
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
  direction = 'row',
  ...props
}: { label?: string; direction?: 'row' | 'column' } & Pick<
  ChipBaseProps,
  'inverted' | 'compact'
>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Box flexDirection={direction} gap={2}>
      <Chip {...props}>{label ?? <Text font="headline">Base</Text>}</Chip>
      <Chip ref={divRef} {...props} start={<RemoteImage {...assetIconProps} />}>
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
        ref={buttonRef}
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
    </Box>
  );
};

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
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Column Layout
    </Text>
    <ChipExamples direction="column" />
  </VStack>
);
