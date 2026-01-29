import React from 'react';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { Button, IconButton, IconCounterButton } from '../../../buttons';
import { Carousel } from '../../../carousel/Carousel';
import { CarouselItem } from '../../../carousel/CarouselItem';
import { NativeTextArea, TextInput } from '../../../controls';
import { Box, HStack, VStack } from '../../../layout';
import { RemoteImage, RemoteImageGroup } from '../../../media';
import { Pressable } from '../../../system/Pressable';
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
    thumbnail: (
      <RemoteImage alt="Ethereum thumbnail" shape="circle" size="l" source={ethBackground} />
    ),
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
      'This is a description of the Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s, marking a significant milestone for the blockchain.',
    media: (
      <RemoteImage
        alt="Ethereum background"
        resizeMode="cover"
        shape="rectangle"
        src={ethBackground}
        width="100%"
      />
    ),
    mediaPlacement: 'top',
  },
  contentFooterProps: {
    children: (
      <>
        <RemoteImageGroup shape="circle" size={32}>
          <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
          <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
          <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
          <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
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
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <ContentCard width={500}>
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
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="top" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: bottom
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="bottom" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: start
      </Text>
      <ContentCard width={500}>
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
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        No media with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        IconCounterButtons with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <HStack gap={4} justifyContent="space-between" paddingTop={0.5}>
            <IconCounterButton accessibilityLabel="like, 99 likes" count={99} icon="heart" />
            <IconCounterButton
              accessibilityLabel="comment, 4200 comments"
              count={4200}
              icon="comment"
            />
            <IconCounterButton
              accessibilityLabel="share, 9900000 shares"
              count={9900000}
              icon="arrowsHorizontal"
            />
          </HStack>
        </ContentCardFooter>
      </ContentCard>
    </VStack>
  );
};

/**
 * Pressable Cards
 *
 * To make a ContentCard interactive, wrap it in a Pressable component.
 * For proper accessibility, use `as="div"` on the Pressable to render it as a
 * non-interactive container, then include an internal button for keyboard and
 * screen reader users.
 *
 * This allows:
 * - Mouse/touch users: Click anywhere on the card
 * - Screen reader users: Navigate through card content and focus on the action button
 * - Keyboard users: Tab to the action button
 */
export const PressableCards = (): JSX.Element => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent double-triggering when clicking the button
    if ((e.target as HTMLElement).closest('button, a')) return;
    alert('Card pressed!');
  };

  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Accessible pressable card
      </Text>
      <Text as="p" color="fgMuted" display="block" font="body">
        Uses as=&quot;div&quot; with an internal button for keyboard/screen reader access.
      </Text>
      <Pressable
        as="div"
        background="bg"
        borderRadius={500}
        onClick={handleCardClick}
        width="fit-content"
      >
        <ContentCard width={500}>
          <ContentCardHeader
            subtitle="News"
            thumbnail={
              <RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />
            }
            title="CoinDesk"
          />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="secondary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card with background
      </Text>
      <Pressable
        as="div"
        background="bgAlternate"
        borderRadius={500}
        onClick={handleCardClick}
        width="fit-content"
      >
        <ContentCard width={500}>
          <ContentCardHeader
            subtitle="News"
            thumbnail={
              <RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />
            }
            title="CoinDesk"
          />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card (no media)
      </Text>
      <Pressable
        as="div"
        background="bgAlternate"
        borderRadius={500}
        onClick={handleCardClick}
        width="fit-content"
      >
        <ContentCard width={500}>
          <ContentCardHeader
            subtitle="News"
            thumbnail={
              <RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />
            }
            title="CoinDesk"
          />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card (disabled)
      </Text>
      <Pressable
        disabled
        as="div"
        background="bgAlternate"
        borderRadius={500}
        onClick={handleCardClick}
        width="fit-content"
      >
        <ContentCard width={500}>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact disabled variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>
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
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
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
        With IconCounterButtons
      </Text>
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter justifyContent="space-between">
          <IconCounterButton accessibilityLabel="like, 99 likes" count={99} icon="heart" />
          <IconCounterButton
            accessibilityLabel="comment, 4200 comments"
            count={4200}
            icon="comment"
          />
          <IconCounterButton
            accessibilityLabel="share, 9900000 shares"
            count={9900000}
            icon="arrowsHorizontal"
          />
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
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
          <Carousel styles={{ carousel: { gap: 16 } }}>
            {[1, 2, 3, 4, 5].map((id) => (
              <CarouselItem key={id} id={`carousel-item-${id}`}>
                <VStack position="relative">
                  <Box borderRadius={400} overflow="hidden">
                    <RemoteImage
                      alt="Ethereum promotional content"
                      height={381}
                      resizeMode="cover"
                      shape="rectangle"
                      source={ethBackground}
                      width={259}
                    />
                  </Box>
                  <VStack bottom={16} gap={1} left={16} position="absolute">
                    <Text as="h3" display="block" font="headline">
                      Break the cycle
                    </Text>
                    <Text as="p" display="block" font="legal">
                      24M views
                    </Text>
                  </VStack>
                </VStack>
              </CarouselItem>
            ))}
          </Carousel>
        </ContentCardBody>
        <ContentCardFooter {...exampleProps.contentFooterProps} />
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
