import { useRef } from 'react';
import type { View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Box } from '../../layout';
import type { RemoteImageProps } from '../../media';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import type { ChipBaseProps } from '../ChipProps';
import { MediaChip } from '../MediaChip';

const MediaChipExamples = ({
  label,
  flexDirection = 'column',
  ...props
}: { label?: string; flexDirection?: 'row' | 'column' } & Omit<ChipBaseProps, 'children'>) => {
  const ref = useRef<View>(null);
  const mediaSize = props.compact ? 16 : 24;
  const assetIconProps: RemoteImageProps = {
    height: mediaSize,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: mediaSize,
  };

  return (
    <Box flexDirection={flexDirection} flexGrow={1} flexWrap="wrap" gap={1}>
      <MediaChip ref={ref} {...props}>
        {label ?? 'Label only'}
      </MediaChip>
      <MediaChip {...props} start={<RemoteImage {...assetIconProps} />} />
      <MediaChip
        {...props}
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage {...assetIconProps} />}
      />
      <MediaChip {...props} start={<RemoteImage {...assetIconProps} />}>
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
        end={<Icon active color="fg" name="caretDown" size="xs" />}
        onPress={NoopFn}
        start={<RemoteImage {...assetIconProps} />}
      >
        {label ?? 'Pressable'}
      </MediaChip>
    </Box>
  );
};

const MediaChipScreen = () => (
  <ExampleScreen>
    <Example title="Default (Automatic Spacing)">
      <MediaChipExamples />
    </Example>
    <Example title="Inverted">
      <MediaChipExamples inverted />
    </Example>
    <Example title="Compact">
      <MediaChipExamples compact />
    </Example>
    <Example title="Long text">
      <MediaChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
    </Example>
    <Example title="Row Layout">
      <MediaChipExamples flexDirection="row" />
    </Example>
  </ExampleScreen>
);

export default MediaChipScreen;
