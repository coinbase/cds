import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import type { CellSpacing } from '../../cells/Cell';
import { Switch } from '../../controls/Switch';
import { Icon } from '../../icons/Icon';
import { Pictogram } from '../../illustrations/Pictogram';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { RemoteImage } from '../../media/RemoteImage';
import { ContentCell } from '../ContentCell';
import { ContentCellFallback } from '../ContentCellFallback';

export default {
  title: 'Components/Cells/ContentCell',
  component: ContentCell,
};

const innerSpacingConfig: CellSpacing = { paddingX: 1, marginX: 0 };

const onClickConsole = () => console.log('clicked');

export const Content = () => (
  <>
    <ContentCell meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell spacingVariant="condensed" subtitle="Subtitle" title="Title" />
    <ContentCell description="Description" meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell
      description="Description"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell meta="Meta" spacingVariant="condensed" subtitle="Subtitle" />
    <ContentCell description="Description" spacingVariant="condensed" subtitle="Subtitle" />
    <ContentCell description="Description" spacingVariant="condensed" />
  </>
);

export const LongContent = () => (
  <>
    <ContentCell
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      spacingVariant="condensed"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
    <ContentCell
      accessory="more"
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      subtitle="Subtitle is short lol"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
    <ContentCell
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      meta="Long meta title"
      spacingVariant="condensed"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
  </>
);

export const PressableContent = () => (
  <>
    <ContentCell href="#" onClick={onClickConsole} spacingVariant="condensed" title="Title" />
    <ContentCell
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      description="Description"
      href="#"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      description="Description"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
    />
    <ContentCell
      selected
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell
      disabled
      description="Description"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      disabled
      selected
      onClick={onClickConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
  </>
);

export const WithAccessory = () => (
  <>
    <ContentCell accessory="arrow" meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell accessory="more" spacingVariant="condensed" subtitle="Subtitle" title="Title" />
    <ContentCell
      accessory="selected"
      description="Description"
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell
      accessory="arrow"
      description="Description"
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      accessory="more"
      description="Description"
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
    />
    <ContentCell
      accessory="selected"
      description="Description"
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell accessory="arrow" description="Description" spacingVariant="condensed" />
  </>
);

export const WithMedia = () => (
  <>
    <ContentCell
      media={<Icon active name="email" size="s" />}
      spacingVariant="condensed"
      title="Icon"
    />
    <ContentCell
      media={<Icon active name="email" size="s" />}
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Icon (pressable)"
    />
    <ContentCell
      description="Description"
      media={<Icon name="phone" size="s" />}
      spacingVariant="condensed"
      title="Icon"
    />
    <ContentCell
      description="Description"
      media={<Icon color="fgPrimary" name="phone" size="s" />}
      spacingVariant="condensed"
      title="Icon (With Primary Color)"
    />
    <ContentCell
      description="Description"
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Avatar"
    />
    <ContentCell
      description="Description"
      media={<RemoteImage alt="ETH asset" shape="circle" size="m" source={assets.eth.imageUrl} />}
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Asset"
    />
    <ContentCell
      media={
        <RemoteImage
          alt="ETH illustration"
          shape="squircle"
          size="m"
          source={assets.eth.imageUrl}
        />
      }
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Image"
    />
    <ContentCell
      description="Description"
      media={
        <Box
          alignItems="center"
          background="bgAlternate"
          borderRadius={400}
          height="48px"
          justifyContent="center"
          width="48px"
        >
          <Pictogram dimension="48x48" name="shield" />
        </Box>
      }
      spacingVariant="condensed"
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
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
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
      media={<Icon name="chartLine" size="s" />}
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
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      meta="Selected"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Selected condensed"
    />
  </VStack>
);

export const Fallback = () => {
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <VStack gap={2} width="360px">
      <Switch
        checked={showFallback}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setShowFallback(event.currentTarget.checked)
        }
      >
        Show fallback state
      </Switch>
      {showFallback ? (
        <ContentCellFallback
          description
          disableRandomRectWidth
          meta
          subtitle
          title
          accessory="more"
          media="asset"
          spacingVariant="condensed"
        />
      ) : (
        <ContentCell
          accessory="more"
          description="Review portfolio performance"
          media={<Avatar size="m" src={assets.eth.imageUrl} />}
          meta="Updated just now"
          spacingVariant="condensed"
          subtitle="ETH"
          title="Ethereum"
        />
      )}
    </VStack>
  );
};
