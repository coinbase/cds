import React from 'react';
import { assets, squareAssets } from '@coinbase/cds-common/internal/data/assets';
import type { CellPriority } from '@coinbase/cds-common/types/CellBaseProps';

import { Button, IconButton } from '../../buttons';
import { Icon } from '../../icons/Icon';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { RollingNumber } from '../../numbers/RollingNumber';
import { Tag } from '../../tag/Tag';
import { CellHelperText } from '../CellHelperText';
import { CellMedia } from '../CellMedia';
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
      <ListCell as="li" description="Description" layoutSpacing="hug" title="Title" />
      <ListCell as="li" description="Description" layoutSpacing="hug" title="Title" />
    </VStack>
  );
};

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

const CompactContentDeprecated = () => {
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
    <ListCell layoutSpacing="hug" onClick={onClickConsole} title="Title" />

    <ListCell layoutSpacing="hug" onClick={onClickConsole} subdetail="Neutral" title="Title" />

    <ListCell
      description="Multi-line description"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      disableSelectionAccessory
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="hug"
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
      layoutSpacing="hug"
      onClick={onClickConsole}
      subdetail="Warning"
      title="Title"
      variant="warning"
    />
  </>
);

const CompactPressableContentDeprecated = () => (
  <>
    <ListCell layoutSpacing="compact" onClick={onClickConsole} title="Title" />

    <ListCell layoutSpacing="compact" onClick={onClickConsole} subdetail="Neutral" title="Title" />

    <ListCell
      multiline
      description="Multi-line description"
      layoutSpacing="compact"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description"
      layoutSpacing="compact"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      description="Multi-line description goes here with really long text"
      layoutSpacing="compact"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      multiline
      selected
      description="Multi-line description goes here with really long text"
      layoutSpacing="compact"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onClick={onClickConsole}
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
      onClick={onClickConsole}
      subdetail="Neutral"
      title="Title"
    />

    <ListCell
      disabled
      selected
      description="Description"
      detail="Detail"
      layoutSpacing="compact"
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
      layoutSpacing="compact"
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

const cellPriorities: CellPriority[] = ['middle', 'end'];

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
      onClick={onClickConsole}
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
    <ListCell detail="Detail" end={<Button>Action</Button>} layoutSpacing="hug" title="Title" />

    <ListCell
      description="Description"
      end={
        <Button compact variant="negative">
          Action
        </Button>
      }
      layoutSpacing="hug"
      title="Title"
    />

    <ListCell
      description="Description"
      detail="Detail"
      end={<IconButton accessibilityLabel="External link" name="externalLink" />}
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
      intermediary={<Icon name="chartLine" />}
      layoutSpacing="hug"
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
      layoutSpacing="hug"
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
      layoutSpacing="hug"
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
      layoutSpacing="hug"
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
      layoutSpacing="hug"
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
      layoutSpacing="hug"
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
      layoutSpacing="hug"
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
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
      layoutSpacing="hug"
      media={<Avatar src={assets.eth.imageUrl} />}
      priority="end"
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
      layoutSpacing="hug"
      media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
      priority="end"
      title="With Media and Action"
    />
  </VStack>
);

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
      onClick={onClickConsole}
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
      onClick={onClickConsole}
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
      onClick={onClickConsole}
      subdetail="+1.23%"
      title="Spacious"
      variant="positive"
    />
  </VStack>
);

const HugListCell = () => {
  return (
    <VStack width="360px">
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Avatar shape="circle" size="l" src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
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
        onClick={onClickConsole}
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
        onClick={onClickConsole}
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
        onClick={onClickConsole}
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
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Icon name="heart" size="l" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        layoutSpacing="hug"
        media={<Icon name="heart" size="s" />}
        onClick={onClickConsole}
        subdetail="Subdetail"
        title="Title"
      />
      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        end={<Button compact>Action</Button>}
        layoutSpacing="hug"
        media={<Icon name="heart" size="xs" />}
        onClick={onClickConsole}
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
        layoutSpacing="hug"
        media={<Avatar src={assets.btc.imageUrl} />}
        onClick={onClickConsole}
        priority="middle"
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
        layoutSpacing="hug"
        media={<Avatar src={assets.eth.imageUrl} />}
        onClick={onClickConsole}
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
        layoutSpacing="hug"
        media={<Avatar src={assets.ada.imageUrl} />}
        onClick={onClickConsole}
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
        layoutSpacing="hug"
        media={<Avatar src={assets.ltc.imageUrl} />}
        onClick={onClickConsole}
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
        layoutSpacing="hug"
        media={<Avatar src={assets.dai.imageUrl} />}
        onClick={onClickConsole}
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
  Content,
  HugListCell,
  LayoutSpacing,
  LongContent,
  PressableContent,
  PriorityContent,
  UseCaseShowcase,
  WithAccessory,
  WithActions,
  WithHelperText,
  WithIntermediary,
  WithMedia,
};
