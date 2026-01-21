import { Image, StyleSheet } from 'react-native';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { Button, IconButton, IconCounterButton } from '../../buttons';
import { TextInput } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel, RemoteImage, RemoteImageGroup } from '../../media';
import { Text } from '../../typography/Text';
import type {
  ContentCardBodyProps,
  ContentCardFooterProps,
  ContentCardHeaderProps,
} from '../ContentCard';
import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from '../ContentCard';
import { LikeButton } from '../LikeButton';

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 24,
  },
});

const exampleProps: {
  contentHeaderProps: ContentCardHeaderProps;
  contentBodyProps: ContentCardBodyProps;
  contentFooterProps: ContentCardFooterProps;
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
    label: (
      <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
        <Text color="fgMuted" font="label2" numberOfLines={1}>
          $9,9081.01
        </Text>
        <Text color="fgPositive" font="label2">
          ↗ 6.37%
        </Text>
      </HStack>
    ),
    media: (
      <Image
        accessibilityIgnoresInvertColors
        source={{
          uri: ethBackground,
        }}
        style={styles.media}
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

const CarouselItem = () => (
  <VStack position="relative">
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={{
        height: 381,
        width: 259,
        objectFit: 'cover',
        borderRadius: 24,
      }}
    />
    <VStack bottom={16} gap={1} left={16} position="absolute">
      <Text color="bgSecondary" font="headline">
        Break the cycle
      </Text>
      <Text color="bgSecondary" font="legal">
        24M views
      </Text>
    </VStack>
  </VStack>
);

const ContentCardScreen = () => {
  return (
    <ExampleScreen>
      <Example paddingX={0}>
        <Text font="title3">Full Example</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with mediaPlacement bottom</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="bottom" />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with mediaPlacement end</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={{ ...styles.media, height: 96 }}
              />
            }
            mediaPlacement="end"
          />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with mediaPlacement start</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={{ ...styles.media, height: 96 }}
              />
            }
            mediaPlacement="start"
          />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with no media</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with product component</Text>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
            <TextInput
              accessibilityLabel="Text input field"
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with product component - Custom Media</Text>
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
            title={<Text font="title3">Today&apos;s briefing</Text>}
          />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            label={null}
            media={
              <HStack position="relative">
                <Image
                  accessibilityIgnoresInvertColors
                  source={{
                    uri: ethBackground,
                  }}
                  style={{ ...styles.media, position: 'relative' }}
                />
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
                  <Text font="caption">ETH</Text>
                  <Text color="fgPositive" font="label2">
                    ↗ 6.37%
                  </Text>
                </HStack>
              </HStack>
            }
          />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with product component - Carousel</Text>
        <ContentCard>
          <ContentCardHeader
            {...exampleProps.contentHeaderProps}
            actions={null}
            subtitle={null}
            thumbnail={null}
            title={<Text font="title3">Crypto moves money forward</Text>}
          />
          <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
            <Carousel
              gap={1.5}
              items={[
                <CarouselItem key="carouselItem1" />,
                <CarouselItem key="carouselItem2" />,
                <CarouselItem key="carouselItem3" />,
              ]}
            />
          </ContentCardBody>
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with IconCounterButton</Text>
        <ContentCard>
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
      </Example>

      <Example paddingX={0}>
        <Text font="title2">With Background</Text>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Full Example with background</Text>
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">mediaPlacement end with background</Text>
        <ContentCard background="bgAlternate">
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={{ ...styles.media, height: 96 }}
              />
            }
            mediaPlacement="end"
          />
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">No media with background</Text>
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">IconCounterButton with background</Text>
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
      </Example>

      <Example paddingX={0}>
        <Text font="title2">Pressable</Text>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Pressable card</Text>
        <ContentCard renderAsPressable onPress={() => {}}>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Pressable card with background</Text>
        <ContentCard renderAsPressable background="bgAlternate" onPress={() => {}}>
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Pressable card (no media)</Text>
        <ContentCard renderAsPressable background="bgAlternate" onPress={() => {}}>
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
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Pressable card (disabled)</Text>
        <ContentCard disabled renderAsPressable background="bgAlternate" onPress={() => {}}>
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
      </Example>
    </ExampleScreen>
  );
};

export default ContentCardScreen;
