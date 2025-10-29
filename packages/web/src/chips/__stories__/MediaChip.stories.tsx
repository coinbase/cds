import { useRef } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { Icon } from '../../icons/Icon';
import { Box, VStack } from '../../layout';
import { RemoteImage, type RemoteImageProps } from '../../media';
import { Text } from '../../typography/Text';
import type { ChipBaseProps } from '../ChipProps';
import { MediaChip } from '../MediaChip';

export default {
  title: 'Components/Chips/MediaChip',
  component: MediaChip,
};

const MediaChipExamples = ({
  label,
  direction = 'row',
  ...props
}: { label?: string; direction?: 'row' | 'column' } & Pick<
  ChipBaseProps,
  'inverted' | 'compact'
>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mediaSize = props.compact ? 16 : 24;
  const assetIconProps: RemoteImageProps = {
    height: mediaSize,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: mediaSize,
  };

  return (
    <Box flexDirection={direction} flexWrap="wrap" gap={2}>
      <MediaChip {...props}>{label ?? 'Label only'}</MediaChip>
      <MediaChip {...props} start={<RemoteImage {...assetIconProps} />} />
      <MediaChip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      />
      <MediaChip ref={divRef} {...props} start={<RemoteImage {...assetIconProps} />}>
        {label ?? 'Media + Label'}
      </MediaChip>
      <MediaChip {...props} end={<Icon active color="fg" name="filter" size="xs" />}>
        Label + Icon
      </MediaChip>
      <MediaChip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'All three'}
      </MediaChip>
      <MediaChip
        {...props}
        ref={buttonRef}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onClick={() => {}}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Pressable'}
      </MediaChip>
    </Box>
  );
};

export const Default = () => (
  <VStack gap={2}>
    <Text as="h3" display="block" font="headline">
      Default (Automatic Spacing)
    </Text>
    <MediaChipExamples />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Inverted
    </Text>
    <MediaChipExamples inverted />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Compact
    </Text>
    <MediaChipExamples compact />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Long text
    </Text>
    <MediaChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Column Layout
    </Text>
    <MediaChipExamples direction="column" />
  </VStack>
);
