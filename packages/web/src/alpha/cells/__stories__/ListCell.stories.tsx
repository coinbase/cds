import React from 'react';
import { assets, squareAssets } from '@coinbase/cds-common/internal/data/assets';
import type { CellPriority } from '@coinbase/cds-common/types/CellBaseProps';

import { Button, IconButton } from '../../../buttons';
import type { CellSpacing } from '../../../cells/Cell';
import { CellHelperText } from '../../../cells/CellHelperText';
import { CellMedia } from '../../../cells/CellMedia';
import { Checkbox } from '../../../controls/Checkbox';
import { Icon } from '../../../icons';
import { Pictogram } from '../../../illustrations/Pictogram';
import { HStack, VStack } from '../../../layout';
import { RemoteImage } from '../../../media';
import { Tag } from '../../../tag/Tag';
import { ListCell } from '../ListCell';

const parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export default {
  title: 'Components/alpha/Cells/ListCell',
  component: ListCell,
  parameters: {
    ...parameters,
  },
};

const onClickConsole = () => console.log('onClick');

export const withA11yVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" description="Description" title="Title" />
      <ListCell as="li" description="Description" title="Title" />
    </VStack>
  );
};

const Content = () => {
  return (
    <>
      <ListCell title="Title" />

      <ListCell detail="Detail" title="Title" />

      <ListCell description="Description" title="Title" />

      <ListCell description="Description" detail="Detail" title="Title" />

      <ListCell description="Description" detail="Detail" subdetail="Neutral" title="Title" />

      <ListCell detail="Detail" subdetail="Neutral" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell subdetail="+Positive" title="Title" variant="positive" />

      <ListCell
        description="Description"
        detail="Detail"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell detail="Detail" subdetail="-Negative" title="Title" variant="negative" />

      <ListCell detail="Detail" subdetail="Warning" title="Title" variant="warning" />
    </>
  );
};

const CompactContent = () => {
  return (
    <>
      <ListCell title="Title" />

      <ListCell detail="Detail" title="Title" />

      <ListCell description="Description" title="Title" />

      <ListCell description="Description" detail="Detail" title="Title" />

      <ListCell description="Description" detail="Detail" subdetail="Neutral" title="Title" />

      <ListCell detail="Detail" subdetail="Neutral" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell subdetail="+Positive" title="Title" variant="positive" />

      <ListCell
        description="Description"
        detail="Detail"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell detail="Detail" subdetail="-Negative" title="Title" variant="negative" />

      <ListCell detail="Detail" subdetail="Warning" title="Title" variant="warning" />
    </>
  );
};

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

const PressableContent = () => (
  <>
    <ListCell onClick={onClickConsole} title="Title" />

    <ListCell onClick={onClickConsole} subdetail="Neutral" title="Title" />

    <ListCell description="Multi-line description" onClick={onClickConsole} title="Title" />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      disableSelectionAccessory
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell description="Description" detail="Detail" onClick={onClickConsole} title="Title" />

    <ListCell
      description="Description"
      detail="Detail"
      innerSpacing={innerSpacingConfig}
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      innerSpacing={innerSpacingConfig}
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="+Postive"
      title="Title"
      variant="positive"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const CompactPressableContent = () => (
  <>
    <ListCell onClick={onClickConsole} title="Title" />

    <ListCell onClick={onClickConsole} subdetail="Neutral" title="Title" />

    <ListCell
      multiline
      description="Multi-line description"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell description="Description" detail="Detail" onClick={onClickConsole} title="Title" />

    <ListCell
      description="Description"
      detail="Detail"
      innerSpacing={innerSpacingConfig}
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      innerSpacing={innerSpacingConfig}
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="+Postive"
      title="Title"
      variant="positive"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const LongContent = () => (
  <>
    <ListCell
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      detail="Detail also has a very long string"
      subdetail="Neutral also does too"
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
    />
    <ListCell
      multiline
      selected
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      detail="Detail also has a very long string"
      subdetail="Neutral also does too"
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
    />
  </>
);

const cellPriorities: CellPriority[] = ['middle', 'end'];

const PriorityContent = () => (
  <>
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<CellMedia name="chartLine" type="icon" />}
      priority="start"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<CellMedia name="chartLine" type="icon" />}
      priority="middle"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<CellMedia name="chartLine" type="icon" />}
      priority="end"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<CellMedia name="chartLine" type="icon" />}
      priority={cellPriorities}
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<CellMedia name="chartLine" type="icon" />}
      priority={cellPriorities}
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="warning"
    />
  </>
);

const WithAccessory = () => (
  <>
    <ListCell accessory="arrow" title="Title" />

    <ListCell accessory="more" detail="Detail" title="Title" />

    <ListCell accessory="selected" description="Description" title="Title" />

    <ListCell accessory="arrow" description="Description" detail="Detail" title="Title" />

    <ListCell selected accessory="arrow" description="Description" detail="Detail" title="Title" />

    <ListCell
      disableSelectionAccessory
      selected
      accessory="arrow"
      description="Description"
      detail="Detail"
      title="Title"
    />

    <ListCell
      accessory="more"
      description="Description"
      detail="Detail"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      accessory="selected"
      description="Description"
      detail="Detail"
      subdetail="+Positive"
      title="Title"
      variant="positive"
    />

    <ListCell
      accessory="arrow"
      description="Description"
      detail="Detail"
      subdetail="-Negative"
      title="Title"
      variant="negative"
    />

    <ListCell
      accessory="arrow"
      description="Description"
      detail="Detail"
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const WithMedia = () => (
  <>
    <ListCell media={<CellMedia active name="email" type="icon" />} title="Icon" />

    <ListCell
      media={<CellMedia active name="email" type="icon" />}
      onClick={onClickConsole}
      title="Icon (pressable)"
    />

    <ListCell
      description="Description"
      media={<CellMedia name="phone" type="icon" />}
      title="Icon"
    />

    <ListCell
      description="Description"
      detail="Detail"
      media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
      title="Avatar"
    />

    <ListCell
      description="Description"
      detail="Detail"
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      subdetail="Neutral"
      title="Asset"
    />

    <ListCell
      detail="Detail"
      media={<CellMedia source={assets.eth.imageUrl} type="image" />}
      title="Image"
    />

    <ListCell
      description="Description"
      media={<CellMedia illustration={<Pictogram name="shield" />} type="pictogram" />}
      title="Pictogram"
    />
  </>
);

const WithActions = () => (
  <>
    <ListCell action={<Checkbox checked accessibilityLabel="Checkbox" />} title="Title" />
    <ListCell action={<Button>Action</Button>} detail="Detail" title="Title" />

    <ListCell
      action={
        <Button compact variant="negative">
          Action
        </Button>
      }
      description="Description"
      title="Title"
    />

    <ListCell
      action={<IconButton accessibilityLabel="External link" name="externalLink" />}
      description="Description"
      detail="Detail"
      title="Title"
    />
  </>
);

const WithIntermediary = () => (
  <>
    <ListCell
      description="Description"
      detail="$1,230"
      detailWidth={100}
      intermediary={<CellMedia name="chartLine" type="icon" />}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$44,130"
      detailWidth={100}
      intermediary={<CellMedia name="chartLine" type="icon" />}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$942,103"
      detailWidth={100}
      intermediary={<CellMedia name="chartLine" type="icon" />}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$530"
      detailWidth={100}
      intermediary={<CellMedia name="chartLine" type="icon" />}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$123K"
      detailWidth={100}
      intermediary={<CellMedia name="chartLine" type="icon" />}
      title="Title"
    />
  </>
);

const WithHelperText = () => (
  <VStack gap={4}>
    <ListCell
      description="This cell provides additional context below."
      detail="Info"
      helperText={
        <CellHelperText variant="information">
          This is helpful information to guide the user
        </CellHelperText>
      }
      subdetail="FYI"
      title="Information Helper Text"
    />

    <ListCell
      multiline
      accessory="more"
      action={<Button compact>Action</Button>}
      description="Action required"
      helperText={
        <CellHelperText paddingStart={6} variant="warning">
          Please review this information carefully before proceeding
        </CellHelperText>
      }
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      title="With Media and Helper Text"
    />

    <ListCell
      multiline
      accessory="more"
      action={<Button compact>Action</Button>}
      description="Perform an action based on this information"
      helperText={
        <CellHelperText paddingStart={6} variant="error">
          This field contains an error that needs to be corrected
        </CellHelperText>
      }
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      title="With Detail and Helper Text"
      variant="negative"
    />
    <ListCell
      multiline
      accessory="more"
      action={<Button compact>Action</Button>}
      description="Perform an action based on this information."
      helperText={
        <CellHelperText paddingStart={6} variant="information">
          This action cannot be undone.
        </CellHelperText>
      }
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      title="With Media and Action"
    />
  </VStack>
);

const AlphaListCellTest = () => {
  return (
    <VStack width="320px">
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        helperText={
          <CellHelperText variant="information">
            This is helpful information to guide the user
          </CellHelperText>
        }
        media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        alignItems="flex-start"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
        onClick={onClickConsole}
        styles={{
          accessory: {
            marginTop: 'var(--space-1)',
          },
          media: {
            marginTop: 'var(--space-1)',
          },
        }}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Icon name="heart" size="l" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Icon name="heart" size="s" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Icon name="heart" size="xs" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<RemoteImage shape="squircle" size="l" source={squareAssets.human1} />}
        onClick={onClickConsole}
        subdetail={
          <Tag colorScheme="green">
            <HStack alignItems="center" gap={0.5}>
              <Icon color="fgPositive" name="diagonalUpArrow" size="xs" />
              1.64%
            </HStack>
          </Tag>
        }
        title="Title"
      />
    </VStack>
  );
};

export {
  AlphaListCellTest,
  CompactContent,
  CompactPressableContent,
  Content,
  LongContent,
  PressableContent,
  PriorityContent,
  WithAccessory,
  WithActions,
  WithHelperText,
  WithIntermediary,
  WithMedia,
};
