import React from 'react';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { Button, IconButton, IconCounterButton } from '../../../buttons';
import { NativeTextArea, TextInput } from '../../../controls';
import { Divider, HStack, VStack } from '../../../layout';
import { RemoteImage, RemoteImageGroup } from '../../../media';
import { Text } from '../../../typography/Text';
import { LikeButton } from '../../LikeButton';
import {
  ContentCard,
  ContentCardBody,
  type ContentCardBodyDefaultElement,
  type ContentCardBodyProps,
  ContentCardFooter,
  type ContentCardFooterDefaultElement,
  type ContentCardFooterProps,
  ContentCardHeader,
  type ContentCardHeaderDefaultElement,
  type ContentCardHeaderProps,
} from '..';

const exampleProps: {
  contentHeaderProps: ContentCardHeaderProps<ContentCardHeaderDefaultElement>;
  contentBodyProps: ContentCardBodyProps<ContentCardBodyDefaultElement>;
  contentFooterProps: ContentCardFooterProps<ContentCardFooterDefaultElement>;
} = {
  contentHeaderProps: {
    thumbnail: assets.eth.imageUrl,
    title: 'CoinDesk',
    subtitle: 'News',
    actions: (
      <HStack gap={0}>
        <IconButton
          transparent
          accessibilityLabel="favorite coinDesk card news"
          name="star"
          variant="secondary"
        />
        <IconButton
          transparent
          accessibilityLabel="More information about coinDesk card news"
          name="more"
          variant="secondary"
        />
      </HStack>
    ),
  },
  contentBodyProps: {
    title: 'Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s',
    description:
      'This is a description of the Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s',
    label: (
      <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
        <Text as="p" color="fgMuted" display="block" font="label2" numberOfLines={1}>
          $9,9081.01
        </Text>
        <Text as="p" color="fgPositive" display="block" font="label2">
          ↗ 6.37%
        </Text>
      </HStack>
    ),
    media: (
      <img
        alt=""
        aria-hidden="true"
        src={ethBackground}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
        width="100%"
      />
    ),
    mediaPlacement: 'top',
  },
  contentFooterProps: {
    children: (
      <>
        <RemoteImageGroup shape="circle" size={32}>
          <RemoteImage source={assets.eth.imageUrl} />
          <RemoteImage source={assets.polygon.imageUrl} />
          <RemoteImage source={assets.uni.imageUrl} />
          <RemoteImage source={assets.sushi.imageUrl} />
        </RemoteImageGroup>
        <Button compact variant="secondary">
          Share
        </Button>
      </>
    ),
  },
};

// Basic Example
export const Basic = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
    </VStack>
  );
};

// Media Placement
export const MediaPlacement = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: top (default)
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="top" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: bottom
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="bottom" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: start
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="start" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
    </VStack>
  );
};

// With Background
export const WithBackground = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Full example with background
      </Text>
      <ContentCard background="bgAlternate">
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end with background
      </Text>
      <ContentCard background="bgAlternate">
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        No media with background
      </Text>
      <ContentCard background="bgAlternate">
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        IconCounterButtons with background
      </Text>
      <ContentCard background="bgAlternate">
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <HStack gap={4} justifyContent="space-between" paddingTop={0.5}>
            <IconCounterButton count={99} icon="heart" />
            <IconCounterButton count={4200} icon="comment" />
            <IconCounterButton count={9900000} icon="arrowsHorizontal" />
          </HStack>
        </ContentCardFooter>
      </ContentCard>
    </VStack>
  );
};

// Pressable Cards
export const Pressable = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Pressable card
      </Text>
      <ContentCard renderAsPressable onClick={() => alert('Card pressed!')}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        Pressable card with background
      </Text>
      <ContentCard
        renderAsPressable
        background="bgAlternate"
        onClick={() => alert('Card pressed!')}
      >
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        Pressable card (no media)
      </Text>
      <ContentCard
        renderAsPressable
        background="bgAlternate"
        onClick={() => alert('Card pressed!')}
      >
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        Pressable card (disabled)
      </Text>
      <ContentCard
        disabled
        renderAsPressable
        background="bgAlternate"
        onClick={() => alert('Card pressed!')}
      >
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.polygon.imageUrl} />
            <RemoteImage source={assets.uni.imageUrl} />
            <RemoteImage source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
    </VStack>
  );
};

// Custom Content
export const CustomContent = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        With TextInput
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
          <TextInput
            inputNode={
              <NativeTextArea
                cols={5}
                onChange={() => {}}
                placeholder="Type something here..."
                rows={7}
                value="Custom content"
              />
            }
            label="TextArea with character counter"
          />
        </ContentCardBody>
        <ContentCardFooter>
          <HStack gap={1}>
            <LikeButton
              liked
              accessibilityLabel="9999 likes, like coinDesk card news"
              count={9999}
            />
            <IconButton transparent accessibilityLabel="share coinDesk news" name="share" />
          </HStack>
          <Button compact variant="secondary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        With Custom Media Overlay
      </Text>
      <ContentCard>
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          actions={
            <Text color="fgMuted" font="legal">
              Updated 1hr ago
            </Text>
          }
          subtitle={null}
          thumbnail={null}
          title={
            <Text as="h2" display="block" font="title3">
              Today&apos;s briefing
            </Text>
          }
        />
        <ContentCardBody
          {...exampleProps.contentBodyProps}
          label={null}
          media={
            <HStack position="relative">
              <HStack
                bordered
                alignItems="center"
                background="bg"
                borderRadius={300}
                gap={0.5}
                justifyContent="center"
                left={16}
                padding={1}
                position="absolute"
                top={16}
              >
                <Text as="p" display="block" font="caption">
                  ETH
                </Text>
                <Text as="p" color="fgPositive" display="block" font="label2">
                  ↗ 6.37%
                </Text>
              </HStack>
              <img
                alt=""
                aria-hidden="true"
                src={ethBackground}
                style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
                width="100%"
              />
            </HStack>
          }
        />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        With IconCounterButtons
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null} />
        <ContentCardFooter>
          <HStack gap={4} justifyContent="space-between" paddingTop={0.5}>
            <IconCounterButton count={99} icon="heart" />
            <IconCounterButton count={4200} icon="comment" />
            <IconCounterButton count={9900000} icon="arrowsHorizontal" />
          </HStack>
        </ContentCardFooter>
      </ContentCard>
    </VStack>
  );
};

// Product Carousel
export const ProductCarousel = () => {
  return (
    <VStack>
      <Text as="h3" display="block" font="headline">
        Full Example with product component - Carousel
      </Text>
      <ContentCard maxWidth="100%">
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          actions={null}
          subtitle={null}
          thumbnail={null}
          title={
            <Text as="h3" display="block" font="title3">
              Crypto moves money forward
            </Text>
          }
        />
        <ContentCardBody>
          <HStack gap={2} overflow="auto">
            {[1, 2, 3, 4, 5].map((id) => (
              <VStack key={id} position="relative">
                <img
                  alt=""
                  aria-hidden="true"
                  height={381}
                  src={ethBackground}
                  style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
                  width={259}
                />
                <VStack bottom={16} gap={1} left={16} position="absolute">
                  <Text as="h3" display="block" font="headline">
                    Break the cycle
                  </Text>
                  <Text as="p" display="block" font="legal">
                    24M views
                  </Text>
                </VStack>
              </VStack>
            ))}
          </HStack>
        </ContentCardBody>
      </ContentCard>
    </VStack>
  );
};

export default {
  title: 'Components/Cards/ContentCard',
  component: ContentCard,
};

ProductCarousel.parameters = {
  a11y: { config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] } },
};
