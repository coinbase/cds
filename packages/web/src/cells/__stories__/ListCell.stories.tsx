import React, { useState } from 'react';
import { assets, squareAssets } from '@coinbase/cds-common/internal/data/assets';
import type { CellPriority } from '@coinbase/cds-common/types/CellBaseProps';

import { Button, IconButton } from '../../buttons';
import { Switch } from '../../controls/Switch';
import { Icon } from '../../icons/Icon';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { RollingNumber } from '../../numbers/RollingNumber';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography/Text';
import { CellHelperText } from '../CellHelperText';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';
import { ListCellFallback } from '../ListCellFallback';

const parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export default {
  title: 'Components/Cells/ListCell',
  component: ListCell,
  parameters: {
    ...parameters,
  },
};

const onClickConsole = () => console.log('onClick');

export const withA11yVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" description="Description" spacingVariant="condensed" title="Title" />
      <ListCell as="li" description="Description" spacingVariant="condensed" title="Title" />
    </VStack>
  );
};

const Content = () => {
  return (
    <>
      <ListCell spacingVariant="condensed" title="Title" />

      <ListCell detail="Detail" spacingVariant="condensed" title="Title" />

      <ListCell description="Description" spacingVariant="condensed" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        title="Title"
      />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="Neutral"
        title="Title"
      />

      <ListCell detail="Detail" spacingVariant="condensed" subdetail="Neutral" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell spacingVariant="condensed" subdetail="+Positive" title="Title" variant="positive" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        detail="Detail"
        spacingVariant="condensed"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        detail="Detail"
        spacingVariant="condensed"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );
};

const CustomNodes = () => {
  return (
    <>
      {/* Node title/description */}
      <ListCell
        descriptionNode={
          <HStack alignItems="center" gap={1}>
            <span>Composed description with any React nodes</span>
            <Icon name="info" />
          </HStack>
        }
        media={<Avatar src={assets.eth.imageUrl} />}
        spacingVariant="condensed"
        titleNode={
          <HStack alignItems="center" gap={1}>
            <Icon name="checkmark" />
            <span>Verified account</span>
          </HStack>
        }
      />

      {/* Node detail/subdetail and accessoryNode */}
      <ListCell
        accessoryNode={
          <IconButton accessibilityLabel="Help" name="info" onClick={() => alert('Accessory')} />
        }
        description="Using detailNode/subdetailNode and accessoryNode"
        detailNode={
          <HStack alignItems="center" gap={1} justifyContent="flex-end">
            <Icon name="info" />
            <Text font="body">$12,345.00</Text>
          </HStack>
        }
        media={<Avatar src={assets.eth.imageUrl} />}
        spacingVariant="condensed"
        subdetailNode={
          <HStack alignItems="center" gap={0.5} justifyContent="flex-end">
            <Icon name="info" />
            <Text color="fgPositive" font="label2">
              +5.43%
            </Text>
          </HStack>
        }
        title="Custom nodes"
      />
    </>
  );
};

const CompactContentDeprecated = () => {
  return (
    <>
      <ListCell spacingVariant="compact" title="Title" />

      <ListCell detail="Detail" spacingVariant="compact" title="Title" />

      <ListCell description="Description" spacingVariant="compact" title="Title" />

      <ListCell description="Description" detail="Detail" spacingVariant="compact" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="compact"
        subdetail="Neutral"
        title="Title"
      />

      <ListCell detail="Detail" spacingVariant="compact" subdetail="Neutral" title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="compact"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell spacingVariant="compact" subdetail="+Positive" title="Title" variant="positive" />

      <ListCell
        description="Description"
        detail="Detail"
        spacingVariant="compact"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        detail="Detail"
        spacingVariant="compact"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        detail="Detail"
        spacingVariant="compact"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );
};

const PressableContent = () => (
  <>
    <ListCell onClick={onClickConsole} spacingVariant="condensed" title="Title" />

    <ListCell
      onClick={onClickConsole}
      spacingVariant="condensed"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      description="Multi-line description"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      disableSelectionAccessory
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="condensed"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="condensed"
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
      spacingVariant="condensed"
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const CompactPressableContentDeprecated = () => (
  <>
    <ListCell onClick={onClickConsole} spacingVariant="compact" title="Title" />

    <ListCell onClick={onClickConsole} spacingVariant="compact" subdetail="Neutral" title="Title" />

    <ListCell
      multiline
      description="Multi-line description"
      onClick={onClickConsole}
      spacingVariant="compact"
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      onClick={onClickConsole}
      spacingVariant="compact"
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      spacingVariant="compact"
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      onClick={onClickConsole}
      spacingVariant="compact"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="compact"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="compact"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="compact"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="compact"
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      onClick={onClickConsole}
      spacingVariant="compact"
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
      spacingVariant="compact"
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
      spacingVariant="condensed"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
    <ListCell
      disableMultilineTitle
      detail="Detail also has a very long string"
      spacingVariant="condensed"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 1 line when 'disableMultilineTitle' is turned on"
    />
    <ListCell
      description="Description also has a very long length that will be capped at 1 line, unless 'multiline' is turned on and the description can go as many lines as needed."
      detail="Detail also has a very long string"
      spacingVariant="condensed"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
    <ListCell
      multiline
      selected
      description="Description also has a very long length that will be capped at 1 line, unless 'multiline' is turned on and the description can go as many lines as needed."
      detail="Detail also has a very long string"
      spacingVariant="condensed"
      subdetail="Neutral also does too"
      title="Title with a very long length that should be capped at 2 lines"
    />
  </>
);

const cellPriorities: CellPriority[] = ['middle', 'end'];

const PriorityContent = () => (
  <>
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      priority="start"
      spacingVariant="condensed"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      priority="middle"
      spacingVariant="condensed"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      priority="end"
      spacingVariant="condensed"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      priority={cellPriorities}
      spacingVariant="condensed"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="positive"
    />
    <ListCell
      description="Some description of the asset"
      detail="$334,239.03"
      intermediary={<Icon name="chartLine" />}
      priority={cellPriorities}
      spacingVariant="condensed"
      subdetail="+4.06%"
      title="Asset with a really long name"
      variant="warning"
    />
  </>
);

const WithAccessory = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <ListCell accessory="arrow" spacingVariant="condensed" title="Title" />
      <ListCell
        accessory={isSelected ? 'selected' : 'unselected'}
        description="Selected state uses the same space, no layout shift when selected"
        onClick={() => setIsSelected((prev) => !prev)}
        selected={isSelected}
        spacingVariant="condensed"
        title="Unselected placeholder"
      />

      <ListCell accessory="more" detail="Detail" spacingVariant="condensed" title="Title" />

      <ListCell
        accessory="selected"
        description="Description"
        spacingVariant="condensed"
        title="Title"
      />

      <ListCell
        accessory="arrow"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        title="Title"
      />

      <ListCell
        selected
        accessory="arrow"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        title="Title"
      />

      <ListCell
        disableSelectionAccessory
        selected
        accessory="arrow"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        title="Title"
      />

      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        accessory="selected"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell
        accessory="arrow"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        accessory="arrow"
        description="Description"
        detail="Detail"
        spacingVariant="condensed"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );
};
const WithMedia = () => (
  <>
    <ListCell media={<Icon active name="email" />} spacingVariant="condensed" title="Icon" />

    <ListCell
      media={<Icon active name="email" />}
      onClick={onClickConsole}
      spacingVariant="condensed"
      title="Icon (pressable)"
    />

    <ListCell
      description="Description"
      media={<Icon name="phone" />}
      spacingVariant="condensed"
      title="Icon"
    />

    <ListCell
      description="Description"
      detail="Detail"
      media={<Avatar src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      title="Avatar"
    />

    <ListCell
      description="Description"
      detail="Detail"
      media={<Avatar src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      subdetail="Neutral"
      title="Asset"
    />

    <ListCell
      detail="Detail"
      media={<Avatar src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      title="Image"
    />

    <ListCell
      description="Description"
      media={<Pictogram name="shield" />}
      spacingVariant="condensed"
      title="Pictogram"
    />
  </>
);

const WithActions = () => (
  <>
    <ListCell
      detail="Detail"
      end={<Button>Action</Button>}
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      description="Description"
      end={
        <Button compact variant="negative">
          Action
        </Button>
      }
      spacingVariant="condensed"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      end={<IconButton accessibilityLabel="External link" name="externalLink" />}
      spacingVariant="condensed"
      title="Title"
    />
  </>
);

const Fallback = () => {
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <VStack gap={4}>
      <Switch
        checked={showFallback}
        onChange={(event) => setShowFallback(event.currentTarget.checked)}
      >
        Show fallback state
      </Switch>
      {showFallback ? (
        <ListCellFallback
          description
          detail
          disableRandomRectWidth
          helperText
          subtitle
          title
          accessory="more"
          media="asset"
          spacingVariant="condensed"
        />
      ) : (
        <ListCell
          accessory="more"
          description="Check your portfolio performance"
          detail="$12,345.00"
          helperText={
            <CellHelperText variant="information">Balance reflects live market data</CellHelperText>
          }
          media={<Avatar src={assets.eth.imageUrl} />}
          spacingVariant="condensed"
          subdetail="+5.43%"
          subtitle="Ethereum"
          title="ETH"
        />
      )}
    </VStack>
  );
};

const WithIntermediary = () => (
  <>
    <ListCell
      description="Description"
      detail="$1,230"
      intermediary={<Icon name="chartLine" />}
      spacingVariant="condensed"
      styles={{
        end: {
          width: 100,
        },
      }}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$44,130"
      intermediary={<Icon name="chartLine" />}
      spacingVariant="condensed"
      styles={{
        end: {
          width: 100,
        },
      }}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$942,103"
      intermediary={<Icon name="chartLine" />}
      spacingVariant="condensed"
      styles={{
        end: {
          width: 100,
        },
      }}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$530"
      intermediary={<Icon name="chartLine" />}
      spacingVariant="condensed"
      styles={{
        end: {
          width: 100,
        },
      }}
      title="Title"
    />
    <ListCell
      description="Description"
      detail="$123K"
      intermediary={<Icon name="chartLine" />}
      spacingVariant="condensed"
      styles={{
        end: {
          width: 100,
        },
      }}
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
      spacingVariant="condensed"
      subdetail="FYI"
      title="Information Helper Text"
    />

    <ListCell
      multiline
      accessory="more"
      description="Action required"
      end={<Button compact>Action</Button>}
      helperText={
        <CellHelperText paddingStart={6} variant="warning">
          Please review this information carefully before proceeding
        </CellHelperText>
      }
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      spacingVariant="condensed"
      title="With Media and Helper Text"
    />

    <ListCell
      multiline
      accessory="more"
      description="Perform an action based on this information"
      end={<Button compact>Action</Button>}
      helperText={
        <CellHelperText paddingStart={6} variant="error">
          This field contains an error that needs to be corrected
        </CellHelperText>
      }
      media={<Avatar src={assets.eth.imageUrl} />}
      priority="end"
      spacingVariant="condensed"
      title="With Detail and Helper Text"
      variant="negative"
    />
    <ListCell
      multiline
      accessory="more"
      description="Perform an action based on this information."
      end={<Button compact>Action</Button>}
      helperText={
        <CellHelperText paddingStart={6} variant="information">
          This action cannot be undone.
        </CellHelperText>
      }
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      spacingVariant="condensed"
      title="With Media and Action"
    />
  </VStack>
);

const SpacingVariant = () => (
  <VStack>
    {/* Preferred (new design) */}
    <ListCell
      accessory="arrow"
      description="New design"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      media={<Avatar src={assets.eth.imageUrl} />}
      onClick={onClickConsole}
      spacingVariant="condensed"
      subdetail="+1.23%"
      title="Condensed"
      variant="positive"
    />

    {/* Deprecated options kept for backward compatibility */}
    <ListCell
      accessory="arrow"
      description="Deprecated (use condensed)"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      media={<Avatar src={assets.eth.imageUrl} />}
      onClick={onClickConsole}
      spacingVariant="compact"
      subdetail="+1.23%"
      title="Compact"
      variant="positive"
    />
    <ListCell
      accessory="arrow"
      detail="$12,345.00"
      intermediary={<Icon name="chartLine" />}
      media={<Avatar src={assets.eth.imageUrl} />}
      onClick={onClickConsole}
      spacingVariant="normal"
      subdetail="+1.23%"
      title="Normal"
      variant="positive"
    />
  </VStack>
);

const CondensedListCell = () => {
  return (
    <VStack width="360px">
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
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
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        accessory="more"
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        detail="Detail"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        styles={{
          media: {
            marginTop: 'var(--space-1)',
            alignSelf: 'flex-start',
          },
        }}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        multiline
        description="Long description with multiple lines. This section can be arbitrarily long and occupy many many lines."
        end={
          <HStack alignItems="center" gap={2}>
            <Text color="fgMuted" font="label2">
              Meta
            </Text>
            <Icon color="fg" name="caretRight" size="s" />
          </HStack>
        }
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        priority="end"
        spacingVariant="condensed"
        styles={{
          media: {
            marginTop: 'var(--space-0_5)',
            alignSelf: 'flex-start',
          },
          end: {
            marginTop: 'var(--space-0_5)',
            alignSelf: 'flex-start',
          },
        }}
        subdetail="Subdetail"
        subtitle="Subtitle"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Icon name="heart" size="l" />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        media={<Icon name="heart" size="s" />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        end={<Button compact>Action</Button>}
        media={<Icon name="heart" size="xs" />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        intermediary={<Avatar shape="square" size="l" src={squareAssets.human6} />}
        media={<Avatar shape="square" size="l" src={squareAssets.human1} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
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

const UseCaseShowcase = () => {
  const format = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  } as const;

  const currency = new Intl.NumberFormat(undefined, format);

  // State for prices and amounts to enable simulation updates
  const [btcPrice, setBtcPrice] = React.useState(8407.9);
  const [btcAmt, setBtcAmt] = React.useState(0.1246);
  const [ethPrice, setEthPrice] = React.useState(2381.86);
  const [ethAmt, setEthAmt] = React.useState(0.5);
  const [adaPrice, setAdaPrice] = React.useState(0.84);
  const [adaAmt, setAdaAmt] = React.useState(1);

  const [ltcPrice, setLtcPrice] = React.useState(145.32);
  const [ltcAmt, setLtcAmt] = React.useState(2.3);
  const [daiPrice, setDaiPrice] = React.useState(1);
  const [daiAmt, setDaiAmt] = React.useState(100);

  const simulate = React.useCallback(() => {
    const jitter = (value: number, pct = 0.03) => {
      const delta = (Math.random() * 2 - 1) * pct;
      return Math.max(0, value * (1 + delta));
    };

    setBtcPrice((v) => jitter(v));
    setBtcAmt((v) => jitter(v, 0.05));
    setEthPrice((v) => jitter(v));
    setEthAmt((v) => jitter(v, 0.05));
    setAdaPrice((v) => jitter(v));
    setAdaAmt((v) => jitter(v, 0.05));
    setLtcPrice((v) => jitter(v));
    setLtcAmt((v) => jitter(v, 0.05));
    setDaiPrice((v) => jitter(v));
    setDaiAmt((v) => jitter(v, 0.05));
  }, []);

  return (
    <VStack width="360px">
      <ListCell
        accessibilityLabel={`BTC, value ${currency.format(btcPrice)}, amount ${btcAmt.toLocaleString()} BTC`}
        // If you need to pass non-string values to the detail or subdetail,
        // you can use the end prop to pass in a VStack, which can be anything you want.
        end={
          <VStack alignItems="flex-end">
            <RollingNumber colorPulseOnUpdate font="body" format={format} value={btcPrice} />
            <RollingNumber color="fgMuted" font="label2" suffix=" BTC" value={btcAmt} />
          </VStack>
        }
        intermediary={<Icon name="chartLine" />}
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={onClickConsole}
        priority="middle"
        spacingVariant="condensed"
        styles={{
          end: {
            width: 100,
          },
        }}
        title="BTC"
      />
      <ListCell
        accessibilityLabel={`ETH, 25% staked, value ${currency.format(ethPrice)}, amount ${ethAmt.toLocaleString()} ETH`}
        // If you need to pass non-string values to the detail or subdetail,
        // you can use the end prop to pass in a VStack, which can be anything you want.
        description="25% staked"
        end={
          <VStack alignItems="flex-end">
            <RollingNumber colorPulseOnUpdate font="body" format={format} value={ethPrice} />
            <RollingNumber color="fgMuted" font="label2" suffix=" ETH" value={ethAmt} />
          </VStack>
        }
        intermediary={<Icon name="chartLine" />}
        media={<Avatar src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        styles={{
          end: {
            width: 100,
          },
        }}
        title="ETH"
      />
      <ListCell
        accessibilityLabel={`ADA, 51% staked, value ${currency.format(adaPrice)}, amount ${adaAmt.toLocaleString()} ADA`}
        // If you need to pass non-string values to the detail or subdetail,
        // you can use the end prop to pass in a VStack, which can be anything you want.
        description="51% staked"
        end={
          <VStack alignItems="flex-end">
            <RollingNumber colorPulseOnUpdate font="body" format={format} value={adaPrice} />
            <RollingNumber color="fgMuted" font="label2" suffix=" ADA" value={adaAmt} />
          </VStack>
        }
        intermediary={<Icon name="chartLine" />}
        media={<Avatar src={assets.ada.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        styles={{
          end: {
            width: 100,
          },
        }}
        title="ADA"
      />
      <ListCell
        accessibilityLabel={`LTC, value ${currency.format(ltcPrice)}, amount ${ltcAmt.toLocaleString()} LTC`}
        end={
          <VStack alignItems="flex-end">
            <RollingNumber colorPulseOnUpdate font="body" format={format} value={ltcPrice} />
            <RollingNumber color="fgMuted" font="label2" suffix=" LTC" value={ltcAmt} />
          </VStack>
        }
        intermediary={<Icon name="chartLine" />}
        media={<Avatar src={assets.ltc.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        styles={{
          end: {
            width: 100,
          },
        }}
        title="LTC"
      />
      <ListCell
        accessibilityLabel={`DAI, Stablecoin, value ${currency.format(daiPrice)}, amount ${daiAmt.toLocaleString()} DAI`}
        description="Stablecoin"
        end={
          <VStack alignItems="flex-end">
            <RollingNumber colorPulseOnUpdate font="body" format={format} value={daiPrice} />
            <RollingNumber color="fgMuted" font="label2" suffix=" DAI" value={daiAmt} />
          </VStack>
        }
        intermediary={<Icon name="chartLine" />}
        media={<Avatar src={assets.dai.imageUrl} />}
        onClick={onClickConsole}
        spacingVariant="condensed"
        styles={{
          end: {
            width: 100,
          },
        }}
        title="DAI"
      />

      <Button onClick={simulate}>Simulate</Button>
    </VStack>
  );
};

export {
  CompactContentDeprecated,
  CompactPressableContentDeprecated,
  CondensedListCell,
  Content,
  CustomNodes,
  Fallback,
  LongContent,
  PressableContent,
  PriorityContent,
  SpacingVariant,
  UseCaseShowcase,
  WithAccessory,
  WithActions,
  WithHelperText,
  WithIntermediary,
  WithMedia,
};
