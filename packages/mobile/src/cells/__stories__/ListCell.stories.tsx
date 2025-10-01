import React from 'react';
import type { CellPriority } from '@coinbase/cds-common';
import { assets, squareAssets } from '@coinbase/cds-common/internal/data/assets';
import { selectCellSpacingConfig } from '@coinbase/cds-common/tokens/select';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons/Icon';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography/Text';
import { CellHelperText } from '../CellHelperText';
import { ListCell } from '../ListCell';

const onPressConsole = () => console.log('onPress');
const cellPriorities: CellPriority[] = ['middle', 'end'];
const titlePadding = { paddingX: gutter } as const;

const Content = () => {
  return (
    <>
      <ListCell layoutSpacing="hug" title="Title" />
      <ListCell detail="Detail" layoutSpacing="hug" title="Title" />
      <ListCell description="Description" layoutSpacing="hug" title="Title" />
      <ListCell description="Description" detail="Detail" layoutSpacing="hug" title="Title" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        subdetail="Neutral"
        title="Title"
      />
      <ListCell detail="Detail" layoutSpacing="hug" subdetail="Neutral" title="Title" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />
      <ListCell layoutSpacing="hug" subdetail="+Positive" title="Title" variant="positive" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />
      <ListCell
        detail="Detail"
        layoutSpacing="hug"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />
      <ListCell
        detail="Detail"
        layoutSpacing="hug"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );
};

const CompactContent = () => {
  return (
    <>
      <ListCell layoutSpacing="compact" title="Title" />
      <ListCell detail="Detail" layoutSpacing="compact" title="Title" />
      <ListCell description="Description" layoutSpacing="compact" title="Title" />
      <ListCell description="Description" detail="Detail" layoutSpacing="compact" title="Title" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="compact"
        subdetail="Neutral"
        title="Title"
      />
      <ListCell detail="Detail" layoutSpacing="compact" subdetail="Neutral" title="Title" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="compact"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />
      <ListCell layoutSpacing="compact" subdetail="+Positive" title="Title" variant="positive" />
      <ListCell
        description="Description"
        detail="Detail"
        layoutSpacing="compact"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />
      <ListCell
        detail="Detail"
        layoutSpacing="compact"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />
      <ListCell
        detail="Detail"
        layoutSpacing="compact"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );
};

const PressableContent = () => (
  <>
    <ListCell layoutSpacing="hug" onPress={onPressConsole} title="Title" />
    <ListCell layoutSpacing="hug" onPress={onPressConsole} subdetail="Neutral" title="Title" />
    <ListCell
      description="Multi-line description"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      disableSelectionAccessory
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      disabled
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="+Postive"
      title="Title"
      variant="positive"
    />
    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const CompactPressableContent = () => (
  <>
    <ListCell layoutSpacing="compact" onPress={onPressConsole} title="Title" />
    <ListCell layoutSpacing="compact" onPress={onPressConsole} subdetail="Neutral" title="Title" />
    <ListCell
      multiline
      description="Multi-line description"
      layoutSpacing="compact"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="compact"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      layoutSpacing="compact"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      layoutSpacing="compact"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      disabled
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      subdetail="+Postive"
      title="Title"
      variant="positive"
    />
    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onPress={onPressConsole}
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const LongContent = () => (
  <>
    <ListCell
      detail="Detail also has a very long string"
      subdetail="Neutral also does too"
      title="(Deprecated behavior) Title with a very long length that should be capped at 2 lines when there is no description provided"
    />
    <ListCell
      description="Description"
      detail="Detail also has a very long string"
      subdetail="Neutral also does too"
      title="(Deprecated behavior) Title with a very long length that should be capped at 1 line when there is description provided"
    />
    <ListCell
      detail="Detail also has a very long string"
      layoutSpacing="hug"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
    <ListCell
      disableMultilineTitle
      detail="Detail also has a very long string"
      layoutSpacing="hug"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 1 line when 'disableMultilineTitle' is turned on"
    />
    <ListCell
      description="Description also has a very long length that will be capped at 1 line, unless 'multiline' is turned on and the description can go as many lines as needed."
      detail="Detail also has a very long string"
      layoutSpacing="hug"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
    <ListCell
      multiline
      selected
      description="Description also has a very long length that will be capped at 1 line, unless 'multiline' is turned on and the description can go as many lines as needed."
      detail="Detail also has a very long string"
      layoutSpacing="hug"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
  </>
);

const PriorityContent = () => (
  <>
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      priority="start"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      priority="middle"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      priority="end"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      priority={cellPriorities}
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      priority={cellPriorities}
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="warning"
    />
  </>
);

const WithAccessory = () => (
  <>
    <ListCell accessory="arrow" layoutSpacing="hug" title="Title" />
    <ListCell accessory="more" detail="Detail" layoutSpacing="hug" title="Title" />
    <ListCell accessory="selected" description="Description" layoutSpacing="hug" title="Title" />
    <ListCell
      accessory="arrow"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      selected
      accessory="arrow"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      disableSelectionAccessory
      selected
      accessory="arrow"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      accessory="more"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      subdetail="Neutral"
      title="Title"
    />
    <ListCell
      accessory="selected"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      subdetail="+Positive"
      title="Title"
      variant="positive"
    />
    <ListCell
      accessory="arrow"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      subdetail="-Negative"
      title="Title"
      variant="negative"
    />
    <ListCell
      accessory="arrow"
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const WithMedia = () => (
  <>
    <ListCell layoutSpacing="hug" media={<Icon active name="email" />} title="Icon" />
    <ListCell
      layoutSpacing="hug"
      media={<Icon active name="email" />}
      onPress={onPressConsole}
      title="Icon (pressable)"
    />
    <ListCell
      description="Description"
      layoutSpacing="hug"
      media={<Icon name="phone" />}
      title="Icon"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      title="Avatar"
    />
    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      subdetail="Neutral"
      title="Asset"
    />
    <ListCell
      detail="Detail"
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      title="Image"
    />
    <ListCell
      description="Description"
      layoutSpacing="hug"
      media={<Pictogram name="shield" />}
      title="Pictogram"
    />
  </>
);

const WithActions = () => (
  <>
    <ListCell action={<Button>Action</Button>} detail="Detail" layoutSpacing="hug" title="Title" />
    <ListCell
      action={
        <Button compact variant="negative">
          Action
        </Button>
      }
      description="Description"
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      action={<IconButton accessibilityLabel="External link" name="externalLink" />}
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
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
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$44,130"
      detailWidth={100}
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$942,103"
      detailWidth={100}
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$530"
      detailWidth={100}
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$123K"
      detailWidth={100}
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      title="Title"
    />
  </>
);

const WithHelperText = () => (
  <>
    <ListCell
      helperText={<CellHelperText>Helper text</CellHelperText>}
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      helperText={<CellHelperText>Helper text</CellHelperText>}
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      helperText={<CellHelperText variant="warning">Warning text</CellHelperText>}
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="Detail"
      helperText={<CellHelperText variant="error">Error text</CellHelperText>}
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Subdetail"
      title="Title"
    />
    <ListCell
      disabled
      description="Description"
      detail="Detail"
      helperText={<CellHelperText variant="error">Disabled error text</CellHelperText>}
      layoutSpacing="hug"
      onPress={onPressConsole}
      subdetail="Subdetail"
      title="Title"
    />
    <ListCell
      description="Description"
      helperText={<CellHelperText paddingStart={6}>Helper text with media</CellHelperText>}
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      onPress={onPressConsole}
      title="Title"
    />
    <ListCell
      action={<Button compact>Action</Button>}
      description="Description"
      helperText={<CellHelperText variant="warning">Helper text with action</CellHelperText>}
      layoutSpacing="hug"
      title="Title"
    />
    <ListCell
      accessory="more"
      action={<Button compact>Action</Button>}
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      helperText={
        <CellHelperText paddingStart={6} variant="error">
          Helper text with media, action, and accessory and very long text
        </CellHelperText>
      }
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      priority="end"
      title="Title"
    />
  </>
);

const CustomSpacing = () => (
  <>
    <ListCell
      selected
      borderRadius={0}
      description="Description"
      detail="$1,230"
      detailWidth={100}
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
      {...selectCellSpacingConfig}
    />
    <ListCell
      borderRadius={0}
      description="Description"
      detail="$1,230"
      detailWidth={100}
      layoutSpacing="hug"
      onPress={onPressConsole}
      title="Title"
      {...selectCellSpacingConfig}
    />
  </>
);

const HugListCell = () => {
  const theme = useTheme();
  return (
    <VStack width="360px">
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        helperText={
          <CellHelperText font="label2" variant="information">
            This is helpful information to guide the user
          </CellHelperText>
        }
        layoutSpacing="hug"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        layoutSpacing="hug"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        layoutSpacing="hug"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onPress={onPressConsole}
        styles={{
          media: {
            marginTop: theme.space[1],
            alignSelf: 'flex-start',
          },
        }}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Icon name="heart" size="l" />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Icon name="heart" size="s" />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        action={<Button compact>Action</Button>}
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Icon name="heart" size="xs" />}
        onPress={onPressConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        intermediary={<Avatar shape="square" size="l" src={squareAssets.human6} />}
        layoutSpacing="hug"
        media={<Avatar shape="square" size="l" src={squareAssets.human1} />}
        onPress={onPressConsole}
        subdetail={
          <Tag colorScheme="green">
            <HStack alignItems="center" gap={0.5}>
              <Icon color="fgPositive" name="diagonalUpArrow" size="xs" />
              <Text>1.64%</Text>
            </HStack>
          </Tag>
        }
        title="Title"
      />
    </VStack>
  );
};

const LayoutSpacing = () => (
  <VStack>
    {/* Preferred (new design) */}
    <ListCell
      accessory="arrow"
      description="New design (hug)"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      onPress={onPressConsole}
      subdetail="+1.23%"
      title="Hug"
      variant="positive"
    />

    {/* Deprecated options kept for backward compatibility */}
    <ListCell
      accessory="arrow"
      description="Deprecated (use hug)"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="compact"
      media={<Avatar src={assets.eth.imageUrl} />}
      onPress={onPressConsole}
      subdetail="+1.23%"
      title="Compact"
      variant="positive"
    />
    <ListCell
      accessory="arrow"
      description="Deprecated (use hug)"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="spacious"
      media={<Avatar src={assets.eth.imageUrl} />}
      onPress={onPressConsole}
      subdetail="+1.23%"
      title="Spacious"
      variant="positive"
    />
  </VStack>
);

const ListCellScreen = () => {
  return (
    <ExampleScreen>
      <Example inline paddingX={0} title="Content" titlePadding={titlePadding}>
        <Content />
      </Example>
      <Example inline paddingX={0} title="CompactContent(deprecated)" titlePadding={titlePadding}>
        <CompactContent />
      </Example>
      <Example inline paddingX={0} title="PressableContent" titlePadding={titlePadding}>
        <PressableContent />
      </Example>
      <Example
        inline
        paddingX={0}
        title="CompactPressableContent(deprecated)"
        titlePadding={titlePadding}
      >
        <CompactPressableContent />
      </Example>
      <Example inline paddingX={0} title="LongContent" titlePadding={titlePadding}>
        <LongContent />
      </Example>
      <Example inline paddingX={0} title="PriorityContent" titlePadding={titlePadding}>
        <PriorityContent />
      </Example>
      <Example inline paddingX={0} title="WithAccessory" titlePadding={titlePadding}>
        <WithAccessory />
      </Example>
      <Example inline paddingX={0} title="WithMedia" titlePadding={titlePadding}>
        <WithMedia />
      </Example>
      <Example inline paddingX={0} title="WithActions" titlePadding={titlePadding}>
        <WithActions />
      </Example>
      <Example inline paddingX={0} title="WithIntermediary" titlePadding={titlePadding}>
        <WithIntermediary />
      </Example>
      <Example inline paddingX={0} title="WithHelperText" titlePadding={titlePadding}>
        <WithHelperText />
      </Example>
      <Example inline paddingX={0} title="CustomSpacing" titlePadding={titlePadding}>
        <CustomSpacing />
      </Example>
      <Example inline paddingX={0} title="HugListCell" titlePadding={titlePadding}>
        <HugListCell />
      </Example>
      <Example inline paddingX={0} title="LayoutSpacing" titlePadding={titlePadding}>
        <LayoutSpacing />
      </Example>
    </ExampleScreen>
  );
};

export default ListCellScreen;
