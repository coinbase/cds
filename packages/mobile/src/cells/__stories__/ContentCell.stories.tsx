import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { Box } from '../../layout/Box';
import type { CellSpacing } from '../Cell';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

const onPressConsole = () => console.log('pressed');

const Content = () => (
  <>
    <ContentCell meta="Meta" title="Title" />
    <ContentCell subtitle="Subtitle" title="Title" />
    <ContentCell description="Description" meta="Meta" title="Title" />
    <ContentCell description="Description" subtitle="Subtitle" title="Title" />
    <ContentCell meta="Meta" subtitle="Subtitle" />
    <ContentCell description="Description" subtitle="Subtitle" />
    <ContentCell description="Description" />
  </>
);

const PressableContent = () => (
  <>
    <ContentCell onPress={onPressConsole} title="Title" />
    <ContentCell onPress={onPressConsole} subtitle="Subtitle" title="Title" />
    <ContentCell
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onPress={onPressConsole}
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell description="Description" onPress={onPressConsole} subtitle="Subtitle" />
    <ContentCell
      selected
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onPress={onPressConsole}
      title="Title"
    />
    <ContentCell
      disabled
      description="Description"
      onPress={onPressConsole}
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell disabled selected onPress={onPressConsole} subtitle="Subtitle" title="Title" />
  </>
);

const LongContent = () => (
  <>
    <ContentCell
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
    />
    <ContentCell
      accessory="more"
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      subtitle="Subtitle is short lol"
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
    />
    <ContentCell
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      meta="Long meta title"
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
    />
  </>
);

const WithAccessory = () => (
  <>
    <ContentCell accessory="arrow" meta="Meta" title="Title" />
    <ContentCell accessory="more" subtitle="Subtitle" title="Title" />
    <ContentCell accessory="selected" description="Description" title="Title" />
    <ContentCell
      accessory="arrow"
      description="Description"
      meta="Meta"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell accessory="more" description="Description" meta="Meta" subtitle="Subtitle" />
    <ContentCell accessory="selected" description="Description" title="Title" />
    <ContentCell accessory="arrow" description="Description" />
  </>
);

const WithMedia = () => (
  <>
    <ContentCell media={<CellMedia active name="email" type="icon" />} title="Icon" />
    <ContentCell
      media={<CellMedia active name="email" type="icon" />}
      onPress={onPressConsole}
      title="Icon (pressable)"
    />
    <ContentCell
      description="Description"
      media={<CellMedia name="phone" type="icon" />}
      title="Icon"
    />
    <ContentCell
      description="Description"
      media={<CellMedia color="fgPrimary" name="phone" type="icon" />}
      title="Icon (With Primary Color)"
    />
    <ContentCell
      description="Description"
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      subtitle="Subtitle"
      title="Avatar"
    />
    <ContentCell
      description="Description"
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      meta="Meta"
      subtitle="Subtitle"
      title="Asset"
    />
    <ContentCell
      media={<CellMedia source={assets.eth.imageUrl} type="image" />}
      meta="Meta"
      subtitle="Subtitle"
      title="Image"
    />
    <ContentCell
      description="Description"
      media={<CellMedia illustration={<Pictogram name="shield" />} type="pictogram" />}
      title="Pictogram"
    />
  </>
);

const ContentCellScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Content only">
        <Content />
      </Example>
      <Example title="Pressable content">
        <PressableContent />
      </Example>
      <Example title="Long content">
        <LongContent />
      </Example>
      <Example title="With accessory">
        <WithAccessory />
      </Example>
      <Example title="With media">
        <WithMedia />
      </Example>
      <Example paddingX={3} title="Example screen">
        <Box marginX={-3}>
          <PressableContent />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellScreen;
