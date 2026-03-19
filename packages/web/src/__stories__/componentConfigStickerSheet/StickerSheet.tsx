import { memo } from 'react';
import {
  assets,
  ethBackground,
  floatingAssetCardCustomImage,
} from '@coinbase/cds-common/internal/data/assets';
import { Accordion } from '@coinbase/cds-web/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import {
  FloatingAssetCard,
  type FloatingAssetCardProps,
} from '@coinbase/cds-web/cards/FloatingAssetCard';
import { NudgeCard } from '@coinbase/cds-web/cards/NudgeCard';
import { UpsellCard } from '@coinbase/cds-web/cards/UpsellCard';
import { ListCell } from '@coinbase/cds-web/cells/ListCell';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { InputChip } from '@coinbase/cds-web/chips/InputChip';
import { MediaChip } from '@coinbase/cds-web/chips/MediaChip';
import { Coachmark } from '@coinbase/cds-web/coachmark/Coachmark';
import { DotCount } from '@coinbase/cds-web/dots/DotCount';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Pictogram } from '@coinbase/cds-web/illustrations/Pictogram';
import { Box } from '@coinbase/cds-web/layout/Box';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Spinner } from '@coinbase/cds-web/loaders/Spinner';
import { Avatar } from '@coinbase/cds-web/media/Avatar';
import { RemoteImage } from '@coinbase/cds-web/media/RemoteImage';
import { Tooltip } from '@coinbase/cds-web/overlays';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';

import { AlertExample } from './examples/AlertExample';
import { ControlsExample } from './examples/Controls';
import { DatePickerExample } from './examples/DatePicker';
import { DropdownExample } from './examples/DropdownExample';
import { LineChartBasicExample } from './examples/LineChart';
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
import { TabsExample } from './examples/Tabs';
import { TextInputExample } from './examples/TextInput';
import { ToastExample } from './examples/ToastExample';
import { Container } from './Container';
import { bannerVariants, buttonVariants, tagColorSchemes } from './themeVars';

const SHOW_DEBUG_BG_COLORS = false;

const floatingAssetCards: FloatingAssetCardProps[] = [
  {
    title: '#7560',
    description: (
      <Text as="p" color="fgPositive" font="label2" numberOfLines={2}>
        &#x2197;14.42%
      </Text>
    ),
    subtitle: 'Bored Ape',
    onClick: () => {},
    media: (
      <RemoteImage
        height={'100%'}
        source={floatingAssetCardCustomImage}
        style={{ objectFit: 'cover', cursor: 'pointer' }}
        width="100%"
      />
    ),
  },
  {
    title: '#2015',
    description: (
      <Text as="p" color="fgNegative" font="label2" numberOfLines={2}>
        &#x2198;6.37%
      </Text>
    ),
    subtitle: 'Pudgy Penguins',
    onClick: () => {},
    media: (
      <RemoteImage
        height={'100%'}
        source={ethBackground}
        style={{ objectFit: 'cover', cursor: 'pointer' }}
        width="100%"
      />
    ),
  },
];

const rootStyle = {
  position: 'relative',
  maxWidth: 1200,
  padding: 32,
  gap: 16,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
} as const;

const leftColumnWidth = 420 as const;
const rightColumnWidth = 600 as const;

export const StickerSheet = memo(() => {
  return (
    <VStack background="bgAlternate" style={rootStyle}>
      <HStack style={{ gap: 16 }}>
        <VStack
          style={{
            gap: 16,
            background: SHOW_DEBUG_BG_COLORS ? 'red' : undefined,
          }}
          width={leftColumnWidth}
        >
          <Container style={{ marginLeft: -8, padding: 12 }}>
            <LineChartBasicExample />
          </Container>

          <Container>
            <ControlsExample />
          </Container>

          <HStack style={{ gap: 16 }}>
            <Container width={280}>
              <SegmentedTabsExample />
            </Container>

            <Container width={124}>
              <Spinner size={2} />
              <Spinner color="bgPrimary" size={4} />
            </Container>
          </HStack>

          <HStack style={{ gap: 16 }}>
            <Container width={160}>
              <RollingNumberExample />
            </Container>

            <Container width={244}>
              <HStack style={{ gap: 8 }}>
                <SelectChipExample />
                <InputChip
                  onClick={() => undefined}
                  start={<RemoteImage height={16} source={assets.eth.imageUrl} width={16} />}
                  value="ETH"
                />
              </HStack>
            </Container>
          </HStack>

          <Container>
            <PaginationExample />
          </Container>

          <Container>
            <SelectExample />
          </Container>

          <Container>
            <SearchExample />
          </Container>

          <Container>
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

          <Container>
            <NudgeCard
              action="Start earning"
              description="You’ve got unstaked crypto. Stake it now to earn more."
              onActionPress={() => {}}
              onDismissPress={() => {}}
              pictogram="key"
              title="Earn more crypto"
            />
          </Container>

          <Container>
            <UpsellCard
              action="Learn more"
              description="Zero trading fees, boosted staking rewards, and more."
              onActionPress={() => {}}
              onDismissPress={() => {}}
              title="Upgrade to Coinbase One"
            />
          </Container>

          <Container>
            <TabsExample />
          </Container>

          <Container>
            <HStack style={{ gap: 8 }}>
              <DropdownExample />
              <ModalExample />
              <AlertExample />
            </HStack>
          </Container>

          <Container>
            <ToastExample />
          </Container>

          <Container>
            <HStack style={{ gap: 24 }}>
              {floatingAssetCards.map((card, index) => (
                <Tooltip key={index} content={`View details for ${card.subtitle}`}>
                  <FloatingAssetCard {...card} />
                </Tooltip>
              ))}
            </HStack>
          </Container>
        </VStack>

        <VStack
          style={{
            gap: 16,
            background: SHOW_DEBUG_BG_COLORS ? 'blue' : undefined,
          }}
          width={rightColumnWidth}
        >
          <Container>
            <VStack style={{ gap: 16 }}>
              <Tag intent="informational">primary</Tag>
              <Tag intent="promotional">primary</Tag>
            </VStack>
            {tagColorSchemes.map((colorScheme) => (
              <VStack key={colorScheme} style={{ gap: 16 }}>
                <Tag colorScheme={colorScheme} intent="informational">
                  {colorScheme}
                </Tag>
                <Tag colorScheme={colorScheme} intent="promotional">
                  {colorScheme}
                </Tag>
              </VStack>
            ))}
          </Container>

          <Container>
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

          <HStack style={{ gap: 16 }}>
            <Container width={240}>
              <VStack style={{ gap: 8 }}>
                {buttonVariants.map((variant) => (
                  <HStack key={variant} alignItems="center" style={{ gap: 8 }}>
                    <Button variant={variant} width={160}>
                      Button
                    </Button>
                    <IconButton compact={false} name="add" variant={variant} />
                  </HStack>
                ))}
                <HStack alignItems="center" style={{ gap: 8 }}>
                  <Button loading width={160}>
                    Button
                  </Button>
                  <IconButton loading compact={false} name="add" variant="primary" />
                </HStack>
              </VStack>
            </Container>

            <VStack style={{ gap: 16 }}>
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

              <Container>
                <TextInputExample />
              </Container>
            </VStack>
          </HStack>

          <HStack style={{ gap: 16 }}>
            <Container alignSelf="stretch" width={240}>
              <VStack style={{ gap: 8 }}>
                {buttonVariants.map((variant) => (
                  <HStack key={variant} alignItems="center" style={{ gap: 8 }}>
                    <Button compact variant={variant} width={160}>
                      Button
                    </Button>
                    <IconButton compact name="add" variant={variant} />
                  </HStack>
                ))}
                <HStack alignItems="center" style={{ gap: 8 }}>
                  <Button compact loading width={160}>
                    Button
                  </Button>
                  <IconButton compact loading name="add" variant="primary" />
                </HStack>
              </VStack>
            </Container>

            <Container width={344}>
              <DatePickerExample />
            </Container>
          </HStack>

          <Container>
            <StepperHorizontalBasicExample />
          </Container>

          <Container>
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

          <Container>
            <HStack alignItems="center" style={{ gap: 24 }}>
              <DotCount count={3}>
                <Icon name="bell" size="l" />
              </DotCount>
              <DotCount count={12}>
                <Icon name="bell" size="l" />
              </DotCount>
              <DotCount count={100} max={99}>
                <Icon name="bell" size="l" />
              </DotCount>
            </HStack>
          </Container>

          <Container>
            <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
              <Chip onClick={() => {}}>Chip</Chip>
              <MediaChip start={<Icon name="account" size="s" />}>User</MediaChip>
              <InputChip
                onClick={() => {}}
                start={<RemoteImage height={16} source={assets.btc.imageUrl} width={16} />}
                value="BTC"
              />
            </HStack>
          </Container>

          <Container>
            <Coachmark
              action={
                <Button compact variant="secondary">
                  Got it
                </Button>
              }
              content="You can now trade directly from your portfolio page."
              onClose={() => {}}
              title="New feature"
            />
          </Container>

          <Container>
            <VStack style={{ gap: 0 }}>
              <ListCell
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
                description="$142.30"
                media={<Avatar colorScheme="purple" name="SOL" size="s" />}
                onClick={() => {}}
                subtitle="SOL"
                title="Solana"
              />
            </VStack>
          </Container>

          <Container>
            <TableExample />
          </Container>
        </VStack>
      </HStack>
    </VStack>
  );
});
