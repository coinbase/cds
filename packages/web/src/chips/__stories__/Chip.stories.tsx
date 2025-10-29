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
  const mediaSize = props.compact ? 16 : 24;
  const textFont = props.compact ? 'label1' : 'headline';
  const assetIconProps: RemoteImageProps = {
    height: mediaSize,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: mediaSize,
  };

  return (
    <Box flexDirection={direction} flexWrap="wrap" gap={2}>
      <Chip {...props}>{label ?? 'Label only'}</Chip>
      <Chip {...props} start={<RemoteImage {...assetIconProps} />} />
      <Chip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      />
      <Chip ref={divRef} {...props} start={<RemoteImage {...assetIconProps} />}>
        {label ?? 'Media + Label'}
      </Chip>
      <Chip {...props} end={<Icon active color="fg" name="filter" size="xs" />}>
        Label + Icon
      </Chip>
      <Chip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'All three'}
      </Chip>
      <Chip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? (
          <Text font={textFont} overflow="break">
            Looooooooooooooong Label
          </Text>
        )}
      </Chip>
      <Chip
        {...props}
        ref={buttonRef}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onClick={() => {}}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Pressable'}
      </Chip>
      <Chip
        {...props}
        accessibilityLabel="a11y label"
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onClick={() => {}}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Pressable with a11y label'}
      </Chip>
      <Chip
        {...props}
        disabled
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onClick={() => {}}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Disabled'}
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
