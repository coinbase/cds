import React, { useRef } from 'react';
import type { View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Box } from '../../layout';
import type { RemoteImageProps } from '../../media';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import { Chip } from '../Chip';
import type { ChipBaseProps } from '../ChipProps';

const ChipExamples = ({
  label,
  flexDirection = 'column',
  ...props
}: { label?: string; flexDirection?: 'row' | 'column' } & Omit<ChipBaseProps, 'children'>) => {
  const ref = useRef<View>(null);
  const mediaSize = props.compact ? 16 : 24;
  const textFont = props.compact ? 'label1' : 'headline';
  const assetIconProps: RemoteImageProps = {
    height: mediaSize,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: mediaSize,
  };

  return (
    <Box flexDirection={flexDirection} flexGrow={1} flexWrap="wrap" gap={1}>
      <Chip ref={ref} {...props}>
        {label ?? 'Label only'}
      </Chip>
      <Chip {...props} start={<RemoteImage {...assetIconProps} />} />
      <Chip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      />
      <Chip {...props} start={<RemoteImage {...assetIconProps} />}>
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
        {label ?? <Text font={textFont}>Looooooooooooooong Label</Text>}
      </Chip>
      <Chip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Pressable'}
      </Chip>
      <Chip
        {...props}
        disabled
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Disabled'}
      </Chip>
    </Box>
  );
};

const ChipScreen = () => (
  <ExampleScreen>
    <Example title="Default">
      <ChipExamples />
    </Example>
    <Example title="Inverted">
      <ChipExamples inverted />
    </Example>
    <Example title="Compact">
      <ChipExamples compact />
    </Example>
    <Example title="Long text">
      <ChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget" />
    </Example>
    <Example title="Row Layout">
      <ChipExamples flexDirection="row" />
    </Example>
  </ExampleScreen>
);

export default ChipScreen;
