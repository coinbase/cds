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

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const ChipExamples = ({
  label,
  flexDirection = 'column',
  ...props
}: { label?: string; flexDirection?: 'row' | 'column' } & Omit<ChipBaseProps, 'children'>) => {
  const ref = useRef<View>(null);
  return (
    <Box flexDirection={flexDirection} flexGrow={1} flexWrap="wrap" gap={1}>
      <Chip ref={ref} {...props}>
        {label ?? <Text font="headline">Base</Text>}
      </Chip>
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
      <Chip
        {...props}
        end={<Icon color="fg" name="caretDown" size="s" />}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? <Text font="headline">Looooooooooooooong Label</Text>}
      </Chip>
      <Chip {...props} end={<Icon color="fg" name="filter" size="s" />}>
        <Text font="headline">Filter 2</Text>
      </Chip>
      <Chip
        {...props}
        end={<Icon color="fg" name="caretDown" size="s" />}
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? <Text font="headline">Pressable</Text>}
      </Chip>
      <Chip
        {...props}
        disabled
        end={<Icon color="fg" name="caretDown" size="s" />}
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? <Text font="headline">Disabled</Text>}
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
