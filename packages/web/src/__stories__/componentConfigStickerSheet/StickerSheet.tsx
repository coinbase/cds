import { memo } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { Accordion } from '@coinbase/cds-web/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { MessagingCard } from '@coinbase/cds-web/cards/MessagingCard';
import { ListCell } from '@coinbase/cds-web/cells/ListCell';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { InputChip } from '@coinbase/cds-web/chips/InputChip';
import { MediaChip } from '@coinbase/cds-web/chips/MediaChip';
import { Coachmark } from '@coinbase/cds-web/coachmark/Coachmark';
import { DotCount } from '@coinbase/cds-web/dots/DotCount';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Pictogram } from '@coinbase/cds-web/illustrations/Pictogram';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Avatar } from '@coinbase/cds-web/media/Avatar';
import { RemoteImage } from '@coinbase/cds-web/media/RemoteImage';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';

import { AlertExample } from './examples/AlertExample';
import { ControlsExample } from './examples/Controls';
import { DatePickerExample } from './examples/DatePicker';
import { DropdownExample } from './examples/DropdownExample';
import { ModalExample } from './examples/ModalExample';
import { PaginationExample } from './examples/Pagination';
import { RollingNumberExample } from './examples/RollingNumber';
import { SearchExample } from './examples/Search';
import { SegmentedTabsExample } from './examples/SegmentedTabs';
import { SelectExample } from './examples/Select';
import { SelectChipExample } from './examples/SelectChip';
import { StepperHorizontalBasicExample } from './examples/StepperHorizontal';
import { StepperVerticalCustomExample } from './examples/StepperVertical';
import { TableExample } from './examples/TableExample';
import { TextInputExample } from './examples/TextInput';
import { ToastExample } from './examples/ToastExample';
import { Container } from './Container';
import { bannerVariants, buttonVariants, tagColorSchemes } from './themeVars';

const SHOW_DEBUG_BG_COLORS = false;

const leftColumnWidth = 420;
const rightColumnWidth = 600;

export const StickerSheet = memo(() => {
  return (
    <VStack alignItems="center" background="bgAlternate" gap={2} padding={2}>
      <HStack gap={2}>
        <VStack
          style={{
            gap: 16,
            background: SHOW_DEBUG_BG_COLORS ? 'red' : undefined,
          }}
          width={leftColumnWidth}
        >
          <Container title="Switch / Checkbox / Radio">
            <ControlsExample />
          </Container>

          <HStack>
            <Container title="Segmented Tabs">
              <SegmentedTabsExample />
            </Container>
          </HStack>

          <HStack gap={2}>
            <Container width={160}>
              <RollingNumberExample />
            </Container>

            <Container title="SelectChip / InputChip" width={244}>
              <HStack gap={1}>
                <SelectChipExample />
                <InputChip
                  accessibilityLabel="Select ETH asset"
                  onClick={() => undefined}
                  start={<RemoteImage height={16} source={assets.eth.imageUrl} width={16} />}
                  value="ETH"
                />
              </HStack>
            </Container>
          </HStack>

          <Container title="Pagination">
            <PaginationExample />
          </Container>

          <Container title="Select Input">
            <SelectExample />
          </Container>

          <Container title="SearchInput">
            <SearchExample />
          </Container>

          <Container title="Accordion">
            <Accordion>
              <AccordionItem
                itemKey="1"
                media={<Pictogram name="addToWatchlist" />}
                subtitle="This is an example subtitle"
                title="Accordion item"
              >
                <Text font="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </AccordionItem>
              <AccordionItem
                itemKey="2"
                media={<Pictogram name="calendar" />}
                subtitle="This is an example subtitle"
                title="Accordion item"
              >
                <Text font="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </AccordionItem>
            </Accordion>
          </Container>

          <Container title="NudgeCard">
            <MessagingCard
              action="Start earning"
              description="You’ve got unstaked crypto. Stake it now to earn more."
              media={<Pictogram dimension="48x48" name="key" />}
              mediaPlacement="end"
              onActionButtonClick={() => {}}
              onDismissButtonClick={() => {}}
              title="Earn more crypto"
              type="nudge"
            />
          </Container>

          <Container title="UpsellCard">
            <MessagingCard
              action="Learn more"
              description="Zero trading fees, boosted staking rewards, and more."
              media={
                <RemoteImage
                  height={80}
                  source={assets.btc.imageUrl}
                  style={{ objectFit: 'cover' }}
                  width={80}
                />
              }
              mediaPlacement="end"
              onActionButtonClick={() => {}}
              onDismissButtonClick={() => {}}
              title="Upgrade to Coinbase One"
              type="upsell"
            />
          </Container>

          <Container title="Dropdown / Modal / Alert / Toast">
            <DropdownExample />
            <ModalExample />
            <AlertExample />
            <ToastExample />
          </Container>

          <Container title="TableHeader / TableCell">
            <TableExample />
          </Container>

          <Container title="Coachmark">
            <Coachmark
              action={
                <Button compact variant="secondary">
                  Got it
                </Button>
              }
              closeButtonAccessibilityLabel="Close coachmark"
              content="You can now trade directly from your portfolio page."
              onClose={() => {}}
              title="New feature"
            />
          </Container>
        </VStack>

        <VStack
          gap={2}
          style={{
            background: SHOW_DEBUG_BG_COLORS ? 'blue' : undefined,
          }}
          width={rightColumnWidth}
        >
          <Container title="Tag">
            <VStack gap={2}>
              <Tag intent="informational">primary</Tag>
              <Tag intent="promotional">primary</Tag>
            </VStack>
            {tagColorSchemes.map((colorScheme) => (
              <VStack key={colorScheme} gap={2}>
                <Tag colorScheme={colorScheme} intent="informational">
                  {colorScheme}
                </Tag>
                <Tag colorScheme={colorScheme} intent="promotional">
                  {colorScheme}
                </Tag>
              </VStack>
            ))}
          </Container>

          <Container title="Icon">
            <Icon name="search" size="l" />
            <Icon name="search" size="m" />
            <Icon name="search" size="s" />
            <Icon name="search" size="xs" />
            <Icon name="add" size="l" />
            <Icon name="add" size="m" />
            <Icon name="add" size="s" />
            <Icon name="add" size="xs" />
            <Icon name="account" size="l" />
            <Icon name="account" size="m" />
            <Icon name="account" size="s" />
            <Icon name="account" size="xs" />
          </Container>

          <HStack gap={2}>
            <Container width={240}>
              <VStack gap={1}>
                {buttonVariants.map((variant) => (
                  <HStack key={variant} alignItems="center" gap={1}>
                    <Button variant={variant} width={160}>
                      Button
                    </Button>
                    <IconButton
                      accessibilityLabel={`Add item (${variant} button)`}
                      compact={false}
                      name="add"
                      variant={variant}
                    />
                  </HStack>
                ))}
                <HStack alignItems="center" gap={1}>
                  <Button loading width={160}>
                    Button
                  </Button>
                  <IconButton
                    loading
                    accessibilityLabel="Add item (loading button)"
                    compact={false}
                    name="add"
                    variant="primary"
                  />
                </HStack>
              </VStack>
            </Container>

            <VStack gap={2}>
              <Container width={344}>
                <Avatar colorScheme="red" name="Avatar" shape="circle" size="m" />
                <Avatar colorScheme="orange" name="Avatar" shape="circle" size="l" />
                <Avatar colorScheme="yellow" name="Avatar" shape="circle" size="xl" />
                <Avatar colorScheme="green" name="Avatar" shape="square" size="m" />
                <Avatar colorScheme="blue" name="Avatar" shape="square" size="l" />
                <Avatar colorScheme="purple" name="Avatar" shape="square" size="xl" />
              </Container>

              <Container width={344}>
                <StepperVerticalCustomExample />
              </Container>

              <Container title="TextInput / InputIconButton">
                <TextInputExample />
              </Container>
            </VStack>
          </HStack>

          <HStack gap={2}>
            <Container alignSelf="stretch" width={240}>
              <VStack gap={1}>
                {buttonVariants.map((variant) => (
                  <HStack key={variant} alignItems="center" gap={1}>
                    <Button compact variant={variant} width={160}>
                      Button
                    </Button>
                    <IconButton
                      compact
                      accessibilityLabel={`Add item (${variant} compact button)`}
                      name="add"
                      variant={variant}
                    />
                  </HStack>
                ))}
                <HStack alignItems="center" gap={1}>
                  <Button compact loading width={160}>
                    Button
                  </Button>
                  <IconButton
                    compact
                    loading
                    accessibilityLabel="Add item (loading compact button)"
                    name="add"
                    variant="primary"
                  />
                </HStack>
              </VStack>
            </Container>

            <Container title="DatePicker" width={344}>
              <DatePickerExample />
            </Container>
          </HStack>

          <Container title="StepperHorizontal">
            <StepperHorizontalBasicExample />
          </Container>

          <Container title="Chip / InputChip">
            <HStack flexWrap="wrap" gap={1}>
              <Chip accessibilityLabel="Chip example" onClick={() => {}}>
                Chip
              </Chip>
              <MediaChip start={<Icon name="account" size="s" />}>User</MediaChip>
              <InputChip
                accessibilityLabel="Select BTC asset"
                onClick={() => {}}
                start={<RemoteImage height={16} source={assets.btc.imageUrl} width={16} />}
                value="BTC"
              />
            </HStack>
          </Container>

          <Container title="ListCell">
            <VStack>
              <ListCell
                accessibilityLabel="Bitcoin asset row"
                description="$64,231.00"
                media={
                  <RemoteImage
                    height={36}
                    source={assets.btc.imageUrl}
                    style={{ borderRadius: 18 }}
                    width={36}
                  />
                }
                onClick={() => {}}
                subtitle="BTC"
                title="Bitcoin"
              />
              <ListCell
                accessibilityLabel="Ethereum asset row"
                description="$3,421.50"
                media={
                  <RemoteImage
                    height={36}
                    source={assets.eth.imageUrl}
                    style={{ borderRadius: 18 }}
                    width={36}
                  />
                }
                onClick={() => {}}
                subtitle="ETH"
                title="Ethereum"
              />
              <ListCell
                accessibilityLabel="XRP asset row"
                description="$2.15"
                media={
                  <RemoteImage
                    height={36}
                    source={assets.xrp.imageUrl}
                    style={{ borderRadius: 18 }}
                    width={36}
                  />
                }
                onClick={() => {}}
                subtitle="XRP"
                title="XRP"
              />
            </VStack>
          </Container>

          <Container title="Banner">
            {bannerVariants.map((variant, index) => (
              <Banner
                key={variant}
                startIconActive
                id={`banner-${index}`}
                label="Message last updated today at 3:24pm"
                primaryAction={<Link href="#">Primary</Link>}
                secondaryAction={<Link href="#">Secondary</Link>}
                startIcon="info"
                styleVariant="global"
                title="Global banner"
                variant={variant}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Banner>
            ))}
          </Container>
          <VStack className="no-a11y-checks">
            <Container title="DotCount">
              <DotCount count={3}>
                <Icon name="bell" size="l" />
              </DotCount>
              <DotCount count={12}>
                <Icon name="bell" size="l" />
              </DotCount>
              <DotCount count={100} max={99}>
                <Icon name="bell" size="l" />
              </DotCount>
            </Container>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
});
