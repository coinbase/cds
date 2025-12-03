import React, { useState } from 'react';
import type { SectionHeaderProps } from '@coinbase/cds-common';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button, IconButton } from '../../buttons';
import { SelectChip } from '../../chips/SelectChip';
import { SearchInput, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Divider, HStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { SectionHeader } from '../SectionHeader';

const defaultProps: SectionHeaderProps = {
  title: 'SectionHeader',
  start: <RemoteImage shape="circle" size="m" source={assets.btc.imageUrl} />,
  icon: <Icon active color="fg" name="info" size="xs" />,
  balance: (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
      <Text color="fgMuted" font="title3" numberOfLines={1}>
        $3,9081.01
      </Text>
      <Text color="fgPositive" font="body">
        ↗ 6.37%
      </Text>
    </HStack>
  ),
  description: 'Add up to 2 lines of text.',
  testID: 'section-header',
};

const sortOptions = ['BTC', 'ETH', 'LTC'];

const SelectChipDropdown = () => {
  const [value, setValue] = useState<string | undefined>(sortOptions[0]);
  return (
    <HStack justifyContent="flex-end">
      <SelectChip active={value !== undefined} onChange={setValue} value={value}>
        {sortOptions.map((option) => (
          <SelectOption key={option} title={option} value={option} />
        ))}
      </SelectChip>
    </HStack>
  );
};

const SectionHeaderScreen = () => {
  return (
    <ExampleScreen>
      <Example title="SectionHeader Variants">
        <SectionHeader title="SectionHeader" />
        <Divider />
        <SectionHeader
          {...defaultProps}
          end={
            <HStack paddingTop={1}>
              <SearchInput compact onChangeText={NoopFn} placeholder="Placeholder" value="" />
            </HStack>
          }
        />
        <Divider />
        <SectionHeader {...defaultProps} end={<SelectChipDropdown />} />
        <Divider />
        <SectionHeader
          end={
            <HStack paddingTop={1}>
              <SearchInput compact onChangeText={NoopFn} placeholder="Placeholder" value="" />
            </HStack>
          }
          title={defaultProps.title}
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <Button compact variant="secondary">
              Button
            </Button>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <HStack gap={1}>
              <IconButton name="caretLeft" />
              <IconButton name="caretRight" />
            </HStack>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <Text font="headline">
              <Link to="http://www.coinbase.com">See all</Link>
            </Text>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          end={<IconButton name="upload" />}
          padding={0}
          title="CompactHeader"
        />
        <Divider />
        <SectionHeader {...defaultProps} balance={null} end={<IconButton name="upload" />} />
      </Example>
    </ExampleScreen>
  );
};

export default SectionHeaderScreen;
