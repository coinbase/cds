import React, { useCallback, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { Button, IconButton } from '../../buttons';
import { CellMedia } from '../../cells';
import { SelectChip } from '../../chips';
import { SearchInput, SelectOption } from '../../controls';
import { Icon } from '../../icons';
import { Divider, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tooltip } from '../../overlays';
import { Link, Text } from '../../typography';
import { SectionHeader, type SectionHeaderProps } from '../SectionHeader';

const assetOptions: AssetOption[] = [
  { title: 'Polygon', value: 'polygon', imageUrl: assets.polygon.imageUrl },
  { title: 'Ethereum', value: 'ethereum', imageUrl: assets.eth.imageUrl },
  { title: 'DAI', value: 'dai', imageUrl: assets.dai.imageUrl },
];

type AssetOption = {
  title: string;
  value: string;
  imageUrl: string;
};

const exampleProps: SectionHeaderProps = {
  title: 'SectionHeader',
  start: <RemoteImage shape="circle" size="m" source={assets.btc.imageUrl} />,
  icon: (
    <Tooltip content="Tooltip content" placement="right">
      <Icon
        active
        accessibilityLabel="Info"
        color="fg"
        name="info"
        role="button"
        size="xs"
        tabIndex={0}
      />
    </Tooltip>
  ),
  balance: (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
      <Text as="h3" color="fgMuted" display="block" font="title3" numberOfLines={1}>
        $3,9081.01
      </Text>
      <Text as="p" color="fgPositive" display="block" font="body">
        ↗ 6.37%
      </Text>
    </HStack>
  ),
  description: 'Add up to 2 lines of body copy.',
};

const SelectChipDropdown = () => {
  const [value, setValue] = useState<AssetOption>();

  const content = (
    <VStack>
      {assetOptions.map(({ title, value, imageUrl }) => {
        return (
          <SelectOption
            key={value}
            media={<CellMedia source={imageUrl} type="asset" />}
            title={title}
            value={value}
          />
        );
      })}
    </VStack>
  );

  const handleOnChange = useCallback(
    (newValue: string) => setValue(assetOptions.find(({ value }) => value === newValue)),
    [],
  );

  return (
    <HStack justifyContent="flex-end" width="100%">
      <SelectChip
        active={value !== undefined}
        content={content}
        minWidth={200}
        onChange={handleOnChange}
        placeholder="Networks"
        start={value && <RemoteImage source={value?.imageUrl} />}
        value={value ? value.value : undefined}
        valueLabel={value ? value.title : undefined}
      />
    </HStack>
  );
};

export const Examples = () => {
  return (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <SectionHeader title={exampleProps.title} />
      <Divider />
      <SectionHeader end={<SelectChipDropdown />} title={exampleProps.title} />
      <Divider />
      <HStack flexWrap="wrap" gap={1} justifyContent="space-between" padding={2} paddingX={4}>
        <SectionHeader {...exampleProps} icon={null} paddingX={0} paddingY={0} />
        <HStack flexGrow={1} maxWidth={475}>
          <SearchInput compact onChangeText={() => {}} placeholder="Placeholder" value="" />
        </HStack>
      </HStack>
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <Button compact variant="secondary">
            Button
          </Button>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <Text as="label" font="headline">
            <Link href="http://www.coinbase.com" target="_blank">
              See all
            </Link>
          </Text>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={<IconButton accessibilityLabel="Upload" name="upload" />}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={
          <VStack>
            <Text as="h3" color="fgMuted" display="block" font="title3">
              $3908.01
            </Text>
            <Text as="p" color="fgPositive" display="block" font="body">
              ↗ 6.37%
            </Text>
          </VStack>
        }
        // description={null}
        end={
          <HStack>
            <SelectChipDropdown />
          </HStack>
        }
        icon={null}
        start={null}
        title={
          <Text as="p" display="block" font="label1">
            SectionHeader
          </Text>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={
          <HStack alignItems="flex-end" gap={1}>
            <Text as="sub" color="fgMuted" font="display3">
              $3908.01
            </Text>
            <Text as="p" color="fgNegative" display="block" font="body">
              ↘ 6.37%
            </Text>
          </HStack>
        }
        end={
          <HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>
        }
        icon={null}
        start={null}
        title={
          <Text as="p" display="block" font="label1">
            SectionHeader
          </Text>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        end={
          <HStack>
            <SelectChipDropdown />
          </HStack>
        }
        padding={0}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        start={null}
        title={
          <Text as="sub" font="caption">
            {exampleProps.title}
          </Text>
        }
      />
    </VStack>
  );
};

export default {
  title: 'Components/SectionHeader',
  component: SectionHeader,
};
