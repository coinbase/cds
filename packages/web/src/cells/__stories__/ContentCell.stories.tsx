import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import type { CellSpacing } from '../../cells/Cell';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

export default {
  title: 'Components/Cells/ContentCell',
  component: ContentCell,
};

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

const onClickConsole = () => console.log('clicked');

export const Content = () => (
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

export const LongContent = () => (
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

export const PressableContent = () => (
  <>
    <ContentCell href="#" onClick={onClickConsole} title="Title" />
    <ContentCell onClick={onClickConsole} subtitle="Subtitle" title="Title" />
    <ContentCell
      description="Description"
      href="#"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onClick={onClickConsole}
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell description="Description" onClick={onClickConsole} subtitle="Subtitle" />
    <ContentCell
      selected
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onClick={onClickConsole}
      title="Title"
    />
    <ContentCell
      disabled
      description="Description"
      onClick={onClickConsole}
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell disabled selected onClick={onClickConsole} subtitle="Subtitle" title="Title" />
  </>
);

export const WithAccessory = () => (
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

export const WithMedia = () => (
  <>
    <ContentCell media={<CellMedia active name="email" type="icon" />} title="Icon" />
    <ContentCell
      media={<CellMedia active name="email" type="icon" />}
      onClick={onClickConsole}
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
      media={<CellMedia illustration={<Box background="bgAlternate" />} type="pictogram" />}
      title="Pictogram"
    />
  </>
);

export const SpacingVariant = () => (
  <VStack gap={2}>
    <ContentCell
      description="Description"
      meta="Meta"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Condensed spacing"
    />
    <ContentCell
      description="Description"
      meta="Meta"
      onClick={onClickConsole}
      spacingVariant="compact"
      subtitle="Subtitle"
      title="Compact spacing"
    />
    <ContentCell
      description="Description"
      meta="Meta"
      onClick={onClickConsole}
      spacingVariant="normal"
      subtitle="Subtitle"
      title="Normal spacing"
    />
  </VStack>
);

export const CondensedContentCell = () => (
  <VStack gap={3} width="360px">
    <ContentCell
      accessory="more"
      description="Concise summary of an item in condensed spacing."
      meta="Updated 2m ago"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Default layout"
    />
    <ContentCell
      description="Opens an external experience"
      href="#"
      meta="External link"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Tap to learn more"
      title="Pressable condensed"
    />
    <ContentCell
      description="Avatar media paired with condensed spacing."
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      meta="ETH"
      spacingVariant="condensed"
      subtitle="Asset overview"
      title="Condensed with media"
    />
    <ContentCell
      descriptionNode={
        <div>
          <strong>Composable description node</strong>
          <div>Use this slot to render arbitrary React content.</div>
        </div>
      }
      metaNode={
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--color-fgPositive)' }}>+4.25%</div>
          <div style={{ color: 'var(--color-fgMuted)' }}>Week over week</div>
        </div>
      }
      spacingVariant="condensed"
      subtitleNode={
        <div>
          Subtitle with <em>inline emphasis</em>
        </div>
      }
      titleNode={
        <div>
          <strong>Custom nodes</strong> with badges
        </div>
      }
    />
    <ContentCell
      accessory="arrow"
      description="Applies custom styles to highlight the container."
      media={<CellMedia name="chartLine" type="icon" />}
      spacingVariant="condensed"
      styles={{
        contentContainer: {
          border: '1px solid var(--color-borderStrong)',
          paddingBlock: 'var(--space-2)',
        },
        media: {
          alignSelf: 'flex-start',
        },
      }}
      subtitle="Uses styles prop overrides"
      title="Styled condensed cell"
    />
    <ContentCell
      accessory="arrow"
      description="Shows how to combine meta and accessory in condensed layout."
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Accessory example"
    />
    <ContentCell
      selected
      description="Selected state with condensed spacing and avatar media."
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      meta="Selected"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Selected condensed"
    />
  </VStack>
);
