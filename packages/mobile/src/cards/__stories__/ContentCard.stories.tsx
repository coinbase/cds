import { Image, StyleSheet } from 'react-native';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { Button, IconButton, IconCounterButton } from '../../buttons';
import { TextInput } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel, RemoteImage, RemoteImageGroup } from '../../media';
import { Pressable } from '../../system/Pressable';
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
    thumbnail: (
      <RemoteImage
        accessibilityLabel="Ethereum thumbnail"
        shape="circle"
        size="l"
        source={ethBackground}
      />
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
        accessibilityLabel="Ethereum background"
        resizeMode="cover"
        source={{ uri: ethBackground }}
        width="100%"
      />
    ),
    mediaPlacement: 'top',
  },
  contentFooterProps: {
    children: (
      <>
        <RemoteImageGroup shape="circle" size={32}>
          <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
          <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
          <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
          <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
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
      accessibilityLabel="Ethereum background"
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
                accessibilityLabel="Ethereum media"
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
                accessibilityLabel="Ethereum media"
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
          <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
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
            title={<Text font="title3">Today&apos;s briefing</Text>}
          />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <HStack position="relative">
                <Image
                  accessibilityIgnoresInvertColors
                  accessibilityLabel="Ethereum media"
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
          <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
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
              <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
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
                accessibilityLabel="Ethereum media"
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
              <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
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
              <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
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
          <ContentCardFooter gap={4} justifyContent="space-between">
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
      </Example>

      {/*
       * Pressable Cards
       *
       * To make a ContentCard interactive, wrap it in a Pressable component.
       * For proper VoiceOver support, use `accessible={false}` on the Pressable
       * to allow screen readers to navigate through child elements, then include
       * an internal button for VoiceOver users.
       *
       * This allows:
       * - Touch users: Tap anywhere on the card
       * - VoiceOver users: Swipe through each text element and activate the action button
       * - Switch Control users: Focus on the action button
       */}
      <Example paddingX={0}>
        <Text font="title2">Accessible Pressable Cards</Text>
        <Text color="fgMuted" font="body">
          Uses accessible false with an internal button for VoiceOver access.
        </Text>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Accessible pressable card</Text>
        <Pressable accessible={false} background="bg" borderRadius={500} onPress={() => {}}>
          <ContentCard>
            <ContentCardHeader
              subtitle="News"
              thumbnail={
                <RemoteImage
                  accessibilityLabel="Ethereum thumbnail"
                  shape="circle"
                  size="l"
                  source={ethBackground}
                />
              }
              title="CoinDesk"
            />
            <ContentCardBody {...exampleProps.contentBodyProps} />
            <ContentCardFooter>
              <RemoteImageGroup shape="circle" size={32}>
                <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
                <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
                <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
                <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
              </RemoteImageGroup>
              <Button compact onPress={() => {}} variant="secondary">
                View Details
              </Button>
            </ContentCardFooter>
          </ContentCard>
        </Pressable>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Accessible pressable card with background</Text>
        <Pressable
          accessible={false}
          background="bgAlternate"
          borderRadius={500}
          onPress={() => {}}
        >
          <ContentCard>
            <ContentCardHeader
              subtitle="News"
              thumbnail={
                <RemoteImage
                  accessibilityLabel="Ethereum thumbnail"
                  shape="circle"
                  size="l"
                  source={ethBackground}
                />
              }
              title="CoinDesk"
            />
            <ContentCardBody {...exampleProps.contentBodyProps} />
            <ContentCardFooter>
              <RemoteImageGroup shape="circle" size={32}>
                <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
                <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
                <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
                <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
              </RemoteImageGroup>
              <Button compact onPress={() => {}} variant="tertiary">
                View Details
              </Button>
            </ContentCardFooter>
          </ContentCard>
        </Pressable>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Accessible pressable card (no media)</Text>
        <Pressable
          accessible={false}
          background="bgAlternate"
          borderRadius={500}
          onPress={() => {}}
        >
          <ContentCard>
            <ContentCardHeader
              subtitle="News"
              thumbnail={
                <RemoteImage
                  accessibilityLabel="Ethereum thumbnail"
                  shape="circle"
                  size="l"
                  source={ethBackground}
                />
              }
              title="CoinDesk"
            />
            <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
            <ContentCardFooter>
              <RemoteImageGroup shape="circle" size={32}>
                <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
                <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
                <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
                <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
              </RemoteImageGroup>
              <Button compact onPress={() => {}} variant="tertiary">
                View Details
              </Button>
            </ContentCardFooter>
          </ContentCard>
        </Pressable>
      </Example>
      <Example paddingX={0}>
        <Text font="title3">Accessible pressable card (disabled)</Text>
        <Pressable disabled accessible={false} background="bgAlternate" borderRadius={500}>
          <ContentCard>
            <ContentCardHeader
              subtitle="News"
              thumbnail={
                <RemoteImage
                  accessibilityLabel="Ethereum thumbnail"
                  shape="circle"
                  size="l"
                  source={ethBackground}
                />
              }
              title="CoinDesk"
            />
            <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
            <ContentCardFooter>
              <RemoteImageGroup shape="circle" size={32}>
                <RemoteImage accessibilityLabel="Ethereum" source={assets.eth.imageUrl} />
                <RemoteImage accessibilityLabel="Polygon" source={assets.polygon.imageUrl} />
                <RemoteImage accessibilityLabel="Uniswap" source={assets.uni.imageUrl} />
                <RemoteImage accessibilityLabel="Sushi" source={assets.sushi.imageUrl} />
              </RemoteImageGroup>
              <Button compact disabled variant="tertiary">
                View Details
              </Button>
            </ContentCardFooter>
          </ContentCard>
        </Pressable>
      </Example>
    </ExampleScreen>
  );
};

export default ContentCardScreen;
