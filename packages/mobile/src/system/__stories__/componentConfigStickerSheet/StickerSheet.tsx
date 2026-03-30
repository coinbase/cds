import React, { memo } from 'react';

import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { Link } from '../../../typography/Link';
import { Text } from '../../../typography/Text';

import { AccordionExample } from './examples/Accordion';
import { AvatarExample } from './examples/Avatar';
import { BannerExample } from './examples/Banner';
import { ButtonExample } from './examples/Button';
import { CoachmarkExample } from './examples/Coachmark';
import { ControlsExample } from './examples/Controls';
import { DatePickerExample } from './examples/DatePicker';
import { DotCountExample } from './examples/DotCount';
import { FloatingAssetCardExample } from './examples/FloatingAssetCard';
import { IconExample } from './examples/Icon';
import { InputChipExample } from './examples/InputChip';
import { ListCellExample } from './examples/ListCell';
import { SearchExample } from './examples/Search';
import { SegmentedTabsExample } from './examples/SegmentedTabs';
import { SelectExample } from './examples/Select';
import { SelectChipExample } from './examples/SelectChip';
import { SpinnerExample } from './examples/Spinner';
import { TabsExample } from './examples/Tabs';
import { TagExample } from './examples/Tag';
import { TextInputExample } from './examples/TextInput';
import { Container } from './Container';

const leftColumnWidth = 320;
const rightColumnWidth = 380;

export const StickerSheet = memo(() => {
  return (
    <VStack alignItems="center" background="bgAlternate" gap={2} padding={2}>
      <HStack alignItems="flex-start" flexWrap="wrap" gap={2}>
        <VStack gap={2} width={leftColumnWidth}>
          <Container title="Switch / Checkbox / Radio">
            <ControlsExample />
          </Container>

          <HStack alignItems="flex-start" gap={2}>
            <Container title="Segmented Tabs" width={220}>
              <SegmentedTabsExample />
            </Container>
            <Container title="Spinner" width={92}>
              <SpinnerExample />
            </Container>
          </HStack>

          <Container title="Select Input (SelectOption)">
            <SelectExample />
          </Container>

          <Container title="SearchInput">
            <SearchExample />
          </Container>

          <Container title="SelectChip / InputChip">
            <HStack flexWrap="wrap" gap={1}>
              <SelectChipExample />
              <InputChipExample />
            </HStack>
          </Container>

          <Container title="Accordion">
            <AccordionExample />
          </Container>

          <Container title="Tabs">
            <TabsExample />
          </Container>

          <Container title="DatePicker">
            <DatePickerExample />
          </Container>
        </VStack>

        <VStack gap={2} width={rightColumnWidth}>
          <Container title="Tag">
            <TagExample />
          </Container>

          <Container title="Icon">
            <IconExample />
          </Container>

          <Container title="Button / IconButton">
            <ButtonExample />
          </Container>

          <Container title="Avatar">
            <AvatarExample />
          </Container>

          <Container title="TextInput / InputIconButton">
            <VStack gap={2} width="100%">
              <TextInputExample />
              <Text font="caption">
                <Link to="https://cds.coinbase.com">CDS docs</Link>
              </Text>
            </VStack>
          </Container>

          <Container title="ListCell">
            <ListCellExample />
          </Container>

          <Container title="Banner">
            <BannerExample />
          </Container>

          <Container title="DotCount">
            <DotCountExample />
          </Container>

          <Container title="FloatingAssetCard">
            <FloatingAssetCardExample />
          </Container>

          <Container title="Coachmark">
            <CoachmarkExample />
          </Container>
        </VStack>
      </HStack>
    </VStack>
  );
});
