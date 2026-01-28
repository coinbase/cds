import React, { type JSX } from 'react';
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
    avatar: assets.eth.imageUrl,
    title: 'CoinDesk',
    meta: 'News',
    end: (
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
    body: 'Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s',
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
    mediaPosition: 'top',
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

export const Default = (): JSX.Element => {
  return (
    <VStack gap={1} left={0} padding={1} paddingTop={3} position="absolute" top={0}>
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider paddingBottom={2} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with mediaPosition bottom
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="bottom" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider paddingBottom={2} paddingStart={3} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with mediaPosition right
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="right" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider paddingBottom={2} paddingStart={3} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with mediaPosition left
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="left" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider paddingBottom={2} paddingStart={3} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with no media
      </Text>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider paddingBottom={2} paddingStart={3} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with product component - TextInput
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
      <Divider paddingBottom={2} paddingStart={3} />
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with product component - Custom Media
      </Text>
      <ContentCard>
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          avatar={null}
          end={
            <Text color="fgMuted" font="legal">
              Updated 1hr ago
            </Text>
          }
          meta={null}
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
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with IconCounterButtons
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

export const ProductCarousel = () => {
  return (
    <VStack>
      <Text as="h3" display="block" font="headline" paddingStart={3}>
        Full Example with product component - Carousel
      </Text>
      <ContentCard maxWidth="100%">
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          avatar={null}
          end={null}
          meta={null}
          title={
            <Text as="h3" display="block" font="title3">
              Crypto moves money forward
            </Text>
          }
        />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
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
