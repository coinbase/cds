import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { assets, coinbaseOneLogo } from '@coinbase/cds-common/internal/data/assets';
import { animated, useSpring } from '@react-spring/native';

import { Button } from '../../buttons';
import { IconButton } from '../../buttons/IconButton';
import { ContainedAssetCard } from '../../cards/ContainedAssetCard';
import { NudgeCard } from '../../cards/NudgeCard';
import { UpsellCard } from '../../cards/UpsellCard';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Pressable } from '../../system/Pressable';
import { Link, Text } from '../../typography';
import {
  Carousel,
  type CarouselImperativeHandle,
  type CarouselPaginationComponentProps,
} from '../Carousel';
import { CarouselItem } from '../CarouselItem';

const styles = StyleSheet.create({
  sampleCard: {
    height: 192, // 12rem equivalent
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  upsellImage: {
    width: 130,
    height: 174,
    position: 'relative',
    left: 10,
  },
  assetImage: {
    width: 32,
    height: 32,
  },
});

const SampleCard = ({ text }: { text: string }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.sampleCard,
        {
          backgroundColor: theme.color.accentSubtleBlue,
          borderColor: theme.color.accentBoldBlue,
        },
      ]}
    >
      <Text color="fgPrimary" font="label1">
        {text}
      </Text>
    </View>
  );
};

const SampleUpsellCard = () => (
  <UpsellCard
    action="Buy Bitcoin now"
    description="Check out the most popular assets"
    media={
      <Image alt="Coinbase One" source={{ uri: coinbaseOneLogo }} style={styles.upsellImage} />
    }
    onActionPress={() => console.log('pressed')}
    title="Headline"
    width="100%"
  />
);

const sampleItems = [
  <SampleCard key="1" text="Slide 1" />,
  <SampleCard key="2" text="Slide 2" />,
  <SampleCard key="3" text="Slide 3" />,
  <SampleCard key="4" text="Slide 4" />,
  <SampleCard key="5" text="Slide 5" />,
  <SampleCard key="6" text="Slide 6" />,
  <SampleCard key="7" text="Slide 7" />,
  <SampleCard key="8" text="Slide 8" />,
  <SampleCard key="9" text="Slide 9" />,
  <SampleCard key="10" text="Slide 10" />,
];

const SeeAllComponent = () => (
  <Text font="headline">
    <Link to="https://coinbase.com/">See all</Link>
  </Text>
);

const SquareAssetCard = ({
  imageUrl,
  name,
  onPress,
}: {
  imageUrl: string;
  name: string;
  onPress?: () => void;
}) => (
  <ContainedAssetCard
    description={
      <Text color="fgPositive" font="label2" numberOfLines={2}>
        ↗6.37%
      </Text>
    }
    header={<RemoteImage height={32} source={imageUrl} style={styles.assetImage} width={32} />}
    onPress={onPress}
    subtitle={name}
    title="$0.87"
  />
);

const BasicExamples = () => {
  const theme = useTheme();

  const horizontalPadding = theme.space[2];

  const windowWidth = Dimensions.get('window').width;
  const carouselSizing = windowWidth - horizontalPadding * 2;

  const horizontalGap = theme.space[1];

  const twoItemsWidth = (carouselSizing - horizontalGap) / 2;
  const threeItemsWidth = (carouselSizing - horizontalGap * 2) / 3;

  return (
    <>
      <Example paddingX={0}>
        <Carousel
          autoplay
          paginationVariant="dot"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Snap Page"
        >
          {sampleItems.map((item, index) => (
            <CarouselItem key={`spaced-${index}`} id={`spaced-${index}`} width={threeItemsWidth}>
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
      <Example paddingX={0}>
        <Carousel
          drag="snap"
          paginationVariant="dot"
          snapMode="item"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
            title: { color: theme.color.fgPrimary },
          }}
          title="Snap Item"
        >
          {sampleItems.map((item, index) => (
            <CarouselItem key={`snap-${index}`} id={`snap-${index}`} width={twoItemsWidth}>
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
      <Example paddingX={0}>
        <Carousel
          loop
          NavigationComponent={SeeAllComponent}
          drag="free"
          paginationVariant="dot"
          snapMode="item"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Square Items Carousel"
        >
          {Object.values(assets).map((asset) => (
            <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
              <SquareAssetCard
                imageUrl={asset.imageUrl}
                name={asset.symbol}
                onPress={() => console.log(`${asset.symbol} clicked`)}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
      <Example paddingX={0}>
        <Carousel
          drag="snap"
          paginationVariant="dot"
          snapMode="page"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: theme.space[1] },
          }}
          title="Full Width Cards"
        >
          <CarouselItem id="upsell-1" width="100%">
            <SampleUpsellCard />
          </CarouselItem>
          <CarouselItem id="upsell-2" width="100%">
            <SampleUpsellCard />
          </CarouselItem>
          <CarouselItem id="upsell-3" width="100%">
            <SampleUpsellCard />
          </CarouselItem>
          <CarouselItem id="upsell-4" width="100%">
            <SampleUpsellCard />
          </CarouselItem>
          <CarouselItem id="upsell-5" width="100%">
            <SampleUpsellCard />
          </CarouselItem>
        </Carousel>
      </Example>
      <Example paddingX={0}>
        <Carousel
          drag="none"
          paginationVariant="dot"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Navigation Only (No Drag)"
        >
          {sampleItems.slice(0, 4).map((item, index) => (
            <CarouselItem key={`nav-only-${index}`} id={`nav-only-${index}`} width="100%">
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
      <Example paddingX={0}>
        <Carousel
          hideNavigation
          hidePagination
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Drag Only (No Navigation or Pagination)"
        >
          {sampleItems.slice(0, 4).map((item, index) => (
            <CarouselItem key={`drag-only-${index}`} id={`drag-only-${index}`} width="100%">
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
    </>
  );
};

const CustomComponentsExample = () => {
  const theme = useTheme();

  const CustomPaginationComponent = ({
    totalPages,
    activePageIndex,
    onPressPage,
    style,
  }: CarouselPaginationComponentProps) => {
    const canGoPrevious = activePageIndex > 0;
    const canGoNext = activePageIndex < totalPages - 1;

    const onPrevious = () => {
      onPressPage(activePageIndex - 1);
    };

    const onNext = () => {
      onPressPage(activePageIndex + 1);
    };

    return (
      <HStack justifyContent="space-between" style={style}>
        <HStack gap={1}>
          <IconButton
            accessibilityLabel="Previous"
            disabled={!canGoPrevious}
            name="caretLeft"
            onPress={onPrevious}
            variant="foregroundMuted"
          />
          <IconButton
            accessibilityLabel="Next"
            disabled={!canGoNext}
            name="caretRight"
            onPress={onNext}
            variant="foregroundMuted"
          />
        </HStack>
        <HStack alignItems="center" gap={1}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pressable
              key={index}
              accessibilityLabel={`Go to page ${index + 1}`}
              background={index === activePageIndex ? 'bgPrimary' : 'bgSecondary'}
              borderColor={index === activePageIndex ? 'fgPrimary' : 'bgLine'}
              borderRadius={400}
              height={16}
              onPress={() => onPressPage(index)}
              width={16}
            />
          ))}
        </HStack>
      </HStack>
    );
  };

  return (
    <Example paddingX={0}>
      <Carousel
        NavigationComponent={SeeAllComponent}
        PaginationComponent={CustomPaginationComponent}
        styles={{
          root: { paddingHorizontal: theme.space[3], paddingVertical: theme.space[0.5] },
          carousel: { gap: theme.space[2] },
        }}
        title="Learn more"
      >
        <CarouselItem id="earn-more-crypto" width="100%">
          <NudgeCard
            action="Start earning"
            description="You've got unstaked crypto. Stake it now to earn more."
            minWidth={0}
            onActionPress={() => console.log('Action pressed')}
            pictogram="key"
            title="Earn more crypto"
            width="100%"
          />
        </CarouselItem>
        <CarouselItem id="secure-your-account" width="100%">
          <NudgeCard
            action="Enable 2FA"
            description="Add two-factor authentication for enhanced security."
            minWidth={0}
            onActionPress={() => console.log('Enable 2FA pressed')}
            pictogram="shield"
            title="Secure your account"
            width="100%"
          />
        </CarouselItem>
        <CarouselItem id="complete-your-profile" width="100%">
          <NudgeCard
            action="Update profile"
            description="Add more details to personalize your experience."
            minWidth={0}
            onActionPress={() => console.log('Update profile pressed')}
            pictogram="accountsNavigation"
            title="Complete your profile"
            width="100%"
          />
        </CarouselItem>
      </Carousel>
    </Example>
  );
};

const AutoplayExample = () => {
  const theme = useTheme();

  return (
    <Example paddingX={0}>
      <Carousel
        autoplay
        loop
        paginationVariant="dot"
        styles={{
          root: { paddingHorizontal: theme.space[2] },
          carousel: { gap: theme.space[1] },
        }}
        title="Autoplay Carousel"
      >
        {Object.values(assets).map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            <SquareAssetCard
              imageUrl={asset.imageUrl}
              name={asset.symbol}
              onPress={() => console.log(`${asset.symbol} clicked`)}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </Example>
  );
};

const DynamicContentExample = () => {
  const theme = useTheme();
  const [items, setItems] = useState(Object.values(assets).slice(0, 3));
  function addAsset() {
    const randomAsset =
      Object.values(assets)[Math.floor(Math.random() * Object.values(assets).length)];
    setItems([...items, { ...randomAsset, symbol: `${randomAsset.symbol}-${items.length}` }]);
  }
  return (
    <Example paddingX={0}>
      <HStack alignItems="center" gap={2} justifyContent="flex-end" paddingX={2}>
        <Button compact onPress={addAsset}>
          Add Asset
        </Button>
        <Button compact disabled={items.length === 0} onPress={() => setItems(items.slice(0, -1))}>
          Remove Last
        </Button>
      </HStack>
      <Carousel
        paginationVariant="dot"
        styles={{
          root: { paddingHorizontal: theme.space[3] },
          carousel: { gap: theme.space[1], height: 156 },
        }}
        title="Explore Assets"
      >
        {items.map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            <SquareAssetCard
              imageUrl={asset.imageUrl}
              name={asset.symbol}
              onPress={() => console.log(`${asset.symbol} clicked`)}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </Example>
  );
};

const AnimatedExample = () => {
  const theme = useTheme();

  const AnimatedSquareAssetCard = memo(({ imageUrl, name }: { imageUrl: string; name: string }) => {
    const theme = useTheme();
    const squareSize = 156;
    const largeSize = 327;
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [size, setSize] = useState<'s' | 'l'>('s');

    const width = useSharedValue(squareSize);

    const handleClick = useCallback(() => {
      const newHighlighted = !isHighlighted;
      setIsHighlighted(newHighlighted);

      if (newHighlighted) {
        setSize('l');
        width.value = withSpring(largeSize);
      } else {
        setSize('s');
        width.value = withSpring(squareSize);
      }
    }, [isHighlighted, width, largeSize, squareSize]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: width.value,
        overflow: 'hidden',
        borderRadius: theme.borderRadius[500],
      };
    });

    return (
      <Animated.View style={animatedStyle}>
        <ContainedAssetCard
          description={
            <Text color="fgPositive" font="label2" numberOfLines={2}>
              ↗6.37%
            </Text>
          }
          header={<RemoteImage height={32} source={imageUrl} width={32} />}
          onPress={handleClick}
          size={size}
          subtitle={name}
          title="$0.87"
        >
          <VStack height={squareSize} justifyContent="center" padding={1} />
        </ContainedAssetCard>
      </Animated.View>
    );
  });
  return (
    <Example paddingX={0}>
      <Carousel
        paginationVariant="dot"
        styles={{
          root: { paddingHorizontal: theme.space[3] },
          carousel: { gap: theme.space[1] },
        }}
        title="Animated Selection"
      >
        {Object.values(assets).map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            <AnimatedSquareAssetCard imageUrl={asset.imageUrl} name={asset.symbol} />
          </CarouselItem>
        ))}
      </Carousel>
    </Example>
  );
};

const ImperativeApiExample = () => {
  const theme = useTheme();
  const carouselRef = useRef<CarouselImperativeHandle>(null);
  const [currentPageInfo, setCurrentPageInfo] = useState('Page 1');

  const handleGoToPage = (pageIndex: number) => {
    if (carouselRef.current) {
      const clampedPageIndex = Math.max(0, Math.min(carouselRef.current.totalPages - 1, pageIndex));
      carouselRef.current.goToPage(clampedPageIndex);
      setCurrentPageInfo(`Page ${clampedPageIndex + 1}`);
    }
  };

  const handleGoToFirstPage = () => {
    handleGoToPage(0);
  };

  const handleGoToLastPage = () => {
    if (carouselRef.current) {
      handleGoToPage(carouselRef.current.totalPages - 1);
    }
  };

  const handleGoToPrevPage = () => {
    if (carouselRef.current) {
      handleGoToPage(carouselRef.current.activePageIndex - 1);
    }
  };

  const handleGoToNextPage = () => {
    if (carouselRef.current) {
      handleGoToPage(carouselRef.current.activePageIndex + 1);
    }
  };

  return (
    <Example paddingX={0}>
      <VStack gap={2}>
        <HStack alignItems="center" gap={2} justifyContent="space-between" paddingX={3}>
          <HStack gap={1}>
            <IconButton
              accessibilityLabel="Go to first page"
              name="doubleChevronRight"
              onPress={handleGoToFirstPage}
              style={{ transform: [{ rotate: '180deg' }] }}
              variant="secondary"
            />
            <IconButton
              active
              accessibilityLabel="Go to previous page"
              name="arrowLeft"
              onPress={handleGoToPrevPage}
              variant="secondary"
            />
          </HStack>
          <Box
            alignItems="center"
            background="bgSecondary"
            borderRadius={500}
            flexGrow={1}
            justifyContent="center"
            paddingX={2}
            paddingY={1}
          >
            <Text color="fgMuted" font="label1">
              {currentPageInfo}
            </Text>
          </Box>
          <HStack gap={1}>
            <IconButton
              active
              accessibilityLabel="Go to next page"
              name="arrowRight"
              onPress={handleGoToNextPage}
              variant="secondary"
            />
            <IconButton
              accessibilityLabel="Go to last page"
              name="doubleChevronRight"
              onPress={handleGoToLastPage}
              variant="secondary"
            />
          </HStack>
        </HStack>
        <Carousel
          ref={carouselRef}
          hideNavigation
          hidePagination
          drag="none"
          snapMode="item"
          styles={{
            root: { paddingHorizontal: theme.space[3] },
            carousel: { gap: theme.space[1] },
          }}
          title="Imperative API"
        >
          {Object.values(assets).map((asset) => (
            <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
              <SquareAssetCard
                imageUrl={asset.imageUrl}
                name={asset.symbol}
                onPress={() => console.log(`${asset.symbol} clicked`)}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </VStack>
    </Example>
  );
};

const LoopingExamples = () => {
  const theme = useTheme();

  const horizontalPadding = theme.space[2];

  const windowWidth = Dimensions.get('window').width;
  const carouselSizing = windowWidth - horizontalPadding * 2;

  const horizontalGap = theme.space[1];

  const threeItemsWidth = (carouselSizing - horizontalGap * 2) / 3;

  return (
    <>
      {/* Looping - Snap Page */}
      <Example paddingX={0}>
        <Carousel
          loop
          drag="snap"
          paginationVariant="dot"
          snapMode="page"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Looping - Snap Page"
        >
          {sampleItems.map((item, index) => (
            <CarouselItem
              key={`loop-page-${index}`}
              id={`loop-page-${index}`}
              width={threeItemsWidth}
            >
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>

      {/* Looping with Autoplay - Snap Item */}
      <Example paddingX={0}>
        <Carousel
          autoplay
          loop
          drag="snap"
          paginationVariant="dot"
          snapMode="item"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Looping with Autoplay - Snap Item"
        >
          {sampleItems.map((item, index) => (
            <CarouselItem
              key={`loop-item-${index}`}
              id={`loop-item-${index}`}
              width={threeItemsWidth}
            >
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>

      {/* Looping - Free Drag (visreg - no pagination) */}
      <Example paddingX={0}>
        <Carousel
          loop
          drag="free"
          snapMode="item"
          styles={{
            root: { paddingHorizontal: horizontalPadding },
            carousel: { gap: horizontalGap },
          }}
          title="Looping - Free Drag (visreg)"
        >
          {sampleItems.map((item, index) => (
            <CarouselItem
              key={`loop-free-${index}`}
              id={`loop-free-${index}`}
              width={threeItemsWidth}
            >
              {item}
            </CarouselItem>
          ))}
        </Carousel>
      </Example>
    </>
  );
};

const AnimatedPaginationExample = () => {
  const theme = useTheme();

  const AnimatedDot = memo(
    ({
      index,
      isActive,
      dotSize,
      activeDotWidth,
      onPress,
      theme,
    }: {
      index: number;
      isActive: boolean;
      dotSize: number;
      activeDotWidth: number;
      onPress: () => void;
      theme: any;
    }) => {
      const springProps = useSpring({
        width: isActive ? activeDotWidth : dotSize,
        backgroundColor: isActive ? theme.color.bgPrimary : theme.color.bgLine,
        config: { tension: 300, friction: 25 },
      });

      const baseStyle = useMemo(
        () => ({
          height: dotSize,
          borderRadius: dotSize / 2,
        }),
        [dotSize],
      );

      return (
        <Pressable
          accessibilityLabel={`Go to page ${index + 1}`}
          borderRadius={1000}
          height={dotSize}
          onPress={onPress}
        >
          <animated.View
            style={[
              baseStyle,
              {
                width: springProps.width,
                backgroundColor: springProps.backgroundColor,
              },
            ]}
          />
        </Pressable>
      );
    },
  );

  const AnimatedPagination = memo(
    ({ totalPages, activePageIndex, onPressPage, style }: CarouselPaginationComponentProps) => {
      const dotSize = theme.space[1];
      const activeDotWidth = theme.space[3];

      return (
        <HStack alignItems="center" gap={0.5} justifyContent="center" paddingY={0.5} style={style}>
          {Array.from({ length: totalPages }, (_, index) => (
            <AnimatedDot
              key={index}
              activeDotWidth={activeDotWidth}
              dotSize={dotSize}
              index={index}
              isActive={index === activePageIndex}
              onPress={() => onPressPage?.(index)}
              theme={theme}
            />
          ))}
        </HStack>
      );
    },
  );

  return (
    <Example paddingX={0}>
      <Carousel
        PaginationComponent={AnimatedPagination}
        drag="snap"
        snapMode="page"
        styles={{
          root: { paddingHorizontal: theme.space[3] },
          carousel: { gap: theme.space[2] },
        }}
        title="Animated Pagination"
      >
        <CarouselItem id="slide-1" width="100%">
          <NudgeCard
            action="Get started"
            description="Experience smooth transitions as you navigate through content."
            minWidth={0}
            onActionPress={() => console.log('Get started pressed')}
            pictogram="key"
            title="Smooth Animations"
            width="100%"
          />
        </CarouselItem>
        <CarouselItem id="slide-2" width="100%">
          <NudgeCard
            action="Learn more"
            description="Active pages expand to pills while inactive ones remain as circles."
            minWidth={0}
            onActionPress={() => console.log('Learn more pressed')}
            pictogram="shield"
            title="Dynamic Sizing"
            width="100%"
          />
        </CarouselItem>
        <CarouselItem id="slide-3" width="100%">
          <NudgeCard
            action="Explore"
            description="Beautiful visual feedback that enhances user experience."
            minWidth={0}
            onActionPress={() => console.log('Explore pressed')}
            pictogram="accountsNavigation"
            title="Enhanced UX"
            width="100%"
          />
        </CarouselItem>
      </Carousel>
    </Example>
  );
};

export default function CarouselScreen() {
  return (
    <ExampleScreen paddingX={0}>
      <BasicExamples />
      <CustomComponentsExample />
      <DynamicContentExample />
      <AnimatedExample />
      <ImperativeApiExample />
      <AnimatedPaginationExample />
      <LoopingExamples />
      <AutoplayExample />
    </ExampleScreen>
  );
}
